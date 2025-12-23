const motivationalQuotes = [
    {
        quote: "Сила не в том, чтобы быть сильнее других. Сила в том, чтобы быть сильнее самого себя.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Я не боюсь того, кто занимается карате 10 000 часов. Я боюсь того, кто тренируется один раз, но делает это со всей душой.",
        author: "Брюс Ли",
        image: "images/Bruce_Lee.jpg"
    },
    {
        quote: "Тяжелая работа побеждает талант, когда талант не работает тяжело.",
        author: "Костя Цзю",
        image: "images/Цзю.jpg"
    },
    {
        quote: "Никто не может запугать меня до такой степени, чтобы я отказался от своих целей.",
        author: "Арнольд Шварценеггер",
        image: "images/Arnold_Schwarzenegger.jpg"
    },
    {
        quote: "Разум, тело, дух - они работают вместе как единое целое.",
        author: "Жан-Клод Ван Дамм",
        image: "images/Jean-Claude_Van_Damme.jpg"
    },
    {
        quote: "То, что нас не убивает, делает нас сильнее.",
        author: "Сильвестр Сталлоне",
        image: "images/Sylvester_Stallone.jpg"
    },
    {
        quote: "Не бойтесь изменений. Бойтесь оставаться теми же.",
        author: "Арнольд Шварценеггер",
        image: "images/Arnold_Schwarzenegger.jpg"
    },
    {
        quote: "Успех — это идти от неудачи к неудаче без потери энтузиазма.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Если вы хотите чего-то добиться, вы должны быть готовы работать усерднее, чем другие.",
        author: "Костя Цзю",
        image: "images/Цзю.jpg"
    },
    {
        quote: "Вы можете потерпеть поражение, если перестанете пытаться. Победа всегда возможна, пока вы продолжаете двигаться вперед.",
        author: "Арнольд Шварценеггер",
        image: "images/Arnold_Schwarzenegger.jpg"
    },
    {
        quote: "На тренировках я умираю много раз. Это помогает мне жить в ринге.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Победа — это не все, но желание победить — значит все.",
        author: "Жан-Клод Ван Дамм",
        image: "images/Jean-Claude_Van_Damme.jpg"
    },
    {
        quote: "Я не фокусируюсь на том, что я теряю. Я фокусируюсь на том, что могу получить.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Единственный способ достичь невозможного — это попробовать.",
        author: "Арнольд Шварценеггер",
        image: "images/Arnold_Schwarzenegger.jpg"
    },
    {
        quote: "Чем больше ты потеешь на тренировке, тем меньше крови прольешь в бою.",
        author: "Брюс Ли",
        image: "images/Bruce_Lee.jpg"
    },
    {
        quote: "Самое большое препятствие на пути к успеху — это страх перед неудачей.",
        author: "Сильвестр Сталлоне",
        image: "images/Sylvester_Stallone.jpg"
    },
    {
        quote: "Если вы хотите чего-то добиться, вы должны быть готовы отказаться от всего остального.",
        author: "Костя Цзю",
        image: "images/Цзю.jpg"
    },
    {
        quote: "Неважно, сколько раз ты упадешь. Важно, сколько раз ты поднимешься.",
        author: "Жан-Клод Ван Дамм",
        image: "images/Jean-Claude_Van_Damme.jpg"
    },
    {
        quote: "Я не лучше всех. Но я лучший для себя.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Дисциплина — это свобода. Чем более дисциплинированным вы становитесь, тем больше свободы получаете.",
        author: "Арнольд Шварценеггер",
        image: "images/Arnold_Schwarzenegger.jpg"
    },
    {
        quote: "Если вы хотите стать чемпионом, вы должны научиться мыслить как чемпион.",
        author: "Костя Цзю",
        image: "images/Цзю.jpg"
    },
    {
        quote: "Бой заканчивается только тогда, когда звучит финальный гонг.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Тренировки — это основа успеха. Без них ничего не добиться.",
        author: "Джеки Чан",
        image: "images/Jackie_Chan.jpg"
    },
    {
        quote: "Я не боюсь падений. Я боюсь, что не смогу подняться.",
        author: "Джеки Чан",
        image: "images/Jackie_Chan.jpg"
    },
    {
        quote: "Успех — это не конечная цель, а путь.",
        author: "Джеки Чан",
        image: "images/Jackie_Chan.jpg"
    },
    {
        quote: "Трудности — это то, что делает нас сильнее.",
        author: "Джеки Чан",
        image: "images/Jackie_Chan.jpg"
    },
    {
        quote: "Если вы хотите быть успешным, вы должны быть готовы к неудачам.",
        author: "Джеки Чан",
        image: "images/Jackie_Chan.jpg"
    },
    {
        quote: "Успех — это результат упорного труда и настойчивости.",
        author: "Сильвестр Сталлоне",
        image: "images/Sylvester_Stallone.jpg"
    },
    {
        quote: "Каждый день — это новая возможность стать лучше.",
        author: "Сильвестр Сталлоне",
        image: "images/Sylvester_Stallone.jpg"
    },
    {
        quote: "Не позволяйте никому говорить вам, что вы не можете сделать что-то.",
        author: "Сильвестр Сталлоне",
        image: "images/Sylvester_Stallone.jpg"
    }
    ,
    {
        quote: "У каждого есть план, пока он не получает удар в челюсть.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Дисциплина — это делать то, что ты ненавидишь, но делать так, будто любишь.",
        author: "Майк Тайсон",
        image: "images/Mike_Tyson.jpg"
    },
    {
        quote: "Будь водой, друг мой: налей воду в чашку — она становится чашкой.",
        author: "Брюс Ли",
        image: "images/Bruce_Lee.jpg"
    },
    {
        quote: "Не молись о лёгкой жизни, молись о силе выдержать тяжёлую.",
        author: "Брюс Ли",
        image: "images/Bruce_Lee.jpg"
    },
    {
        quote: "Каждый чемпион когда-то был претендентом, который отказался сдаваться.",
        author: "Сильвестр Сталлоне",
        image: "images/Sylvester_Stallone.jpg"
    },
    {
        quote: "Важно не то, насколько сильно ты бьёшь, а то, насколько сильно тебя могут бить и ты продолжаешь двигаться вперёд.",
        author: "Сильвестр Сталлоне",
        image: "images/Sylvester_Stallone.jpg"
    },
    {
        quote: "Я не боюсь проиграть. Я боюсь не использовать свой шанс.",
        author: "Костя Цзю",
        image: "images/Цзю.jpg"
    },
    {
        quote: "Сила не приходит от побед. Именно борьба делает тебя сильнее.",
        author: "Арнольд Шварценеггер",
        image: "images/Arnold_Schwarzenegger.jpg"
    },
    {
        quote: "Жизнь может сбить нас с ног, но мы сами решаем, подниматься ли снова.",
        author: "Джеки Чан",
        image: "images/Jackie_Chan.jpg"
    }
];

/*var currentValue = 1;
function handleClick(timerMode) {
    currentValue = timerMode.value;
}*/
function Timer(target, action, interval, repeat) {
    var timerIsRunning = false;
    var t, cycle, fire;
    fire = function() {
        target[action].call(target);
        if (repeat === true) {
            cycle();
        }
    };
    cycle = function() {
        if (timerIsRunning) {
            t = setTimeout(function() {
                fire();
            }, interval);
        }
    };
    this.start = function() {
        timerIsRunning = true;
        fire();
    };
    this.stop = function() {
        clearTimeout(t);
        timerIsRunning = false;
    };
}

function STTabataTimer(delegate) {
	var convertDouble;
	
	convertDouble = function(num) {
        return (num < 10 ? "0" + num : num);
    };
	
	
    this.sessionPhases = {
        start: 0,
        prepare: 1,
        work: 2,
        rest: 3,
        cycleRest: 5, // Отдых между циклами (табатами)
        end: 4
    };
    this.isRunning = false;
    this.timer = new Timer(this, "fireTimer", 1000, true);
    this.preparationTimeSetting = 10;
    this.workTimeSetting = 20;
    this.restTimeSetting = 10;
    this.cyclesSetting = 8;
    this.tabatasSetting = 1; // Для стандартных режимов это количество циклов, для EMOM - минуты, для AMRAP - минуты
    this.cycleRestTimeSetting = 60; // Отдых между циклами (по умолчанию 60 секунд = 1 минута)
	/*this.preparationTimeSetting = 1;
	this.workTimeSetting = 3;
    this.restTimeSetting = 2;
    this.cyclesSetting = 3;
    this.tabatasSetting = 1;*/
	
    this.sessionPhase = this.sessionPhases.start;
    this.currentTabata = 1;
    this.currentTime = 0;
    this.totalTime = 0;
    this.currentCycle = 1;
    // Переменные для режимов EMOM и AMRAP
    this.emomMinute = 0; // Текущая минута в режиме EMOM
    this.amrapTotalTime = 0; // Общее время для AMRAP (в секундах)
    this.amrapElapsedTime = 0; // Прошедшее время в AMRAP (в секундах)
    this.amrapPhaseTime = 0; // Время текущей фазы (работа или отдых) в AMRAP
    this.start = function() {
        if (this.isRunning) {
            return;
        }
        
        // Убедимся, что звук готов к воспроизведению перед стартом таймера
        if (window.timerMode === 1 && window.musicFile) {
            var audioElement = document.getElementById('sound');
            if (audioElement) {
                // Если звук не воспроизводится, запустим его одновременно с таймером
                if (audioElement.paused) {
                    console.log('STTabataTimer: запуск музыки одновременно с таймером');
                    audioElement.play().catch(function(error) {
                        console.error('STTabataTimer: ошибка запуска музыки:', error);
                    });
                }
            }
        }
        
        if (this.sessionPhase === this.sessionPhases.start) {
            // Для режимов EMOM и AMRAP используем специальную инициализацию
            if (window.timerMode === 3) {
                // EMOM: начинаем с первой минуты работы
                this.emomMinute = 1; // Первая минута начинается сразу
                this.sessionPhase = this.sessionPhases.work;
                this.currentTime = this.workTimeSetting;
            } else if (window.timerMode === 4) {
                // AMRAP: инициализируем общее время
                this.amrapTotalTime = this.tabatasSetting * 60;
                this.amrapElapsedTime = 0;
                this.amrapPhaseTime = 0;
                this.sessionPhase = this.sessionPhases.work;
                this.amrapPhaseTime = this.workTimeSetting;
                this.currentTime = this.workTimeSetting; // Показываем время работы, а не общее время
            } else {
                // Стандартные режимы
            this.sessionPhase = this.calculateNextPhase();
            }
        }
        if (this.sessionPhase !== this.sessionPhases.end) {
            this.isRunning = true;
            this.timer.start();
        } else {
            this.endSession();
        }
    };
    this.stop = function() {
        if (this.isRunning) {
            this.timer.stop();
            this.isRunning = false;
        }
    };
    this.reset = function() {
        this.stop();
        this.currentTime = 0;
        this.totalTime = 0;
        this.currentCycle = 1;
        this.currentTabata = 1;
        this.sessionPhase = this.sessionPhases.start;
        // Сброс переменных для EMOM и AMRAP
        this.emomMinute = 0;
        this.amrapTotalTime = 0;
        this.amrapElapsedTime = 0;
        this.amrapPhaseTime = 0;
    };
    this.calculateNextPhase = function() {
        switch (this.sessionPhase) {
            case this.sessionPhases.start:
				console.log('Фаза: подготовка');
                // Сохраняем старое значение sessionPhase для проверки
                var wasStartPhase = (this.sessionPhase === this.sessionPhases.start);
                
                if (this.preparationTimeSetting > 0) {
                    this.sessionPhase = this.sessionPhases.prepare;
                } else if (this.workTimeSetting > 0) {
                    this.sessionPhase = this.sessionPhases.work;
                } else if (this.restTimeSetting > 0) {
                    this.sessionPhase = this.sessionPhases.rest;
                } else {
                    this.sessionPhase = this.sessionPhases.end;
                }
				document.getElementById('currentcycle_i').innerHTML = 1 < 10 ? '01' : '1';
				document.getElementById('currenttabata_i').innerHTML = 1 < 10 ? '01' : '1';
                document.getElementById('allcycles').innerHTML = this.cyclesSetting;
                document.getElementById('alltabatas').innerHTML = this.tabatasSetting;
                
                // Обновляем видимость блока циклов в новой структуре Tabata
                if (window.timerMode == 1 || window.timerMode == 2) {
                    var cyclesInfo = document.getElementById('tabata-cycles-info');
                    if (cyclesInfo) {
                        if (this.tabatasSetting > 1) {
                            cyclesInfo.style.display = 'flex';
                        } else {
                            cyclesInfo.style.display = 'none';
                        }
                    }
                    
                    // Обновляем отображение счетчиков в зависимости от режима
                    if (window.timerMode == 1) {
                        // Режим Tabata - "Сделано/Всего раундов"
                        var roundsDoneCount = document.getElementById('tabata-rounds-done-count');
                        var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
                        var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
                        var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
                        var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
                        var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
                        
                        // Показываем структуру для Tabata, скрываем для HIIT
                        if (tabataRoundsDone) tabataRoundsDone.style.display = 'flex';
                        if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'flex';
                        if (hiitRoundsDone) hiitRoundsDone.style.display = 'none';
                        if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'none';
                        
                        if (roundsDoneCount) {
                            roundsDoneCount.textContent = '0';
                        }
                        
                        // Обновляем текст и номер раунда в зависимости от состояния таймера
                        var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
                        if (roundsTotalCount) {
                            // Если мы переходим из start в prepare/work (таймер запускается),
                            // И currentCycle = 1, показываем "РАУНД 1"
                            // Иначе, если таймер еще не запущен, показываем "ВСЕГО РАУНДОВ"
                            var isTransitioningFromStart = wasStartPhase && 
                                                          (this.sessionPhase === this.sessionPhases.prepare || 
                                                           this.sessionPhase === this.sessionPhases.work) &&
                                                          this.currentCycle === 1;
                            
                            if (!isTransitioningFromStart && !this.isRunning && wasStartPhase) {
                                // Таймер еще не запущен - показываем "ВСЕГО РАУНДОВ"
                                if (roundsTotalLabel) {
                                    roundsTotalLabel.textContent = 'ВСЕГО РАУНДОВ';
                                }
                                roundsTotalCount.textContent = this.cyclesSetting.toString();
                            } else {
                                // Таймер запускается или запущен - показываем "РАУНД" и текущий номер раунда
                                if (roundsTotalLabel) {
                                    roundsTotalLabel.textContent = 'РАУНД';
                                }
                                // Убеждаемся, что currentCycle не меньше 1
                                var currentRound = this.currentCycle >= 1 ? this.currentCycle : 1;
                                roundsTotalCount.textContent = currentRound.toString();
                            }
                        }
                    } else if (window.timerMode == 2) {
                        // Режим HIIT - "Раундов/Циклов" в формате "X из Y"
                        var roundsCurrentHiit = document.getElementById('tabata-rounds-current-hiit');
                        var roundsTotalHiit = document.getElementById('tabata-rounds-total-hiit');
                        var cyclesCurrentHiit = document.getElementById('tabata-cycles-current-hiit');
                        var cyclesTotalHiit = document.getElementById('tabata-cycles-total-hiit');
                        var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
                        var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
                        var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
                        var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
                        var oldCyclesInfo = document.getElementById('tabata-cycles-info');
                        
                        // Показываем структуру для HIIT, скрываем для Tabata
                        if (tabataRoundsDone) tabataRoundsDone.style.display = 'none';
                        if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'none';
                        if (hiitRoundsDone) hiitRoundsDone.style.display = 'flex';
                        if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'flex';
                        // Скрываем старый формат "ЦИКЛЫ 01 / 2"
                        if (oldCyclesInfo) oldCyclesInfo.style.display = 'none';
                        
                        // На стартовом экране показываем только общее количество
                        var roundsTotalHiitStart = document.getElementById('tabata-rounds-total-hiit-start');
                        var cyclesTotalHiitStart = document.getElementById('tabata-cycles-total-hiit-start');
                        var roundsFromText = document.getElementById('tabata-rounds-from-text');
                        var cyclesFromText = document.getElementById('tabata-cycles-from-text');
                        
                        if (roundsTotalHiitStart) {
                            roundsTotalHiitStart.textContent = this.cyclesSetting.toString();
                            roundsTotalHiitStart.style.display = 'inline';
                        }
                        if (cyclesTotalHiitStart) {
                            cyclesTotalHiitStart.textContent = this.tabatasSetting.toString();
                            cyclesTotalHiitStart.style.display = 'inline';
                        }
                        // Скрываем формат "X из Y" на стартовом экране
                        if (roundsCurrentHiit) roundsCurrentHiit.style.display = 'none';
                        if (roundsTotalHiit) roundsTotalHiit.style.display = 'none';
                        if (roundsFromText) roundsFromText.style.display = 'none';
                        if (cyclesCurrentHiit) cyclesCurrentHiit.style.display = 'none';
                        if (cyclesTotalHiit) cyclesTotalHiit.style.display = 'none';
                        if (cyclesFromText) cyclesFromText.style.display = 'none';
                    }
                    
                    // Старые элементы для совместимости
                    var roundsTotalDisplay = document.getElementById('tabata-rounds-total-display');
                    var ttNumberUi = document.getElementById('tt_number_ui');
                    if (roundsTotalDisplay) {
                        roundsTotalDisplay.style.display = 'block';
                        roundsTotalDisplay.textContent = this.cyclesSetting;
                    }
                    if (ttNumberUi) {
                        ttNumberUi.style.display = 'none';
                    }
                }
                
                // Показываем счетчики в формате 01/8 сразу при старте, даже в режиме HIIT
                document.getElementById('tt_cycles_label').style.display = "block";
                document.getElementById('tt_tabatas_label').style.display = "block";
                document.getElementById('tt_number_ui').style.display = "block";
                document.getElementById('tt_number_ui2').style.display = "block";
                document.getElementById('currentcycle').style.display = "none";
                document.getElementById('currenttabata').style.display = "none";
                break;
            case this.sessionPhases.prepare:
                console.log('Фаза подготовки завершена, следующая фаза: работа');
                if (this.workTimeSetting > 0) {
                    this.sessionPhase = this.sessionPhases.work;
                } else if (this.restTimeSetting > 0) {
                    this.sessionPhase = this.sessionPhases.rest;
                } else if (this.currentTabata < this.tabatasSetting) {
                    this.currentTabata++;
                    delegate['tabataComplete'].call(this);
                    this.currentCycle = 1;
                } else {
                    this.sessionPhase = this.sessionPhases.end;
                }
                // Обновляем и показываем счетчики для режима HIIT
				document.getElementById('tt_cycles_label').style.display = "block";
				document.getElementById('tt_tabatas_label').style.display = "block";
				document.getElementById('tt_number_ui').style.display = "block";
				document.getElementById('tt_number_ui2').style.display = "block";
                document.getElementById('currentcycle').style.display = "none";
                document.getElementById('currenttabata').style.display = "none";
				document.getElementById('currentcycle_i').innerHTML = this.currentCycle;
				document.getElementById('currenttabata_i').innerHTML = this.currentTabata;
                break;
            case this.sessionPhases.work:
				console.log('Фаза: работаем, currentCycle: ' + this.currentCycle);
				console.log('currentTabata: ' + this.currentTabata);
				console.log('tabatasSetting: ' + this.tabatasSetting);
                
                // Проверяем, является ли это последним раундом цикла
                var isLastCycleInTabata = (this.currentCycle == this.cyclesSetting);
                
                // Если это последний раунд цикла и есть отдых между циклами, пропускаем "Отдых" и переходим к "Отдых между циклами"
                if (isLastCycleInTabata && this.currentTabata < this.tabatasSetting && this.cycleRestTimeSetting > 0) {
                    // Переходим сразу к отдыху между циклами, пропуская стадию "Отдых"
                    this.sessionPhase = this.sessionPhases.cycleRest;
                    console.log('Последний раунд цикла, переход к отдыху между циклами (пропускаем Отдых)');
                } else if (this.restTimeSetting > 0 && !isLastCycleInTabata) {
                    // Не последний раунд цикла, переходим к "Отдых"
                    this.sessionPhase = this.sessionPhases.rest;
					console.log('Следующая фаза: отдыхаем ' + this.sessionPhase);
					if (this.currentCycle <= this.cyclesSetting) {
						this.currentCycle++; 
					}
                } else if (isLastCycleInTabata && this.currentTabata == this.tabatasSetting) {
                    // Последний раунд последнего цикла - конец тренировки
						this.sessionPhase = this.sessionPhases.end;
						console.log('Выход на последнем раунде');
                } else if (isLastCycleInTabata && this.currentTabata < this.tabatasSetting && this.cycleRestTimeSetting == 0) {
                    // Последний раунд цикла, но нет отдыха между циклами - переходим к следующему циклу
                    this.currentTabata++;
                    delegate['tabataComplete'].call(this);
                    this.currentCycle = 1;
                    // После отдыха между циклами начинаем сразу с "Работаем", пропуская "Готовимся"
                    if (this.workTimeSetting > 0) {
                        this.sessionPhase = this.sessionPhases.work;
                    } else if (this.restTimeSetting > 0) {
                        this.sessionPhase = this.sessionPhases.rest;
                    } else {
                        this.sessionPhase = this.sessionPhases.end;
                    }
                } else {
                    this.sessionPhase = this.sessionPhases.end;
                }
				console.log('Следующая фаза: ' + this.sessionPhase);
                break;
            case this.sessionPhases.rest:
				console.log('Фаза: работаем, currentCycle: ' + this.currentCycle);
                if (this.currentCycle <= this.cyclesSetting) {
                    if (this.workTimeSetting > 0) {
                        this.sessionPhase = this.sessionPhases.work;
						console.log('Следующая фаза: отдыхаем ' + this.sessionPhase);
                    }
                } else if (this.currentTabata < this.tabatasSetting) {
                    // Завершился цикл, переходим к следующему
                    // Если есть отдых между циклами, сначала переходим к нему
                    if (this.cycleRestTimeSetting > 0) {
                        this.sessionPhase = this.sessionPhases.cycleRest;
                        console.log('Переход к отдыху между циклами');
                    } else {
                        // Нет отдыха между циклами, сразу переходим к следующему циклу
                    this.currentTabata++;
                    delegate['tabataComplete'].call(this);
                    this.currentCycle = 1;
                    if (this.preparationTimeSetting > 0) {
                        this.sessionPhase = this.sessionPhases.prepare;
                    } else if (this.workTimeSetting > 0) {
                        this.sessionPhase = this.sessionPhases.work;
                    } else if (this.restTimeSetting > 0) {
                        this.sessionPhase = this.sessionPhases.rest;
                    } else {
                        this.sessionPhase = this.sessionPhases.end;
                        }
                    }
                } else {
                    this.sessionPhase = this.sessionPhases.end;
                }
				console.log('Следующая фаза: ' + this.sessionPhase);
				document.getElementById('currentcycle_i').innerHTML = this.currentCycle;
				document.getElementById('currenttabata_i').innerHTML = this.currentTabata;
                break;
            case this.sessionPhases.cycleRest:
                // Завершился отдых между циклами, переходим к следующему циклу
                // Начинаем сразу с "Работаем", пропуская "Готовимся" (так как уже был отдых между циклами)
                console.log('Отдых между циклами завершен, переход к следующему циклу (начинаем с Работаем, пропускаем Готовимся)');
                this.currentTabata++;
                delegate['tabataComplete'].call(this);
                this.currentCycle = 1;
                // После отдыха между циклами начинаем сразу с "Работаем", пропуская "Готовимся"
                if (this.workTimeSetting > 0) {
                    this.sessionPhase = this.sessionPhases.work;
                } else if (this.restTimeSetting > 0) {
                    this.sessionPhase = this.sessionPhases.rest;
                } else {
                    this.sessionPhase = this.sessionPhases.end;
                }
				console.log('Следующая фаза: ' + this.sessionPhase);
				document.getElementById('currentcycle_i').innerHTML = this.currentCycle;
				document.getElementById('currenttabata_i').innerHTML = this.currentTabata;
                break;
        }
        if (this.sessionPhase === this.sessionPhases.prepare) {
            this.currentTime = this.preparationTimeSetting;
        } else if (this.sessionPhase === this.sessionPhases.work) {
            this.currentTime = this.workTimeSetting;
        } else if (this.sessionPhase === this.sessionPhases.rest) {
            this.currentTime = this.restTimeSetting;
        } else if (this.sessionPhase === this.sessionPhases.cycleRest) {
            this.currentTime = this.cycleRestTimeSetting;
        }
        return this.sessionPhase;
    };
    this.endSession = function() {
        this.reset();
        delegate['sessionEnded'].call(this);
    };
    this.fireTimer = function() {
        // Логирование убрано для уменьшения шума в консоли
        // Логируются только важные события (смена фазы, воспроизведение звуков, ошибки)
        
        // Проверяем начало таймера для синхронизации звука
        if (this.totalTime === 0 && window.timerMode === 1) {
            // Если это первое срабатывание таймера, и мы находимся в первой фазе (подготовка),
            // убедимся, что музыка воспроизводится синхронно с таймером
            var audioElement = document.getElementById('sound');
            if (audioElement && audioElement.paused && window.musicFile) {
                console.log('Синхронизация запуска музыки с началом таймера');
                try {
                    audioElement.play();
                } catch (e) {
                    console.error('Ошибка при синхронизации музыки:', e);
                }
            }
        }
        
        // Логика для режима EMOM (3)
        if (window.timerMode === 3) {
            // Увеличиваем общее время ПЕРЕД проверками
            this.totalTime++;
            
            // Проверяем начало новой минуты (когда totalTime кратно 60, включая первую минуту)
            var secondsInMinute = this.totalTime % 60;
            
            // Уменьшаем текущее время работы/отдыха
            if (this.currentTime > 0) {
                this.currentTime--;
            }
            
            // Проверяем начало новой минуты (когда totalTime кратно 60, начиная со второй минуты)
            // Первая минута уже началась при старте (emomMinute = 1)
            if (secondsInMinute === 0 && this.totalTime > 0 && this.totalTime % 60 === 0) {
                // Начало новой минуты - переходим к работе
                this.emomMinute++;
                if (this.emomMinute > this.tabatasSetting) {
                    // Достигли лимита минут - завершаем тренировку
                    this.endSession();
                    return;
                }
                this.sessionPhase = this.sessionPhases.work;
                this.currentTime = this.workTimeSetting;
            } else if (this.currentTime === 0 && this.sessionPhase === this.sessionPhases.work) {
                // Работа завершена - переходим к отдыху до конца минуты
                var remainingSeconds = 60 - secondsInMinute;
                if (remainingSeconds > 0) {
                    this.sessionPhase = this.sessionPhases.rest;
                    this.currentTime = remainingSeconds;
                } else {
                    // Минута закончилась точно в момент завершения работы - переходим к следующей минуте
                    this.emomMinute++;
                    if (this.emomMinute > this.tabatasSetting) {
                        this.endSession();
                        return;
                    }
                    this.sessionPhase = this.sessionPhases.work;
                    this.currentTime = this.workTimeSetting;
                }
            } else if (this.currentTime === 0 && this.sessionPhase === this.sessionPhases.rest) {
                // Отдых завершен, но минута еще не закончилась - ждем начала следующей минуты
                // Ничего не делаем, просто ждем (currentTime уже 0)
            }
            
            // Не увеличиваем totalTime здесь, так как уже увеличили в начале
            delegate['timerHasFired'].call(this);
            return; // Выходим, чтобы не выполнять стандартную логику
        }
        // Логика для режима AMRAP (4)
        else if (window.timerMode === 4) {
            // Увеличиваем общее время ПЕРЕД проверками
            this.totalTime++;
            
            // Уменьшаем общее время
            this.amrapElapsedTime++;
            var remainingTime = this.amrapTotalTime - this.amrapElapsedTime;
            
            if (remainingTime <= 0) {
                // Время истекло - завершаем тренировку
                this.endSession();
                return;
            }
            
            // Уменьшаем время текущей фазы
            if (this.amrapPhaseTime > 0) {
                this.amrapPhaseTime--;
            }
            
            // Для отображения показываем время текущей фазы (работа или отдых)
            // Это более информативно для пользователя
            this.currentTime = this.amrapPhaseTime;
            
            // Проверяем завершение фазы
            if (this.amrapPhaseTime <= 0) {
                if (this.sessionPhase === this.sessionPhases.work) {
                    // Работа завершена - переходим к отдыху
                    this.sessionPhase = this.sessionPhases.rest;
                    this.amrapPhaseTime = this.restTimeSetting;
                    this.currentTime = this.amrapPhaseTime; // Обновляем отображаемое время
                    this.currentCycle++; // Увеличиваем счетчик раундов
                } else if (this.sessionPhase === this.sessionPhases.rest) {
                    // Отдых завершен - переходим к следующему раунду работы
                    this.sessionPhase = this.sessionPhases.work;
                    this.amrapPhaseTime = this.workTimeSetting;
                    this.currentTime = this.amrapPhaseTime; // Обновляем отображаемое время
                }
            }
            
            // Не увеличиваем totalTime здесь, так как уже увеличили в начале
            delegate['timerHasFired'].call(this);
            return; // Выходим, чтобы не выполнять стандартную логику
        }
        // Стандартная логика для режимов Табата (1) и HIIT (2)
        else {
        if (this.currentTime === 0) {
            if (this.calculateNextPhase() === this.sessionPhases.end) {
                this.endSession();
            }
        }
        }
        
        delegate['timerHasFired'].call(this);
        this.totalTime++;
        
        // Уменьшаем текущее время только для стандартных режимов (Табата и HIIT)
        // Для EMOM и AMRAP время управляется в их собственной логике выше
        if (window.timerMode !== 4 && window.timerMode !== 3) {
        this.currentTime--;
        }
    };
}

