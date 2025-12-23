/**
 * Панель калибровки параметров детекции приседаний
 * ВРЕМЕННЫЙ ФУНКЦИОНАЛ ДЛЯ ТЕСТИРОВАНИЯ - УДАЛИТЬ ПОСЛЕ КАЛИБРОВКИ
 */

class CalibrationPanel {
    constructor(poseAnalyzer) {
        this.poseAnalyzer = poseAnalyzer;
        this.isVisible = false;
        this.logEntries = [];
        
        // Исходные значения параметров (для сброса)
        this.defaultParams = {
            squatThreshold: 125,
            standThreshold: 165,
            repMinDepth: 120,
            standingFramesRequired: 10,
            minScore: 0.3
            // Параметры для пресса - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
            // abdominalLiftThreshold: 0.015,
            // abdominalFramesRequired: 6
        };
        
        // Текущие значения параметров
        this.currentParams = { ...this.defaultParams };
        
        // Хорошие параметры (сохраненные через кнопку ОК)
        this.goodParams = null;
        
        this.init();
    }
    
    init() {
        // Ждем загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.updateExerciseVisibility();
            });
        } else {
            this.setupEventListeners();
            // Небольшая задержка для гарантии, что select уже создан
            setTimeout(() => this.updateExerciseVisibility(), 100);
        }
    }
    
    setupEventListeners() {
        // Кнопка показа/скрытия панели
        const showBtn = document.getElementById('calibration-show-btn');
        const toggleBtn = document.getElementById('calibration-toggle-btn');
        const panel = document.getElementById('calibration-panel');
        
        if (showBtn) {
            showBtn.addEventListener('click', () => this.showPanel());
        }
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.hidePanel());
        }
        
        // Ползунки параметров для приседаний
        this.setupSlider('calib-squat-threshold', 'squatThreshold', 'calib-squat-threshold-value', '°');
        this.setupSlider('calib-stand-threshold', 'standThreshold', 'calib-stand-threshold-value', '°');
        this.setupSlider('calib-rep-min-depth', 'repMinDepth', 'calib-rep-min-depth-value', '°');
        this.setupSlider('calib-standing-frames', 'standingFramesRequired', 'calib-standing-frames-value', '');
        this.setupSlider('calib-min-score', 'minScore', 'calib-min-score-value', '');
        
        // Ползунки параметров для пресса - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
        // this.setupSlider('calib-abdominal-lift-threshold', 'abdominalLiftThreshold', 'calib-abdominal-lift-threshold-value', '', true);
        // this.setupSlider('calib-abdominal-frames', 'abdominalFramesRequired', 'calib-abdominal-frames-value', '');
        
        // Отслеживаем изменение упражнения для показа/скрытия параметров
        // this.updateExerciseVisibility(); // ВРЕМЕННО ОТКЛЮЧЕНО
        // const exerciseSelect = document.getElementById('mediapipe-exercise-select');
        // if (exerciseSelect) {
        //     exerciseSelect.addEventListener('change', () => this.updateExerciseVisibility());
        // }
        
        // Кнопки действий
        const okBtn = document.getElementById('calibration-ok-btn');
        const resetBtn = document.getElementById('calibration-reset-btn');
        const clearLogBtn = document.getElementById('calibration-log-clear');
        
        if (okBtn) {
            okBtn.addEventListener('click', () => this.saveGoodParams());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetToDefaults());
        }
        
        if (clearLogBtn) {
            clearLogBtn.addEventListener('click', () => this.clearLog());
        }
    }
    
    setupSlider(sliderId, paramName, valueId, suffix, isFloat = false) {
        const slider = document.getElementById(sliderId);
        const valueDisplay = document.getElementById(valueId);
        
        if (!slider || !valueDisplay) return;
        
        // Устанавливаем начальное значение
        slider.value = this.currentParams[paramName];
        let initialValue;
        if (isFloat) {
            initialValue = parseFloat(slider.value).toFixed(3);
        } else if (paramName === 'minScore') {
            initialValue = parseFloat(slider.value).toFixed(2);
        } else {
            initialValue = slider.value;
        }
        this.updateValueDisplay(valueDisplay, initialValue, suffix);
        
        // Обработчик изменения
        slider.addEventListener('input', (e) => {
            const value = isFloat || paramName === 'minScore' ? parseFloat(e.target.value) : parseInt(e.target.value);
            this.currentParams[paramName] = value;
            // Форматируем значение для отображения
            let displayValue;
            if (isFloat) {
                displayValue = value.toFixed(3);
            } else if (paramName === 'minScore') {
                displayValue = value.toFixed(2);
            } else {
                displayValue = value;
            }
            this.updateValueDisplay(valueDisplay, displayValue, suffix);
            this.applyParam(paramName, value);
            this.logChange(paramName, value);
        });
    }
    
    updateExerciseVisibility() {
        const exerciseSelect = document.getElementById('mediapipe-exercise-select');
        const currentExercise = exerciseSelect ? exerciseSelect.value : 'squat';
        
        // Показываем/скрываем параметры в зависимости от выбранного упражнения
        const squatParams = document.querySelectorAll('.calibration-param-squat');
        const abdominalParams = document.querySelectorAll('.calibration-param-abdominal');
        
        if (currentExercise === 'abdominal') {
            // Показываем параметры пресса, скрываем параметры приседаний
            abdominalParams.forEach(el => el.style.display = 'block');
            squatParams.forEach(el => el.style.display = 'none');
        } else {
            // Показываем параметры приседаний, скрываем параметры пресса
            abdominalParams.forEach(el => el.style.display = 'none');
            squatParams.forEach(el => el.style.display = 'block');
        }
    }
    
    updateValueDisplay(element, value, suffix) {
        if (element) {
            element.textContent = value + suffix;
        }
    }
    
    applyParam(paramName, value) {
        if (!this.poseAnalyzer) return;
        
        // Применяем параметр к poseAnalyzer
        switch (paramName) {
            case 'squatThreshold':
                this.poseAnalyzer.squatThreshold = value;
                break;
            case 'standThreshold':
                this.poseAnalyzer.standThreshold = value;
                break;
            case 'repMinDepth':
                this.poseAnalyzer.repMinDepth = value;
                break;
            case 'standingFramesRequired':
                this.poseAnalyzer.standingFramesRequired = value;
                break;
            case 'minScore':
                this.poseAnalyzer.minScore = value;
                break;
            // Параметры для пресса - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
            // case 'abdominalLiftThreshold':
            //     this.poseAnalyzer.abdominalLiftThreshold = value;
            //     break;
            // case 'abdominalFramesRequired':
            //     this.poseAnalyzer.abdominalFramesRequired = value;
            //     break;
        }
        
        console.log(`[КАЛИБРОВКА] Параметр ${paramName} изменен на: ${value}`);
    }
    
    logChange(paramName, value) {
        const timestamp = new Date().toLocaleTimeString('ru-RU');
        const entry = {
            time: timestamp,
            param: paramName,
            value: value,
            type: 'change'
        };
        
        this.logEntries.push(entry);
        this.updateLogDisplay();
    }
    
    saveGoodParams() {
        // Сохраняем текущие параметры как "хорошие"
        this.goodParams = { ...this.currentParams };
        
        const timestamp = new Date().toLocaleTimeString('ru-RU');
        const entry = {
            time: timestamp,
            params: { ...this.currentParams },
            type: 'ok'
        };
        
        this.logEntries.push(entry);
        this.updateLogDisplay();
        
        // Выводим в консоль для копирования
        console.log('✅ ============================================');
        console.log('✅ ХОРОШИЕ ПАРАМЕТРЫ СОХРАНЕНЫ:');
        console.log('✅ ============================================');
        console.log(JSON.stringify(this.currentParams, null, 2));
        console.log('✅ ============================================');
        
        // Показываем уведомление
        this.showNotification('✅ Параметры сохранены как хорошие!', 'success');
    }
    
    resetToDefaults() {
        // Сбрасываем все параметры к исходным значениям
        this.currentParams = { ...this.defaultParams };
        
        // Обновляем ползунки для приседаний
        const squatSlider = document.getElementById('calib-squat-threshold');
        const standSlider = document.getElementById('calib-stand-threshold');
        const repDepthSlider = document.getElementById('calib-rep-min-depth');
        const standingFramesSlider = document.getElementById('calib-standing-frames');
        const minScoreSlider = document.getElementById('calib-min-score');
        
        if (squatSlider) squatSlider.value = this.defaultParams.squatThreshold;
        if (standSlider) standSlider.value = this.defaultParams.standThreshold;
        if (repDepthSlider) repDepthSlider.value = this.defaultParams.repMinDepth;
        if (standingFramesSlider) standingFramesSlider.value = this.defaultParams.standingFramesRequired;
        if (minScoreSlider) minScoreSlider.value = this.defaultParams.minScore;
        
        // Обновляем ползунки для пресса - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
        // const abdominalLiftSlider = document.getElementById('calib-abdominal-lift-threshold');
        // const abdominalFramesSlider = document.getElementById('calib-abdominal-frames');
        // 
        // if (abdominalLiftSlider) abdominalLiftSlider.value = this.defaultParams.abdominalLiftThreshold;
        // if (abdominalFramesSlider) abdominalFramesSlider.value = this.defaultParams.abdominalFramesRequired;
        
        // Обновляем отображение значений для приседаний
        this.updateValueDisplay(document.getElementById('calib-squat-threshold-value'), this.defaultParams.squatThreshold, '°');
        this.updateValueDisplay(document.getElementById('calib-stand-threshold-value'), this.defaultParams.standThreshold, '°');
        this.updateValueDisplay(document.getElementById('calib-rep-min-depth-value'), this.defaultParams.repMinDepth, '°');
        this.updateValueDisplay(document.getElementById('calib-standing-frames-value'), this.defaultParams.standingFramesRequired, '');
        this.updateValueDisplay(document.getElementById('calib-min-score-value'), this.defaultParams.minScore.toFixed(2), '');
        
        // Обновляем отображение значений для пресса - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
        // this.updateValueDisplay(document.getElementById('calib-abdominal-lift-threshold-value'), this.defaultParams.abdominalLiftThreshold.toFixed(3), '');
        // this.updateValueDisplay(document.getElementById('calib-abdominal-frames-value'), this.defaultParams.abdominalFramesRequired, '');
        
        // Применяем параметры
        Object.keys(this.defaultParams).forEach(paramName => {
            this.applyParam(paramName, this.defaultParams[paramName]);
        });
        
        const timestamp = new Date().toLocaleTimeString('ru-RU');
        const entry = {
            time: timestamp,
            params: { ...this.defaultParams },
            type: 'reset'
        };
        
        this.logEntries.push(entry);
        this.updateLogDisplay();
        
        this.showNotification('🔄 Параметры сброшены к исходным', 'info');
    }
    
    updateLogDisplay() {
        const logContent = document.getElementById('calibration-log-content');
        if (!logContent) return;
        
        // Ограничиваем количество записей (последние 50)
        const recentEntries = this.logEntries.slice(-50);
        
        logContent.innerHTML = recentEntries.map(entry => {
            if (entry.type === 'ok') {
                return `
                    <div class="calibration-log-entry ok">
                        <span class="log-time">[${entry.time}]</span>
                        <strong>✅ ОК - Параметры сохранены:</strong>
                        <pre style="margin: 8px 0; font-size: 11px; color: rgba(255,255,255,0.7);">${JSON.stringify(entry.params, null, 2)}</pre>
                    </div>
                `;
            } else if (entry.type === 'reset') {
                return `
                    <div class="calibration-log-entry">
                        <span class="log-time">[${entry.time}]</span>
                        <strong>🔄 Сброс к исходным параметрам:</strong>
                        <pre style="margin: 8px 0; font-size: 11px; color: rgba(255,255,255,0.7);">${JSON.stringify(entry.params, null, 2)}</pre>
                    </div>
                `;
            } else {
                return `
                    <div class="calibration-log-entry">
                        <span class="log-time">[${entry.time}]</span>
                        <span class="log-param">${entry.param}</span> = <strong>${entry.value}</strong>
                    </div>
                `;
            }
        }).join('');
        
        // Прокручиваем вниз
        logContent.scrollTop = logContent.scrollHeight;
    }
    
    clearLog() {
        this.logEntries = [];
        this.updateLogDisplay();
        this.showNotification('🗑️ Лог очищен', 'info');
    }
    
    showPanel() {
        const panel = document.getElementById('calibration-panel');
        const showBtn = document.getElementById('calibration-show-btn');
        
        if (panel && showBtn) {
            panel.style.display = 'block';
            showBtn.style.display = 'none';
            this.isVisible = true;
        }
    }
    
    hidePanel() {
        const panel = document.getElementById('calibration-panel');
        const showBtn = document.getElementById('calibration-show-btn');
        
        if (panel && showBtn) {
            panel.style.display = 'none';
            showBtn.style.display = 'block';
            this.isVisible = false;
        }
    }
    
    showNotification(message, type = 'info') {
        // Простое уведомление в консоли и через alert
        console.log(`[КАЛИБРОВКА] ${message}`);
        
        // Можно добавить визуальное уведомление, если нужно
        // Пока используем console.log
    }
}

// Инициализация после загрузки страницы
let calibrationPanel = null;

// Ждем инициализации poseAnalyzer
if (typeof window !== 'undefined') {
    // Проверяем наличие poseAnalyzer через mediapipe-integration
    const initCalibration = () => {
        if (window.poseAnalyzer) {
            calibrationPanel = new CalibrationPanel(window.poseAnalyzer);
            console.log('✅ Панель калибровки инициализирована');
            
            // Применяем параметры пресса по умолчанию при инициализации - ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДОРАБОТКИ
            // if (window.poseAnalyzer.abdominalLiftThreshold !== undefined) {
            //     window.poseAnalyzer.abdominalLiftThreshold = calibrationPanel.defaultParams.abdominalLiftThreshold;
            // }
            // if (window.poseAnalyzer.abdominalFramesRequired !== undefined) {
            //     window.poseAnalyzer.abdominalFramesRequired = calibrationPanel.defaultParams.abdominalFramesRequired;
            // }
        } else {
            // Пробуем еще раз через небольшую задержку
            setTimeout(initCalibration, 500);
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalibration);
    } else {
        setTimeout(initCalibration, 1000);
    }
}

