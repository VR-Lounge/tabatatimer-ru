# Модуль AI-тренинга для фитнес-приложений

Модуль для анализа техники выполнения упражнений в реальном времени с использованием TensorFlow.js и pose-detection. Поддерживает следующие упражнения:
- **Приседания** (squat)
- **Отжимания** (pushup)
- **Планка** (plank)
- **Стульчик** (wallsit)

## 📁 Структура модуля

```
ai-training-module/
├── css/
│   └── mediapipe-pose.css          # Стили для UI модуля
├── js/
│   ├── movenet-pose.js             # Анализатор позы на основе MoveNet
│   ├── mediapipe-pose.js           # Анализатор позы на основе MediaPipe (альтернатива)
│   ├── mediapipe-integration.js    # Интеграция с UI и таймером
│   └── calibration-panel.js        # Панель калибровки параметров (опционально)
├── audio/
│   └── pay.mp3                     # Звук при зачёте повторения
├── example.html                    # Пример интеграции
└── README.md                       # Этот файл
```

## 🚀 Быстрый старт

### 1. Подключение CSS

Добавьте в `<head>` вашего HTML:

```html
<link rel="stylesheet" href="ai-training-module/css/mediapipe-pose.css">
```

### 2. Подключение TensorFlow.js (CDN)

Добавьте в `<head>` перед закрывающим тегом `</head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.11.0/dist/tf-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@4.11.0/dist/tf-converter.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.11.0/dist/tf-backend-webgl.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.0/dist/pose-detection.min.js"></script>
```

### 3. HTML структура

Добавьте в тело вашего HTML следующую структуру:

```html
<!-- Карточка AI-тренинга -->
<div class="mediapipe-ui-card">
    <div class="mediapipe-ui-meta">
        <div class="mediapipe-ui-title">Включи AI-тренинг</div>
        <div class="mediapipe-ui-tags">
            <span class="mediapipe-chip" data-exercise="squat" style="cursor: pointer;">Приседания</span>
            <span class="mediapipe-chip" data-exercise="pushup" style="cursor: pointer;">Отжимания</span>
            <span class="mediapipe-chip" data-exercise="plank" style="cursor: pointer;">Планка</span>
            <span class="mediapipe-chip" data-exercise="wallsit" style="cursor: pointer;">Стульчик</span>
        </div>
    </div>
    <p class="mediapipe-ui-description">AI-тренер анализирует твою технику в реальном времени и считает правильные повторения. Выбери упражнение и начни тренировку!</p>
    
    <div class="mediapipe-ui-actions">
        <button id="mediapipe-toggle-btn" class="mediapipe-toggle-btn">Включи AI-тренинг</button>
        
        <div class="select-wrapper">
            <select name="mediapipe-exercise" id="mediapipe-exercise-select">
                <option value="squat" selected>Приседания</option>
                <option value="pushup">Отжимания</option>
                <option value="plank">Планка</option>
                <option value="wallsit">Стульчик</option>
            </select>
        </div>
    </div>
    
    <!-- Контейнер для видео и canvas -->
    <div id="mediapipe-container" class="mediapipe-container">
        <video id="mediapipe-video" class="mediapipe-video" autoplay playsinline></video>
        <canvas id="mediapipe-canvas" class="mediapipe-canvas"></canvas>
        
        <div class="mediapipe-stats">
            <div class="mediapipe-current-score" id="mediapipe-current-score">0</div>
            <div class="mediapipe-score-label" id="mediapipe-score-label">Приседание</div>
            
            <div class="mediapipe-reps">
                <span class="mediapipe-reps-label">Повторов:</span>
                <span class="mediapipe-reps-value" id="mediapipe-reps-value">0</span>
            </div>
            
            <div class="mediapipe-average">
                <span class="mediapipe-average-label">Средний балл:</span>
                <span class="mediapipe-average-value" id="mediapipe-average-value">0</span>
            </div>
        </div>
        
        <div id="mediapipe-rep-notification" class="mediapipe-rep-notification"></div>
        
        <!-- Подсказки по позиционированию -->
        <div id="mediapipe-position-hint" class="mediapipe-position-hint">
            <div class="position-hint-icon"></div>
            <div class="position-hint-message"></div>
        </div>
    </div>
</div>
```

### 4. Инициализация глобального объекта sounds

Добавьте перед подключением JavaScript модулей:

```html
<script>
    window.sounds = {
        pay: "ai-training-module/audio/pay.mp3"  // Путь к звуку зачёта повторения
    };
</script>
```

### 5. Подключение JavaScript модулей

**ВАЖНО:** Порядок подключения имеет значение!

