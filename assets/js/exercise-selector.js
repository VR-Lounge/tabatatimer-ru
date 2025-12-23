/**
 * Функционал выбора упражнений для Tabata Timer
 * Интегрирует GIF-упражнения из коллекций для мужчин и женщин
 */

// Глобальная переменная для хранения текущего выбранного упражнения
// Проверяем, не была ли переменная уже объявлена (защита от повторной загрузки скрипта)
if (typeof selectedExercise === 'undefined') {
    var selectedExercise = {
    id: null,
    gender: null,
    path: null,
    name: null
};
}

// Массив для хранения последовательности упражнений в режиме HIIT (до 10 упражнений)
if (typeof hiitExerciseSequence === 'undefined') {
    var hiitExerciseSequence = [];
}

// Индекс текущего выбранного упражнения в последовательности HIIT
if (typeof currentHiitExerciseIndex === 'undefined') {
    var currentHiitExerciseIndex = 0;
}

// Максимальное количество упражнений в последовательности HIIT
const MAX_HIIT_EXERCISES = 10;

// Переменная для отслеживания состояния скрытия упражнения
var isExerciseHidden = false;

// Переменная для включения/отключения сценария синхронизации упражнений с раундами
// При включении: на фазе "Отдыхаем" показывается следующее упражнение
var hiitExerciseRoundSyncEnabled = false;

// Кеш для хранения списков упражнений
const exerciseCache = {
    men: null,
    women: null
};

// Количество упражнений, отображаемых при первой загрузке
const INITIAL_LOAD_COUNT = 8;

// Количество упражнений, добавляемых при нажатии "Показать еще"
const LOAD_MORE_COUNT = 8;

/**
 * Проверяет доступность изображения
 * @param {string} url - путь к изображению
 * @returns {Promise<boolean>} - промис, который резолвится в true, если изображение доступно
 */
function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

/**
 * Инициализация функционала выбора упражнений
 */
function initExerciseSelector() {
    console.log('Инициализация селектора упражнений');
    
    // Загружаем состояние скрытия из localStorage
    const savedHiddenState = localStorage.getItem('exerciseHidden');
    isExerciseHidden = savedHiddenState === 'true';
    
    // Загружаем состояние синхронизации упражнений с раундами из localStorage
    const savedSyncState = localStorage.getItem('hiitExerciseRoundSyncEnabled');
    if (savedSyncState !== null) {
        hiitExerciseRoundSyncEnabled = savedSyncState === 'true';
    }
    
    // Загружаем последовательность упражнений HIIT из localStorage
    const savedSequence = localStorage.getItem('hiitExerciseSequence');
    if (savedSequence) {
        try {
            hiitExerciseSequence = JSON.parse(savedSequence);
            console.log(`Загружена последовательность HIIT: ${hiitExerciseSequence.length} упражнений`);
            
            // Загружаем сохраненный индекс текущего упражнения
            const savedIndex = localStorage.getItem('currentHiitExerciseIndex');
            if (savedIndex !== null) {
                currentHiitExerciseIndex = parseInt(savedIndex, 10);
                // Проверяем, что индекс валиден
                if (currentHiitExerciseIndex < 0 || currentHiitExerciseIndex >= hiitExerciseSequence.length) {
                    currentHiitExerciseIndex = 0;
                }
                console.log(`Загружен индекс текущего упражнения: ${currentHiitExerciseIndex}`);
            }
        } catch (e) {
            console.error('Ошибка при загрузке последовательности упражнений HIIT:', e);
            hiitExerciseSequence = [];
            currentHiitExerciseIndex = 0;
        }
    }
    
    // Создаем элементы интерфейса, если они еще не существуют
    createUIElements();
    
    // Привязываем обработчики событий
    bindEventHandlers();
    
    // Проверяем сохраненное упражнение
    loadSavedExercise();
    
    // Обновляем отображение (для HIIT покажет последовательность)
    updateExerciseDisplay();
    
    // Добавляем обработчики для кнопок управления упражнением (если они уже существуют)
    setupExerciseControlButtons();
    
    // Отслеживаем изменение режима таймера для обновления отображения
    observeTimerModeChanges();
}

/**
 * Настраивает обработчики для кнопок управления упражнением
 */
function setupExerciseControlButtons() {
    // Обработчик клика на изображение выбранного упражнения
    const selectedImage = document.getElementById('selected-exercise-image');
    if (selectedImage) {
        // Удаляем старые обработчики, если они есть
        const newImage = selectedImage.cloneNode(true);
        selectedImage.parentNode.replaceChild(newImage, selectedImage);
        
        newImage.addEventListener('click', function(e) {
            e.stopPropagation();
            const buttonsContainer = document.getElementById('exercise-control-buttons');
            if (buttonsContainer) {
                buttonsContainer.classList.toggle('show');
            }
        });
    }
    
    // Кнопка "СКРЫТЬ УПРАЖНЕНИЕ"
    const hideExerciseBtn = document.getElementById('hide-exercise-btn');
    if (hideExerciseBtn) {
        // Удаляем старые обработчики
        const newHideBtn = hideExerciseBtn.cloneNode(true);
        hideExerciseBtn.parentNode.replaceChild(newHideBtn, hideExerciseBtn);
        
        newHideBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            hideExercise();
        });
    }
    
    // Кнопка "ВЫБРАТЬ ДРУГОЕ"
    const chooseAnotherBtn = document.getElementById('choose-another-btn');
    if (chooseAnotherBtn) {
        // Удаляем старые обработчики
        const newChooseBtn = chooseAnotherBtn.cloneNode(true);
        chooseAnotherBtn.parentNode.replaceChild(newChooseBtn, chooseAnotherBtn);
        
        newChooseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            const buttonsContainer = document.getElementById('exercise-control-buttons');
            if (buttonsContainer) {
                buttonsContainer.classList.remove('show');
            }
            openExerciseModal();
        });
    }
}

/**
 * Создает необходимые элементы интерфейса
 */
