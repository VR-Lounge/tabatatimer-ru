/**
 * Интеграция MoveNet (TensorFlow.js) с таймером tabatatimer.ru
 * Заменяет MediaPipe для работы в России
 */

(function() {
    'use strict';
    
    let poseAnalyzer = null;
    let isMediaPipeActive = false;
    let repHistory = []; // История повторов с данными о технике
    
    /**
     * Инициализация MoveNet интеграции
     */
    function initMediaPipeIntegration() {
        // Проверяем, что MoveNetPoseAnalyzer доступен
        if (typeof MoveNetPoseAnalyzer === 'undefined') {
            console.warn('MoveNetPoseAnalyzer не загружен, повторная попытка через 1 секунду...');
            setTimeout(initMediaPipeIntegration, 1000);
            return;
        }
        
        console.log('Создание экземпляра MoveNetPoseAnalyzer...');
        
        // Создаем экземпляр анализатора
        poseAnalyzer = new MoveNetPoseAnalyzer();
        
        // Делаем poseAnalyzer доступным глобально для панели калибровки
        window.poseAnalyzer = poseAnalyzer;
        
        // Настраиваем callbacks
        poseAnalyzer.onScoreUpdate = function(data) {
            updateScoreDisplay(data.exercise, data.isInRep, data.isDeepEnough);
            
            // Отладочная информация (только в debug режиме)
            if (window.DEBUG_MODE && data.angle) {
                console.log('Угол:', Math.round(data.angle), 'В повторе:', data.isInRep, 'Достаточно глубоко:', data.isDeepEnough);
            }
        };
        
        poseAnalyzer.onRepComplete = function(data) {
            // Сохраняем данные о повторе с информацией о технике
            const repData = {
                rep: data.rep,
                exercise: data.exercise,
                angle: data.angle,
                timeSeconds: data.timeSeconds,
                technique: getTechniqueDescription(data.exercise, data.angle, data.timeSeconds)
            };
            repHistory.push(repData);
            
            showRepNotification(data.rep, data.exercise, data.timeSeconds);
            updateStatsDisplay(data);
        };
        
        poseAnalyzer.onPositionHint = function(hint) {
            showPositionHint(hint);
        };
        
        // Инициализируем UI
        initMediaPipeUI();
        
        console.log('MoveNet интеграция инициализирована');
    }
    
    /**
     * Инициализация UI элементов
     */
    function initMediaPipeUI() {
        const toggleBtn = document.getElementById('mediapipe-toggle-btn');
        const exerciseSelect = document.getElementById('mediapipe-exercise-select');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                if (!isMediaPipeActive) {
                    // Показываем модальное окно с информацией о конфиденциальности перед включением
                    showPrivacyModal();
                } else {
                    // Если уже активно, просто выключаем
                    toggleMediaPipe();
                }
            });
        }
        
        if (exerciseSelect) {
            exerciseSelect.addEventListener('change', function() {
                const exercise = this.value;
                selectExercise(exercise);
            });
        }
        
        // Экспортируем функцию для использования в onchange атрибуте
        window.selectMediaPipeExercise = selectExercise;
    }
    
    /**
     * Переключение MediaPipe (включить/выключить)
     */
    async function toggleMediaPipe() {
        const container = document.getElementById('mediapipe-container');
        const video = document.getElementById('mediapipe-video');
        const canvas = document.getElementById('mediapipe-canvas');
        const toggleBtn = document.getElementById('mediapipe-toggle-btn');
        
        if (!container || !video || !canvas || !poseAnalyzer) {
            alert('MoveNet не инициализирован');
            return;
        }
        
        if (!isMediaPipeActive) {
            // Включаем камеру
            try {
                const exercise = getSelectedExercise();
                
                // Запускаем камеру и передаем video элемент
                await poseAnalyzer.startCamera(video);
                
                // Запускаем анализ
                await poseAnalyzer.start(video, canvas);
                poseAnalyzer.setExercise(exercise);
                
                container.classList.add('active');
                toggleBtn.textContent = 'Остановить камеру';
                toggleBtn.classList.add('active');
                isMediaPipeActive = true;
                
                // Сбрасываем статистику
                resetStatsDisplay();
            } catch (error) {
                console.error('Ошибка запуска камеры:', error);
                alert('Не удалось запустить камеру: ' + error.message);
            }
        } else {
            // Выключаем камеру
            poseAnalyzer.stop();
            poseAnalyzer.stopCamera();
            
            container.classList.remove('active');
            toggleBtn.textContent = 'Включи AI-тренинг';
            toggleBtn.classList.remove('active');
            isMediaPipeActive = false;
            
            // Показываем сводную таблицу со статистикой
            showSummaryModal();
        }
    }
    
    /**
     * Выбор упражнения
     */
    function selectExercise(exercise) {
        if (!poseAnalyzer) return;
        
        // Обновляем select
        const exerciseSelect = document.getElementById('mediapipe-exercise-select');
        if (exerciseSelect) {
            exerciseSelect.value = exercise;
        }
        
        // Обновляем упражнение в анализаторе
        poseAnalyzer.setExercise(exercise);
        
        // Если камера активна, перезапускаем с новым упражнением
        if (isMediaPipeActive) {
            const video = document.getElementById('mediapipe-video');
            const canvas = document.getElementById('mediapipe-canvas');
            poseAnalyzer.stop();
            setTimeout(() => {
                poseAnalyzer.start(video, canvas);
            }, 100);
        }
    }
    
    /**
     * Получить выбранное упражнение
     */
    function getSelectedExercise() {
        const exerciseSelect = document.getElementById('mediapipe-exercise-select');
        return exerciseSelect ? exerciseSelect.value : 'squat';
    }
    
    /**
     * Обновление отображения статуса упражнения (без баллов)
     */
    function updateScoreDisplay(exercise, isInRep, isDeepEnough) {
        const scoreElement = document.getElementById('mediapipe-current-score');
        const scoreLabel = document.getElementById('mediapipe-score-label');
        
        if (scoreElement) {
            // Показываем статус вместо балла
            if (isInRep) {
                if (isDeepEnough) {
                    scoreElement.textContent = '✓';
            scoreElement.classList.remove('low', 'very-low');
                } else {
                    scoreElement.textContent = '...';
                scoreElement.classList.add('low');
                    scoreElement.classList.remove('very-low');
                }
            } else {
                scoreElement.textContent = '—';
                scoreElement.classList.remove('low', 'very-low');
            }
        }
        
        if (scoreLabel) {
            const exerciseNames = {
                'squat': 'Приседание',
                'pushup': 'Отжимание',
                // 'abdominal': 'Пресс', // Временно отключено для доработки
                'plank': 'Планка',
                'wallsit': 'Стульчик'
                // 'burpee': 'Бёрпи' // Временно отключено для доработки
            };
            scoreLabel.textContent = exerciseNames[exercise] || 'Упражнение';
        }
    }
    
    /**
     * Обновление статистики
     */
    function updateStatsDisplay(data) {
        const repsElement = document.getElementById('mediapipe-reps-value');
        const averageElement = document.getElementById('mediapipe-average-value');
        
        if (repsElement) {
            repsElement.textContent = data.rep;
        }
        
        // Убираем отображение среднего балла
        if (averageElement) {
            averageElement.textContent = '—';
        }
    }
    
    /**
     * Показать уведомление о завершении повтора
     */
    function showRepNotification(rep, exercise, timeSeconds) {
        const notification = document.getElementById('mediapipe-rep-notification');
        if (!notification) return;
        
        const exerciseNames = {
            'squat': 'Приседание',
            'pushup': 'Отжимание',
            'abdominal': 'Пресс',
            'plank': 'Планка',
            'wallsit': 'Стульчик',
            'burpee': 'Бёрпи'
        };
        const exerciseName = exerciseNames[exercise] || 'Упражнение';
        
        // Для планки и стульчика показываем время вместо номера повтора
        let displayText;
        if ((exercise === 'plank' || exercise === 'wallsit') && timeSeconds !== undefined) {
            displayText = `${exerciseName} ${timeSeconds}с`;
        } else {
            displayText = `${exerciseName} #${rep}`;
        }
        
        notification.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 8px;">${displayText}</div>
            <div style="font-size: 48px; font-weight: 700;">✓</div>
        `;
        
        notification.classList.remove('hide');
        notification.classList.add('show');
        
        // Воспроизводим звук зачёта повтора
        if (window.sounds && window.sounds.pay) {
            try {
                const paySound = new Audio(window.sounds.pay);
                paySound.play().catch(function(e) {
                    console.warn('Не удалось воспроизвести звук зачёта повтора', e);
                });
            } catch (e) {
                console.warn('Ошибка воспроизведения звука зачёта повтора', e);
            }
        }
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
        }, 1500);
    }
    
    /**
     * Возвращает информацию о нормативах и технике выполнения упражнения
     */
    function getExerciseReference(exercise) {
        const references = {
            'squat': {
                title: 'СПРАВКА: НОРМАЛЬНЫЕ УГЛЫ КОЛЕНЕЙ ПРИ ПРИСЕДАНИЯХ',
                angles: [
                    { range: '180°', description: 'Полностью выпрямленные ноги (стоя прямо)' },
                    { range: '165-175°', description: 'Почти выпрямленные ноги (легкий сгиб, нормальная стойка)' },
                    { range: '140-160°', description: 'Неглубокий присед (легкое сгибание коленей)' },
                    { range: '120-140°', description: 'Средний присед (четверть приседа)' },
                    { range: '90-120°', description: 'Глубокий присед (бедра параллельны полу или ниже)' },
                    { range: '60-90°', description: 'Очень глубокий присед (полный присед, "ass to grass")' }
                ],
                important: 'Для правильного приседа нужно достичь угла 90-100° (бедра параллельны полу). Угол измеряется между бедром, коленом и голенью.',
                technique: {
                    title: 'ТЕХНИКА ВЫПОЛНЕНИЯ ПРИСЕДАНИЙ',
                    steps: [
                        'Встаньте прямо, ноги на ширине плеч, стопы параллельно или слегка развернуты наружу',
                        'Начните движение, сгибая колени и отводя таз назад, как будто садитесь на стул',
                        'Опускайтесь вниз, сохраняя спину прямой и грудь поднятой',
                        'Достигните угла в коленях 90-100° (бедра параллельны полу)',
                        'Вернитесь в исходное положение, выпрямляя ноги и возвращая таз в исходную позицию'
                    ]
                }
            },
            'pushup': {
                title: 'СПРАВКА: ТЕХНИКА ВЫПОЛНЕНИЯ ОТЖИМАНИЙ',
                angles: [
                    { range: '180°', description: 'Полностью выпрямленные руки (верхняя позиция)' },
                    { range: '160-175°', description: 'Неглубокое отжимание (легкое сгибание локтей)' },
                    { range: '120-160°', description: 'Среднее отжимание (четверть амплитуды)' },
                    { range: '80-120°', description: 'Глубокое отжимание (хорошая амплитуда)' },
                    { range: '< 80°', description: 'Очень глубокое отжимание (максимальная амплитуда)' }
                ],
                important: 'Для правильного отжимания нужно достичь угла локтя менее 80°. Угол измеряется между плечом, локтем и предплечьем.',
                technique: {
                    title: 'ТЕХНИКА ВЫПОЛНЕНИЯ ОТЖИМАНИЙ',
                    steps: [
                        'Примите упор лежа: руки на ширине плеч, тело прямое от головы до пяток',
                        'Опускайтесь вниз, сгибая локти и приближая грудь к полу',
                        'Достигните угла в локтях менее 80° (глубокое отжимание)',
                        'Вернитесь в исходное положение, выпрямляя руки и возвращая тело в исходную позицию',
                        'Сохраняйте тело прямым на протяжении всего движения, не прогибайте спину'
                    ]
                }
            },
            'plank': {
                title: 'СПРАВКА: ТЕХНИКА ВЫПОЛНЕНИЯ ПЛАНКИ',
                angles: [
                    { range: '160-180°', description: 'Правильное положение планки (тело почти прямое)' },
                    { range: '140-160°', description: 'Небольшой прогиб (приемлемо)' },
                    { range: '< 140°', description: 'Слишком большой прогиб (неправильно)' }
                ],
                important: 'Для правильной планки нужно поддерживать угол тела между 160° и 180°. Угол измеряется между плечами, тазом и коленями. Засчитывается каждые 5 секунд удержания позиции.',
                technique: {
                    title: 'ТЕХНИКА ВЫПОЛНЕНИЯ ПЛАНКИ',
                    steps: [
                        'Примите упор лежа на предплечьях или прямых руках',
                        'Тело должно образовывать прямую линию от головы до пяток',
                        'Держите пресс напряженным, не прогибайте спину и не поднимайте таз',
                        'Сохраняйте правильное положение: угол тела между 160° и 180°',
                        'Удерживайте позицию: зачёт происходит каждые 5 секунд'
                    ]
                }
            },
            'wallsit': {
                title: 'СПРАВКА: ТЕХНИКА ВЫПОЛНЕНИЯ СТУЛЬЧИКА',
                angles: [
                    { range: '90-110°', description: 'Правильное положение стульчика (присед у стены)' },
                    { range: '110-130°', description: 'Неглубокий присед (приемлемо)' },
                    { range: '< 90°', description: 'Слишком глубокий присед' },
                    { range: '> 130°', description: 'Слишком высокий присед (не засчитывается)' }
                ],
                important: 'Для правильного стульчика нужно поддерживать угол колена между 90° и 110°. Спина должна быть прижата к стене. Засчитывается каждые 5 секунд удержания позиции.',
                technique: {
                    title: 'ТЕХНИКА ВЫПОЛНЕНИЯ СТУЛЬЧИКА',
                    steps: [
                        'Встаньте спиной к стене, ноги на ширине плеч',
                        'Опуститесь вниз, скользя спиной по стене, пока бедра не станут параллельны полу',
                        'Угол в коленях должен быть между 90° и 110°',
                        'Держите спину прижатой к стене, пресс напряженным',
                        'Удерживайте позицию: зачёт происходит каждые 5 секунд'
                    ]
                }
            }
        };
        
        return references[exercise] || null;
    }
    
    /**
     * Определение техники выполнения упражнения по углам
     */
    function getTechniqueDescription(exercise, angle, timeSeconds) {
        // Для упражнений, где угол не важен - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
        /* if (exercise === 'abdominal') {
            return 'Скручивание выполнено';
        } */
        
        // Если угол не передан, возвращаем базовое описание
        if (angle === undefined || angle === null) {
            return 'Упражнение выполнено';
        }
        
        switch (exercise) {
            case 'squat':
                // Для приседаний: угол колена (меньше = глубже)
                if (angle <= 90) {
                    return `Очень глубокий присед (${Math.round(angle)}°)`;
                } else if (angle <= 100) {
                    return `Глубокий присед (${Math.round(angle)}°)`;
                } else if (angle <= 120) {
                    return `Средний присед (${Math.round(angle)}°)`;
                } else if (angle <= 140) {
                    return `Неглубокий присед (${Math.round(angle)}°)`;
                } else if (angle <= 160) {
                    return `Лёгкий изгиб (${Math.round(angle)}°)`;
                } else if (angle <= 170) {
                    return `Почти выпрямленные ноги (${Math.round(angle)}°)`;
                } else {
                    return `Полностью выпрямленные ноги (${Math.round(angle)}°)`;
                }
                
            case 'pushup':
                // Для отжиманий: угол локтя (меньше = глубже)
                if (angle <= 70) {
                    return `Очень глубокое отжимание (${Math.round(angle)}°)`;
                } else if (angle <= 80) {
                    return `Глубокое отжимание (${Math.round(angle)}°)`;
                } else if (angle <= 90) {
                    return `Среднее отжимание (${Math.round(angle)}°)`;
                } else if (angle <= 100) {
                    return `Неглубокое отжимание (${Math.round(angle)}°)`;
                } else if (angle <= 120) {
                    return `Лёгкий изгиб (${Math.round(angle)}°)`;
                } else if (angle <= 150) {
                    return `Почти выпрямленные руки (${Math.round(angle)}°)`;
                } else {
                    return `Полностью выпрямленные руки (${Math.round(angle)}°)`;
                }
                
            case 'plank':
                if (timeSeconds !== undefined) {
                    return `Удержание планки ${timeSeconds}с (${Math.round(angle)}°)`;
                }
                return `Планка (${Math.round(angle)}°)`;
                
            case 'wallsit':
                if (timeSeconds !== undefined) {
                    return `Удержание стульчика ${timeSeconds}с (${Math.round(angle)}°)`;
                }
                return `Стульчик (${Math.round(angle)}°)`;
                
            default:
                return `Упражнение выполнено`;
        }
    }
    
    /**
     * Получить общую оценку и рекомендации
     */
    function getOverallAssessment(exercise, repHistory) {
        if (!repHistory || repHistory.length === 0) return null;
        
        const exerciseReps = repHistory.filter(r => r.exercise === exercise);
        if (exerciseReps.length === 0) return null;
        
        let assessment = {
            title: '',
            description: '',
            tips: []
        };
        
        switch (exercise) {
            case 'squat':
                const squatAngles = exerciseReps.map(r => r.angle).filter(a => a !== undefined && a !== null);
                if (squatAngles.length === 0) return null;
                const avgAngle = squatAngles.reduce((a, b) => a + b, 0) / squatAngles.length;
                const deepCount = squatAngles.filter(a => a <= 100).length;
                const deepPercent = (deepCount / squatAngles.length) * 100;
                
                if (deepPercent >= 80) {
                    assessment.title = 'Отличная техника! 💪';
                    assessment.description = `Вы выполняете ${exerciseReps.length} приседаний с отличной глубиной. Средний угол: ${Math.round(avgAngle)}°.`;
                    assessment.tips = [
                        'Продолжайте в том же духе!',
                        'Ваша техника близка к идеальной.',
                        'Отличная работа над глубиной приседаний.'
                    ];
                } else if (deepPercent >= 50) {
                    assessment.title = 'Хорошая техника 👍';
                    assessment.description = `Выполнено ${exerciseReps.length} приседаний. Средний угол: ${Math.round(avgAngle)}°.`;
                    assessment.tips = [
                        'Старайтесь опускаться ниже для лучшей проработки мышц.',
                        'Идеальный угол приседа: 90-100°.',
                        'Продолжайте работать над глубиной.'
                    ];
                } else {
                    assessment.title = 'Неплохо, но можно лучше 📈';
                    assessment.description = `Выполнено ${exerciseReps.length} приседаний. Средний угол: ${Math.round(avgAngle)}°.`;
                    assessment.tips = [
                        'Старайтесь приседать глубже - это увеличит эффективность упражнения.',
                        'Идеальный присед: бедра параллельны полу (90-100°).',
                        'Работайте над гибкостью и силой ног для более глубоких приседаний.'
                    ];
                }
                break;
                
            case 'pushup':
                const pushupAngles = exerciseReps.map(r => r.angle).filter(a => a !== undefined && a !== null);
                if (pushupAngles.length === 0) return null;
                const avgPushupAngle = pushupAngles.reduce((a, b) => a + b, 0) / pushupAngles.length;
                const deepPushupCount = pushupAngles.filter(a => a <= 80).length;
                const deepPushupPercent = (deepPushupCount / pushupAngles.length) * 100;
                
                if (deepPushupPercent >= 80) {
                    assessment.title = 'Отличная техника! 💪';
                    assessment.description = `Выполнено ${exerciseReps.length} отжиманий с отличной глубиной. Средний угол: ${Math.round(avgPushupAngle)}°.`;
                    assessment.tips = [
                        'Превосходная техника отжиманий!',
                        'Вы достигаете хорошей глубины в каждом повторе.',
                        'Продолжайте в том же духе!'
                    ];
                } else if (deepPushupPercent >= 50) {
                    assessment.title = 'Хорошая техника 👍';
                    assessment.description = `Выполнено ${exerciseReps.length} отжиманий. Средний угол: ${Math.round(avgPushupAngle)}°.`;
                    assessment.tips = [
                        'Старайтесь опускаться ниже для лучшей проработки мышц.',
                        'Идеальный угол локтя в нижней точке: 70-80°.',
                        'Работайте над полной амплитудой движения.'
                    ];
                } else {
                    assessment.title = 'Неплохо, но можно лучше 📈';
                    assessment.description = `Выполнено ${exerciseReps.length} отжиманий. Средний угол: ${Math.round(avgPushupAngle)}°.`;
                    assessment.tips = [
                        'Старайтесь опускаться ниже в каждом отжимании.',
                        'Полная амплитуда движения увеличит эффективность упражнения.',
                        'Работайте над силой рук и груди для более глубоких отжиманий.'
                    ];
                }
                break;
                
            case 'abdominal':
                assessment.title = 'Отличная работа! 💪';
                assessment.description = `Выполнено ${exerciseReps.length} скручиваний.`;
                assessment.tips = [
                    'Продолжайте работать над прессом!',
                    'Следите за техникой: отрывайте лопатки от пола.',
                    'Регулярные тренировки укрепят мышцы пресса.'
                ];
                break;
                
            case 'plank':
                const totalPlankTime = exerciseReps.reduce((sum, r) => sum + (r.timeSeconds || 0), 0);
                assessment.title = 'Отличная выносливость! 💪';
                assessment.description = `Общее время удержания планки: ${totalPlankTime}с.`;
                assessment.tips = [
                    'Планка - отличное упражнение для укрепления корпуса!',
                    'Старайтесь удерживать правильное положение тела.',
                    'Регулярные тренировки увеличат время удержания.'
                ];
                break;
                
            case 'wallsit':
                const totalWallsitTime = exerciseReps.reduce((sum, r) => sum + (r.timeSeconds || 0), 0);
                assessment.title = 'Сильные ноги! 💪';
                assessment.description = `Общее время удержания стульчика: ${totalWallsitTime}с.`;
                assessment.tips = [
                    'Стульчик отлично развивает выносливость ног!',
                    'Старайтесь удерживать угол 90-110°.',
                    'Продолжайте тренироваться для увеличения времени удержания.'
                ];
                break;
        }
        
        return assessment;
    }
    
    /**
     * Показать подсказку по позиционированию перед камерой
     */
    let positionHintTimeout = null;
    let lastHintType = null;
    
    function showPositionHint(hint) {
        const hintElement = document.getElementById('mediapipe-position-hint');
        if (!hintElement || !hint) return;
        
        const iconElement = hintElement.querySelector('.position-hint-icon');
        const messageElement = hintElement.querySelector('.position-hint-message');
        
        if (!iconElement || !messageElement) return;
        
        // Если та же подсказка, не обновляем (чтобы избежать мерцания)
        if (lastHintType === hint.type && hintElement.classList.contains('show')) {
            return;
        }
        
        lastHintType = hint.type;
        
        // Устанавливаем иконку в зависимости от типа
        let icon = '💡';
        if (hint.type === 'no_person' || hint.type === 'low_visibility') {
            icon = '👤';
        } else if (hint.type === 'too_far') {
            icon = '📏';
        } else if (hint.type === 'too_close') {
            icon = '📏';
        } else if (hint.type === 'off_center_x' || hint.type === 'off_center_y') {
            icon = '↔️';
        } else if (hint.type === 'legs_not_visible') {
            icon = '🦵';
        } else if (hint.type === 'shoulders_not_visible') {
            icon = '👔';
        } else if (hint.severity === 'success' || hint.type === 'perfect' || hint.type === 'good_distance' || hint.type === 'good_center') {
            icon = '✅';
        } else {
            icon = '⚠️';
        }
        
        iconElement.textContent = icon;
        messageElement.textContent = hint.message;
        
        // Устанавливаем класс в зависимости от severity
        hintElement.classList.remove('error', 'warning', 'success', 'show', 'hide');
        
        if (hint.severity === 'error') {
            hintElement.classList.add('error');
        } else if (hint.severity === 'warning') {
            hintElement.classList.add('warning');
        } else if (hint.severity === 'success') {
            hintElement.classList.add('success');
        } else {
            hintElement.classList.add('warning'); // По умолчанию
        }
        
        // Показываем подсказку
        hintElement.classList.remove('hide');
        hintElement.classList.add('show');
        
        // Для успешных подсказок скрываем через 3 секунды, для предупреждений - через 5 секунд
        if (positionHintTimeout) {
            clearTimeout(positionHintTimeout);
        }
        
        const hideDelay = hint.severity === 'success' ? 3000 : 5000;
        positionHintTimeout = setTimeout(() => {
            hintElement.classList.remove('show');
            hintElement.classList.add('hide');
            lastHintType = null;
        }, hideDelay);
    }
    
    /**
     * Сброс статистики
     */
    function resetStatsDisplay() {
        if (poseAnalyzer) {
            poseAnalyzer.reset();
        }
        
        // Сбрасываем историю повторов
        repHistory = [];
        
        updateScoreDisplay(0, 'squat');
        updateStatsDisplay({ rep: 0 });
        
        const notification = document.getElementById('mediapipe-rep-notification');
        if (notification) {
            notification.classList.remove('show', 'hide');
        }
        
        // Скрываем подсказки по позиционированию
        const hintElement = document.getElementById('mediapipe-position-hint');
        if (hintElement) {
            hintElement.classList.remove('show', 'error', 'warning', 'success');
            hintElement.classList.add('hide');
        }
        
        if (positionHintTimeout) {
            clearTimeout(positionHintTimeout);
            positionHintTimeout = null;
        }
        lastHintType = null;
    }
    
    /**
     * Показать модальное окно со сводной статистикой
     */
    function showSummaryModal() {
        const stats = getMediaPipeStats();
        if (!stats || stats.reps === 0) {
            // Если нет статистики, не показываем модальное окно
            return;
        }
        
        // Создаем или получаем модальное окно
        let modal = document.getElementById('mediapipe-summary-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mediapipe-summary-modal';
            modal.className = 'mediapipe-summary-modal';
            modal.innerHTML = `
                <div class="mediapipe-summary-modal-content">
                    <div class="mediapipe-summary-header">
                        <h2>Результаты тренировки</h2>
                        <button class="mediapipe-summary-close" id="mediapipe-summary-close">&times;</button>
                    </div>
                    <div class="mediapipe-summary-body">
                        <div class="mediapipe-summary-stat">
                            <div class="mediapipe-summary-stat-label">Выполнено повторов</div>
                            <div class="mediapipe-summary-stat-value" id="summary-reps">0</div>
                        </div>
                        <div class="mediapipe-summary-reference-accordion" id="summary-reference-accordion">
                            <!-- Аккордеон с нормативами и техникой -->
                        </div>
                        <div class="mediapipe-summary-scores" id="summary-scores-list">
                            <!-- Список засчитанных повторов -->
                        </div>
                    </div>
                    <div class="mediapipe-summary-footer">
                        <button class="mediapipe-summary-btn" id="mediapipe-summary-ok">Закрыть</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Обработчики закрытия
            const closeBtn = document.getElementById('mediapipe-summary-close');
            const okBtn = document.getElementById('mediapipe-summary-ok');
            const closeModal = () => {
                modal.classList.remove('show');
            };
            
            closeBtn.addEventListener('click', closeModal);
            okBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Заполняем данные
        const currentExercise = getSelectedExercise();
        document.getElementById('summary-reps').textContent = stats.reps;
        
        // Заполняем аккордеон с нормативами и техникой
        const referenceAccordion = document.getElementById('summary-reference-accordion');
        const exerciseReference = getExerciseReference(currentExercise);
        
        if (exerciseReference && referenceAccordion) {
            let accordionHTML = `
                <div class="reference-accordion-item">
                    <button class="reference-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');">
                        <span class="reference-accordion-icon">📐</span>
                        <span class="reference-accordion-title">${exerciseReference.title}</span>
                        <span class="reference-accordion-arrow">▼</span>
                    </button>
                    <div class="reference-accordion-content">
                        <div class="reference-angles-list">
            `;
            
            exerciseReference.angles.forEach(angle => {
                accordionHTML += `
                    <div class="reference-angle-item">
                        <strong>${angle.range}</strong> — ${angle.description}
                    </div>
                `;
            });
            
            accordionHTML += `
                        </div>
                        <div class="reference-important-note">
                            💡 <strong>Важно:</strong> ${exerciseReference.important}
                        </div>
                    </div>
                </div>
            `;
            
            // Добавляем технику выполнения
            if (exerciseReference.technique) {
                accordionHTML += `
                    <div class="reference-accordion-item">
                        <button class="reference-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');">
                            <span class="reference-accordion-icon">💪</span>
                            <span class="reference-accordion-title">${exerciseReference.technique.title}</span>
                            <span class="reference-accordion-arrow">▼</span>
                        </button>
                        <div class="reference-accordion-content">
                            <ol class="reference-technique-steps">
                `;
                
                exerciseReference.technique.steps.forEach((step, index) => {
                    accordionHTML += `<li>${step}</li>`;
                });
                
                accordionHTML += `
                            </ol>
                        </div>
                    </div>
                `;
            }
            
            referenceAccordion.innerHTML = accordionHTML;
        } else if (referenceAccordion) {
            referenceAccordion.innerHTML = '';
        }
        
        // Заполняем список засчитанных повторов с информацией о технике
        const scoresList = document.getElementById('summary-scores-list');
        if (stats.reps > 0 && repHistory.length > 0) {
            scoresList.innerHTML = '<div class="mediapipe-summary-scores-title">Детализация по каждому повтору:</div>';
            
            // Фильтруем повторы для текущего упражнения
            const exerciseReps = repHistory.filter(r => r.exercise === currentExercise);
            
            exerciseReps.forEach((repData, index) => {
                const scoreItem = document.createElement('div');
                scoreItem.className = 'mediapipe-summary-score-item';
                scoreItem.innerHTML = `
                    <div>
                        <span class="score-rep-number">Повтор #${repData.rep}</span>
                        <span class="score-value">✓</span>
                    </div>
                    <div class="score-technique">${repData.technique || 'Упражнение выполнено'}</div>
                `;
                scoresList.appendChild(scoreItem);
            });
            
            // Добавляем общую оценку и рекомендации
            const assessment = getOverallAssessment(currentExercise, repHistory);
            if (assessment) {
                const assessmentDiv = document.createElement('div');
                assessmentDiv.className = 'mediapipe-summary-assessment';
                assessmentDiv.innerHTML = `
                    <div class="assessment-title">${assessment.title}</div>
                    <div class="assessment-description">${assessment.description}</div>
                    <div class="assessment-tips">
                        <strong>Рекомендации:</strong>
                        <ul>
                            ${assessment.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                `;
                scoresList.appendChild(assessmentDiv);
            }
        } else {
            scoresList.innerHTML = '<div class="mediapipe-summary-scores-title">Нет данных о технике выполнения</div>';
        }
        
        // Показываем модальное окно
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }
    
    /**
     * Интеграция с таймером - запуск/остановка MediaPipe вместе с таймером
     */
    function integrateWithTimer() {
        // Слушаем события таймера
        if (typeof window.newtimer !== 'undefined' && window.newtimer) {
            // Перехватываем старт таймера
            const originalStart = window.newtimer.start;
            if (originalStart) {
                window.newtimer.start = function() {
                    originalStart.call(this);
                    // Можно автоматически запустить MediaPipe при старте тренировки
                    // if (!isMediaPipeActive) {
                    //     document.getElementById('mediapipe-toggle-btn')?.click();
                    // }
                };
            }
            
            // Перехватываем остановку таймера
            const originalStop = window.newtimer.stop;
            if (originalStop) {
                window.newtimer.stop = function() {
                    originalStop.call(this);
                    // Можно автоматически остановить MediaPipe при остановке тренировки
                    // if (isMediaPipeActive) {
                    //     document.getElementById('mediapipe-toggle-btn')?.click();
                    // }
                };
            }
        }
    }
    
    /**
     * Получить статистику для сохранения/отправки
     */
    function getMediaPipeStats() {
        if (!poseAnalyzer) return null;
        
        return poseAnalyzer.getStats ? poseAnalyzer.getStats() : {
            reps: poseAnalyzer.reps || 0
        };
    }
    
    /**
     * Показать модальное окно с информацией о конфиденциальности и работе AI-тренинга
     */
    function showPrivacyModal() {
        // Создаем или получаем модальное окно
        let modal = document.getElementById('mediapipe-privacy-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mediapipe-privacy-modal';
            modal.className = 'mediapipe-privacy-modal';
            document.body.appendChild(modal);
        }
        
        modal.innerHTML = `
            <div class="mediapipe-privacy-modal-content">
                <div class="mediapipe-privacy-header">
                    <h2>🔒 Конфиденциальность и безопасность</h2>
                    <button class="mediapipe-privacy-close" id="mediapipe-privacy-close">&times;</button>
                </div>
                <div class="mediapipe-privacy-body">
                    <div class="privacy-section">
                        <div class="privacy-content">
                            <h3>Как это работает?</h3>
                            <p>AI-тренер использует камеру для анализа твоей техники в реальном времени. Система распознает движения и считает правильные повторения.</p>
                        </div>
                    </div>
                    
                    <div class="privacy-section">
                        <div class="privacy-content">
                            <h3>Твои данные в безопасности</h3>
                            <ul class="privacy-list">
                                <li>✅ <strong>Видеозапись не ведется</strong> — всё обрабатывается только в момент тренировки</li>
                                <li>✅ <strong>Данные не сохраняются</strong> — информация не отправляется на сервер</li>
                                <li>✅ <strong>Никто не видит</strong> — анализ происходит только на твоём устройстве</li>
                                <li>✅ <strong>Можно выключить в любой момент</strong> — просто нажми кнопку "Остановить камеру"</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="privacy-section">
                        <div class="privacy-content">
                            <h3>Что даёт AI-тренер?</h3>
                            <ul class="privacy-list">
                                <li>🎯 Автоматический подсчёт повторений</li>
                                <li>📊 Анализ техники выполнения упражнений</li>
                                <li>📈 Статистика по каждому повтору</li>
                                <li>✨ Подсказки для улучшения техники</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="privacy-note">
                        <strong>💡 Важно:</strong> Для работы AI-тренера нужен доступ к камере. Разрешение запрашивается только один раз при первом использовании.
                    </div>
                </div>
                <div class="mediapipe-privacy-footer">
                    <button class="mediapipe-privacy-btn mediapipe-privacy-btn-cancel" id="mediapipe-privacy-cancel">Отмена</button>
                    <button class="mediapipe-privacy-btn mediapipe-privacy-btn-accept" id="mediapipe-privacy-accept">Понятно, включить AI-тренер</button>
                </div>
            </div>
        `;
        
        // Обработчики закрытия
        const closeBtn = document.getElementById('mediapipe-privacy-close');
        const cancelBtn = document.getElementById('mediapipe-privacy-cancel');
        const acceptBtn = document.getElementById('mediapipe-privacy-accept');
        
        const closeModal = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            modal.classList.remove('show');
        };
        
        const acceptAndStart = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            modal.classList.remove('show');
            // Включаем AI-тренер после принятия
            setTimeout(() => {
                toggleMediaPipe();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        acceptBtn.addEventListener('click', acceptAndStart);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                e.preventDefault();
                e.stopPropagation();
                closeModal(e);
            }
        });
        
        // Предотвращаем закрытие при клике внутри контента
        const modalContent = modal.querySelector('.mediapipe-privacy-modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Показываем модальное окно
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    /**
     * Показать модальное окно с техникой выполнения упражнения
     */
    function showTechniqueModal(exercise) {
        console.log('showTechniqueModal вызвана для упражнения:', exercise);
        const exerciseReference = getExerciseReference(exercise);
        console.log('exerciseReference:', exerciseReference);
        if (!exerciseReference || !exerciseReference.technique) {
            console.warn('Нет данных о технике для упражнения:', exercise);
            return;
        }
        
        // Создаем или получаем модальное окно
        let modal = document.getElementById('mediapipe-technique-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mediapipe-technique-modal';
            modal.className = 'mediapipe-technique-modal';
            document.body.appendChild(modal);
        }
        
        const exerciseNames = {
            'squat': 'Приседания',
            'pushup': 'Отжимания',
            'plank': 'Планка',
            'wallsit': 'Стульчик'
        };
        
        modal.innerHTML = `
            <div class="mediapipe-technique-modal-content">
                <div class="mediapipe-technique-header">
                    <h2>💪 ${exerciseNames[exercise] || 'Упражнение'}</h2>
                    <button class="mediapipe-technique-close" id="mediapipe-technique-close">&times;</button>
                </div>
                <div class="mediapipe-technique-body">
                    <div class="technique-title">${exerciseReference.technique.title}</div>
                    <ol class="technique-steps-list">
                        ${exerciseReference.technique.steps.map((step, index) => `
                            <li class="technique-step-item">
                                <div class="technique-step-number">${index + 1}</div>
                                <div class="technique-step-text">${step}</div>
                            </li>
                        `).join('')}
                    </ol>
                </div>
                <div class="mediapipe-technique-footer">
                    <button class="mediapipe-technique-btn" id="mediapipe-technique-ok">Понятно</button>
                </div>
            </div>
        `;
        
        // Обработчики закрытия
        const closeBtn = document.getElementById('mediapipe-technique-close');
        const okBtn = document.getElementById('mediapipe-technique-ok');
        const closeModal = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            modal.classList.remove('show');
        };
        
        closeBtn.addEventListener('click', closeModal);
        okBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                e.preventDefault();
                e.stopPropagation();
                closeModal(e);
            }
        });
        
        // Предотвращаем закрытие при клике внутри контента
        const modalContent = modal.querySelector('.mediapipe-technique-modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Показываем модальное окно
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    // Инициализация при загрузке DOM
    function startIntegration() {
        // Ждем загрузки всех скриптов
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Даем больше времени на загрузку MediaPipe скриптов
                setTimeout(() => {
                    initMediaPipeIntegration();
                    integrateWithTimer();
                }, 2000);
            });
        } else {
            setTimeout(() => {
                initMediaPipeIntegration();
                integrateWithTimer();
            }, 2000);
        }
    }
    
    startIntegration();
    
    // Добавляем обработчики клика на чипы упражнений
    function setupExerciseChips() {
        const chips = document.querySelectorAll('.mediapipe-chip[data-exercise]');
        console.log('setupExerciseChips: найдено чипов:', chips.length);
        
        if (chips.length === 0) {
            // Если чипы еще не загружены, пробуем еще раз через небольшую задержку
            console.log('setupExerciseChips: чипы не найдены, повтор через 500ms');
            setTimeout(setupExerciseChips, 500);
            return;
        }
        
        chips.forEach((chip, index) => {
            const exercise = chip.getAttribute('data-exercise');
            console.log(`setupExerciseChips: обработка чипа ${index + 1}, упражнение: ${exercise}`);
            
            // Удаляем все существующие обработчики, клонируя элемент
            const newChip = chip.cloneNode(true);
            chip.parentNode.replaceChild(newChip, chip);
            
            // Добавляем обработчик клика
            newChip.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const exerciseValue = newChip.getAttribute('data-exercise');
                console.log('Клик по чипу упражнения:', exerciseValue);
                if (exerciseValue) {
                    showTechniqueModal(exerciseValue);
                } else {
                    console.warn('data-exercise атрибут не найден');
                }
            });
            
            // Добавляем hover эффект
            newChip.style.transition = 'all 0.3s ease';
            newChip.style.cursor = 'pointer';
            newChip.addEventListener('mouseenter', function() {
                newChip.style.background = 'rgba(122, 245, 255, 0.15)';
                newChip.style.borderColor = 'var(--ai-accent)';
                newChip.style.transform = 'translateY(-2px)';
            });
            newChip.addEventListener('mouseleave', function() {
                newChip.style.background = 'rgba(255, 255, 255, 0.03)';
                newChip.style.borderColor = 'var(--ai-accent-muted)';
                newChip.style.transform = 'translateY(0)';
            });
        });
        
        console.log('Обработчики чипов упражнений успешно установлены для', chips.length, 'чипов');
    }
    
    // Инициализируем обработчики чипов - пробуем несколько раз с разными задержками
    function initExerciseChips() {
        setupExerciseChips();
        // Пробуем еще раз через 2 секунды на случай, если чипы загружаются динамически
        setTimeout(setupExerciseChips, 2000);
        // И еще раз через 5 секунд
        setTimeout(setupExerciseChips, 5000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initExerciseChips, 500);
        });
    } else {
        setTimeout(initExerciseChips, 500);
    }
    
    // Экспорт функций для глобального доступа
    window.mediaPipeIntegration = {
        toggle: toggleMediaPipe,
        getStats: getMediaPipeStats,
        selectExercise: selectExercise,
        showTechnique: showTechniqueModal
    };
    
})();

