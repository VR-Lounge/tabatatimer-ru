# 🚀 Быстрый старт - Модуль AI-тренинга

## Что включено

✅ Все необходимые файлы CSS и JavaScript  
✅ Звуковой файл для уведомлений  
✅ Полная документация  
✅ Пример интеграции  
✅ Готовые HTML структуры  

## Структура модуля

```
ai-training-module/
├── css/              # Стили
├── js/               # JavaScript модули
├── audio/            # Звуковые файлы
├── example.html      # Полный рабочий пример
├── README.md         # Подробная документация
├── INTEGRATION.md    # Пошаговая инструкция
├── DEPENDENCIES.md   # Список зависимостей
└── html-structure.html # Готовая HTML структура
```

## Минимальная интеграция (3 шага)

### 1. CSS
```html
<link rel="stylesheet" href="ai-training-module/css/mediapipe-pose.css">
```

### 2. TensorFlow.js (в `<head>`)
```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.0/dist/pose-detection.min.js"></script>
```

### 3. HTML + JavaScript (в `<body>`)
- Скопируйте HTML из `html-structure.html`
- Добавьте инициализацию:
```html
<script>
    window.sounds = { pay: "ai-training-module/audio/pay.mp3" };
</script>
<script src="ai-training-module/js/movenet-pose.js"></script>
<script src="ai-training-module/js/mediapipe-pose.js"></script>
<script src="ai-training-module/js/mediapipe-integration.js"></script>
```

## Полная инструкция

См. файл `INTEGRATION.md` для детальной пошаговой инструкции.

## Пример

Откройте `example.html` в браузере для просмотра рабочего примера.

## Поддержка упражнений

- ✅ Приседания
- ✅ Отжимания  
- ✅ Планка
- ✅ Стульчик

## Требования

- HTTPS или localhost
- Современный браузер с WebGL
- Доступ к камере

## Нужна помощь?

См. `README.md` для полной документации и решения проблем.