function createUIElements() {
    // Добавляем стили для модального окна и селектора упражнений
    if (!document.getElementById('exercise-selector-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'exercise-selector-styles';
        styleElement.textContent = `
            .exercise-selector-button {
                width: 100%;
                max-width: 100%;
                border-radius: 14px;
                border: solid 1px #ffffff !important;
                text-transform: uppercase;
                letter-spacing: 0.2rem;
                font-size: 0.8rem;
                font-weight: 300;
                height: 2.75rem !important;
                line-height: 2.75rem !important;
                text-align: center;
                cursor: pointer;
                transition: background-color 0.2s ease-in-out;
                background-color: transparent;
                color: #ffffff;
                padding: 0 1rem !important; /* Такой же padding как у select */
                box-sizing: border-box !important;
                display: block;
                outline: 0;
                min-height: 2.75rem !important;
                max-height: 2.75rem !important;
                box-shadow: none !important; /* Убираем box-shadow от .button */
            }
            
            .exercise-selector-button:hover {
                background-color: rgba(255, 255, 255, 0.075);
            }
            
            /* Стили для контейнера в режиме Tabata */
            #playlistField .field {
                width: 100%;
                margin-bottom: 10px;
                text-align: center;
            }
            
            /* Стили для контейнера в режиме HIIT */
            #controls li.field {
                display: block;
            }
            
            /* Контейнер кнопки в режиме HIIT */
            #controls .hiit-selector-container {
                width: 100%;
                display: block;
                text-align: center;
                padding: 0;
                box-sizing: border-box;
                clear: both;
            }
            
            .exercise-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.0);
                backdrop-filter: blur(5px);
                z-index: 1000;
                overflow-y: auto;
                animation: fadeIn 0.3s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .exercise-modal-content {
                position: relative;
                margin: 30px auto;
                width: 93%;
                max-width: 1200px;
                background-color: rgba(27, 31, 34, 0.85);
                color: white;
                border-radius: 30px;
                padding: 20px;
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.0);
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .exercise-tabs {
                display: flex;
                justify-content: center;
                margin-bottom: 20px;
            }
            
            .exercise-tab {
                padding: 10px 20px;
                margin: 0 10px;
                border: solid 1px #ffffff;
                border-radius: 14px;
                cursor: pointer;
                transition: all 0.3s;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                text-transform: uppercase;
                letter-spacing: 0.35em;
                font-weight: normal;
                font-size: 0.9em;
            }
            
            .exercise-tab:hover {
                background-color: #444;
                transform: translateY(-2px);
            }
            
            .exercise-tab.active {
                background-color: rgba(19, 21, 25, 0.5);
                border: solid 1px #ffffff;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            
            .exercise-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            
            .exercise-item {
                position: relative;
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s;
                border: 2px solid transparent;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }
            
            .exercise-item:hover {
                transform: scale(1.05);
                border-color: #777;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
                z-index: 10;
            }
            
            .exercise-item.selected {
                border-color: #aaa;
                box-shadow: 0 0 0 4px rgba(170, 170, 170, 0.5), 0 5px 15px rgba(0, 0, 0, 0.4);
            }
            
            .exercise-item img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .exercise-name {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                color: white;
                cursor: pointer;
                transition: all 0.2s;
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 50%;
            }
            
            .auto-select-button {
                width: 100%;
                max-width: 100%;
                margin: 15px auto;
                background-color: rgb(74, 182, 213, 0.7);
                border-radius: 14px;
                color: rgba(255, 255, 255, 0.95);
                font-size: 0.9em;
                font-weight: normal;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 0.35em;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
            
            .auto-select-button:hover {
                background-color: #3495b3;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            
            .auto-select-button:active {
                transform: translateY(0);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }
            
            .close-modal:hover {
                background-color: rgba(255, 255, 255, 0.1);
                transform: scale(1.1);
            }
            
            .exercise-controls {
                display: flex;
                justify-content: center;
                margin-top: 30px;
                gap: 20px;
                padding-top: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .exercise-button {
                padding: 10px 20px;
                background-color: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .exercise-button:hover {
                background-color: #444;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            
            .load-more {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 30px auto;
                /*padding: 8px 15px;
                background-color: #333;*/
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
                /*box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);*/
                height: 36px; /* Уменьшенная высота */
                width: auto; /* Автоматическая ширина по контенту */
                max-width: 180px; /* Максимальная ширина */
                line-height: 20px; /* Для вертикального центрирования */
                text-align: center; /* Горизонтальное центрирование */
                font-size: 0.8em; /* Размер шрифта как у других кнопок */
                font-weight: normal;
            }
            
            .load-more:hover {
                background-color: #444;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            
            /* Стили для контейнера выбранного упражнения */
            .exercise-container {
                display: none;
                margin: 15px 0;
                text-align: center;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
            }
            
            .exercise-container.active {
                display: block;
                animation: fadeIn 0.5s ease;
            }
            
            #selected-exercise-image {
                max-width: 100%;
                border-radius: 50px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                display: block;
                margin: 0 auto;
                transition: all 0.3s;
                cursor: pointer;
            }
            
            #selected-exercise-image:hover {
                opacity: 0.8;
            }
            
            /* Затемнение изображения для фаз "Готовимся" и "Отдыхаем" */
            .exercise-image-wrapper.dimmed #selected-exercise-image {
                opacity: 0.85;
                filter: brightness(0.9);
                transition: opacity 0.3s ease, filter 0.3s ease;
            }
            
            /* Полоска с текстом фазы */
            .phase-label-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 12px 20px;
                text-align: center;
                font-size: 1em;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: rgba(255, 255, 255, 0.95);
                border-radius: 0 0 50px 50px;
                backdrop-filter: blur(10px);
                z-index: 10;
                transition: all 0.3s ease;
            }
            
            .phase-label-overlay.prepare {
                background-color: rgba(255, 204, 50, 0.4);
                box-shadow: 0 -2px 10px rgba(255, 204, 50, 0.15);
            }
            
            .phase-label-overlay.rest {
                background-color: rgb(0 220 255 / 40%);
                box-shadow: 0 -2px 10px rgba(0, 191, 255, 0.15);
            }
            
            .exercise-image-wrapper {
                position: relative;
                display: block;
                width: 100%;
                max-width: 400px;
                margin: 0 auto;
                text-align: center;
                overflow: hidden;
                border-radius: 50px;
            }
            
            /* Стрелки навигации для переключения упражнений в HIIT */
            .hiit-nav-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 48px;
                height: 48px;
                background: rgb(0 0 0 / 20%);
                border-radius: 50%;
                color: rgba(122, 245, 255, 1);
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 100;
                padding: 0;
                outline: none;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(122, 245, 255, 0.2);
                line-height: 1;
                backdrop-filter: blur(10px);
            }
            
            .hiit-nav-arrow:hover {
                background: rgba(122, 245, 255, 0.2);
                border-color: rgba(122, 245, 255, 1);
                color: #7af5ff;
                transform: translateY(-50%) scale(1.15);
                box-shadow: 0 4px 16px rgba(122, 245, 255, 0.5), 0 0 0 4px rgba(122, 245, 255, 0.3);
            }
            
            .hiit-nav-arrow:active {
                transform: translateY(-50%) scale(0.95);
            }
            
            .hiit-nav-arrow-prev {
                left: 10px;
            }
            
            .hiit-nav-arrow-next {
                right: 10px;
            }
            
            /* Адаптивность для стрелок навигации */
            @media (max-width: 768px) {
                .hiit-nav-arrow {
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                }
                
                .hiit-nav-arrow-prev {
                    left: 8px;
                }
                
                .hiit-nav-arrow-next {
                    right: 8px;
                }
            }
            
            @media (max-width: 480px) {
                .hiit-nav-arrow {
                    width: 36px;
                    height: 36px;
                    font-size: 18px;
                }
                
                .hiit-nav-arrow-prev {
                    left: 5px;
                }
                
                .hiit-nav-arrow-next {
                    right: 5px;
                }
            }
            
            #exercise-control-buttons {
                display: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
                flex-direction: column;
                gap: 10px;
                align-items: center;
            }
            
            #exercise-control-buttons.show {
                display: flex;
            }
            
            .exercise-control-btn {
                padding: 10px 20px;
                background-color: rgba(50, 50, 50, 0.55);
                color: white;
                border-radius: 8px;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 0.1rem;
                font-size: 0.8rem;
                transition: all 0.3s;
                white-space: nowrap;
                min-width: 180px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: none;
            }
            
            .exercise-control-btn:hover {
                background-color: rgba(70, 70, 70, 0.95);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            
            #exercise-title {
                margin-bottom: 10px;
                font-weight: normal;
                letter-spacing: 0.15rem !important;
                color: rgba(255, 255, 255, 0.7) !important;
            }
            
            /* Адаптивность для мобильных устройств */
            @media (max-width: 768px) {
                .exercise-grid {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                }
                
                .exercise-modal-content {
                    padding: 15px;
                    margin: 15px auto;
                }
                
                .exercise-tabs {
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                
                .exercise-tab {
                    margin: 0 5px;
                    width: auto;
                    flex: 0 1 auto;
                    text-align: center;
                }
                
                .exercise-controls {
                    flex-direction: column;
                    align-items: center;
                }
                
                .exercise-button {
                    margin: 5px 0;
                    width: 80%;
                }
            }
            
            /* Специальный стиль для кнопки выбора упражнения в режиме Tabata */
            #tabata-exercise-selector {
                margin-top: 20px;
                margin-bottom: 5px;
                display: inline-block;
                letter-spacing: 0.15em;
                width: 100%; /* Добавляем полную ширину */
            }
            
            /* Добавляем стили для оверлея с кнопкой выбора */
            .exercise-item .select-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: calc(100% - 40px); /* Высота за вычетом названия упражнения */
                background-color: rgba(0, 0, 0, 0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .exercise-item.selected .select-overlay {
                opacity: 1;
                pointer-events: auto;
            }
            
            .exercise-item .select-button {
                background-color: rgb(74, 182, 213, 0.7);
                
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                font-weight: normal;
                cursor: pointer;
                transition: background-color 0.3s ease;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                display: flex; /* Используем flexbox для центрирования */
                justify-content: center; /* Центрируем по горизонтали */
                align-items: center; /* Центрируем по вертикали */
            }
            
            .exercise-item .select-button:hover {
                background-color: #3495b3;
            }
            
            /* Стили для наведения на упражнение */
            .exercise-item:hover .select-overlay {
                opacity: 1;
                pointer-events: auto;
            }
            
            /* Убираем нижние кнопки */
            .exercise-controls {
                display: none;
            }
            
            /* Стили для последовательности упражнений HIIT */
            .hiit-exercise-sequence {
                width: 100%;
                max-width: 100%;
                margin: 0 auto;
                padding: 20px 0;
            }
            
            .hiit-sequence-title {
                text-align: center;
                margin-bottom: 20px;
                font-size: 0.9rem;
                letter-spacing: 0.15rem;
                color: rgba(255, 255, 255, 0.7);
                text-transform: uppercase;
            }
            
            .hiit-exercise-cards {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                justify-content: center;
                align-items: flex-start;
                max-width: 100%;
                margin: 0 auto;
            }
            
            .hiit-exercise-card {
                position: relative;
                width: 120px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .hiit-exercise-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                border-color: rgba(122, 245, 255, 0.4);
            }
            
            .hiit-exercise-card.active {
                border-color: rgba(122, 245, 255, 0.8);
                box-shadow: 0 0 0 2px rgba(122, 245, 255, 0.5), 0 5px 15px rgba(0, 0, 0, 0.3);
                background: rgba(122, 245, 255, 0.1);
            }
            
            .hiit-exercise-card {
                cursor: grab;
                -webkit-touch-callout: none;
            }
            
            /* На десктопе разрешаем drag явно */
            @media (hover: hover) and (pointer: fine) {
                .hiit-exercise-card {
                    cursor: grab !important;
                    -webkit-user-select: none;
                    user-select: none;
                    -webkit-user-drag: element;
                    -moz-user-select: none;
                }
                
                .hiit-exercise-card:active {
                    cursor: grabbing !important;
                }
            }
            
            /* На мобильных - убираем user-select */
            @media (hover: none) and (pointer: coarse) {
                .hiit-exercise-card {
                    -webkit-user-select: none;
                    user-select: none;
                }
            }
            
            /* На мобильных - ограничиваем touch action для предотвращения конфликтов */
            @media (hover: none) and (pointer: coarse) {
                .hiit-exercise-card {
                    touch-action: pan-y;
                }
            }
            
            /* На десктопе - разрешаем все действия, включая drag */
            @media (hover: hover) and (pointer: fine) {
                .hiit-exercise-card {
                    touch-action: auto;
                }
            }
            
            .hiit-exercise-card:active {
                cursor: grabbing;
            }
            
            .hiit-exercise-card.dragging {
                opacity: 0.8;
                cursor: grabbing;
                z-index: 10000;
                touch-action: none;
            }
            
            /* Для десктопа - добавляем поворот */
            @media (hover: hover) and (pointer: fine) {
                .hiit-exercise-card.dragging {
                    opacity: 0.5;
                    transform: rotate(5deg);
                    /* Не используем pointer-events: none, чтобы не блокировать drag события */
                }
            }
            
            .hiit-exercise-card.drag-over {
                border-color: rgba(122, 245, 255, 1);
                border-width: 2px;
                box-shadow: 0 0 0 3px rgba(122, 245, 255, 0.5), 0 5px 15px rgba(0, 0, 0, 0.3);
                background: rgba(122, 245, 255, 0.15);
                transform: scale(1.05);
            }
            
            /* Улучшение для мобильных устройств */
            @media (hover: none) and (pointer: coarse) {
                .hiit-exercise-card {
                    cursor: default;
                    -webkit-tap-highlight-color: transparent;
                }
                
                .hiit-exercise-card.dragging {
                    opacity: 0.6;
                    /* Трансформация устанавливается через inline стили в JavaScript */
                }
                
                /* На мобильных кнопка удаления всегда видна */
                .hiit-exercise-delete {
                    opacity: 0.7;
                }
                
                .hiit-exercise-delete:active {
                    opacity: 1;
                }
            }
            
            .hiit-exercise-number {
                position: absolute;
                top: -8px;
                left: -8px;
                width: 28px;
                height: 28px;
                background: rgba(122, 245, 255, 0.9);
                color: #000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 0.85rem;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                pointer-events: none; /* Не блокируем drag карточки */
            }
            
            .hiit-exercise-thumbnail {
                width: 100%;
                height: auto;
                border-radius: 8px;
                margin-bottom: 8px;
                object-fit: cover;
                aspect-ratio: 1;
                pointer-events: none; /* Не блокируем drag карточки */
                -webkit-user-drag: none; /* Отключаем drag изображения в WebKit */
                user-drag: none;
            }
            
            .hiit-exercise-name {
                font-size: 0.75rem;
                text-align: center;
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.2;
                word-wrap: break-word;
                width: 100%;
                pointer-events: none; /* Не блокируем drag карточки */
            }
            
            .hiit-exercise-delete {
                position: absolute;
                top: -8px;
                right: -8px;
                width: 28px;
                height: 28px;
                min-width: 28px;
                min-height: 28px;
                background: rgba(220, 53, 69, 0.9);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                opacity: 0;
                padding: 0;
                box-sizing: border-box;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                z-index: 10;
            }
            
            .hiit-exercise-card:hover .hiit-exercise-delete {
                opacity: 1;
            }
            
            .hiit-exercise-delete:hover {
                background: rgba(220, 53, 69, 1);
                transform: scale(1.1);
            }
            
            /* Уведомление о количестве упражнений */
            .exercise-count-notification {
                position: fixed;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%) translateY(-20px);
                background-color: rgba(74, 182, 213, 0.7);
                color: #000;
                padding: 16px 24px;
                border-radius: 12px;
                font-size: 0.9rem;
                font-weight: bold;
                z-index: 10001;
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
                pointer-events: auto;
            }
            
            .exercise-count-notification.show {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(0);
            }
            
            .exercise-count-notification-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }
            
            .exercise-count-notification-text {
                white-space: nowrap;
            }
            
            .exercise-count-notification-button {
                background: rgba(0, 0, 0, 0.8);
                color: rgba(122, 245, 255, 1);
                border: 2px solid rgba(122, 245, 255, 0.8);
                border-radius: 14px;
                padding: 0 20px 8px 20px;
                font-size: 0.85rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                white-space: nowrap;
            }
            
            .exercise-count-notification-button:hover {
                background: rgba(122, 245, 255, 0.2);
                border-color: rgba(122, 245, 255, 1);
                color: #7af5ff;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(122, 245, 255, 0.3);
            }
            
            .exercise-count-notification-button:active {
                transform: translateY(0);
            }
            
            /* Адаптивность для последовательности упражнений */
            @media (max-width: 768px) {
                .hiit-exercise-card {
                    width: 110px;
                    padding: 8px;
                }
                
                .hiit-exercise-number {
                    width: 24px;
                    height: 24px;
                    font-size: 0.75rem;
                    top: -6px;
                    left: -6px;
                }
                
                .hiit-exercise-delete {
                    width: 24px;
                    height: 24px;
                    font-size: 18px;
                    top: -6px;
                    right: -6px;
                }
                
                .hiit-exercise-name {
                    font-size: 0.7rem;
                }
                
                .hiit-exercise-cards {
                    gap: 18px;
                    justify-content: flex-start;
                    padding: 0 10px;
                }
                
                .exercise-count-notification {
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -50%) translateY(-20px);
                    padding: 14px 18px;
                    font-size: 0.85rem;
                }
                
                .exercise-count-notification.show {
                    transform: translate(-50%, -50%) translateY(0);
                }
                
                .exercise-count-notification-button {
                    padding: 0 16px 7px 16px;
                    font-size: 0.75rem;
                    border-radius: 14px;
                }
            }
            
            @media (max-width: 480px) {
                .hiit-exercise-card {
                    width: 95px;
                    padding: 6px;
                }
                
                .hiit-exercise-name {
                    font-size: 0.65rem;
                }
                
                .hiit-exercise-cards {
                    gap: 15px;
                    justify-content: space-evenly;
                    padding: 0 8px;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Добавляем кнопку выбора упражнения для режима Tabata
    const tabataButton = document.getElementById('tabata-exercise-selector');
    const tabataControlsContainer = document.getElementById('playlistField');
    if (!tabataButton) {
        if (tabataControlsContainer) {
            // Создаем контейнер для кнопки с классом 'field' (вместо 'field half first')
            const selectorContainer = document.createElement('div');
            selectorContainer.className = 'field';
            
            const selectorButton = document.createElement('div');
            selectorButton.id = 'tabata-exercise-selector';
            selectorButton.className = 'exercise-selector-button tt_big_button';
            selectorButton.textContent = 'Выбери упражнение';
            
            // Добавляем кнопку в контейнер карточки
            selectorContainer.appendChild(selectorButton);
            
            // Находим контейнер карточки для кнопок
            var buttonsContainer = document.getElementById('tabata-buttons-container');
            if (!buttonsContainer) {
                buttonsContainer = document.createElement('div');
                buttonsContainer.id = 'tabata-buttons-container';
                var playlistCard = document.querySelector('.tabata-playlist-card-container');
                if (playlistCard) {
                    playlistCard.appendChild(buttonsContainer);
                } else {
                    tabataControlsContainer.appendChild(buttonsContainer);
                }
            }
            buttonsContainer.appendChild(selectorContainer);
            console.log('Кнопка "Выбери упражнение" для Tabata создана');
        } else {
            console.warn('Контейнер playlistField не найден для создания кнопки Tabata');
        }
    } else {
        // Кнопка уже существует, убеждаемся что она видна
        tabataButton.style.display = '';
        const parent = tabataButton.closest('.field');
        if (parent) parent.style.display = '';
        console.log('Кнопка "Выбери упражнение" для Tabata уже существует');
    }
    
    // Добавляем кнопку выбора упражнения для режима HIIT
    const hiitButton = document.getElementById('hiit-exercise-selector');
    const hiitWorkoutsButton = document.getElementById('hiit-workouts-selector');
    const hiitControlsContainer = document.getElementById('controls');
    
    // Проверяем, существует ли обертка для кнопок
    let hiitButtonsRow = document.getElementById('hiit-buttons-row');
    
    if (!hiitButton || !hiitWorkoutsButton || !hiitButtonsRow) {
        if (hiitControlsContainer) {
            // Удаляем старые кнопки, если они существуют
            if (hiitButton) {
                const oldParent = hiitButton.closest('.hiit-selector-container');
                if (oldParent) oldParent.remove();
            }
            if (hiitWorkoutsButton) {
                const oldParent = hiitWorkoutsButton.closest('.hiit-selector-container');
                if (oldParent) oldParent.remove();
            }
            
            // Находим контейнер карточки для кнопок
            var buttonsContainer = document.getElementById('controls-buttons-container');
            if (!buttonsContainer) {
                buttonsContainer = document.createElement('div');
                buttonsContainer.id = 'controls-buttons-container';
                var controlsCard = document.querySelector('.controls-card-container');
                if (controlsCard) {
                    controlsCard.appendChild(buttonsContainer);
                } else {
                    hiitControlsContainer.appendChild(buttonsContainer);
                }
            }
            
            // Создаем обертку для кнопок в стиле AMRAP
            if (!hiitButtonsRow) {
            const selectorContainer = document.createElement('li');
            selectorContainer.className = 'hiit-selector-container field';
            
                hiitButtonsRow = document.createElement('div');
                hiitButtonsRow.id = 'hiit-buttons-row';
                hiitButtonsRow.className = 'hiit-buttons-row';
            
                // Создаем кнопку "УПРАЖНЕНИЯ"
                const exerciseButton = document.createElement('button');
                exerciseButton.id = 'hiit-exercise-selector';
                exerciseButton.type = 'button';
                exerciseButton.className = 'hiit-link-btn';
                exerciseButton.textContent = 'УПРАЖНЕНИЯ';
            
                // Создаем разделитель
                const divider = document.createElement('div');
                divider.className = 'hiit-select-divider';
                divider.textContent = '|';
            
                // Создаем кнопку "ТРЕНИРОВКИ"
                const workoutsButton = document.createElement('button');
            workoutsButton.id = 'hiit-workouts-selector';
                workoutsButton.type = 'button';
                workoutsButton.className = 'hiit-link-btn';
                workoutsButton.textContent = 'ТРЕНИРОВКИ';
                
                // Добавляем элементы в обертку
                hiitButtonsRow.appendChild(exerciseButton);
                hiitButtonsRow.appendChild(divider);
                hiitButtonsRow.appendChild(workoutsButton);
                
                selectorContainer.appendChild(hiitButtonsRow);
                buttonsContainer.appendChild(selectorContainer);
                
                console.log('Кнопки "УПРАЖНЕНИЯ" и "ТРЕНИРОВКИ" для HIIT созданы');
            }
        } else {
            console.warn('Контейнер controls не найден для создания кнопки HIIT');
        }
    } else {
        // Кнопки уже существуют, убеждаемся что они видимы
        if (hiitButtonsRow) {
            hiitButtonsRow.style.display = '';
            const parent = hiitButtonsRow.closest('.hiit-selector-container');
        if (parent) parent.style.display = '';
        }
        console.log('Кнопки "УПРАЖНЕНИЯ" и "ТРЕНИРОВКИ" для HIIT уже существуют');
    }
    
    // Добавляем кнопку "ВЫБЕРИ ТРЕНИРОВКУ" для режима EMOM
    const emomWorkoutsButton = document.getElementById('emom-workouts-selector');
    const radioElement = document.getElementById('radio');
    if (!emomWorkoutsButton && radioElement && hiitControlsContainer) {
        // Находим контейнер карточки для кнопок
        var buttonsContainer = document.getElementById('controls-buttons-container');
        if (!buttonsContainer) {
            buttonsContainer = document.createElement('div');
            buttonsContainer.id = 'controls-buttons-container';
            var controlsCard = document.querySelector('.controls-card-container');
            if (controlsCard) {
                controlsCard.appendChild(buttonsContainer);
            } else {
                hiitControlsContainer.appendChild(buttonsContainer);
            }
        }
        
        // Создаем контейнер для кнопки EMOM
        const workoutsContainer = document.createElement('li');
        workoutsContainer.className = 'emom-selector-container field';
        
        const workoutsButton = document.createElement('div');
        workoutsButton.id = 'emom-workouts-selector';
        workoutsButton.className = 'exercise-selector-button tt_big_button';
        workoutsButton.textContent = 'Выбери тренировку';
        
        workoutsContainer.appendChild(workoutsButton);
        buttonsContainer.appendChild(workoutsContainer);
        console.log('Кнопка "Выбери тренировку" для EMOM создана');
    } else if (emomWorkoutsButton) {
        // Кнопка уже существует, убеждаемся что она видна
        emomWorkoutsButton.style.display = '';
        const parent = emomWorkoutsButton.closest('.emom-selector-container');
        if (parent) parent.style.display = '';
        console.log('Кнопка "Выбери тренировку" для EMOM уже существует');
    }
    
    // Создаем модальное окно для выбора упражнений
    if (!document.getElementById('exercise-modal')) {
        const modal = document.createElement('div');
        modal.id = 'exercise-modal';
        modal.className = 'exercise-modal';
        
        modal.innerHTML = `
            <div class="exercise-modal-content">
                <span class="close-modal">&times;</span>
                <h2 style="text-align: center; margin-bottom: 20px; line-height: 1.3;">
                    ВЫБЕРИ<br>
                    <span style="display: block; text-align: center;">УПРАЖНЕНИЕ</span>
                </h2>
                
                <div class="exercise-tabs">
                    <div class="exercise-tab active" data-gender="men">Мужчины</div>
                    <div class="exercise-tab" data-gender="women">Девушки</div>
                </div>
                
                <button class="auto-select-button" id="auto-select-10-exercises" style="display: none;">Автоподбор 10 упражнений</button>
                
                <div class="exercise-grid" id="exercise-grid"></div>
                
                <button class="load-more" id="load-more-exercises">Показать ещё</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Создаем контейнер для отображения выбранного упражнения
    if (!document.getElementById('selected-exercise-container')) {
        const exerciseContainer = document.createElement('div');
        exerciseContainer.id = 'selected-exercise-container';
        exerciseContainer.className = 'exercise-container';
        
        exerciseContainer.innerHTML = `
            <div id="exercise-title"></div>
            <div class="exercise-image-wrapper">
                <img id="selected-exercise-image" src="" alt="Выбранное упражнение">
                <div id="exercise-control-buttons">
                    <button id="hide-exercise-btn" class="exercise-control-btn">СКРЫТЬ УПРАЖНЕНИЕ</button>
                    <button id="choose-another-btn" class="exercise-control-btn">ВЫБРАТЬ ДРУГОЕ</button>
                </div>
            </div>
        `;
        
        // Добавляем контейнер после кнопок управления таймером
        const clockWrap = document.getElementById('tt_clock_wrap');
        if (clockWrap) {
            clockWrap.parentNode.insertBefore(exerciseContainer, clockWrap.nextSibling);
        }
    }
}

/**
 * Привязывает обработчики событий к элементам интерфейса
 */
function bindEventHandlers() {
    // Кнопки открытия модального окна
    const tabataSelector = document.getElementById('tabata-exercise-selector');
    const hiitSelector = document.getElementById('hiit-exercise-selector');
    
    if (tabataSelector) {
        tabataSelector.addEventListener('click', function(e) {
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            openExerciseModal(e);
        });
    }
    
    if (hiitSelector) {
        hiitSelector.addEventListener('click', function(e) {
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            openExerciseModal(e);
        });
    }
    
    // Добавляем обработчики для переключения режимов
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    modeRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Скрываем описание тренировки при переключении режима
            const hiitWorkoutDescription = document.getElementById('hiit-workout-description');
            if (hiitWorkoutDescription) {
                // Показываем только если выбран режим HIIT (extendedMode)
                if (this.id === 'extendedMode' && this.checked) {
                    // Оставляем видимым если была выбрана тренировка
                    // Описание уже отображается если было выбрано
                } else {
                    // Скрываем описание при переключении на другие режимы
                    hiitWorkoutDescription.style.display = 'none';
                }
            }
            
            // Скрываем описание тренировки EMOM при переключении режима
            if (typeof hideEmomWorkoutDescription === 'function') {
                if (this.id !== 'emomMode' || !this.checked) {
                    hideEmomWorkoutDescription();
                }
            }
        });
    });
    
    // Кнопка выбора тренировок HIIT
    const hiitWorkoutsSelector = document.getElementById('hiit-workouts-selector');
    if (hiitWorkoutsSelector) {
        hiitWorkoutsSelector.addEventListener('click', function() {
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            openHiitWorkoutsModal();
        });
    }
    
    // Кнопка закрытия модалки тренировок HIIT
    const hiitWorkoutsClose = document.getElementById('hiit-workouts-select-close');
    if (hiitWorkoutsClose) {
        hiitWorkoutsClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            closeHiitWorkoutsModal();
        });
    }
    
    // Закрытие модалки при клике вне её
    const hiitWorkoutsModal = document.getElementById('hiit-workouts-select-modal');
    if (hiitWorkoutsModal) {
        hiitWorkoutsModal.addEventListener('click', function(evt) {
            if (evt.target === hiitWorkoutsModal) {
                evt.preventDefault();
                evt.stopPropagation();
                closeHiitWorkoutsModal();
            }
        });
    }
    
    // Кнопка выбора тренировок EMOM
    const emomWorkoutsSelector = document.getElementById('emom-workouts-selector');
    if (emomWorkoutsSelector) {
        emomWorkoutsSelector.addEventListener('click', function() {
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            openEmomWorkoutsModal();
        });
    }
    
    // Кнопка закрытия модалки тренировок EMOM
    const emomWorkoutsClose = document.getElementById('emom-workouts-select-close');
    if (emomWorkoutsClose) {
        emomWorkoutsClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            closeEmomWorkoutsModal();
        });
    }
    
    // Закрытие модалки EMOM при клике вне её
    const emomWorkoutsModal = document.getElementById('emom-workouts-select-modal');
    if (emomWorkoutsModal) {
        emomWorkoutsModal.addEventListener('click', function(evt) {
            if (evt.target === emomWorkoutsModal) {
                evt.preventDefault();
                evt.stopPropagation();
                closeEmomWorkoutsModal();
            }
        });
    }
    
    // Закрытие модального окна
    const closeButton = document.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            closeExerciseModal(e);
        });
    }
    
    // Переключение между типами упражнений (мужчины/женщины)
    const tabs = document.querySelectorAll('.exercise-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const gender = this.getAttribute('data-gender');
            loadExercises(gender, true);
            
            // Показываем кнопку автоподбора только в режиме HIIT
            const autoSelectButton = document.getElementById('auto-select-10-exercises');
            if (autoSelectButton) {
                if (window.timerMode === 2) {
                    autoSelectButton.style.display = 'block';
                } else {
                    autoSelectButton.style.display = 'none';
                }
            }
        });
    });
    
    // Обработчик кнопки "Автоподбор 10 упражнений"
    // Удаляем старые обработчики, если они есть, чтобы избежать дублирования
    const autoSelectButton = document.getElementById('auto-select-10-exercises');
    if (autoSelectButton) {
        // Клонируем элемент, чтобы удалить все старые обработчики
        const newButton = autoSelectButton.cloneNode(true);
        autoSelectButton.parentNode.replaceChild(newButton, autoSelectButton);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Предотвращаем множественные вызовы
            if (newButton.disabled) {
                return;
            }
            newButton.disabled = true;
            
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            
            const activeTab = document.querySelector('.exercise-tab.active');
            if (!activeTab) {
                alert('Выберите категорию упражнений (Мужчины или Девушки)');
                newButton.disabled = false;
                return;
            }
            
            const gender = activeTab.getAttribute('data-gender');
            autoSelect10Exercises(gender);
            
            // Включаем кнопку обратно через небольшую задержку
            setTimeout(() => {
                newButton.disabled = false;
            }, 2000);
        });
    }
    
    // Кнопка "Показать ещё"
    const loadMoreButton = document.getElementById('load-more-exercises');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            const activeTab = document.querySelector('.exercise-tab.active');
            const gender = activeTab.getAttribute('data-gender');
            loadMoreExercises(gender);
        });
    }
    
    // Функции для работы с модалкой тренировок HIIT
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

    function openHiitWorkoutsModal() {
        const modal = document.getElementById('hiit-workouts-select-modal');
        if (!modal) return;
        createHiitWorkoutCards();
        modal.classList.add('is-open');
        document.body.classList.add('hiit-modal-open');
    }
    
    function closeHiitWorkoutsModal() {
        const modal = document.getElementById('hiit-workouts-select-modal');
        if (!modal) return;
        modal.classList.remove('is-open');
        document.body.classList.remove('hiit-modal-open');
        ensureTimerHashIfTimerActive();
    }
    
    function createHiitWorkoutCards() {
        const cardsContainer = document.getElementById('hiit-workouts-cards');
        if (!cardsContainer) return;
        
        // Очищаем контейнер
        cardsContainer.innerHTML = '';
        
        // Массив тренировок HIIT
        const workouts = [
            {
                id: 'hiit-10min',
                title: 'HIIT на 10 минут',
                time: '10 минут',
                description: 'Три круга по три упражнения. Первый круг: боковые выпады (30 сек), быстрые скаты (15 сек), отдых (15 сек). Второй круг: приседания сумо (30 сек), прыжки при приседаниях (15 сек), отдых (15 сек). Третий круг: выпады вперёд с поднятием рук (30 сек).'
            },
            {
                id: 'hiit-12min',
                title: 'HIIT на 12 минут',
                time: '12 минут',
                description: 'Три круга из четырёх упражнений. Каждое упражнение выполняется 30 секунд, затем отдых 30 секунд. Упражнения: приседания с выпрыгиванием, отжимания, планка, бёрпи.'
            },
            {
                id: 'hiit-15min',
                title: 'HIIT на 15 минут',
                time: '15 минут',
                description: 'Разминка (2 мин), тренировка: приседания с прыжком (30 сек), отдых (15 сек), отжимания (30 сек), отдых (15 сек), планка (30 сек), отдых (15 сек), скручивания для пресса (30 сек), отдых (15 сек), бёрпи (30 сек), отдых (15 сек). Повторить круг дважды. Заминка (2 мин).'
            },
            {
                id: 'hiit-20min',
                title: 'HIIT на 20 минут',
                time: '20 минут',
                description: 'Четыре полных круга. Берпи (30 сек работы, 30 сек отдыха), прыжки "Джампинг Джек" (30 сек работы, 30 сек отдыха), спринт на месте с высоким подниманием коленей (30 сек работы, 30 сек отдыха), приседания с мощным выпрыгиванием вверх (30 сек работы, 30 сек отдыха).'
            },
            {
                id: 'hiit-basic',
                title: 'Базовая HIIT тренировка',
                time: 'Настраивается',
                description: '30 секунд максимального усилия (бег, прыжки, приседания) сменяются 10–15 секундами отдыха. Этот цикл повторяется несколько раз. Упражнения можно адаптировать в зависимости от уровня физической подготовки.'
            }
        ];
        
        workouts.forEach(function(workout) {
            const card = document.createElement('div');
            card.className = 'hiit-workout-card';
            card.setAttribute('data-workout-id', workout.id);
            
            card.innerHTML = `
                <div class="hiit-workout-card-title">${workout.title}</div>
                <div class="hiit-workout-card-time">${workout.time}</div>
                <div class="hiit-workout-card-exercises">${workout.description}</div>
            `;
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                selectHiitWorkout(workout);
            });
            
            cardsContainer.appendChild(card);
        });
    }
    
    function selectHiitWorkout(workout) {
        // Убираем активный класс со всех карточек
        const cards = document.querySelectorAll('.hiit-workout-card');
        cards.forEach(function(card) {
            card.classList.remove('active');
        });
        
        // Добавляем активный класс к выбранной карточке
        const selectedCard = document.querySelector('[data-workout-id="' + workout.id + '"]');
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
        
        // Показываем описание тренировки под таймером только в режиме HIIT
        const workoutDescription = document.getElementById('hiit-workout-description');
        const extendedModeCheckbox = document.getElementById('extendedMode');
        const isHiitMode = extendedModeCheckbox && extendedModeCheckbox.checked;
        
        if (workoutDescription && isHiitMode) { // Показываем только если активен режим HIIT
            workoutDescription.innerHTML = 
                '<button class="hiit-workout-description-close" title="Закрыть">×</button>' +
                '<strong>' + workout.title + ' (' + workout.time + ')</strong><br>' + workout.description;
            workoutDescription.style.display = 'block';
            
            // Добавляем обработчик клика на кнопку закрытия
            const closeBtn = workoutDescription.querySelector('.hiit-workout-description-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    workoutDescription.style.display = 'none';
                    
                    // Убираем активный класс с выбранной карточки
                    const activeCard = document.querySelector('.hiit-workout-card.active');
                    if (activeCard) {
                        activeCard.classList.remove('active');
                    }
                    
                    if (typeof playClickEffectSound === 'function') {
                        playClickEffectSound();
                    }
                });
            }
        }
        
        // Устанавливаем время таймера на основе времени тренировки (если указано)
        if (workout.id !== 'hiit-basic') {
            const timeMatch = workout.time.match(/(\d+)\s*минут/);
            if (timeMatch) {
                const minutes = parseInt(timeMatch[1], 10);
                const totalSeconds = minutes * 60;
                
                // Можно добавить логику для установки времени тренировки
                console.log('Выбрана тренировка:', workout.title, 'Время:', minutes, 'минут');
            }
        }
        
        // Закрываем модальное окно
        closeHiitWorkoutsModal();
    }
    
    // Закрываем кнопки при клике вне изображения
    document.addEventListener('click', function(e) {
        const buttonsContainer = document.getElementById('exercise-control-buttons');
        const imageWrapper = document.querySelector('.exercise-image-wrapper');
        
        if (buttonsContainer && buttonsContainer.classList.contains('show')) {
            // Если клик был не по изображению и не по кнопкам, скрываем их
            if (!imageWrapper || !imageWrapper.contains(e.target)) {
                buttonsContainer.classList.remove('show');
            }
        }
    });
}

