/**
 * TensorFlow.js MoveNet Integration для tabatatimer.ru
 * Альтернатива MediaPipe - проще интегрируется и работает через CDN
 * Оценка упражнений в реальном времени с баллами 1-3
 */

class MoveNetPoseAnalyzer {
    constructor() {
        this.model = null;
        this.video = null;
        this.canvas = null;
        this.ctx = null;
        this.isActive = false;
        this.currentExercise = 'squat'; // 'squat', 'pushup', 'plank', 'wallsit' // 'abdominal', 'burpee' - временно отключено для доработки
        
        // Статистика
        this.reps = 0;
        // Убрали систему баллов - теперь просто засчитываем/не засчитываем
        
        // Состояние для детекции повторов
        this.prevSquat = false;
        this.prevPushup = false;
        this.isInSquat = false;
        this.isInPushup = false;
        this.isInAbdominal = false;
        
        // Для более точной детекции повторов
        this.minKneeAngle = 180; // Минимальный угол (самый глубокий присед)
        this.maxKneeAngle = 0; // Максимальный угол (выпрямление)
        this.squatThreshold = 125; // Порог для засчитывания приседа (было 120)
        this.standThreshold = 165; // Порог для засчитывания выпрямления (было 150)
        this.repMinDepth = 130; // Минимальная глубина для засчитывания повтора (было 120)
        this.standingFrames = 0; // Счетчик кадров в стоячем положении
        this.standingFramesRequired = 6; // Требуется кадров для подтверждения стоячего положения
        this.minScore = 0.3; // Минимальная уверенность keypoints для использования
        
        // Параметры для отжиманий
        this.pushupThreshold = 150; // Порог для начала отжимания (выпрямление)
        this.pushupExtendedThreshold = 160; // Порог для полного выпрямления
        this.pushupMinDepth = 80; // Минимальная глубина для засчитывания отжимания (угол локтя, было 90)
        this.minElbowAngle = 180; // Минимальный угол локтя (самое глубокое отжимание)
        this.extendedFrames = 0; // Счетчик кадров в выпрямленном положении
        this.extendedFramesRequired = 6; // Требуется кадров для подтверждения выпрямления
        
        // Параметры для пресса (отслеживание подъема торса) - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
        /* this.abdominalState = 'rest'; // 'rest', 'lifting', 'returning'
        this.isInAbdominal = false;
        this.prevAbdominal = false;
        this.baseShoulderY = null; // Базовая Y координата плеч (исходное положение - лежа)
        this.baseHipY = null; // Базовая Y координата таза
        this.minShoulderY = null; // Минимальная Y координата плеч (максимальный подъем торса)
        this.abdominalLiftThreshold = 0.015; // Порог подъема торса (разница Y координат плеч и таза) - очень низкий для легкого зачёта
        this.abdominalFrames = 0; // Счетчик кадров в состоянии
        this.abdominalFramesRequired = 6; // Требуется кадров для подтверждения возврата в исходное положение */
        
        // Параметры для планки (отдельное упражнение)
        this.plankState = 'rest'; // 'rest', 'plank'
        this.isInPlank = false;
        this.plankAngleMin = 160; // Минимальный угол для планки (тело должно быть почти прямым)
        this.plankAngleMax = 180; // Максимальный угол для планки
        this.plankFrames = 0; // Счетчик кадров удержания планки
        this.plankFramesRequired = 150; // Требуется кадров для зачёта планки (5 секунд при 30 fps)
        this.plankTotalFrames = 0; // Общее количество кадров удержания планки (для подсчета времени)
        this.plankStartTime = null; // Время начала удержания планки
        
        // Параметры для стульчика (wall sit)
        this.wallsitState = 'rest'; // 'rest', 'holding'
        this.isInWallsit = false;
        this.wallsitAngleMin = 90; // Минимальный угол колена для стульчика (было 80)
        this.wallsitAngleMax = 110; // Максимальный угол колена для стульчика (было 100)
        this.wallsitFrames = 0; // Счетчик кадров удержания стульчика
        this.wallsitFramesRequired = 150; // Требуется кадров для зачёта стульчика (5 секунд при 30 fps)
        this.wallsitTotalFrames = 0; // Общее количество кадров удержания стульчика (для подсчета времени)
        this.wallsitStartTime = null; // Время начала удержания стульчика
        
        // Параметры для бёрпи (упрощенная логика: упор лёжа → встал) - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
        /* this.burpeeState = 'rest'; // 'rest', 'plank', 'standing'
        this.isInBurpee = false;
        this.burpeePlankAngleMin = 150; // Минимальный угол для планки (упор лёжа)
        this.burpeePlankAngleMax = 180; // Максимальный угол для планки
        this.burpeeStandThreshold = 160; // Порог для выпрямления (встал)
        this.burpeeFrames = 0; // Счетчик кадров в текущей фазе
        this.burpeeFramesRequired = 3; // Требуется кадров для подтверждения фазы */
        
        // Callbacks
        this.onScoreUpdate = null;
        this.onRepComplete = null;
        this.onPositionHint = null; // Callback для подсказок по позиционированию
        
        // Инициализация MoveNet (отложенная, после загрузки страницы)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.initMoveNet(), 500);
            });
        } else {
            setTimeout(() => this.initMoveNet(), 500);
        }
    }
    
    /**
     * Инициализация TensorFlow.js MoveNet
     */
    async initMoveNet() {
        try {
            console.log('Ожидание загрузки TensorFlow.js и pose-detection...');
            
            // Ждем загрузки TensorFlow.js и pose-detection
            await this.waitForTensorFlow();
            
            // Загружаем модель MoveNet
            console.log('Загрузка модели MoveNet...');
            const tf = window.tf;
            const poseDetection = window.poseDetection;
            
            if (!tf || !poseDetection) {
                throw new Error('TensorFlow.js или pose-detection не найдены. Проверьте загрузку скриптов.');
            }
            
            // Устанавливаем бэкенд WebGL для ускорения
            await tf.setBackend('webgl');
            await tf.ready();
            
            // Создаем детектор MoveNet Lightning (быстрая версия)
            this.model = await poseDetection.createDetector(
                poseDetection.SupportedModels.MoveNet,
                {
                    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
                }
            );
            
            console.log('✓ MoveNet успешно загружен и готов к работе');
        } catch (error) {
            console.error('Ошибка инициализации MoveNet:', error);
            console.error('Попробуйте обновить страницу или проверьте подключение к интернету');
        }
    }
    
    /**
     * Ожидание загрузки TensorFlow.js и pose-detection
     */
    waitForTensorFlow() {
        return new Promise((resolve, reject) => {
            const checkTensorFlow = () => {
                return !!(window.tf && window.poseDetection);
            };
            
            if (checkTensorFlow()) {
                resolve();
                return;
            }
            
            let attempts = 0;
            const maxAttempts = 200; // 20 секунд
            
            const checkInterval = setInterval(() => {
                attempts++;
                
                if (checkTensorFlow()) {
                    clearInterval(checkInterval);
                    console.log('TensorFlow.js и pose-detection готовы к использованию');
                    resolve();
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    const status = {
                        'tf': !!window.tf,
                        'poseDetection': !!window.poseDetection
                    };
                    console.error('TensorFlow.js не загрузился. Статус:', status);
                    reject(new Error('TensorFlow.js или pose-detection не загрузились за отведенное время.'));
                }
            }, 100);
        });
    }
    
    /**
     * Вычисление угла между тремя точками
     */
    computeAngle(point1, point2, point3) {
        const a = { x: point1.x - point2.x, y: point1.y - point2.y };
        const b = { x: point3.x - point2.x, y: point3.y - point2.y };
        
        const dot = a.x * b.x + a.y * b.y;
        const magA = Math.sqrt(a.x * a.x + a.y * a.y);
        const magB = Math.sqrt(b.x * b.x + b.y * b.y);
        
        const angle = Math.acos(dot / (magA * magB));
        return angle * (180 / Math.PI);
    }
    
    /**
     * Проверка, достаточно ли глубокий присед для зачёта
     * Возвращает true если присед достаточно глубокий (угол < repMinDepth)
     */
    isSquatDeepEnough(kneeAngle) {
        return kneeAngle < this.repMinDepth;
    }
    
    /**
     * Проверка, достаточно ли глубокое отжимание для зачёта
     * Возвращает true если отжимание достаточно глубокое (угол < pushupMinDepth)
     */
    isPushupDeepEnough(elbowAngle) {
        return elbowAngle < this.pushupMinDepth;
    }
    
    /**
     * Анализ позиционирования человека перед камерой
     * Определяет расстояние, видимость и центрирование
     */
    analyzePositioning(keypoints) {
        if (!keypoints || keypoints.length === 0) {
            if (this.onPositionHint) {
                this.onPositionHint({
                    type: 'no_person',
                    message: '👤 Встаньте перед камерой так, чтобы вас было видно полностью',
                    severity: 'error'
                });
            }
            return;
        }
        
        // Ключевые точки для анализа
        const nose = keypoints[0];      // Нос
        const leftShoulder = keypoints[5];   // Левое плечо
        const rightShoulder = keypoints[6];   // Правое плечо
        const leftHip = keypoints[11];   // Левое бедро
        const rightHip = keypoints[12];  // Правое бедро
        const leftAnkle = keypoints[15]; // Левая лодыжка
        const rightAnkle = keypoints[16]; // Правая лодыжка
        
        // Проверяем видимость ключевых точек
        const visiblePoints = [nose, leftShoulder, rightShoulder, leftHip, rightHip, leftAnkle, rightAnkle]
            .filter(kp => kp && kp.score >= this.minScore);
        
        if (visiblePoints.length < 5) {
            if (this.onPositionHint) {
                this.onPositionHint({
                    type: 'low_visibility',
                    message: '⚠️ Вас плохо видно. Встаньте лицом к камере, убедитесь, что освещение хорошее',
                    severity: 'warning'
                });
            }
            return;
        }
        
        // Вычисляем размер человека (высота от головы до ног)
        let personHeight = 0;
        if (nose && (leftAnkle || rightAnkle)) {
            const ankle = leftAnkle || rightAnkle;
            personHeight = Math.abs(nose.y - ankle.y);
        }
        
        // Вычисляем ширину плеч
        let shoulderWidth = 0;
        if (leftShoulder && rightShoulder) {
            shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x);
        }
        
        // Получаем размеры canvas/video
        const canvasHeight = this.canvas ? this.canvas.height : 480;
        const canvasWidth = this.canvas ? this.canvas.width : 640;
        
        // Определяем расстояние до камеры (по высоте человека относительно высоты кадра)
        const heightRatio = personHeight / canvasHeight;
        const widthRatio = shoulderWidth / canvasWidth;
        
        // Определяем центрирование (позиция носа относительно центра кадра)
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const offsetX = nose ? Math.abs(nose.x - centerX) / canvasWidth : 0;
        const offsetY = nose ? Math.abs(nose.y - centerY) / canvasHeight : 0;
        
        // Анализируем и выдаем подсказки
        const hints = [];
        
        // Проверка расстояния (слишком далеко или слишком близко)
        if (heightRatio < 0.3) {
            hints.push({
                type: 'too_far',
                message: '📏 Вы стоите слишком далеко от камеры. Подойдите ближе, чтобы вас было лучше видно',
                severity: 'warning'
            });
        } else if (heightRatio > 0.9) {
            hints.push({
                type: 'too_close',
                message: '📏 Вы стоите слишком близко к камере. Отойдите немного назад, чтобы в кадр попало всё тело',
                severity: 'warning'
            });
        } else if (heightRatio >= 0.4 && heightRatio <= 0.7) {
            // Идеальное расстояние
            hints.push({
                type: 'good_distance',
                message: '✅ Расстояние до камеры отличное!',
                severity: 'success'
            });
        }
        
        // Проверка центрирования
        if (offsetX > 0.3) {
            hints.push({
                type: 'off_center_x',
                message: '↔️ Встаньте по центру кадра. Сейчас вы слишком смещены в сторону',
                severity: 'warning'
            });
        }
        
        if (offsetY > 0.3) {
            hints.push({
                type: 'off_center_y',
                message: '↕️ Встаньте по центру кадра по вертикали',
                severity: 'warning'
            });
        }
        
        if (offsetX <= 0.15 && offsetY <= 0.15) {
            hints.push({
                type: 'good_center',
                message: '✅ Вы хорошо центрированы!',
                severity: 'success'
            });
        }
        
        // Проверка видимости ног
        if (!leftAnkle || leftAnkle.score < this.minScore || !rightAnkle || rightAnkle.score < this.minScore) {
            hints.push({
                type: 'legs_not_visible',
                message: '🦵 Ноги должны быть полностью видны. Отойдите от камеры или измените угол',
                severity: 'warning'
            });
        }
        
        // Проверка видимости верхней части тела
        if (!leftShoulder || leftShoulder.score < this.minScore || !rightShoulder || rightShoulder.score < this.minScore) {
            hints.push({
                type: 'shoulders_not_visible',
                message: '👔 Плечи должны быть видны. Повернитесь лицом к камере',
                severity: 'warning'
            });
        }
        
        // Отправляем самую важную подсказку (приоритет: ошибка > предупреждение > успех)
        if (hints.length > 0) {
            const priorityOrder = { 'error': 3, 'warning': 2, 'success': 1 };
            hints.sort((a, b) => priorityOrder[b.severity] - priorityOrder[a.severity]);
            
            if (this.onPositionHint) {
                this.onPositionHint(hints[0]);
            }
        } else if (this.onPositionHint) {
            // Если всё хорошо, показываем общее сообщение
            this.onPositionHint({
                type: 'perfect',
                message: '✅ Позиция идеальна! Можно начинать приседать',
                severity: 'success'
            });
        }
    }
    
    /**
     * Анализ приседаний
     */
    analyzeSquat(keypoints) {
        // MoveNet keypoints: фиксированный порядок индексов
        // 11: left_hip, 12: right_hip
        // 13: left_knee, 14: right_knee
        // 15: left_ankle, 16: right_ankle
        
        // Получаем keypoints по индексам или по имени
        const getKeypoint = (index, name) => {
            // Сначала пробуем по индексу
            if (keypoints[index] && keypoints[index].score !== undefined) {
                return keypoints[index];
            }
            // Потом пробуем найти по имени
            if (name) {
                return keypoints.find(kp => kp.name && kp.name.toLowerCase() === name.toLowerCase());
            }
            return null;
        };
        
        const leftHip = getKeypoint(11, 'left_hip');
        const rightHip = getKeypoint(12, 'right_hip');
        const leftKnee = getKeypoint(13, 'left_knee');
        const rightKnee = getKeypoint(14, 'right_knee');
        const leftAnkle = getKeypoint(15, 'left_ankle');
        const rightAnkle = getKeypoint(16, 'right_ankle');
        
        // Проверяем видимость keypoints
        if (!leftKnee || !rightKnee || !leftHip || !rightHip || !leftAnkle || !rightAnkle) {
            return;
        }
        
        // Проверяем уверенность (score)
        if (leftKnee.score < this.minScore || rightKnee.score < this.minScore || 
            leftHip.score < this.minScore || rightHip.score < this.minScore ||
            leftAnkle.score < this.minScore || rightAnkle.score < this.minScore) {
            return;
        }
        
        // Вычисляем углы коленей
        const leftKneeAngle = this.computeAngle(leftHip, leftKnee, leftAnkle);
        const rightKneeAngle = this.computeAngle(rightHip, rightKnee, rightAnkle);
        const avgKneeAngle = (leftKneeAngle + rightKneeAngle) / 2;
        
        // Обновляем минимальный и максимальный углы
        if (avgKneeAngle < this.minKneeAngle) {
            this.minKneeAngle = avgKneeAngle;
        }
        if (avgKneeAngle > this.maxKneeAngle) {
            this.maxKneeAngle = avgKneeAngle;
        }
        
        // Определяем состояние приседа
        const isSquatting = avgKneeAngle < this.squatThreshold;
        const isStanding = avgKneeAngle > this.standThreshold;
        
        // Детекция повтора: стояли -> присели -> встали
        if (!this.prevSquat && isSquatting) {
            // Начали приседать
            this.isInSquat = true;
            this.minKneeAngle = avgKneeAngle; // Сбрасываем минимум для нового повтора
            this.standingFrames = 0; // Сбрасываем счетчик стоячих кадров
        }
        
        // Если мы в приседе, обновляем минимальный угол
        if (this.isInSquat && isSquatting) {
            if (avgKneeAngle < this.minKneeAngle) {
                this.minKneeAngle = avgKneeAngle;
            }
        }
        
        // Если мы встали из приседа, увеличиваем счетчик стоячих кадров
        if (this.isInSquat && isStanding) {
            this.standingFrames++;
        } else if (this.isInSquat && !isStanding) {
            // Если снова начали приседать, сбрасываем счетчик
            this.standingFrames = 0;
        }
        
        // Завершаем повтор, если: были в приседе, встали достаточно долго, и присели достаточно глубоко
        if (this.isInSquat && 
            this.standingFrames >= this.standingFramesRequired && 
            this.isSquatDeepEnough(this.minKneeAngle)) {
            // Завершили полный повтор (присели достаточно глубоко и встали)
            this.reps++;
            
            // Вызываем callback
            if (this.onRepComplete) {
                this.onRepComplete({
                    rep: this.reps,
                    exercise: 'squat',
                    angle: this.minKneeAngle
                });
            }
            
            // Сбрасываем состояние
            this.isInSquat = false;
            this.minKneeAngle = 180;
            this.standingFrames = 0;
        }
        
        // Вызываем callback для обновления статуса в реальном времени
        if (this.onScoreUpdate) {
            this.onScoreUpdate({
                exercise: 'squat',
                angle: avgKneeAngle,
                isInRep: this.isInSquat,
                isDeepEnough: this.isInSquat ? this.isSquatDeepEnough(avgKneeAngle) : false
            });
        }
        
        this.prevSquat = isSquatting;
    }
    
    /**
     * Анализ отжиманий
     */
    analyzePushup(keypoints) {
        // MoveNet keypoints для рук:
        // 5: left_shoulder, 6: right_shoulder
        // 7: left_elbow, 8: right_elbow
        // 9: left_wrist, 10: right_wrist
        
        const getKeypoint = (index, name) => {
            if (keypoints[index] && keypoints[index].score !== undefined) {
                return keypoints[index];
            }
            if (name) {
                return keypoints.find(kp => kp.name && kp.name.toLowerCase() === name.toLowerCase());
            }
            return null;
        };
        
        const leftShoulder = getKeypoint(5, 'left_shoulder');
        const rightShoulder = getKeypoint(6, 'right_shoulder');
        const leftElbow = getKeypoint(7, 'left_elbow');
        const rightElbow = getKeypoint(8, 'right_elbow');
        const leftWrist = getKeypoint(9, 'left_wrist');
        const rightWrist = getKeypoint(10, 'right_wrist');
        
        // Проверяем видимость keypoints
        if (!leftElbow || !rightElbow || !leftShoulder || !rightShoulder || !leftWrist || !rightWrist) {
            return;
        }
        
        // Проверяем уверенность (score)
        if (leftElbow.score < this.minScore || rightElbow.score < this.minScore || 
            leftShoulder.score < this.minScore || rightShoulder.score < this.minScore ||
            leftWrist.score < this.minScore || rightWrist.score < this.minScore) {
            return;
        }
        
        // Вычисляем углы локтей (плечо-локоть-запястье)
        const leftElbowAngle = this.computeAngle(leftShoulder, leftElbow, leftWrist);
        const rightElbowAngle = this.computeAngle(rightShoulder, rightElbow, rightWrist);
        const avgElbowAngle = (leftElbowAngle + rightElbowAngle) / 2;
        
        // Обновляем минимальный угол (самое глубокое отжимание)
        if (avgElbowAngle < this.minElbowAngle) {
            this.minElbowAngle = avgElbowAngle;
        }
        
        // Определяем состояние отжимания
        // Выпрямление: угол > pushupThreshold (руки выпрямлены)
        // Сгибание: угол < pushupThreshold (руки согнуты)
        const isExtended = avgElbowAngle > this.pushupExtendedThreshold; // Полностью выпрямлены
        const isBent = avgElbowAngle < this.pushupThreshold; // Согнуты (в процессе отжимания)
        
        // Детекция повтора: выпрямлены -> согнулись -> выпрямились
        if (!this.isInPushup && isBent) {
            // Начали отжиматься (переход из выпрямленного положения в согнутое)
            this.isInPushup = true;
            this.minElbowAngle = avgElbowAngle; // Сбрасываем минимум для нового повтора
            this.extendedFrames = 0; // Сбрасываем счетчик выпрямленных кадров
        }
        
        // Если мы в процессе отжимания, обновляем минимальный угол
        if (this.isInPushup && isBent) {
            if (avgElbowAngle < this.minElbowAngle) {
                this.minElbowAngle = avgElbowAngle;
            }
        }
        
        // Если мы выпрямились из отжимания, увеличиваем счетчик выпрямленных кадров
        if (this.isInPushup && isExtended) {
            this.extendedFrames++;
        } else if (this.isInPushup && !isExtended) {
            // Если снова начали сгибаться, сбрасываем счетчик
            this.extendedFrames = 0;
        }
        
        // Завершаем повтор, если: были в отжимании, выпрямились достаточно долго, и согнулись достаточно глубоко
        if (this.isInPushup && 
            this.extendedFrames >= this.extendedFramesRequired && 
            this.isPushupDeepEnough(this.minElbowAngle)) {
            // Завершили полный повтор (согнулись достаточно глубоко и выпрямились)
            this.reps++;
            
            // Вызываем callback
            if (this.onRepComplete) {
                this.onRepComplete({
                    rep: this.reps,
                    exercise: 'pushup',
                    angle: this.minElbowAngle
                });
            }
            
            // Сбрасываем состояние
            this.isInPushup = false;
            this.minElbowAngle = 180;
            this.extendedFrames = 0;
        }
        
        // Вызываем callback для обновления статуса в реальном времени
        if (this.onScoreUpdate) {
            this.onScoreUpdate({
                exercise: 'pushup',
                angle: avgElbowAngle,
                isInRep: this.isInPushup,
                isDeepEnough: this.isInPushup ? this.isPushupDeepEnough(avgElbowAngle) : false
            });
        }
        
        this.prevPushup = isBent;
    }
    
    /**
     * Вычисление расстояния между двумя точками (нормализованное)
     */
    computeDistance(point1, point2) {
        const dx = (point1.x || 0) - (point2.x || 0);
        const dy = (point1.y || 0) - (point2.y || 0);
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * Анализ упражнений на пресс (скручивания и планка) - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
     */
    /* analyzeAbdominal(keypoints) {
        const getKeypoint = (index, name) => {
            if (keypoints[index] && keypoints[index].score !== undefined) {
                return keypoints[index];
            }
            if (name) {
                return keypoints.find(kp => kp.name && kp.name.toLowerCase() === name.toLowerCase());
            }
            return null;
        };
        
        // Получаем ключевые точки
        const leftShoulder = getKeypoint(5, 'left_shoulder');
        const rightShoulder = getKeypoint(6, 'right_shoulder');
        const leftHip = getKeypoint(11, 'left_hip');
        const rightHip = getKeypoint(12, 'right_hip');
        const leftKnee = getKeypoint(13, 'left_knee');
        const rightKnee = getKeypoint(14, 'right_knee');
        
        // Проверяем видимость keypoints
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
            return;
        }
        
        // Проверяем уверенность (score)
        if (leftShoulder.score < this.minScore || rightShoulder.score < this.minScore || 
            leftHip.score < this.minScore || rightHip.score < this.minScore) {
            return;
        }
        
        // Вычисляем средние точки
        const shoulderCenter = {
            x: ((leftShoulder.x || 0) + (rightShoulder.x || 0)) / 2,
            y: ((leftShoulder.y || 0) + (rightShoulder.y || 0)) / 2
        };
        const hipCenter = {
            x: ((leftHip.x || 0) + (rightHip.x || 0)) / 2,
            y: ((leftHip.y || 0) + (rightHip.y || 0)) / 2
        };
        
        // Инициализируем базовые координаты при первом кадре (исходное положение - лежа)
        if (this.baseShoulderY === null || this.baseHipY === null) {
            this.baseShoulderY = shoulderCenter.y;
            this.baseHipY = hipCenter.y;
            this.minShoulderY = shoulderCenter.y;
        }
        
        // Вычисляем разницу Y координат (в системе координат изображения Y увеличивается вниз)
        // Когда торс поднимается, shoulderY уменьшается (плечи поднимаются выше)
        const shoulderLift = this.baseShoulderY - shoulderCenter.y; // Положительное значение = подъем
        
        // Обновляем базовые координаты только если человек значительно переместился (не при подъеме торса)
        // Проверяем, что это не просто подъем торса, а реальное перемещение
        const shoulderHipDiff = Math.abs(shoulderCenter.y - this.baseShoulderY);
        const hipDiff = Math.abs(hipCenter.y - this.baseHipY);
        // Обновляем базовые координаты только если перемещение больше порога И это не подъем (плечи не поднялись выше)
        if ((shoulderHipDiff > 0.2 || hipDiff > 0.2) && shoulderLift <= 0) {
            this.baseShoulderY = shoulderCenter.y;
            this.baseHipY = hipCenter.y;
            this.minShoulderY = shoulderCenter.y;
            console.log('Базовые координаты обновлены (перемещение)');
        }
        
        // Определяем подъем торса - используем более мягкий порог
        // Также учитываем, что плечи должны быть выше таза (в нормализованных координатах)
        const shoulderAboveHip = shoulderCenter.y < hipCenter.y; // Плечи выше таза
        const isTorsoLifted = shoulderLift > this.abdominalLiftThreshold && shoulderAboveHip; // Торс поднят от пола
        
        // Обновляем минимальную Y координату плеч (максимальный подъем)
        if (shoulderCenter.y < this.minShoulderY) {
            this.minShoulderY = shoulderCenter.y;
        }
        
        // Определяем, вернулся ли торс в исходное положение (лежа)
        const isTorsoDown = Math.abs(shoulderCenter.y - this.baseShoulderY) < this.abdominalLiftThreshold * 0.5;
        
        // Детекция подъема торса - зачёт происходит при подъеме
        if (isTorsoLifted && this.abdominalState === 'rest') {
            // Начало подъема торса
            this.isInAbdominal = true;
            this.abdominalState = 'lifting';
            this.abdominalFrames = 0;
            this.minShoulderY = shoulderCenter.y; // Сбрасываем минимальную Y
            console.log('Начало подъема торса');
        } else if (this.abdominalState === 'lifting' && isTorsoLifted) {
            // Продолжаем подъем - обновляем минимальную Y и проверяем, достаточно ли высоко поднялся торс
            if (shoulderCenter.y < this.minShoulderY) {
                this.minShoulderY = shoulderCenter.y;
            }
            
            // Торс поднят - считаем кадры для зачёта
            this.abdominalFrames++;
            if (this.abdominalFrames >= this.abdominalFramesRequired) {
                // Торс поднялся и удерживается - засчитываем повтор
                this.reps++;
                this.isInAbdominal = false;
                this.abdominalState = 'returning'; // Переходим в состояние возврата
                this.abdominalFrames = 0;
                
                console.log('Подъем торса засчитан! #' + this.reps);
                
                // Вызываем callback
                if (this.onRepComplete) {
                    this.onRepComplete({
                        rep: this.reps,
                        exercise: 'abdominal',
                        type: 'crunch',
                        angle: null // Для пресса угол не используется
                    });
                }
            }
        } else if (this.abdominalState === 'lifting' && !isTorsoLifted) {
            // Торс начал опускаться до зачёта - сбрасываем состояние
            this.isInAbdominal = false;
            this.abdominalState = 'rest';
            this.abdominalFrames = 0;
            console.log('Торс опустился до зачёта - сброс');
        } else if (this.abdominalState === 'returning' && isTorsoDown) {
            // Торс вернулся в исходное положение после зачёта - готов к следующему повтору
            this.abdominalState = 'rest';
            this.minShoulderY = this.baseShoulderY; // Сбрасываем минимальную Y
        } else if (this.abdominalState === 'returning' && !isTorsoDown) {
            // Продолжаем возврат
            // Ничего не делаем, просто ждем возврата
        } else if (this.abdominalState !== 'rest' && isTorsoDown && this.abdominalState !== 'returning') {
            // Если торс вернулся в исходное положение, но мы еще не в состоянии returning
            // Это может произойти при резком движении - сбрасываем состояние
            this.isInAbdominal = false;
            this.abdominalState = 'rest';
            this.abdominalFrames = 0;
        }
        
        // Вызываем callback для обновления статуса в реальном времени
        if (this.onScoreUpdate) {
            this.onScoreUpdate({
                exercise: 'abdominal',
                isInRep: this.isInAbdominal,
                state: this.abdominalState,
                isDeepEnough: isTorsoLifted,
                lift: shoulderLift, // Добавляем информацию о подъеме для отладки
                shoulderY: shoulderCenter.y,
                baseY: this.baseShoulderY
            });
        }
        
        // Отладочная информация для пресса
        if (window.DEBUG_MODE && this.currentExercise === 'abdominal') {
            console.log('Пресс:', {
                state: this.abdominalState,
                lift: shoulderLift.toFixed(4),
                threshold: this.abdominalLiftThreshold,
                isLifted: isTorsoLifted,
                shoulderAboveHip: shoulderAboveHip,
                frames: this.abdominalFrames
            });
        }
    } */
    
    /**
     * Анализ планки (отдельное упражнение)
     */
    analyzePlank(keypoints) {
        const getKeypoint = (index, name) => {
            if (keypoints[index] && keypoints[index].score !== undefined) {
                return keypoints[index];
            }
            if (name) {
                return keypoints.find(kp => kp.name && kp.name.toLowerCase() === name.toLowerCase());
            }
            return null;
        };
        
        // Получаем ключевые точки
        const leftShoulder = getKeypoint(5, 'left_shoulder');
        const rightShoulder = getKeypoint(6, 'right_shoulder');
        const leftHip = getKeypoint(11, 'left_hip');
        const rightHip = getKeypoint(12, 'right_hip');
        const leftKnee = getKeypoint(13, 'left_knee');
        const rightKnee = getKeypoint(14, 'right_knee');
        
        // Проверяем видимость keypoints
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || !leftKnee || !rightKnee) {
            return;
        }
        
        // Проверяем уверенность (score)
        if (leftShoulder.score < this.minScore || rightShoulder.score < this.minScore || 
            leftHip.score < this.minScore || rightHip.score < this.minScore ||
            leftKnee.score < this.minScore || rightKnee.score < this.minScore) {
            return;
        }
        
        // Вычисляем средние точки
        const shoulderCenter = {
            x: ((leftShoulder.x || 0) + (rightShoulder.x || 0)) / 2,
            y: ((leftShoulder.y || 0) + (rightShoulder.y || 0)) / 2
        };
        const hipCenter = {
            x: ((leftHip.x || 0) + (rightHip.x || 0)) / 2,
            y: ((leftHip.y || 0) + (rightHip.y || 0)) / 2
        };
        const kneeCenter = {
            x: ((leftKnee.x || 0) + (rightKnee.x || 0)) / 2,
            y: ((leftKnee.y || 0) + (rightKnee.y || 0)) / 2
        };
        
        // Угол тела для планки (плечи-таз-колени)
        const bodyAngle = this.computeAngle(shoulderCenter, hipCenter, kneeCenter);
        
        // Определяем, находится ли тело в позиции планки
        const isPlank = bodyAngle >= this.plankAngleMin && bodyAngle <= this.plankAngleMax; // Тело почти прямое (160-180°)
        
        // Детекция планки
        if (isPlank && this.plankState !== 'plank') {
            // Начало планки
            this.plankState = 'plank';
            this.isInPlank = true;
            this.plankFrames = 0;
            this.plankTotalFrames = 0;
            this.plankStartTime = Date.now();
            console.log('Начало планки, угол:', Math.round(bodyAngle));
        } else if (this.plankState === 'plank' && !isPlank) {
            // Выход из планки
            this.plankState = 'rest';
            this.isInPlank = false;
            this.plankFrames = 0;
            this.plankTotalFrames = 0;
            this.plankStartTime = null;
            console.log('Выход из планки');
        } else if (this.plankState === 'plank' && isPlank) {
            // Удерживаем планку
            this.plankFrames++;
            this.plankTotalFrames++;
            // Засчитываем планку каждые 5 секунд (при 30 fps это ~150 кадров)
            if (this.plankFrames >= this.plankFramesRequired) {
                this.reps++;
                this.plankFrames = 0;
                
                // Вычисляем накопленное время в секундах (при 30 fps)
                const totalSeconds = Math.floor(this.plankTotalFrames / 30);
                
                console.log('Планка засчитана! #' + this.reps + ', время: ' + totalSeconds + 'с');
                
                // Вызываем callback
                if (this.onRepComplete) {
                    this.onRepComplete({
                        rep: this.reps,
                        exercise: 'plank',
                        angle: bodyAngle,
                        timeSeconds: totalSeconds
                    });
                }
            }
        }
        
        // Вызываем callback для обновления статуса в реальном времени
        if (this.onScoreUpdate) {
            this.onScoreUpdate({
                exercise: 'plank',
                isInRep: this.isInPlank,
                angle: bodyAngle,
                isDeepEnough: isPlank
            });
        }
    }
    
    /**
     * Анализ стульчика (wall sit)
     */
    analyzeWallsit(keypoints) {
        const getKeypoint = (index, name) => {
            if (keypoints[index] && keypoints[index].score !== undefined) {
                return keypoints[index];
            }
            if (name) {
                return keypoints.find(kp => kp.name && kp.name.toLowerCase() === name.toLowerCase());
            }
            return null;
        };
        
        // Получаем ключевые точки для ног
        const leftHip = getKeypoint(11, 'left_hip');
        const rightHip = getKeypoint(12, 'right_hip');
        const leftKnee = getKeypoint(13, 'left_knee');
        const rightKnee = getKeypoint(14, 'right_knee');
        const leftAnkle = getKeypoint(15, 'left_ankle');
        const rightAnkle = getKeypoint(16, 'right_ankle');
        
        // Проверяем видимость keypoints
        if (!leftHip || !rightHip || !leftKnee || !rightKnee || !leftAnkle || !rightAnkle) {
            return;
        }
        
        // Проверяем уверенность (score)
        if (leftHip.score < this.minScore || rightHip.score < this.minScore ||
            leftKnee.score < this.minScore || rightKnee.score < this.minScore ||
            leftAnkle.score < this.minScore || rightAnkle.score < this.minScore) {
            return;
        }
        
        // Вычисляем углы коленей
        const leftKneeAngle = this.computeAngle(leftHip, leftKnee, leftAnkle);
        const rightKneeAngle = this.computeAngle(rightHip, rightKnee, rightAnkle);
        const avgKneeAngle = (leftKneeAngle + rightKneeAngle) / 2;
        
        // Определяем, находится ли человек в позиции стульчика
        // Угол колена должен быть между 80° и 100° (присед у стены)
        const isWallsit = avgKneeAngle >= this.wallsitAngleMin && avgKneeAngle <= this.wallsitAngleMax;
        
        // Детекция стульчика
        if (isWallsit && this.wallsitState !== 'holding') {
            // Начало удержания стульчика
            this.wallsitState = 'holding';
            this.isInWallsit = true;
            this.wallsitFrames = 0;
            this.wallsitTotalFrames = 0;
            this.wallsitStartTime = Date.now();
            console.log('Начало стульчика, угол:', Math.round(avgKneeAngle));
        } else if (this.wallsitState === 'holding' && !isWallsit) {
            // Выход из стульчика
            this.wallsitState = 'rest';
            this.isInWallsit = false;
            this.wallsitFrames = 0;
            this.wallsitTotalFrames = 0;
            this.wallsitStartTime = null;
            console.log('Выход из стульчика');
        } else if (this.wallsitState === 'holding' && isWallsit) {
            // Удерживаем стульчик
            this.wallsitFrames++;
            this.wallsitTotalFrames++;
            // Засчитываем стульчик каждые 5 секунд (при 30 fps это ~150 кадров)
            if (this.wallsitFrames >= this.wallsitFramesRequired) {
                this.reps++;
                this.wallsitFrames = 0;
                
                // Вычисляем накопленное время в секундах (при 30 fps)
                const totalSeconds = Math.floor(this.wallsitTotalFrames / 30);
                
                console.log('Стульчик засчитан! #' + this.reps + ', время: ' + totalSeconds + 'с');
                
                // Вызываем callback
                if (this.onRepComplete) {
                    this.onRepComplete({
                        rep: this.reps,
                        exercise: 'wallsit',
                        angle: avgKneeAngle,
                        timeSeconds: totalSeconds
                    });
                }
            }
        }
        
        // Вызываем callback для обновления статуса в реальном времени
        if (this.onScoreUpdate) {
            this.onScoreUpdate({
                exercise: 'wallsit',
                isInRep: this.isInWallsit,
                angle: avgKneeAngle,
                isDeepEnough: isWallsit
            });
        }
    }
    
    /**
     * Анализ бёрпи (упрощенная логика: упор лёжа → встал) - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
     */
    /* analyzeBurpee(keypoints) {
        const getKeypoint = (index, name) => {
            if (keypoints[index] && keypoints[index].score !== undefined) {
                return keypoints[index];
            }
            if (name) {
                return keypoints.find(kp => kp.name && kp.name.toLowerCase() === name.toLowerCase());
            }
            return null;
        };
        
        // Получаем ключевые точки
        const leftShoulder = getKeypoint(5, 'left_shoulder');
        const rightShoulder = getKeypoint(6, 'right_shoulder');
        const leftHip = getKeypoint(11, 'left_hip');
        const rightHip = getKeypoint(12, 'right_hip');
        const leftKnee = getKeypoint(13, 'left_knee');
        const rightKnee = getKeypoint(14, 'right_knee');
        
        // Проверяем видимость keypoints
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || 
            !leftKnee || !rightKnee) {
            return;
        }
        
        // Проверяем уверенность (score)
        if (leftShoulder.score < this.minScore || rightShoulder.score < this.minScore || 
            leftHip.score < this.minScore || rightHip.score < this.minScore ||
            leftKnee.score < this.minScore || rightKnee.score < this.minScore) {
            return;
        }
        
        // Вычисляем средние точки
        const shoulderCenter = {
            x: ((leftShoulder.x || 0) + (rightShoulder.x || 0)) / 2,
            y: ((leftShoulder.y || 0) + (rightShoulder.y || 0)) / 2
        };
        const hipCenter = {
            x: ((leftHip.x || 0) + (rightHip.x || 0)) / 2,
            y: ((leftHip.y || 0) + (rightHip.y || 0)) / 2
        };
        const kneeCenter = {
            x: ((leftKnee.x || 0) + (rightKnee.x || 0)) / 2,
            y: ((leftKnee.y || 0) + (rightKnee.y || 0)) / 2
        };
        
        // Вычисляем углы
        const leftKneeAngle = this.computeAngle(leftHip, leftKnee, {x: leftHip.x, y: leftHip.y + 1});
        const rightKneeAngle = this.computeAngle(rightHip, rightKnee, {x: rightHip.x, y: rightHip.y + 1});
        const avgKneeAngle = (leftKneeAngle + rightKneeAngle) / 2;
        const bodyAngle = this.computeAngle(shoulderCenter, hipCenter, kneeCenter);
        
        // Определяем фазы бёрпи (упрощенная логика)
        const isPlank = bodyAngle >= this.burpeePlankAngleMin && bodyAngle <= this.burpeePlankAngleMax; // Упор лёжа (планка)
        const isStanding = avgKneeAngle > this.burpeeStandThreshold; // Встал (выпрямился)
        
        // Упрощенная машина состояний: rest → plank → standing → rest
        if (this.burpeeState === 'rest' && isPlank) {
            // Приняли упор лёжа
            this.burpeeState = 'plank';
            this.isInBurpee = true;
            this.burpeeFrames = 0;
            console.log('Бёрпи: упор лёжа');
        } else if (this.burpeeState === 'plank' && isStanding) {
            // Встали из упора лёжа
            this.burpeeState = 'standing';
            this.burpeeFrames = 0;
            console.log('Бёрпи: встал');
        } else if (this.burpeeState === 'standing' && isStanding) {
            // Удерживаем выпрямление (встали)
            this.burpeeFrames++;
            if (this.burpeeFrames >= this.burpeeFramesRequired) {
                // Завершили бёрпи (лёг и встал)
                this.reps++;
                this.burpeeState = 'rest';
                this.isInBurpee = false;
                this.burpeeFrames = 0;
                
                console.log('Бёрпи завершен! #' + this.reps);
                
                // Вызываем callback
                if (this.onRepComplete) {
                    this.onRepComplete({
                        rep: this.reps,
                        exercise: 'burpee',
                        angle: avgKneeAngle
                    });
                }
            }
        } else if (this.burpeeState === 'plank' && !isPlank && !isStanding) {
            // Вышли из упора лёжа, но еще не встали - сбрасываем
            this.burpeeState = 'rest';
            this.isInBurpee = false;
            this.burpeeFrames = 0;
        }
        
        // Вызываем callback для обновления статуса в реальном времени
        if (this.onScoreUpdate) {
            this.onScoreUpdate({
                exercise: 'burpee',
                isInRep: this.isInBurpee,
                angle: avgKneeAngle,
                state: this.burpeeState,
                isDeepEnough: this.isInBurpee
            });
        }
    } */
    
    /**
     * Обработка результатов MoveNet
     */
    async processFrame() {
        if (!this.isActive || !this.video || !this.canvas || !this.model) {
            return;
        }
        
        try {
            // Оцениваем позу с помощью MoveNet
            const poses = await this.model.estimatePoses(this.video, {
                maxPoses: 1,
                flipHorizontal: false
            });
            
            if (poses && poses.length > 0) {
                const pose = poses[0];
                const keypoints = pose.keypoints || [];
                
                if (keypoints.length > 0) {
                    // Рисуем позу на canvas
                    this.drawPose(keypoints);
                    
                    // Анализируем позиционирование (показываем подсказки)
                    this.analyzePositioning(keypoints);
                    
                    // Анализируем упражнение
                    if (this.currentExercise === 'squat') {
                        this.analyzeSquat(keypoints);
                    } else if (this.currentExercise === 'pushup') {
                        this.analyzePushup(keypoints);
                    } /* else if (this.currentExercise === 'abdominal') {
                        this.analyzeAbdominal(keypoints);
                    } */ // ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
                    else if (this.currentExercise === 'plank') {
                        this.analyzePlank(keypoints);
                    } else if (this.currentExercise === 'wallsit') {
                        this.analyzeWallsit(keypoints);
                    } /* else if (this.currentExercise === 'burpee') {
                        this.analyzeBurpee(keypoints);
                    } */ // ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
                }
            } else {
                // Если поза не обнаружена, очищаем canvas
                if (this.ctx && this.canvas) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                }
            }
            
            // Продолжаем обработку следующего кадра
            requestAnimationFrame(() => this.processFrame());
        } catch (error) {
            console.error('Ошибка обработки кадра:', error);
            // Продолжаем обработку даже при ошибке
            requestAnimationFrame(() => this.processFrame());
        }
    }
    
    /**
     * Рисование позы на canvas
     */
    drawPose(keypoints) {
        if (!this.ctx || !this.canvas || !this.video) return;
        
        // Очищаем canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Получаем размеры видео для масштабирования координат
        // MoveNet возвращает координаты в пикселях относительно входного изображения
        const videoWidth = this.video.videoWidth || this.canvas.width;
        const videoHeight = this.video.videoHeight || this.canvas.height;
        
        // Если координаты нормализованные (0-1), масштабируем их
        // Если координаты в пикселях, проверяем, нужно ли масштабирование
        const firstKp = keypoints[0];
        const isNormalized = firstKp && (firstKp.x <= 1 && firstKp.y <= 1);
        
        const scaleX = isNormalized ? this.canvas.width : (this.canvas.width / videoWidth);
        const scaleY = isNormalized ? this.canvas.height : (this.canvas.height / videoHeight);
        
        // Функция для получения keypoint по индексу или имени
        const getKeypoint = (index, name) => {
            if (keypoints[index] && keypoints[index].score !== undefined) {
                return keypoints[index];
            }
            if (name) {
                return keypoints.find(kp => kp.name && kp.name.toLowerCase() === name.toLowerCase());
            }
            return null;
        };
        
        // Рисуем keypoints
        keypoints.forEach((kp, index) => {
            if (kp && kp.score > 0.3) {
                this.ctx.fillStyle = '#00FF00';
                this.ctx.beginPath();
                // Масштабируем координаты под размер canvas
                const x = (kp.x || 0) * scaleX;
                const y = (kp.y || 0) * scaleY;
                this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        });
        
        // Рисуем соединения (скелет) - используем индексы
        const connections = [
            [5, 6],   // left_shoulder - right_shoulder
            [5, 7],   // left_shoulder - left_elbow
            [7, 9],   // left_elbow - left_wrist
            [6, 8],   // right_shoulder - right_elbow
            [8, 10],  // right_elbow - right_wrist
            [5, 11],  // left_shoulder - left_hip
            [6, 12],  // right_shoulder - right_hip
            [11, 12], // left_hip - right_hip
            [11, 13], // left_hip - left_knee
            [13, 15], // left_knee - left_ankle
            [12, 14], // right_hip - right_knee
            [14, 16]  // right_knee - right_ankle
        ];
        
        this.ctx.strokeStyle = '#00FF00';
        this.ctx.lineWidth = 2;
        
        connections.forEach(([idx1, idx2]) => {
            const kp1 = getKeypoint(idx1);
            const kp2 = getKeypoint(idx2);
            
            if (kp1 && kp2 && kp1.score > 0.3 && kp2.score > 0.3) {
                const x1 = (kp1.x || 0) * scaleX;
                const y1 = (kp1.y || 0) * scaleY;
                const x2 = (kp2.x || 0) * scaleX;
                const y2 = (kp2.y || 0) * scaleY;
                
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.stroke();
            }
        });
    }
    
    
    /**
     * Запуск анализа
     */
    async start(videoElement, canvasElement) {
        this.video = videoElement;
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        
        // Устанавливаем размеры canvas равными размерам video
        if (this.video.videoWidth && this.video.videoHeight) {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
        } else {
            // Если размеры еще не известны, ждем
            this.video.addEventListener('loadedmetadata', () => {
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
            });
        }
        
        if (!this.model) {
            console.error('✗ MoveNet модель не загружена. Подождите несколько секунд и попробуйте снова.');
            return;
        }
        
        console.log('Запуск анализа с видео:', {
            width: this.video.videoWidth,
            height: this.video.videoHeight,
            canvasWidth: this.canvas.width,
            canvasHeight: this.canvas.height
        });
        
        this.isActive = true;
        console.log('✓ MoveNet анализ запущен');
        this.processFrame();
    }
    
    /**
     * Получить статистику
     */
    getStats() {
        return {
            reps: this.reps,
            totalScore: this.totalScore,
            averageScore: this.reps > 0 ? (this.totalScore / this.reps).toFixed(1) : 0,
            scores: this.scores
        };
    }
    
    /**
     * Остановка анализа
     */
    stop() {
        this.isActive = false;
    }
    
    /**
     * Сброс статистики
     */
    reset() {
        this.reps = 0;
        this.totalScore = 0;
        this.currentRepScore = 0;
        this.scores = [];
        this.minKneeAngle = 180;
        this.maxKneeAngle = 0;
        this.isInSquat = false;
        this.prevSquat = false;
        this.standingFrames = 0;
    }
    
    /**
     * Установка текущего упражнения
     */
    setExercise(exercise) {
        this.currentExercise = exercise;
        this.reset();
    }
    
    /**
     * Запуск камеры
     */
    async startCamera(videoElement = null) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                }
            });
            
            // Используем переданный video элемент или сохраненный
            const video = videoElement || this.video;
            if (video) {
                video.srcObject = stream;
                this.video = video; // Сохраняем ссылку
                await new Promise((resolve) => {
                    video.onloadedmetadata = () => {
                        video.play();
                        resolve();
                    };
                });
            }
            
            return stream;
        } catch (error) {
            console.error('Ошибка доступа к камере:', error);
            throw error;
        }
    }
    
    /**
     * Остановка камеры
     */
    stopCamera() {
        if (this.video && this.video.srcObject) {
            const stream = this.video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            this.video.srcObject = null;
        }
    }
}