function STTabataTimerViewController() {
    var field = 'prepare';
    var playSound;
    var stopSound;
    var changeTimerData;
    var setTimerData;
    var changeLayoutState;
    var delegate = {};
    var totalWorkoutTime;
    var convertDouble;
    var convertTimeFormat;
    var convertTabataTimeFormat;
    var radioElement;
    var isPaused = false;
    var stopped = true;
    var tabatatimer;
    var t;
    var s;
    var sounds;
    var intervals = 300;
    var sound;
    
    // Флаги для предотвращения повторного воспроизведения звуков в режиме HIIT
    var countdownSoundPlayed = false; // Флаг для звука отсчёта 3-2-1
    var finishSoundPlayed = false; // Флаг для звука окончания тренировки
    var countdown54SoundPlayed = false; // Флаг для звука отсчёта 5-4-3-2-1 перед окончанием работы
    var lastPhase = -1; // Отслеживание предыдущей фазы для сброса флагов
    
    // Система условного логирования (отключена в продакшене для производительности)
    // Проверяем debug режим (устанавливается в index.php)
    if (typeof window.DEBUG_MODE === 'undefined') {
        window.DEBUG_MODE = (window.location.search.indexOf('debug=1') !== -1 || 
                              window.location.hostname === 'localhost' || 
                              window.location.hostname === '127.0.0.1');
    }
    
    // Система логирования для отладки
    window.timerLogs = [];
    window.logTimer = function(message, data) {
        // Логирование только в debug режиме
        if (!window.DEBUG_MODE) return;
        
        var logEntry = {
            timestamp: new Date().toISOString(),
            message: message,
            data: data || null,
            phase: tabatatimer ? tabatatimer.sessionPhase : 'unknown',
            currentTime: tabatatimer ? tabatatimer.currentTime : 'unknown',
            timerMode: window.timerMode || 'unknown'
        };
        window.timerLogs.push(logEntry);
        console.log('[TIMER LOG]', logEntry);
        // Ограничиваем размер логов до 100 записей
        if (window.timerLogs.length > 100) {
            window.timerLogs.shift();
        }
    };
    var logTimer = window.logTimer; // Локальная ссылка для удобства
    
    // Делаем эти переменные глобальными для доступа из других частей кода
    window.timerMode = 1; // По умолчанию режим Табата
    window.musicFile = null; // Будет установлено при выборе в плейлисте
    
    // Инициализация таймера
    tabatatimer = new STTabataTimer({
        tabataComplete: function() {
            console.log('tabataComplete вызвана из STTabataTimer');
            if (typeof window.newtimer !== 'undefined') {
                window.newtimer.tabataComplete();
            }
        },
        sessionEnded: function() {
            console.log('sessionEnded вызвана из STTabataTimer');
            if (typeof window.newtimer !== 'undefined') {
                window.newtimer.sessionEnded();
            }
            // Событие для внешних модулей (например, динамический фон Unsplash)
            try {
                window.dispatchEvent(new CustomEvent('tabata:ended', { detail: { mode: window.timerMode } }));
            } catch (e) {}
        },
        timerHasFired: function() {
            console.log('timerHasFired вызвана из STTabataTimer');
            if (typeof window.newtimer !== 'undefined') {
                window.newtimer.timerHasFired();
            }
        },
        timerPhaseChange: function() {
            console.log('timerPhaseChange вызвана из STTabataTimer');
            if (typeof window.newtimer !== 'undefined') {
                window.newtimer.timerPhaseChange();
            }
        }
    });
    
    // Экспонируем tabatatimer как свойство для доступа извне (например, из exercise-selector.js)
    this.tabatatimer = tabatatimer;
    
    delegate['tabataComplete'] = function() {};
    delegate['sessionEnded'] = this.sessionEnded;
    delegate['timerHasFired'] = this.timerHasFired;
    delegate['timerPhaseChange'] = this.timerPhaseChange;
    
    convertDouble = function(num) {
        return (num < 10 ? "0" + num : num);
    };
    
    convertTimeFormat = function(num) {
        var hrs = Math.floor(num / 3600);
        var mins = Math.floor((num % 3600) / 60);
        var secs = num % 60;
        
        // Если минут нет (00:XX), показываем только секунды без ведущих нулей
        if (hrs === 0 && mins === 0) {
            return secs.toString();
        }
        
        // Если есть минуты или часы, показываем полный формат с ведущими нулями
        return (hrs > 0 ? hrs + ":" : "") + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    };
    
    convertTabataTimeFormat = function(num) {
        // В режиме Табата показываем просто число без ведущих нулей
        return num.toString();
    };
    
    this.setField = function(f) {
        field = f;
    };
    
	// Функция для показа уведомления о базовых настройках
	this.showSettingsNotification = function(message) {
		const settingsInfo = document.createElement('div');
		settingsInfo.className = 'mode-info-message';
		settingsInfo.textContent = message.toUpperCase();
		settingsInfo.style.position = 'fixed';
		settingsInfo.style.top = '100px'; // Размещаем ниже уведомления о режиме
		settingsInfo.style.left = '50%';
		settingsInfo.style.transform = 'translateX(-50%)';
		settingsInfo.style.backgroundColor = 'rgba(50, 50, 50, 0.9)';
		settingsInfo.style.color = 'white';
		settingsInfo.style.padding = '10px 20px';
		settingsInfo.style.borderRadius = '5px';
		settingsInfo.style.zIndex = '9999';
		settingsInfo.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
		settingsInfo.style.letterSpacing = '2px'; // Межбуквенный интервал
		settingsInfo.style.fontSize = '0.9em'; // Немного меньше, чем уведомление о режиме
		document.body.appendChild(settingsInfo);
		
		// Удаляем сообщение через 3 секунды
		setTimeout(function() {
			if (settingsInfo.parentNode) {
				settingsInfo.parentNode.removeChild(settingsInfo);
			}
		}, 3000);
    };
    
	this.setMode = function(f) {
		console.log('setMode вызвана с параметром:', f);
        // Проверяем, открыто ли модальное окно с информацией о режиме
        var modeInfoModal = document.getElementById('modeInfoModal');
        var isModalOpen = modeInfoModal && modeInfoModal.style.display === 'block';
        
        var previousMode = window.timerMode; // Сохраняем предыдущий режим
        
        // Воспроизводим звук выбора режима только если режим действительно меняется
        if (previousMode !== f && typeof playSound === 'function') {
            var soundsObj = window.sounds || sounds;
            if (soundsObj && soundsObj.select) {
                playSound(soundsObj.select, true); // true = игнорировать проверку радио
            }
        }
        
        window.timerMode = f;
        console.log('timerMode установлен в:', window.timerMode);
        
        // Скрываем описание тренировки HIIT при переключении режимов
        var hiitWorkoutDescription = document.getElementById('hiit-workout-description');
        if (hiitWorkoutDescription) {
            // Показываем только в режиме HIIT (режим 2)
            if (window.timerMode === 2) {
                // Оставляем текущее состояние (будет показано если была выбрана тренировка)
            } else {
                // Скрываем для всех других режимов
                hiitWorkoutDescription.style.display = 'none';
            }
        }
        
        // Скрываем описание тренировки EMOM при переключении режимов
        var emomWorkoutDescription = document.getElementById('emom-workout-description');
        if (emomWorkoutDescription) {
            // Показываем только в режиме EMOM (режим 3)
            if (window.timerMode === 3) {
                // Оставляем текущее состояние (будет показано если была выбрана тренировка)
            } else {
                // Скрываем для всех других режимов
                emomWorkoutDescription.style.display = 'none';
            }
        }
        
        // Логирование для режима HIIT
        if (typeof window.logRadio === 'function') {
            window.logRadio('setMode: переключение режима таймера', {
                previousMode: previousMode,
                newMode: window.timerMode,
                modeName: window.timerMode == 2 ? 'HIIT' : 'Табата'
            });
        }
        
        // Показываем/скрываем ползунок громкости в настройках в зависимости от режима
        if (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4) {
            // Режимы HIIT, EMOM, AMRAP - показываем ползунок если выбрана радиостанция
            var radioStations = document.getElementById('radio-stations');
            if (radioStations && radioStations.value) {
                if (typeof toggleVolumeSlider === 'function') {
                    toggleVolumeSlider(true);
                }
            }
        } else {
            // Режим Табата - скрываем ползунок
            if (typeof toggleVolumeSlider === 'function') {
                toggleVolumeSlider(false);
            }
        }
        
        // При переключении на любой режим кроме EMOM скрываем кастомный EMOM таймер
        if (window.timerMode !== 3 && typeof window.emomTimer !== 'undefined' && window.emomTimer.hide) {
            window.emomTimer.hide();
        }
        
        // При переключении на любой режим кроме AMRAP скрываем кастомный AMRAP таймер
        if (window.timerMode !== 4 && typeof window.hideAmrapTimer === 'function') {
            window.hideAmrapTimer();
        }
        
        // Управление отображением счетчиков в зависимости от режима
        var ttNumberUi = document.getElementById('tt_number_ui');
        var ttNumberUi2 = document.getElementById('tt_number_ui2');
        var currentCycle = document.getElementById('currentcycle');
        var currentTabata = document.getElementById('currenttabata');
        
        if (window.timerMode == 1) {
            // Режим Табата - восстанавливаем стандартные элементы
            var ttTimerWrap = document.getElementById('tt_timer_wrap');
            var controls = document.getElementById('controls');
            var playlistField = document.getElementById('playlistField');
            
            if (ttTimerWrap) ttTimerWrap.style.display = "block";
            if (controls) controls.style.display = "none";
            if (playlistField) playlistField.style.display = "block";
            
            // Скрываем HIIT селекторы
            var hiitWrapper = document.getElementById('hiit-selects-wrapper');
            if (hiitWrapper) hiitWrapper.style.display = 'none';
            
            // Показываем старые настройки обратно
            var oldSettings = ['tt_setpreparetime', 'tt_setworktime', 'tt_setresttime', 'tt_setcycles', 'tt_settabatas', 'tt_setcycleresttime', 'tt_plusminus'];
            oldSettings.forEach(function(id) {
                var el = document.getElementById(id);
                if (el && id !== 'tt_plusminus') el.style.display = ''; // Восстанавливаем, кроме кнопок +/-, которые показываются только для старых режимов
            });
            
            // Показываем структуру для Tabata, скрываем для HIIT
            var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
            var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
            var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
            var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
            if (tabataRoundsDone) tabataRoundsDone.style.display = 'flex';
            if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'flex';
            if (hiitRoundsDone) hiitRoundsDone.style.display = 'none';
            if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'none';
            
            // Скрываем счетчики в формате 01/8
            if (ttNumberUi) ttNumberUi.style.display = "none";
            if (ttNumberUi2) ttNumberUi2.style.display = "none";
            if (currentCycle) currentCycle.style.display = "block";
            if (currentTabata) currentTabata.style.display = "block";
            
            // Удаляем ползунок громкости во время тренировки при переключении на режим Табата
            var volumeContainerTimer = document.getElementById('radio-volume-container-timer');
            if (volumeContainerTimer) {
                volumeContainerTimer.remove();
            }
            if (typeof toggleVolumeSliderTimer === 'function') {
                toggleVolumeSliderTimer(false);
            }
        } else if (window.timerMode == 2) {
            // Режим HIIT - восстанавливаем стандартные элементы
            var ttTimerWrap = document.getElementById('tt_timer_wrap');
            var controls = document.getElementById('controls');
            var playlistField = document.getElementById('playlistField');
            
            if (ttTimerWrap) ttTimerWrap.style.display = "block";
            if (controls) controls.style.display = "block";
            if (playlistField) playlistField.style.display = "none";
            
            // Скрываем старые настройки (input поля и кнопки +/-)
            var oldSettings = ['tt_setpreparetime', 'tt_setworktime', 'tt_setresttime', 'tt_setcycles', 'tt_settabatas', 'tt_setcycleresttime', 'tt_plusminus'];
            oldSettings.forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            
            // Показываем HIIT селекторы
            var hiitWrapper = document.getElementById('hiit-selects-wrapper');
            if (hiitWrapper) {
                hiitWrapper.style.display = 'block';
                // Инициализируем селекторы, если они еще не инициализированы
                if (!window.hiitSelectorsInitialized) {
                    this.initHiitSelectors();
                    window.hiitSelectorsInitialized = true;
                }
            }
            
            // Показываем структуру для HIIT, скрываем для Tabata
            var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
            var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
            var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
            var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
            var oldCyclesInfo = document.getElementById('tabata-cycles-info');
            if (tabataRoundsDone) tabataRoundsDone.style.display = 'none';
            if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'none';
            if (hiitRoundsDone) hiitRoundsDone.style.display = 'flex';
            if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'flex';
            // Скрываем старый формат "ЦИКЛЫ 01 / 2"
            if (oldCyclesInfo) oldCyclesInfo.style.display = 'none';
            
            // Обновляем счетчики для HIIT в формате "X из Y"
            var roundsCurrentHiit = document.getElementById('tabata-rounds-current-hiit');
            var roundsTotalHiit = document.getElementById('tabata-rounds-total-hiit');
            var cyclesCurrentHiit = document.getElementById('tabata-cycles-current-hiit');
            var cyclesTotalHiit = document.getElementById('tabata-cycles-total-hiit');
            var roundsTotalHiitStart = document.getElementById('tabata-rounds-total-hiit-start');
            var cyclesTotalHiitStart = document.getElementById('tabata-cycles-total-hiit-start');
            var roundsFromText = document.getElementById('tabata-rounds-from-text');
            var cyclesFromText = document.getElementById('tabata-cycles-from-text');
            
            if (tabatatimer) {
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    // На стартовом экране показываем только общее количество
                    if (roundsTotalHiitStart) {
                        roundsTotalHiitStart.textContent = tabatatimer.cyclesSetting.toString();
                        roundsTotalHiitStart.style.display = 'inline';
                    }
                    if (cyclesTotalHiitStart) {
                        cyclesTotalHiitStart.textContent = tabatatimer.tabatasSetting.toString();
                        cyclesTotalHiitStart.style.display = 'inline';
                    }
                    // Скрываем формат "X из Y"
                    if (roundsCurrentHiit) roundsCurrentHiit.style.display = 'none';
                    if (roundsTotalHiit) roundsTotalHiit.style.display = 'none';
                    if (roundsFromText) roundsFromText.style.display = 'none';
                    if (cyclesCurrentHiit) cyclesCurrentHiit.style.display = 'none';
                    if (cyclesTotalHiit) cyclesTotalHiit.style.display = 'none';
                    if (cyclesFromText) cyclesFromText.style.display = 'none';
                } else {
                    // Во время тренировки показываем формат "X из Y"
                    if (roundsTotalHiitStart) roundsTotalHiitStart.style.display = 'none';
                    if (cyclesTotalHiitStart) cyclesTotalHiitStart.style.display = 'none';
                    if (roundsCurrentHiit) {
                        roundsCurrentHiit.textContent = tabatatimer.currentCycle.toString();
                        roundsCurrentHiit.style.display = 'inline';
                    }
                    if (roundsTotalHiit) {
                        roundsTotalHiit.textContent = tabatatimer.cyclesSetting.toString();
                        roundsTotalHiit.style.display = 'inline';
                    }
                    if (roundsFromText) roundsFromText.style.display = 'inline';
                    if (cyclesCurrentHiit) {
                        cyclesCurrentHiit.textContent = tabatatimer.currentTabata.toString();
                        cyclesCurrentHiit.style.display = 'inline';
                    }
                    if (cyclesTotalHiit) {
                        cyclesTotalHiit.textContent = tabatatimer.tabatasSetting.toString();
                        cyclesTotalHiit.style.display = 'inline';
                    }
                    if (cyclesFromText) cyclesFromText.style.display = 'inline';
                }
            }
            
            // Скрываем счетчики в формате 01/8 при переключении (они покажутся при запуске таймера)
            if (ttNumberUi) ttNumberUi.style.display = "none";
            if (ttNumberUi2) ttNumberUi2.style.display = "none";
            if (currentCycle) currentCycle.style.display = "block";
            if (currentTabata) currentTabata.style.display = "block";
        } else if (window.timerMode == 3) {
            // Режим EMOM - показываем новый интерфейс EMOM
            if (typeof window.emomTimer !== 'undefined' && window.emomTimer.show) {
                window.emomTimer.show();
            }
            // Скрываем стандартные элементы
            document.getElementById('tt_timer_wrap').style.display = "none";
            document.getElementById('controls').style.display = "none";
            document.getElementById('playlistField').style.display = "none";
            // Устанавливаем значения по умолчанию для EMOM при первом переключении
            if (previousMode != 3) {
                // Базовые настройки для EMOM
                tabatatimer.preparationTimeSetting = 10; // 10 секунд подготовки
                tabatatimer.workTimeSetting = 50; // 50 секунд работы
                tabatatimer.restTimeSetting = 10; // 10 секунд отдыха
                tabatatimer.tabatasSetting = 2; // 2 цикла
                tabatatimer.cyclesSetting = 10; // 10 раундов (минут)
                tabatatimer.cycleRestTimeSetting = 60; // 60 секунд отдыха между циклами
                
                // Показываем уведомление о базовых настройках с задержкой после уведомления о режиме только если модальное окно не открыто
                if (!isModalOpen) {
                    var self = this;
        setTimeout(function() {
                        // Убрано показ уведомления о базовых настройках EMOM
                    }, 500);
                }
            }
            // Обновляем метки
            var cyclesLabel = document.getElementById('tt_cycles_label');
            var setCyclesLabel = document.getElementById('setcycles_label');
            var setTabatasLabel = document.getElementById('settabatas_label');
            if (cyclesLabel) cyclesLabel.textContent = 'Раунды';
            if (setCyclesLabel) setCyclesLabel.textContent = 'Раунды';
            if (setTabatasLabel) setTabatasLabel.textContent = 'Циклы';
            
            // Обновляем интерфейс
            changeLayoutState();
        } else if (window.timerMode == 4) {
            // Режим AMRAP использует отдельный кастомный интерфейс
            // Восстанавливаем стандартные элементы (AMRAP может их скрывать через CSS)
            var ttTimerWrap = document.getElementById('tt_timer_wrap');
            var controls = document.getElementById('controls');
            var playlistField = document.getElementById('playlistField');
            
            // AMRAP скрывает эти элементы через CSS, но мы должны убедиться, что они доступны
            // если пользователь переключится обратно
            
            if (typeof window.showAmrapTimer === 'function') {
                window.showAmrapTimer();
            }
            if (ttNumberUi) ttNumberUi.style.display = "none";
            if (ttNumberUi2) ttNumberUi2.style.display = "none";
            if (currentCycle) currentCycle.style.display = "none";
            if (currentTabata) currentTabata.style.display = "none";
            // Обновляем интерфейс стандартного таймера, чтобы очистить значения
            changeLayoutState();
        }
        
        // Восстанавливаем видимость стандартных элементов при переключении с EMOM/AMRAP на другие режимы
        if (previousMode == 3 || previousMode == 4) {
            // Если переключились с EMOM или AMRAP, убеждаемся что стандартные элементы восстановлены
            if (window.timerMode == 1 || window.timerMode == 2) {
                var ttTimerWrap = document.getElementById('tt_timer_wrap');
                if (ttTimerWrap && ttTimerWrap.style.display === "none") {
                    ttTimerWrap.style.display = "block";
            }
            }
        }
        
        // Восстанавливаем стандартные метки для режимов Табата и HIIT
        if (window.timerMode == 1 || window.timerMode == 2) {
            var cyclesLabel = document.getElementById('tt_cycles_label');
            var setCyclesLabel = document.getElementById('setcycles_label');
            var setTabatasLabel = document.getElementById('settabatas_label');
            if (cyclesLabel) cyclesLabel.textContent = labels.cycles;
            if (setCyclesLabel) setCyclesLabel.textContent = labels.cyclesl;
            if (setTabatasLabel) setTabatasLabel.textContent = labels.tabatasl;
        }
        
        // Убрано показ информационного сообщения о переключении режима
        
        // Сбрасываем таймер при переключении режимов
        tabatatimer.reset();
        
        // Удаляем старый прогресс-бар при переключении режимов
        var progressContainer = document.getElementById('progress-bar-container');
        if (progressContainer) {
            progressContainer.remove();
            console.log('Прогресс-бар удален при переключении режимов');
        }
        
        // Создаем пустой прогресс-бар по умолчанию для единого стиля
        setTimeout(function() {
            createDefaultProgressBar();
        }, 100);
        
        // Если переключаемся с режима HIIT (2) на Табата (1),
        // принудительно останавливаем радио, чтобы избежать наложения звуков
        if (previousMode == 2 && window.timerMode == 1) {
            // Останавливаем основной элемент звука
            var radioElement = document.getElementById('sound');
            if (radioElement) {
                radioElement.pause();
                radioElement.currentTime = 0;
                console.log('Радио (sound) остановлено при переключении на режим Табата');
            }
            
            // Останавливаем радио-плеер
            var radioAudio = document.getElementById('radio-audio');
            if (radioAudio) {
                radioAudio.pause();
                radioAudio.currentTime = 0;
                console.log('Радио (radio-audio) остановлено при переключении на режим Табата');
            }
        }
		
		// Меняем заголовок в зависимости от режима
		var title = document.getElementById('timerTitle');
		console.log('Найден заголовок:', title);
		if (title) {
            var newTitle = 'Табата Таймер';
            var tabataSubtitle = document.getElementById('tabata-subtitle');
            var hiitSubtitle = document.getElementById('hiit-subtitle');
            var emomSubtitle = document.getElementById('emom-subtitle');
            var amrapSubtitle = document.getElementById('amrap-subtitle');
            if (window.timerMode == 2) {
                newTitle = 'HIIT Таймер';
                if (tabataSubtitle) tabataSubtitle.style.display = 'none';
                if (hiitSubtitle) hiitSubtitle.style.display = 'block';
                if (emomSubtitle) emomSubtitle.style.display = 'none';
                if (amrapSubtitle) amrapSubtitle.style.display = 'none';
            } else if (window.timerMode == 3) {
                newTitle = 'EMOM Таймер';
                if (tabataSubtitle) tabataSubtitle.style.display = 'none';
                if (hiitSubtitle) hiitSubtitle.style.display = 'none';
                if (emomSubtitle) emomSubtitle.style.display = 'block';
                if (amrapSubtitle) amrapSubtitle.style.display = 'none';
            } else if (window.timerMode == 4) {
                newTitle = 'AMRAP Таймер';
                if (tabataSubtitle) tabataSubtitle.style.display = 'none';
                if (hiitSubtitle) hiitSubtitle.style.display = 'none';
                if (emomSubtitle) emomSubtitle.style.display = 'none';
                if (amrapSubtitle) amrapSubtitle.style.display = 'block';
            } else {
                // Режим Табата (timerMode == 1)
                if (tabataSubtitle) tabataSubtitle.style.display = 'block';
                if (hiitSubtitle) hiitSubtitle.style.display = 'none';
                if (emomSubtitle) emomSubtitle.style.display = 'none';
                if (amrapSubtitle) amrapSubtitle.style.display = 'none';
            }
			console.log('Устанавливаем новый заголовок:', newTitle);
			title.textContent = newTitle;
		} else {
			console.log('Заголовок не найден!');
		}
		
        // Возвращаем таймер в исходное состояние
        document.getElementById('tt_clock_wrap').className = "tt_clock_default";
        document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.workout;
        document.getElementById('startbutton').style.display = "block";
        document.getElementById('pausebutton').style.display = "none";
        document.getElementById('resetbutton').style.display = "none";
        
        // Устанавливаем интерфейс в зависимости от режима
        if (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4) {
			// Режимы HIIT, EMOM, AMRAP - показываем настройки и скрываем плейлист
			document.getElementById('controls').style.display = "block";
			document.getElementById('playlistField').style.display = "none";
			if (window.timerMode == 2) {
			this.radioSettingsClick();
		} else {
				// Для EMOM и AMRAP вызываем radioSettingsClick для правильной инициализации радио
				this.radioSettingsClick();
			}
		} else {
			// Режим Табата - скрываем настройки и показываем плейлист
			document.getElementById('controls').style.display = "none";
			document.getElementById('playlistField').style.display = "block";
			this.zero();
			this.radioTabataClick();
		}
		changeLayoutState();
		
		// Инициализируем селектор упражнений после переключения режима
		if (typeof window.ExerciseManager !== 'undefined' && window.ExerciseManager.init) {
			setTimeout(function() {
				window.ExerciseManager.init();
			}, 200);
		}
    };
    
	this.setMusic = function(suppressSound) {
        // Воспроизводим звук клика только если это не программный вызов
        if (!suppressSound && typeof playClickEffectSound === 'function') {
            playClickEffectSound();
        }
        
        // Останавливаем радио при выборе музыки в режиме Табата
        var radioElement = document.getElementById('sound');
        if (radioElement) {
            radioElement.pause();
            radioElement.currentTime = 0;
            console.log('Радио (sound) остановлено при выборе музыки в режиме Табата');
        }
        
        // Останавливаем радио-плеер
        var radioAudio = document.getElementById('radio-audio');
        if (radioAudio) {
            radioAudio.pause();
            radioAudio.currentTime = 0;
            console.log('Радио (radio-audio) остановлено при выборе музыки в режиме Табата');
        }
        
        // Устанавливаем путь к музыке
        window.musicFile = "assets/music/" + document.getElementById("playlist").value;
        console.log('Выбран музыкальный файл:', window.musicFile);
        
        // Если мы уже на странице таймера, сразу начинаем предзагрузку
        if (window.location.hash === '#timer') {
            console.log('При выборе трека сразу активируем предзагрузку');
            setTimeout(preloadTabataMusic, 100);
        }
    };
    
    // Вспомогательная функция для проверки, играет ли радио
    function isRadioPlaying() {
        // Проверяем только для режима HIIT
        if (window.timerMode == 2) {
            var radioAudio = document.getElementById('radio-audio');
            // Если радио существует, не на паузе и время воспроизведения > 0, значит радио играет
            return (radioAudio && !radioAudio.paused && radioAudio.currentTime > 0);
        }
        return false; // В режиме Табата всегда возвращаем false
    }
	
    function waitForMusicReady() {
        return new Promise(function(resolve) {
            if (window.timerMode !== 1 || !window.musicFile) {
                resolve();
                return;
            }

            var audioElement = document.getElementById('sound');
            if (!audioElement) {
                resolve();
                return;
            }

            var targetSrc = window.musicFile;

            if (!audioElement.src || !audioElement.src.includes(targetSrc)) {
                audioElement.src = targetSrc;
            }

            audioElement.preload = 'auto';

            try {
                audioElement.load();
            } catch (error) {
                console.error('Не удалось инициировать загрузку аудио:', error);
            }

            resolve();
        });
    }

    playSound = function(soundfile, ignoreRadio) {
        // Проверяем, играет ли радио (только для режима HIIT)
        // Если ignoreRadio === true, воспроизводим звук даже если играет радио
        if (!ignoreRadio && isRadioPlaying()) {
            // Логируем только когда звук не воспроизводится из-за радио (важное событие)
            logTimer('Звук не воспроизводится, так как играет радио в режиме HIIT', {
                soundfile: soundfile,
                timerMode: window.timerMode
            });
            return; // Не воспроизводим звук, если радио играет
        }
        
        // Если радио не играет или режим Табата - воспроизводим звуки как обычно
        if (!sound) {
            logTimer('ОШИБКА: элемент sound не найден', {
                soundfile: soundfile,
                timerMode: window.timerMode
            });
            console.error('ОШИБКА: элемент sound не найден');
            return;
        }
        
		sound.pause();
        
        // Проверяем, загружался ли этот звук ранее
        if (sound.src !== soundfile) {
		sound.src = soundfile;
		sound.load();
        } else {
            // Сбрасываем позицию воспроизведения
            sound.currentTime = 0;
        }
        
        // Для iOS: убеждаемся, что звук готов к воспроизведению
        // Ждем, пока звук будет готов (особенно важно для iOS)
        var playAudio = function() {
        try {
            var playPromise = sound.play();
            
            // Современные браузеры возвращают Promise из play()
            if (playPromise !== undefined) {
                    playPromise.then(function() {
                        // Логируем только успешное воспроизведение (важное событие)
                        logTimer('Звук успешно воспроизведен', {soundfile: soundfile});
                    }).catch(function(error) {
                        // Логируем ошибки воспроизведения
                        logTimer('Ошибка воспроизведения звука (Promise rejected)', {
                            soundfile: soundfile,
                            error: error.toString(),
                            errorName: error.name,
                            errorMessage: error.message
                        });
                        console.error('Ошибка воспроизведения звука:', error);
                        
                        // Для iOS: пробуем еще раз через небольшую задержку
                        if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
                            setTimeout(function() {
                                try {
                                    var retryPromise = sound.play();
                                    if (retryPromise !== undefined) {
                                        retryPromise.catch(function(retryError) {
                                            logTimer('Повторная попытка воспроизведения звука не удалась', {
                                                soundfile: soundfile,
                                                error: retryError.toString()
                                            });
                                        });
                                    }
                                } catch (retryE) {
                                    logTimer('Ошибка при повторной попытке воспроизведения', {
                                        soundfile: soundfile,
                                        error: retryE.toString()
                                    });
                                }
                            }, 100);
                        }
                    });
                } else {
                    // Старые браузеры без Promise
                    logTimer('play() не вернул Promise (старый браузер)', {soundfile: soundfile});
            }
        } catch (e) {
                // Логируем ошибки воспроизведения
                logTimer('Ошибка воспроизведения звука (catch)', {
                    soundfile: soundfile,
                    error: e.toString(),
                    errorName: e.name,
                    errorMessage: e.message
                });
            console.error('Ошибка воспроизведения звука:', e);
            }
        };
        
        // Проверяем готовность звука перед воспроизведением (особенно важно для iOS)
        if (sound.readyState >= 2) {
            // Звук готов к воспроизведению
            playAudio();
        } else {
            // Ждем, пока звук загрузится
            sound.addEventListener('canplaythrough', function onCanPlay() {
                sound.removeEventListener('canplaythrough', onCanPlay);
                playAudio();
            }, { once: true });
            
            // Таймаут на случай, если событие не сработает
            setTimeout(function() {
                playAudio();
            }, 500);
        }
    };
    
    stopSound = function() {
        // Не останавливаем звук в режиме HIIT, если радио играет
        if (isRadioPlaying()) {
            console.log('Остановка звука отменена, так как играет радио в режиме HIIT');
            return; // Не останавливаем звук, если радио играет
        }
        
        //document.getElementById('tt_sound').innerHTML = "";
        sound.pause();
    };
    
    // Глобальные переменные для обработки сенсорных событий
    // Делаем их явно глобальными через window
    window.touchActive = false;
    window.timerIntervalId = null;
	
    setTimerData = function(i) {
        console.log('setTimerData вызван с параметром:', i, ', текущее поле:', field);
        
        // Сохраняем старые значения для отладки
        var oldValue;
        
        // Убедимся, что i равно либо +1, либо -1
        i = (i > 0) ? 1 : -1;
        
        if (field === 'prepare') {
            oldValue = tabatatimer.preparationTimeSetting;
            tabatatimer.preparationTimeSetting += i;
            tabatatimer.preparationTimeSetting = Math.min(Math.max(tabatatimer.preparationTimeSetting, 3), 3599);
            console.log('Время подготовки изменено с', oldValue, 'на', tabatatimer.preparationTimeSetting);
        } else if (field === 'work') {
            oldValue = tabatatimer.workTimeSetting;
            tabatatimer.workTimeSetting += i;
            tabatatimer.workTimeSetting = Math.min(Math.max(tabatatimer.workTimeSetting, 5), 3599);
            console.log('Рабочее время изменено с', oldValue, 'на', tabatatimer.workTimeSetting);
        } else if (field === 'rest') {
            oldValue = tabatatimer.restTimeSetting;
            tabatatimer.restTimeSetting += i;
            tabatatimer.restTimeSetting = Math.min(Math.max(tabatatimer.restTimeSetting, 3), 3599);
            console.log('Время отдыха изменено с', oldValue, 'на', tabatatimer.restTimeSetting);
        } else if (field === 'cycles') {
            oldValue = tabatatimer.cyclesSetting;
            tabatatimer.cyclesSetting += i;
            tabatatimer.cyclesSetting = Math.min(Math.max(tabatatimer.cyclesSetting, 1), 99);
            console.log('Число циклов изменено с', oldValue, 'на', tabatatimer.cyclesSetting);
            
            // Обновляем отображение общего количества раундов
            if (window.timerMode == 1) {
                // Режим Tabata
                var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
                var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
                if (roundsTotalCount) {
                    // При изменении настроек показываем общее количество только если таймер не запущен
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start && !tabatatimer.isRunning) {
                        if (roundsTotalLabel) {
                            roundsTotalLabel.textContent = 'ВСЕГО РАУНДОВ';
                        }
                        roundsTotalCount.textContent = tabatatimer.cyclesSetting.toString();
                    }
                    // Если таймер запущен, не меняем отображение (оставляем "РАУНД X")
                }
                // Старые элементы для совместимости
                var roundsTotalDisplay = document.getElementById('tabata-rounds-total-display');
                if (roundsTotalDisplay && tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    roundsTotalDisplay.textContent = tabatatimer.cyclesSetting;
                }
                var allCycles = document.getElementById('allcycles');
                if (allCycles) allCycles.innerHTML = tabatatimer.cyclesSetting;
            } else if (window.timerMode == 2) {
                // Режим HIIT - обновляем счетчики
                var cyclesTotalHiit = document.getElementById('tabata-cycles-total-hiit');
                var roundsTotalHiit = document.getElementById('tabata-rounds-total-hiit');
                var roundsTotalHiitStart = document.getElementById('tabata-rounds-total-hiit-start');
                var cyclesTotalHiitStart = document.getElementById('tabata-cycles-total-hiit-start');
                
                // Обновляем значения для стартового экрана
                if (roundsTotalHiitStart) {
                    roundsTotalHiitStart.textContent = tabatatimer.cyclesSetting.toString();
                }
                if (cyclesTotalHiitStart) {
                    cyclesTotalHiitStart.textContent = tabatatimer.tabatasSetting.toString();
                }
                // Обновляем значения для формата "X из Y" (если тренировка запущена)
                if (cyclesTotalHiit) {
                    cyclesTotalHiit.textContent = tabatatimer.tabatasSetting.toString();
                }
                if (roundsTotalHiit) {
                    roundsTotalHiit.textContent = tabatatimer.cyclesSetting.toString();
                }
                var allTabatas = document.getElementById('alltabatas');
                if (allTabatas) allTabatas.innerHTML = tabatatimer.tabatasSetting;
            }
        } else if (field === 'tabatas') {
            oldValue = tabatatimer.tabatasSetting;
            tabatatimer.tabatasSetting += i;
            tabatatimer.tabatasSetting = Math.min(Math.max(tabatatimer.tabatasSetting, 1), 99);
            console.log('Число табат изменено с', oldValue, 'на', tabatatimer.tabatasSetting);
            
            // Обновляем видимость блока циклов в новой структуре Tabata
            var cyclesInfo = document.getElementById('tabata-cycles-info');
            if (cyclesInfo) {
                if (tabatatimer.tabatasSetting > 1) {
                    cyclesInfo.style.display = 'flex';
                } else {
                    cyclesInfo.style.display = 'none';
                }
            }
            
            // Обновляем счетчик циклов для режима HIIT в формате "X из Y"
            if (window.timerMode == 2) {
                var cyclesTotalHiit = document.getElementById('tabata-cycles-total-hiit');
                var roundsTotalHiit = document.getElementById('tabata-rounds-total-hiit');
                if (cyclesTotalHiit) {
                    cyclesTotalHiit.textContent = tabatatimer.tabatasSetting.toString();
                }
                if (roundsTotalHiit) {
                    roundsTotalHiit.textContent = tabatatimer.cyclesSetting.toString();
                }
            }
            
            // Обновляем значение alltabatas
            var allTabatas = document.getElementById('alltabatas');
            if (allTabatas) allTabatas.innerHTML = tabatatimer.tabatasSetting;
        } else if (field === 'cyclerest') {
            oldValue = tabatatimer.cycleRestTimeSetting;
            tabatatimer.cycleRestTimeSetting += i;
            tabatatimer.cycleRestTimeSetting = Math.min(Math.max(tabatatimer.cycleRestTimeSetting, 0), 3599);
            console.log('Отдых между циклами изменен с', oldValue, 'на', tabatatimer.cycleRestTimeSetting);
        }
        
        // Принудительно обновляем интерфейс
        try {
            changeLayoutState();
            console.log('Интерфейс обновлен');
        } catch (e) {
            console.error('Ошибка при обновлении интерфейса:', e);
        }
        
        // Очищаем любые возможные таймеры
        clearTimeout(t);
        
        // В любом случае устанавливаем простой таймер для стабилизации интерфейса
        t = setTimeout(function() {
            try {
        changeLayoutState();
                console.log('Дополнительное обновление интерфейса');
            } catch (e) {
                console.error('Ошибка при дополнительном обновлении интерфейса:', e);
            }
        }, 100);
    };
    
    this.plus = function() {
        console.log('STTabataTimerViewController.plus() вызван');
        
        // Проверяем, не было ли уже недавнего вызова
        var now = new Date().getTime();
        if (this._lastPlusCall && (now - this._lastPlusCall) < 100) {
            console.log('Игнорируем дублирующий вызов plus()');
            return; // Игнорируем вызов, если прошло менее 100 мс от последнего
        }
        
        // Запоминаем время вызова
        this._lastPlusCall = now;
        
        // Выполняем операцию
        clearTimeout(t);
        setTimerData(1);
    };
    
    this.minus = function() {
        console.log('STTabataTimerViewController.minus() вызван');
        
        // Проверяем, не было ли уже недавнего вызова
        var now = new Date().getTime();
        if (this._lastMinusCall && (now - this._lastMinusCall) < 100) {
            console.log('Игнорируем дублирующий вызов minus()');
            return; // Игнорируем вызов, если прошло менее 100 мс от последнего
        }
        
        // Запоминаем время вызова
        this._lastMinusCall = now;
        
        // Выполняем операцию
        clearTimeout(t);
        setTimerData(-1);
    };
    
    this.invalidate = function() {
        clearTimeout(t);
        
        // Останавливаем все другие возможные таймеры
        if (typeof s !== 'undefined') {
            clearTimeout(s);
        }
        
        // Сбрасываем интервал
        intervals = 300;
        
        // Обновляем видимость блока циклов в новой структуре Tabata
        if (window.timerMode == 1 || window.timerMode == 2) {
            var cyclesInfo = document.getElementById('tabata-cycles-info');
            if (cyclesInfo && tabatatimer) {
                if (tabatatimer.tabatasSetting > 1) {
                    cyclesInfo.style.display = 'flex';
                } else {
                    cyclesInfo.style.display = 'none';
                }
            }
            
            // Обновляем отображение счетчиков в зависимости от режима
            if (window.timerMode == 1 && tabatatimer) {
                // Режим Tabata - "Сделано/Всего раундов"
                var roundsDoneCount = document.getElementById('tabata-rounds-done-count');
                var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
                var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
                var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
                var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
                var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
                
                // Показываем структуру для Tabata, скрываем для HIIT
                // Скрываем "СДЕЛАНО 0" перед стартом, показываем только после запуска таймера
                if (tabataRoundsDone) {
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                        tabataRoundsDone.style.display = 'none';
                    } else {
                        tabataRoundsDone.style.display = 'flex';
                    }
                }
                if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'flex';
                if (hiitRoundsDone) hiitRoundsDone.style.display = 'none';
                if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'none';
                
                if (roundsDoneCount) {
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                        roundsDoneCount.textContent = '0';
                    } else {
                        roundsDoneCount.textContent = tabatatimer.currentCycle.toString();
                    }
                }
                
                // Обновляем текст и номер раунда в зависимости от состояния таймера
                var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
                if (roundsTotalCount) {
                    // Если таймер не запущен (фаза start и не запущен) - показываем "ВСЕГО РАУНДОВ" и общее количество
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start && !tabatatimer.isRunning) {
                        if (roundsTotalLabel) {
                            roundsTotalLabel.textContent = 'ВСЕГО РАУНДОВ';
                        }
                        roundsTotalCount.textContent = tabatatimer.cyclesSetting.toString();
                    } else {
                        // Если таймер запущен - показываем "РАУНД" и текущий номер раунда
                        if (roundsTotalLabel) {
                            roundsTotalLabel.textContent = 'РАУНД';
                        }
                        // Убеждаемся, что currentCycle не меньше 1
                        var currentRound = tabatatimer.currentCycle >= 1 ? tabatatimer.currentCycle : 1;
                        roundsTotalCount.textContent = currentRound.toString();
                    }
                }
            } else if (window.timerMode == 2 && tabatatimer) {
                // Режим HIIT - "Раундов/Циклов" в формате "X из Y"
                var roundsCurrentHiit = document.getElementById('tabata-rounds-current-hiit');
                var roundsTotalHiit = document.getElementById('tabata-rounds-total-hiit');
                var cyclesCurrentHiit = document.getElementById('tabata-cycles-current-hiit');
                var cyclesTotalHiit = document.getElementById('tabata-cycles-total-hiit');
                var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
                var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
                var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
                var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
                var oldCyclesInfo = document.getElementById('tabata-cycles-info');
                
                // Показываем структуру для HIIT, скрываем для Tabata
                if (tabataRoundsDone) tabataRoundsDone.style.display = 'none';
                if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'none';
                if (hiitRoundsDone) hiitRoundsDone.style.display = 'flex';
                if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'flex';
                // Скрываем старый формат "ЦИКЛЫ 01 / 2"
                if (oldCyclesInfo) oldCyclesInfo.style.display = 'none';
                
                // Управляем отображением в зависимости от фазы
                var roundsTotalHiitStart = document.getElementById('tabata-rounds-total-hiit-start');
                var cyclesTotalHiitStart = document.getElementById('tabata-cycles-total-hiit-start');
                var roundsFromText = document.getElementById('tabata-rounds-from-text');
                var cyclesFromText = document.getElementById('tabata-cycles-from-text');
                
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    // На стартовом экране показываем только общее количество
                    if (roundsTotalHiitStart) {
                        roundsTotalHiitStart.textContent = tabatatimer.cyclesSetting.toString();
                        roundsTotalHiitStart.style.display = 'inline';
                    }
                    if (cyclesTotalHiitStart) {
                        cyclesTotalHiitStart.textContent = tabatatimer.tabatasSetting.toString();
                        cyclesTotalHiitStart.style.display = 'inline';
                    }
                    // Скрываем формат "X из Y"
                    if (roundsCurrentHiit) roundsCurrentHiit.style.display = 'none';
                    if (roundsTotalHiit) roundsTotalHiit.style.display = 'none';
                    if (roundsFromText) roundsFromText.style.display = 'none';
                    if (cyclesCurrentHiit) cyclesCurrentHiit.style.display = 'none';
                    if (cyclesTotalHiit) cyclesTotalHiit.style.display = 'none';
                    if (cyclesFromText) cyclesFromText.style.display = 'none';
                } else {
                    // Во время тренировки показываем формат "X из Y"
                    if (roundsTotalHiitStart) roundsTotalHiitStart.style.display = 'none';
                    if (cyclesTotalHiitStart) cyclesTotalHiitStart.style.display = 'none';
                    if (roundsCurrentHiit) {
                        roundsCurrentHiit.textContent = tabatatimer.currentCycle.toString();
                        roundsCurrentHiit.style.display = 'inline';
                    }
                    if (roundsTotalHiit) {
                        roundsTotalHiit.textContent = tabatatimer.cyclesSetting.toString();
                        roundsTotalHiit.style.display = 'inline';
                    }
                    if (roundsFromText) roundsFromText.style.display = 'inline';
                    if (cyclesCurrentHiit) {
                        cyclesCurrentHiit.textContent = tabatatimer.currentTabata.toString();
                        cyclesCurrentHiit.style.display = 'inline';
                    }
                    if (cyclesTotalHiit) {
                        cyclesTotalHiit.textContent = tabatatimer.tabatasSetting.toString();
                        cyclesTotalHiit.style.display = 'inline';
                    }
                    if (cyclesFromText) cyclesFromText.style.display = 'inline';
                }
            }
            
            // Старые элементы для совместимости
            var roundsTotalDisplay = document.getElementById('tabata-rounds-total-display');
            var ttNumberUi = document.getElementById('tt_number_ui');
            if (roundsTotalDisplay && tabatatimer && tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                roundsTotalDisplay.style.display = 'block';
                roundsTotalDisplay.textContent = tabatatimer.cyclesSetting;
            }
            if (ttNumberUi && tabatatimer && tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                ttNumberUi.style.display = 'none';
            }
        }
        
        // Принудительно обновляем интерфейс
        setTimeout(function() {
            changeLayoutState();
        }, 50);
    };
    
    this.zero = function() {
        if (field === 'prepare') {
            tabatatimer.preparationTimeSetting = 10;
        } else if (field === 'work') {
            // Для режима EMOM время работы по умолчанию 50 секунд
            if (window.timerMode == 3) {
                tabatatimer.workTimeSetting = 50;
            } else {
            tabatatimer.workTimeSetting = 20;
            }
        } else if (field === 'rest') {
            // Для режима EMOM время отдыха по умолчанию 10 секунд
            if (window.timerMode == 3) {
            tabatatimer.restTimeSetting = 10;
            } else {
                tabatatimer.restTimeSetting = 10;
            }
        } else if (field === 'cycles') {
            // Для режима EMOM раунды (минуты) по умолчанию 10
            if (window.timerMode == 3) {
                tabatatimer.cyclesSetting = 10; // 10 раундов (минут) для EMOM
            } else if (window.timerMode == 4) {
                tabatatimer.cyclesSetting = 1; // Для AMRAP по умолчанию 1
            } else {
            tabatatimer.cyclesSetting = 8;
            }
        } else if (field === 'tabatas') {
            // Для режима EMOM циклы по умолчанию 2
            if (window.timerMode == 3) {
                tabatatimer.tabatasSetting = 2; // 2 цикла для EMOM
            } else if (window.timerMode == 4) {
                tabatatimer.tabatasSetting = 20; // По умолчанию 20 минут для AMRAP
            } else {
            tabatatimer.tabatasSetting = 1;
            }
        } else if (field === 'cyclerest') {
            // Для режима AMRAP отдых между циклами по умолчанию 0
            if (window.timerMode == 4) {
                tabatatimer.cycleRestTimeSetting = 0;
            } else if (window.timerMode == 3) {
                tabatatimer.cycleRestTimeSetting = 60; // Для EMOM 60 секунд
            } else {
                tabatatimer.cycleRestTimeSetting = 60; // Сброс на 1 минуту (60 секунд)
            }
        }
        changeLayoutState();
    };
    
    totalWorkoutTime = function() {
        var cycle = (tabatatimer.workTimeSetting + tabatatimer.restTimeSetting);
        var tabata = (cycle * tabatatimer.cyclesSetting) + tabatatimer.preparationTimeSetting;
        // Добавляем отдых между циклами (только между циклами, не после последнего)
        var cycleRestTime = tabatatimer.cycleRestTimeSetting || 0;
        var totalCycleRest = cycleRestTime * (tabatatimer.tabatasSetting - 1);
        return (tabata * tabatatimer.tabatasSetting) - tabatatimer.restTimeSetting + totalCycleRest;
    };
    
    changeLayoutState = function() {
        // Сбрасываем флаги звуков при смене фазы
        var previousPhase = lastPhase; // Сохраняем предыдущую фазу для проверки входа в новую фазу
        if (lastPhase !== tabatatimer.sessionPhase) {
            // Логируем только смену фазы (важное событие)
            logTimer('Смена фазы', {from: lastPhase, to: tabatatimer.sessionPhase});
            countdownSoundPlayed = false;
            finishSoundPlayed = false;
            countdown54SoundPlayed = false;
            lastPhase = tabatatimer.sessionPhase;
        }
        
        switch (parseInt(tabatatimer.sessionPhase)) {
            case 1:
                if (window.timerMode == 1) {
                    // Простой формат для режима Табата
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTabataTimeFormat(tabatatimer.currentTime);
                } else {
                    // Стандартный формат для настраиваемого режима (включая AMRAP)
                    // Для AMRAP currentTime уже содержит время текущей фазы
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.currentTime);
                }
                document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.prepare;
                document.getElementById('tt_clock_wrap').className = "tt_clock_prepare";
                
                // Обновление прогресс-бара
                updateProgressBar(tabatatimer.currentTime, tabatatimer.preparationTimeSetting);
                
                // Синхронизация упражнения с таймером
                if (window.ExerciseManager) {
                    window.ExerciseManager.sync();
                }
                
                if (window.timerMode==2){
                    if (tabatatimer.currentTime == 4 && tabatatimer.preparationTimeSetting > 4 && !countdownSoundPlayed) {
                        // Воспроизводим звук отсчёта 3-2-1 за 4 секунды до конца стадии "Готовимся" (только один раз)
                        // Звук воспроизводится всегда, даже если играет радио
                        var soundsObj = window.sounds || sounds;
                        if (soundsObj && soundsObj.countdown) {
                            logTimer('Воспроизведение звука countdown в фазе Готовимся', {currentTime: tabatatimer.currentTime});
                            playSound(soundsObj.countdown, true); // true = игнорировать проверку радио
                            countdownSoundPlayed = true;
                        } else {
                            logTimer('ОШИБКА: sounds.countdown не определен', {sounds: soundsObj, windowSounds: window.sounds});
                            }
                    }
                    // Анимация отсчета 3-2-1 для стадии "Готовимся"
                    // Запускаем анимацию на 0.2 секунды раньше (когда currentTime == 4, с задержкой 800ms)
                    if (tabatatimer.currentTime == 4) {
                        var timeElement = document.getElementById('currenttime');
                        var spanElement = timeElement ? timeElement.getElementsByTagName('span')[0] : null;
                        
                        if (tabatatimer.preparationTimeSetting > 4) {
                            if (spanElement) {
                                // Запускаем анимацию через 800ms, чтобы она началась когда currentTime станет 3.2 (на 0.2 сек раньше)
                                setTimeout(function() {
                                    spanElement.classList.add('countdown-animation');
                                    setTimeout(function() {
                                        spanElement.classList.remove('countdown-animation');
                                    }, 500);
                                }, 800);
                            }
                        }
                    } else if (tabatatimer.currentTime <= 3 && tabatatimer.currentTime > 0) {
                        var timeElement = document.getElementById('currenttime');
                        var spanElement = timeElement ? timeElement.getElementsByTagName('span')[0] : null;
                        
                        if (tabatatimer.preparationTimeSetting > 4) {
                            if (spanElement) {
                                // Удаляем класс перед добавлением, чтобы анимация перезапускалась для каждой секунды
                                spanElement.classList.remove('countdown-animation');
                                // Небольшая задержка для сброса анимации перед повторным запуском
                                setTimeout(function() {
                                    spanElement.classList.add('countdown-animation');
                                    setTimeout(function() {
                                        spanElement.classList.remove('countdown-animation');
                                    }, 500);
                                }, 10);
                            } else {
                                // Логируем только ошибки
                                logTimer('ОШИБКА: span элемент не найден для анимации в стадии Готовимся', {
                                    currentTime: tabatatimer.currentTime,
                                    timeElementFound: !!timeElement
                                });
                            }
                        }
                    }
                }
                break;
            case 2:
                if (window.timerMode == 1) {
                    // Простой формат для режима Табата
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTabataTimeFormat(tabatatimer.currentTime);
                } else {
                    // Стандартный формат для настраиваемого режима (включая AMRAP)
                    // Для AMRAP currentTime уже содержит время текущей фазы
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.currentTime);
                }
                document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.work;
                document.getElementById('tt_clock_wrap').className = "tt_clock_work";
                
                // Обновление прогресс-бара
                updateProgressBar(tabatatimer.currentTime, tabatatimer.workTimeSetting);
                
                // Синхронизация упражнения с таймером - активируем GIF анимацию
                if (window.ExerciseManager) {
                    window.ExerciseManager.sync();
                }
                
                if (window.timerMode==2){
                    // Воспроизводим звук 5-4-3-2-1.mp3 за 6 секунд до окончания стадии "Работаем"
                    // Звук воспроизводится всегда, даже если играет радио
                    // Используем ту же логику, что и для стадии "Отдыхаем" для надежности
                    if (tabatatimer.currentTime == 6 && tabatatimer.workTimeSetting >= 6 && !countdown54SoundPlayed) {
                        var soundsObj = window.sounds || sounds;
                        if (soundsObj && soundsObj.countdown54) {
                            logTimer('Воспроизведение звука 5-4-3-2-1 за 6 секунд до окончания фазы Работаем', {currentTime: tabatatimer.currentTime, cycle: tabatatimer.currentCycle, tabata: tabatatimer.currentTabata});
                            playSound(soundsObj.countdown54, true); // true = игнорировать проверку радио
                            countdown54SoundPlayed = true;
                        } else {
                            logTimer('ОШИБКА: sounds.countdown54 не определен', {sounds: soundsObj, windowSounds: window.sounds});
                        }
                    }
                    
                    // Проверяем, является ли это последней стадией "Работаем" в тренировке
                    var isLastWorkPhase = (tabatatimer.currentCycle == tabatatimer.cyclesSetting && 
                                          tabatatimer.currentTabata == tabatatimer.tabatasSetting);
                    
                    // Проверяем, будет ли следующая фаза "Отдых между циклами"
                    // Это происходит когда: последний раунд в цикле, есть отдых между циклами, и это не последний цикл
                    var isNextPhaseCycleRest = (tabatatimer.currentCycle == tabatatimer.cyclesSetting && 
                                               tabatatimer.currentTabata < tabatatimer.tabatasSetting &&
                                               tabatatimer.cycleRestTimeSetting > 0);
                    
                    // Воспроизводим звук в конце последней секунды стадии "Работаем" (когда currentTime == 1)
                    // Звук воспроизводится всегда, даже если играет радио
                    // Используем setTimeout чтобы воспроизвести звук в конце секунды (через ~900ms)
                    if (tabatatimer.currentTime == 1 && !finishSoundPlayed) {
                        var soundsObj = window.sounds || sounds;
                        if (isLastWorkPhase) {
                            // В последней стадии "Работаем" воспроизводим звук окончания тренировки в конце секунды
                            if (soundsObj && soundsObj.finish) {
                                logTimer('Воспроизведение звука finish в конце последней секунды фазы Работаем', {currentTime: tabatatimer.currentTime, cycle: tabatatimer.currentCycle, tabata: tabatatimer.currentTabata});
                                setTimeout(function() {
                                    playSound(soundsObj.finish, true); // true = игнорировать проверку радио
                                }, 900); // Воспроизводим через 900ms, чтобы звук играл в конце секунды
                                finishSoundPlayed = true;
                            } else {
                                logTimer('ОШИБКА: sounds.finish не определен', {sounds: soundsObj, windowSounds: window.sounds});
                            }
                        } else if (!isNextPhaseCycleRest) {
                            // В остальных стадиях "Работаем" воспроизводим звук Rest.mp3 в конце секунды
                            // НО только если следующая фаза НЕ "Отдых между циклами" (там уже будет bell.mp3)
                            if (soundsObj && soundsObj.warning) {
                                logTimer('Воспроизведение звука Rest в конце секунды фазы Работаем', {currentTime: tabatatimer.currentTime, cycle: tabatatimer.currentCycle, tabata: tabatatimer.currentTabata});
                                setTimeout(function() {
                                    playSound(soundsObj.warning, true); // true = игнорировать проверку радио
                                }, 900); // Воспроизводим через 900ms, чтобы звук играл в конце секунды
                                finishSoundPlayed = true; // Используем тот же флаг для предотвращения повторного воспроизведения
                            } else {
                                logTimer('ОШИБКА: sounds.warning (Rest.mp3) не определен в фазе Работаем', {sounds: soundsObj, windowSounds: window.sounds});
                            }
                        } else {
                            // Следующая фаза - "Отдых между циклами", там уже будет bell.mp3, поэтому Rest.mp3 не воспроизводим
                            logTimer('Пропуск звука Rest - следующая фаза Отдых между циклами (будет bell.mp3)', {currentTime: tabatatimer.currentTime, cycle: tabatatimer.currentCycle, tabata: tabatatimer.currentTabata});
                        }
                    }
                    
                    // Анимация отсчета 3-2-1 для стадий длиннее 4 секунд
                    // Запускаем анимацию на 0.2 секунды раньше (когда currentTime == 4, с задержкой 800ms)
                    if (tabatatimer.currentTime == 4) {
                        if (tabatatimer.workTimeSetting > 4) {
                            var workSpanElement = document.getElementById('currenttime').getElementsByTagName('span')[0];
                            if (workSpanElement) {
                                // Запускаем анимацию через 800ms, чтобы она началась когда currentTime станет 3.2 (на 0.2 сек раньше)
                                setTimeout(function() {
                                    workSpanElement.classList.add('countdown-animation');
                                    setTimeout(function() {
                                        workSpanElement.classList.remove('countdown-animation');
                                    }, 500);
                                }, 800);
                            }
                        }
                    } else if (tabatatimer.currentTime <= 3 && tabatatimer.currentTime > 0) {
                        if (tabatatimer.workTimeSetting > 4) {
                            var workSpanElement = document.getElementById('currenttime').getElementsByTagName('span')[0];
                            if (workSpanElement) {
                                // Удаляем класс перед добавлением, чтобы анимация перезапускалась для каждой секунды
                                workSpanElement.classList.remove('countdown-animation');
                                // Небольшая задержка для сброса анимации перед повторным запуском
                                setTimeout(function() {
                                    workSpanElement.classList.add('countdown-animation');
                                    setTimeout(function() {
                                        workSpanElement.classList.remove('countdown-animation');
                                    }, 500);
                                }, 10);
                            }
                        }
                    }
                }
                break;
            case 3:
                if (window.timerMode == 1) {
                    // Простой формат для режима Табата
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTabataTimeFormat(tabatatimer.currentTime);
                } else {
                    // Стандартный формат для настраиваемого режима (включая AMRAP)
                    // Для AMRAP currentTime уже содержит время текущей фазы
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.currentTime);
                }
                document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.rest;
                document.getElementById('tt_clock_wrap').className = "tt_clock_rest";
                
                // Обновление прогресс-бара
                updateProgressBar(tabatatimer.currentTime, tabatatimer.restTimeSetting);
                
                // Синхронизация упражнения с таймером - останавливаем GIF анимацию
                if (window.ExerciseManager) {
                    window.ExerciseManager.sync();
                }
                
                if (window.timerMode==2){
                    if (tabatatimer.currentTime == 4 && tabatatimer.restTimeSetting > 4 && !countdownSoundPlayed) {
                        // Воспроизводим звук отсчёта 3-2-1 за 4 секунды до конца стадии "Отдыхаем" (только один раз)
                        // Звук воспроизводится всегда, даже если играет радио
                        var soundsObj = window.sounds || sounds;
                        if (soundsObj && soundsObj.countdown) {
                            logTimer('Воспроизведение звука countdown в фазе Отдыхаем', {currentTime: tabatatimer.currentTime});
                            playSound(soundsObj.countdown, true); // true = игнорировать проверку радио
                            countdownSoundPlayed = true;
                        } else {
                            logTimer('ОШИБКА: sounds.countdown не определен в фазе Отдыхаем', {sounds: soundsObj, windowSounds: window.sounds});
                            }
                    }
                    // Анимация отсчета 3-2-1 для стадии "Отдыхаем" (плавное мигание цифр)
                    // Запускаем анимацию на 0.2 секунды раньше (когда currentTime == 4, с задержкой 800ms)
                    if (tabatatimer.currentTime == 4) {
                        var timeElement = document.getElementById('currenttime');
                        var spanElement = timeElement ? timeElement.getElementsByTagName('span')[0] : null;
                        
                        if (spanElement) {
                            // Запускаем анимацию через 800ms, чтобы она началась когда currentTime станет 3.2 (на 0.2 сек раньше)
                                setTimeout(function() {
                                spanElement.classList.add('countdown-animation');
                                setTimeout(function() {
                                    spanElement.classList.remove('countdown-animation');
                                }, 500);
                                }, 800);
                        }
                    } else if (tabatatimer.currentTime <= 3 && tabatatimer.currentTime > 0) {
                        var timeElement = document.getElementById('currenttime');
                        var spanElement = timeElement ? timeElement.getElementsByTagName('span')[0] : null;
                        
                        if (spanElement) {
                            // Удаляем класс перед добавлением, чтобы анимация перезапускалась для каждой секунды
                            spanElement.classList.remove('countdown-animation');
                            // Небольшая задержка для сброса анимации перед повторным запуском
                            setTimeout(function() {
                                spanElement.classList.add('countdown-animation');
                                setTimeout(function() {
                                    spanElement.classList.remove('countdown-animation');
                                }, 500);
                            }, 10);
                        } else {
                            // Логируем только ошибки
                            logTimer('ОШИБКА: span элемент не найден для анимации в стадии Отдыхаем', {
                                currentTime: tabatatimer.currentTime,
                                timeElementFound: !!timeElement,
                                timeElementId: timeElement ? timeElement.id : 'не найден'
                            });
                        }
                    }
                }
                break;
            case 5: // cycleRest - Отдых между циклами
                if (window.timerMode == 2) {
                    // Стандартный формат для настраиваемого режима
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.currentTime);
                } else if (window.timerMode == 4) {
                    // Режим AMRAP - показываем время текущей фазы (для AMRAP currentTime уже содержит время фазы)
                    document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.currentTime);
                }
                document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.cycleRest;
                document.getElementById('tt_clock_wrap').className = "tt_clock_rest";
                
                // Обновление прогресс-бара
                updateProgressBar(tabatatimer.currentTime, tabatatimer.cycleRestTimeSetting);
                
                if (window.timerMode == 2) {
                    // Воспроизводим звук bell.mp3 при входе в фазу отдыха между циклами (только один раз)
                    if (previousPhase !== 5 && tabatatimer.cycleRestTimeSetting > 0) {
                        var soundsObj = window.sounds || sounds;
                        if (soundsObj && soundsObj.bell) {
                            logTimer('Воспроизведение звука bell при входе в фазу Отдых между циклами', {currentTime: tabatatimer.currentTime, previousPhase: previousPhase});
                            playSound(soundsObj.bell, true); // true = игнорировать проверку радио
                        } else {
                            logTimer('ОШИБКА: sounds.bell не определен', {sounds: soundsObj, windowSounds: window.sounds});
                        }
                    }
                    
                    // Воспроизводим звук отсчёта 3-2-1 за 4 секунды до конца стадии "Отдых между циклами" (только один раз)
                    if (tabatatimer.currentTime == 4 && tabatatimer.cycleRestTimeSetting > 4 && !countdownSoundPlayed) {
                        var soundsObj = window.sounds || sounds;
                        if (soundsObj && soundsObj.countdown) {
                            logTimer('Воспроизведение звука countdown в фазе Отдых между циклами', {currentTime: tabatatimer.currentTime});
                            playSound(soundsObj.countdown, true); // true = игнорировать проверку радио
                            countdownSoundPlayed = true;
                        } else {
                            logTimer('ОШИБКА: sounds.countdown не определен в фазе Отдых между циклами', {sounds: soundsObj, windowSounds: window.sounds});
                        }
                    }
                    
                    // Подмигивание цифр в tt_number_ui2 когда currentTime <= 3
                    // Запускаем анимацию на 0.2 секунды раньше (когда currentTime == 4, с задержкой 800ms)
                    if (tabatatimer.currentTime == 4) {
                        if (tabatatimer.cycleRestTimeSetting > 4) {
                            var cycleRestSpanElement = document.getElementById('currenttime').getElementsByTagName('span')[0];
                            if (cycleRestSpanElement) {
                                // Запускаем анимацию через 800ms, чтобы она началась когда currentTime станет 3.2 (на 0.2 сек раньше)
                                setTimeout(function() {
                                    cycleRestSpanElement.classList.add('countdown-animation');
                                    setTimeout(function() {
                                        cycleRestSpanElement.classList.remove('countdown-animation');
                                    }, 500);
                                }, 800);
                            }
                        }
                    } else if (tabatatimer.currentTime <= 3 && tabatatimer.currentTime > 0) {
                        if (tabatatimer.cycleRestTimeSetting > 4) {
                            var cycleRestSpanElement = document.getElementById('currenttime').getElementsByTagName('span')[0];
                            if (cycleRestSpanElement) {
                                // Удаляем класс перед добавлением, чтобы анимация перезапускалась для каждой секунды
                                cycleRestSpanElement.classList.remove('countdown-animation');
                                // Небольшая задержка для сброса анимации перед повторным запуском
                                setTimeout(function() {
                                    cycleRestSpanElement.classList.add('countdown-animation');
                                    setTimeout(function() {
                                        cycleRestSpanElement.classList.remove('countdown-animation');
                                    }, 500);
                                }, 10);
                            }
                        }
                    }
                }
                break;
            default:
                if (window.timerMode == 3) {
                    // Режим EMOM - показываем время работы (когда таймер не запущен)
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                        document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.workTimeSetting);
                    } else {
                        document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.currentTime);
                    }
                } else if (window.timerMode == 4) {
                    // Режим AMRAP - показываем время текущей фазы или общее время
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                        // Когда таймер не запущен, показываем время работы
                        document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.workTimeSetting);
                    } else if (tabatatimer.amrapTotalTime > 0) {
                        // Показываем время текущей фазы (для AMRAP currentTime уже содержит время фазы)
                        document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.currentTime);
                    } else {
                        document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(tabatatimer.workTimeSetting);
                    }
                } else {
                document.getElementById('currenttime').getElementsByTagName('span')[0].innerHTML = convertTimeFormat(totalWorkoutTime());
                }
                /*document.getElementById('currenttime').style.fontSize = "157px";
                if (totalWorkoutTime() > 3600) {
                    document.getElementById('currenttime').style.fontSize = "145px";
                }
                if (totalWorkoutTime() > 36000) {
                    document.getElementById('currenttime').style.fontSize = "120px";
                }
                if (totalWorkoutTime() > 3600000) {
                    document.getElementById('currenttime').style.fontSize = "100px";
                }*/
                document.getElementById('tt_clock_wrap').className = "tt_clock_default";
                document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.workout;
                break;
        }
        // Обновление счетчиков в зависимости от режима
        if (window.timerMode == 3) {
            // Режим EMOM - показываем текущую минуту
            var currentMinute = tabatatimer.emomMinute || 0;
            if (currentMinute === 0 && tabatatimer.sessionPhase !== tabatatimer.sessionPhases.start) {
                currentMinute = 1; // Первая минута начинается сразу
            }
            var currentCycleI = document.getElementById('currentcycle_i');
            var allCycles = document.getElementById('allcycles');
            if (currentCycleI) {
                // Если таймер не запущен, показываем 0 или 1
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    currentCycleI.innerHTML = 0;
                } else {
                    currentCycleI.innerHTML = currentMinute;
                }
            }
            if (allCycles) allCycles.innerHTML = tabatatimer.cyclesSetting; // Общее количество раундов (минут)
        } else if (window.timerMode == 1) {
            // Режим Табата - обновляем счетчики в структуре "Сделано/Всего раундов"
            var roundsDoneCount = document.getElementById('tabata-rounds-done-count');
            var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
            var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
            var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
            var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
            var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
            
            // Показываем структуру для Tabata, скрываем для HIIT
            if (tabataRoundsDone) tabataRoundsDone.style.display = 'flex';
            if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'flex';
            if (hiitRoundsDone) hiitRoundsDone.style.display = 'none';
            if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'none';
            
            // Обновляем счетчик выполненных раундов
            if (roundsDoneCount) {
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    roundsDoneCount.textContent = '0';
                } else {
                    roundsDoneCount.textContent = tabatatimer.currentCycle.toString();
                }
            }
            
            // Обновляем счетчик общего количества раундов
            // Проверяем состояние таймера перед обновлением
            var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
            if (roundsTotalCount) {
                // Если таймер не запущен (фаза start и не запущен) - показываем "ВСЕГО РАУНДОВ" и общее количество
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start && !tabatatimer.isRunning) {
                    if (roundsTotalLabel) {
                        roundsTotalLabel.textContent = 'ВСЕГО РАУНДОВ';
                    }
                    roundsTotalCount.textContent = tabatatimer.cyclesSetting.toString();
                } else {
                    // Если таймер запущен - показываем "РАУНД" и текущий номер раунда
                    if (roundsTotalLabel) {
                        roundsTotalLabel.textContent = 'РАУНД';
                    }
                    // Убеждаемся, что currentCycle не меньше 1
                    var currentRound = tabatatimer.currentCycle >= 1 ? tabatatimer.currentCycle : 1;
                    roundsTotalCount.textContent = currentRound.toString();
                }
            }
            
            // Старые элементы для совместимости (обновляем, но они скрыты)
            var currentCycleI = document.getElementById('currentcycle_i');
            var currentTabataI = document.getElementById('currenttabata_i');
            var allCycles = document.getElementById('allcycles');
            var allTabatas = document.getElementById('alltabatas');
            
            if (currentCycleI) {
                var cycleNum = tabatatimer.currentCycle < 10 ? '0' + tabatatimer.currentCycle : tabatatimer.currentCycle;
                currentCycleI.innerHTML = cycleNum;
            }
            if (allCycles) allCycles.innerHTML = tabatatimer.cyclesSetting;
            
            // Показываем/скрываем блок циклов в зависимости от tabatasSetting
            var cyclesInfo = document.getElementById('tabata-cycles-info');
            if (cyclesInfo) {
                if (tabatatimer.tabatasSetting > 1) {
                    cyclesInfo.style.display = 'flex';
                } else {
                    cyclesInfo.style.display = 'none';
                }
            }
            
            if (currentTabataI) {
                var tabataNum = tabatatimer.currentTabata < 10 ? '0' + tabatatimer.currentTabata : tabatatimer.currentTabata;
                currentTabataI.innerHTML = tabataNum;
            }
            if (allTabatas) allTabatas.innerHTML = tabatatimer.tabatasSetting;
        } else if (window.timerMode == 2) {
            // Режим HIIT - обновляем счетчики в структуре "Раундов/Циклов" в формате "X из Y"
            var roundsCurrentHiit = document.getElementById('tabata-rounds-current-hiit');
            var roundsTotalHiit = document.getElementById('tabata-rounds-total-hiit');
            var cyclesCurrentHiit = document.getElementById('tabata-cycles-current-hiit');
            var cyclesTotalHiit = document.getElementById('tabata-cycles-total-hiit');
            var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
            var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
            var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
            var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
            var oldCyclesInfo = document.getElementById('tabata-cycles-info');
            
            // Показываем структуру для HIIT, скрываем для Tabata
            if (tabataRoundsDone) tabataRoundsDone.style.display = 'none';
            if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'none';
            if (hiitRoundsDone) hiitRoundsDone.style.display = 'flex';
            if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'flex';
            // Скрываем старый формат "ЦИКЛЫ 01 / 2"
            if (oldCyclesInfo) oldCyclesInfo.style.display = 'none';
            
            // Обновляем счетчик раундов в формате "X из Y"
            if (roundsCurrentHiit) {
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    roundsCurrentHiit.textContent = '0';
                } else {
                    roundsCurrentHiit.textContent = tabatatimer.currentCycle.toString();
                }
            }
            if (roundsTotalHiit) {
                roundsTotalHiit.textContent = tabatatimer.cyclesSetting.toString();
            }
            
            // Обновляем счетчик циклов в формате "X из Y"
            if (cyclesCurrentHiit) {
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    cyclesCurrentHiit.textContent = '1';
                } else {
                    cyclesCurrentHiit.textContent = tabatatimer.currentTabata.toString();
                }
            }
            if (cyclesTotalHiit) {
                cyclesTotalHiit.textContent = tabatatimer.tabatasSetting.toString();
            }
            
            // Старые элементы для совместимости (обновляем, но они скрыты)
            var currentCycleI = document.getElementById('currentcycle_i');
            var currentTabataI = document.getElementById('currenttabata_i');
            var allCycles = document.getElementById('allcycles');
            var allTabatas = document.getElementById('alltabatas');
            
            if (currentCycleI) {
                var cycleNum = tabatatimer.currentCycle < 10 ? '0' + tabatatimer.currentCycle : tabatatimer.currentCycle;
                currentCycleI.innerHTML = cycleNum;
            }
            if (allCycles) allCycles.innerHTML = tabatatimer.cyclesSetting;
            
            if (currentTabataI) {
                var tabataNum = tabatatimer.currentTabata < 10 ? '0' + tabatatimer.currentTabata : tabatatimer.currentTabata;
                currentTabataI.innerHTML = tabataNum;
            }
            if (allTabatas) allTabatas.innerHTML = tabatatimer.tabatasSetting;
        } else if (window.timerMode == 4) {
            // Режим AMRAP - показываем количество раундов и оставшееся время
            var currentCycleI = document.getElementById('currentcycle_i');
            var allCycles = document.getElementById('allcycles');
            if (currentCycleI) {
                // Показываем количество выполненных раундов
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    currentCycleI.innerHTML = 0;
                } else {
                    var rounds = tabatatimer.currentCycle - 1; // currentCycle увеличивается при переходе к отдыху
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.work && rounds === 0) {
                        rounds = 1; // Первый раунд еще выполняется
                    }
                    currentCycleI.innerHTML = rounds || 0;
                }
            }
            if (allCycles) {
                // Показываем оставшееся время в минутах
                if (tabatatimer.amrapTotalTime > 0) {
                    var remainingMinutes = Math.ceil((tabatatimer.amrapTotalTime - tabatatimer.amrapElapsedTime) / 60);
                    allCycles.innerHTML = remainingMinutes || tabatatimer.tabatasSetting;
                } else {
                    allCycles.innerHTML = tabatatimer.tabatasSetting;
                }
            }
        } else {
            // Стандартные режимы (Табата и HIIT)
            document.getElementById('currentcycle').innerHTML = tabatatimer.cyclesSetting - tabatatimer.currentCycle + 1;
            document.getElementById('currenttabata').innerHTML = tabatatimer.tabatasSetting - tabatatimer.currentTabata + 1;
        }
        
        document.getElementById('setpreparetime').value = convertTimeFormat(tabatatimer.preparationTimeSetting);
        document.getElementById('setworktime').value = convertTimeFormat(tabatatimer.workTimeSetting);
        document.getElementById('setresttime').value = convertTimeFormat(tabatatimer.restTimeSetting);
        
        // Для режима EMOM показываем просто количество раундов (минут), без вычитания текущего цикла
        if (window.timerMode == 3) {
            document.getElementById('setcycles').value = tabatatimer.cyclesSetting; // Раунды (минуты) для EMOM
            document.getElementById('settabatas').value = tabatatimer.tabatasSetting; // Циклы для EMOM
        } else if (window.timerMode == 4) {
            // Для режима AMRAP
            document.getElementById('setcycles').value = tabatatimer.cyclesSetting - tabatatimer.currentCycle + 1;
            document.getElementById('settabatas').value = tabatatimer.tabatasSetting; // Время (минуты) для AMRAP
        } else {
            // Стандартные режимы (Табата и HIIT)
            document.getElementById('setcycles').value = tabatatimer.cyclesSetting - tabatatimer.currentCycle + 1;
            document.getElementById('settabatas').value = tabatatimer.tabatasSetting - tabatatimer.currentTabata + 1;
        }
        var cycleRestField = document.getElementById('setcycleresttime');
        if (cycleRestField) {
            cycleRestField.value = convertTimeFormat(tabatatimer.cycleRestTimeSetting);
        }
    };
    
    this.sessionLoaded = function() {
		this.setMusic(true); // Подавляем звук при программном вызове
		document.getElementById('controls').style.display = "none";
        document.getElementById('setpreparetime_label').innerHTML = labels.prepare;
        document.getElementById('setworktime_label').innerHTML = labels.work;
        document.getElementById('setresttime_label').innerHTML = labels.rest;
        document.getElementById('setcycles_label').innerHTML = labels.cyclesl;
        document.getElementById('settabatas_label').innerHTML = labels.tabatasl;
        document.getElementById('startbutton').innerHTML = labels.start;
        document.getElementById('resetbutton').innerHTML = labels.stop;
        document.getElementById('pausebutton').innerHTML = labels.pause;
        document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.workout;
        document.getElementById('tt_cycles_label').innerHTML = labels.cycles;
        document.getElementById('tt_tabatas_label').innerHTML = labels.tabatas;
		sound = document.getElementById('sound');
		
		// Проверка элемента sound (логируем только ошибки)
		if (!sound) {
			logTimer('ОШИБКА: элемент sound не найден при инициализации', {
				userAgent: navigator.userAgent,
				documentReady: document.readyState
			});
			console.error('ОШИБКА: элемент sound не найден при инициализации');
		}
		
		// Проверка объекта sounds (логируем только ошибки)
		var soundsObj = window.sounds || sounds;
		if (!soundsObj) {
			logTimer('ОШИБКА: объект sounds не найден при инициализации', {
				windowSounds: window.sounds,
				localSounds: sounds
			});
			console.error('ОШИБКА: объект sounds не найден при инициализации');
		}
		
		// Добавляем обработчик переключения режимов для остановки радио
		var tabataModeRadio = document.getElementById('tabataMode');
		if (tabataModeRadio) {
			tabataModeRadio.addEventListener('change', function() {
				var radioElement = document.getElementById('sound');
				if (radioElement) {
					radioElement.pause();
					radioElement.currentTime = 0;
					console.log('Радио (sound) остановлено при переключении на режим Табата из обработчика изменения');
				}
				
				// Останавливаем радио-плеер
				var radioAudio = document.getElementById('radio-audio');
				if (radioAudio) {
					radioAudio.pause();
					radioAudio.currentTime = 0;
					console.log('Радио (radio-audio) остановлено при переключении на режим Табата из обработчика изменения');
				}
			});
		}
		
        changeLayoutState();
    };
    
    this.timerHasFired = function() {
        // Обновление счетчиков в зависимости от режима
        if (window.timerMode == 3) {
            // Режим EMOM - обновляем текущую минуту
            var currentMinute = tabatatimer.emomMinute || 0;
            if (currentMinute === 0 && tabatatimer.sessionPhase !== tabatatimer.sessionPhases.start) {
                currentMinute = 1;
            }
            var currentCycleI = document.getElementById('currentcycle_i');
            var allCycles = document.getElementById('allcycles');
            if (currentCycleI) {
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    currentCycleI.innerHTML = 0;
                } else {
                    currentCycleI.innerHTML = currentMinute;
                }
            }
            if (allCycles) allCycles.innerHTML = tabatatimer.tabatasSetting;
        } else if (window.timerMode == 4) {
            // Режим AMRAP - обновляем количество раундов и оставшееся время
            var currentCycleI = document.getElementById('currentcycle_i');
            var allCycles = document.getElementById('allcycles');
            if (currentCycleI) {
                // Показываем количество выполненных раундов
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    currentCycleI.innerHTML = 0;
                } else {
                    var rounds = tabatatimer.currentCycle - 1;
                    if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.work && rounds === 0) {
                        rounds = 1; // Первый раунд еще выполняется
                    }
                    currentCycleI.innerHTML = rounds || 0;
                }
            }
            if (allCycles) {
                if (tabatatimer.amrapTotalTime > 0) {
                    // Показываем оставшееся время в минутах
                    var remainingMinutes = Math.ceil((tabatatimer.amrapTotalTime - tabatatimer.amrapElapsedTime) / 60);
                    allCycles.innerHTML = remainingMinutes || tabatatimer.tabatasSetting;
                } else {
                    allCycles.innerHTML = tabatatimer.tabatasSetting;
                }
            }
        } else if (window.timerMode == 1) {
            // Режим Табата - обновляем счетчики в структуре "Сделано/Всего раундов"
            var roundsDoneCount = document.getElementById('tabata-rounds-done-count');
            var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
            var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
            var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
            var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
            var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
            
            // Показываем структуру для Tabata, скрываем для HIIT
            if (tabataRoundsDone) tabataRoundsDone.style.display = 'flex';
            if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'flex';
            if (hiitRoundsDone) hiitRoundsDone.style.display = 'none';
            if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'none';
            
            // Обновляем счетчик выполненных раундов
            if (roundsDoneCount) {
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                    roundsDoneCount.textContent = '0';
                } else {
                    roundsDoneCount.textContent = tabatatimer.currentCycle.toString();
                }
            }
            
            // Обновляем счетчик общего количества раундов
            // Проверяем состояние таймера перед обновлением
            var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
            if (roundsTotalCount) {
                // Если таймер не запущен (фаза start и не запущен) - показываем "ВСЕГО РАУНДОВ" и общее количество
                if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start && !tabatatimer.isRunning) {
                    if (roundsTotalLabel) {
                        roundsTotalLabel.textContent = 'ВСЕГО РАУНДОВ';
                    }
                    roundsTotalCount.textContent = tabatatimer.cyclesSetting.toString();
                } else {
                    // Если таймер запущен - показываем "РАУНД" и текущий номер раунда
                    if (roundsTotalLabel) {
                        roundsTotalLabel.textContent = 'РАУНД';
                    }
                    // Убеждаемся, что currentCycle не меньше 1
                    var currentRound = tabatatimer.currentCycle >= 1 ? tabatatimer.currentCycle : 1;
                    roundsTotalCount.textContent = currentRound.toString();
                }
            }
            
            // Старые элементы для совместимости (обновляем, но они скрыты)
            var currentCycleEl = document.getElementById('currentcycle');
            var currentTabataEl = document.getElementById('currenttabata');
            var currentCycleI = document.getElementById('currentcycle_i');
            var currentTabataI = document.getElementById('currenttabata_i');
            var allCycles = document.getElementById('allcycles');
            var allTabatas = document.getElementById('alltabatas');
            
            if (currentCycleEl) currentCycleEl.innerHTML = tabatatimer.cyclesSetting - tabatatimer.currentCycle + 1;
            if (currentTabataEl) currentTabataEl.innerHTML = tabatatimer.tabatasSetting - tabatatimer.currentTabata + 1;
            
            if (currentCycleI) {
                var cycleNum = tabatatimer.currentCycle < 10 ? '0' + tabatatimer.currentCycle : tabatatimer.currentCycle;
                currentCycleI.innerHTML = cycleNum;
            }
            if (allCycles) allCycles.innerHTML = tabatatimer.cyclesSetting;
            
            // Показываем/скрываем блок циклов в зависимости от tabatasSetting
            var cyclesInfo = document.getElementById('tabata-cycles-info');
            if (cyclesInfo) {
                if (tabatatimer.tabatasSetting > 1) {
                    cyclesInfo.style.display = 'flex';
                } else {
                    cyclesInfo.style.display = 'none';
                }
            }
            
            if (currentTabataI) {
                var tabataNum = tabatatimer.currentTabata < 10 ? '0' + tabatatimer.currentTabata : tabatatimer.currentTabata;
                currentTabataI.innerHTML = tabataNum;
            }
            if (allTabatas) allTabatas.innerHTML = tabatatimer.tabatasSetting;
        } else if (window.timerMode == 2) {
            // Режим HIIT - обновляем счетчики в структуре "Раундов/Циклов" в формате "X из Y"
            var roundsCurrentHiit = document.getElementById('tabata-rounds-current-hiit');
            var roundsTotalHiit = document.getElementById('tabata-rounds-total-hiit');
            var cyclesCurrentHiit = document.getElementById('tabata-cycles-current-hiit');
            var cyclesTotalHiit = document.getElementById('tabata-cycles-total-hiit');
            var roundsTotalHiitStart = document.getElementById('tabata-rounds-total-hiit-start');
            var cyclesTotalHiitStart = document.getElementById('tabata-cycles-total-hiit-start');
            var roundsFromText = document.getElementById('tabata-rounds-from-text');
            var cyclesFromText = document.getElementById('tabata-cycles-from-text');
            var tabataRoundsDone = document.getElementById('tabata-rounds-done-tabata');
            var tabataRoundsTotal = document.getElementById('tabata-rounds-total-info-tabata');
            var hiitRoundsDone = document.getElementById('tabata-rounds-done-hiit');
            var hiitCyclesInfo = document.getElementById('tabata-cycles-info-hiit');
            var oldCyclesInfo = document.getElementById('tabata-cycles-info');
            
            // Показываем структуру для HIIT, скрываем для Tabata
            if (tabataRoundsDone) tabataRoundsDone.style.display = 'none';
            if (tabataRoundsTotal) tabataRoundsTotal.style.display = 'none';
            if (hiitRoundsDone) hiitRoundsDone.style.display = 'flex';
            if (hiitCyclesInfo) hiitCyclesInfo.style.display = 'flex';
            // Скрываем старый формат "ЦИКЛЫ 01 / 2"
            if (oldCyclesInfo) oldCyclesInfo.style.display = 'none';
            
            // Управляем отображением в зависимости от фазы
            if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                // На стартовом экране показываем только общее количество
                if (roundsTotalHiitStart) {
                    roundsTotalHiitStart.textContent = tabatatimer.cyclesSetting.toString();
                    roundsTotalHiitStart.style.display = 'inline';
                }
                if (cyclesTotalHiitStart) {
                    cyclesTotalHiitStart.textContent = tabatatimer.tabatasSetting.toString();
                    cyclesTotalHiitStart.style.display = 'inline';
                }
                // Скрываем формат "X из Y"
                if (roundsCurrentHiit) roundsCurrentHiit.style.display = 'none';
                if (roundsTotalHiit) roundsTotalHiit.style.display = 'none';
                if (roundsFromText) roundsFromText.style.display = 'none';
                if (cyclesCurrentHiit) cyclesCurrentHiit.style.display = 'none';
                if (cyclesTotalHiit) cyclesTotalHiit.style.display = 'none';
                if (cyclesFromText) cyclesFromText.style.display = 'none';
            } else {
                // Во время тренировки показываем формат "X из Y"
                if (roundsTotalHiitStart) roundsTotalHiitStart.style.display = 'none';
                if (cyclesTotalHiitStart) cyclesTotalHiitStart.style.display = 'none';
                if (roundsCurrentHiit) {
                    roundsCurrentHiit.textContent = tabatatimer.currentCycle.toString();
                    roundsCurrentHiit.style.display = 'inline';
                }
                if (roundsTotalHiit) {
                    roundsTotalHiit.textContent = tabatatimer.cyclesSetting.toString();
                    roundsTotalHiit.style.display = 'inline';
                }
                if (roundsFromText) roundsFromText.style.display = 'inline';
                if (cyclesCurrentHiit) {
                    cyclesCurrentHiit.textContent = tabatatimer.currentTabata.toString();
                    cyclesCurrentHiit.style.display = 'inline';
                }
                if (cyclesTotalHiit) {
                    cyclesTotalHiit.textContent = tabatatimer.tabatasSetting.toString();
                    cyclesTotalHiit.style.display = 'inline';
                }
                if (cyclesFromText) cyclesFromText.style.display = 'inline';
            }
            
            // Старые элементы для совместимости (обновляем, но они скрыты)
            var currentCycleEl = document.getElementById('currentcycle');
            var currentTabataEl = document.getElementById('currenttabata');
            var currentCycleI = document.getElementById('currentcycle_i');
            var currentTabataI = document.getElementById('currenttabata_i');
            var allCycles = document.getElementById('allcycles');
            var allTabatas = document.getElementById('alltabatas');
            
            if (currentCycleEl) currentCycleEl.innerHTML = tabatatimer.cyclesSetting - tabatatimer.currentCycle + 1;
            if (currentTabataEl) currentTabataEl.innerHTML = tabatatimer.tabatasSetting - tabatatimer.currentTabata + 1;
            
            if (currentCycleI) {
                var cycleNum = tabatatimer.currentCycle < 10 ? '0' + tabatatimer.currentCycle : tabatatimer.currentCycle;
                currentCycleI.innerHTML = cycleNum;
            }
            if (allCycles) allCycles.innerHTML = tabatatimer.cyclesSetting;
            
            if (currentTabataI) {
                var tabataNum = tabatatimer.currentTabata < 10 ? '0' + tabatatimer.currentTabata : tabatatimer.currentTabata;
                currentTabataI.innerHTML = tabataNum;
            }
            if (allTabatas) allTabatas.innerHTML = tabatatimer.tabatasSetting;
        }
        
        changeLayoutState();
        
        // Синхронизация упражнения с таймером
        // Используем exerciseSelector для синхронизации упражнений в режиме HIIT
        console.log('[Timer HasFired] Проверка синхронизации:', {
            hasExerciseSelector: !!window.exerciseSelector,
            hasExerciseManager: !!window.ExerciseManager,
            timerMode: window.timerMode
        });
        
        if (window.exerciseSelector && typeof window.exerciseSelector.sync === 'function') {
            console.log('[Timer HasFired] Вызываем exerciseSelector.sync()');
            window.exerciseSelector.sync();
        } else if (window.ExerciseManager && typeof window.ExerciseManager.sync === 'function') {
            console.log('[Timer HasFired] Вызываем ExerciseManager.sync()');
            window.ExerciseManager.sync();
        } else {
            console.warn('[Timer HasFired] exerciseSelector не найден');
        }
    };
    