/**
 * Функции для работы с тренировками EMOM
 */
function openEmomWorkoutsModal() {
    const modal = document.getElementById('emom-workouts-select-modal');
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.classList.add('emom-modal-open');
    createEmomWorkoutCards();
    try {
        // Не перетираем навигацию: меняем hash только если таймер реально активен
        var timerArticle = document.getElementById('timer');
        if (timerArticle && timerArticle.classList && timerArticle.classList.contains('active')) {
            if (window.location.hash !== '#timer') window.location.hash = '#timer';
        }
    } catch (e) {}
}

function closeEmomWorkoutsModal() {
    const modal = document.getElementById('emom-workouts-select-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('emom-modal-open');
    try {
        // Не перетираем навигацию: меняем hash только если таймер реально активен
        var timerArticle = document.getElementById('timer');
        if (timerArticle && timerArticle.classList && timerArticle.classList.contains('active')) {
            if (window.location.hash !== '#timer') window.location.hash = '#timer';
        }
    } catch (e) {}
}

function createEmomWorkoutCards() {
    const cardsContainer = document.getElementById('emom-workouts-cards');
    if (!cardsContainer) return;
    
    // Очищаем контейнер
    cardsContainer.innerHTML = '';
    
    // Массив тренировок EMOM
    const workouts = [
        {
            id: 'emom-beginner-10min',
            title: 'EMOM для начинающих',
            time: '10 минут',
            description: 'Для всего тела. 1-я минута — 10 приседаний. 2-я минута — 10 отжиманий (при необходимости можно дополнить отжиманиями на коленях). Повторять этот цикл на протяжении всей тренировки.'
        },
        {
            id: 'emom-muscle-12min',
            title: 'EMOM для увеличения мышечной массы',
            time: '12 минут',
            description: 'Для ускоренного увеличения мышечной массы. 1-я минута — 6 взвешенных выпадов. 2-я минута — 12 тяжёлых взмахов гирями. Повторять цикл.'
        },
        {
            id: 'emom-fullbody-15min',
            title: 'EMOM для всего тела',
            time: '15 минут',
            description: '1-я минута — 15 приседаний. 2-я минута — 10 отжиманий. 3-я минута — 20 скручиваний для пресса. Повторять цикл.'
        },
        {
            id: 'emom-cardio-20min',
            title: 'EMOM кардио',
            time: '20 минут',
            description: 'Кардиоинтенсивная тренировка. 1-я минута — 20 бёрпи. 2-я минута — 30 высоких коленей. 3-я минута — 15 прыжков с приседанием. Повторять цикл.'
        },
        {
            id: 'emom-strength-10min',
            title: 'EMOM на силу',
            time: '10 минут',
            description: 'Ориентированная на силу. 5 тяжёлых приседаний каждую минуту в течение 10 минут. Используйте дополнительный вес по возможности.'
        },
        {
            id: 'emom-upperbody-12min',
            title: 'EMOM для верхней части тела',
            time: '12 минут',
            description: '1-я минута — 12 отжиманий. 2-я минута — 10 подтягиваний (или тяга гантелей). 3-я минута — 15 отжиманий на трицепс. Повторять цикл.'
        },
        {
            id: 'emom-lowerbody-15min',
            title: 'EMOM для нижней части тела',
            time: '15 минут',
            description: '1-я минута — 20 приседаний. 2-я минута — 15 выпадов (по 7-8 на каждую ногу). 3-я минута — 20 подъёмов на носки. Повторять цикл.'
        },
        {
            id: 'emom-core-10min',
            title: 'EMOM для пресса',
            time: '10 минут',
            description: '1-я минута — 20 скручиваний. 2-я минута — планка 30 секунд. 3-я минута — 15 подъёмов ног. Повторять цикл.'
        }
    ];
    
    workouts.forEach(function(workout) {
        const card = document.createElement('div');
        card.className = 'emom-workout-card';
        card.setAttribute('data-workout-id', workout.id);
        
        card.innerHTML = `
            <div class="emom-workout-card-title">${workout.title}</div>
            <div class="emom-workout-card-time">${workout.time}</div>
            <div class="emom-workout-card-exercises">${workout.description}</div>
        `;
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
            selectEmomWorkout(workout);
        });
        
        cardsContainer.appendChild(card);
    });
}

