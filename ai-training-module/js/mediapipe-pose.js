/**
 * MediaPipe Pose Integration для tabatatimer.ru
 * Оценка упражнений в реальном времени с баллами 1-3
 */

class MediaPipePoseAnalyzer {
    constructor() {
        this.pose = null;
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
        this.squatThreshold = 120; // Порог для засчитывания приседа (более мягкий)
        this.standThreshold = 150; // Порог для засчитывания выпрямления
        this.repMinDepth = 130; // Минимальная глубина для засчитывания повтора (было 110)
        
        // Параметры для отжиманий
        this.pushupThreshold = 150; // Порог для начала отжимания (выпрямление)
        this.pushupExtendedThreshold = 160; // Порог для полного выпрямления
        this.pushupMinDepth = 80; // Минимальная глубина для засчитывания отжимания (угол локтя, было 90)
        this.minElbowAngle = 180; // Минимальный угол локтя (самое глубокое отжимание)
        
        // Параметры для пресса (отслеживание подъема торса) - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
        /* this.abdominalState = 'rest'; // 'rest', 'lifting', 'returning'
        this.isInAbdominal = false;
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
        
        // Инициализация MediaPipe (отложенная, после загрузки страницы)
        // Не вызываем сразу, чтобы дать время загрузиться скриптам MediaPipe
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.initMediaPipe(), 500);
            });
        } else {
            setTimeout(() => this.initMediaPipe(), 500);
        }
    }
    
    /**
     * Инициализация MediaPipe Pose
     */
    async initMediaPipe() {
        try {
            console.log('Ожидание загрузки MediaPipe...');
            
            // Ждем загрузки MediaPipe из CDN
            const mpPoseModule = await this.waitForMediaPipe();
            
            // Используем полученный модуль или window.mp.pose
            let mpPose = mpPoseModule;
            
            // Если модуль не получен, ищем в разных местах
            if (!mpPose) {
                // Проверяем window.mpPose (сохраненный ранее)
                if (window.mpPose && typeof window.mpPose.Pose === 'function') {
                    mpPose = window.mpPose;
                    console.log('Используем window.mpPose');
                }
                // Проверяем window.mp.pose
                else if (window.mp && window.mp.pose) {
                    mpPose = window.mp.pose;
                    console.log('Используем window.mp.pose');
                }
                // Проверяем глобальный mp.pose
                else if (typeof mp !== 'undefined' && mp && mp.pose) {
                    mpPose = mp.pose;
                    window.mp = mp; // Сохраняем для удобства
                    console.log('Используем глобальный mp.pose');
                }
                // Проверяем globalThis.mp.pose
                else if (typeof globalThis !== 'undefined' && globalThis.mp && globalThis.mp.pose) {
                    mpPose = globalThis.mp.pose;
                    window.mp = globalThis.mp;
                    console.log('Используем globalThis.mp.pose');
                }
                // Проверяем прямой экспорт Pose
                else if (typeof Pose !== 'undefined') {
                    window.mp = window.mp || {};
                    window.mp.pose = {
                        Pose: Pose
                    };
                    mpPose = window.mp.pose;
                    console.log('Используем глобальный Pose');
                }
            }
            
            if (!mpPose || typeof mpPose.Pose !== 'function') {
                console.error('Доступные объекты:', {
                    'mpPoseModule': !!mpPoseModule,
                    'window.mp': !!window.mp,
                    'mp (global)': typeof mp !== 'undefined',
                    'window.mp.pose': !!(window.mp && window.mp.pose),
                    'mp.pose': typeof mp !== 'undefined' && !!mp.pose
                });
                throw new Error('MediaPipe Pose конструктор не найден. Проверьте загрузку скриптов MediaPipe.');
            }
            
            console.log('Создание экземпляра MediaPipe Pose...');
            console.log('mpPose найден:', typeof mpPose.Pose);
            
            // Создаем экземпляр Pose
            try {
                this.pose = new mpPose.Pose({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
                    }
                });
                console.log('Экземпляр Pose создан успешно');
            } catch (error) {
                console.error('Ошибка создания Pose:', error);
                console.error('mpPose:', mpPose);
                throw error;
            }
            
            this.pose.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                enableSegmentation: false,
                smoothSegmentation: false,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            
            this.pose.onResults(this.onResults.bind(this));
            
            console.log('MediaPipe Pose успешно инициализирован');
        } catch (error) {
            console.error('Ошибка инициализации MediaPipe:', error);
            console.error('Попробуйте обновить страницу или проверьте подключение к интернету');
        }
    }
    