this.sessionEnded = function() {
        console.log("sessionEnded - Сессия завершена");
        
        // Воспроизводим звук только если не был вызван сброс вручную,
        // таймер был в режиме 2 и радио не играет
        if ((window.timerMode == 2) && !stopped && tabatatimer.isRunning && !isRadioPlaying()) {
            var soundsObj = window.sounds || sounds;
            if (soundsObj && soundsObj.sessioncomplete) {
                playSound(soundsObj.sessioncomplete);
            }
    }
        
        // Скрываем элементы для режимов EMOM и AMRAP
        if (window.timerMode == 3) {
            // Режим EMOM - скрываем все элементы EMOM
            var emomTimerRow = document.getElementById('emom-timer-row-wrapper');
            if (emomTimerRow) {
                emomTimerRow.style.display = 'none';
            }
            var emomContainer = document.getElementById('emom-timer-container');
            if (emomContainer) {
                emomContainer.style.display = 'none';
            }
            // Убираем класс emom-active с body, чтобы экран с цитатами мог отображаться
            document.body.classList.remove('emom-active');
        } else if (window.timerMode == 4) {
            // Режим AMRAP - скрываем все элементы AMRAP
            var amrapTimerRow = document.getElementById('amrap-timer-row-wrapper');
            if (amrapTimerRow) {
                amrapTimerRow.style.display = 'none';
            }
            var amrapContainer = document.getElementById('amrap-timer-container');
            if (amrapContainer) {
                amrapContainer.style.display = 'none';
            }
            // Скрываем результаты AMRAP
            var amrapResults = document.querySelector('.amrap-results-card');
            if (amrapResults) {
                amrapResults.style.display = 'none';
            }
            // Убираем класс amrap-active с body, чтобы экран с цитатами мог отображаться
            document.body.classList.remove('amrap-active');
        }
        
        // Обновляем интерфейс (только для режимов Табата и HIIT)
        var currentcycle = document.getElementById('currentcycle');
        var currentcycle_i = document.getElementById('currentcycle_i');
        var currenttabata = document.getElementById('currenttabata');
        if (currentcycle) currentcycle.innerHTML = tabatatimer.cyclesSetting;
        if (currentcycle_i) currentcycle_i.innerHTML = tabatatimer.cyclesSetting;
        if (currenttabata) currenttabata.innerHTML = tabatatimer.tabatasSetting;
        
        var controls = document.getElementById('controls');
        var startbutton = document.getElementById('startbutton');
        var pausebutton = document.getElementById('pausebutton');
        var resetbutton = document.getElementById('resetbutton');
        if (controls) controls.style.display = "none";
        if (startbutton) startbutton.style.display = "block";
        if (pausebutton) pausebutton.style.display = "none";
        if (resetbutton) resetbutton.style.display = "none";
    
        var ttMainWrap = document.getElementById('tt_main_wrap');
        var ttMainEndWrap = document.getElementById('tt_main_end_wrap');
        if (ttMainWrap) ttMainWrap.style.display = "none";
        if (ttMainEndWrap) ttMainEndWrap.style.display = "block";
        
        // Убедимся, что кнопка "Назад к таймеру" всегда видима
        document.getElementById('backtotimer').style.display = "block";
        
        // Скрываем ползунок громкости во время тренировки при окончании тренировки
        if (typeof toggleVolumeSliderTimer === 'function') {
            toggleVolumeSliderTimer(false);
        }
        
        // Удаляем ползунок громкости во время тренировки, если он существует
        var volumeContainerTimer = document.getElementById('radio-volume-container-timer');
        if (volumeContainerTimer) {
            volumeContainerTimer.remove();
        }
    
    // Выбираем случайную цитату
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    // Обновляем текст и изображение
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteImage = document.getElementById('quoteImage');
    
    if (quoteText && quoteAuthor && quoteImage) {
        quoteText.textContent = randomQuote.quote; // Текст цитаты
        quoteAuthor.textContent = randomQuote.author; // Имя автора
        quoteImage.src = randomQuote.image; // Изображение автора
    }
    
        // Звук boxing_bell.mp3 больше не используется
        // Для окончания тренировки используется sessioncomplete (boxing_bell_multiple.wav)
        // Для окончания цикла используется bell.mp3 при входе в фазу "Отдых между циклами"
        
        console.log('sessionEnded завершён, backtotimer display state:', document.getElementById('backtotimer').style.display);
    
    // Вызываем функцию для подбора размера шрифта
    adjustQuoteFontSize();
    
    // Показываем результаты AMRAP, если это режим AMRAP
    if (window.timerMode == 4) {
        showAmrapResultsInQuotes();
    } else {
        // Скрываем результаты для других режимов
        var amrapResultsInQuotes = document.getElementById('amrap-results-in-quotes');
        if (amrapResultsInQuotes) {
            amrapResultsInQuotes.style.display = 'none';
        }
    }
};