function selectEmomWorkout(workout) {
    // Убираем активный класс со всех карточек
    const cards = document.querySelectorAll('.emom-workout-card');
    cards.forEach(function(card) {
        card.classList.remove('active');
    });
    
    // Добавляем активный класс к выбранной карточке
    const selectedCard = document.querySelector('[data-workout-id="' + workout.id + '"]');
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // Показываем описание тренировки под прогресс-баром только в режиме EMOM
    const workoutDescription = document.getElementById('emom-workout-description');
    const emomModeCheckbox = document.getElementById('emomMode');
    const isEmomMode = emomModeCheckbox && emomModeCheckbox.checked;
    
    if (workoutDescription && isEmomMode) { // Показываем только если активен режим EMOM
        workoutDescription.innerHTML = 
            '<button class="emom-workout-description-close" title="Закрыть">×</button>' +
            '<strong>' + workout.title + ' (' + workout.time + ')</strong><br>' + workout.description;
        workoutDescription.style.display = 'block';
        
        // Добавляем обработчик клика на кнопку закрытия
        const closeBtn = workoutDescription.querySelector('.emom-workout-description-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                workoutDescription.style.display = 'none';
                
                // Убираем активный класс с выбранной карточки
                const activeCard = document.querySelector('.emom-workout-card.active');
                if (activeCard) {
                    activeCard.classList.remove('active');
                }
                
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
            });
        }
    }
    
    // Устанавливаем время таймера на основе времени тренировки (если указано)
    const timeMatch = workout.time.match(/(\d+)\s*минут/);
    if (timeMatch) {
        const minutes = parseInt(timeMatch[1], 10);
        
        // Проверяем, что значение в допустимом диапазоне (5-30 минут)
        if (minutes >= 5 && minutes <= 30) {
            // Устанавливаем время в селекторе EMOM
            const minuteSelect = document.getElementById('emom-minute-select');
            if (minuteSelect) {
                // Устанавливаем значение в селекторе (значение должно быть числом)
                minuteSelect.value = minutes;
                
                // Триггерим событие change, чтобы обновить состояние таймера
                // Это вызовет обработчик, который обновит state.totalMinutes и updateTotalCount()
                const changeEvent = new Event('change', { bubbles: true });
                minuteSelect.dispatchEvent(changeEvent);
                
                console.log('Выбрана тренировка:', workout.title, 'Время установлено:', minutes, 'минут (', minutes, 'раундов)');
            } else {
                console.warn('Селектор emom-minute-select не найден');
            }
        } else {
            console.warn('Время тренировки вне допустимого диапазона (5-30 минут):', minutes);
        }
    }
    
    // Закрываем модальное окно
    closeEmomWorkoutsModal();
}

function hideEmomWorkoutDescription() {
    const workoutDescription = document.getElementById('emom-workout-description');
    if (workoutDescription) {
        workoutDescription.style.display = 'none';
    }
}

/**
 * Открывает модальное окно для выбора упражнений
 */
function openExerciseModal(e) {
    // Предотвращаем переход по умолчанию
    if (e) {
        e.preventDefault();
    }
    
    const modal = document.getElementById('exercise-modal');
    if (modal) {
        // Загружаем упражнения для текущего активного таба
        const activeTab = document.querySelector('.exercise-tab.active');
        const gender = activeTab.getAttribute('data-gender');
        
        // Загружаем упражнения
        loadExercises(gender, true);
        
        // Показываем/скрываем кнопку автоподбора в зависимости от режима
        const autoSelectButton = document.getElementById('auto-select-10-exercises');
        if (autoSelectButton) {
            if (window.timerMode === 2) {
                autoSelectButton.style.display = 'block';
            } else {
                autoSelectButton.style.display = 'none';
            }
        }
        
        // Показываем модальное окно
        modal.style.display = 'block';
        
        // Если есть выбранное упражнение, выделяем его
        highlightSelectedExercise();
    }
}

/**
 * Закрывает модальное окно выбора упражнений
 */