```html
<!-- Сначала анализаторы позы -->
<script src="ai-training-module/js/movenet-pose.js"></script>
<script src="ai-training-module/js/mediapipe-pose.js"></script>

<!-- Затем панель калибровки (опционально) -->
<script src="ai-training-module/js/calibration-panel.js"></script>

<!-- И наконец интеграция -->
<script src="ai-training-module/js/mediapipe-integration.js"></script>
```

### 6. Проверка загрузки TensorFlow.js (опционально)

Добавьте проверку загрузки библиотек:

```html
<script>
    (function() {
        function checkTensorFlow() {
            if (window.tf && window.poseDetection) {
                console.log('✓ TensorFlow.js и pose-detection загружены');
                return true;
            }
            return false;
        }
        
        if (!checkTensorFlow()) {
            let attempts = 0;
            const maxAttempts = 200; // 20 секунд
            const checkInterval = setInterval(function() {
                attempts++;
                if (checkTensorFlow() || attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                }
            }, 100);
        }
    })();
</script>
```

## 📋 Полный пример

См. файл `example.html` для полного рабочего примера интеграции.

## 🔧 Настройка параметров упражнений

Параметры упражнений можно настроить в файлах `movenet-pose.js` или `mediapipe-pose.js`:

### Приседания
- `squatThreshold` - Порог начала приседа (по умолчанию: 125°)
- `standThreshold` - Порог выпрямления (по умолчанию: 165°)
- `repMinDepth` - Минимальная глубина для зачёта (по умолчанию: 130°)
- `standingFramesRequired` - Кадров в стоячем положении (по умолчанию: 6)

### Отжимания
- `pushupThreshold` - Порог начала отжимания (по умолчанию: 80°)
- `pushupExtendedThreshold` - Порог выпрямления рук (по умолчанию: 160°)
- `pushupMinDepth` - Минимальная глубина для зачёта (по умолчанию: 80°)
- `extendedFramesRequired` - Кадров в выпрямленном положении (по умолчанию: 6)

### Планка
- `plankAngleMin` - Минимальный угол тела (по умолчанию: 160°)
- `plankAngleMax` - Максимальный угол тела (по умолчанию: 180°)
- `plankFramesRequired` - Кадров удержания для зачёта (по умолчанию: 150, т.е. 5 секунд при 30 FPS)

### Стульчик
- `wallsitAngleMin` - Минимальный угол колена (по умолчанию: 90°)
- `wallsitAngleMax` - Максимальный угол колена (по умолчанию: 110°)
- `wallsitFramesRequired` - Кадров удержания для зачёта (по умолчанию: 150, т.е. 5 секунд при 30 FPS)

## 🎨 Кастомизация стилей

Все стили находятся в файле `css/mediapipe-pose.css`. Вы можете переопределить CSS переменные или изменить классы для соответствия дизайну вашего приложения.

Основные CSS классы:
- `.mediapipe-ui-card` - Карточка модуля
- `.mediapipe-toggle-btn` - Кнопка включения/выключения
- `.mediapipe-container` - Контейнер для видео и canvas
- `.mediapipe-stats` - Статистика (повторы, баллы)
- `.mediapipe-rep-notification` - Уведомление о зачёте повторения

## 🔌 API и события

### Глобальные объекты

- `window.poseAnalyzer` - Экземпляр анализатора позы (доступен после инициализации)
- `window.sounds` - Объект с путями к звуковым файлам

### Callbacks анализатора

Модуль использует следующие callbacks (настраиваются в `mediapipe-integration.js`):

- `poseAnalyzer.onScoreUpdate(data)` - Обновление оценки в реальном времени
- `poseAnalyzer.onRepComplete(data)` - Завершение повторения
- `poseAnalyzer.onPositionHint(hint)` - Подсказка по позиционированию

### Функции

- `selectExercise(exercise)` - Выбор упражнения программно
- `toggleMediaPipe()` - Включение/выключение камеры программно

## 📱 Требования

- Современный браузер с поддержкой WebGL
- Доступ к камере устройства (HTTPS или localhost)
- Минимум 2GB RAM для работы TensorFlow.js

## 🔒 Конфиденциальность

- Видеозапись не ведётся
- Данные не сохраняются
- Анализ происходит только на устройстве пользователя
- Никакая информация не отправляется на сервер

## 🐛 Отладка

Включите режим отладки для получения подробной информации в консоли:

```javascript
window.DEBUG_MODE = true;
```

## 📝 Лицензия

Этот модуль является частью проекта tabatatimer.ru и предоставляется "как есть".

## 🤝 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что все файлы подключены в правильном порядке
3. Проверьте, что TensorFlow.js загрузился корректно
4. Убедитесь, что у пользователя есть доступ к камере

## 📚 Дополнительные ресурсы

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [Pose Detection Model](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection)
- [MoveNet Model](https://www.tensorflow.org/hub/tutorials/movenet)