// Функция для отображения результатов AMRAP в экране с цитатами
function showAmrapResultsInQuotes() {
    var amrapResultsInQuotes = document.getElementById('amrap-results-in-quotes');
    if (!amrapResultsInQuotes) return;
    
    // Получаем данные из оригинальных элементов AMRAP
    var totalRoundsEl = document.getElementById('amrap-total-rounds');
    var bestRoundEl = document.getElementById('amrap-best-round');
    var worstRoundEl = document.getElementById('amrap-worst-round');
    var totalTimeEl = document.getElementById('amrap-total-time');
    var roundsHistoryEl = document.getElementById('amrap-rounds-history');
    
    // Копируем данные в элементы экрана с цитатами
    var totalRoundsInQuotes = document.getElementById('amrap-total-rounds-in-quotes');
    var bestRoundInQuotes = document.getElementById('amrap-best-round-in-quotes');
    var worstRoundInQuotes = document.getElementById('amrap-worst-round-in-quotes');
    var totalTimeInQuotes = document.getElementById('amrap-total-time-in-quotes');
    var roundsHistoryInQuotes = document.getElementById('amrap-rounds-history-in-quotes');
    
    if (totalRoundsEl && totalRoundsInQuotes) {
        totalRoundsInQuotes.textContent = totalRoundsEl.textContent || '0';
    }
    
    if (bestRoundEl && bestRoundInQuotes) {
        bestRoundInQuotes.textContent = bestRoundEl.textContent || '—';
    }
    
    if (worstRoundEl && worstRoundInQuotes) {
        worstRoundInQuotes.textContent = worstRoundEl.textContent || '—';
    }
    
    // Всегда показываем время, если оно вычислено
    if (totalTimeInQuotes) {
        if (totalTimeEl && totalTimeEl.textContent && totalTimeEl.textContent !== '—') {
            totalTimeInQuotes.textContent = totalTimeEl.textContent;
        } else {
            // Если время не отображается в оригинальном элементе, пытаемся получить его из состояния AMRAP
            // Проверяем, есть ли доступ к состоянию AMRAP через window
            if (window.amrapState && window.amrapState.totalElapsedTime !== undefined && window.amrapState.totalElapsedTime !== null) {
                // Форматируем время (MM:SS)
                var seconds = window.amrapState.totalElapsedTime;
                var minutes = Math.floor(seconds / 60);
                var secs = seconds % 60;
                totalTimeInQuotes.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (secs < 10 ? '0' : '') + secs;
            } else {
                totalTimeInQuotes.textContent = '—';
            }
        }
    }
    
    // Копируем историю раундов
    if (roundsHistoryEl && roundsHistoryInQuotes) {
        roundsHistoryInQuotes.innerHTML = '';
        
        // Копируем все элементы истории раундов
        var roundItems = roundsHistoryEl.querySelectorAll('.amrap-round-item');
        if (roundItems.length > 0) {
            roundItems.forEach(function(item) {
                var clonedItem = item.cloneNode(true);
                // Упрощаем стили для экрана с цитатами
                clonedItem.style.cssText = 'display: flex; justify-content: space-between; padding: 8px; margin-bottom: 4px; background: rgba(255, 255, 255, 0.03); border-radius: 6px; font-size: 13px;';
                roundsHistoryInQuotes.appendChild(clonedItem);
            });
        } else {
            // Если нет раундов, показываем сообщение
            var emptyMsg = document.createElement('p');
            emptyMsg.textContent = 'Раунды ещё не зафиксированы';
            emptyMsg.style.cssText = 'color: rgba(255, 255, 255, 0.6); text-align: center; padding: 12px; letter-spacing: 0.1em;';
            roundsHistoryInQuotes.appendChild(emptyMsg);
        }
    }
    
    // Показываем контейнер с результатами
    amrapResultsInQuotes.style.display = 'block';
		}
    
    this.tabataComplete = function() {
        // Звук bell.mp3 теперь воспроизводится при входе в фазу "Отдых между циклами"
        // Поэтому здесь больше не нужно воспроизводить boxing_bell.mp3
		/*document.getElementById('tabataReadyTRX').style.display = "block";*/
        console.log('tabataComplete func');
    };
            
    this.startButtonPushed = function() {
		console.log("Кнопка Старт нажата, tabatatimer.sessionPhase:", tabatatimer.sessionPhase);
		
		// Воспроизводим звук Whistler.mp3 при нажатии на кнопку СТАРТ
		// Используем отдельный аудиоэлемент, чтобы звук мог играть одновременно с музыкой
		if (typeof playWhistlerSound === 'function') {
			playWhistlerSound();
		}
		
		// Логирование для режима HIIT
		if (typeof window.logRadio === 'function') {
			var radioAudio = document.getElementById('radio-audio');
			window.logRadio('startButtonPushed: запуск таймера', {
				timerMode: window.timerMode,
				sessionPhase: tabatatimer.sessionPhase,
				radioAudio: radioAudio ? 'найден' : 'не найден',
				radioAudioSrc: radioAudio ? radioAudio.src : 'не доступен',
				radioAudioPaused: radioAudio ? radioAudio.paused : 'не доступен',
				radioIsPlaying: typeof radioIsPlaying !== 'undefined' ? radioIsPlaying : 'не определено'
			});
		}
		
		document.getElementById('modeSelector').style.display = "none";
			document.getElementById('controls').style.display = "none";
            document.getElementById('playlistField').style.display = "none";
		document.getElementById('startbutton').style.display = "none";
            document.getElementById('pausebutton').style.display = "block";
            document.getElementById('resetbutton').style.display = "block";
            
            // Добавляем класс для отступа от скрытой карточки режимов (только для ТАБАТА и HIIT)
            if (window.timerMode == 1 || window.timerMode == 2) {
                document.body.classList.add('workout-running');
            }
		
		// Устанавливаем текст кнопки ПАУЗА на "Пауза" при старте
		var pauseButton = document.getElementById('pausebutton');
		if (pauseButton) {
			pauseButton.innerHTML = "Пауза";
			pauseButton.className = "tt_big_button button field";
		}
			
		isPaused = false;
		stopped = false;
		
		// Сбрасываем флаги звуков при старте таймера
		countdownSoundPlayed = false;
		finishSoundPlayed = false;
		countdown54SoundPlayed = false;
		lastPhase = -1;
		
		// Обновляем текст "РАУНД" и номер раунда в режиме Табата при старте
		if (window.timerMode == 1) {
			var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
			var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
			if (roundsTotalLabel) {
				roundsTotalLabel.textContent = 'РАУНД';
			}
			if (roundsTotalCount) {
				// Убеждаемся, что currentCycle установлен в 1 перед стартом
				if (tabatatimer) {
					tabatatimer.currentCycle = 1;
					roundsTotalCount.textContent = '1';
				} else {
					roundsTotalCount.textContent = '1';
				}
			}
		}
		
		// Обновляем текст "РАУНД" и "ЦИКЛ" в режиме HIIT при старте
		if (window.timerMode == 2) {
			var roundsLabelHiit = document.getElementById('tabata-rounds-label-hiit');
			var cyclesLabelHiit = document.getElementById('tabata-cycles-label-hiit');
			if (roundsLabelHiit) {
				roundsLabelHiit.textContent = 'РАУНД';
			}
			if (cyclesLabelHiit) {
				cyclesLabelHiit.textContent = 'ЦИКЛ';
			}
		}
		
		// Инициализируем звуковой элемент для таймера (важно для iOS - требуется пользовательское взаимодействие)
		// На iOS звуки должны воспроизводиться в контексте пользовательского взаимодействия
		// Простое наличие элемента sound достаточно, так как playSound будет вызван в контексте таймера
		// который уже запущен пользователем (через нажатие кнопки START)
		if (sound && (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4)) {
			// Для режимов HIIT, EMOM, AMRAP предзагружаем первый звук для активации на iOS
			var soundsObj = window.sounds || sounds;
			if (soundsObj && soundsObj.countdown) {
				sound.preload = 'auto';
				sound.src = soundsObj.countdown;
				sound.load();
				logTimer('Звуковой элемент предзагружен для режима ' + (window.timerMode == 2 ? 'HIIT' : window.timerMode == 3 ? 'EMOM' : 'AMRAP'), {soundfile: soundsObj.countdown});
			}
		}
		
		// Сбрасываем отображение счетчиков и настраиваем правильное отображение для режимов HIIT, EMOM, AMRAP
		if (window.timerMode == 2) {
			// Режим HIIT - показываем счетчики в формате 01/8
		document.getElementById('tt_number_ui').style.display = "block";
			document.getElementById('currentcycle').style.display = "none";
		document.getElementById('tt_number_ui2').style.display = "block";
			document.getElementById('currenttabata').style.display = "none";
		} else if (window.timerMode == 3) {
			// Режим EMOM - показываем только счетчик минут
			document.getElementById('tt_number_ui').style.display = "block";
			document.getElementById('currentcycle').style.display = "none";
			document.getElementById('tt_number_ui2').style.display = "none";
			document.getElementById('currenttabata').style.display = "none";
		} else if (window.timerMode == 4) {
			// Режим AMRAP - показываем счетчик раундов
			document.getElementById('tt_number_ui').style.display = "block";
			document.getElementById('currentcycle').style.display = "none";
			document.getElementById('tt_number_ui2').style.display = "none";
			document.getElementById('currenttabata').style.display = "none";
		}
		
		// Всегда показываем надписи для счетчиков независимо от режима
		document.getElementById('tt_cycles_label').style.display = "block";
		if (window.timerMode == 2) {
		document.getElementById('tt_tabatas_label').style.display = "block";
				} else {
			document.getElementById('tt_tabatas_label').style.display = "none";
				}
		
		var launchTimer = function() {
		// Принудительно устанавливаем фазу подготовки при старте
        tabatatimer.sessionPhase = tabatatimer.sessionPhases.start;
        
        // Принудительно сбрасываем счетчики при старте
        tabatatimer.currentCycle = 1;
        tabatatimer.currentTabata = 1;
        
        console.log("Сбрасываем фазу и счетчики, calculateNextPhase установит фазу подготовки");
				tabatatimer.start();

                // Событие для внешних модулей (например, динамический фон Unsplash)
                try {
                    window.dispatchEvent(new CustomEvent('tabata:started', { detail: { mode: window.timerMode } }));
                } catch (e) {}
		
				// Обновляем UI для режима Табата после запуска таймера
				// Используем несколько попыток, чтобы гарантировать обновление после calculateNextPhase и timerHasFired
		if (window.timerMode == 1) {
					// Убеждаемся, что currentCycle установлен в 1 перед стартом
					tabatatimer.currentCycle = 1;
					
					// Первая попытка сразу после старта
					setTimeout(function() {
						var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
						var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
						if (roundsTotalLabel) {
							roundsTotalLabel.textContent = 'РАУНД';
						}
						if (roundsTotalCount && tabatatimer) {
							// Убеждаемся, что currentCycle установлен в 1
							tabatatimer.currentCycle = 1;
							roundsTotalCount.textContent = '1';
						}
					}, 50);
						
					// Вторая попытка после первого тика таймера
					setTimeout(function() {
						var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
						var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
						if (roundsTotalLabel && roundsTotalLabel.textContent !== 'РАУНД') {
							roundsTotalLabel.textContent = 'РАУНД';
						}
						if (roundsTotalCount && tabatatimer) {
							// Убеждаемся, что currentCycle установлен в 1
							tabatatimer.currentCycle = 1;
							if (roundsTotalCount.textContent !== '1') {
								roundsTotalCount.textContent = '1';
							}
						}
					}, 1200); // После первого тика таймера (1000ms + запас)
		}
		
		// Синхронизуем состояние упражнения
		if (window.ExerciseManager) {
			window.ExerciseManager.sync();
			}
		
		// Если включена синхронизация упражнений с раундами в режиме HIIT, 
		// принудительно переключаемся на первое упражнение при старте
		if (window.timerMode === 2 && window.ExerciseManager) {
			// Проверяем, включена ли синхронизация
			var syncEnabled = false;
			if (typeof window.ExerciseManager.getHiitExerciseRoundSyncEnabled === 'function') {
				syncEnabled = window.ExerciseManager.getHiitExerciseRoundSyncEnabled();
			} else {
				// Fallback: проверяем localStorage напрямую
				var savedSyncState = localStorage.getItem('hiitExerciseRoundSyncEnabled');
				syncEnabled = savedSyncState === 'true';
			}
			
			if (syncEnabled && typeof window.ExerciseManager.switchToHiitExercise === 'function') {
				window.ExerciseManager.switchToHiitExercise(0);
				console.log('[HIIT Start] Принудительное переключение на первое упражнение (индекс 0), синхронизация включена');
			}
			}
			
			// Инициализируем и показываем ползунок громкости во время тренировки (для режимов HIIT, EMOM, AMRAP если радио играет)
			if (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4) {
				var modeName = window.timerMode == 2 ? 'HIIT' : window.timerMode == 3 ? 'EMOM' : 'AMRAP';
				if (typeof window.logRadio === 'function') {
					window.logRadio('startButtonPushed: инициализация ползунка громкости для режима ' + modeName, {});
				}
				
				initTimerVolumeSlider();
				// Проверяем, играет ли радио и показываем ползунок
				var radioAudio = document.getElementById('radio-audio');
				if (radioAudio && !radioAudio.paused && radioAudio.src) {
					if (typeof window.logRadio === 'function') {
						window.logRadio('startButtonPushed: радио играет, показываем ползунок громкости', {
							radioAudioSrc: radioAudio.src,
							radioAudioPaused: radioAudio.paused
							});
						}
					if (typeof toggleVolumeSliderTimer === 'function') {
						toggleVolumeSliderTimer(true);
					}
				} else {
					if (typeof window.logRadio === 'function') {
						window.logRadio('startButtonPushed: радио не играет, ползунок громкости не показываем', {
							radioAudio: radioAudio ? 'найден' : 'не найден',
							radioAudioPaused: radioAudio ? radioAudio.paused : 'не доступен',
							radioAudioSrc: radioAudio ? radioAudio.src : 'не доступен'
						});
					}
					// Если радио не играет, скрываем ползунок
					if (typeof toggleVolumeSliderTimer === 'function') {
						toggleVolumeSliderTimer(false);
					}
				}
			}
			
			//YA METRICA
		if (window.timerMode==1){
				yaCounter42580049.reachGoal('tabatabuttonstart'); //ЕСЛИ ПЕРВЫЙ РЕЖИМ
			} else {
				yaCounter42580049.reachGoal('tabatabuttonstartsetup'); //ЕСЛИ НАСТРИВАЕМЫЙ РЕЖИМ
			}
		};

		var startTimerWithMusic = function() {
				var audioElement = document.getElementById('sound');
				if (audioElement) {
				if (!audioElement.src || !audioElement.src.includes(window.musicFile)) {
					console.log('Подготовка музыкального файла к воспроизведению перед стартом:', window.musicFile);
					audioElement.src = window.musicFile;
				}

				audioElement.preload = 'auto';
				audioElement.currentTime = 0;

					try {
						var playPromise = audioElement.play();
						if (playPromise !== undefined) {
							playPromise.catch(function(error) {
							console.error('Ошибка запуска музыки:', error);
							});
						}
					} catch (e) {
					console.error('Ошибка при запуске музыки:', e);
				}
			} else {
				console.warn('Аудиоэлемент sound не найден, запускаем таймер без музыки');
			}

			launchTimer();
		};

		if (window.timerMode === 1 && window.musicFile) {
			console.log('Ожидаем подготовку музыки перед стартом таймера');
			waitForMusicReady().then(function() {
				startTimerWithMusic();
			});
			} else {
			launchTimer();
        }
    };
    
    this.stopButtonPushed = function() {
        console.log('stopButtonPushed вызван');
        
        // Воспроизводим звук stop.mp3 при нажатии на кнопку СТОП (действие пользователя)
        if (typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        // Остановка таймера и сброс флагов
            tabatatimer.stop();
        tabatatimer.reset();
            isPaused = false;
        stopped = true;

        // Событие для внешних модулей (например, динамический фон Unsplash)
        try {
            window.dispatchEvent(new CustomEvent('tabata:stopped', { detail: { mode: window.timerMode } }));
        } catch (e) {}
        
        // Сбрасываем флаги звуков при остановке таймера
        countdownSoundPlayed = false;
        finishSoundPlayed = false;
        lastPhase = -1;
        
        // Остановка музыки в обоих режимах
        if (window.timerMode == 1) { // Режим Табата
            var audioElement = document.getElementById('sound');
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
                console.log('Музыка остановлена в режиме Табата');
            }
        } else if (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4) { // Режимы HIIT, EMOM, AMRAP
            var radioAudio = document.getElementById('radio-audio');
            if (radioAudio) {
                radioAudio.pause();
                radioAudio.currentTime = 0;
                console.log('Радио остановлено в режиме ' + (window.timerMode == 2 ? 'HIIT' : window.timerMode == 3 ? 'EMOM' : 'AMRAP'));
            }
        }
        
        // Скрываем и удаляем ползунок громкости во время тренировки в любом режиме
        if (typeof toggleVolumeSliderTimer === 'function') {
            toggleVolumeSliderTimer(false);
        }
        var volumeContainerTimer = document.getElementById('radio-volume-container-timer');
        if (volumeContainerTimer) {
            volumeContainerTimer.remove();
        }
        
        // Возвращаем текст "ВСЕГО РАУНДОВ" и общее количество в режиме Табата при сбросе
        if (window.timerMode == 1) {
            var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
            var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
            if (roundsTotalLabel) {
                roundsTotalLabel.textContent = 'ВСЕГО РАУНДОВ';
            }
            if (roundsTotalCount) {
                roundsTotalCount.textContent = tabatatimer.cyclesSetting.toString();
            }
        }
        
        // Возвращаем текст "Раундов" и "Циклов" в режиме HIIT при сбросе
        if (window.timerMode == 2) {
            var roundsLabelHiit = document.getElementById('tabata-rounds-label-hiit');
            var cyclesLabelHiit = document.getElementById('tabata-cycles-label-hiit');
            if (roundsLabelHiit) {
                roundsLabelHiit.textContent = 'Раундов';
            }
            if (cyclesLabelHiit) {
                cyclesLabelHiit.textContent = 'Циклов';
            }
        }
        
        // Определяем, находимся ли мы в активной тренировке
        if (tabatatimer.sessionPhase !== tabatatimer.sessionPhases.start) {
            // Показываем экран завершения
            document.getElementById('tt_main_wrap').style.display = "none";
            document.getElementById('tt_main_end_wrap').style.display = "block";
            document.getElementById('backtotimer').style.display = "block";
            
            // Отображаем мотивационную цитату
            const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
            const quoteText = document.getElementById('quoteText');
            const quoteAuthor = document.getElementById('quoteAuthor');
            const quoteImage = document.getElementById('quoteImage');
            
            if (quoteText && quoteAuthor && quoteImage) {
                quoteText.textContent = randomQuote.quote;
                quoteAuthor.textContent = randomQuote.author;
                quoteImage.src = randomQuote.image;
            }
            
            // Вызываем функцию для подбора размера шрифта
            if (typeof adjustQuoteFontSize === 'function') {
                adjustQuoteFontSize();
            }
        } else {
            // Возвращаемся на экран настроек
        document.getElementById('modeSelector').style.display = "flex";
        
        // Удаляем класс workout-running при остановке тренировки
        document.body.classList.remove('workout-running');
        
        if (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4) {
            document.getElementById('controls').style.display = "block";
            document.getElementById('playlistField').style.display = "none";
        } else {
            document.getElementById('controls').style.display = "none";
            document.getElementById('playlistField').style.display = "block";
			this.zero();
			// Инициализируем селектор упражнений для режима Tabata
			if (typeof window.ExerciseManager !== 'undefined' && window.ExerciseManager.init) {
				setTimeout(function() {
					window.ExerciseManager.init();
				}, 100);
			}
		}
            
            // Обновляем отображение кнопок
            document.getElementById('startbutton').style.display = "block";
            document.getElementById('pausebutton').style.display = "none";
            document.getElementById('resetbutton').style.display = "none";
            
            // Обновляем счетчики в зависимости от режима
            if (window.timerMode == 3 || window.timerMode == 4) {
                // Для режимов EMOM и AMRAP показываем счетчики в формате "число/всего"
                document.getElementById('tt_number_ui').style.display = "block";
                document.getElementById('currentcycle').style.display = "none";
                document.getElementById('tt_number_ui2').style.display = "none";
                document.getElementById('currenttabata').style.display = "none";
                document.getElementById('tt_cycles_label').style.display = "block";
                document.getElementById('tt_tabatas_label').style.display = "none";
            } else {
                // Для режимов Табата и HIIT показываем в формате "число"
		document.getElementById('tt_number_ui').style.display = "none";
		document.getElementById('currentcycle').style.display = "block";
		document.getElementById('tt_number_ui2').style.display = "none";
		document.getElementById('currenttabata').style.display = "block";
		document.getElementById('tt_cycles_label').style.display = "block";
                if (window.timerMode == 2) {
		document.getElementById('tt_tabatas_label').style.display = "block";
                } else {
                    document.getElementById('tt_tabatas_label').style.display = "none";
                }
            }
        }
        
        // Удаляем старый прогресс-бар, если он существует
        var progressContainer = document.getElementById('progress-bar-container');
        if (progressContainer) {
            progressContainer.remove();
        }
        
        // Создаем пустой прогресс-бар по умолчанию для единого стиля
        setTimeout(function() {
            createDefaultProgressBar();
        }, 100);
        
        // Синхронизируем состояние упражнения
        if (window.ExerciseManager) {
            window.ExerciseManager.sync();
        }
        
        // Отправляем метрику
        if (typeof yaCounter42580049 !== 'undefined') {
		yaCounter42580049.reachGoal('tabatabuttonstop');
        }
    };
	
	this.backButtonPushed = function() {
		stopped = true;
		
		// Сбрасываем состояние паузы
        isPaused = false;
        
        // Полностью сбрасываем таймер и его состояние
        tabatatimer.reset();
        
        // Синхронизуем состояние упражнения
        if (window.ExerciseManager) {
            window.ExerciseManager.sync();
        }
        
        // Останавливаем звуки только в режиме Табата (1)
        // В режиме HIIT (2) радио продолжает играть
        if (window.timerMode == 1) {
            var radioElement = document.getElementById('sound');
            if (radioElement) {
                radioElement.pause();
                radioElement.currentTime = 0;
                console.log('Звук (sound) остановлен в режиме Табата при нажатии "Назад к таймеру"');
            }
        }
        
        // Восстанавливаем элементы для режимов EMOM и AMRAP
        if (window.timerMode == 3) {
            // Режим EMOM - показываем элементы EMOM обратно
            var emomTimerRow = document.getElementById('emom-timer-row-wrapper');
            if (emomTimerRow) {
                emomTimerRow.style.display = 'flex';
            }
            var emomContainer = document.getElementById('emom-timer-container');
            if (emomContainer) {
                emomContainer.style.display = 'block';
            }
            // Восстанавливаем класс emom-active для правильной работы режима
            document.body.classList.add('emom-active');
        } else if (window.timerMode == 4) {
            // Режим AMRAP - показываем элементы AMRAP обратно
            var amrapTimerRow = document.getElementById('amrap-timer-row-wrapper');
            if (amrapTimerRow) {
                amrapTimerRow.style.display = 'flex';
            }
            var amrapContainer = document.getElementById('amrap-timer-container');
            if (amrapContainer) {
                amrapContainer.style.display = 'block';
            }
            // Восстанавливаем класс amrap-active для правильной работы режима
            document.body.classList.add('amrap-active');
        }

        document.getElementById('tt_main_wrap').style.display = "block";
        document.getElementById('tt_main_end_wrap').style.display = "none";
        
        // Скрываем результаты AMRAP в экране с цитатами
        var amrapResultsInQuotes = document.getElementById('amrap-results-in-quotes');
        if (amrapResultsInQuotes) {
            amrapResultsInQuotes.style.display = 'none';
        }

        // Удаляем или скрываем прогресс-бар при возврате к главному экрану таймера
        var progressContainer = document.getElementById('progress-bar-container');
        if (progressContainer) {
            progressContainer.remove(); // Удаляем элемент полностью
        }

        // Удаляем ползунок громкости во время тренировки при возврате к главному экрану
        var volumeContainerTimer = document.getElementById('radio-volume-container-timer');
        if (volumeContainerTimer) {
            volumeContainerTimer.remove();
        }
        
        // Скрываем ползунок громкости во время тренировки
        if (typeof toggleVolumeSliderTimer === 'function') {
            toggleVolumeSliderTimer(false);
        }

        document.getElementById('modeSelector').style.display = "flex";
        
        // Удаляем класс workout-running при возврате на экран настроек
        document.body.classList.remove('workout-running');
        
        // Явно скрываем кнопку "Назад к таймеру" и проверяем её статус
        document.getElementById('backtotimer').style.display = "none";
        console.log('backButtonPushed called, backtotimer display state:', document.getElementById('backtotimer').style.display);
        
        // Сбрасываем интерфейс таймера
        document.getElementById('tt_clock_wrap').className = "tt_clock_default";
        document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.workout;
        document.getElementById('currenttime').innerHTML = '<span>' + convertTimeFormat(totalWorkoutTime()) + '</span>';
        
        // Выбираем соответствующий режим в зависимости от используемого режима
        if (window.timerMode == 2) {
            // Выбираем режим "HIIT"
            document.getElementById('extendedMode').checked = true;
            document.getElementById('tabataMode').checked = false;
            document.getElementById('controls').style.display = "block";
            document.getElementById('playlistField').style.display = "none";
            // Показываем соответствующие элементы для настраиваемого режима
            document.getElementById('tt_cycles_wrap').classList.remove("tt_cycles_hide");
            document.getElementById('tt_tabatas_wrap').style.display = "block";
        } else {
            // Выбираем режим "Табата"
            document.getElementById('tabataMode').checked = true;
            document.getElementById('extendedMode').checked = false;
            document.getElementById('controls').style.display = "none";
            document.getElementById('playlistField').style.display = "block";
            // Скрываем соответствующие элементы для режима Табата
            document.getElementById('tt_cycles_wrap').classList.add("tt_cycles_hide");
            document.getElementById('tt_tabatas_wrap').style.display = "none";
        }

        document.getElementById('startbutton').style.display = "block";
        document.getElementById('pausebutton').style.display = "none";
        document.getElementById('resetbutton').style.display = "none";
        
        document.getElementById('tt_number_ui').style.display = "none";
        document.getElementById('currentcycle').style.display = "block";
        document.getElementById('tt_number_ui2').style.display = "none";
        document.getElementById('currenttabata').style.display = "block";
        document.getElementById('tt_cycles_label').style.display = "block";
        document.getElementById('tt_tabatas_label').style.display = "block";

        // Возвращаем текст "ВСЕГО РАУНДОВ" и общее количество в режиме Табата при возврате к таймеру
        if (window.timerMode == 1) {
            var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
            var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
            if (roundsTotalLabel) {
                roundsTotalLabel.textContent = 'ВСЕГО РАУНДОВ';
            }
            if (roundsTotalCount) {
                roundsTotalCount.textContent = tabatatimer.cyclesSetting.toString();
            }
        }
        
        // Возвращаем текст "Раундов" и "Циклов" в режиме HIIT при возврате к таймеру
        if (window.timerMode == 2) {
            var roundsLabelHiit = document.getElementById('tabata-rounds-label-hiit');
            var cyclesLabelHiit = document.getElementById('tabata-cycles-label-hiit');
            if (roundsLabelHiit) {
                roundsLabelHiit.textContent = 'Раундов';
            }
            if (cyclesLabelHiit) {
                cyclesLabelHiit.textContent = 'Циклов';
            }
        }

        isPaused = false;
        
        yaCounter42580049.reachGoal('tabatabuttonbacktotimer');
    };
	
	this.radioTabataClick = function() {
		// Принудительно останавливаем радио при переключении на режим Табата
		var radioElement = document.getElementById('sound');
		if (radioElement) {
			radioElement.pause();
			radioElement.currentTime = 0;
			console.log('Радио (sound) остановлено при переключении на режим Табата из radioTabataClick');
		}
		
		// Останавливаем радио-плеер
		var radioAudio = document.getElementById('radio-audio');
		if (radioAudio) {
			radioAudio.pause();
			radioAudio.currentTime = 0;
			console.log('Радио (radio-audio) остановлено при переключении на режим Табата из radioTabataClick');
		}
		
		// Устанавливаем значения по умолчанию для режима Табата
		tabatatimer.preparationTimeSetting = 10;
		tabatatimer.workTimeSetting = 20;
		
		// Инициализируем селектор упражнений для режима Tabata
		if (typeof window.ExerciseManager !== 'undefined' && window.ExerciseManager.init) {
			setTimeout(function() {
				window.ExerciseManager.init();
			}, 100);
		}
		tabatatimer.restTimeSetting = 10;
		tabatatimer.cyclesSetting = 8;
		tabatatimer.tabatasSetting = 1;
		
		// Сбрасываем текущий цикл и табату
		tabatatimer.currentCycle = 1;
		tabatatimer.currentTabata = 1;
		tabatatimer.sessionPhase = tabatatimer.sessionPhases.start;
		
		// Обновляем UI
        changeLayoutState();
		document.getElementById('tt_cycles_wrap').classList.add("tt_cycles_hide");
		document.getElementById('tt_tabatas_wrap').style.display = "none";
		
		// Скрываем счетчики в формате 01/8 в режиме Табата
		document.getElementById('tt_number_ui').style.display = "none";
		document.getElementById('tt_number_ui2').style.display = "none";
		document.getElementById('currentcycle').style.display = "block";
		document.getElementById('currenttabata').style.display = "block";
		
		// Убираем прогресс-бар если он есть
		var progressContainer = document.getElementById('progress-bar-container');
		if (progressContainer) {
			progressContainer.remove();
		}
		
		// Удаляем ползунок громкости во время тренировки при переключении на режим Табата
		var volumeContainerTimer = document.getElementById('radio-volume-container-timer');
		if (volumeContainerTimer) {
			volumeContainerTimer.remove();
		}
		
		// Скрываем ползунок громкости во время тренировки
		if (typeof toggleVolumeSliderTimer === 'function') {
			toggleVolumeSliderTimer(false);
		}
	}
	
	this.radioSettingsClick = function() {
		document.getElementById('tt_cycles_wrap').classList.remove("tt_cycles_hide");
		document.getElementById('tt_tabatas_wrap').style.display = "block";
		
		// Инициализируем селектор упражнений для режимов HIIT, EMOM, AMRAP
		if (typeof window.ExerciseManager !== 'undefined' && window.ExerciseManager.init) {
			setTimeout(function() {
				window.ExerciseManager.init();
			}, 100);
		}
		
		// Инициализируем HIIT селекторы, если мы в режиме HIIT
		if (window.timerMode === 2) {
			this.initHiitSelectors();
		}
	}
	
	// Инициализация HIIT селекторов (карусель)
	this.initHiitSelectors = function() {
		// Функция для обновления отображения общего времени тренировки
		var updateTotalWorkoutTimeDisplay = function() {
			if (window.timerMode == 2 && (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start || stopped)) {
				var currentTimeEl = document.getElementById('currenttime');
				if (currentTimeEl) {
					var timeSpan = currentTimeEl.getElementsByTagName('span')[0];
					if (timeSpan) {
						timeSpan.innerHTML = convertTimeFormat(totalWorkoutTime());
					}
				}
			}
		};
		var self = this;
		
		// Функция для форматирования времени в строку (секунды без формата или MM:SS)
		function formatTimePreset(totalSeconds) {
			var mins = Math.floor(totalSeconds / 60);
			var secs = totalSeconds % 60;
			// Если меньше минуты, показываем только секунды
			if (mins === 0) {
				return secs.toString();
			}
			// Если минута и больше, показываем MM:SS
			return (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs);
		}
		
		// Функция для генерации пресетов времени
		function generateTimePresets(minSeconds, maxSeconds, stepSeconds) {
			var presets = [];
			for (var seconds = minSeconds; seconds <= maxSeconds; seconds += stepSeconds) {
				presets.push({
					value: seconds,
					label: formatTimePreset(seconds)
				});
			}
			return presets;
		}
		
		// Функция для заполнения селектора пресетами
		function populatePresetSelect(select, presets, currentValue) {
			if (!select) return;
			select.innerHTML = '';
			var closestValue = presets[0].value;
			var minDiff = Math.abs(currentValue - closestValue);
			
			presets.forEach(function(preset) {
				var option = document.createElement('option');
				option.value = preset.value;
				option.textContent = preset.label;
				select.appendChild(option);
				
				// Находим ближайшее значение
				var diff = Math.abs(currentValue - preset.value);
				if (diff < minDiff) {
					minDiff = diff;
					closestValue = preset.value;
				}
			});
			
			// Устанавливаем ближайшее значение
			select.value = closestValue;
			return closestValue;
		}
		
		// Функция для заполнения числового селектора
		function populateNumberSelect(select, max, defaultValue) {
			if (!select) return;
			select.innerHTML = '';
			for (var i = 1; i <= max; i++) {
				var option = document.createElement('option');
				option.value = i;
				option.textContent = i.toString();
				select.appendChild(option);
			}
			if (defaultValue !== undefined && defaultValue >= 1 && defaultValue <= max) {
				select.value = defaultValue;
			}
		}
		
		// Генерируем пресеты для разных настроек
		// Готовимся: от 5 до 60 секунд с шагом 5 секунд
		var preparePresets = generateTimePresets(5, 60, 5);
		var prepareSelect = document.getElementById('hiit-prepare-select');
		if (prepareSelect) {
			var selectedPrepare = populatePresetSelect(prepareSelect, preparePresets, tabatatimer.preparationTimeSetting);
			tabatatimer.preparationTimeSetting = selectedPrepare;
			prepareSelect.addEventListener('change', function() {
				tabatatimer.preparationTimeSetting = parseInt(prepareSelect.value, 10) || 10;
				self.invalidate();
				updateTotalWorkoutTimeDisplay();
			});
		}
		
		// Работаем: короткие интервалы (10-55 сек) и длинные (1-5 мин с шагом 5 секунд)
		var workPresets = [
			...generateTimePresets(10, 55, 5), // 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 секунд
			...generateTimePresets(60, 300, 5) // 1:00, 1:05, 1:10, 1:15, 1:20, 1:25, 1:30, 1:35, 1:40, 1:45, 1:50, 1:55, 2:00, ..., 5:00
		];
		var workSelect = document.getElementById('hiit-work-select');
		if (workSelect) {
			var selectedWork = populatePresetSelect(workSelect, workPresets, tabatatimer.workTimeSetting);
			tabatatimer.workTimeSetting = selectedWork;
			workSelect.addEventListener('change', function() {
				tabatatimer.workTimeSetting = parseInt(workSelect.value, 10) || 20;
				self.invalidate();
				updateTotalWorkoutTimeDisplay();
			});
		}
		
		// Отдыхаем: от 5 до 120 секунд с шагом 5 секунд
		var restPresets = generateTimePresets(5, 120, 5);
		var restSelect = document.getElementById('hiit-rest-select');
		if (restSelect) {
			var selectedRest = populatePresetSelect(restSelect, restPresets, tabatatimer.restTimeSetting);
			tabatatimer.restTimeSetting = selectedRest;
			restSelect.addEventListener('change', function() {
				tabatatimer.restTimeSetting = parseInt(restSelect.value, 10) || 10;
				self.invalidate();
				updateTotalWorkoutTimeDisplay();
			});
		}
		
		// Раунды: от 1 до 99
		var cyclesSelect = document.getElementById('hiit-cycles-select');
		if (cyclesSelect) {
			populateNumberSelect(cyclesSelect, 99, tabatatimer.cyclesSetting);
			cyclesSelect.addEventListener('change', function() {
				tabatatimer.cyclesSetting = parseInt(cyclesSelect.value, 10) || 8;
				self.invalidate();
				updateTotalWorkoutTimeDisplay();
			});
		}
		
		// Циклы: от 1 до 99
		var tabatasSelect = document.getElementById('hiit-tabatas-select');
		if (tabatasSelect) {
			populateNumberSelect(tabatasSelect, 99, tabatatimer.tabatasSetting);
			tabatasSelect.addEventListener('change', function() {
				tabatatimer.tabatasSetting = parseInt(tabatasSelect.value, 10) || 1;
				self.invalidate();
				updateTotalWorkoutTimeDisplay();
			});
		}
		
		// Отдых между циклами: от 10 секунд до 5 минут с шагом 10 секунд
		var cyclerestPresets = generateTimePresets(10, 300, 10);
		var cyclerestSelect = document.getElementById('hiit-cyclerest-select');
		if (cyclerestSelect) {
			var selectedCycleRest = populatePresetSelect(cyclerestSelect, cyclerestPresets, tabatatimer.cycleRestTimeSetting);
			tabatatimer.cycleRestTimeSetting = selectedCycleRest;
			cyclerestSelect.addEventListener('change', function() {
				tabatatimer.cycleRestTimeSetting = parseInt(cyclerestSelect.value, 10) || 60;
				self.invalidate();
				updateTotalWorkoutTimeDisplay();
			});
		}
		
		// Показываем HIIT селекторы и скрываем старые элементы
		var hiitWrapper = document.getElementById('hiit-selects-wrapper');
		if (hiitWrapper) {
			hiitWrapper.style.display = 'block';
		}
		
		// Обновляем отображение общего времени при инициализации
		updateTotalWorkoutTimeDisplay();
	}

    this.resetButtonPushed = function() {
        console.log('resetButtonPushed вызван');
        
        // Сбрасываем состояние паузы
        isPaused = false;
        document.getElementById('pausebutton').className = "tt_big_button button";
        document.getElementById('pausebutton').innerHTML = labels.pause;
        
        // Сбрасываем и перезапускаем таймер
        tabatatimer.reset();
        this.startButtonPushed();
        
        // Синхронизуем состояние упражнения
        if (window.ExerciseManager) {
            window.ExerciseManager.sync();
        }
        
        //YA METRICA 
        yaCounter42580049.reachGoal('tabatabuttonreset');
    };
    
    // Обработчик нажатия кнопки "Пауза"
    this.pauseButtonPushed = function() {
        console.log('pauseButtonPushed вызван');
        
        // Воспроизводим звук stop.mp3 при нажатии на кнопку ПАУЗА или ПРОДОЛЖИТЬ (действие пользователя)
        if (typeof playStopSound === 'function') {
            playStopSound(true);
        }
        
        if (!isPaused) {
            // Режим паузы: останавливаем таймер, но не сбрасываем
            document.getElementById('pausebutton').className = "tt_big_button button green";
            document.getElementById('pausebutton').innerHTML = "Продолжить";
            isPaused = true;
            
            // Приостанавливаем таймер
            tabatatimer.stop();

            // Событие для внешних модулей (например, динамический фон Unsplash)
            try {
                window.dispatchEvent(new CustomEvent('tabata:paused', { detail: { mode: window.timerMode } }));
            } catch (e) {}
            
            // Приостанавливаем воспроизведение музыки/радио в зависимости от режима
            if (window.timerMode == 1) {  // Режим Табата
                var audioElement = document.getElementById('sound');
                if (audioElement) {
                    audioElement.pause();
                    console.log('Музыка поставлена на паузу в режиме Табата');
                }
            } else if (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4) {  // Режимы HIIT, EMOM, AMRAP
                var radioAudio = document.getElementById('radio-audio');
                if (radioAudio) {
                    radioAudio.pause();
                    console.log('Радио поставлено на паузу в режиме ' + (window.timerMode == 2 ? 'HIIT' : window.timerMode == 3 ? 'EMOM' : 'AMRAP'));
                }
            }
            
            // Синхронизируем состояние упражнения
            if (window.ExerciseManager) {
                window.ExerciseManager.sync();
            }
            
            console.log('Таймер приостановлен');
        } else {
            // Режим продолжения: возобновляем таймер
            document.getElementById('pausebutton').className = "tt_big_button button";
            document.getElementById('pausebutton').innerHTML = "Пауза";
            isPaused = false;
            
            // Запускаем таймер снова
            tabatatimer.start();

            // Событие для внешних модулей (например, динамический фон Unsplash)
            try {
                window.dispatchEvent(new CustomEvent('tabata:resumed', { detail: { mode: window.timerMode } }));
            } catch (e) {}
            
            // Возобновляем воспроизведение музыки/радио
            if (window.timerMode == 1) {  // Режим Табата
                var audioElement = document.getElementById('sound');
                if (audioElement) {
                    audioElement.play();
                    console.log('Музыка возобновлена в режиме Табата');
                }
            } else if (window.timerMode == 2 || window.timerMode == 3 || window.timerMode == 4) {  // Режимы HIIT, EMOM, AMRAP
                var radioAudio = document.getElementById('radio-audio');
                if (radioAudio) {
                    radioAudio.play();
                    console.log('Радио возобновлено в режиме ' + (window.timerMode == 2 ? 'HIIT' : window.timerMode == 3 ? 'EMOM' : 'AMRAP'));
                }
            }
            
            // Синхронизируем состояние упражнения
            if (window.ExerciseManager) {
                window.ExerciseManager.sync();
            }
            
            console.log('Таймер возобновлен');
        }
    };

    this.timerInvalidate = function() {
        var timeFormat;
        
        // Для режимов EMOM и AMRAP используем специальную логику отображения
        if (window.timerMode == 3) {
            // Режим EMOM - показываем время работы/отдыха
            if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                timeFormat = convertTimeFormat(tabatatimer.workTimeSetting);
            } else {
                timeFormat = convertTimeFormat(tabatatimer.currentTime);
            }
        } else if (window.timerMode == 4) {
            // Режим AMRAP - показываем время текущей фазы
            if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.start) {
                timeFormat = convertTimeFormat(tabatatimer.workTimeSetting);
            } else if (tabatatimer.amrapTotalTime > 0) {
                timeFormat = convertTimeFormat(tabatatimer.currentTime);
            } else {
                timeFormat = convertTimeFormat(tabatatimer.workTimeSetting);
            }
        } else {
            timeFormat = convertTimeFormat(tabatatimer.currentTime);
        }
        
        document.getElementById('currenttime').innerHTML = '<span>' + timeFormat + '</span>';
        
        // Если находимся в режиме работы, воспроизводим звук работы
        if (window.timerMode == 1 && tabatatimer.sessionPhase === tabatatimer.sessionPhases.work && !workAudioPlayed) {
            console.log('Воспроизводим звук для фазы "Работа"');
            if (!isRadioPlaying()) {
                var soundsObj = window.sounds || sounds;
                if (soundsObj && soundsObj.start) {
                    playSound(soundsObj.start);
                }
            }
            workAudioPlayed = true;
        }
        
        // Обновляем прогресс-бар, если он существует
        updateProgressBar(tabatatimer.currentTime, getCurrentPhaseDuration());
    };

    this.timerPhaseChange = function() {
        console.log('Смена фазы таймера: ' + tabatatimer.sessionPhase);
        workAudioPlayed = false; // Сбрасываем флаг при смене фазы
        
        // Вызываем функцию phaseEnter для обновления отображения счетчиков
        phaseEnter(tabatatimer.sessionPhase);
        
        if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.end) {
            delegate['sessionEnded'].call(tabatatimer);
            return;
        }
        
        // Синхронизируем упражнения с таймером при смене фазы
        // Особенно важно для режима HIIT с включенной синхронизацией упражнений с раундами
        setTimeout(function() {
            if (window.exerciseSelector && typeof window.exerciseSelector.sync === 'function') {
                window.exerciseSelector.sync();
            } else if (window.ExerciseManager && typeof window.ExerciseManager.sync === 'function') {
                // Fallback на ExerciseManager
                window.ExerciseManager.sync();
            } else {
                console.warn('[Timer Phase Change] exerciseSelector не найден');
            }
        }, 50); // Небольшая задержка, чтобы фаза точно обновилась
        
        // В режиме HIIT воспроизводим звуки только если радио не играет
        if (window.timerMode == 2 && !isRadioPlaying()) {
            var soundsObj = window.sounds || sounds;
            // Используем подходящие звуки в зависимости от фазы
            if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.prepare) {
                if (soundsObj && soundsObj.countdown) {
                    playSound(soundsObj.countdown);
                console.log('Воспроизводим подготовительный звук в режиме HIIT');
                }
            } else if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.work) {
                if (soundsObj && soundsObj.start) {
                    playSound(soundsObj.start);
                console.log('Воспроизводим звук "старт" для работы в режиме HIIT');
                }
            } else if (tabatatimer.sessionPhase === tabatatimer.sessionPhases.rest) {
                if (soundsObj && soundsObj.start) {
                    playSound(soundsObj.start);
                console.log('Воспроизводим звук "старт" для отдыха в режиме HIIT');
                }
            }
        }
    };
    
    // Функция для обновления интерфейса при смене фазы таймера
    function phaseEnter(phase) {
        console.log('Вход в фазу: ' + phase);
        
        // Обновляем интерфейс в зависимости от фазы
        if (phase === tabatatimer.sessionPhases.prepare) {
            // Фаза подготовки
            document.getElementById('tt_clock_wrap').className = "tt_clock_prepare";
            document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.prepare;
            
            // Обновляем текст "РАУНД" и номер раунда в режиме Табата при переходе в фазу "Готовимся"
            if (window.timerMode == 1 && tabatatimer.isRunning) {
                var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
                var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
                if (roundsTotalLabel && roundsTotalLabel.textContent !== 'РАУНД') {
                    roundsTotalLabel.textContent = 'РАУНД';
                }
                if (roundsTotalCount) {
                    roundsTotalCount.textContent = tabatatimer.currentCycle.toString();
                }
            }
            
            // Показываем счетчики Раундов и Циклов в формате 01/8 для режима HIIT
            if (window.timerMode == 2) {
                document.getElementById('tt_cycles_label').style.display = "block";
                document.getElementById('tt_tabatas_label').style.display = "block";
                document.getElementById('tt_number_ui').style.display = "block";
                document.getElementById('tt_number_ui2').style.display = "block";
                document.getElementById('currentcycle').style.display = "none";
                document.getElementById('currenttabata').style.display = "none";
                
                // Обновляем значения счетчиков
                document.getElementById('currentcycle_i').innerHTML = tabatatimer.currentCycle;
                document.getElementById('currenttabata_i').innerHTML = tabatatimer.currentTabata;
                document.getElementById('allcycles').innerHTML = tabatatimer.cyclesSetting;
                document.getElementById('alltabatas').innerHTML = tabatatimer.tabatasSetting;
            }
        } else if (phase === tabatatimer.sessionPhases.work) {
            // Фаза работы
            document.getElementById('tt_clock_wrap').className = "tt_clock_work";
            document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.work;
            
            // Обновляем текст "РАУНД" и номер раунда в режиме Табата при переходе в фазу "Работаем"
            if (window.timerMode == 1) {
                var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
                var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
                if (roundsTotalLabel && roundsTotalLabel.textContent !== 'РАУНД') {
                    roundsTotalLabel.textContent = 'РАУНД';
                }
                if (roundsTotalCount) {
                    roundsTotalCount.textContent = tabatatimer.currentCycle.toString();
                }
            }
            
            // Показываем счетчики Раундов и Циклов в формате 01/8 для режима HIIT
            if (window.timerMode == 2) {
                document.getElementById('tt_cycles_label').style.display = "block";
                document.getElementById('tt_tabatas_label').style.display = "block";
                document.getElementById('tt_number_ui').style.display = "block";
                document.getElementById('tt_number_ui2').style.display = "block";
                document.getElementById('currentcycle').style.display = "none";
                document.getElementById('currenttabata').style.display = "none";
                
                // Обновляем значения счетчиков
                document.getElementById('currentcycle_i').innerHTML = tabatatimer.currentCycle;
                document.getElementById('currenttabata_i').innerHTML = tabatatimer.currentTabata;
                document.getElementById('allcycles').innerHTML = tabatatimer.cyclesSetting;
                document.getElementById('alltabatas').innerHTML = tabatatimer.tabatasSetting;
            }
        } else if (phase === tabatatimer.sessionPhases.rest) {
            // Фаза отдыха
            document.getElementById('tt_clock_wrap').className = "tt_clock_rest";
            document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.rest;
            
            // Обновляем номер раунда в режиме Табата при переходе в фазу "Отдыхаем"
            if (window.timerMode == 1) {
                var roundsTotalLabel = document.querySelector('#tabata-rounds-total-info-tabata .tabata-label');
                var roundsTotalCount = document.getElementById('tabata-rounds-total-count');
                if (roundsTotalLabel && roundsTotalLabel.textContent !== 'РАУНД') {
                    roundsTotalLabel.textContent = 'РАУНД';
                }
                if (roundsTotalCount) {
                    // currentCycle уже увеличен в calculateNextPhase перед входом в rest
                    roundsTotalCount.textContent = tabatatimer.currentCycle.toString();
                }
            }
            
            // Показываем счетчики Раундов и Циклов в формате 01/8 для режима HIIT
            if (window.timerMode == 2) {
                document.getElementById('tt_cycles_label').style.display = "block";
                document.getElementById('tt_tabatas_label').style.display = "block";
                document.getElementById('tt_number_ui').style.display = "block";
                document.getElementById('tt_number_ui2').style.display = "block";
                document.getElementById('currentcycle').style.display = "none";
                document.getElementById('currenttabata').style.display = "none";
                
                // Обновляем значения счетчиков
                document.getElementById('currentcycle_i').innerHTML = tabatatimer.currentCycle;
                document.getElementById('currenttabata_i').innerHTML = tabatatimer.currentTabata;
                document.getElementById('allcycles').innerHTML = tabatatimer.cyclesSetting;
                document.getElementById('alltabatas').innerHTML = tabatatimer.tabatasSetting;
            }
        } else if (phase === tabatatimer.sessionPhases.cycleRest) {
            // Фаза отдыха между циклами
            document.getElementById('tt_clock_wrap').className = "tt_clock_rest";
            document.getElementById('tt_clock_label').getElementsByTagName('span')[0].innerHTML = labels.cycleRest;
            
            // Показываем счетчики Раундов и Циклов в формате 01/8 для режима HIIT
            if (window.timerMode == 2) {
                document.getElementById('tt_cycles_label').style.display = "block";
                document.getElementById('tt_tabatas_label').style.display = "block";
                document.getElementById('tt_number_ui').style.display = "block";
                document.getElementById('tt_number_ui2').style.display = "block";
                document.getElementById('currentcycle').style.display = "none";
                document.getElementById('currenttabata').style.display = "none";
                
                // Обновляем значения счетчиков (показываем следующий цикл)
                document.getElementById('currentcycle_i').innerHTML = 1;
                document.getElementById('currenttabata_i').innerHTML = tabatatimer.currentTabata + 1;
                document.getElementById('allcycles').innerHTML = tabatatimer.cyclesSetting;
                document.getElementById('alltabatas').innerHTML = tabatatimer.tabatasSetting;
            }
        }
	}
}