function closeExerciseModal(e) {
    // Предотвращаем переход по умолчанию
    if (e) {
        e.preventDefault();
        e.stopPropagation(); // Остановить дальнейшее распространение события
    }
    
    // Удаляем уведомление, если оно открыто
    const notification = document.getElementById('exercise-count-notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
    
    const modal = document.getElementById('exercise-modal');
    if (modal) {
        modal.style.display = 'none';
        
        // Получаем текущий URL и заменяем хеш
        const baseUrl = window.location.href.split('#')[0];
        // Используем прямое открытие нужной страницы в том же окне
        console.log(`Явное перенаправление на ${baseUrl}#timer`);
        window.open(baseUrl + '#timer', '_self');
    }
}

/**
 * Загружает список упражнений указанного типа
 * @param {string} gender - тип упражнений ('men' или 'women')
 * @param {boolean} reset - сбросить ли текущий список
 */
function loadExercises(gender, reset = false) {
    console.log(`Загрузка упражнений для ${gender}, reset: ${reset}`);

    const grid = document.getElementById('exercise-grid');
    if (!grid) return;

    // Очищаем сетку, если нужен сброс
    if (reset) {
        grid.innerHTML = '';
    }

    // Определяем путь к папке с упражнениями
    const folderPath = gender === 'men' ? 'images/Tabata | Man' : 'images/Tabata | Woman';

    // Если данные уже в кеше, используем их
    if (exerciseCache[gender]) {
        renderExercises(exerciseCache[gender], gender, reset ? 0 : grid.children.length, INITIAL_LOAD_COUNT);
        return;
    }
    
    // Здесь можно было бы сделать AJAX-запрос для получения списка файлов
    // Но мы знаем, что в каждой папке есть файлы с определенным паттерном имен

    const exerciseFiles = [];
    const prefix = gender === 'men' ? 'Tabata - Man - ' : 'Tabata - Woman - ';
    const start = gender === 'men' ? 1 : 1;
    const end = gender === 'men' ? 80 : 242;

    for (let i = start; i <= end; i++) {
        exerciseFiles.push({
            id: i,
            path: `${folderPath}/${prefix}${i}.webp`,
            name: `Упражнение ${i}`
        });
    }

    // Сохраняем в кеше
    exerciseCache[gender] = exerciseFiles;

    // Рендерим упражнения
    renderExercises(exerciseFiles, gender, reset ? 0 : grid.children.length, INITIAL_LOAD_COUNT);
}

/**
 * Рендерит упражнения в сетке
 */
function renderExercises(exercises, gender, startIndex, count) {
    const grid = document.getElementById('exercise-grid');
    if (!grid) return;

    const endIndex = Math.min(startIndex + count, exercises.length);
    
    // Оптимизация: убрали блокирующую проверку, показываем изображения сразу
    // Обработка ошибок происходит через onerror на самом изображении
    const renderItem = (exercise, i) => {
        const item = document.createElement('div');
        item.className = 'exercise-item';
        item.setAttribute('data-id', exercise.id);
        item.setAttribute('data-gender', gender);
        item.setAttribute('data-path', exercise.path);

        // Если это текущее выбранное упражнение, добавляем класс selected
        if (selectedExercise.id === exercise.id && selectedExercise.gender === gender) {
            item.classList.add('selected');
        }

        // Определяем альтернативный путь (GIF вместо WebP)
        const alternativePath = exercise.path.replace('.webp', '.gif');
        
        // Создаем изображение с обработкой ошибок
        const img = document.createElement('img');
        img.src = exercise.path;
        img.alt = exercise.name;
        img.loading = 'lazy';
        
        // Обработка ошибки: если WebP не загрузился, пробуем GIF
        img.onerror = function() {
            const currentSrc = this.src;
            // Если это еще не GIF версия, пробуем загрузить GIF
            if (currentSrc.indexOf('.webp') !== -1) {
                this.src = alternativePath;
                // Обновляем путь в data-атрибуте родительского элемента
                item.setAttribute('data-path', alternativePath);
            } else {
                // Если и GIF не загрузился, скрываем элемент
                console.warn(`Изображение не найдено: ${currentSrc}`);
                item.style.display = 'none';
            }
            // Убираем обработчик после использования
            this.onerror = null;
        };

        item.innerHTML = `
            <div class="exercise-name">${exercise.name}</div>
            <div class="select-overlay">
                <button class="select-button">Выбрать</button>
            </div>
        `;
        
        // Вставляем изображение в начало
        item.insertBefore(img, item.firstChild);

        // Обработчик нажатия на упражнение
        item.addEventListener('click', function(e) {
            // Предотвращаем стандартное поведение
            e.preventDefault();
            e.stopPropagation();

            // Если клик был по кнопке "Выбрать", выбираем упражнение
            if (e.target.classList.contains('select-button') ||
                e.target.closest('.select-button')) {
                
                // Воспроизводим звук клика
                if (typeof playClickEffectSound === 'function') {
                    playClickEffectSound();
                }
                
                // Запоминаем выбор
                window.tempSelectedExercise = {
                    id: this.getAttribute('data-id'),
                    gender: this.getAttribute('data-gender'),
                    path: this.getAttribute('data-path'),
                    name: this.querySelector('.exercise-name').textContent
                };

                // Подтверждаем выбор - используем setTimeout, чтобы дать событию завершиться
                setTimeout(function() {
                    confirmExerciseSelection();
                }, 10);

                return false; // Предотвращаем дальнейшую обработку
            }
            
            // В противном случае просто выделяем упражнение
            const items = document.querySelectorAll('.exercise-item');
            items.forEach(i => i.classList.remove('selected'));
            
            this.classList.add('selected');
            
            // Запоминаем временный выбор
            const tempSelection = {
                id: this.getAttribute('data-id'),
                gender: this.getAttribute('data-gender'),
                path: this.getAttribute('data-path'),
                name: this.querySelector('.exercise-name').textContent
            };
            
            // Сохраняем временно выбранное упражнение
            window.tempSelectedExercise = tempSelection;
            
            return false; // Предотвращаем дальнейшую обработку
        });

        grid.appendChild(item);
    };

    // Обрабатываем каждое упражнение синхронно (теперь это быстро!)
    for (let i = startIndex; i < endIndex; i++) {
        renderItem(exercises[i], i);
    }
    
    // Скрываем кнопку "Показать ещё", если все упражнения загружены
    const loadMoreButton = document.getElementById('load-more-exercises');
    if (loadMoreButton) {
        loadMoreButton.style.display = endIndex >= exercises.length ? 'none' : 'block';
    }
}

/**
 * Загружает дополнительные упражнения при нажатии "Показать ещё"
 * @param {string} gender - тип упражнений ('men' или 'women')
 */
function loadMoreExercises(gender) {
    const grid = document.getElementById('exercise-grid');
    if (!grid) return;
    
    const currentCount = grid.children.length;
    loadExercises(gender, false);
}

// Флаг для предотвращения множественных вызовов автоподбора
let isAutoSelecting = false;

/**
 * Автоматически выбирает 10 случайных упражнений из указанной категории
 * @param {string} gender - тип упражнений ('men' или 'women')
 */
function autoSelect10Exercises(gender) {
    // Предотвращаем множественные вызовы
    if (isAutoSelecting) {
        console.log('Автоподбор уже выполняется, пропускаем повторный вызов');
        return;
    }
    
    isAutoSelecting = true;
    
    // Проверяем, что мы в режиме HIIT
    if (window.timerMode !== 2) {
        alert('Автоподбор доступен только в режиме HIIT');
        isAutoSelecting = false;
        return;
    }
    
    // Очищаем текущую последовательность
    hiitExerciseSequence = [];
    currentHiitExerciseIndex = 0;
    
    // Получаем список всех доступных упражнений для выбранной категории
    let exerciseFiles = exerciseCache[gender];
    
    // Если кеш пуст, загружаем упражнения
    if (!exerciseFiles || exerciseFiles.length === 0) {
        const folderPath = gender === 'men' ? 'images/Tabata | Man' : 'images/Tabata | Woman';
        const prefix = gender === 'men' ? 'Tabata - Man - ' : 'Tabata - Woman - ';
        const start = 1;
        const end = gender === 'men' ? 80 : 242;
        
        exerciseFiles = [];
        for (let i = start; i <= end; i++) {
            exerciseFiles.push({
                id: i,
                path: `${folderPath}/${prefix}${i}.webp`,
                name: `Упражнение ${i}`,
                gender: gender
            });
        }
        
        exerciseCache[gender] = exerciseFiles;
    }
    
    // Если упражнений меньше 10, используем все доступные
    const countToSelect = Math.min(10, exerciseFiles.length);
    
    // Создаем копию массива для перемешивания
    const shuffled = [...exerciseFiles];
    
    // Перемешиваем массив (алгоритм Фишера-Йетса)
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Выбираем первые 10 (или меньше, если доступно меньше упражнений)
    const selectedExercises = shuffled.slice(0, countToSelect);
    
    // Добавляем выбранные упражнения в последовательность HIIT
    hiitExerciseSequence = selectedExercises;
    currentHiitExerciseIndex = 0;
    
    // Сохраняем в localStorage
    localStorage.setItem('hiitExerciseSequence', JSON.stringify(hiitExerciseSequence));
    localStorage.setItem('currentHiitExerciseIndex', currentHiitExerciseIndex.toString());
    
    console.log(`Автоподбор: выбрано ${selectedExercises.length} упражнений для категории "${gender}"`);
    
    // Обновляем отображение
    updateExerciseDisplay();
    
    // Показываем уведомление
    showExerciseCountNotification(selectedExercises.length);
    
    // Закрываем модальное окно и перебрасываем на таймер
    setTimeout(() => {
        const modal = document.getElementById('exercise-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Сбрасываем флаг
        isAutoSelecting = false;
        
        // Перебрасываем на таймер HIIT
        const baseUrl = window.location.href.split('#')[0];
        console.log(`Автоподбор завершен! Выбрано ${selectedExercises.length} упражнений. Переход на таймер HIIT.`);
        window.location.href = baseUrl + '#timer';
    }, 500);
}

/**
 * Выделяет текущее выбранное упражнение в сетке
 */
function highlightSelectedExercise() {
    if (!selectedExercise.id) return;
    
    const items = document.querySelectorAll('.exercise-item');
    items.forEach(item => {
        const id = item.getAttribute('data-id');
        const gender = item.getAttribute('data-gender');
        
        if (id == selectedExercise.id && gender === selectedExercise.gender) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    
    // Устанавливаем активный таб
    const tabs = document.querySelectorAll('.exercise-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-gender') === selectedExercise.gender) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

/**
 * Подтверждает выбор упражнения
 */
function confirmExerciseSelection(e) {
    // Предотвращаем переход по умолчанию
    if (e) {
        e.preventDefault();
        e.stopPropagation(); // Остановить дальнейшее распространение события
    }
    
    // Если есть временно выбранное упражнение, применяем его
    if (window.tempSelectedExercise) {
        const newExercise = {...window.tempSelectedExercise};
        
        // Проверяем режим: HIIT (timerMode === 2) - добавляем в последовательность
        if (window.timerMode === 2) {
            // Режим HIIT - добавляем упражнение в последовательность
            if (hiitExerciseSequence.length >= MAX_HIIT_EXERCISES) {
                alert(`Максимальное количество упражнений: ${MAX_HIIT_EXERCISES}. Удалите одно из существующих, чтобы добавить новое.`);
                return;
            }
            
            // Проверяем, не добавлено ли уже это упражнение (опционально)
            // Можно разрешить дубликаты, поэтому закомментируем проверку
            // const alreadyExists = hiitExerciseSequence.some(ex => ex.id === newExercise.id && ex.gender === newExercise.gender);
            // if (alreadyExists) {
            //     alert('Это упражнение уже добавлено в последовательность');
            //     return;
            // }
            
            // Добавляем упражнение в последовательность
            hiitExerciseSequence.push(newExercise);
            
            // Переключаемся на только что добавленное упражнение
            currentHiitExerciseIndex = hiitExerciseSequence.length - 1;
            localStorage.setItem('currentHiitExerciseIndex', currentHiitExerciseIndex.toString());
            
            // Сохраняем последовательность в localStorage
            localStorage.setItem('hiitExerciseSequence', JSON.stringify(hiitExerciseSequence));
            
            console.log(`Упражнение добавлено в последовательность. Всего: ${hiitExerciseSequence.length}/${MAX_HIIT_EXERCISES}`);
            
            // Обновляем отображение
            updateExerciseDisplay();
            
            // Не закрываем модальное окно, чтобы пользователь мог добавить еще упражнения
            // Но показываем уведомление о количестве
            const modal = document.getElementById('exercise-modal');
            if (modal) {
                // Можно показать краткое уведомление
                showExerciseCountNotification(hiitExerciseSequence.length);
            }
            
            // Очищаем временный выбор
            window.tempSelectedExercise = null;
            
            // Если достигнут лимит, закрываем модальное окно
            if (hiitExerciseSequence.length >= MAX_HIIT_EXERCISES) {
                closeExerciseModal();
                alert(`Добавлено максимальное количество упражнений (${MAX_HIIT_EXERCISES}). Тренировка готова!`);
            }
            
        } else {
            // Режим Tabata - заменяем одно упражнение (старое поведение)
            selectedExercise = newExercise;
        
        // Сохраняем выбор в localStorage для сохранения между сессиями
        localStorage.setItem('selectedExercise', JSON.stringify(selectedExercise));
        
        // Сбрасываем состояние скрытия при выборе нового упражнения
        isExerciseHidden = false;
        localStorage.removeItem('exerciseHidden');
        
        // Обновляем отображение
        updateExerciseDisplay();
        
        // Закрываем модальное окно - используем прямой способ
        const modal = document.getElementById('exercise-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Получаем текущий URL и заменяем хеш
        const baseUrl = window.location.href.split('#')[0];
        // Используем прямое открытие нужной страницы в том же окне
        console.log(`Явное перенаправление на ${baseUrl}#timer`);
        window.open(baseUrl + '#timer', '_self');
        }
    } else if (selectedExercise.id || (window.timerMode === 2 && hiitExerciseSequence.length > 0)) {
        // Если пользователь ничего не выбрал, но есть предыдущий выбор, закрываем окно
        closeExerciseModal();
    } else {
        // Если ничего не выбрано, предупреждаем пользователя
        alert('Выберите упражнение или нажмите крестик для закрытия');
    }
}

/**
 * Обновляет отображение выбранного упражнения
 */
function updateExerciseDisplay() {
    const container = document.getElementById('selected-exercise-container');
    
    if (!container) return;
    
    // Проверяем режим HIIT
    if (window.timerMode === 2) {
        // Режим HIIT - отображаем последовательность упражнений
        updateHiitExerciseSequenceDisplay();
    } else {
        // Режим Tabata - отображаем одно упражнение (старое поведение)
    const image = document.getElementById('selected-exercise-image');
    const title = document.getElementById('exercise-title');
    
        if (!image || !title) return;
    
    if (selectedExercise.id) {
        // Если есть выбранное упражнение, показываем его
        // Для WebP файлов используем статический кадр при инициализации
        const newImage = new Image();
        newImage.id = 'selected-exercise-image';
        newImage.alt = 'Выбранное упражнение';
        // Используем временную метку для предотвращения кеширования
        const timestamp = new Date().getTime();
        newImage.src = `${selectedExercise.path}#t=0&cachebust=${timestamp}`;
        newImage.isAnimating = false;
        newImage.style.width = '100%';
        newImage.style.maxWidth = '400px';
        newImage.style.borderRadius = '50px';
        newImage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        newImage.style.display = 'block';
        newImage.style.margin = '0 auto';
        
        // Заменяем старое изображение новым
        if (image.parentNode) {
            image.parentNode.replaceChild(newImage, image);
        }
        
        title.textContent = selectedExercise.name;
        
        // Проверяем состояние скрытия перед показом контейнера
        const savedHiddenState = localStorage.getItem('exerciseHidden');
        isExerciseHidden = savedHiddenState === 'true';
        
        // Показываем контейнер только если упражнение не скрыто
        if (!isExerciseHidden) {
            container.classList.add('active');
        } else {
            container.classList.remove('active');
        }
        
        // Настраиваем обработчики для кнопок управления после обновления изображения
        setupExerciseControlButtons();
        
        // Явно отмечаем, что анимация остановлена
        console.log('Изображение инициализировано с остановленной анимацией');
        
        // Синхронизируем с фазами таймера после небольшой задержки
        setTimeout(() => {
            syncExerciseWithTimer();
        }, 100);
    } else {
        // Если упражнение не выбрано, скрываем контейнер
        container.classList.remove('active');
        }
    }
}

/**
 * Отображает последовательность упражнений для режима HIIT
 */
function updateHiitExerciseSequenceDisplay() {
    const container = document.getElementById('selected-exercise-container');
    if (!container) return;
    
    // Загружаем последовательность из localStorage, если есть
    const savedSequence = localStorage.getItem('hiitExerciseSequence');
    if (savedSequence) {
        try {
            hiitExerciseSequence = JSON.parse(savedSequence);
        } catch (e) {
            console.error('Ошибка при загрузке последовательности упражнений:', e);
            hiitExerciseSequence = [];
        }
    }
    
    // Загружаем сохраненный индекс текущего упражнения
    const savedIndex = localStorage.getItem('currentHiitExerciseIndex');
    if (savedIndex !== null) {
        currentHiitExerciseIndex = parseInt(savedIndex, 10);
        // Проверяем, что индекс валиден
        if (currentHiitExerciseIndex < 0 || currentHiitExerciseIndex >= hiitExerciseSequence.length) {
            currentHiitExerciseIndex = 0;
        }
    }
    
    if (hiitExerciseSequence.length > 0) {
        container.classList.add('active');
        
        // Проверяем, запущена ли тренировка
        const timer = window.newtimer;
        const isTimerRunning = timer && timer.isRunning === true;
        
        // Если тренировка запущена, используем логику из syncHiitExerciseSequenceWithTimer
        if (isTimerRunning) {
            // Большое изображение будет управляться syncHiitExerciseSequenceWithTimer
            return;
        }
        
        // Показываем большое изображение текущего выбранного упражнения
        showCurrentHiitExercise(container);
        
        // Показываем карточки с номерами для переключения
        showHiitExerciseCards(container);
        
    } else {
        // Если последовательность пуста, скрываем контейнер
        container.classList.remove('active');
    }
}

/**
 * Показывает большое изображение текущего выбранного упражнения
 */
function showCurrentHiitExercise(container) {
    if (hiitExerciseSequence.length === 0 || currentHiitExerciseIndex >= hiitExerciseSequence.length) {
        return;
    }
    
    const currentExercise = hiitExerciseSequence[currentHiitExerciseIndex];
    if (!currentExercise) return;
    
    // Находим или создаем контейнер для большого изображения
    let imageWrapper = container.querySelector('.exercise-image-wrapper');
    let largeImage = document.getElementById('selected-exercise-image');
    let title = document.getElementById('exercise-title');
    
    if (!imageWrapper) {
        imageWrapper = document.createElement('div');
        imageWrapper.className = 'exercise-image-wrapper';
        container.insertBefore(imageWrapper, container.firstChild);
    }
    
    // Показываем контейнер
    imageWrapper.style.display = 'block';
    
    // Создаем или обновляем заголовок
    if (!title) {
        title = document.createElement('div');
        title.id = 'exercise-title';
        container.insertBefore(title, imageWrapper);
    }
    title.textContent = `${currentExercise.name} (${currentHiitExerciseIndex + 1}/${hiitExerciseSequence.length})`;
    
    // Создаем или обновляем изображение
    if (!largeImage) {
        largeImage = document.createElement('img');
        largeImage.id = 'selected-exercise-image';
        largeImage.alt = currentExercise.name;
        imageWrapper.appendChild(largeImage);
    }
    
    // Обновляем источник изображения
    const timestamp = new Date().getTime();
    largeImage.src = `${currentExercise.path}#t=0&cachebust=${timestamp}`;
    largeImage.style.width = '100%';
    largeImage.style.maxWidth = '400px';
    largeImage.style.borderRadius = '50px';
    largeImage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    largeImage.style.display = 'block';
    largeImage.style.margin = '0 auto';
    largeImage.isAnimating = false;
    
    // Добавляем стрелки для переключения упражнений (только если есть больше одного упражнения)
    if (hiitExerciseSequence.length > 1) {
        createHiitExerciseNavigationArrows(imageWrapper);
    } else {
        // Удаляем стрелки, если упражнение одно
        const prevArrow = imageWrapper.querySelector('.hiit-nav-arrow-prev');
        const nextArrow = imageWrapper.querySelector('.hiit-nav-arrow-next');
        if (prevArrow) prevArrow.remove();
        if (nextArrow) nextArrow.remove();
    }
}

/**
 * Создает стрелки навигации для переключения упражнений
 */
function createHiitExerciseNavigationArrows(imageWrapper) {
    // Удаляем старые стрелки, если есть
    const oldPrevArrow = imageWrapper.querySelector('.hiit-nav-arrow-prev');
    const oldNextArrow = imageWrapper.querySelector('.hiit-nav-arrow-next');
    if (oldPrevArrow) oldPrevArrow.remove();
    if (oldNextArrow) oldNextArrow.remove();
    
    // Создаем стрелку влево (предыдущее упражнение)
    const prevArrow = document.createElement('button');
    prevArrow.className = 'hiit-nav-arrow hiit-nav-arrow-prev';
    prevArrow.innerHTML = '←';
    prevArrow.title = 'Предыдущее упражнение';
    prevArrow.onclick = function(e) {
        e.stopPropagation();
        navigateToPreviousExercise();
    };
    
    // Создаем стрелку вправо (следующее упражнение)
    const nextArrow = document.createElement('button');
    nextArrow.className = 'hiit-nav-arrow hiit-nav-arrow-next';
    nextArrow.innerHTML = '→';
    nextArrow.title = 'Следующее упражнение';
    nextArrow.onclick = function(e) {
        e.stopPropagation();
        navigateToNextExercise();
    };
    
    imageWrapper.appendChild(prevArrow);
    imageWrapper.appendChild(nextArrow);
}

/**
 * Переключает на предыдущее упражнение
 */
function navigateToPreviousExercise() {
    if (hiitExerciseSequence.length === 0) return;
    
    if (currentHiitExerciseIndex > 0) {
        currentHiitExerciseIndex--;
    } else {
        // Если первое упражнение, переключаемся на последнее (циклическая навигация)
        currentHiitExerciseIndex = hiitExerciseSequence.length - 1;
    }
    
    localStorage.setItem('currentHiitExerciseIndex', currentHiitExerciseIndex.toString());
    
    // Обновляем отображение
    const container = document.getElementById('selected-exercise-container');
    if (container) {
        showCurrentHiitExercise(container);
        showHiitExerciseCards(container);
    }
    
    if (typeof playClickEffectSound === 'function') {
        playClickEffectSound();
    }
}

/**
 * Переключает на следующее упражнение
 */
function navigateToNextExercise() {
    if (hiitExerciseSequence.length === 0) return;
    
    if (currentHiitExerciseIndex < hiitExerciseSequence.length - 1) {
        currentHiitExerciseIndex++;
    } else {
        // Если последнее упражнение, переключаемся на первое (циклическая навигация)
        currentHiitExerciseIndex = 0;
    }
    
    localStorage.setItem('currentHiitExerciseIndex', currentHiitExerciseIndex.toString());
    
    // Обновляем отображение
    const container = document.getElementById('selected-exercise-container');
    if (container) {
        showCurrentHiitExercise(container);
        showHiitExerciseCards(container);
    }
    
    if (typeof playClickEffectSound === 'function') {
        playClickEffectSound();
    }
}

/**
 * Показывает карточки с номерами упражнений для переключения
 */
function showHiitExerciseCards(container) {
    // Находим или создаем контейнер для карточек
    let sequenceContainer = document.getElementById('hiit-exercise-sequence');
    
    if (!sequenceContainer) {
        sequenceContainer = document.createElement('div');
        sequenceContainer.id = 'hiit-exercise-sequence';
        sequenceContainer.className = 'hiit-exercise-sequence';
        container.appendChild(sequenceContainer);
    }
    
    sequenceContainer.style.display = 'block';
    
    // Очищаем содержимое
    sequenceContainer.innerHTML = '';
    
    // Создаем заголовок
    const title = document.createElement('div');
    title.className = 'hiit-sequence-title';
    title.textContent = `Выберите упражнение (${hiitExerciseSequence.length}/${MAX_HIIT_EXERCISES})`;
    sequenceContainer.appendChild(title);
    
    // Создаем контейнер для карточек упражнений
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'hiit-exercise-cards';
    sequenceContainer.appendChild(cardsContainer);
    
    // Добавляем обработчики drag and drop на контейнер для поддержки drop между карточками
    cardsContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
    });
    
    cardsContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Если drop произошел на контейнер, а не на карточку, обрабатываем его
        const draggingCard = document.querySelector('.hiit-exercise-card.dragging');
        if (draggingCard) {
            const draggingIndex = parseInt(draggingCard.getAttribute('data-index'), 10);
            
            // Находим ближайшую карточку к точке drop
            const cards = Array.from(document.querySelectorAll('.hiit-exercise-card:not(.dragging)'));
            let closestCard = null;
            let minDistance = Infinity;
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + 
                    Math.pow(e.clientY - centerY, 2)
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });
            
            if (closestCard) {
                const dropIndex = parseInt(closestCard.getAttribute('data-index'), 10);
                if (draggingIndex !== dropIndex && !isNaN(draggingIndex) && !isNaN(dropIndex)) {
                    reorderHiitExercises(draggingIndex, dropIndex);
                }
            }
            
            // Убираем классы
            draggingCard.classList.remove('dragging');
            document.querySelectorAll('.hiit-exercise-card').forEach(c => {
                c.classList.remove('drag-over');
            });
        }
    });
    
    // Создаем карточки для каждого упражнения
    hiitExerciseSequence.forEach((exercise, index) => {
        const card = createHiitExerciseCard(exercise, index, index === currentHiitExerciseIndex);
        cardsContainer.appendChild(card);
    });
    
    // Добавляем чекбокс для включения/отключения синхронизации упражнений с раундами
    // Проверяем, не создан ли уже чекбокс
    let syncCheckboxWrapper = sequenceContainer.querySelector('.hiit-sync-checkbox-wrapper');
    if (!syncCheckboxWrapper) {
        syncCheckboxWrapper = document.createElement('div');
        syncCheckboxWrapper.className = 'hiit-sync-checkbox-wrapper';
        syncCheckboxWrapper.style.cssText = 'margin-top: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 0 10px;';
        
        const syncCheckbox = document.createElement('input');
        syncCheckbox.type = 'checkbox';
        syncCheckbox.id = 'hiit-exercise-round-sync';
        syncCheckbox.checked = hiitExerciseRoundSyncEnabled;
        
        const syncLabel = document.createElement('label');
        syncLabel.htmlFor = 'hiit-exercise-round-sync';
        syncLabel.style.cssText = 'color: rgba(255, 255, 255, 0.8); font-size: 0.9em; cursor: pointer; user-select: none; display: flex; align-items: center; gap: 6px;';
        
        // Текст label
        const labelText = document.createTextNode('СВЯЗАТЬ УПРАЖНЕНИЯ С РАУНДАМИ');
        syncLabel.appendChild(labelText);
        
        // Информационная иконка
        const infoIcon = document.createElement('span');
        infoIcon.className = 'info-icon';
        infoIcon.textContent = 'ℹ';
        infoIcon.title = 'Информация о функции "Связать упражнения с раундами"';
        infoIcon.style.cssText = 'display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; font-size: 14px; font-weight: bold; color: rgba(255, 255, 255, 0.9); cursor: pointer; margin-left: 2px; vertical-align: middle; transition: all 0.3s ease; flex-shrink: 0;';
        
        // Обработчик клика на иконку
        infoIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            // Проверяем, существует ли функция showModeInfo, и вызываем её
            if (typeof window.showModeInfo === 'function') {
                window.showModeInfo('hiit-sync');
            } else {
                // Если функция не найдена, создаем простое модальное окно
                alert('Функция "Связать упражнения с раундами" автоматически переключает упражнения в соответствии с текущим раундом тренировки. На фазе "Отдыхаем" показывается следующее упражнение, чтобы вы могли подготовиться к следующему раунду.');
            }
        });
        
        // Эффект при наведении
        infoIcon.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            this.style.color = '#fff';
            this.style.transform = 'scale(1.1)';
        });
        
        infoIcon.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            this.style.color = 'rgba(255, 255, 255, 0.9)';
            this.style.transform = 'scale(1)';
        });
        
        syncLabel.appendChild(infoIcon);
        
        // Обработчик изменения чекбокса
        syncCheckbox.addEventListener('change', function() {
            hiitExerciseRoundSyncEnabled = this.checked;
            localStorage.setItem('hiitExerciseRoundSyncEnabled', hiitExerciseRoundSyncEnabled.toString());
        });
        
        syncCheckboxWrapper.appendChild(syncCheckbox);
        syncCheckboxWrapper.appendChild(syncLabel);
        sequenceContainer.appendChild(syncCheckboxWrapper);
    } else {
        // Обновляем состояние чекбокса, если он уже существует
        const syncCheckbox = syncCheckboxWrapper.querySelector('#hiit-exercise-round-sync');
        if (syncCheckbox) {
            syncCheckbox.checked = hiitExerciseRoundSyncEnabled;
        }
    }
}

