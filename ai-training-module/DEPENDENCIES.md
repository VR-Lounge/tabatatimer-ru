# Зависимости модуля AI-тренинга

## Внешние зависимости (CDN)

Модуль требует следующие библиотеки, которые загружаются через CDN:

### TensorFlow.js Core
- **URL**: `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.11.0/dist/tf-core.min.js`
- **Версия**: 4.11.0
- **Описание**: Основная библиотека TensorFlow.js

### TensorFlow.js Converter
- **URL**: `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@4.11.0/dist/tf-converter.min.js`
- **Версия**: 4.11.0
- **Описание**: Конвертер моделей для TensorFlow.js

### TensorFlow.js Backend WebGL
- **URL**: `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.11.0/dist/tf-backend-webgl.min.js`
- **Версия**: 4.11.0
- **Описание**: WebGL бэкенд для ускорения вычислений

### TensorFlow.js (полная версия)
- **URL**: `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js`
- **Версия**: 4.11.0
- **Описание**: Полная библиотека TensorFlow.js

### TensorFlow.js Pose Detection
- **URL**: `https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.0/dist/pose-detection.min.js`
- **Версия**: 2.1.0
- **Описание**: Модель для детекции позы человека

## Локальные файлы модуля

### CSS
- `css/mediapipe-pose.css` - Стили для UI модуля

### JavaScript
- `js/movenet-pose.js` - Анализатор позы на основе MoveNet
- `js/mediapipe-pose.js` - Анализатор позы на основе MediaPipe (альтернатива)
- `js/mediapipe-integration.js` - Интеграция с UI и таймером
- `js/calibration-panel.js` - Панель калибровки параметров (опционально)

### Аудио
- `audio/pay.mp3` - Звук при зачёте повторения

## Системные требования

- **Браузер**: Современный браузер с поддержкой:
  - WebGL (для ускорения вычислений)
  - WebRTC (для доступа к камере)
  - ES6+ JavaScript
- **Протокол**: HTTPS или localhost (требование для доступа к камере)
- **RAM**: Минимум 2GB для работы TensorFlow.js
- **Видеокарта**: Рекомендуется наличие GPU для лучшей производительности

## Альтернативные источники CDN

Если jsdelivr недоступен, можно использовать альтернативные CDN:

### unpkg.com
```
https://unpkg.com/@tensorflow/tfjs-core@4.11.0/dist/tf-core.min.js
https://unpkg.com/@tensorflow/tfjs-converter@4.11.0/dist/tf-converter.min.js
https://unpkg.com/@tensorflow/tfjs-backend-webgl@4.11.0/dist/tf-backend-webgl.min.js
https://unpkg.com/@tensorflow/tfjs@4.11.0/dist/tf.min.js
https://unpkg.com/@tensorflow-models/pose-detection@2.1.0/dist/pose-detection.min.js
```

### cdnjs.cloudflare.com
Проверьте наличие пакетов на https://cdnjs.com/

## Локальная установка (опционально)

Если вы хотите использовать локальные версии библиотек вместо CDN:

1. Установите через npm:
```bash
npm install @tensorflow/tfjs@4.11.0
npm install @tensorflow-models/pose-detection@2.1.0
```

2. Скопируйте файлы из `node_modules` в папку вашего проекта

3. Обновите пути в HTML файле

## Размер файлов (приблизительно)

- TensorFlow.js Core: ~500 KB
- TensorFlow.js Converter: ~200 KB
- TensorFlow.js Backend WebGL: ~100 KB
- TensorFlow.js (полная): ~1 MB
- Pose Detection: ~2 MB
- **Общий размер**: ~3.8 MB (загружается один раз и кэшируется)

## Проверка загрузки

После подключения всех скриптов проверьте в консоли браузера:

```javascript
console.log('TensorFlow.js:', !!window.tf);
console.log('Pose Detection:', !!window.poseDetection);
```

Оба должны вернуть `true`.