// Добавляем слушатель события после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем основной модуль таймера');
    
    // Проверка существования объекта newtimer
    if (typeof window.newtimer === 'undefined') {
        // Создаем новый экземпляр контроллера, если его нет
        console.log('Объект newtimer не найден, создаем новый');
        window.newtimer = new STTabataTimerViewController();
        
        // Явно устанавливаем режим Табата по умолчанию
        window.newtimer.timerMode = 1;
        console.log('Режим таймера по умолчанию установлен: Табата (1)');
    } else {
        console.log('Объект newtimer уже существует');
    }
    
    // Проверяем текущий хэш при загрузке
    if (window.location.hash === '#timer') {
        console.log('Страница загружена с хэшем #timer, предзагружаем музыку');
        // Делаем небольшую задержку, чтобы дать время инициализировать UI
        setTimeout(preloadTabataMusic, 500);
    }
    
    // Добавляем обработчик изменения хэша для предзагрузки музыки при переходе на таймер
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#timer') {
            console.log('Переход на #timer, предзагружаем музыку');
            // Делаем небольшую задержку для завершения анимации перехода
            setTimeout(preloadTabataMusic, 300);
        }
    });
    
    // Обеспечиваем глобальную доступность объекта newtimer
    console.log('Делаем newtimer глобальным объектом');
    window.newtimer = window.newtimer || newtimer;
    
    // Создаем пустой прогресс-бар по умолчанию для единого стиля при загрузке страницы
    setTimeout(function() {
        if (typeof createDefaultProgressBar === 'function') {
            createDefaultProgressBar();
        }
    }, 200);
    
    // Инициализация отображения счетчиков при загрузке страницы
    setTimeout(function() {
        // Проверяем текущий режим таймера
        var timerMode = window.timerMode || (window.newtimer ? window.newtimer.timerMode : 1);
        
        // Удаляем ползунок громкости во время тренировки при инициализации (если он остался от предыдущей сессии)
        var volumeContainerTimer = document.getElementById('radio-volume-container-timer');
        if (volumeContainerTimer) {
            volumeContainerTimer.remove();
        }
        
        if (timerMode == 1) {
            // Режим Табата - скрываем счетчики в формате 01/8
            var ttNumberUi = document.getElementById('tt_number_ui');
            var ttNumberUi2 = document.getElementById('tt_number_ui2');
            var currentCycle = document.getElementById('currentcycle');
            var currentTabata = document.getElementById('currenttabata');
            
            if (ttNumberUi) ttNumberUi.style.display = "none";
            if (ttNumberUi2) ttNumberUi2.style.display = "none";
            if (currentCycle) currentCycle.style.display = "block";
            if (currentTabata) currentTabata.style.display = "block";
        } else if (timerMode == 2) {
            // Режим HIIT - скрываем счетчики в формате 01/8 при инициализации (они покажутся при запуске таймера)
            var ttNumberUi = document.getElementById('tt_number_ui');
            var ttNumberUi2 = document.getElementById('tt_number_ui2');
            var currentCycle = document.getElementById('currentcycle');
            var currentTabata = document.getElementById('currenttabata');
            
            if (ttNumberUi) ttNumberUi.style.display = "none";
            if (ttNumberUi2) ttNumberUi2.style.display = "none";
            if (currentCycle) currentCycle.style.display = "block";
            if (currentTabata) currentTabata.style.display = "block";
        }
    }, 100);
    
    // Удаляем встроенные обработчики onclick из кнопок + и -
    var decreaseButton = document.getElementById('tt_setting_decrease');
    var increaseButton = document.getElementById('tt_setting_increase');
    
    if (decreaseButton) {
        decreaseButton.onclick = null;
        decreaseButton.removeAttribute('onclick');
        console.log('Атрибут onclick удален из кнопки -');
    }
    
    if (increaseButton) {
        increaseButton.onclick = null;
        increaseButton.removeAttribute('onclick');
        console.log('Атрибут onclick удален из кнопки +');
    }

    // Находим кнопку по ID
    var backButton = document.getElementById('backtotimer');
    
    if (backButton) {
        // Добавляем прямой обработчик клика
        backButton.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение
            
            // Вызываем метод backButtonPushed объекта newtimer
            if (window.newtimer) {
                window.newtimer.backButtonPushed();
            }
        });
    }
    
    // Находим кнопку старт
    var startButton = document.getElementById('startbutton');
    
    if (startButton) {
        // Удаляем встроенный обработчик onclick
        startButton.onclick = null;
        startButton.removeAttribute('onclick');
        
        // Добавляем новый обработчик клика
        startButton.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение
            
            console.log('Кнопка старт нажата');
            
            // Вызываем метод startButtonPushed объекта newtimer
            if (window.newtimer) {
                window.newtimer.startButtonPushed();
                console.log('Таймер запущен');
            } else {
                console.error('Ошибка: объект newtimer не определен');
            }
        });
    }
    
    // Находим кнопку пауза
    var pauseButton = document.getElementById('pausebutton');
    
    if (pauseButton) {
        // Удаляем встроенный обработчик onclick
        pauseButton.onclick = null;
        pauseButton.removeAttribute('onclick');
        
        // Добавляем новый обработчик клика для функции pauseButtonPushed
        pauseButton.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение
            
            // Вызываем метод pauseButtonPushed объекта newtimer
            if (window.newtimer) {
                window.newtimer.pauseButtonPushed();
                console.log('Кнопка Пауза нажата');
            } else {
                console.error('Ошибка: объект newtimer не определен');
            }
        });
    }
    
    // Находим кнопку сброс/стоп
    var resetButton = document.getElementById('resetbutton');
    
    if (resetButton) {
        // Удаляем встроенный обработчик onclick
        resetButton.onclick = null;
        resetButton.removeAttribute('onclick');
        
        // Добавляем новый обработчик клика для вызова stopButtonPushed
        resetButton.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение
            
            console.log('Кнопка Стоп нажата');
            
            // Вызываем метод stopButtonPushed объекта newtimer
            if (window.newtimer) {
                window.newtimer.stopButtonPushed();
    } else {
                console.error('Ошибка: объект newtimer не определен');
            }
        });
    }
    
    // Инициализация улучшенных обработчиков для мобильных устройств
    initMobileControls();

    // Отображаем правильные элементы управления в зависимости от режима таймера
    if (window.newtimer) {
        // Устанавливаем принудительно режим Табата (1) как дефолтный режим при инициализации
        window.newtimer.timerMode = 1;
        window.timerMode = 1; // Убеждаемся, что глобальная переменная тоже установлена
        
        // Проверяем и обновляем режим отображения
        document.getElementById('tabataMode').checked = true;
        document.getElementById('extendedMode').checked = false;
        document.getElementById('controls').style.display = "none";
        document.getElementById('playlistField').style.display = "block";
        document.getElementById('tt_cycles_wrap').classList.add("tt_cycles_hide");
        document.getElementById('tt_tabatas_wrap').style.display = "none";
        
        // Обновляем заголовок таймера и субтитлы
        var title = document.getElementById('timerTitle');
        if (title) {
            title.textContent = 'Табата Таймер';
        }
        
        // Обновляем субтитлы при инициализации
        var tabataSubtitle = document.getElementById('tabata-subtitle');
        var hiitSubtitle = document.getElementById('hiit-subtitle');
        var emomSubtitle = document.getElementById('emom-subtitle');
        var amrapSubtitle = document.getElementById('amrap-subtitle');
        
        // Показываем субтитл для режима Табата по умолчанию
        if (tabataSubtitle) tabataSubtitle.style.display = 'block';
        if (hiitSubtitle) hiitSubtitle.style.display = 'none';
        if (emomSubtitle) emomSubtitle.style.display = 'none';
        if (amrapSubtitle) amrapSubtitle.style.display = 'none';
        
        // Обновляем интерфейс таймера после инициализации
        window.newtimer.invalidate();
    }
    
    // Добавляем стили для цветных прогресс-баров
    if (!document.getElementById('progress-bar-styles')) {
        const style = document.createElement('style');
        style.id = 'progress-bar-styles';
        style.textContent = `
            .progress-bar.progress-prepare {
                background-color: #ffd700; /* Желтый цвет для фазы "Готовимся" */
            }
            .progress-bar.progress-work {
                background-color: #ff4d4d; /* Красный цвет для фазы "Работаем" */
            }
            .progress-bar.progress-rest {
                background-color: rgb(122, 245, 255); /* Лазурный цвет для фазы "Отдыхаем" */
            }
            .progress-bar.progress-emom {
                background-color: #4da6ff; /* Голубой цвет для режима EMOM */
            }
            .progress-bar.progress-amrap {
                background-color: #ffcc32; /* Желтый цвет для режима AMRAP */
            }
        `;
        document.head.appendChild(style);
        console.log('Стили для прогресс-баров добавлены');
    }
});