/**
 * Создает карточку упражнения для последовательности HIIT
 */
function createHiitExerciseCard(exercise, index, isActive = false) {
    const card = document.createElement('div');
    card.className = 'hiit-exercise-card';
    if (isActive) {
        card.classList.add('active');
    }
    card.setAttribute('data-index', index);
    
    // Всегда включаем draggable - на десктопе будет работать drag, на мобильных используем touch
    card.draggable = true;
    card.setAttribute('draggable', 'true'); // Явно устанавливаем атрибут для гарантии
    
    // Убеждаемся, что draggable установлен
    if (!card.draggable) {
        card.draggable = true;
        card.setAttribute('draggable', 'true');
    }
    
    const cardNumber = document.createElement('div');
    cardNumber.className = 'hiit-exercise-number';
    cardNumber.textContent = index + 1;
    cardNumber.draggable = false; // Номер не должен быть перетаскиваемым
    cardNumber.setAttribute('draggable', 'false');
    
    const cardImage = document.createElement('img');
    cardImage.src = exercise.path;
    cardImage.alt = exercise.name;
    cardImage.className = 'hiit-exercise-thumbnail';
    cardImage.draggable = false; // Изображение не должно быть перетаскиваемым
    cardImage.setAttribute('draggable', 'false'); // Явно отключаем drag для изображения
    
    // Обработка ошибки загрузки изображения (fallback на GIF)
    cardImage.onerror = function() {
        const alternativePath = this.src.replace('.webp', '.gif');
        if (this.src !== alternativePath) {
            this.src = alternativePath;
        }
    };
    
    const cardName = document.createElement('div');
    cardName.className = 'hiit-exercise-name';
    cardName.textContent = exercise.name;
    cardName.draggable = false; // Название не должно быть перетаскиваемым
    cardName.setAttribute('draggable', 'false');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'hiit-exercise-delete';
    deleteBtn.innerHTML = '×';
    deleteBtn.title = 'Удалить упражнение';
    deleteBtn.draggable = false; // Кнопка не должна быть перетаскиваемой
    deleteBtn.onclick = function(e) {
        e.stopPropagation();
        removeExerciseFromSequence(index);
    };
    
    // Флаг для отслеживания перетаскивания (чтобы избежать конфликта с кликом)
    let isDragging = false;
    
    // Добавляем обработчики drag and drop (работает на всех устройствах)
    card.addEventListener('dragstart', function(e) {
        console.log('dragstart event triggered', {
            target: e.target,
            currentTarget: e.currentTarget,
            targetClass: e.target.className,
            isDeleteBtn: e.target.classList.contains('hiit-exercise-delete') || e.target.closest('.hiit-exercise-delete')
        });
        
        // Если клик был на кнопке удаления, не начинаем drag
        if (e.target.classList.contains('hiit-exercise-delete') || 
            e.target.closest('.hiit-exercise-delete')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Drag cancelled - clicked on delete button');
            return false;
        }
        
        isDragging = true;
        
        // Устанавливаем данные для drag
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.setData('text/html', this.outerHTML);
        
        // Устанавливаем изображение для drag preview
        try {
            if (this.querySelector('.hiit-exercise-thumbnail')) {
                const img = this.querySelector('.hiit-exercise-thumbnail');
                if (img.complete && img.naturalWidth > 0) {
                    e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
                }
            }
        } catch (err) {
            console.warn('Error setting drag image:', err);
        }
        
        this.classList.add('dragging');
        
        console.log('Drag started successfully for card index:', index);
        
        if (typeof playClickEffectSound === 'function') {
            playClickEffectSound();
        }
    }, false);
    
    card.addEventListener('dragend', function(e) {
        isDragging = false;
        this.classList.remove('dragging');
        // Убираем классы drag-over со всех карточек
        document.querySelectorAll('.hiit-exercise-card').forEach(c => {
            c.classList.remove('drag-over');
        });
        
        console.log('Drag ended for card index:', index);
    });
    
    card.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const draggingCard = document.querySelector('.hiit-exercise-card.dragging');
        if (!draggingCard || draggingCard === this) return;
        
        // Убираем класс drag-over со всех карточек
        document.querySelectorAll('.hiit-exercise-card').forEach(c => {
            if (c !== draggingCard) {
                c.classList.remove('drag-over');
            }
        });
        
        // Добавляем класс drag-over к текущей карточке
        this.classList.add('drag-over');
    });
    
    card.addEventListener('dragenter', function(e) {
        e.preventDefault();
    });
    
    card.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const draggingIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const dropIndex = parseInt(this.getAttribute('data-index'), 10);
        
        console.log('Drop: from index', draggingIndex, 'to index', dropIndex);
        
        // Переупорядочиваем только если индексы разные
        if (draggingIndex !== dropIndex && !isNaN(draggingIndex) && !isNaN(dropIndex)) {
            reorderHiitExercises(draggingIndex, dropIndex);
        }
        
        // Убираем классы
        this.classList.remove('drag-over');
        document.querySelectorAll('.hiit-exercise-card').forEach(c => {
            c.classList.remove('dragging', 'drag-over');
        });
        
        isDragging = false;
    });
    
    // Добавляем обработчики touch событий для мобильных устройств (iOS/Android)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchCard = null;
    let isDraggingTouch = false;
    let touchStartTime = 0;
    
    card.addEventListener('touchstart', function(e) {
        // Проверяем, что не кликнули на кнопку удаления
        if (e.target.classList.contains('hiit-exercise-delete') || 
            e.target.closest('.hiit-exercise-delete')) {
            return;
        }
        
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchStartTime = Date.now();
        touchCard = this;
        isDraggingTouch = false;
        
        // Вычисляем смещение относительно точки касания для точного позиционирования
        const rect = this.getBoundingClientRect();
        // Смещение по X - от левого края карточки до точки касания
        // getBoundingClientRect() возвращает координаты относительно viewport
        this._touchOffsetX = touch.clientX - rect.left;
        // Смещение по Y - от верхнего края карточки до точки касания
        // Карточка должна быть точно под пальцем, без дополнительного смещения
        this._touchOffsetY = touch.clientY - rect.top;
        
        // Сохраняем начальные координаты для отладки и пересчета
        this._initialRect = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
        };
        
        // Сохраняем координаты касания в момент touchstart для последующего использования
        this._touchStartX = touch.clientX;
        this._touchStartY = touch.clientY;
        
        // Сохраняем прокрутку страницы, если она есть
        this._scrollY = window.scrollY || window.pageYOffset || 0;
        
        // Предотвращаем прокрутку при начале перетаскивания только на мобильных
        // На десктопе не блокируем события, чтобы drag работал
        if (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            e.preventDefault();
        }
    }, { passive: false });
    
    card.addEventListener('touchmove', function(e) {
        if (!touchCard || touchCard !== this) return;
        
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartX);
        const deltaY = Math.abs(touch.clientY - touchStartY);
        
        // Если смещение больше 10px, начинаем перетаскивание
        if (!isDraggingTouch && (deltaX > 10 || deltaY > 10)) {
            isDraggingTouch = true;
            this.classList.add('dragging');
            
            // Сохраняем размер карточки перед изменением позиции
            const rect = this.getBoundingClientRect();
            
            // КРИТИЧЕСКИ ВАЖНО: Используем смещение из touchstart напрямую
            // Это смещение представляет физическое расстояние от края карточки до точки касания
            // и НЕ должно меняться при изменении position (static -> fixed)
            
            // Используем смещение, вычисленное в touchstart
            let offsetX = this._touchOffsetX;
            let offsetY = this._touchOffsetY;
            
            // Если смещение не было установлено, вычисляем его на основе текущего положения
            if (offsetX === undefined || offsetY === undefined) {
                offsetX = touch.clientX - rect.left;
                offsetY = touch.clientY - rect.top;
            }
            
            // Сохраняем размер карточки и начальную позицию
            const cardWidth = rect.width;
            const initialLeft = rect.left;
            const initialTop = rect.top;
            
            
            // Устанавливаем position: fixed в исходной позиции карточки
            // Это предотвращает "прыжок" карточки
            this.style.position = 'fixed';
            this.style.width = cardWidth + 'px';
            this.style.zIndex = '10000';
            this.style.transition = 'none';
            this.style.left = initialLeft + 'px';
            this.style.top = initialTop + 'px';
            
            // Принудительный reflow, чтобы браузер применил position: fixed
            void this.offsetHeight;
            
            // После установки position: fixed проверяем фактическую позицию карточки
            const newRect = this.getBoundingClientRect();
            const actualLeft = newRect.left;
            const actualTop = newRect.top;
            
            // Если позиция изменилась (из-за прокрутки или трансформаций), корректируем
            const leftDiff = actualLeft - initialLeft;
            const topDiff = actualTop - initialTop;
            
            // Теперь используем transform для точного перемещения к точке касания
            // Учитываем разницу между ожидаемой и фактической позицией
            const deltaX = touch.clientX - actualLeft - offsetX;
            const deltaY = touch.clientY - actualTop - offsetY;
            
            this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
            this.style.transformOrigin = `${offsetX}px ${offsetY}px`;
            
            // Сохраняем смещение и фактическую начальную позицию для использования в дальнейшем движении
            this._touchOffsetX = offsetX;
            this._touchOffsetY = offsetY;
            this._initialLeft = actualLeft; // Используем фактическую позицию после position: fixed
            this._initialTop = actualTop;
            
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
        }
        
        if (isDraggingTouch) {
            e.preventDefault();
            
            // Обновляем позицию карточки точно под пальцем
            // Используем transform для точного перемещения
            const offsetX = this._touchOffsetX || 0;
            const offsetY = this._touchOffsetY || 0;
            const initialLeft = this._initialLeft || 0;
            const initialTop = this._initialTop || 0;
            
            // Вычисляем смещение от начальной позиции к точке касания
            const deltaX = touch.clientX - initialLeft - offsetX;
            const deltaY = touch.clientY - initialTop - offsetY;
            
            // Применяем transform для перемещения
            this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
            this.style.transformOrigin = `${offsetX}px ${offsetY}px`;
            
            // Определяем, на какую карточку указывает палец
            // Используем небольшую задержку, чтобы получить элемент под пальцем
            const x = touch.clientX;
            const y = touch.clientY;
            
            // Временно скрываем перетаскиваемую карточку, чтобы найти элемент под ней
            const originalDisplay = this.style.display;
            this.style.pointerEvents = 'none';
            
            const elementBelow = document.elementFromPoint(x, y);
            const cardBelow = elementBelow ? elementBelow.closest('.hiit-exercise-card') : null;
            
            this.style.pointerEvents = '';
            
            // Убираем класс drag-over со всех карточек
            document.querySelectorAll('.hiit-exercise-card').forEach(c => {
                if (c !== this) {
                    c.classList.remove('drag-over');
                }
            });
            
            // Добавляем класс drag-over к карточке под пальцем
            if (cardBelow && cardBelow !== this) {
                cardBelow.classList.add('drag-over');
            }
        }
    }, { passive: false });
    
    card.addEventListener('touchend', function(e) {
        if (!touchCard || touchCard !== this) return;
        
        const touch = e.changedTouches[0];
        
        if (isDraggingTouch) {
            e.preventDefault();
            
            // Сбрасываем позиционирование
            this.style.position = '';
            this.style.left = '';
            this.style.top = '';
            this.style.width = '';
            this.style.zIndex = '';
            this.style.transform = '';
            this.style.transformOrigin = '';
            this.style.transition = '';
            this.style.pointerEvents = '';
            
            // Очищаем сохраненные смещения и начальные позиции
            delete this._touchOffsetX;
            delete this._touchOffsetY;
            delete this._initialLeft;
            delete this._initialTop;
            
            // Определяем, на какую карточку был сброс
            // Используем координаты для поиска элемента
            this.style.pointerEvents = 'none';
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const cardBelow = elementBelow ? elementBelow.closest('.hiit-exercise-card') : null;
            this.style.pointerEvents = '';
            
            // Если не нашли карточку напрямую, ищем ближайшую по координатам
            let targetCard = cardBelow;
            if (!targetCard || targetCard === this) {
                const cards = Array.from(document.querySelectorAll('.hiit-exercise-card:not(.dragging)'));
                let minDistance = Infinity;
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const distance = Math.sqrt(
                        Math.pow(touch.clientX - centerX, 2) + 
                        Math.pow(touch.clientY - centerY, 2)
                    );
                    if (distance < minDistance) {
                        minDistance = distance;
                        targetCard = card;
                    }
                });
            }
            
            if (targetCard && targetCard !== this) {
                const draggingIndex = parseInt(this.getAttribute('data-index'), 10);
                const dropIndex = parseInt(targetCard.getAttribute('data-index'), 10);
                
                // Переупорядочиваем только если индексы разные
                if (draggingIndex !== dropIndex) {
                    reorderHiitExercises(draggingIndex, dropIndex);
                }
            }
            
            // Убираем классы
            this.classList.remove('dragging');
            document.querySelectorAll('.hiit-exercise-card').forEach(c => {
                c.classList.remove('drag-over');
            });
        } else {
            // Если не было перетаскивания, обрабатываем как клик
            // Проверяем, что прошло достаточно времени (не был долгий тап)
            if (Date.now() - touchStartTime < 300) {
                // Небольшая задержка, чтобы избежать конфликта с touch событиями
                setTimeout(() => {
                    switchToHiitExercise(index);
                    if (typeof playClickEffectSound === 'function') {
                        playClickEffectSound();
                    }
                }, 50);
            }
        }
        
        // Сбрасываем состояние
        touchCard = null;
        isDraggingTouch = false;
    }, { passive: false });
    
    card.addEventListener('touchcancel', function(e) {
        // Убираем классы при отмене touch события
        this.classList.remove('dragging');
        this.style.position = '';
        this.style.left = '';
        this.style.top = '';
        this.style.width = '';
        this.style.zIndex = '';
        this.style.transform = '';
        this.style.transition = '';
        this.style.pointerEvents = '';
        document.querySelectorAll('.hiit-exercise-card').forEach(c => {
            c.classList.remove('drag-over');
        });
        touchCard = null;
        isDraggingTouch = false;
        
        // Очищаем сохраненные смещения
        delete this._touchOffsetX;
        delete this._touchOffsetY;
    });
    
    // Добавляем обработчик клика на карточку для переключения упражнения
    card.addEventListener('click', function(e) {
        // Не переключаем, если кликнули на кнопку удаления или перетаскивали
        if (e.target.classList.contains('hiit-exercise-delete') || 
            e.target.closest('.hiit-exercise-delete')) {
            return;
        }
        
        // Не переключаем, если только что закончили drag and drop
        if (isDragging || this.classList.contains('dragging')) {
            return;
        }
        
        // Переключаем на выбранное упражнение
        switchToHiitExercise(index);
        
        if (typeof playClickEffectSound === 'function') {
            playClickEffectSound();
        }
    });
    
    card.appendChild(cardNumber);
    card.appendChild(cardImage);
    card.appendChild(cardName);
    card.appendChild(deleteBtn);
    
    return card;
}