    /**
     * Ожидание загрузки MediaPipe
     */
    waitForMediaPipe() {
        return new Promise((resolve, reject) => {
            // Функция проверки готовности MediaPipe - проверяем разные варианты
            const checkMediaPipe = () => {
                // Вариант 1: window.mpPose (сохраненный ранее)
                if (window.mpPose && typeof window.mpPose.Pose === 'function') {
                    return window.mpPose;
                }
                // Вариант 2: window.mp.pose.Pose
                if (window.mp && window.mp.pose && typeof window.mp.pose.Pose === 'function') {
                    return window.mp.pose;
                }
                // Вариант 3: mp.pose (без window)
                if (typeof mp !== 'undefined' && mp && mp.pose && typeof mp.pose.Pose === 'function') {
                    window.mp = mp; // Сохраняем в window для удобства
                    return mp.pose;
                }
                // Вариант 4: через глобальный объект
                if (typeof globalThis !== 'undefined' && globalThis.mp && globalThis.mp.pose && typeof globalThis.mp.pose.Pose === 'function') {
                    window.mp = globalThis.mp;
                    return globalThis.mp.pose;
                }
                // Вариант 5: прямой экспорт Pose (некоторые версии MediaPipe)
                if (typeof Pose !== 'undefined' && typeof Pose === 'function') {
                    // Создаем обертку для совместимости
                    window.mp = window.mp || {};
                    window.mp.pose = {
                        Pose: Pose
                    };
                    return window.mp.pose;
                }
                return null;
            };
            
            // Проверяем сразу
            const mpPose = checkMediaPipe();
            if (mpPose) {
                console.log('MediaPipe Pose уже загружен');
                resolve(mpPose); // Возвращаем модуль для использования
                return;
            }
            
            let attempts = 0;
            const maxAttempts = 150; // 15 секунд максимум
            
            console.log('Ожидание загрузки MediaPipe Pose...');
            console.log('Проверка доступных объектов:', {
                'window.mp': !!window.mp,
                'window.mp.pose': !!(window.mp && window.mp.pose),
                'mp (global)': typeof mp !== 'undefined',
                'mp.pose': typeof mp !== 'undefined' && !!(mp && mp.pose),
                'globalThis.mp': typeof globalThis !== 'undefined' && !!globalThis.mp,
                'Pose (global)': typeof Pose !== 'undefined',
                'window.mpPose': !!window.mpPose
            });
            
            const checkInterval = setInterval(() => {
                attempts++;
                
                const mpPose = checkMediaPipe();
                if (mpPose) {
                    clearInterval(checkInterval);
                    console.log('MediaPipe Pose готов к использованию (попытка ' + attempts + ')');
                    resolve(mpPose); // Возвращаем модуль для использования
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    const status = {
                        mediaPipeLoaded: window.mediaPipeLoaded || false,
                        'window.mp': !!window.mp,
                        'window.mp.pose': !!(window.mp && window.mp.pose),
                        'mp (global)': typeof mp !== 'undefined',
                        'mp.pose': typeof mp !== 'undefined' && !!(mp && mp.pose),
                        'globalThis.mp': typeof globalThis !== 'undefined' && !!globalThis.mp,
                        'Pose (global)': typeof Pose !== 'undefined',
                        'window.mpPose': !!window.mpPose
                    };
                    console.error('MediaPipe не загрузился. Статус:', status);
                    console.error('Попробуйте использовать альтернативный CDN или локальную версию MediaPipe');
                    reject(new Error('MediaPipe не загрузился за отведенное время. Проверьте подключение к интернету и CDN.'));
                } else if (attempts % 20 === 0) {
                    // Логируем каждые 20 попыток
                    console.log('Ожидание MediaPipe... попытка ' + attempts + '/' + maxAttempts);
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
     * Анализ приседания
     */
    analyzeSquat(landmarks) {
        // Используем правую ногу (landmarks 24, 26, 28) или левую (23, 25, 27)
        const rightHip = landmarks[24];
        const rightKnee = landmarks[26];
        const rightAnkle = landmarks[28];
        const leftHip = landmarks[23];
        const leftKnee = landmarks[25];
        const leftAnkle = landmarks[27];
        
        // Используем ту ногу, которая лучше видна
        let hip, knee, ankle;
        if (rightHip && rightKnee && rightAnkle && 
            rightHip.visibility > 0.5 && rightKnee.visibility > 0.5 && rightAnkle.visibility > 0.5) {
            hip = rightHip;
            knee = rightKnee;
            ankle = rightAnkle;
        } else if (leftHip && leftKnee && leftAnkle && 
                   leftHip.visibility > 0.5 && leftKnee.visibility > 0.5 && leftAnkle.visibility > 0.5) {
            hip = leftHip;
            knee = leftKnee;
            ankle = leftAnkle;
        } else {
            return null; // Недостаточно видимых точек
        }
        
        const kneeAngle = this.computeAngle(hip, knee, ankle);
        
        // Обновляем минимальный и максимальный углы
        this.minKneeAngle = Math.min(this.minKneeAngle, kneeAngle);
        this.maxKneeAngle = Math.max(this.maxKneeAngle, kneeAngle);
        
        // Определяем состояние: присед или выпрямление
        const isSquatting = kneeAngle < this.squatThreshold; // Более мягкий порог
        const isStanding = kneeAngle > this.standThreshold;
        
        // Детекция повторов: цикл выпрямление -> присед -> выпрямление
        if (!this.isInSquat && isSquatting) {
            // Начало нового приседа (переход из стоячего положения в присед)
            this.isInSquat = true;
            this.minKneeAngle = kneeAngle; // Сбрасываем минимум для нового повтора
            console.log('Начало приседа, угол:', Math.round(kneeAngle));
        } else if (this.isInSquat) {
            // Мы в процессе приседа
            // Обновляем минимальный угол (самый глубокий присед)
            if (kneeAngle < this.minKneeAngle) {
                this.minKneeAngle = kneeAngle;
            }
            
            // Проверяем, вернулись ли мы в исходное положение (выпрямились)
            if (isStanding && this.isSquatDeepEnough(this.minKneeAngle)) {
                // Завершение повтора: мы присели достаточно глубоко и вернулись в исходное положение
                this.isInSquat = false;
                this.reps++;
                
                console.log('Повтор завершен! #' + this.reps + ', угол:', Math.round(this.minKneeAngle));
                
                // Вызываем callback для обновления UI
                if (this.onRepComplete) {
                    this.onRepComplete({
                        rep: this.reps,
                        exercise: 'squat',
                        angle: this.minKneeAngle
                    });
                }
                
                // Сбрасываем для следующего повтора
                this.minKneeAngle = 180;
                this.maxKneeAngle = 0;
            } else if (isStanding && !this.isSquatDeepEnough(this.minKneeAngle)) {
                // Выпрямились, но присед был недостаточно глубоким - не засчитываем
                this.isInSquat = false;
                this.minKneeAngle = 180;
                this.maxKneeAngle = 0;
                console.log('Присед недостаточно глубокий, не засчитан. Угол:', Math.round(this.minKneeAngle));
            }
        }
        
        return {
            angle: kneeAngle,
            isSquatting: isSquatting,
            minAngle: this.minKneeAngle,
            isInRep: this.isInSquat,
            isDeepEnough: this.isInSquat ? this.isSquatDeepEnough(kneeAngle) : false
        };
    }
    
    /**
     * Анализ отжимания
     */
    analyzePushup(landmarks) {
        // Используем обе руки для более точного определения
        const leftShoulder = landmarks[11];
        const leftElbow = landmarks[13];
        const leftWrist = landmarks[15];
        const rightShoulder = landmarks[12];
        const rightElbow = landmarks[14];
        const rightWrist = landmarks[16];
        
        // Выбираем руку с лучшей видимостью
        let shoulder, elbow, wrist;
        if (rightShoulder && rightElbow && rightWrist && 
            rightShoulder.visibility > 0.5 && rightElbow.visibility > 0.5 && rightWrist.visibility > 0.5) {
            shoulder = rightShoulder;
            elbow = rightElbow;
            wrist = rightWrist;
        } else if (leftShoulder && leftElbow && leftWrist && 
                   leftShoulder.visibility > 0.5 && leftElbow.visibility > 0.5 && leftWrist.visibility > 0.5) {
            shoulder = leftShoulder;
            elbow = leftElbow;
            wrist = leftWrist;
        } else {
            return null; // Недостаточно видимых точек
        }
        
        const elbowAngle = this.computeAngle(shoulder, elbow, wrist);
        
        // Обновляем минимальный угол (самое глубокое отжимание)
        if (elbowAngle < this.minElbowAngle) {
            this.minElbowAngle = elbowAngle;
        }
        
        // Определяем состояние отжимания
        // Выпрямление: угол > pushupExtendedThreshold (руки выпрямлены)
        // Сгибание: угол < pushupThreshold (руки согнуты)
        const isExtended = elbowAngle > this.pushupExtendedThreshold; // Полностью выпрямлены
        const isBent = elbowAngle < this.pushupThreshold; // Согнуты (в процессе отжимания)
        
        // Детекция повторов: выпрямлены -> согнулись -> выпрямились
        if (!this.isInPushup && isBent) {
            // Начали отжиматься (переход из выпрямленного положения в согнутое)
            this.isInPushup = true;
            this.minElbowAngle = elbowAngle; // Сбрасываем минимум для нового повтора
            console.log('Начало отжимания, угол:', Math.round(elbowAngle));
        } else if (this.isInPushup) {
            // Мы в процессе отжимания
            // Обновляем минимальный угол (самое глубокое отжимание)
            if (elbowAngle < this.minElbowAngle) {
                this.minElbowAngle = elbowAngle;
            }
            
            // Проверяем, вернулись ли мы в исходное положение (выпрямились)
            if (isExtended && this.isPushupDeepEnough(this.minElbowAngle)) {
                // Завершение повтора: мы согнулись достаточно глубоко и выпрямились
            this.isInPushup = false;
            this.reps++;
            
                console.log('Отжимание завершено! #' + this.reps + ', угол:', Math.round(this.minElbowAngle));
            
                // Вызываем callback для обновления UI
            if (this.onRepComplete) {
                this.onRepComplete({
                    rep: this.reps,
                        exercise: 'pushup',
                        angle: this.minElbowAngle
                    });
                }
                
                // Сбрасываем для следующего повтора
                this.minElbowAngle = 180;
            } else if (isExtended && !this.isPushupDeepEnough(this.minElbowAngle)) {
                // Выпрямились, но отжимание было недостаточно глубоким - не засчитываем
                this.isInPushup = false;
                this.minElbowAngle = 180;
                console.log('Отжимание недостаточно глубокое, не засчитано. Угол:', Math.round(this.minElbowAngle));
            }
        }
        
        return {
            angle: elbowAngle,
            isPushing: isBent,
            minAngle: this.minElbowAngle,
            isInRep: this.isInPushup,
            isDeepEnough: this.isInPushup ? this.isPushupDeepEnough(elbowAngle) : false
        };
    }
    
    /**
     * Вычисление расстояния между двумя точками
     */
    computeDistance(point1, point2) {
        const dx = (point1.x || 0) - (point2.x || 0);
        const dy = (point1.y || 0) - (point2.y || 0);
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * Анализ упражнений на пресс (скручивания и планка)
     */
    analyzeAbdominal(landmarks) {
        // Используем обе стороны для более точного определения
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];
        const leftKnee = landmarks[25];
        const rightKnee = landmarks[26];
        
        // Проверяем видимость точек
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
            return null;
        }
        
        // Проверяем видимость
        if (leftShoulder.visibility < 0.5 || rightShoulder.visibility < 0.5 ||
            leftHip.visibility < 0.5 || rightHip.visibility < 0.5) {
            return null;
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
        
        return {
            state: this.abdominalState,
            lift: shoulderLift,
            isInRep: this.isInAbdominal,
            isDeepEnough: isTorsoLifted
        };
    } */
    
    /**
     * Анализ планки (отдельное упражнение)
     */
    analyzePlank(landmarks) {
        // Используем обе стороны для более точного определения
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];
        const leftKnee = landmarks[25];
        const rightKnee = landmarks[26];
        
        // Проверяем видимость точек
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || !leftKnee || !rightKnee) {
            return null;
        }
        
        // Проверяем видимость
        if (leftShoulder.visibility < 0.5 || rightShoulder.visibility < 0.5 ||
            leftHip.visibility < 0.5 || rightHip.visibility < 0.5 ||
            leftKnee.visibility < 0.5 || rightKnee.visibility < 0.5) {
            return null;
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
        
        return {
            angle: bodyAngle,
            isInRep: this.isInPlank,
            isDeepEnough: isPlank
        };
    }
    
    /**
     * Анализ стульчика (wall sit)
     */
    analyzeWallsit(landmarks) {
        // Используем обе ноги для более точного определения
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];
        const leftKnee = landmarks[25];
        const rightKnee = landmarks[26];
        const leftAnkle = landmarks[27];
        const rightAnkle = landmarks[28];
        
        // Проверяем видимость точек
        if (!leftHip || !rightHip || !leftKnee || !rightKnee || !leftAnkle || !rightAnkle) {
            return null;
        }
        
        // Проверяем видимость
        if (leftHip.visibility < 0.5 || rightHip.visibility < 0.5 ||
            leftKnee.visibility < 0.5 || rightKnee.visibility < 0.5 ||
            leftAnkle.visibility < 0.5 || rightAnkle.visibility < 0.5) {
            return null;
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
        
        return {
            angle: avgKneeAngle,
            isInRep: this.isInWallsit,
            isDeepEnough: isWallsit
        };
    }
    
    /**
     * Анализ бёрпи (упрощенная логика: упор лёжа → встал) - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
     */
    /* analyzeBurpee(landmarks) {
        // Используем обе стороны для более точного определения
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];
        const leftKnee = landmarks[25];
        const rightKnee = landmarks[26];
        
        // Проверяем видимость точек
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || 
            !leftKnee || !rightKnee) {
            return null;
        }
        
        // Проверяем видимость
        if (leftShoulder.visibility < 0.5 || rightShoulder.visibility < 0.5 ||
            leftHip.visibility < 0.5 || rightHip.visibility < 0.5 ||
            leftKnee.visibility < 0.5 || rightKnee.visibility < 0.5) {
            return null;
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
        
        return {
            angle: avgKneeAngle,
            isInRep: this.isInBurpee,
            state: this.burpeeState,
            isDeepEnough: this.isInBurpee
        };
    } */
    
    /**
     * Обработка результатов MediaPipe
     */
    onResults(results) {
        if (!this.isActive || !this.canvas || !this.ctx) {
            return;
        }
        
        // Очищаем canvas
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Рисуем видео
        this.ctx.drawImage(results.image, 0, 0, this.canvas.width, this.canvas.height);
        
        // Рисуем позу (опционально, для визуализации)
        if (results.poseLandmarks && results.poseLandmarks.length > 0) {
            // Анализируем упражнение ПЕРЕД отрисовкой
            let analysis = null;
            if (this.currentExercise === 'squat') {
                analysis = this.analyzeSquat(results.poseLandmarks);
            } else if (this.currentExercise === 'pushup') {
                analysis = this.analyzePushup(results.poseLandmarks);
            } /* else if (this.currentExercise === 'abdominal') {
                analysis = this.analyzeAbdominal(results.poseLandmarks);
            } */ // ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
            else if (this.currentExercise === 'plank') {
                analysis = this.analyzePlank(results.poseLandmarks);
            } else if (this.currentExercise === 'wallsit') {
                analysis = this.analyzeWallsit(results.poseLandmarks);
            } /* else if (this.currentExercise === 'burpee') {
                analysis = this.analyzeBurpee(results.poseLandmarks);
            } */ // ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
            
            // Обновляем UI с текущим баллом ВСЕГДА, даже если анализ вернул null
            if (this.onScoreUpdate) {
                if (analysis) {
                    // Для пресса используем bodyAngle или distance вместо angle
                    // Для бёрпи используем angle и state
                    const angle = analysis.angle !== undefined ? analysis.angle : 
                                 (analysis.bodyAngle !== undefined ? analysis.bodyAngle : 0);
                    this.onScoreUpdate({
                        exercise: this.currentExercise,
                        angle: angle,
                        isInRep: analysis.isInRep || false,
                        isDeepEnough: analysis.isDeepEnough || false,
                        state: analysis.state || null
                    });
                } else {
                    // Если анализ не удался (не видно позу)
                    this.onScoreUpdate({
                        exercise: this.currentExercise,
                        angle: 0,
                        isInRep: false,
                        isDeepEnough: false
                    });
                }
            }
            
            // Рисуем позу для визуализации (опционально)
            // this.drawPoseLandmarks(results.poseLandmarks);
        } else {
            // Поза не обнаружена
            if (this.onScoreUpdate) {
                this.onScoreUpdate({
                    exercise: this.currentExercise,
                    angle: 0,
                    isInRep: false,
                    isDeepEnough: false
                });
            }
        }
        
        this.ctx.restore();
    }
    
    /**
     * Рисование ключевых точек позы
     */
    drawPoseLandmarks(landmarks) {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = '#00FF00';
        landmarks.forEach((landmark, index) => {
            const x = landmark.x * this.canvas.width;
            const y = landmark.y * this.canvas.height;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }
    
    /**
     * Запуск анализа с веб-камеры
     */
    async start(videoElement, canvasElement, exercise = 'squat') {
        try {
            this.video = videoElement;
            this.canvas = canvasElement;
            this.ctx = canvasElement.getContext('2d');
            this.currentExercise = exercise;
            this.isActive = true;
            
            // Сбрасываем статистику
            this.reps = 0;
            this.totalScore = 0;
            this.currentRepScore = 0;
            this.scores = [];
            this.isInSquat = false;
            this.isInPushup = false;
            
            // Получаем доступ к камере
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user'
                }
            });
            
            this.video.srcObject = stream;
            this.video.onloadedmetadata = () => {
                this.video.play();
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
                this.processVideo();
            };
            
            console.log('Анализ упражнений запущен');
        } catch (error) {
            console.error('Ошибка запуска камеры:', error);
            alert('Не удалось получить доступ к камере. Проверьте разрешения.');
        }
    }
    
    /**
     * Обработка видео кадров
     */
    processVideo() {
        if (!this.isActive || !this.video || !this.pose) {
            return;
        }
        
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.pose.send({ image: this.video });
        }
        
        requestAnimationFrame(() => this.processVideo());
    }
    
    /**
     * Остановка анализа
     */
    stop() {
        this.isActive = false;
        
        if (this.video && this.video.srcObject) {
            const stream = this.video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            this.video.srcObject = null;
        }
        
        if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        console.log('Анализ упражнений остановлен');
    }
    
    /**
     * Получение статистики
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
     * Сброс статистики
     */
    reset() {
        this.reps = 0;
        this.totalScore = 0;
        this.currentRepScore = 0;
        this.scores = [];
        this.isInSquat = false;
        this.isInPushup = false;
        this.minKneeAngle = 180;
        this.maxKneeAngle = 0;
    }
}

// Экспорт для использования в других скриптах
window.MediaPipePoseAnalyzer = MediaPipePoseAnalyzer;