// Функция для инициализации улучшенных обработчиков для мобильных устройств
function initMobileControls() {
    console.log('Инициализация улучшенных обработчиков для мобильных устройств');
    
    // Получаем кнопки увеличения/уменьшения
    var decreaseButton = document.getElementById('tt_setting_decrease');
    var increaseButton = document.getElementById('tt_setting_increase');
    
    if (decreaseButton && increaseButton) {
        console.log('Кнопки найдены, добавляем обработчики');
        
        // Добавляем обработчики для воспроизведения звука при нажатии
        // Эти обработчики будут работать даже с inline-обработчиками
        decreaseButton.addEventListener('mousedown', function(e) {
            playClickSound();
        });
        decreaseButton.addEventListener('touchstart', function(e) {
            playClickSound();
        });
        
        increaseButton.addEventListener('mousedown', function(e) {
            playClickSound();
        });
        increaseButton.addEventListener('touchstart', function(e) {
            playClickSound();
        });
        
        // Удаляем атрибуты onclick, которые могут вызывать дублирование
        decreaseButton.removeAttribute('onclick');
        increaseButton.removeAttribute('onclick');
        
        // Убираем все существующие обработчики событий
        decreaseButton.removeEventListener('touchstart', decreaseTouchStart);
        decreaseButton.removeEventListener('touchend', touchEnd);
        decreaseButton.removeEventListener('touchcancel', touchEnd);
        decreaseButton.removeEventListener('click', decreaseClick);
        decreaseButton.removeEventListener('mousedown', decreaseClick);
        
        increaseButton.removeEventListener('touchstart', increaseTouchStart);
        increaseButton.removeEventListener('touchend', touchEnd);
        increaseButton.removeEventListener('touchcancel', touchEnd);
        increaseButton.removeEventListener('click', increaseClick);
        increaseButton.removeEventListener('mousedown', increaseClick);
        
        // Добавляем обработчики мобильных событий
        // Используем passive: false, так как preventDefault() вызывается в обработчиках
        decreaseButton.addEventListener('touchstart', decreaseTouchStart, { passive: false });
        decreaseButton.addEventListener('touchend', touchEnd);
        decreaseButton.addEventListener('touchcancel', touchEnd);
        
        increaseButton.addEventListener('touchstart', increaseTouchStart, { passive: false });
        increaseButton.addEventListener('touchend', touchEnd);
        increaseButton.addEventListener('touchcancel', touchEnd);
        
        // Добавляем обработчики для десктопа - используем mousedown вместо click
        // mousedown срабатывает только раз при нажатии, а не дважды при нажатии и отпускании
        decreaseButton.addEventListener('mousedown', decreaseClick);
        increaseButton.addEventListener('mousedown', increaseClick);
        
        // Добавляем глобальные обработчики для гарантированной остановки
        document.addEventListener('touchend', globalTouchEnd);
        document.addEventListener('touchcancel', globalTouchEnd);
        document.addEventListener('mouseup', globalMouseUp);
        
        console.log('Обработчики успешно добавлены');
    } else {
        console.log('Ошибка: кнопки не найдены');
        if (!decreaseButton) console.log('Кнопка уменьшения не найдена');
        if (!increaseButton) console.log('Кнопка увеличения не найдена');
    }
}

