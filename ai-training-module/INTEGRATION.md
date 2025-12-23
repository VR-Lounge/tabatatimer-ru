# Инструкция по интеграции модуля AI-тренинга

## Шаг 1: Скопируйте папку модуля

Скопируйте всю папку `ai-training-module` в корень вашего проекта или в любое удобное место.

## Шаг 2: Добавьте CSS в `<head>`

```html
<link rel="stylesheet" href="ai-training-module/css/mediapipe-pose.css">
```

## Шаг 3: Добавьте TensorFlow.js скрипты в `<head>`

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.11.0/dist/tf-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@4.11.0/dist/tf-converter.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.11.0/dist/tf-backend-webgl.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.0/dist/pose-detection.min.js"></script>
```

## Шаг 4: Добавьте HTML структуру в тело страницы

См. файл `html-structure.html` для полной HTML структуры.

## Шаг 5: Инициализируйте объект sounds

Перед подключением JavaScript модулей добавьте:

```html
<script>
    window.sounds = {
        pay: "ai-training-module/audio/pay.mp3"
    };
</script>
```

## Шаг 6: Подключите JavaScript модули

**ВАЖНО:** Порядок подключения имеет значение!

```html
<script src="ai-training-module/js/movenet-pose.js"></script>
<script src="ai-training-module/js/mediapipe-pose.js"></script>
<script src="ai-training-module/js/calibration-panel.js"></script>
<script src="ai-training-module/js/mediapipe-integration.js"></script>
```

## Шаг 7: (Опционально) Проверка загрузки TensorFlow.js

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
            const maxAttempts = 200;
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

## Готово! 🎉

Модуль должен работать. Откройте страницу и нажмите кнопку "Включи AI-тренинг".

## Примечания

- Убедитесь, что ваш сайт работает по HTTPS или на localhost (требование для доступа к камере)
- Проверьте пути к файлам - они должны быть корректными относительно вашей структуры проекта
- Если модуль не работает, откройте консоль браузера (F12) для диагностики ошибок

