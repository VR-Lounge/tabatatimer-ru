(function () {
    'use strict';

    var state = {
        initialized: false,
        isRunning: false,
        isPaused: false,
        totalMinutes: 10,
        currentMinute: 0,
        secondsInMinute: 0,
        preparationTime: 10, // Время подготовки в секундах
        isPreparationPhase: false, // Флаг фазы "Готовимся"
        countdownSoundPlayed: false, // Флаг для предотвращения повторного воспроизведения звука отсчета
        countdown54SoundPlayed: false, // Флаг для предотвращения повторного воспроизведения звука 5-4-3-2-1
        timerInterval: null,
        startTimestamp: null,
        pausedDuration: 0,
        pauseStartTime: null
    };

    var elements = {};
    var bodyEl = document.body;
    
    // Переиспользуемые Audio объекты для надежного воспроизведения звуков
    var countdown54Audio = null; // Для звука 5-4-3-2-1.mp3
    var clackAudio = null; // Для звука clack.mp3
    var countdownAudio = null; // Для звука 3-2-1-go.mp3 (переиспользуем для надежности)

    function qs(id) {
        return document.getElementById(id);
    }
    
    // Функции для надежного воспроизведения звуков (аналогично playSound из tabata.js)
    // Используют переиспользуемые Audio объекты для надежности
    function playCountdown54Sound(audioFile) {
        if (!countdown54Audio) {
            countdown54Audio = new Audio(audioFile);
            countdown54Audio.volume = 0.7;
        }
        
        try {
            countdown54Audio.pause();
            countdown54Audio.currentTime = 0;
            var playPromise = countdown54Audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.warn('Не удалось воспроизвести звук 5-4-3-2-1', error);
                });
            }
        } catch (e) {
            console.warn('Ошибка при воспроизведении звука 5-4-3-2-1', e);
        }
    }
    
    function playClackSound(audioFile) {
        if (!clackAudio) {
            clackAudio = new Audio(audioFile);
            clackAudio.volume = 0.7;
        }
        
        try {
            clackAudio.pause();
            clackAudio.currentTime = 0;
            var playPromise = clackAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.warn('Не удалось воспроизвести звук clack', error);
                });
            }
        } catch (e) {
            console.warn('Ошибка при воспроизведении звука clack', e);
        }
    }
    
    function playCountdownSound(audioFile) {
        if (!countdownAudio) {
            countdownAudio = new Audio(audioFile);
            countdownAudio.volume = 0.7;
        }
        
        try {
            countdownAudio.pause();
            countdownAudio.currentTime = 0;
            var playPromise = countdownAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.warn('Не удалось воспроизвести звук отсчета', error);
                });
            }
        } catch (e) {
            console.warn('Ошибка при воспроизведении звука отсчета', e);
        }
    }

    function formatTime(totalSeconds) {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    function formatSeconds(seconds) {
        // Возвращаем только секунды без форматирования "00:XX"
        return seconds.toString();
    }
    
    function formatCountdown(seconds) {
        // Форматируем отображение для таймера: показываем только секунды без "00:"
        return seconds.toString();
    }

    function populateMinuteSelect() {
        if (!elements.minuteSelect) return;
        elements.minuteSelect.innerHTML = '';
        for (var i = 5; i <= 30; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.textContent = i < 10 ? '0' + i : i;
            elements.minuteSelect.appendChild(option);
        }
        elements.minuteSelect.value = 10;
        state.totalMinutes = 10;
        updateTotalCount();
    }

    function updateCountdown() {
        if (elements.countdown) {
            if (state.isPreparationPhase) {
                // В фазе "Готовимся" показываем оставшееся время подготовки (только секунды)
                elements.countdown.textContent = formatCountdown(state.preparationTime);
            } else if (state.isRunning) {
                // В основной фазе показываем оставшееся время текущей минуты (только секунды)
                var remaining = 60 - state.secondsInMinute;
                elements.countdown.textContent = formatCountdown(remaining);
            } else {
                // Перед стартом показываем полную минуту (60 секунд)
                elements.countdown.textContent = '60';
            }
        }
    }

    function updateMinuteCount() {
        if (elements.minuteCount) {
            elements.minuteCount.textContent = state.currentMinute || 0;
        }
    }

    function updateTotalCount() {
        if (elements.totalCount) {
            elements.totalCount.textContent = state.totalMinutes;
        }
    }

    function init() {
        if (state.initialized) return;
        
        elements.timerRow = qs('emom-timer-row-wrapper');
        elements.countdown = qs('emom-countdown');
        elements.minuteCount = qs('emom-minute-count');
        elements.totalCount = qs('emom-total-count');
        elements.minuteSelect = qs('emom-minute-select');
        elements.startBtn = qs('emom-start-btn');
        elements.pauseBtn = qs('emom-pause-btn');
        elements.phaseLabel = qs('emom-phase-label');

        if (!elements.timerRow || !elements.countdown) {
            console.warn('EMOM elements not found');
            return;
        }

        populateMinuteSelect();
        updateCountdown();
        updateMinuteCount();
        updateTotalCount();

        if (elements.minuteSelect) {
            elements.minuteSelect.addEventListener('change', function() {
                if (state.isRunning) return;
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                state.totalMinutes = parseInt(elements.minuteSelect.value, 10) || 10;
                updateTotalCount();
            });
        }

        if (elements.startBtn) {
            elements.startBtn.addEventListener('click', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                if (state.isRunning) {
                    stop();
                } else {
                    start();
                }
            });
        }

        if (elements.pauseBtn) {
            elements.pauseBtn.addEventListener('click', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                if (state.isPaused) {
                    resume();
                } else {
                    pause();
                }
            });
        }

        // Синхронизация с основным таймером
        if (window.timerMode === 3) {
            show();
        }

        state.initialized = true;
    }

    function show() {
        if (!state.initialized) init();
        
        // Скрываем описание тренировки HIIT при показе EMOM
        if (typeof hideHiitWorkoutDescription === 'function') {
            hideHiitWorkoutDescription();
        }
        
        // Скрываем описание тренировки EMOM при показе (будет показано при выборе тренировки)
        if (typeof hideEmomWorkoutDescription === 'function') {
            hideEmomWorkoutDescription();
        }
        
        if (elements.timerRow) {
            elements.timerRow.style.display = 'flex';
        }
        bodyEl.classList.add('emom-active');
        
        // Скрываем описание тренировки HIIT
        const hiitWorkoutDescription = document.getElementById('hiit-workout-description');
        if (hiitWorkoutDescription) {
            hiitWorkoutDescription.style.display = 'none';
        }
        
        // Создаем пустой прогресс-бар по умолчанию для единого стиля
        if (typeof createDefaultProgressBar === 'function') {
            setTimeout(function() {
                createDefaultProgressBar();
            }, 100);
        }
        
        updateCountdown();
        updateMinuteCount();
        updateTotalCount();
        
        // Показываем фразу "Тренировка" и скрываем фразы фаз при показе (пока не запущен таймер)
        var timerLabel = document.getElementById('emom-timer-label');
        if (timerLabel) {
            timerLabel.style.display = 'block';
        }
        if (elements.phaseLabel) {
            elements.phaseLabel.style.display = 'none';
        }
        
        // Создаем пустой прогресс-бар по умолчанию для единого стиля
        if (typeof createDefaultProgressBar === 'function') {
            setTimeout(function() {
                createDefaultProgressBar();
            }, 100);
        }
    }

    function hide() {
        if (elements.timerRow) {
            elements.timerRow.style.display = 'none';
        }
        bodyEl.classList.remove('emom-active');
        stop(true); // suppressSound = true, чтобы не воспроизводить звук при программном вызове
        
        // Удаляем прогресс-бар при скрытии EMOM
        var progressContainer = document.getElementById('progress-bar-container');
        if (progressContainer) {
            progressContainer.remove();
        }
        
        // Восстанавливаем стандартные элементы при скрытии EMOM
        var ttTimerWrap = document.getElementById('tt_timer_wrap');
        var controls = document.getElementById('controls');
        var playlistField = document.getElementById('playlistField');
        
        // Восстанавливаем только если мы не в режиме AMRAP
        if (window.timerMode !== 4) {
            if (ttTimerWrap && ttTimerWrap.style.display === "none") {
                ttTimerWrap.style.display = "block";
            }
            // controls и playlistField будут восстановлены в setMode в зависимости от режима
        }
    }

    function start() {
        if (state.isRunning) return;
        
        // Воспроизводим звук Whistler.mp3 при нажатии на кнопку СТАРТ
        if (typeof playWhistlerSound === 'function') {
            playWhistlerSound();
        }
        
        state.isRunning = true;
        state.isPaused = false;
        state.currentMinute = 0;
        state.secondsInMinute = 0;
        state.isPreparationPhase = true; // Начинаем с фазы "Готовимся"
        state.countdownSoundPlayed = false; // Сбрасываем флаг звука при старте
        state.startTimestamp = Date.now() - state.pausedDuration;
        state.pausedDuration = 0;

        if (elements.startBtn) {
            elements.startBtn.textContent = 'СТОП';
            elements.startBtn.classList.remove('primary');
            elements.startBtn.classList.add('dark');
        }

        if (elements.pauseBtn) {
            elements.pauseBtn.style.display = 'flex';
            elements.pauseBtn.textContent = 'ПАУЗА';
        }

        if (elements.minuteSelect) {
            elements.minuteSelect.disabled = true;
        }
        
        // Скрываем фразу "Тренировка" и показываем "Готовимся"
        var timerLabel = document.getElementById('emom-timer-label');
        var phaseLabel = document.getElementById('emom-phase-label');
        if (timerLabel) {
            timerLabel.style.display = 'none';
        }
        if (phaseLabel) {
            phaseLabel.textContent = 'Готовимся';
            phaseLabel.style.display = 'block';
        }
        
        // Обновляем отображение для фазы "Готовимся"
        updateCountdown();
        if (typeof updateProgressBar === 'function') {
            updateProgressBar(10, 10); // Начинаем с полного прогресс-бара для фазы "Готовимся"
        }

        state.timerInterval = setInterval(function() {
            tick();
        }, 1000);

        // Синхронизация с основным таймером
        if (window.tabatatimer && typeof window.tabatatimer.start === 'function') {
            window.tabatatimer.start();
        }
    }

    function pause() {
        if (!state.isRunning || state.isPaused) return;
        
        // Воспроизводим звук stop.mp3 при нажатии на кнопку ПАУЗА (действие пользователя)
        if (typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        state.isPaused = true;
        state.pauseStartTime = Date.now();

        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }

        if (elements.pauseBtn) {
            elements.pauseBtn.textContent = 'ПРОДОЛЖИТЬ';
        }

        // Синхронизация с основным таймером
        if (window.tabatatimer && typeof window.tabatatimer.pause === 'function') {
            window.tabatatimer.pause();
        }
    }

    function resume() {
        if (!state.isPaused) return;
        
        // Воспроизводим звук stop.mp3 при нажатии на кнопку ПРОДОЛЖИТЬ (действие пользователя)
        if (typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        state.isPaused = false;
        if (state.pauseStartTime) {
            state.pausedDuration += Date.now() - state.pauseStartTime;
            state.pauseStartTime = null;
        }

        if (elements.pauseBtn) {
            elements.pauseBtn.textContent = 'ПАУЗА';
        }

        state.timerInterval = setInterval(function() {
            tick();
        }, 1000);

        // Синхронизация с основным таймером
        if (window.tabatatimer && typeof window.tabatatimer.resume === 'function') {
            window.tabatatimer.resume();
        }
    }

    function stop(suppressSound) {
        // Воспроизводим звук stop.mp3 только при реальном нажатии на кнопку СТОП (действие пользователя)
        // suppressSound === true означает программный вызов (например, при переключении режимов)
        // Звук воспроизводится только если таймер действительно был запущен и это действие пользователя
        if (!suppressSound && state.isRunning && typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        state.isRunning = false;
        state.isPaused = false;
        state.currentMinute = 0;
        state.secondsInMinute = 0;
        state.isPreparationPhase = false;
        state.preparationTime = 10;
        state.countdownSoundPlayed = false; // Сбрасываем флаг звука при остановке
        state.countdown54SoundPlayed = false; // Сбрасываем флаг звука 5-4-3-2-1 при остановке
        state.pausedDuration = 0;
        state.pauseStartTime = null;

        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }

        if (elements.startBtn) {
            elements.startBtn.textContent = 'СТАРТ';
            elements.startBtn.classList.remove('dark');
            elements.startBtn.classList.add('primary');
        }

        if (elements.pauseBtn) {
            elements.pauseBtn.style.display = 'none';
            elements.pauseBtn.textContent = 'ПАУЗА';
        }

        if (elements.minuteSelect) {
            elements.minuteSelect.disabled = false;
        }
        
        // Показываем фразу "Тренировка" и скрываем фразы фаз
        var timerLabel = document.getElementById('emom-timer-label');
        var phaseLabel = document.getElementById('emom-phase-label');
        if (timerLabel) {
            timerLabel.style.display = 'block';
        }
        if (phaseLabel) {
            phaseLabel.style.display = 'none';
        }

        updateCountdown();
        updateMinuteCount();

        // Сбрасываем прогресс-бар при остановке
        var progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        // Очищаем отметки раундов на прогресс-баре (если есть)
        var progressContainer = document.getElementById('progress-bar-container');
        if (progressContainer) {
            var markers = progressContainer.querySelectorAll('.amrap-round-marker-container');
            markers.forEach(function(marker) {
                marker.remove();
            });
        }

        // Синхронизация с основным таймером
        if (window.tabatatimer && typeof window.tabatatimer.stop === 'function') {
            window.tabatatimer.stop();
        }
    }

    function tick() {
        if (state.isPaused) return;

        // Фаза "Готовимся" (10 секунд)
        if (state.isPreparationPhase) {
            state.preparationTime--;
            
            // Обновляем отображение для фазы "Готовимся"
            if (elements.countdown) {
                elements.countdown.textContent = formatCountdown(state.preparationTime);
            }
            
            // Показываем фразу "Готовимся"
            var phaseLabel = document.getElementById('emom-phase-label');
            if (phaseLabel) {
                phaseLabel.textContent = 'Готовимся';
                phaseLabel.style.display = 'block';
            }
            
            // Воспроизводим звук 3-2-1-go.mp3 за 4 секунды до окончания фазы "Готовимся" (когда preparationTime == 4)
            if (state.preparationTime == 4 && !state.countdownSoundPlayed) {
                var soundsObj = window.sounds || {};
                if (soundsObj && soundsObj.countdown) {
                    playCountdownSound(soundsObj.countdown);
                        state.countdownSoundPlayed = true; // Помечаем, что звук уже воспроизведен
                }
            }
            
            // Обновляем прогресс-бар для фазы "Готовимся" (желтый цвет)
            if (typeof updateProgressBar === 'function') {
                updateProgressBar(state.preparationTime, 10);
            }
            
            // Когда фаза "Готовимся" завершена, переходим к основной тренировке
            if (state.preparationTime <= 0) {
                state.isPreparationPhase = false;
                state.preparationTime = 10; // Сбрасываем для следующего использования
                state.countdownSoundPlayed = false; // Сбрасываем флаг звука для следующего использования
                state.countdown54SoundPlayed = false; // Сбрасываем флаг звука 5-4-3-2-1
                state.secondsInMinute = 0;
                state.currentMinute = 0;
                
                // Меняем фразу на "Работаем"
                var phaseLabel = document.getElementById('emom-phase-label');
                if (phaseLabel) {
                    phaseLabel.textContent = 'Работаем';
                    phaseLabel.style.display = 'block';
                }
            } else {
                return; // Продолжаем отсчет фазы "Готовимся"
            }
        }

        // Основная фаза тренировки
        // Показываем фразу "Работаем"
        var phaseLabel = document.getElementById('emom-phase-label');
        if (phaseLabel) {
            phaseLabel.textContent = 'Работаем';
            phaseLabel.style.display = 'block';
        }
        
        // Воспроизводим звук 5-4-3-2-1.mp3 за 5 секунд до окончания стадии "Работаем"
        // Проверяем ДО увеличения secondsInMinute, когда он равен 54
        // После увеличения secondsInMinute станет 55, и на экране будет показано 60 - 55 = 5 секунд
        if (state.secondsInMinute === 54 && !state.countdown54SoundPlayed) {
            var soundsObj = window.sounds || {};
            if (soundsObj && soundsObj.countdown54) {
                playCountdown54Sound(soundsObj.countdown54);
                state.countdown54SoundPlayed = true; // Помечаем, что звук уже воспроизведен
            }
        }
        
        state.secondsInMinute++;

        // Если прошла минута
        if (state.secondsInMinute >= 60) {
            state.currentMinute++;
            state.secondsInMinute = 0;
            state.countdown54SoundPlayed = false; // Сбрасываем флаг звука для следующей минуты
            
            // Воспроизводим звук clack.mp3 в начале нового раунда (начиная со второго)
            if (state.currentMinute >= 1 && state.currentMinute < state.totalMinutes) {
                playClackSound('assets/audio/clack.mp3');
            }

            // Проверяем, не закончилась ли тренировка
            if (state.currentMinute >= state.totalMinutes) {
                // Воспроизводим звук окончания тренировки
                var soundsObj = window.sounds || {};
                if (soundsObj && soundsObj.finish) {
                    try {
                        var finishSound = new Audio(soundsObj.finish);
                        finishSound.play().catch(function(e) {
                            console.warn('Не удалось воспроизвести звук окончания', e);
                        });
                    } catch (e) {
                        console.warn('Ошибка при воспроизведении звука окончания', e);
                    }
                }
                
                // Показываем экран с цитатами как в Табата и HIIT
                if (window.newtimer && typeof window.newtimer.sessionEnded === 'function') {
                    // Вызываем функцию показа экрана с цитатами
                    // Элементы EMOM будут скрыты внутри sessionEnded
                    window.newtimer.sessionEnded();
                }
                
                stop();
                return;
            }
        }

        updateCountdown();
        updateMinuteCount();
        
        // Обновляем прогресс-бар для текущей минуты (от 0 до 60 секунд) красным цветом
        if (typeof updateProgressBar === 'function') {
            var remainingSeconds = 60 - state.secondsInMinute;
            updateProgressBar(remainingSeconds, 60);
        }

        // Синхронизация с основным таймером для обновления UI
        if (window.tabatatimer && window.timerMode === 3) {
            // Обновляем emomMinute в основном таймере
            if (window.tabatatimer.emomMinute !== state.currentMinute) {
                window.tabatatimer.emomMinute = state.currentMinute;
            }
        }
    }

    // Экспорт функций для использования извне
    window.emomTimer = {
        init: init,
        show: show,
        hide: hide,
        start: start,
        pause: pause,
        resume: resume,
        stop: stop,
        updateCountdown: updateCountdown,
        updateMinuteCount: updateMinuteCount,
        getState: function() {
            return {
                isRunning: state.isRunning,
                isPaused: state.isPaused,
                currentMinute: state.currentMinute,
                totalMinutes: state.totalMinutes,
                secondsInMinute: state.secondsInMinute,
                isPreparationPhase: state.isPreparationPhase,
                preparationTime: state.preparationTime
            };
        }
    };

    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Отслеживание изменения режима таймера
    var lastMode = window.timerMode;
    setInterval(function() {
        if (window.timerMode !== lastMode) {
            lastMode = window.timerMode;
            if (window.timerMode === 3) {
                show();
            } else {
                hide();
            }
        }
    }, 100);

})();