// Функция для воспроизведения звука клика с защитой от зацикливания
var clickSoundPlaying = false;
var clickSoundTimeout = null;
var clickSoundAudio = null; // Глобальный объект Audio для переиспользования

function playClickSound() {
    // Предотвращаем повторное воспроизведение, если звук уже играет
    if (clickSoundPlaying) {
        return;
    }
    
    try {
        clickSoundPlaying = true;
        
        // Создаем Audio объект только один раз, затем переиспользуем
        if (!clickSoundAudio) {
            clickSoundAudio = new Audio('assets/audio/click.mp3');
            clickSoundAudio.volume = 0.5;
            
            // Обработчик завершения звука
            clickSoundAudio.onended = function() {
                clickSoundPlaying = false;
                if (clickSoundTimeout) {
                    clearTimeout(clickSoundTimeout);
                    clickSoundTimeout = null;
                }
            };
        }
        
        // Сбрасываем позицию воспроизведения на начало
        clickSoundAudio.currentTime = 0;
        
        clickSoundAudio.play().catch(function(e) {
            console.warn('Не удалось воспроизвести звук клика', e);
            clickSoundPlaying = false;
        });
        
        // Защита: если звук не закончился за 300ms, сбрасываем флаг
        if (clickSoundTimeout) {
            clearTimeout(clickSoundTimeout);
        }
        clickSoundTimeout = setTimeout(function() {
            clickSoundPlaying = false;
            clickSoundTimeout = null;
        }, 300);
        
    } catch (e) {
        console.warn('Ошибка при создании звука клика', e);
        clickSoundPlaying = false;
    }
}

// Функция для воспроизведения звука click-effect.mp3 при клике на элементы интерфейса
// С защитой от повторных вызовов и залипания
var clickEffectSoundPlaying = false;
var clickEffectSoundTimeout = null;
function playClickEffectSound() {
    // Предотвращаем воспроизведение при загрузке страницы
    if (document.readyState === 'loading') {
        return;
    }
    
    // Если звук уже воспроизводится, не запускаем новый
    if (clickEffectSoundPlaying) {
        return;
    }
    
    // Очищаем предыдущий таймаут, если он есть
    if (clickEffectSoundTimeout) {
        clearTimeout(clickEffectSoundTimeout);
    }
    
    try {
        var soundsObj = window.sounds || sounds;
        if (!soundsObj || !soundsObj.clickEffect) {
            return;
        }
        
        clickEffectSoundPlaying = true;
        
        var clickEffectSound = new Audio(soundsObj.clickEffect);
        clickEffectSound.volume = 0.5;
        
        clickEffectSound.play().then(function() {
            // Разрешаем следующий звук после завершения текущего
            clickEffectSound.onended = function() {
                clickEffectSoundPlaying = false;
            };
        }).catch(function(e) {
            console.warn('Не удалось воспроизвести звук click-effect', e);
            clickEffectSoundPlaying = false;
        });
        
        // Защита: если звук не закончился за 500ms, сбрасываем флаг
        clickEffectSoundTimeout = setTimeout(function() {
            clickEffectSoundPlaying = false;
        }, 500);
        
    } catch (e) {
        console.warn('Ошибка при создании звука click-effect', e);
        clickEffectSoundPlaying = false;
    }
}

// Делаем функцию доступной глобально
window.playClickEffectSound = playClickEffectSound;

// Функция для воспроизведения звука Whistler.mp3 при старте таймера
function playWhistlerSound() {
    try {
        var whistlerSound = new Audio('assets/audio/Whistler.mp3');
        whistlerSound.volume = 0.7; // Устанавливаем громкость
        whistlerSound.play().catch(function(e) {
            console.warn('Не удалось воспроизвести звук Whistler', e);
        });
    } catch (e) {
        console.warn('Ошибка при создании звука Whistler', e);
    }
}

// Функция для воспроизведения звука stop.mp3 при нажатии на кнопки СТОП, ПАУЗА и ПРОДОЛЖИТЬ
// Параметр userAction указывает, что это действие пользователя (true) или программный вызов (false)
function playStopSound(userAction) {
    // Воспроизводим звук только если это действие пользователя
    if (userAction !== true) {
        return;
    }
    
    // Дополнительная проверка: не воспроизводим звук при загрузке страницы
    // Проверяем, что страница полностью загружена и не происходит инициализация
    if (document.readyState === 'loading') {
        return;
    }
    
    try {
        var stopSound = new Audio('assets/audio/stop.mp3');
        stopSound.volume = 0.7; // Устанавливаем громкость
        stopSound.play().catch(function(e) {
            console.warn('Не удалось воспроизвести звук stop', e);
        });
    } catch (e) {
        console.warn('Ошибка при создании звука stop', e);
    }
}