/**
 * Переключает на выбранное упражнение из последовательности
 */
function switchToHiitExercise(index) {
    if (index < 0 || index >= hiitExerciseSequence.length) {
        return;
    }
    
    currentHiitExerciseIndex = index;
    localStorage.setItem('currentHiitExerciseIndex', currentHiitExerciseIndex.toString());
    
    // Обновляем отображение
    const container = document.getElementById('selected-exercise-container');
    if (container) {
        showCurrentHiitExercise(container);
        showHiitExerciseCards(container);
    }
}

/**
 * Переупорядочивает упражнения в последовательности
 */
function reorderHiitExercises(fromIndex, toIndex) {
    if (fromIndex === toIndex || 
        fromIndex < 0 || fromIndex >= hiitExerciseSequence.length ||
        toIndex < 0 || toIndex >= hiitExerciseSequence.length) {
        return;
    }
    
    // Сохраняем старое значение индекса текущего упражнения
    const oldCurrentIndex = currentHiitExerciseIndex;
    
    // Перемещаем упражнение
    const [movedExercise] = hiitExerciseSequence.splice(fromIndex, 1);
    
    // Вычисляем правильную позицию для вставки
    // Если перемещаем вперед (fromIndex < toIndex), нужно уменьшить toIndex на 1,
    // так как элемент уже удален из массива
    const insertIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
    hiitExerciseSequence.splice(insertIndex, 0, movedExercise);
    
    // Обновляем индекс текущего упражнения
    if (fromIndex === oldCurrentIndex) {
        // Если переместили текущее упражнение
        currentHiitExerciseIndex = insertIndex;
    } else if (fromIndex < oldCurrentIndex && insertIndex >= oldCurrentIndex) {
        // Если переместили элемент, который был перед текущим, на позицию после текущего
        currentHiitExerciseIndex--;
    } else if (fromIndex > oldCurrentIndex && insertIndex <= oldCurrentIndex) {
        // Если переместили элемент, который был после текущего, на позицию перед текущим
        currentHiitExerciseIndex++;
    }
    
    // Сохраняем обновленную последовательность
    localStorage.setItem('hiitExerciseSequence', JSON.stringify(hiitExerciseSequence));
    localStorage.setItem('currentHiitExerciseIndex', currentHiitExerciseIndex.toString());
    
    // Обновляем отображение
    const container = document.getElementById('selected-exercise-container');
    if (container) {
        showCurrentHiitExercise(container);
        showHiitExerciseCards(container);
    }
    
    if (typeof playClickEffectSound === 'function') {
        playClickEffectSound();
    }
    
    console.log(`Упражнение перемещено с позиции ${fromIndex + 1} на позицию ${insertIndex + 1}`);
}

/**
 * Удаляет упражнение из последовательности
 */
function removeExerciseFromSequence(index) {
    if (index >= 0 && index < hiitExerciseSequence.length) {
        // Удаляем упражнение
        hiitExerciseSequence.splice(index, 1);
        
        // Если последовательность пуста, сбрасываем индекс
        if (hiitExerciseSequence.length === 0) {
            currentHiitExerciseIndex = 0;
        } else {
            // Корректируем индекс текущего упражнения
            // Если удалили текущее или упражнение до текущего, уменьшаем индекс
            if (index <= currentHiitExerciseIndex) {
                currentHiitExerciseIndex = Math.max(0, currentHiitExerciseIndex - 1);
            }
            // Если индекс стал больше длины массива, устанавливаем последний
            if (currentHiitExerciseIndex >= hiitExerciseSequence.length) {
                currentHiitExerciseIndex = hiitExerciseSequence.length - 1;
            }
        }
        
        localStorage.setItem('currentHiitExerciseIndex', currentHiitExerciseIndex.toString());
        localStorage.setItem('hiitExerciseSequence', JSON.stringify(hiitExerciseSequence));
        updateExerciseDisplay();
        
        if (typeof playClickEffectSound === 'function') {
            playClickEffectSound();
        }
    }
}

/**
 * Показывает уведомление о количестве добавленных упражнений
 */
function showExerciseCountNotification(count) {
    // Удаляем предыдущее уведомление, если есть
    const existingNotification = document.getElementById('exercise-count-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.id = 'exercise-count-notification';
    notification.className = 'exercise-count-notification';
    
    // Создаем контейнер для текста и кнопки
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'exercise-count-notification-content';
    
    // Текст уведомления
    const textSpan = document.createElement('span');
    textSpan.className = 'exercise-count-notification-text';
    textSpan.textContent = `Добавлено: ${count}/${MAX_HIIT_EXERCISES}`;
    
    // Кнопка "к таймеру" (только в режиме HIIT)
    if (window.timerMode === 2) {
        const button = document.createElement('button');
        button.className = 'exercise-count-notification-button';
        button.textContent = 'к таймеру';
        button.type = 'button';
        
        // Обработчик клика на кнопку
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Закрываем уведомление
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
            
            // Закрываем модальное окно и возвращаемся к таймеру
            closeExerciseModal();
            
            if (typeof playClickEffectSound === 'function') {
                playClickEffectSound();
            }
        });
        
        contentWrapper.appendChild(textSpan);
        contentWrapper.appendChild(button);
    } else {
        contentWrapper.appendChild(textSpan);
    }
    
    notification.appendChild(contentWrapper);
    
    // Добавляем в body, чтобы уведомление всегда было видно поверх всего
    document.body.appendChild(notification);
    
    // Показываем анимацию
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Удаляем автоматически только если нет кнопки (режим не HIIT или уведомление без кнопки)
    if (window.timerMode !== 2) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 2000);
    }
}

/**
 * Отслеживает изменения режима таймера для обновления отображения
 */
function observeTimerModeChanges() {
    let lastMode = window.timerMode;
    
    // Проверяем изменения режима периодически (каждые 500ms)
    setInterval(function() {
        if (window.timerMode !== lastMode) {
            lastMode = window.timerMode;
            console.log('Режим таймера изменился на:', window.timerMode);
            // Обновляем отображение при изменении режима
            updateExerciseDisplay();
        }
    }, 500);
}

/**
 * Синхронизирует анимацию упражнения с фазами таймера
 */
function syncExerciseWithTimer() {
    console.log('[Exercise Sync] syncExerciseWithTimer вызвана', {
        timerMode: window.timerMode,
        hasTimer: !!window.newtimer,
        sequenceLength: hiitExerciseSequence.length
    });
    
    const timer = window.newtimer; // Объект таймера
    if (!timer) {
        console.warn('[Exercise Sync] Таймер не найден');
        return;
    }
    
    // Для режима HIIT с последовательностью упражнений
    if (window.timerMode === 2 && hiitExerciseSequence.length > 0) {
        console.log('[Exercise Sync] Переходим к синхронизации HIIT последовательности');
        syncHiitExerciseSequenceWithTimer(timer);
        return;
    }
    
    // Для режима Tabata (одно упражнение)
    if (!selectedExercise.id) return;
    
    // Состояние таймера и проверка, запущен ли таймер
    const sessionPhase = timer.tabatatimer ? timer.tabatatimer.sessionPhase : null;
    const isTimerRunning = timer.tabatatimer ? timer.tabatatimer.isRunning === true : false;
    
    // Получаем изображение
    const image = document.getElementById('selected-exercise-image');
    if (!image) return;
    
    console.log('Синхронизация WebP упражнения с фазой таймера:', sessionPhase, 'Таймер запущен:', isTimerRunning);

    // Если таймер не запущен или не в фазе работы, гарантируем остановку анимации
    if (!isTimerRunning || sessionPhase !== 2) {
        if (image.isAnimating) {
            // Создаем новый объект Image для гарантированной остановки анимации WebP
            const newImage = new Image();
            newImage.id = 'selected-exercise-image';
            newImage.alt = 'Выбранное упражнение';
            // Используем параметр t=0 для WebP чтобы показать первый кадр
            const timestamp = new Date().getTime();
            newImage.src = `${selectedExercise.path}#t=0&cachebust=${timestamp}`;
            newImage.isAnimating = false;
            newImage.style.width = '100%';
            newImage.style.maxWidth = '400px';
            newImage.style.borderRadius = '50px';
            newImage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            
            // Заменяем старое изображение новым
            if (image.parentNode) {
                image.parentNode.replaceChild(newImage, image);
            }
            
            console.log('Анимация WebP остановлена (не в фазе работы или таймер не запущен)');
        }
    } else if (sessionPhase === 2) { // Фаза "Работаем" и таймер запущен
        if (!image.isAnimating) {
            // Создаем новый объект Image для запуска анимации
            const newImage = new Image();
            newImage.id = 'selected-exercise-image';
            newImage.alt = 'Выбранное упражнение';
            // Добавляем временную метку для обхода кеширования и гарантированного запуска анимации
            const timestamp = new Date().getTime();
            // Без параметра #t для WebP чтобы анимация воспроизводилась
            newImage.src = `${selectedExercise.path}?t=${timestamp}`;
            newImage.isAnimating = true;
            newImage.style.width = '100%';
            newImage.style.maxWidth = '400px';
            newImage.style.borderRadius = '50px';
            newImage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            
            // Заменяем старое изображение новым
            if (image.parentNode) {
                image.parentNode.replaceChild(newImage, image);
            }
            
            console.log('Анимация WebP активирована (фаза работы)');
        }
    }
}

/**
 * Синхронизирует последовательность упражнений HIIT с таймером
 */
