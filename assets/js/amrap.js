(function () {
    'use strict';

    var state = {
        initialized: false,
        isRunning: false,
        isPaused: false,
        totalSeconds: 600,
        remainingSeconds: 600,
        rounds: [],
        preparationTime: 10, // Время подготовки в секундах
        isPreparationPhase: false, // Флаг фазы "Готовимся"
        countdownSoundPlayed: false, // Флаг для предотвращения повторного воспроизведения звука отсчета
        countdown54SoundPlayed: false, // Флаг для предотвращения повторного воспроизведения звука 5-4-3-2-1
        timerInterval: null,
        startTimestamp: null,
        lastRoundTimestamp: null,
        currentPresetSeconds: null,
        pausedDuration: 0,
        pauseStartTime: null,
        totalElapsedTime: null,
        wasStoppedEarly: false
    };

    var elements = {};
    var bodyEl = document.body;
    
    // Переиспользуемые Audio объекты для надежного воспроизведения звуков
    var countdown54Audio = null; // Для звука 5-4-3-2-1.mp3
    var countdownAudio = null; // Для звука 3-2-1-go.mp3 (переиспользуем для надежности)
    var clackAudio = null; // Для звука clack.mp3
    
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
    
    var PRESET_START_MIN = 1;
    var PRESET_END_MIN = 9;
    var PRESET_STEP_SECONDS = 10;
    
    // Массив тренировок AMRAP
    var workouts = [
        {
            id: 1,
            title: 'Тренировка 1',
            time: '15 минут',
            description: 'За 15 минут — как можно больше раундов из 20 прыжков, 20 приседаний, 10 отжиманий и 15 махов.',
            exercises: '20 прыжков, 20 приседаний, 10 отжиманий, 15 махов'
        },
        {
            id: 2,
            title: 'Тренировка 2',
            time: '10 минут',
            description: 'За 10 минут — 10 приседаний без веса, 10 отжиманий с колен, 20 шагов вперёд — задача — сделать как можно больше полных раундов за 10 минут.',
            exercises: '10 приседаний без веса, 10 отжиманий с колен, 20 шагов вперёд'
        },
        {
            id: 3,
            title: 'Burpee Mania AMRAP Workout',
            time: '12 минут',
            description: 'За 12 минут нужно выполнить как можно больше раундов из следующих упражнений: 10 бёрпи, 20 воздушных приседаний, 10 бёрпи, 10 отжиманий на скамье, 10 бёрпи, 10 подъёмов.',
            exercises: '10 бёрпи, 20 воздушных приседаний, 10 бёрпи, 10 отжиманий на скамье, 10 бёрпи, 10 подъёмов'
        },
        {
            id: 4,
            title: 'Fight Ready 12 Minute AMRAP Workout',
            time: '12 минут',
            description: 'За 12 минут нужно выполнить как можно больше раундов из следующих упражнений: 10 круговых ударов ногой, 5 опусканий трицепса, 40 прямых ударов, 10 прыжков в приседе, 10 подъёмов колена.',
            exercises: '10 круговых ударов ногой, 5 опусканий трицепса, 40 прямых ударов, 10 прыжков в приседе, 10 подъёмов колена'
        },
        {
            id: 5,
            title: 'Gasping For Air AMRAP Challenge Workout',
            time: '12 минут',
            description: 'За 12 минут нужно выполнить как можно больше раундов из следующих упражнений: 100 высоких колен, 10 отжиманий на алмазной скамье, 50 прыжков в сторону, 10 боковых выпадов, 10 бёрпи, 10 приседаний.',
            exercises: '100 высоких колен, 10 отжиманий на алмазной скамье, 50 прыжков в сторону, 10 боковых выпадов, 10 бёрпи, 10 приседаний'
        },
        {
            id: 6,
            title: 'Minimal Equipment Indoor AMRAP Workout',
            time: '12 минут',
            description: 'За 12 минут нужно выполнить как можно больше раундов из следующих упражнений: 30 воздушных приседаний, 10 подтягиваний, 30 боковых выпадов, 10 отжиманий на скамье, 10 подъёмов колена, 30 вращений с медицинским мячом.',
            exercises: '30 воздушных приседаний, 10 подтягиваний, 30 боковых выпадов, 10 отжиманий на скамье, 10 подъёмов колена, 30 вращений с медицинским мячом'
        },
        {
            id: 7,
            title: 'Total Body Conditioning AMRAP Workout',
            time: '12 минут',
            description: 'За 12 минут нужно выполнить как можно больше раундов из следующих упражнений: 30 двойных подтягиваний (при необходимости можно заменить на 60 одиночных), 10 подтягиваний.',
            exercises: '30 двойных подтягиваний (при необходимости можно заменить на 60 одиночных), 10 подтягиваний'
        },
        {
            id: 8,
            title: '10-минутный AMRAP комплекс',
            time: '10 минут',
            description: 'За 10 минут выполните максимальное количество раундов: 12 боковых прыжков "лыжник", 12 шагов медвежьей походки, 12 выпадов назад с поднятыми руками, 12 подъёмов колена в планке, 12 сумо-приседаний с прыжком, 12 скручиваний "велосипед".',
            exercises: '12 боковых прыжков "лыжник", 12 шагов медвежьей походки, 12 выпадов назад с поднятыми руками, 12 подъёмов колена в планке, 12 сумо-приседаний с прыжком, 12 скручиваний "велосипед"'
        },
        {
            id: 9,
            title: 'Full Body AMRAP 15 минут',
            time: '15 минут',
            description: 'За 15 минут выполните как можно больше раундов: 15 бёрпи, 20 приседаний, 15 отжиманий, 20 скручиваний на пресс, 30 секунд планки.',
            exercises: '15 бёрпи, 20 приседаний, 15 отжиманий, 20 скручиваний на пресс, 30 секунд планки'
        },
        {
            id: 10,
            title: 'Cardio Blast AMRAP',
            time: '12 минут',
            description: 'За 12 минут выполните максимальное количество раундов: 50 прыжков джампинг-джек, 20 приседаний с выпрыгиванием, 15 бёрпи, 30 высоких колен, 20 отжиманий.',
            exercises: '50 прыжков джампинг-джек, 20 приседаний с выпрыгиванием, 15 бёрпи, 30 высоких колен, 20 отжиманий'
        },
        {
            id: 11,
            title: 'Upper Body AMRAP',
            time: '10 минут',
            description: 'За 10 минут выполните как можно больше раундов: 10 отжиманий, 15 отжиманий на трицепс (от скамьи), 20 подъёмов корпуса, 10 отжиманий в стойке у стены (или альтернатива), 15 подтягиваний (или тяга в наклоне).',
            exercises: '10 отжиманий, 15 отжиманий на трицепс, 20 подъёмов корпуса, 10 отжиманий в стойке у стены, 15 подтягиваний'
        },
        {
            id: 12,
            title: 'Lower Body Power AMRAP',
            time: '15 минут',
            description: 'За 15 минут выполните максимальное количество раундов: 25 приседаний, 20 выпадов (по 10 на каждую ногу), 15 прыжков на коробку (или альтернатива), 20 подъёмов на носки, 30 секунд удержания приседа.',
            exercises: '25 приседаний, 20 выпадов (по 10 на каждую ногу), 15 прыжков на коробку, 20 подъёмов на носки, 30 секунд удержания приседа'
        },
        {
            id: 13,
            title: 'Core Strength AMRAP',
            time: '12 минут',
            description: 'За 12 минут выполните как можно больше раундов: 20 скручиваний, 15 подъёмов ног, 20 русских скручиваний, 30 секунд планки, 15 боковых планок (по 7-8 на каждую сторону).',
            exercises: '20 скручиваний, 15 подъёмов ног, 20 русских скручиваний, 30 секунд планки, 15 боковых планок'
        },
        {
            id: 14,
            title: 'HIIT AMRAP Challenge',
            time: '20 минут',
            description: 'За 20 минут выполните максимальное количество раундов: 20 бёрпи, 30 приседаний, 20 отжиманий, 40 прыжков джампинг-джек, 20 подъёмов колен, 30 секунд планки.',
            exercises: '20 бёрпи, 30 приседаний, 20 отжиманий, 40 прыжков джампинг-джек, 20 подъёмов колен, 30 секунд планки'
        },
        {
            id: 15,
            title: 'Beginner Friendly AMRAP',
            time: '10 минут',
            description: 'За 10 минут выполните как можно больше раундов: 10 приседаний, 5 отжиманий с колен, 10 скручиваний, 20 секунд планки на коленях, 10 подъёмов колен.',
            exercises: '10 приседаний, 5 отжиманий с колен, 10 скручиваний, 20 секунд планки на коленях, 10 подъёмов колен'
        },
        {
            id: 16,
            title: 'Tabata Style AMRAP',
            time: '16 минут',
            description: 'За 16 минут выполните максимальное количество раундов: 8 бёрпи, 16 приседаний, 8 отжиманий, 16 скручиваний, 8 выпадов (по 4 на каждую ногу), 16 прыжков джампинг-джек.',
            exercises: '8 бёрпи, 16 приседаний, 8 отжиманий, 16 скручиваний, 8 выпадов, 16 прыжков джампинг-джек'
        },
        {
            id: 17,
            title: 'Endurance AMRAP',
            time: '18 минут',
            description: 'За 18 минут выполните как можно больше раундов: 15 бёрпи, 25 приседаний, 15 отжиманий, 30 высоких колен, 20 подъёмов корпуса, 40 секунд планки.',
            exercises: '15 бёрпи, 25 приседаний, 15 отжиманий, 30 высоких колен, 20 подъёмов корпуса, 40 секунд планки'
        }
    ];

    function qs(id) {
        return document.getElementById(id);
    }

    function formatTime(totalSeconds) {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    function populateSelect(select, max) {
        if (!select) return;
        select.innerHTML = '';
        for (var i = 0; i <= max; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.textContent = i < 10 ? '0' + i : i;
            select.appendChild(option);
        }
    }

    function populateSelectors() {
        populateSelect(elements.minuteSelect, 59);
        populateSelect(elements.secondSelect, 59);

        if (elements.minuteSelect) elements.minuteSelect.value = 10;
        if (elements.secondSelect) elements.secondSelect.value = 0;
    }

    function generatePresetButtons() {
        if (!elements.presetsGrid) return;
        elements.presetsGrid.innerHTML = '';
        var buttons = [];

        for (var m = PRESET_START_MIN; m <= PRESET_END_MIN; m++) {
            for (var s = 0; s < 60; s += PRESET_STEP_SECONDS) {
                if (m === PRESET_END_MIN && s > 50) break;
                var totalSeconds = m * 60 + s;
                var button = document.createElement('button');
                button.type = 'button';
                button.dataset.seconds = totalSeconds;
                button.textContent = formatTime(totalSeconds);
                button.className = 'amrap-preset';
                button.addEventListener('click', function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    if (state.isRunning) return;
                    if (typeof playClickEffectSound === 'function') {
                        playClickEffectSound();
                    }
                    var seconds = parseInt(evt.currentTarget.dataset.seconds, 10);
                    applyPreset(seconds);
                });
                elements.presetsGrid.appendChild(button);
                buttons.push(button);
            }
        }

        elements.presetButtons = buttons;
    }

    function highlightPresetButtons() {
        if (!elements.presetButtons) return;
        elements.presetButtons.forEach(function (button) {
            var seconds = parseInt(button.dataset.seconds, 10);
            if (state.currentPresetSeconds === seconds) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    function applyPreset(totalSeconds) {
        state.currentPresetSeconds = totalSeconds;
        if (elements.minuteSelect) {
            elements.minuteSelect.value = Math.floor(totalSeconds / 60);
        }
        if (elements.secondSelect) {
            elements.secondSelect.value = totalSeconds % 60;
        }
        state.remainingSeconds = totalSeconds;
        updateCountdown();
        highlightPresetButtons();
        closePresetsModal();
        ensureTimerHashIfTimerActive();
    }

    function ensureTimerHashIfTimerActive() {
        try {
            var timerArticle = document.getElementById('timer');
            // Не перетираем навигацию по сайту: меняем hash только если таймер реально активен
            if (timerArticle && timerArticle.classList && timerArticle.classList.contains('active')) {
                if (window.location.hash !== '#timer') {
                    window.location.hash = '#timer';
                }
            }
        } catch (e) {}
    }

    function getSelectedTotalSeconds() {
        var minutes = elements.minuteSelect ? parseInt(elements.minuteSelect.value, 10) || 0 : 0;
        var seconds = elements.secondSelect ? parseInt(elements.secondSelect.value, 10) || 0 : 0;
        return minutes * 60 + seconds;
    }

    function updateCountdown() {
        if (elements.countdown) {
            if (state.isPreparationPhase) {
                // В фазе "Готовимся" показываем оставшееся время подготовки
                elements.countdown.textContent = formatTime(state.preparationTime);
            } else {
                // В основной фазе показываем оставшееся время тренировки
                elements.countdown.textContent = formatTime(state.remainingSeconds);
            }
        }
    }

    function setStatus(text) {
        // Элемент amrap-status-text удален, функция оставлена для совместимости
    }

    function updateRoundCount() {
        if (elements.roundsCount) {
            elements.roundsCount.textContent = state.rounds.length;
        }
    }

    function renderRoundsHistory() {
        if (!elements.roundsHistory) return;
        elements.roundsHistory.innerHTML = '';

        if (state.rounds.length === 0) {
            var empty = document.createElement('p');
            empty.textContent = 'Раунды ещё не зафиксированы';
            empty.style.color = 'rgba(255, 255, 255, 0.6)';
            empty.style.letterSpacing = '0.1em';
            elements.roundsHistory.appendChild(empty);
            updateResultsSummary();
            return;
        }

        var best = state.rounds[0];
        var worst = state.rounds[0];

        state.rounds.forEach(function (round) {
            if (round.durationSeconds < best.durationSeconds) best = round;
            if (round.durationSeconds > worst.durationSeconds) worst = round;
        });

        state.rounds.forEach(function (round) {
            var item = document.createElement('div');
            item.className = 'amrap-round-item';
            if (round.index === best.index) item.classList.add('amrap-round-best');
            if (round.index === worst.index && best.index !== worst.index) item.classList.add('amrap-round-worst');
            var label = document.createElement('span');
            label.textContent = 'Раунд ' + round.index;
            var duration = document.createElement('span');
            duration.textContent = formatTime(round.durationSeconds);
            item.appendChild(label);
            item.appendChild(duration);
            elements.roundsHistory.appendChild(item);
        });

        updateResultsSummary(best, worst);
    }

    function updateResultsSummary(best, worst) {
        if (!elements.results) return;

        if (!best || !worst) {
            elements.bestRound.textContent = '—';
            elements.worstRound.textContent = '—';
        } else {
            elements.bestRound.textContent = 'Раунд ' + best.index + ' · ' + formatTime(best.durationSeconds);
            elements.worstRound.textContent = 'Раунд ' + worst.index + ' · ' + formatTime(worst.durationSeconds);
        }
        elements.totalRounds.textContent = state.rounds.length;
        
        // Показываем общее время всегда, если оно вычислено
        if (elements.totalTime) {
            if (state.totalElapsedTime !== null) {
                elements.totalTime.textContent = formatTime(state.totalElapsedTime);
                elements.totalTime.parentElement.style.display = 'block';
            } else {
                elements.totalTime.parentElement.style.display = 'none';
            }
        }
    }

    function setControlsDisabled(disabled) {
        if (elements.minuteSelect) elements.minuteSelect.disabled = disabled;
        if (elements.secondSelect) elements.secondSelect.disabled = disabled;
        if (elements.presetButtons) {
            elements.presetButtons.forEach(function (button) {
                button.disabled = disabled;
            });
        }
        if (elements.presetsOpenButton) {
            elements.presetsOpenButton.disabled = disabled;
        }
        if (disabled) {
            closePresetsModal();
        }
    }

    function setRoundButtonDisabled(disabled) {
        var roundsWidget = document.getElementById('amrap-rounds-widget-top');
        if (roundsWidget) {
            if (disabled) {
                roundsWidget.classList.add('disabled');
            } else {
                roundsWidget.classList.remove('disabled');
            }
        }
    }

    function updateButtonsState() {
        if (!elements.startBtn || !elements.pauseBtn) return;
        
        if (!state.isRunning && !state.isPaused) {
            // До старта: показываем только кнопку Старт
            elements.startBtn.textContent = 'Старт';
            elements.startBtn.disabled = false;
            elements.startBtn.style.display = 'block';
            elements.startBtn.classList.remove('dark');
            elements.startBtn.classList.add('primary');
            elements.pauseBtn.style.display = 'none';
        } else if (state.isPaused) {
            // При паузе: показываем Стоп и Продолжить
            elements.startBtn.textContent = 'Стоп';
            elements.startBtn.disabled = false;
            elements.startBtn.style.display = 'block';
            elements.startBtn.classList.remove('primary');
            elements.startBtn.classList.add('dark');
            elements.pauseBtn.textContent = 'Продолжить';
            elements.pauseBtn.disabled = false;
            elements.pauseBtn.style.display = 'block';
        } else {
            // Во время работы: показываем Стоп и Пауза
            elements.startBtn.textContent = 'Стоп';
            elements.startBtn.disabled = false;
            elements.startBtn.style.display = 'block';
            elements.startBtn.classList.remove('primary');
            elements.startBtn.classList.add('dark');
            elements.pauseBtn.textContent = 'Пауза';
            elements.pauseBtn.disabled = false;
            elements.pauseBtn.style.display = 'block';
        }
    }

    function hideResults() {
        if (elements.results) {
            elements.results.classList.remove('is-visible');
        }
    }

    function showResults() {
        if (elements.results) {
            elements.results.classList.add('is-visible');
        }
        renderRoundsHistory();
    }

    function resetState(options) {
        options = options || {};
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        state.isRunning = false;
        state.isPaused = false;
        state.isPreparationPhase = false;
        state.preparationTime = 10;
        state.countdownSoundPlayed = false; // Сбрасываем флаг звука при сбросе
        state.countdown54SoundPlayed = false; // Сбрасываем флаг звука 5-4-3-2-1 при сбросе
        state.rounds = [];
        state.startTimestamp = null;
        state.lastRoundTimestamp = null;
        state.remainingSeconds = state.currentPresetSeconds || getSelectedTotalSeconds() || 0;
        state.pausedDuration = 0;
        state.pauseStartTime = null;
        state.totalElapsedTime = null;
        state.wasStoppedEarly = false;
        
        // Обновляем глобальное состояние
        if (window.amrapState) {
            window.amrapState.isPreparationPhase = false;
        }
        
        updateCountdown();
        updateRoundCount();
        setRoundButtonDisabled(true);
        setControlsDisabled(false);
        updateButtonsState();
        setStatus('Готов к старту');
        if (!options.keepResults) {
            hideResults();
        }
        // Скрываем описание тренировки при сбросе
        if (elements.workoutDescription) {
            elements.workoutDescription.style.display = 'none';
        }
        
        // Показываем фразу "Тренировка" и скрываем фразы фаз при сбросе
        var timerLabel = document.getElementById('amrap-timer-label');
        var phaseLabel = document.getElementById('amrap-phase-label');
        if (timerLabel) {
            timerLabel.style.display = 'block';
        }
        if (phaseLabel) {
            phaseLabel.style.display = 'none';
        }
        
        // Обновляем прогресс-бар при сбросе
        if (typeof updateProgressBar === 'function' && state.remainingSeconds) {
            updateProgressBar(state.remainingSeconds, state.remainingSeconds);
        }
        
        // Очищаем отметки раундов на прогресс-баре
        clearRoundMarkers();
    }

    function tick() {
        if (!state.isRunning || state.isPaused) return;
        
        // Фаза "Готовимся" (10 секунд)
        if (state.isPreparationPhase) {
            state.preparationTime--;
            
            // Обновляем отображение для фазы "Готовимся"
            if (elements.countdown) {
                elements.countdown.textContent = formatTime(state.preparationTime);
            }
            
            // Показываем фразу "Готовимся"
            var phaseLabel = document.getElementById('amrap-phase-label');
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
            
            // Обновляем глобальное состояние
            if (window.amrapState) {
                window.amrapState.isPreparationPhase = true;
            }
            
            // Когда фаза "Готовимся" завершена, переходим к основной тренировке
            if (state.preparationTime <= 0) {
                state.isPreparationPhase = false;
                state.preparationTime = 10; // Сбрасываем для следующего использования
                state.countdownSoundPlayed = false; // Сбрасываем флаг звука для следующего использования
                // Обновляем глобальное состояние
                if (window.amrapState) {
                    window.amrapState.isPreparationPhase = false;
                }
                setStatus('Тренировка идёт');
                
                // Меняем фразу на "Работаем"
                var phaseLabel = document.getElementById('amrap-phase-label');
                if (phaseLabel) {
                    phaseLabel.textContent = 'Работаем';
                    phaseLabel.style.display = 'block';
                }
                
                // Включаем кнопку "+ РАУНД" когда начинается фаза "Работаем"
                setRoundButtonDisabled(false);
            } else {
                return; // Продолжаем отсчет фазы "Готовимся"
            }
        }
        
        // Основная фаза тренировки
        // Обновляем глобальное состояние
        if (window.amrapState) {
            window.amrapState.isPreparationPhase = false;
        }
        
        // Показываем фразу "Работаем"
        var phaseLabel = document.getElementById('amrap-phase-label');
        if (phaseLabel) {
            phaseLabel.textContent = 'Работаем';
            phaseLabel.style.display = 'block';
        }
        
        state.remainingSeconds = Math.max(0, state.remainingSeconds - 1);
        
        // Воспроизводим звук 5-4-3-2-1.mp3 за 5 секунд до окончания стадии "Работаем"
        // Проверяем после уменьшения remainingSeconds, когда remainingSeconds === 5 (осталось 5 секунд)
        if (state.remainingSeconds === 5 && !state.countdown54SoundPlayed) {
            var soundsObj = window.sounds || {};
            if (soundsObj && soundsObj.countdown54) {
                playCountdown54Sound(soundsObj.countdown54);
                state.countdown54SoundPlayed = true; // Помечаем, что звук уже воспроизведен
            }
        }
        
        updateCountdown();
        
        // Обновляем прогресс-бар для общего времени красным цветом
        if (typeof updateProgressBar === 'function' && state.totalSeconds) {
            updateProgressBar(state.remainingSeconds, state.totalSeconds);
        }
        // Обновляем отметки раундов на прогресс-баре
        updateRoundMarkers();
        
        if (state.remainingSeconds === 0) {
            finishSession(true);
        }
    }

    function startSession() {
        if (state.isRunning) return;
        var total = getSelectedTotalSeconds();
        if (total <= 0) {
            alert('Пожалуйста, установите время тренировки');
            return;
        }
        
        // Воспроизводим звук Whistler.mp3 при нажатии на кнопку СТАРТ
        if (typeof playWhistlerSound === 'function') {
            playWhistlerSound();
        }
        
        state.totalSeconds = total;
        state.currentPresetSeconds = total;
        state.remainingSeconds = total;
        state.isRunning = true;
        state.isPaused = false;
        state.isPreparationPhase = true; // Начинаем с фазы "Готовимся"
        state.countdownSoundPlayed = false; // Сбрасываем флаг звука при старте
        state.countdown54SoundPlayed = false; // Сбрасываем флаг звука 5-4-3-2-1 при старте
        state.rounds = [];
        state.startTimestamp = Date.now();
        state.lastRoundTimestamp = Date.now();
        state.pausedDuration = 0;
        state.pauseStartTime = null;
        state.totalElapsedTime = null;
        state.wasStoppedEarly = false;
        
        // Очищаем отметки раундов на прогресс-баре
        clearRoundMarkers();
        
        // Экспортируем состояние для использования в updateProgressBar
        window.amrapState = {
            isPreparationPhase: state.isPreparationPhase,
            totalElapsedTime: state.totalElapsedTime
        };
        
        hideResults();
        updateCountdown();
        updateRoundCount();
        
        // Скрываем фразу "Тренировка" и показываем "Готовимся"
        var timerLabel = document.getElementById('amrap-timer-label');
        var phaseLabel = document.getElementById('amrap-phase-label');
        if (timerLabel) {
            timerLabel.style.display = 'none';
        }
        if (phaseLabel) {
            phaseLabel.textContent = 'Готовимся';
            phaseLabel.style.display = 'block';
        }
        
        // Инициализируем прогресс-бар для фазы "Готовимся" (желтый цвет)
        if (typeof updateProgressBar === 'function') {
            updateProgressBar(state.preparationTime, 10);
        }
        updateButtonsState();
        setControlsDisabled(true);
        setRoundButtonDisabled(true); // Отключаем кнопку "+ РАУНД" во время фазы "Готовимся"
        setStatus('Готовимся');
        highlightPresetButtons();
        clearInterval(state.timerInterval);
        state.timerInterval = setInterval(tick, 1000);
    }

    function stopSession(suppressSound) {
        // Воспроизводим звук stop.mp3 только при реальном нажатии на кнопку СТОП (действие пользователя)
        // suppressSound === true означает программный вызов (например, при переключении режимов)
        // Звук воспроизводится только если таймер действительно был запущен и это действие пользователя
        if (!suppressSound && (state.isRunning || state.isPaused) && typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        if (state.isRunning || state.isPaused) {
            // Останавливаем таймер
            state.isRunning = false;
            state.isPaused = false;
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            
            // Вычисляем общее затраченное время
            if (state.startTimestamp) {
                var now = Date.now();
                var currentPauseDuration = 0;
                if (state.pauseStartTime) {
                    currentPauseDuration = now - state.pauseStartTime;
                }
                var totalTime = now - state.startTimestamp - state.pausedDuration - currentPauseDuration;
                state.totalElapsedTime = Math.floor(totalTime / 1000); // в секундах
                state.wasStoppedEarly = state.remainingSeconds > 0;
            }
            
            // Показываем фразу "Тренировка" и скрываем фразы фаз при остановке
            var timerLabel = document.getElementById('amrap-timer-label');
            var phaseLabel = document.getElementById('amrap-phase-label');
            if (timerLabel) {
                timerLabel.style.display = 'block';
            }
            if (phaseLabel) {
                phaseLabel.style.display = 'none';
            }
            
        // Показываем результаты
        showResults();
        
        // Обновляем глобальное состояние с информацией о времени
        if (window.amrapState) {
            window.amrapState.totalElapsedTime = state.totalElapsedTime;
        }
        
        // Обновляем состояние кнопок
        updateButtonsState();
        setControlsDisabled(false);
        setRoundButtonDisabled(true);
        setStatus('Тренировка остановлена');
        
        // Сбрасываем прогресс-бар при остановке
        var progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        // Очищаем отметки раундов на прогресс-баре
        clearRoundMarkers();
        } else {
            resetState();
        }
    }

    function pauseSession() {
        if (!state.isRunning || state.isPaused) return;
        
        // Воспроизводим звук stop.mp3 при нажатии на кнопку ПАУЗА (действие пользователя)
        if (typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        state.isPaused = true;
        state.pauseStartTime = Date.now();
        setStatus('Пауза');
        updateButtonsState();
        setRoundButtonDisabled(true);
    }

    function resumeSession() {
        if (!state.isRunning || !state.isPaused) return;
        
        // Воспроизводим звук stop.mp3 при нажатии на кнопку ПРОДОЛЖИТЬ (действие пользователя)
        if (typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        if (state.pauseStartTime) {
            state.pausedDuration += Date.now() - state.pauseStartTime;
            state.pauseStartTime = null;
        }
        state.isPaused = false;
        state.lastRoundTimestamp = Date.now();
        setStatus('Тренировка идёт');
        updateButtonsState();
        // Включаем кнопку "+ РАУНД" только если не находимся в фазе "Готовимся"
        setRoundButtonDisabled(state.isPreparationPhase);
    }

    function finishSession(autoComplete) {
        if (!state.isRunning && !state.isPaused) return;
        state.isRunning = false;
        state.isPaused = false;
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        state.remainingSeconds = 0;
        
        // Вычисляем общее затраченное время (всегда, независимо от того, завершилась ли тренировка автоматически или была остановлена)
        if (state.startTimestamp) {
            var now = Date.now();
            var currentPauseDuration = 0;
            if (state.pauseStartTime) {
                currentPauseDuration = now - state.pauseStartTime;
            }
            var totalTime = now - state.startTimestamp - state.pausedDuration - currentPauseDuration;
            state.totalElapsedTime = Math.floor(totalTime / 1000); // в секундах
            state.wasStoppedEarly = !autoComplete; // досрочно только если не autoComplete
        }
        
        updateCountdown();
        setStatus(autoComplete ? 'Время вышло' : 'Тренировка завершена');
        setControlsDisabled(false);
        setRoundButtonDisabled(true);
        updateButtonsState();
        
        // Показываем фразу "Тренировка" и скрываем фразы фаз при окончании тренировки
        var timerLabel = document.getElementById('amrap-timer-label');
        var phaseLabel = document.getElementById('amrap-phase-label');
        if (timerLabel) {
            timerLabel.style.display = 'block';
        }
        if (phaseLabel) {
            phaseLabel.style.display = 'none';
        }
        
        showResults();
        
        // Обновляем глобальное состояние с информацией о времени
        if (window.amrapState) {
            window.amrapState.totalElapsedTime = state.totalElapsedTime;
        }
        
        try {
            if (window.sounds && window.sounds.finish) {
                var finishSound = new Audio(window.sounds.finish);
                finishSound.play().catch(function(e) {
                    console.warn('Не удалось воспроизвести звук окончания', e);
                });
            }
        } catch (e) {
            console.warn('Ошибка при воспроизведении звука окончания', e);
        }
        
        // Показываем экран с цитатами как в Табата и HIIT
        if (autoComplete && window.newtimer && typeof window.newtimer.sessionEnded === 'function') {
            // Вызываем функцию показа экрана с цитатами
            // Элементы AMRAP будут скрыты внутри sessionEnded
            window.newtimer.sessionEnded();
        }
    }

    function recordRound() {
        if (!state.isRunning || state.isPaused || state.isPreparationPhase) return;
        var now = Date.now();
        var previous = state.lastRoundTimestamp || state.startTimestamp || now;
        var durationSeconds = Math.max(1, Math.round((now - previous) / 1000));
        state.lastRoundTimestamp = now;
        
        // Получаем текущую позицию прогресс-бара в момент нажатия кнопки
        var progressBar = document.getElementById('progress-bar');
        var progressBarWidth = 0;
        if (progressBar && state.totalSeconds) {
            // Вычисляем процент прогресса на основе оставшегося времени
            var elapsedSeconds = state.totalSeconds - state.remainingSeconds;
            progressBarWidth = (elapsedSeconds / state.totalSeconds) * 100;
            // Ограничиваем от 0 до 100%
            progressBarWidth = Math.max(0, Math.min(100, progressBarWidth));
        }
        
        // Вычисляем время относительно начала основной тренировки (после фазы "Готовимся")
        // Учитываем паузы
        var elapsedSinceStart = now - state.startTimestamp - state.pausedDuration;
        var preparationTimeMs = state.preparationTime * 1000;
        var elapsedInWorkPhase = Math.max(0, elapsedSinceStart - preparationTimeMs);
        var elapsedInWorkPhaseSeconds = Math.floor(elapsedInWorkPhase / 1000);
        
        state.rounds.push({
            index: state.rounds.length + 1,
            durationSeconds: durationSeconds,
            elapsedSeconds: elapsedInWorkPhaseSeconds, // Время относительно начала основной фазы
            progressPosition: progressBarWidth // Позиция на прогресс-баре в процентах
        });
        updateRoundCount();
        renderRoundsHistory();
        updateRoundMarkers(); // Обновляем отметки на прогресс-баре
        playClackSound('assets/audio/clack.mp3');
    }

    function clearRoundMarkers() {
        var progressContainer = document.getElementById('progress-bar-container');
        if (progressContainer) {
            var markers = progressContainer.querySelectorAll('.amrap-round-marker-container');
            markers.forEach(function(marker) {
                marker.remove();
            });
        }
        // Очищаем информацию о раундах
        var roundsInfo = document.getElementById('amrap-rounds-info-list');
        if (roundsInfo) {
            roundsInfo.innerHTML = '';
        }
    }
    
    function formatRoundDuration(seconds) {
        if (seconds < 60) {
            return seconds + 'с';
        } else {
            var minutes = Math.floor(seconds / 60);
            var secs = seconds % 60;
            return (minutes < 10 ? '0' + minutes : minutes) + ':' + (secs < 10 ? '0' + secs : secs) + 'с';
        }
    }
    
    function updateRoundMarkers() {
        // Очищаем старые отметки
        clearRoundMarkers();
        
        // Если тренировка не запущена или нет раундов, не показываем отметки
        if (!state.isRunning || state.rounds.length === 0) return;
        
        var progressContainer = document.getElementById('progress-bar-container');
        if (!progressContainer) return;
        
        var progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;
        
        // Вычисляем время основной фазы (без фазы "Готовимся")
        var workPhaseSeconds = state.totalSeconds - state.preparationTime;
        if (workPhaseSeconds <= 0) return;
        
        // Создаем или получаем контейнер для информации о раундах
        var roundsInfoList = document.getElementById('amrap-rounds-info-list');
        if (!roundsInfoList) {
            roundsInfoList = document.createElement('div');
            roundsInfoList.id = 'amrap-rounds-info-list';
            roundsInfoList.className = 'amrap-rounds-info-list';
            // Вставляем после контейнера прогресс-бара
            progressContainer.parentNode.insertBefore(roundsInfoList, progressContainer.nextSibling);
        }
        
        // Создаем отметки для каждого раунда
        state.rounds.forEach(function(round) {
            // Используем сохраненную позицию прогресс-бара, если она есть
            // Иначе вычисляем позицию на основе elapsedSeconds
            var positionPercentage;
            if (round.progressPosition !== undefined && round.progressPosition !== null) {
                // Используем сохраненную позицию прогресс-бара
                positionPercentage = round.progressPosition;
            } else {
                // Вычисляем позицию отметки относительно основной фазы (для обратной совместимости)
                positionPercentage = (round.elapsedSeconds / workPhaseSeconds) * 100;
            }
            
            // Ограничиваем позицию от 0 до 100%
            positionPercentage = Math.max(0, Math.min(100, positionPercentage));
            
            // Создаем контейнер для отметки (палочка + кружочек)
            var markerContainer = document.createElement('div');
            markerContainer.className = 'amrap-round-marker-container';
            markerContainer.style.left = positionPercentage + '%';
            
            // Создаем тонкую белую палочку
            var markerLine = document.createElement('div');
            markerLine.className = 'amrap-round-marker-line';
            
            // Создаем серый кружочек с номером
            var markerCircle = document.createElement('div');
            markerCircle.className = 'amrap-round-marker-circle';
            markerCircle.textContent = round.index;
            markerCircle.title = 'Раунд ' + round.index + ' (' + formatRoundDuration(round.durationSeconds) + ')';
            
            // Добавляем элементы в контейнер
            markerContainer.appendChild(markerLine);
            markerContainer.appendChild(markerCircle);
            
            // Добавляем контейнер отметки в контейнер прогресс-бара
            progressContainer.appendChild(markerContainer);
            
            // Создаем элемент информации о раунде в формате тега
            var roundInfo = document.createElement('div');
            roundInfo.className = 'amrap-round-info-item';
            roundInfo.textContent = 'Р' + round.index + ' — ' + formatRoundDuration(round.durationSeconds);
            roundsInfoList.appendChild(roundInfo);
        });
    }
    
    function attachEventHandlers() {
        if (elements.startBtn) {
            elements.startBtn.addEventListener('click', function() {
                if (elements.startBtn.textContent === 'Старт') {
                    startSession();
                } else if (elements.startBtn.textContent === 'Стоп') {
                    stopSession();
                }
            });
        }
        if (elements.pauseBtn) {
            elements.pauseBtn.addEventListener('click', function() {
                if (elements.pauseBtn.textContent === 'Пауза') {
                    pauseSession();
                } else if (elements.pauseBtn.textContent === 'Продолжить') {
                    resumeSession();
                }
            });
        }
        // Обработчик клика на виджет раундов
        var roundsWidget = document.getElementById('amrap-rounds-widget-top');
        if (roundsWidget) {
            roundsWidget.addEventListener('click', function(e) {
                // Проверяем, что клик не на disabled виджете
                if (!roundsWidget.classList.contains('disabled') && state.isRunning && !state.isPaused) {
                    recordRound();
                }
            });
        }
        if (elements.minuteSelect) elements.minuteSelect.addEventListener('change', function () {
            if (state.isRunning) return;
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            state.currentPresetSeconds = null;
            state.remainingSeconds = getSelectedTotalSeconds();
            updateCountdown();
            highlightPresetButtons();
        });
        if (elements.secondSelect) elements.secondSelect.addEventListener('change', function () {
            if (state.isRunning) return;
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            state.currentPresetSeconds = null;
            state.remainingSeconds = getSelectedTotalSeconds();
            updateCountdown();
            highlightPresetButtons();
        });
        if (elements.presetsOpenButton) {
            elements.presetsOpenButton.addEventListener('click', function () {
                if (elements.presetsOpenButton.disabled) return;
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                openPresetsModal();
            });
        }
        if (elements.presetsCloseButton) {
            elements.presetsCloseButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                closePresetsModal();
            });
        }
        if (elements.presetsModal) {
            elements.presetsModal.addEventListener('click', function (evt) {
                if (evt.target === elements.presetsModal) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    closePresetsModal();
                }
            });
        }
        if (elements.workoutsOpenButton) {
            elements.workoutsOpenButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                openWorkoutsSelectModal();
            });
        }
        if (elements.workoutsSelectClose) {
            elements.workoutsSelectClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                closeWorkoutsSelectModal();
            });
        }
        if (elements.workoutsSelectModal) {
            elements.workoutsSelectModal.addEventListener('click', function (evt) {
                if (evt.target === elements.workoutsSelectModal) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    closeWorkoutsSelectModal();
                }
            });
        }
    }

    function init() {
        if (state.initialized) return;
        elements.container = qs('amrap-timer-container');
        if (!elements.container) return;

        elements.countdown = qs('amrap-countdown');
        // elements.statusText = qs('amrap-status-text'); // Удалено
        elements.roundsCount = qs('amrap-rounds-count');
        elements.minuteSelect = qs('amrap-minutes-select');
        elements.secondSelect = qs('amrap-seconds-select');
        elements.startBtn = qs('amrap-start-btn');
        elements.pauseBtn = qs('amrap-pause-btn');
        elements.results = qs('amrap-results');
        elements.totalRounds = qs('amrap-total-rounds');
        elements.bestRound = qs('amrap-best-round');
        elements.worstRound = qs('amrap-worst-round');
        elements.totalTime = qs('amrap-total-time');
        elements.roundsHistory = qs('amrap-rounds-history');
        elements.presetsGrid = qs('amrap-presets-grid');
        elements.presetsOpenButton = qs('amrap-presets-open');
        elements.presetsCloseButton = qs('amrap-presets-close');
        elements.workoutsSelectModal = qs('amrap-workouts-select-modal');
        elements.workoutsSelectClose = qs('amrap-workouts-select-close');
        elements.workoutsOpenButton = qs('amrap-workouts-open');
        elements.workoutsCards = qs('amrap-workouts-cards');
        elements.workoutDescription = qs('amrap-workout-description');
        elements.presetsModal = qs('amrap-workouts-modal');

        populateSelectors();
        generatePresetButtons();
        attachEventHandlers();
        applyPreset(600); // 10 минут по умолчанию
        updateRoundCount();
        hideResults();
        setRoundButtonDisabled(true);
        updateButtonsState();
        setStatus('Готов к старту');

        state.initialized = true;
    }

    document.addEventListener('DOMContentLoaded', init);

    window.showAmrapTimer = function () {
        init();
        if (!elements.container) return;
        
        // Скрываем описание тренировки HIIT
        const hiitWorkoutDescription = document.getElementById('hiit-workout-description');
        if (hiitWorkoutDescription) {
            hiitWorkoutDescription.style.display = 'none';
        }
        
        // Скрываем описание тренировки EMOM
        const emomWorkoutDescription = document.getElementById('emom-workout-description');
        if (emomWorkoutDescription) {
            emomWorkoutDescription.style.display = 'none';
        }
        
        document.body.classList.add('amrap-active');
        elements.container.style.display = 'block';
        
        // Перемещаем радио в карточку AMRAP
        var radioElement = document.getElementById('radio');
        var amrapCardContainer = document.querySelector('.amrap-card-container');
        var controlsCardContainer = document.querySelector('.controls-card-container');
        if (radioElement && amrapCardContainer && controlsCardContainer) {
            // Сохраняем оригинальный родитель для восстановления
            if (!window.amrapRadioOriginalParent) {
                window.amrapRadioOriginalParent = radioElement.parentNode;
            }
            // Перемещаем радио в начало карточки AMRAP
            amrapCardContainer.insertBefore(radioElement, amrapCardContainer.firstChild);
        }
        
        // Создаем пустой прогресс-бар по умолчанию для единого стиля
        if (typeof createDefaultProgressBar === 'function') {
            setTimeout(function() {
                createDefaultProgressBar();
            }, 100);
        }
        // Показываем обертку с таймером и счётчиком раундов
        var timerRow = qs('amrap-timer-row-wrapper');
        if (timerRow) {
            timerRow.style.display = 'flex';
        }
        state.remainingSeconds = getSelectedTotalSeconds() || state.remainingSeconds;
        updateCountdown();
        highlightPresetButtons();
        
        // Показываем фразу "Тренировка" и скрываем фразы фаз при показе (пока не запущен таймер)
        var timerLabel = document.getElementById('amrap-timer-label');
        var phaseLabel = document.getElementById('amrap-phase-label');
        if (timerLabel) {
            timerLabel.style.display = 'block';
        }
        if (phaseLabel) {
            phaseLabel.style.display = 'none';
        }
        
        // Инициализируем прогресс-бар при показе AMRAP
        if (typeof updateProgressBar === 'function' && state.remainingSeconds) {
            updateProgressBar(state.remainingSeconds, state.remainingSeconds);
        }
    };

    window.hideAmrapTimer = function () {
        if (!elements.container) return;
        document.body.classList.remove('amrap-active');
        elements.container.style.display = 'none';
        // Скрываем обертку с таймером и счётчиком раундов
        var timerRow = qs('amrap-timer-row-wrapper');
        if (timerRow) {
            timerRow.style.display = 'none';
        }
        
        // Возвращаем радио обратно в исходное место
        var radioElement = document.getElementById('radio');
        if (radioElement && window.amrapRadioOriginalParent) {
            // Возвращаем радио в controls-card-container
            var controlsCardContainer = document.querySelector('.controls-card-container');
            if (controlsCardContainer) {
                controlsCardContainer.insertBefore(radioElement, controlsCardContainer.firstChild);
            } else if (window.amrapRadioOriginalParent) {
                window.amrapRadioOriginalParent.appendChild(radioElement);
            }
        }
        
        // Удаляем прогресс-бар при скрытии AMRAP
        var progressContainer = document.getElementById('progress-bar-container');
        if (progressContainer) {
            progressContainer.remove();
        }
        
        // Восстанавливаем стандартные элементы при скрытии AMRAP
        var ttTimerWrap = document.getElementById('tt_timer_wrap');
        var controls = document.getElementById('controls');
        var playlistField = document.getElementById('playlistField');
        
        // Восстанавливаем только если мы не в режиме EMOM
        if (window.timerMode !== 3) {
            if (ttTimerWrap && ttTimerWrap.style.display === "none") {
                ttTimerWrap.style.display = "block";
            }
            // controls и playlistField будут восстановлены в setMode в зависимости от режима
        }
        
        // Скрываем описание тренировки
        if (elements.workoutDescription) {
            elements.workoutDescription.style.display = 'none';
        }
        closePresetsModal();
        closeWorkoutsSelectModal();
        resetState({ keepResults: false });
    };
    
    function openPresetsModal() {
        if (!elements.presetsModal) return;
        elements.presetsModal.classList.add('is-open');
        bodyEl.classList.add('amrap-modal-open');
    }
    
    function closePresetsModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!elements.presetsModal) return;
        elements.presetsModal.classList.remove('is-open');
        bodyEl.classList.remove('amrap-modal-open');
        ensureTimerHashIfTimerActive();
    }
    
    function createWorkoutCards() {
        if (!elements.workoutsCards) return;
        elements.workoutsCards.innerHTML = '';
        
        workouts.forEach(function(workout) {
            var card = document.createElement('div');
            card.className = 'amrap-workout-card';
            card.dataset.workoutId = workout.id;
            
            card.innerHTML = 
                '<div class="amrap-workout-card-title">' + workout.title + '</div>' +
                '<div class="amrap-workout-card-time">' + workout.time + '</div>' +
                '<div class="amrap-workout-card-exercises">' + workout.exercises + '</div>';
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                selectWorkout(workout);
            });
            
            elements.workoutsCards.appendChild(card);
        });
    }
    
    function selectWorkout(workout) {
        // Убираем активный класс со всех карточек
        var cards = elements.workoutsCards.querySelectorAll('.amrap-workout-card');
        cards.forEach(function(card) {
            card.classList.remove('active');
        });
        
        // Добавляем активный класс к выбранной карточке
        var selectedCard = elements.workoutsCards.querySelector('[data-workout-id="' + workout.id + '"]');
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
        
        // Показываем описание под циферблатом
        if (elements.workoutDescription) {
            elements.workoutDescription.innerHTML = 
                '<button class="amrap-workout-description-close" title="Закрыть">×</button>' +
                '<strong>' + workout.title + ' (' + workout.time + ')</strong><br>' + workout.description;
            elements.workoutDescription.style.display = 'block';
            
            // Добавляем обработчик клика на кнопку закрытия
            var closeBtn = elements.workoutDescription.querySelector('.amrap-workout-description-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    elements.workoutDescription.style.display = 'none';
                    
                    // Убираем активный класс с выбранной карточки
                    var activeCard = elements.workoutsCards.querySelector('.amrap-workout-card.active');
                    if (activeCard) {
                        activeCard.classList.remove('active');
                    }
                    
                    if (typeof playClickEffectSound === 'function') {
                        playClickEffectSound();
                    }
                });
            }
        }
        
        // Устанавливаем время таймера на основе времени тренировки
        var timeMatch = workout.time.match(/(\d+)\s*минут/);
        if (timeMatch) {
            var minutes = parseInt(timeMatch[1], 10);
            var totalSeconds = minutes * 60;
            
            if (elements.minuteSelect) {
                elements.minuteSelect.value = minutes;
            }
            if (elements.secondSelect) {
                elements.secondSelect.value = 0;
            }
            
            state.remainingSeconds = totalSeconds;
            state.currentPresetSeconds = null;
            updateCountdown();
            highlightPresetButtons();
        }
        
        // Закрываем модальное окно
        closeWorkoutsSelectModal();
    }
    
    function openWorkoutsSelectModal() {
        if (!elements.workoutsSelectModal) return;
        createWorkoutCards();
        elements.workoutsSelectModal.classList.add('is-open');
        bodyEl.classList.add('amrap-modal-open');
    }
    
    function closeWorkoutsSelectModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!elements.workoutsSelectModal) return;
        elements.workoutsSelectModal.classList.remove('is-open');
        bodyEl.classList.remove('amrap-modal-open');
        // Убеждаемся, что остаемся на странице таймера
        if (window.location.hash !== '#timer') {
            window.location.hash = '#timer';
        }
    }
})();