// Обработчик клика для кнопки -
function decreaseClick(e) {
    // Предотвращаем стандартное поведение
    e.preventDefault();
    e.stopPropagation();
    
    // Воспроизводим звук клика
    playClickSound();
    
    console.log('Уменьшение значения (mousedown)');
    
    // Проверяем, что объект newtimer существует
    if (typeof window.newtimer !== 'undefined' && window.newtimer) {
        window.newtimer.minus();
        console.log('newtimer.minus() вызван');
    } else {
        console.log('Ошибка: объект newtimer не определен');
    }
    
    // Для предотвращения возможных конфликтов
    return false;
}

// Обработчик клика для кнопки +
function increaseClick(e) {
    // Предотвращаем стандартное поведение
    e.preventDefault();
    e.stopPropagation();
    
    // Воспроизводим звук клика
    playClickSound();
    
    console.log('Увеличение значения (mousedown)');
    
    // Проверяем, что объект newtimer существует
    if (typeof window.newtimer !== 'undefined' && window.newtimer) {
        window.newtimer.plus();
        console.log('newtimer.plus() вызван');
    } else {
        console.log('Ошибка: объект newtimer не определен');
    }
    
    // Для предотвращения возможных конфликтов
    return false;
}

// Функция для начала уменьшения значения
function decreaseTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Воспроизводим звук клика
    playClickSound();
    
    console.log('Начало уменьшения (touchstart)');
    
    // Останавливаем все активные таймеры
    stopAllTimers();
    
    // Устанавливаем флаг активного прикосновения
    window.touchActive = true;
    
    // Вызываем функцию уменьшения сразу
    if (typeof window.newtimer !== 'undefined' && window.newtimer) {
        window.newtimer.minus();
        console.log('newtimer.minus() вызван');
        
        // Запускаем интервал для повторного уменьшения
        setTimeout(function() {
            if (window.touchActive) {
                console.log('Начинаем непрерывное уменьшение');
                window.timerIntervalId = setInterval(function() {
                    if (window.touchActive) {
                        window.newtimer.minus();
                    } else {
                        stopAllTimers();
                    }
                }, 300);
            }
        }, 500);
    } else {
        console.log('Ошибка: объект newtimer не определен');
    }
}

// Функция для начала увеличения значения
function increaseTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Воспроизводим звук клика
    playClickSound();
    
    console.log('Начало увеличения (touchstart)');
    
    // Останавливаем все активные таймеры
    stopAllTimers();
    
    // Устанавливаем флаг активного прикосновения
    window.touchActive = true;
    
    // Вызываем функцию увеличения сразу
    if (typeof window.newtimer !== 'undefined' && window.newtimer) {
        window.newtimer.plus();
        console.log('newtimer.plus() вызван');
        
        // Запускаем интервал для повторного увеличения
        setTimeout(function() {
            if (window.touchActive) {
                console.log('Начинаем непрерывное увеличение');
                window.timerIntervalId = setInterval(function() {
                    if (window.touchActive) {
                        window.newtimer.plus();
                    } else {
                        stopAllTimers();
                    }
                }, 300);
            }
        }, 500);
    } else {
        console.log('Ошибка: объект newtimer не определен');
    }
}

// Функция для окончания прикосновения
function touchEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Окончание прикосновения (touchend)');
    stopAllTimers();
}

// Глобальная функция для окончания прикосновения
function globalTouchEnd() {
    console.log('Глобальное окончание прикосновения');
    if (window.touchActive) {
        stopAllTimers();
    }
}

// Функция для остановки всех таймеров
function stopAllTimers() {
    console.log('Остановка всех таймеров');
    window.touchActive = false;
    
    clearInterval(window.timerIntervalId);
    window.timerIntervalId = null;
    
    // Вызываем invalidate для сброса состояния
    if (typeof window.newtimer !== 'undefined' && window.newtimer) {
        window.newtimer.invalidate();
        console.log('newtimer.invalidate() вызван');
    } else {
        console.log('Ошибка: объект newtimer не определен');
    }
}

function adjustQuoteFontSize() {
    const quoteText = document.getElementById('quoteText');
    const containerWidth = quoteText.clientWidth; // Ширина контейнера
    const containerHeight = quoteText.clientHeight; // Высота контейнера
    const quote = quoteText.textContent; // Текст цитаты

    let fontSize = 100; // Начальный размер шрифта в пикселях
    quoteText.style.fontSize = fontSize + 'px'; // Установка начального размера шрифта

    // Уменьшаем размер шрифта, пока текст не поместится в контейнер
    while (quoteText.scrollHeight > containerHeight || quoteText.scrollWidth > containerWidth) {
        fontSize -= 1; // Уменьшаем размер шрифта
        quoteText.style.fontSize = fontSize + 'px'; // Применяем новый размер
    }
}

// Функция для создания пустого прогресс-бара по умолчанию
function createDefaultProgressBar() {
    // Проверяем, существует ли контейнер прогресс-бара
    var progressContainer = document.getElementById('progress-bar-container');
    if (!progressContainer) {
        // Создаем контейнер, если его нет
        progressContainer = document.createElement('div');
        progressContainer.id = 'progress-bar-container';
        progressContainer.className = 'progress-bar-container';
        
        var progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.className = 'progress-bar';
        progressBar.style.width = '0%'; // Пустой прогресс-бар
        
        progressContainer.appendChild(progressBar);
        
        // Определяем, где разместить прогресс-бар в зависимости от режима
        var timerMode = window.timerMode || 1;
        var insertTarget = null;
        
        if (timerMode === 3) {
            // Режим EMOM - добавляем после emom-timer-row-wrapper
            var emomTimerRow = document.getElementById('emom-timer-row-wrapper');
            if (emomTimerRow) {
                insertTarget = emomTimerRow;
            }
        } else if (timerMode === 4) {
            // Режим AMRAP - добавляем после amrap-timer-row-wrapper
            var amrapTimerRow = document.getElementById('amrap-timer-row-wrapper');
            if (amrapTimerRow) {
                insertTarget = amrapTimerRow;
            }
        } else {
            // Режимы Tabata/HIIT - добавляем во всю ширину внутри tt_timer_wrap, после tt_clock_wrap
            var timerWrap = document.getElementById('tt_timer_wrap');
            var clockWrap = document.getElementById('tt_clock_wrap');
            
            if (timerWrap && clockWrap) {
                // Добавляем после часов
                clockWrap.after(progressContainer);
                insertTarget = null; // Уже вставлен
            }
        }
        
        // Вставляем прогресс-бар после целевого элемента
        if (insertTarget && insertTarget.parentNode) {
            insertTarget.parentNode.insertBefore(progressContainer, insertTarget.nextSibling);
        }
    }
}

// Функция для обновления прогресс-бара
function updateProgressBar(currentTime, totalTime) {
    // Проверяем, существует ли контейнер прогресс-бара
    var progressContainer = document.getElementById('progress-bar-container');
    if (!progressContainer) {
        // Создаем контейнер, если его нет
        progressContainer = document.createElement('div');
        progressContainer.id = 'progress-bar-container';
        progressContainer.className = 'progress-bar-container';
        
        var progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.className = 'progress-bar';
        
        progressContainer.appendChild(progressBar);
        
        // Определяем, где разместить прогресс-бар в зависимости от режима
        var timerMode = window.timerMode;
        var insertTarget = null;
        
        if (timerMode === 3) {
            // Режим EMOM - добавляем после emom-timer-row-wrapper
            var emomTimerRow = document.getElementById('emom-timer-row-wrapper');
            if (emomTimerRow) {
                insertTarget = emomTimerRow;
            }
        } else if (timerMode === 4) {
            // Режим AMRAP - добавляем после amrap-timer-row-wrapper
            var amrapTimerRow = document.getElementById('amrap-timer-row-wrapper');
            if (amrapTimerRow) {
                insertTarget = amrapTimerRow;
            }
        } else {
            // Режимы Tabata/HIIT - добавляем во всю ширину внутри tt_timer_wrap, перед row
            var timerWrap = document.getElementById('tt_timer_wrap');
        var clockWrap = document.getElementById('tt_clock_wrap');
            var row = timerWrap ? timerWrap.querySelector('.row') : null;
            
            if (timerWrap && clockWrap && row) {
                // Добавляем перед row, чтобы прогресс-бар был во всю ширину
                timerWrap.insertBefore(progressContainer, row);
                insertTarget = null; // Уже вставлен
            } else if (clockWrap) {
                // Запасной вариант - добавляем после часов
                clockWrap.after(progressContainer);
                insertTarget = null; // Уже вставлен
            }
        }
        
        // Вставляем прогресс-бар после целевого элемента
        if (insertTarget && insertTarget.parentNode) {
            insertTarget.parentNode.insertBefore(progressContainer, insertTarget.nextSibling);
        }
    }
    
    // Обновляем ширину прогресс-бара
    var progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        var percentage = ((totalTime - currentTime) / totalTime) * 100;
        
        // Проверяем, если время почти закончилось (осталась 1 секунда или меньше)
        if (currentTime <= 1) {
            // Добавляем класс для полного заполнения
            progressBar.classList.add('completed');
        } else {
            // Удаляем класс, если он был добавлен ранее
            progressBar.classList.remove('completed');
            progressBar.style.width = percentage + '%';
        }
        
        // Устанавливаем цвет прогресс-бара в зависимости от текущей фазы или режима
        var timerMode = window.timerMode;
        var clockWrap = document.getElementById('tt_clock_wrap');
        
            // Удаляем все цветовые классы
        progressBar.classList.remove('progress-prepare', 'progress-work', 'progress-rest', 'progress-emom', 'progress-amrap');
            
        if (timerMode === 3) {
            // Режим EMOM - проверяем фазу "Готовимся" или основную фазу
            if (typeof window.emomTimer !== 'undefined' && window.emomTimer.getState) {
                var emomState = window.emomTimer.getState();
                if (emomState && emomState.isPreparationPhase) {
                    progressBar.classList.add('progress-prepare'); // желтый для фазы "Готовимся"
                } else {
                    progressBar.classList.add('progress-work'); // красный для основной фазы
                }
            } else {
                progressBar.classList.add('progress-work'); // красный по умолчанию
            }
        } else if (timerMode === 4) {
            // Режим AMRAP - проверяем фазу "Готовимся" или основную фазу
            // Проверяем через глобальное состояние AMRAP
            var amrapState = window.amrapState || {};
            if (amrapState.isPreparationPhase) {
                progressBar.classList.add('progress-prepare'); // желтый для фазы "Готовимся"
            } else {
                progressBar.classList.add('progress-work'); // красный для основной фазы
            }
        } else if (clockWrap) {
            // Режимы Tabata/HIIT - используем цвет в зависимости от фазы
            if (clockWrap.classList.contains('tt_clock_prepare')) {
                progressBar.classList.add('progress-prepare'); // желтый для фазы "Готовимся"
            } else if (clockWrap.classList.contains('tt_clock_work')) {
                progressBar.classList.add('progress-work'); // красный для фазы "Работаем"
            } else if (clockWrap.classList.contains('tt_clock_rest')) {
                progressBar.classList.add('progress-rest'); // голубой для фазы "Отдыхаем"
            }
        }
    }
}

// Функция для создания ползунка громкости во время тренировки
function initTimerVolumeSlider() {
    // Проверяем, что мы в режиме HIIT, EMOM или AMRAP (ползунок для этих режимов)
    if (window.timerMode !== 2 && window.timerMode !== 3 && window.timerMode !== 4) {
        return; // Не создаем ползунок в режиме Табата
    }
    
    // Проверяем, существует ли контейнер ползунка громкости для таймера
    var volumeContainerTimer = document.getElementById('radio-volume-container-timer');
    if (!volumeContainerTimer) {
        // Создаем контейнер, если его нет
        volumeContainerTimer = document.createElement('div');
        volumeContainerTimer.id = 'radio-volume-container-timer';
        volumeContainerTimer.className = 'radio-volume-container';
        volumeContainerTimer.style.display = 'none'; // По умолчанию скрыт
        
        var volumeWrapper = document.createElement('div');
        volumeWrapper.className = 'radio-volume-wrapper';
        
        var volumeIcon = document.createElement('span');
        volumeIcon.className = 'radio-volume-icon';
        volumeIcon.textContent = '🔊';
        
        var volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.id = 'radio-volume-slider-timer';
        volumeSlider.className = 'radio-volume-slider';
        volumeSlider.min = '0';
        volumeSlider.max = '100';
        volumeSlider.value = '100';
        volumeSlider.step = '1';
        // Используем стандартные события input и change, которые работают на всех устройствах
        var audioElementTimer = document.getElementById('radio-audio');
        
        volumeSlider.addEventListener('input', function() {
            // Инициализируем Web Audio API при первом взаимодействии
            if (typeof initWebAudio === 'function') {
                initWebAudio();
            }
            
            var value = parseInt(this.value);
            // Для iOS: устанавливаем громкость напрямую синхронно
            if (audioElementTimer) {
                var volume = value / 100;
                audioElementTimer.volume = volume;
            }
            if (typeof updateRadioVolume === 'function') {
                updateRadioVolume(value);
            }
        });
        volumeSlider.addEventListener('change', function() {
            // Инициализируем Web Audio API при первом взаимодействии
            if (typeof initWebAudio === 'function') {
                initWebAudio();
            }
            
            var value = parseInt(this.value);
            // Для iOS: устанавливаем громкость напрямую синхронно
            if (audioElementTimer) {
                var volume = value / 100;
                audioElementTimer.volume = volume;
            }
            if (typeof updateRadioVolume === 'function') {
                updateRadioVolume(value);
            }
        });
        
        // Дополнительные обработчики touch для мобильных устройств (как резервный вариант)
        // На iOS важно устанавливать громкость синхронно во время touch события
        var isDraggingTimer = false;
        
        volumeSlider.addEventListener('touchstart', function(e) {
            // Инициализируем Web Audio API при первом touch взаимодействии
            if (typeof initWebAudio === 'function') {
                initWebAudio();
            }
            
            isDraggingTimer = true;
            var touch = e.touches[0];
            var rect = this.getBoundingClientRect();
            var percent = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
            var value = Math.round(percent * 100);
            this.value = value;
            
            // Для iOS: устанавливаем громкость напрямую синхронно во время touch
            if (audioElementTimer) {
                var volume = value / 100;
                audioElementTimer.volume = volume;
            }
            if (typeof updateRadioVolume === 'function') {
                updateRadioVolume(value);
            }
        }, { passive: true });
        
        volumeSlider.addEventListener('touchmove', function(e) {
            if (!isDraggingTimer) return;
            var touch = e.touches[0];
            var rect = this.getBoundingClientRect();
            var percent = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
            var value = Math.round(percent * 100);
            this.value = value;
            
            // Для iOS: устанавливаем громкость напрямую синхронно во время touch
            if (audioElementTimer) {
                var volume = value / 100;
                audioElementTimer.volume = volume;
            }
            if (typeof updateRadioVolume === 'function') {
                updateRadioVolume(value);
            }
        }, { passive: true });
        
        volumeSlider.addEventListener('touchend', function() {
            isDraggingTimer = false;
            var value = parseInt(this.value);
            // Для iOS: устанавливаем громкость напрямую синхронно
            if (audioElementTimer) {
                var volume = value / 100;
                audioElementTimer.volume = volume;
            }
            if (typeof updateRadioVolume === 'function') {
                updateRadioVolume(value);
            }
        });
        
        volumeSlider.addEventListener('touchcancel', function() {
            isDraggingTimer = false;
            var value = parseInt(this.value);
            // Для iOS: устанавливаем громкость напрямую синхронно
            if (audioElementTimer) {
                var volume = value / 100;
                audioElementTimer.volume = volume;
            }
            if (typeof updateRadioVolume === 'function') {
                updateRadioVolume(value);
            }
        });
        
        var volumeValue = document.createElement('span');
        volumeValue.className = 'radio-volume-value';
        volumeValue.id = 'radio-volume-value-timer';
        volumeValue.textContent = '100%';
        
        volumeWrapper.appendChild(volumeIcon);
        volumeWrapper.appendChild(volumeSlider);
        volumeWrapper.appendChild(volumeValue);
        volumeContainerTimer.appendChild(volumeWrapper);
        
        // Добавляем ползунок громкости во всю ширину внутри tt_timer_wrap, после progress-bar-container, перед row
        var timerWrap = document.getElementById('tt_timer_wrap');
        var progressContainer = document.getElementById('progress-bar-container');
        var row = timerWrap ? timerWrap.querySelector('.row') : null;
        
        if (timerWrap && progressContainer && row) {
            // Если есть progress-bar-container и row, добавляем после progress-bar-container, но перед row
            progressContainer.after(volumeContainerTimer);
        } else if (timerWrap && row) {
            // Если нет progress-bar-container, но есть row, добавляем перед row
            timerWrap.insertBefore(volumeContainerTimer, row);
        } else if (progressContainer) {
            // Если есть только progress-bar-container, добавляем после него
            progressContainer.after(volumeContainerTimer);
        } else {
            // Запасной вариант - добавляем после часов
            var clockWrap = document.getElementById('tt_clock_wrap');
            if (clockWrap) {
                clockWrap.after(volumeContainerTimer);
            }
        }
        
        // Загружаем сохраненное значение громкости
        var savedVolume = localStorage.getItem('radioVolume');
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
            if (typeof updateRadioVolume === 'function') {
                updateRadioVolume(savedVolume);
            }
        }
    }
}

// Обновляем метод сброса таймера в объекте newtimer
STTabataTimerViewController.prototype.resetTimer = function() {
    this.stopped = true;
    this.isPaused = false;
    
    // Сбрасываем отображение времени
    document.getElementById('currenttime').innerHTML = '<span>04:10</span>';
    
    // Восстанавливаем режим выбора
    document.getElementById('modeSelector').style.display = "flex";
    
    // Удаляем класс workout-running при сбросе
    document.body.classList.remove('workout-running');
    
    // Определяем предыдущий режим
    var previousMode = this.timerMode;
    
    // Обновляем состояние упражнения
    if (window.ExerciseManager) {
        window.ExerciseManager.sync();
    }
    
    // Показываем нужные элементы управления в зависимости от режима
    if (this.timerMode == 2) {
        // Выбираем режим "HIIT"
        document.getElementById('extendedMode').checked = true;
        document.getElementById('tabataMode').checked = false;
        document.getElementById('controls').style.display = "block";
        document.getElementById('playlistField').style.display = "none";
        // Показываем соответствующие элементы для настраиваемого режима
        document.getElementById('tt_cycles_wrap').classList.remove("tt_cycles_hide");
        document.getElementById('tt_tabatas_wrap').style.display = "block";
    } else {
        // Выбираем режим "Табата"
        document.getElementById('tabataMode').checked = true;
        document.getElementById('extendedMode').checked = false;
        document.getElementById('controls').style.display = "none";
        document.getElementById('playlistField').style.display = "block";
        // Скрываем соответствующие элементы для режима Табата
        document.getElementById('tt_cycles_wrap').classList.add("tt_cycles_hide");
        document.getElementById('tt_tabatas_wrap').style.display = "none";
        
        // Если переключились с режима HIIT (2) на Табата (1),
        // принудительно останавливаем радио, чтобы избежать наложения звуков
        if (previousMode == 2) {
            // Останавливаем основной элемент звука
            var radioElement = document.getElementById('sound');
            if (radioElement) {
                radioElement.pause();
                radioElement.currentTime = 0;
                console.log('Радио (sound) остановлено при переключении на режим Табата из resetTimer');
            }
            
            // Останавливаем радио-плеер
            var radioAudio = document.getElementById('radio-audio');
            if (radioAudio) {
                radioAudio.pause();
                radioAudio.currentTime = 0;
                console.log('Радио (radio-audio) остановлено при переключении на режим Табата из resetTimer');
            }
        }
    }
};

// Обработчик отпускания кнопки мыши
function globalMouseUp() {
    // Проверяем, вызывается ли функция
    console.log('Обработка mouseup');
    
    // Останавливаем все таймеры так же, как и при окончании тача
    stopAllTimers();
}

// Добавляем загрузку скрипта для выбора упражнений
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем скрипт с функциональностью выбора упражнений
    if (!document.getElementById('exercise-selector-script')) {
        const script = document.createElement('script');
        script.id = 'exercise-selector-script';
        script.src = 'assets/js/exercise-selector.js';
        script.async = true;
        
        // Вызываем инициализацию после загрузки скрипта
        script.onload = function() {
        console.log('Скрипт для выбора упражнений загружен');
            // Даем время на инициализацию модуля
            setTimeout(function() {
                if (typeof window.ExerciseManager !== 'undefined' && window.ExerciseManager.init) {
                    window.ExerciseManager.init();
                    console.log('Селектор упражнений инициализирован после загрузки скрипта');
                }
            }, 100);
        };
        
        document.body.appendChild(script);
    } else {
        // Скрипт уже загружен, вызываем инициализацию
        setTimeout(function() {
            if (typeof window.ExerciseManager !== 'undefined' && window.ExerciseManager.init) {
                window.ExerciseManager.init();
                console.log('Селектор упражнений инициализирован (скрипт уже был загружен)');
            }
        }, 100);
    }
});

// Для воспроизведения радио в HIIT режиме
function toggleRadioPlay() {
    const audioElement = document.getElementById('radio-audio');
    const playButton = document.getElementById('radio-play-button');
    const stationName = document.getElementById('radio-station-name');
    
    if (!audioElement || !playButton || !stationName) {
        console.error('Ошибка: не найдены нужные элементы интерфейса радио');
        return;
    }
    
    // Проверяем, воспроизводится ли радио сейчас
    if (radioIsPlaying) {
        // Ставим на паузу
        audioElement.pause();
        playButton.classList.remove('playing');
        radioIsPlaying = false;
        console.log('Радио на паузе');
    } else {
        // Если станция не выбрана, показываем выпадающий список
        if (radioCurrentStation === '') {
            console.log('Станция не выбрана, показываем выпадающий список');
            const selectElement = document.getElementById('radio-stations');
            if (selectElement) {
                selectElement.focus();
                selectElement.click();
            }
            return;
        }
        
        // Воспроизводим
        audioElement.play()
            .then(() => {
                console.log('Радио воспроизводится успешно');
                playButton.classList.add('playing');
                radioIsPlaying = true;
            })
            .catch(error => {
                console.error('Ошибка воспроизведения радио:', error);
                alert('Не удалось воспроизвести радио. Пожалуйста, выберите другую станцию или повторите попытку позже.');
                // Сбрасываем состояние в случае ошибки
                playButton.classList.remove('playing');
                radioIsPlaying = false;
            });
    }
}

// Функция для предварительной загрузки музыкального трека
function preloadTabataMusic() {
    try {
        // Проверяем, есть ли выбранный трек
        if (typeof window.musicFile === 'undefined' || !window.musicFile) {
            // Если трек не выбран, используем значение из элемента плейлиста
            var playlistElement = document.getElementById("playlist");
            if (playlistElement && playlistElement.value) {
                window.musicFile = "assets/music/" + playlistElement.value;
                console.log('Предзагрузка: устанавливаем трек из выбранного в плейлисте:', window.musicFile);
            } else {
                // Используем первый трек по умолчанию
                window.musicFile = "assets/music/Tabata - Rocky.mp3";
                console.log('Предзагрузка: устанавливаем трек по умолчанию:', window.musicFile);
            }
        }
        
        // Получаем аудиоэлемент
        var soundElement = document.getElementById('sound');
        if (!soundElement) {
            console.error('Предзагрузка: аудиоэлемент не найден');
            return;
        }
        
        // Удаляем предыдущие обработчики, если они были
        soundElement.oncanplaythrough = null;
        
        // Проверяем, не загружен ли уже этот файл
        if (soundElement.src.includes(window.musicFile)) {
            console.log('Предзагрузка: трек уже загружен:', window.musicFile);
            return;
        }
        
        console.log('Предзагрузка: начинаем загрузку трека:', window.musicFile);
        
        // Изменяем атрибут preload на auto, чтобы загрузить файл полностью
        soundElement.preload = "auto";
        
        // Добавляем индикатор загрузки, если его еще нет
        var loadingIndicator = document.getElementById('music-loading-indicator');
        if (!loadingIndicator && document.getElementById('playlistField')) {
            loadingIndicator = document.createElement('div');
            loadingIndicator.id = 'music-loading-indicator';
            loadingIndicator.style.color = '#888';
            loadingIndicator.style.fontSize = '12px';
            loadingIndicator.style.marginTop = '5px';
            loadingIndicator.textContent = 'Загрузка музыки...';
            document.getElementById('playlistField').appendChild(loadingIndicator);
        }
        
        // Устанавливаем источник и начинаем загрузку
        soundElement.src = window.musicFile;
        soundElement.load();
        
        // Добавляем обработчик для логирования завершения загрузки
        soundElement.oncanplaythrough = function() {
            console.log('Предзагрузка: трек полностью загружен и готов к воспроизведению:', window.musicFile);
            
            // Удаляем индикатор загрузки
            if (loadingIndicator) {
                loadingIndicator.textContent = 'Музыка готова';
                // Убираем индикатор через 2 секунды
                setTimeout(function() {
                    if (loadingIndicator.parentNode) {
                        loadingIndicator.parentNode.removeChild(loadingIndicator);
                    }
                }, 2000);
            }
            
            // Удаляем обработчик после первого срабатывания
            soundElement.oncanplaythrough = null;
        };
        
        // Добавляем обработчик ошибок
        soundElement.onerror = function() {
            console.error('Предзагрузка: ошибка загрузки трека:', window.musicFile);
            if (loadingIndicator) {
                loadingIndicator.textContent = 'Ошибка загрузки';
                loadingIndicator.style.color = 'red';
            }
        };
    } catch (e) {
        console.error('Ошибка при предзагрузке музыки:', e);
    }
}

// Глобальная функция для получения логов таймера
window.getTimerLogs = function() {
    if (!window.timerLogs || window.timerLogs.length === 0) {
        if (window.DEBUG_MODE) console.log('Логи таймера пусты');
        return [];
    }
    if (window.DEBUG_MODE) {
        console.log('=== ЛОГИ ТАЙМЕРА ===');
        console.log('Всего записей:', window.timerLogs.length);
        console.table(window.timerLogs);
    }
    return window.timerLogs;
};

// Глобальная функция для экспорта логов в JSON
window.exportTimerLogs = function() {
    if (!window.timerLogs || window.timerLogs.length === 0) {
        if (window.DEBUG_MODE) console.log('Логи таймера пусты');
        return null;
    }
    var jsonLogs = JSON.stringify(window.timerLogs, null, 2);
    if (window.DEBUG_MODE) {
        console.log('=== ЭКСПОРТ ЛОГОВ ===');
        console.log(jsonLogs);
    }
    return jsonLogs;
};

// Глобальная функция для очистки логов
window.clearTimerLogs = function() {
    window.timerLogs = [];
    if (window.DEBUG_MODE) {
        console.log('Логи таймера очищены');
    }
};