function syncHiitExerciseSequenceWithTimer(timer) {
    console.log('[HIIT Sync] syncHiitExerciseSequenceWithTimer вызвана', {
        hasTimer: !!timer,
        hasTabatatimer: !!(timer && timer.tabatatimer),
        sequenceLength: hiitExerciseSequence.length,
        syncEnabled: hiitExerciseRoundSyncEnabled
    });
    
    if (!timer || !timer.tabatatimer || hiitExerciseSequence.length === 0) {
        console.warn('[HIIT Sync] Прерываем синхронизацию:', {
            noTimer: !timer,
            noTabatatimer: !(timer && timer.tabatatimer),
            emptySequence: hiitExerciseSequence.length === 0
        });
        return;
    }
    
    const tabatatimer = timer.tabatatimer;
    const sessionPhase = tabatatimer.sessionPhase;
    const isTimerRunning = tabatatimer.isRunning === true;
    const currentCycle = tabatatimer.currentCycle || 1;
    
    // Определяем индекс текущего упражнения из последовательности
    let exerciseIndex;
    
    if (hiitExerciseRoundSyncEnabled) {
        // НОВЫЙ СЦЕНАРИЙ: Синхронизация упражнений с раундами
        // На фазе "Отдыхаем" (rest, sessionPhase === 3) показываем СЛЕДУЮЩЕЕ упражнение
        // На других фазах показываем текущее упражнение для раунда
        if (sessionPhase === 3) {
            // Фаза "Отдыхаем" - показываем следующее упражнение (для подготовки к следующему раунду)
            // currentCycle уже увеличен для следующего раунда после окончания work
            // Нам нужно показать упражнение для этого следующего раунда
            exerciseIndex = (currentCycle - 1) % hiitExerciseSequence.length;
        } else {
            // Фазы "Готовимся" (0 или 1) и "Работаем" (2) - показываем текущее упражнение
            exerciseIndex = (currentCycle - 1) % hiitExerciseSequence.length;
        }
        
        console.log('[HIIT Sync]', {
            sessionPhase,
            currentCycle,
            exerciseIndex,
            exerciseName: hiitExerciseSequence[exerciseIndex]?.name,
            syncEnabled: hiitExerciseRoundSyncEnabled
        });
    } else {
        // СТАРЫЙ СЦЕНАРИЙ: Показываем упражнение для текущего раунда
        exerciseIndex = (currentCycle - 1) % hiitExerciseSequence.length;
    }
    
    const currentExercise = hiitExerciseSequence[exerciseIndex];
    
    if (!currentExercise) return;
    
    // Получаем контейнер для отображения большого изображения
    const container = document.getElementById('selected-exercise-container');
    if (!container) return;
    
    let sequenceContainer = document.getElementById('hiit-exercise-sequence');
    
    // Обеспечиваем, что контейнер для карточек всегда создан и виден
    if (!sequenceContainer) {
        // Если контейнер для последовательности не существует, создаем его
        showHiitExerciseCards(container);
        sequenceContainer = document.getElementById('hiit-exercise-sequence');
    }
    
    // Если таймер запущен, показываем большое изображение текущего упражнения
    if (isTimerRunning) {
        // Обновляем currentHiitExerciseIndex для правильного отображения активной карточки
        currentHiitExerciseIndex = exerciseIndex;
        
        // Карточки остаются видимыми во время тренировки - всегда показываем их!
        if (sequenceContainer) {
            sequenceContainer.style.display = 'block';
        } else {
            // Если контейнер все еще не существует, создаем его
            showHiitExerciseCards(container);
            sequenceContainer = document.getElementById('hiit-exercise-sequence');
        }
        
        // Обновляем карточки, чтобы выделить текущее упражнение
        showHiitExerciseCards(container);
        
        // Показываем или создаем контейнер для большого изображения
        let largeImageContainer = container.querySelector('.exercise-image-wrapper');
        let largeImage = document.getElementById('selected-exercise-image');
        let largeTitle = document.getElementById('exercise-title');
        
        if (!largeImageContainer) {
            largeImageContainer = document.createElement('div');
            largeImageContainer.className = 'exercise-image-wrapper';
            
            largeImage = document.createElement('img');
            largeImage.id = 'selected-exercise-image';
            largeImage.alt = currentExercise.name;
            
            largeTitle = document.createElement('div');
            largeTitle.id = 'exercise-title';
            
            container.insertBefore(largeTitle, container.firstChild);
            container.appendChild(largeImageContainer);
            largeImageContainer.appendChild(largeImage);
        } else {
            largeImageContainer.style.display = 'block';
            if (!largeTitle) {
                largeTitle = document.getElementById('exercise-title');
                if (!largeTitle) {
                    largeTitle = document.createElement('div');
                    largeTitle.id = 'exercise-title';
                    container.insertBefore(largeTitle, container.firstChild);
                }
            }
        }
        
        // Скрываем стрелки навигации во время тренировки (карточки доступны для навигации)
        const prevArrow = largeImageContainer.querySelector('.hiit-nav-arrow-prev');
        const nextArrow = largeImageContainer.querySelector('.hiit-nav-arrow-next');
        if (prevArrow) prevArrow.style.display = 'none';
        if (nextArrow) nextArrow.style.display = 'none';
        
        // Управление затемнением и полоской с текстом фазы
        // Фаза "Готовимся" (1) и "Отдыхаем" (3) - затемняем и показываем полоску
        if (sessionPhase === 1 || sessionPhase === 3) {
            largeImageContainer.classList.add('dimmed');
            
            // Создаем или обновляем полоску с текстом фазы
            let phaseLabel = largeImageContainer.querySelector('.phase-label-overlay');
            if (!phaseLabel) {
                phaseLabel = document.createElement('div');
                phaseLabel.className = 'phase-label-overlay';
                largeImageContainer.appendChild(phaseLabel);
            }
            
            // Устанавливаем класс и текст в зависимости от фазы
            if (sessionPhase === 1) {
                phaseLabel.className = 'phase-label-overlay prepare';
                phaseLabel.textContent = 'Готовимся';
            } else if (sessionPhase === 3) {
                phaseLabel.className = 'phase-label-overlay rest';
                phaseLabel.textContent = 'Готовимся';
            }
            phaseLabel.style.display = 'block';
        } else {
            // Фаза "Работаем" (2) - убираем затемнение и полоску
            largeImageContainer.classList.remove('dimmed');
            const phaseLabel = largeImageContainer.querySelector('.phase-label-overlay');
            if (phaseLabel) {
                phaseLabel.style.display = 'none';
            }
        }
        
        // Обновляем изображение и название
        // Определяем, какое упражнение показывать в заголовке
        let displayExerciseIndex = exerciseIndex;
        let displayCycle = currentCycle;
        
        // На фазе "Отдыхаем" currentCycle уже указывает на следующий раунд
        // (он увеличивается после окончания фазы "Работаем"),
        // поэтому просто используем его для отображения
        // На других фазах тоже используем currentCycle как есть
        
        largeTitle.textContent = `${currentExercise.name} (${displayCycle}-й раунд)`;
        
        const timestamp = new Date().getTime();
        
        // Определяем, нужно ли обновить изображение
        const exerciseChanged = !largeImage.dataset.exerciseId || largeImage.dataset.exerciseId !== String(currentExercise.id);
        const phaseChanged = largeImage.dataset.lastPhase !== sessionPhase.toString();
        const lastCycle = largeImage.dataset.lastCycle ? parseInt(largeImage.dataset.lastCycle, 10) : null;
        const cycleChanged = lastCycle !== currentCycle;
        
        // Проверяем текущее состояние анимации
        const currentIsAnimating = largeImage.isAnimating === true;
        const shouldAnimate = sessionPhase === 2; // Анимация только на фазе "Работаем"
        const animationStateChanged = currentIsAnimating !== shouldAnimate;
        
        // Обновляем изображение ТОЛЬКО если:
        // 1. Упражнение изменилось
        // 2. Раунд изменился (при включенной синхронизации)
        // 3. НЕ обновляем при изменении фазы, если упражнение не изменилось
        const needsUpdate = exerciseChanged || 
                           (hiitExerciseRoundSyncEnabled && cycleChanged);
        
        // Если упражнение не изменилось, просто обновляем состояние анимации без перезагрузки элемента
        if (!needsUpdate && !exerciseChanged && largeImage && largeImage.parentNode) {
            // Если переход на фазу "Работаем" - запускаем анимацию, обновляя только src
            if (sessionPhase === 2 && !largeImage.isAnimating) {
                largeImage.src = `${currentExercise.path}?t=${timestamp}`;
                largeImage.isAnimating = true;
                largeImage.dataset.lastPhase = sessionPhase.toString();
                largeImage.dataset.lastCycle = currentCycle.toString();
            }
            // Если переход с фазы "Работаем" на другую - останавливаем анимацию, обновляя только src
            else if (sessionPhase !== 2 && largeImage.isAnimating) {
                largeImage.src = `${currentExercise.path}#t=0&cachebust=${timestamp}`;
                largeImage.isAnimating = false;
                largeImage.dataset.lastPhase = sessionPhase.toString();
                largeImage.dataset.lastCycle = currentCycle.toString();
            }
            // Если фаза не изменилась, просто обновляем данные
            else {
                largeImage.dataset.lastPhase = sessionPhase.toString();
                largeImage.dataset.lastCycle = currentCycle.toString();
            }
        }
        
        // Обновляем изображение только если упражнение или раунд изменились
        if (needsUpdate) {
            // Если это просто изменение раунда при том же упражнении, обновляем src без замены элемента
            const isOnlyCycleChange = cycleChanged && !exerciseChanged && !phaseChanged;
            
            if (isOnlyCycleChange && largeImage && largeImage.parentNode) {
                // Обновляем только src и данные, не заменяя элемент
                if (sessionPhase === 2) {
                    largeImage.src = `${currentExercise.path}?t=${timestamp}`;
                    largeImage.isAnimating = true;
                } else {
                    largeImage.src = `${currentExercise.path}#t=0&cachebust=${timestamp}`;
                    largeImage.isAnimating = false;
                }
                largeImage.dataset.exerciseId = String(currentExercise.id);
                largeImage.dataset.lastPhase = sessionPhase.toString();
                largeImage.dataset.lastCycle = currentCycle.toString();
                largeImage.alt = currentExercise.name;
            } else {
                // Полная замена изображения только при реальных изменениях
                const newImage = new Image();
                newImage.id = 'selected-exercise-image';
                newImage.alt = currentExercise.name;
                newImage.dataset.exerciseId = String(currentExercise.id);
                newImage.dataset.lastPhase = sessionPhase.toString();
                newImage.dataset.lastCycle = currentCycle.toString();
                newImage.style.width = '100%';
                newImage.style.maxWidth = '400px';
                newImage.style.borderRadius = '50px';
                newImage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                
                // Если фаза "Работаем", запускаем анимацию
                if (sessionPhase === 2) {
                    newImage.src = `${currentExercise.path}?t=${timestamp}`;
                    newImage.isAnimating = true;
                } else {
                    // На других фазах останавливаем анимацию (показываем первый кадр)
                    newImage.src = `${currentExercise.path}#t=0&cachebust=${timestamp}`;
                    newImage.isAnimating = false;
                }
                
                if (largeImage && largeImage.parentNode) {
                    largeImage.parentNode.replaceChild(newImage, largeImage);
                }
            }
        }
        
        container.classList.add('active');
    } else {
        // Если таймер не запущен, показываем последовательность и стрелки
        if (sequenceContainer) {
            sequenceContainer.style.display = 'block';
        }
        
        const largeImageContainer = container.querySelector('.exercise-image-wrapper');
        if (largeImageContainer) {
            // Показываем стрелки навигации, если есть больше одного упражнения
            if (hiitExerciseSequence.length > 1) {
                const prevArrow = largeImageContainer.querySelector('.hiit-nav-arrow-prev');
                const nextArrow = largeImageContainer.querySelector('.hiit-nav-arrow-next');
                if (prevArrow) prevArrow.style.display = 'flex';
                if (nextArrow) nextArrow.style.display = 'flex';
            }
        }
    }
}

/**
 * Загружает сохраненное упражнение из localStorage
 */
function loadSavedExercise() {
    const saved = localStorage.getItem('selectedExercise');
    if (saved) {
        try {
            const savedExercise = JSON.parse(saved);
            
            // Проверяем существование WebP файла
            checkImageExists(savedExercise.path).then(exists => {
                if (!exists) {
                    // Если WebP не существует, проверяем GIF версию
                    const alternativePath = savedExercise.path.replace('.webp', '.gif');
                    checkImageExists(alternativePath).then(altExists => {
                        if (altExists) {
                            // Используем GIF версию, если WebP не существует
                            savedExercise.path = alternativePath;
                            console.log(`Для сохраненного упражнения ${savedExercise.id} используем GIF вместо WebP`);
                        } else {
                            console.warn(`Изображение не найдено для сохраненного упражнения: ${savedExercise.path}`);
                        }
                        
                        // В любом случае сохраняем обновленное упражнение
            selectedExercise = savedExercise;
            updateExerciseDisplay();
                    });
                } else {
                    // WebP существует, используем его
                    selectedExercise = savedExercise;
                    updateExerciseDisplay();
                }
            });
        } catch (e) {
            console.error('Ошибка при загрузке сохраненного упражнения:', e);
        }
    }
}

/**
 * Доступные методы для интеграции с таймером
 */
const ExerciseManager = {
    init: initExerciseSelector,
    sync: syncExerciseWithTimer,
    getSelected: () => selectedExercise,
    clear: clearExerciseSelection,
    switchToHiitExercise: switchToHiitExercise,
    getHiitExerciseRoundSyncEnabled: () => hiitExerciseRoundSyncEnabled
};

// Функция для проверки, что все необходимые элементы загружены
function checkDependencies() {
    // Убеждаемся, что newtimer доступен глобально
    if (typeof window.newtimer === 'undefined') {
        console.warn('Модуль выбора упражнений: объект newtimer не найден, привязываемся к событию загрузки');
        return false;
    }
    
    // Проверяем, что основные элементы таймера существуют
    const clockWrap = document.getElementById('tt_clock_wrap');
    const tabataControls = document.getElementById('playlistField');
    const hiitControls = document.getElementById('controls');
    
    if (!clockWrap || (!tabataControls && !hiitControls)) {
        console.warn('Модуль выбора упражнений: необходимые элементы таймера не найдены');
        return false;
    }
    
    return true;
}

// Инициализируем селектор упражнений при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM загружен, инициализируем модуль выбора упражнений');
        initializeExerciseSelectorWithRetry();
        
        // Убедимся, что описание тренировки HIIT скрыто при загрузке, если не выбран режим HIIT
        const hiitWorkoutDescription = document.getElementById('hiit-workout-description');
        const extendedModeCheckbox = document.getElementById('extendedMode');
        if (hiitWorkoutDescription && (!extendedModeCheckbox || !extendedModeCheckbox.checked)) {
            hiitWorkoutDescription.style.display = 'none';
        }
        
        // Убедимся, что описание тренировки EMOM скрыто при загрузке, если не выбран режим EMOM
        if (typeof hideEmomWorkoutDescription === 'function') {
            const emomModeCheckbox = document.getElementById('emomMode');
            if (!emomModeCheckbox || !emomModeCheckbox.checked) {
                hideEmomWorkoutDescription();
            }
        }
    });
} else {
    // DOM уже загружен
    console.log('DOM уже загружен, инициализируем модуль выбора упражнений');
    initializeExerciseSelectorWithRetry();
    
    // Убедимся, что описание тренировки HIIT скрыто при загрузке, если не выбран режим HIIT
    const hiitWorkoutDescription = document.getElementById('hiit-workout-description');
    const extendedModeCheckbox = document.getElementById('extendedMode');
    if (hiitWorkoutDescription && (!extendedModeCheckbox || !extendedModeCheckbox.checked)) {
        hiitWorkoutDescription.style.display = 'none';
    }
}

function initializeExerciseSelectorWithRetry() {
    // Пробуем инициализировать сразу
    if (checkDependencies()) {
        console.log('Все зависимости найдены, инициализируем модуль');
        initExerciseSelector();
    } else {
        // Если не удалось, пробуем через небольшую задержку
        console.log('Ждем загрузки всех зависимостей...');
        setTimeout(function() {
            if (checkDependencies()) {
                console.log('Зависимости загружены после ожидания, инициализируем модуль');
                initExerciseSelector();
            } else {
                // Последняя попытка с большей задержкой
                setTimeout(function() {
                    console.log('Последняя попытка инициализации модуля');
                    initExerciseSelector();
                }, 1000);
            }
        }, 500);
    }
}

// Экспортируем ExerciseManager для использования в других скриптах
window.ExerciseManager = ExerciseManager;
// Также экспортируем как exerciseSelector для совместимости
window.exerciseSelector = ExerciseManager;

/**
 * Скрывает упражнение (контейнер с изображением)
 */
function hideExercise() {
    const container = document.getElementById('selected-exercise-container');
    const buttonsContainer = document.getElementById('exercise-control-buttons');
    
    if (container) {
        container.classList.remove('active');
        // Сохраняем состояние скрытия
        isExerciseHidden = true;
        localStorage.setItem('exerciseHidden', 'true');
    }
    
    if (buttonsContainer) {
        buttonsContainer.classList.remove('show');
    }
    
    console.log('Упражнение скрыто');
}

/**
 * Очищает выбор упражнения
 */
function clearExerciseSelection(e) {
    // Предотвращаем переход по умолчанию
    if (e) {
        e.preventDefault();
    }
    
    // Снимаем выделение со всех элементов
    const items = document.querySelectorAll('.exercise-item');
    items.forEach(item => item.classList.remove('selected'));
    
    // Очищаем временный выбор
    window.tempSelectedExercise = null;
    
    // Очищаем сохраненный выбор
    selectedExercise = {
        id: null,
        gender: null,
        path: null,
        name: null
    };
    
    // Удаляем из localStorage
    localStorage.removeItem('selectedExercise');
    
    // Обновляем отображение
    updateExerciseDisplay();
    
    // Закрываем модальное окно
    closeExerciseModal();
}