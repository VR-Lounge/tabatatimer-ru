/* Unsplash sliders (клиентская часть)
 * ВАЖНО:
 * - В браузере используем ТОЛЬКО Access Key (Client-ID). Secret key на фронтенде не светим.
 * - Предпочитаем ОФФЛАЙН‑кэш (локальные изображения) для регионов, где Unsplash может быть недоступен.
 */

(function () {
  'use strict';

  var ACCESS_KEY = (window.UNSPLASH_ACCESS_KEY || '').trim();
  var UTM_SOURCE = (window.UNSPLASH_UTM_SOURCE || 'tabatatimer_ru').trim();
  var API_ROOT = 'https://api.unsplash.com';

  var CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

  function dbg() {
    if (!window.DEBUG_MODE) return;
    try {
      console.log.apply(console, ['[UNSPLASH]'].concat([].slice.call(arguments)));
    } catch (e) {}
  }

  function safeJsonParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }

  function cacheGet(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var parsed = safeJsonParse(raw);
      if (!parsed || !parsed.ts || !parsed.data) return null;
      if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
      return parsed.data;
    } catch (e) {
      return null;
    }
  }

  function cacheSet(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data: data }));
    } catch (e) {}
  }

  function appendUtm(url) {
    try {
      var u = new URL(url);
      if (!u.searchParams.get('utm_source')) u.searchParams.set('utm_source', UTM_SOURCE);
      if (!u.searchParams.get('utm_medium')) u.searchParams.set('utm_medium', 'referral');
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  function buildPhotoAttribution(photo) {
    if (!photo || !photo.user || !photo.links) return '';
    var authorName = photo.user.name || 'Автор';
    var authorUrl = appendUtm(photo.user.links && photo.user.links.html ? photo.user.links.html : photo.links.html);
    var unsplashUrl = appendUtm('https://unsplash.com/');
    return (
      'Фото: <a href="' +
      authorUrl +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(authorName) +
      '</a> / <a href="' +
      unsplashUrl +
      '" target="_blank" rel="noopener noreferrer">Unsplash</a>'
    );
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function buildLocalAttribution(item) {
    if (!item) return '';
    var authorName = item.authorName || 'Автор';
    var authorUrl = item.authorUrl || appendUtm('https://unsplash.com/');
    var unsplashUrl = item.unsplashUrl || appendUtm('https://unsplash.com/');
    return (
      'Фото: <a href="' +
      authorUrl +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(authorName) +
      '</a> / <a href="' +
      unsplashUrl +
      '" target="_blank" rel="noopener noreferrer">Unsplash</a>'
    );
  }

  function joinPath(dir, file) {
    // Оставляем пробелы и вертикальные черты в путях папок — корректно кодируем URL
    var full = String(dir || '').replace(/\/+$/, '') + '/' + String(file || '').replace(/^\/+/, '');
    try {
      return encodeURI(full);
    } catch (e) {
      return full;
    }
  }

  function chooseImgUrl(photo, kind) {
    // Тип URL для картинки: slider
    if (!photo) return null;
    if (photo.localUrl) return photo.localUrl;
    if (!photo.urls) return null;
    return photo.urls.regular || photo.urls.full || photo.urls.small || null;
  }

  async function unsplashSearchPhotos(params) {
    var query = params.query;
    var orientation = params.orientation || 'landscape';
    var perPage = params.perPage || 12;

    var cacheKey = 'unsplash:search:' + query + ':' + orientation + ':' + perPage;
    var cached = cacheGet(cacheKey);
    if (cached) return cached;

    if (!ACCESS_KEY) {
      dbg('Нет window.UNSPLASH_ACCESS_KEY — пропускаем загрузку.');
      return [];
    }

    var url =
      API_ROOT +
      '/search/photos?query=' +
      encodeURIComponent(query) +
      '&orientation=' +
      encodeURIComponent(orientation) +
      '&per_page=' +
      encodeURIComponent(perPage) +
      '&content_filter=high';

    dbg('fetch', url);
    var res = await fetch(url, {
      headers: {
        Authorization: 'Client-ID ' + ACCESS_KEY,
        'Accept-Version': 'v1'
      }
    });

    if (!res.ok) {
      dbg('Unsplash error', res.status, res.statusText);
      return [];
    }

    var json = await res.json();
    var photos = (json && json.results) || [];
    cacheSet(cacheKey, photos);
    return photos;
  }

  function parseQueries(str) {
    if (!str) return [];
    // Поддержка: "q1, q2, q3"
    // (запятые безопасны для атрибутов)
    return String(str)
      .split(',')
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function uniqueById(list) {
    var seen = {};
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      var id = p && p.id;
      if (!id || seen[id]) continue;
      seen[id] = true;
      out.push(p);
    }
    return out;
  }

  function shuffleInPlace(arr) {
    // Перемешивание Фишера—Йетса
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  // ---- Мотивационные фразы (по 100 на каждую категорию) ----
  var MOTIVATION_WOMAN = [
    'Ты сильнее, чем думаешь.',
    'Твоя энергия — твоя суперсила.',
    'Сегодня ты строишь себя завтрашнюю.',
    'Маленький шаг — большой результат.',
    'Сделай это ради себя.',
    'Дыши. Двигайся. Побеждай.',
    'Ты — дисциплина в красивой форме.',
    'Сила начинается с решения.',
    'Сейчас — твой момент.',
    'Каждый раунд делает тебя увереннее.',
    'Ты умеешь больше.',
    'Делай с любовью к себе.',
    'Не идеально — но регулярно.',
    'Сильная — значит живая.',
    'Тело слушает привычки.',
    'Пусть тренировка станет твоим ритуалом.',
    'Ты — не настроение, ты — выбор.',
    'Никаких “потом”. Только “сейчас”.',
    'Усталость пройдет, гордость останется.',
    'Ты — результат своих действий.',
    'Собирай себя по повторениям.',
    'Будь своей мотивацией.',
    'Сила — это спокойствие внутри.',
    'Ты заслуживаешь быть в форме.',
    'Ты растешь в каждом интервале.',
    'Фокус на прогрессе.',
    'Твоя цель ближе, чем кажется.',
    'Держи темп. Держи себя.',
    'Ты — вдохновение.',
    'Тренировка — твоя перезагрузка.',
    'Здоровье — это любовь к себе.',
    'Сегодня — лучше, чем вчера.',
    'Границы — это иллюзия.',
    'Ты можешь. Точка.',
    'Сильная женщина — это привычка.',
    'Ты создаешь форму, а не ищешь её.',
    'Не сдавайся на последней минуте.',
    'Пусть мышцы помнят твой характер.',
    'Ты — в процессе, и это красиво.',
    'Сделай ещё один повтор.',
    'Твоя уверенность — в движении.',
    'Дисциплина делает тебя свободной.',
    'Победа — это продолжать.',
    'Ты — сила и грация.',
    'Сейчас ты выбираешь себя.',
    'Стань лучшей версией себя.',
    'Отговорки не тренируют.',
    'Сделай это легко: просто начни.',
    'Каждый интервал — твой шаг.',
    'Ты не обязана быть идеальной. Будь настойчивой.',
    'Твоё тело благодарит тебя.',
    'Ты — огонь, который не гаснет.',
    'Тренируйся, чтобы чувствовать себя мощно.',
    'Ты управляешь своим настроением.',
    'Мышцы любят терпение.',
    'Ты — твоя собственная команда.',
    'Сильная — это привычка думать иначе.',
    'Сомнения — шум. Действия — ответ.',
    'Сейчас ты строишь выносливость.',
    'Ты достойна гордиться собой.',
    'Сделай сегодня “плюс один”.',
    'Твоя сила — в регулярности.',
    'Двигайся красиво. Двигайся смело.',
    'Горячее сердце. Холодная голова.',
    'Ты умеешь держать темп.',
    'Эта тренировка — твоя инвестиция.',
    'Будь последовательной.',
    'Сделай тело своим союзником.',
    'Сильнее. Выше. Увереннее.',
    'Собранность — твоя магия.',
    'Улыбнись: ты делаешь это.',
    'Ты растёшь даже когда сложно.',
    'Твоя сила — в твоём выборе.',
    'Пусть это будет твоей привычкой.',
    'Ты не сдаешься — ты адаптируешься.',
    'Сейчас — твой фундамент.',
    'Работай тихо, сияй громко.',
    'Ты — дисциплина и свобода.',
    'Хочешь — значит делаешь.',
    'Ты умеешь побеждать себя.',
    'Один раунд. Ещё один.',
    'Ты — твой главный проект.',
    'Сила — это забота о себе.',
    'Делай это для здоровья и радости.',
    'Ты — смелость в движении.',
    'Внутри тебя — мощь.',
    'Сильная спина — сильная жизнь.',
    'Твоя выносливость впечатляет.',
    'Будь терпеливой, будь настойчивой.',
    'Твоя тренировка — твой стиль.',
    'Сегодня ты выигрываешь у “не хочу”.',
    'Сейчас — самый подходящий момент.',
    'Ты — вдохновляешь сама себя.',
    'Шаг за шагом — к лучшей форме.',
    'Ты — сила. Ты — баланс.',
    'Сделай это ради будущей себя.',
    'Ты прекрасна, когда стараешься.',
    'Твой ритм — твоя сила.',
    'Выбирай себя каждый день.'
  ];

  var MOTIVATION_MAN = [
    'Сила — это привычка.',
    'Дисциплина важнее мотивации.',
    'Работай тихо — результат скажет громко.',
    'Ещё один раунд. Без вариантов.',
    'Ты здесь не случайно.',
    'Жёстко — значит эффективно.',
    'Не ищи легкого. Стань сильнее.',
    'Твой характер видно в последней минуте.',
    'Сделай то, что другие откладывают.',
    'Сегодня ты закаляешь волю.',
    'Фокус. Темп. Контроль.',
    'Ты сильнее своих оправданий.',
    'Сейчас ты строишь мощь.',
    'Готовься побеждать каждый день.',
    'Легенды делаются на тренировках.',
    'Не тормози. Держи ритм.',
    'Сила любит повторения.',
    'Твоя форма — это твой труд.',
    'Слабость — временно. Сдача — навсегда.',
    'Ты отвечаешь за результат.',
    'Тренируйся, как будто это важно. Потому что важно.',
    'Будь быстрее, чем вчера.',
    'Стань тем, кто не сдается.',
    'Каждый интервал — шаг к силе.',
    'Делай работу.',
    'Никакой драмы — только дело.',
    'Ты управляешь собой.',
    'Сомнения — в сторону.',
    'Мышцы строятся терпением.',
    'Сильный — значит собранный.',
    'Победа начинается с решения.',
    'Крепкий корпус — крепкий характер.',
    'Устал — значит растешь.',
    'Делай чисто. Делай мощно.',
    'Скорость без контроля — ноль.',
    'Сейчас — твоя территория.',
    'Жми. Дыши. Держи.',
    'Не останавливайся на полпути.',
    'Сила — это системность.',
    'Ты здесь за прогрессом.',
    'Сделай ещё один подход.',
    'Держи форму. Держи слово.',
    'Только вперёд.',
    'Жёсткая дисциплина — мягкая жизнь.',
    'Сегодня — тренировка, завтра — уверенность.',
    'Твоя работа видна в деталях.',
    'Стань опасно выносливым.',
    'Не спорь с таймером — работай.',
    'Сейчас ты настраиваешься на победу.',
    'Тренируйся, чтобы уважать себя.',
    'Дави слабость действием.',
    'Сильный не тот, кто начал. А тот, кто закончил.',
    'Холодная голова. Горячее сердце.',
    'Выносливость — твое оружие.',
    'Меньше слов. Больше повторов.',
    'Сделай результат неизбежным.',
    'Ты — твой лучший соперник.',
    'Не ищи оправданий. Ищи темп.',
    'Пока другие думают — ты делаешь.',
    'Сила в простом: регулярность.',
    'Живи в режиме “сделано”.',
    'Слабые ждут. Сильные работают.',
    'Тело не врет: оно помнит усилия.',
    'Режим зверя: включен.',
    'Дисциплина — твой фундамент.',
    'Стань тем, кто держит удар.',
    'Ещё 20 секунд — и ты сильнее.',
    'Жми до конца.',
    'Скорость. Мощь. Выносливость.',
    'Форма — это уважение к себе.',
    'Контроль — признак силы.',
    'Ты создаешь привычку побеждать.',
    'Никаких “почти”. Только “сделал”.',
    'Твой темп — твой стиль.',
    'Сейчас ты строишь железную волю.',
    'Сделай боль полезной.',
    'Сильный — значит спокойный.',
    'Не бойся тяжёлого — бойся пустого.',
    'Ты способен на большее.',
    'Результат любит дисциплину.',
    'Включайся. Выключай сомнения.',
    'Не сливай концовку.',
    'Сильный — это тот, кто продолжает.',
    'Тренируйся, чтобы быть готовым.',
    'Техника. Дыхание. Темп.',
    'Ты здесь — значит победишь.',
    'Сделай сегодня трудным. Завтра будет легче.',
    'Сделай себе стальной характер.',
    'Сильный дух — сильное тело.',
    'Сейчас ты закладываешь фундамент.',
    'Ещё один раунд — и ты другой.',
    'Воля решает.',
    'Стань лучше, чем вчера.',
    'Держись. Это твой момент.',
    'Сделай это. Без оправданий.',
    'Сила — это выбор каждый день.',
    'Тренировка — твой контракт с собой.',
    'Работа сделана — уважение заслужено.',
    'Стань сильнее сегодня.'
  ];

  function hashString(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function pickQuote(context, key) {
    var list = context === 'men' ? MOTIVATION_MAN : MOTIVATION_WOMAN;
    if (!list.length) return '';
    var idx = hashString(String(key || '')) % list.length;
    return list[idx];
  }

  function getSliderContext(root) {
    try {
      var art = root && root.closest ? root.closest('article') : null;
      if (art && art.id === 'men') return 'men';
    } catch (e) {}
    return 'women';
  }

  function fileNo(url) {
    try {
      var m = String(url || '').match(/\/(\d+)\.jpg/i);
      return m ? m[1] : '';
    } catch (e) {
      return '';
    }
  }

  function seoText(photo, index, ctx) {
    // Контекст: men / women
    var currentContext = ctx || (window.location.hash === '#men' ? 'men' : 'women');

    // Базовые фразы на русском
    var base = currentContext === 'men' ? 'Табата для мужчин — мотивация' : 'Табата для женщин — вдохновение';

    // Русские описания для фитнеса
    var descriptions = currentContext === 'men'
      ? [
          'силовая тренировка',
          'тренировка с отягощениями',
          'упражнения на силу',
          'мужской фитнес',
          'тренировка мышц',
          'силовые упражнения',
          'бодибилдинг',
          'кроссфит тренировка',
          'функциональный тренинг',
          'тренировка выносливости',
          'силовая подготовка',
          'мужская мотивация',
          'тренировка пресса',
          'упражнения на грудь',
          'тренировка спины',
          'тренировка ног',
          'кардио тренировка',
          'интервальная тренировка',
          'высокоинтенсивная тренировка',
          'тренировка всего тела'
        ]
      : [
          'женская фитнес тренировка',
          'тренировка для женщин',
          'упражнения для девушек',
          'женский фитнес',
          'тренировка для похудения',
          'кардио для женщин',
          'силовая тренировка для девушек',
          'йога и фитнес',
          'функциональный тренинг',
          'тренировка выносливости',
          'женская мотивация',
          'тренировка пресса',
          'упражнения на ноги',
          'тренировка ягодиц',
          'растяжка и фитнес',
          'пилатес тренировка',
          'интервальная тренировка',
          'высокоинтенсивная тренировка',
          'тренировка всего тела',
          'женское здоровье'
        ];

    // Используем индекс для уникальности и выбора описания
    var i = index !== undefined ? index : 0;
    var desc = descriptions[i % descriptions.length];

    // Уникальный номер фото (из имени файла или индекса)
    var fileNum = fileNo(chooseImgUrl(photo, 'slider') || '');
    var photoNum = fileNum || (i + 1).toString();

    return base + ' — ' + desc + ' — фото №' + photoNum;
  }

  var lightbox = null;

  function ensureLightbox() {
    if (lightbox) return lightbox;
    var overlay = document.createElement('div');
    overlay.className = 'unsplash-lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '' +
      '<div class="unsplash-lightbox-backdrop"></div>' +
      '<div class="unsplash-lightbox-frame" role="dialog" aria-modal="true">' +
      '  <button class="unsplash-lightbox-close" type="button" aria-label="Закрыть" data-action="close">Close</button>' +
      '  <button class="unsplash-lightbox-nav unsplash-lightbox-prev" type="button" aria-label="Предыдущее" data-action="prev">‹</button>' +
      '  <button class="unsplash-lightbox-nav unsplash-lightbox-next" type="button" aria-label="Следующее" data-action="next">›</button>' +
      '  <div class="unsplash-lightbox-viewport">' +
      '    <div class="unsplash-lightbox-track">' +
      '      <div class="unsplash-lightbox-slide"><img class="unsplash-lightbox-image is-prev" alt="" /></div>' +
      '      <div class="unsplash-lightbox-slide"><img class="unsplash-lightbox-image is-current" alt="" /></div>' +
      '      <div class="unsplash-lightbox-slide"><img class="unsplash-lightbox-image is-next" alt="" /></div>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(overlay);

    var lbViewport = overlay.querySelector('.unsplash-lightbox-viewport');
    var lbTrack = overlay.querySelector('.unsplash-lightbox-track');
    var lbImgPrev = overlay.querySelector('.unsplash-lightbox-image.is-prev');
    var lbImg = overlay.querySelector('.unsplash-lightbox-image.is-current');
    var lbImgNext = overlay.querySelector('.unsplash-lightbox-image.is-next');
    var lbCloseBtn = overlay.querySelector('.unsplash-lightbox-close');
    var lbBackdrop = overlay.querySelector('.unsplash-lightbox-backdrop');
    var lbFrame = overlay.querySelector('.unsplash-lightbox-frame');

    var lb = {
      el: overlay,
      viewport: lbViewport,
      track: lbTrack,
      imgPrev: lbImgPrev,
      img: lbImg,
      imgNext: lbImgNext,
      isOpen: false,
      photos: [],
      index: 0,
      lastHash: '',
      lastHref: '',
      zoom: { scale: 1, x: 0, y: 0 },
      pointers: {},
      gesture: { mode: null, lastX: 0, lastY: 0, swipeStartX: 0, swipeStartY: 0, pinchStartDist: 0, pinchStartScale: 1 },
      lastTap: { t: 0, x: 0, y: 0 },
      raf: { id: 0, vx: 0, vy: 0, lastT: 0 },
      swipe: { currentX: 0, dragging: false },
      dismiss: { active: false, startX: 0, startY: 0, dy: 0 }
    };

    function clamp(v, min, max) {
      return Math.min(max, Math.max(min, v));
    }
    function rubber(v, min, max) {
      if (v < min) return min + (v - min) * 0.35;
      if (v > max) return max + (v - max) * 0.35;
      return v;
    }
    function rect() {
      try {
        return lbViewport.getBoundingClientRect();
      } catch (e) {
        return null;
      }
    }
    function maxT(scale) {
      var r = rect();
      if (!r) return { x: 0, y: 0 };
      return { x: ((scale - 1) * r.width) / 2, y: ((scale - 1) * r.height) / 2 };
    }
    function apply() {
      var m = maxT(lb.zoom.scale);
      lb.zoom.x = rubber(lb.zoom.x, -m.x, m.x);
      lb.zoom.y = rubber(lb.zoom.y, -m.y, m.y);
      lb.img.style.transform =
        'translate(' + lb.zoom.x.toFixed(2) + 'px,' + lb.zoom.y.toFixed(2) + 'px) scale(' + lb.zoom.scale.toFixed(3) + ')';
      lb.img.style.willChange = lb.zoom.scale > 1 ? 'transform' : '';
      lbViewport.style.touchAction = lb.zoom.scale > 1 ? 'none' : 'pan-y';
    }

    function lbBaseX() {
      return -(lbViewport ? lbViewport.clientWidth : 0);
    }

    function lbSetTrackOffset(dx, animate) {
      if (!lb.track || !lbViewport) return;
      var x = lbBaseX() + dx;
      lb.track.style.transition = animate ? 'transform 220ms ease' : 'none';
      lb.track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    }

    function setDismissProgress(dy, animate) {
      if (!lbFrame) return;
      var h = (lbViewport && lbViewport.clientHeight) || 600;
      var p = clamp(Math.abs(dy) / h, 0, 1);
      // Небольшое уменьшение и смещение, как в iPhone Photos
      var scale = 1 - p * 0.22;
      lbFrame.style.transition = animate ? 'transform 180ms ease' : 'none';
      lbFrame.style.transform = 'translate3d(0,' + dy.toFixed(2) + 'px,0) scale(' + scale.toFixed(3) + ')';
      if (lbBackdrop) {
        lbBackdrop.style.transition = animate ? 'opacity 180ms ease' : 'none';
        lbBackdrop.style.opacity = String(1 - p * 0.75);
      }
    }

    function resetDismiss(animate) {
      lb.dismiss.active = false;
      lb.dismiss.dy = 0;
      setDismissProgress(0, animate);
      // После анимации убираем инлайновые стили, чтобы не мешать другим состояниям
      setTimeout(function () {
        try {
          if (!lb.isOpen) return;
          if (lbFrame) {
            lbFrame.style.transition = '';
            lbFrame.style.transform = '';
          }
          if (lbBackdrop) {
            lbBackdrop.style.transition = '';
            lbBackdrop.style.opacity = '';
          }
        } catch (e) {}
      }, animate ? 220 : 0);
    }
    function stopMomentum() {
      if (lb.raf.id) cancelAnimationFrame(lb.raf.id);
      lb.raf.id = 0;
      lb.raf.vx = 0;
      lb.raf.vy = 0;
    }
    function snap(animate) {
      var m = maxT(lb.zoom.scale);
      var tx = clamp(lb.zoom.x, -m.x, m.x);
      var ty = clamp(lb.zoom.y, -m.y, m.y);
      if (!animate) {
        lb.zoom.x = tx;
        lb.zoom.y = ty;
        apply();
        return;
      }
      var sx = lb.zoom.x;
      var sy = lb.zoom.y;
      var start = Date.now();
      var dur = 160;
      stopMomentum();
      (function tick() {
        var t = (Date.now() - start) / dur;
        if (t >= 1) {
          lb.zoom.x = tx;
          lb.zoom.y = ty;
          apply();
          return;
        }
        var e = 1 - Math.pow(1 - t, 3);
        lb.zoom.x = sx + (tx - sx) * e;
        lb.zoom.y = sy + (ty - sy) * e;
        apply();
        lb.raf.id = requestAnimationFrame(tick);
      })();
    }
    function resetZoom() {
      stopMomentum();
      lb.zoom.scale = 1;
      lb.zoom.x = 0;
      lb.zoom.y = 0;
      apply();
    }
    function dist(a, b) {
      var dx = a.clientX - b.clientX;
      var dy = a.clientY - b.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    function mid(a, b) {
      return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
    }
    function setScaleAt(clientX, clientY, nextScale) {
      var r = rect();
      if (!r) return;
      nextScale = clamp(nextScale, 1, 5);
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var px = clientX - cx;
      var py = clientY - cy;
      var s0 = lb.zoom.scale;
      var s1 = nextScale;
      lb.zoom.x = lb.zoom.x + (s0 - s1) * px;
      lb.zoom.y = lb.zoom.y + (s0 - s1) * py;
      lb.zoom.scale = s1;
      apply();
    }

    function render() {
      if (!lb.photos.length) return;
      resetZoom();
      resetDismiss(false);
      // Сбрасываем состояние свайпа и возвращаем трек в центр
      lb.swipe.currentX = 0;
      lb.swipe.dragging = false;
      lbSetTrackOffset(0, false);
      var p = lb.photos[lb.index];
      var src = chooseImgUrl(p, 'slider');
      if (!src) return;
      
      // Устанавливаем seo-тексты, если они еще не установлены
      // Контекст нужен и для соседних картинок (альт/тайтл)
      var currentContext = window.location.hash === '#men' ? 'men' : 'women';
      if (!p.seoAlt || !p.seoTitle) {
        // Определяем контекст из текущего hash
        var seo = seoText(p, lb.index, currentContext);
        p.seoAlt = seo;
        p.seoTitle = seo;
      }
      
      // Проставляем «вагоны»: prev/current/next
      var prevI = (lb.index - 1 + lb.photos.length) % lb.photos.length;
      var nextI = (lb.index + 1) % lb.photos.length;
      var pPrev = lb.photos[prevI];
      var pNext = lb.photos[nextI];
      var uPrev = chooseImgUrl(pPrev, 'slider');
      var uNext = chooseImgUrl(pNext, 'slider');

      if (lb.imgPrev && uPrev) {
        lb.imgPrev.src = uPrev;
        lb.imgPrev.alt = seoText(pPrev, prevI, currentContext);
        lb.imgPrev.title = lb.imgPrev.alt;
      }
      if (lb.imgNext && uNext) {
        lb.imgNext.src = uNext;
        lb.imgNext.alt = seoText(pNext, nextI, currentContext);
        lb.imgNext.title = lb.imgNext.alt;
      }

      lb.img.src = src;
      lb.img.alt = p.seoAlt;
      lb.img.title = p.seoTitle;
      lb.img.style.transition = 'transform 0.3s ease-out';

      // Прелоад соседей
      if (uPrev) new Image().src = uPrev;
      if (uNext) new Image().src = uNext;
    }

    function open(photos, index) {
      lb.photos = photos || [];
      lb.index = index || 0;
      lb.isOpen = true;
      lb.lastHash = window.location.hash || '';
      lb.lastHref = window.location.href || '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('unsplash-lightbox-open');
      document.body.classList.add('unsplash-lightbox-open');
      render();
    }

    function close() {
      lb.isOpen = false;

      // Сбрасываем инлайновые стили после «свайпа вниз», чтобы не залипало состояние
      try {
        if (lbFrame) {
          lbFrame.style.transition = '';
          lbFrame.style.transform = '';
        }
        if (lbBackdrop) {
          lbBackdrop.style.transition = '';
          lbBackdrop.style.opacity = '';
        }
      } catch (e0) {}
      
      // СРАЗУ восстанавливаем hash, чтобы внешние обработчики не успели сбросить его
      var wantHref = lb.lastHref;
      var wantHash = lb.lastHash;
      try {
        if (wantHref && history && history.replaceState) {
          history.replaceState(null, '', wantHref);
        }
        if (wantHash && window.location.hash !== wantHash) {
          window.location.hash = wantHash;
        }
      } catch (e) {}
      
      // ВАЖНО: откладываем снятие классов/DOM, чтобы не было «проклика» до .close у статьи
      // (main.js делает location.hash='').
      resetZoom();
      setTimeout(function () {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('unsplash-lightbox-open');
        document.body.classList.remove('unsplash-lightbox-open');
      }, 0);
      
      // Дополнительная защита: несколько попыток восстановить URL после закрытия.
      (function restoreLoop() {
        var tries = [0, 30, 80, 160, 320];
        tries.forEach(function (ms) {
          setTimeout(function () {
            try {
              if (wantHref && window.location.href !== wantHref && history && history.replaceState) {
                history.replaceState(null, '', wantHref);
              }
              // Если статья успела скрыться — возвращаем hash (статья откроется обратно).
              if (wantHash && window.location.hash !== wantHash) {
                window.location.hash = wantHash;
              }
            } catch (e) {}
          }, ms);
        });
      })();
    }

    function next() {
      if (!lb.photos.length) return;
      lb.index = (lb.index + 1) % lb.photos.length;
      render();
    }
    function prev() {
      if (!lb.photos.length) return;
      lb.index = (lb.index - 1 + lb.photos.length) % lb.photos.length;
      render();
    }

    // Обработка кликов в capture-phase, чтобы перехватывать раньше обработчиков страницы
    overlay.addEventListener('click', function (e) {
      var t = e.target;
      if (!t) return;
      
      // Не даём клику триггерить обработчики страницы / навигацию
      try {
        e.preventDefault();
        e.stopPropagation();
      } catch (err) {}
      
      // Клик по backdrop = закрыть
      var isBackdrop = t === lbBackdrop || 
                       (t.classList && t.classList.contains('unsplash-lightbox-backdrop'));
      if (isBackdrop) {
        close();
        return;
      }
      
      // Клик по frame (не по фото/кнопкам) = закрыть
      if (t === lbFrame || (t.classList && t.classList.contains('unsplash-lightbox-frame'))) {
        // Закрываем только если клик был именно по frame, а не по дочерним элементам
        if (t === lbFrame) {
          close();
          return;
        }
      }
      
      // Клик по кнопкам с data-action
      if (t.getAttribute) {
        var act = t.getAttribute('data-action');
        if (act === 'close') {
          close();
          return;
        }
        if (act === 'next') {
          next();
          return;
        }
        if (act === 'prev') {
          prev();
          return;
        }
      }
    }, true);

    // Доп. защита: не даём pointer-событиям доходить до .close у статьи.
    if (lbCloseBtn) {
      // Останавливаем всплытие для pointer-событий, но не блокируем click на мобильных
      ['pointerdown', 'mousedown'].forEach(function (evt) {
        lbCloseBtn.addEventListener(
          evt,
          function (e) {
            try {
              e.preventDefault();
              e.stopPropagation();
            } catch (err) {}
          },
          true
        );
      });

      // Для touchstart: только stopPropagation (без preventDefault)
      lbCloseBtn.addEventListener(
        'touchstart',
        function (e) {
          try {
            e.stopPropagation();
          } catch (err) {}
        },
        true
      );

      // Для мобильных: закрываем по touchend
      lbCloseBtn.addEventListener(
        'touchend',
        function (e) {
          try {
            e.preventDefault();
            e.stopPropagation();
          } catch (err) {}
          close();
        },
        true
      );

      // Закрытие должно сработать всегда — обрабатываем на самой кнопке.
      lbCloseBtn.addEventListener(
        'click',
        function (e) {
          try {
            e.preventDefault();
            e.stopPropagation();
          } catch (err) {}
          close();
        },
        true
      );
    }

    // Аналогичная защита для backdrop, чтобы не уводило со статьи.
    if (lbBackdrop) {
      // Останавливаем всплытие в capture-phase для pointer-событий.
      // ВАЖНО: 'click' должен дойти до overlay-обработчика.
      ['pointerdown', 'mousedown', 'touchstart'].forEach(function (evt) {
        lbBackdrop.addEventListener(
          evt,
          function (e) {
            try {
              e.preventDefault();
              e.stopPropagation();
            } catch (err) {}
          },
          true
        );
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!lb.isOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    if (lbViewport) {
      lbViewport.addEventListener('dblclick', function (e) {
        var nextScale = lb.zoom.scale < 1.01 ? 2 : lb.zoom.scale < 2.5 ? 3 : 1;
        if (nextScale === 1) resetZoom();
        else {
          setScaleAt(e.clientX, e.clientY, nextScale);
          snap(true);
        }
        e.preventDefault();
      });

      lbViewport.addEventListener(
        'wheel',
        function (e) {
          if (!lb.isOpen) return;
          var delta = e.deltaY;
          if (e.deltaMode === 1) delta *= 16;
          var factor = Math.exp(-delta / 350);
          var nextScale = clamp(lb.zoom.scale * factor, 1, 5);
          setScaleAt(e.clientX, e.clientY, nextScale);
          if (lb.zoom.scale <= 1.01) resetZoom();
          else snap(false);
          e.preventDefault();
        },
        { passive: false }
      );

      lbViewport.addEventListener('pointerdown', function (e) {
        if (!lb.isOpen) return;
        lb.pointers[e.pointerId] = e;
        try {
          lbViewport.setPointerCapture(e.pointerId);
        } catch (err) {}
        stopMomentum();

        // Сброс позиции свайпа
        lb.swipe.currentX = 0;
        lb.swipe.dragging = false;
        if (lb.img) {
          lb.img.style.transition = 'none';
        }
        // Сброс состояния «свайп вниз для закрытия»
        lb.dismiss.active = false;
        lb.dismiss.startX = e.clientX;
        lb.dismiss.startY = e.clientY;
        lb.dismiss.dy = 0;
        // Возвращаем внешний вид, если предыдущий жест был прерван
        setDismissProgress(0, false);

        var now = Date.now();
        if (now - lb.lastTap.t < 280 && Math.abs(e.clientX - lb.lastTap.x) < 22 && Math.abs(e.clientY - lb.lastTap.y) < 22) {
          lb.lastTap.t = 0;
          var nextScale = lb.zoom.scale < 1.01 ? 2 : lb.zoom.scale < 2.5 ? 3 : 1;
          if (nextScale === 1) resetZoom();
          else {
            setScaleAt(e.clientX, e.clientY, nextScale);
            snap(true);
          }
          e.preventDefault();
          return;
        }
        lb.lastTap = { t: now, x: e.clientX, y: e.clientY };

        var keys = Object.keys(lb.pointers);
        if (keys.length === 2) {
          var p1 = lb.pointers[keys[0]];
          var p2 = lb.pointers[keys[1]];
          lb.gesture.mode = 'pinch';
          lb.gesture.pinchStartDist = dist(p1, p2);
          lb.gesture.pinchStartScale = lb.zoom.scale;
        } else {
          lb.gesture.mode = lb.zoom.scale > 1.01 ? 'pan' : 'swipe';
          lb.gesture.lastX = e.clientX;
          lb.gesture.lastY = e.clientY;
          lb.gesture.swipeStartX = e.clientX;
          lb.gesture.swipeStartY = e.clientY;
          lb.raf.lastT = now;
        }
      });

      lbViewport.addEventListener('pointermove', function (e) {
        if (!lb.isOpen) return;
        if (!lb.pointers[e.pointerId]) return;
        lb.pointers[e.pointerId] = e;
        var keys = Object.keys(lb.pointers);
        if (keys.length === 2) {
          var p1 = lb.pointers[keys[0]];
          var p2 = lb.pointers[keys[1]];
          var d0 = lb.gesture.pinchStartDist || 1;
          var d1 = dist(p1, p2);
          var m = mid(p1, p2);
          var nextScale = clamp(lb.gesture.pinchStartScale * (d1 / d0), 1, 5);
          setScaleAt(m.x, m.y, nextScale);
          e.preventDefault();
          return;
        }
        if (lb.gesture.mode === 'pan' && lb.zoom.scale > 1.01) {
          var dx = e.clientX - lb.gesture.lastX;
          var dy = e.clientY - lb.gesture.lastY;
          lb.gesture.lastX = e.clientX;
          lb.gesture.lastY = e.clientY;
          lb.zoom.x += dx;
          lb.zoom.y += dy;
          apply();
          var now = Date.now();
          var dt = Math.max(8, now - (lb.raf.lastT || now));
          lb.raf.vx = (dx / dt) * 16;
          lb.raf.vy = (dy / dt) * 16;
          lb.raf.lastT = now;
          e.preventDefault();
        } else if (lb.zoom.scale <= 1.01 && (lb.gesture.mode === 'swipe' || lb.gesture.mode === 'dismiss')) {
          // Два жеста при зуме = 1x:
          // - горизонтальный свайп: листание «вагонами»
          // - вертикальный свайп вниз: закрытие lightbox как на iPhone
          var dx = e.clientX - lb.gesture.swipeStartX;
          var dy = e.clientY - lb.gesture.swipeStartY;

          // Если уже в режиме закрытия — продолжаем
          if (lb.gesture.mode === 'dismiss') {
            lb.dismiss.active = true;
            lb.dismiss.dy = dy;
            setDismissProgress(dy, false);
            e.preventDefault();
            return;
          }

          // Вертикаль доминирует => включаем «свайп вниз для закрытия»
          if (Math.abs(dy) > Math.abs(dx) * 1.15 && Math.abs(dy) > 10) {
            lb.gesture.mode = 'dismiss';
            lb.dismiss.active = true;
            lb.dismiss.dy = dy;
            // На время закрытия возвращаем трек в центр
            lb.swipe.dragging = false;
            lb.swipe.currentX = 0;
            lbSetTrackOffset(0, false);
            setDismissProgress(dy, false);
            e.preventDefault();
            return;
          }

          // Горизонтальный свайп — «вагоны»
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
            lb.swipe.dragging = true;
            var maxSwipe = lbViewport.clientWidth || 800;
            lb.swipe.currentX = Math.max(-maxSwipe, Math.min(maxSwipe, dx));
            lbSetTrackOffset(lb.swipe.currentX, false);
            e.preventDefault();
          }
        }
      });

      lbViewport.addEventListener('pointerup', function (e) {
        if (!lb.isOpen) return;
        if (!lb.pointers[e.pointerId]) return;
        delete lb.pointers[e.pointerId];
        var keys = Object.keys(lb.pointers);

        // Если это был свайп вниз — решаем: закрыть или вернуть на место
        if (keys.length === 0 && lb.gesture.mode === 'dismiss') {
          var dy = lb.dismiss.dy || (e.clientY - lb.gesture.swipeStartY);
          var h = (lbViewport && lbViewport.clientHeight) || 600;
          var closeThresh = Math.max(120, h * 0.18);
          if (Math.abs(dy) >= closeThresh) {
            close();
          } else {
            resetDismiss(true);
          }
          lb.gesture.mode = null;
          return;
        }

        if (keys.length === 0 && (lb.gesture.mode === 'swipe' || lb.gesture.mode === 'pan')) {
          var dx = e.clientX - lb.gesture.swipeStartX;
          var dy = e.clientY - lb.gesture.swipeStartY;
          // Логика как в iPhone: при небольшом зуме свайп разрешён, при большом — только «упором в край».
          var swipeMin = 48;
          var swipeZoomThreshold = 1.25;
          var edgeEps = 8;

          if (lb.zoom.scale <= swipeZoomThreshold) {
            // Режим «вагоны»: либо переключаем, либо возвращаемся в центр
            if (Math.abs(dx) >= swipeMin && Math.abs(dx) > Math.abs(dy)) {
              var w = lbViewport.clientWidth || 800;
              var to = dx < 0 ? -w : w;
              lbSetTrackOffset(to, true);
              var done = false;
              var onEnd = function () {
                if (done) return;
                done = true;
                if (lb.track) lb.track.removeEventListener('transitionend', onEnd);
                lbSetTrackOffset(0, false);
                lb.swipe.currentX = 0;
                lb.swipe.dragging = false;
                if (dx < 0) next();
                else prev();
              };
              if (lb.track) lb.track.addEventListener('transitionend', onEnd);
              setTimeout(onEnd, 280);
            } else {
              lbSetTrackOffset(0, true);
              lb.swipe.currentX = 0;
              lb.swipe.dragging = false;
            }
          } else if (Math.abs(dx) >= swipeMin && Math.abs(dx) > Math.abs(dy)) {
            // Большой зум: переключаем только при упоре в край по X
            var m = maxT(lb.zoom.scale);
            var xClamped = clamp(lb.zoom.x, -m.x, m.x);
            if (dx < 0 && xClamped <= -m.x + edgeEps) next();
            if (dx > 0 && xClamped >= m.x - edgeEps) prev();
          }
        }

        if (keys.length === 0 && lb.gesture.mode === 'pan' && lb.zoom.scale > 1.01) {
          var friction = 0.92;
          var minV = 0.1;
          stopMomentum();
          (function tick() {
            lb.raf.vx *= friction;
            lb.raf.vy *= friction;
            lb.zoom.x += lb.raf.vx;
            lb.zoom.y += lb.raf.vy;
            apply();
            if (Math.abs(lb.raf.vx) < minV && Math.abs(lb.raf.vy) < minV) {
              snap(true);
              return;
            }
            lb.raf.id = requestAnimationFrame(tick);
          })();
        }

        if (keys.length === 0 && lb.zoom.scale < 1.01) resetZoom();
        if (keys.length === 0 && lb.zoom.scale > 1.01) snap(true);
        lb.gesture.mode = null;
      });

      lbViewport.addEventListener('pointercancel', function (e) {
        if (lb.pointers[e.pointerId]) delete lb.pointers[e.pointerId];
        if (!Object.keys(lb.pointers).length) lb.gesture.mode = null;
      });
    }

    lb.open = open;
    lb.close = close;
    lb.next = next;
    lb.prev = prev;
    lightbox = lb;
    return lightbox;
  }

  async function unsplashSearchMulti(params) {
    var queries = params.queries || [];
    var orientation = params.orientation || 'landscape';
    var perPage = params.perPage || 12;

    if (!queries.length) return [];
    if (queries.length === 1) return await unsplashSearchPhotos({ query: queries[0], orientation: orientation, perPage: perPage });

    var perQuery = Math.max(1, Math.ceil(perPage / queries.length));
    var results = await Promise.all(
      queries.map(function (q) {
        return unsplashSearchPhotos({ query: q, orientation: orientation, perPage: perQuery });
      })
    );
    var merged = [];
    for (var i = 0; i < results.length; i++) merged = merged.concat(results[i] || []);
    merged = uniqueById(merged);

    // Если фото слишком много — обрезаем; если мало — оставляем как есть.
    if (merged.length > perPage) merged = merged.slice(0, perPage);
    return merged;
  }

  function initOneSlider(root) {
    var queryStr = root.getAttribute('data-unsplash-query') || 'fitness workout';
    var queries = parseQueries(queryStr);
    var perPage = parseInt(root.getAttribute('data-unsplash-per-page') || '12', 10);
    var orientation = root.getAttribute('data-unsplash-orientation') || 'landscape';
    var localDir = (root.getAttribute('data-local-dir') || '').trim();
    var localManifest = (root.getAttribute('data-local-manifest') || 'manifest.json').trim();

    var viewport = root.querySelector('.unsplash-slider-viewport');
    var img = root.querySelector('.unsplash-slider-image');
    // Для эффекта «вагоны поезда» используем трек из 3 картинок (prev/current/next)
    var track = null;
    var imgPrev = null;
    var imgCur = null;
    var imgNext = null;
    var counter = root.querySelector('.unsplash-slider-counter');
    var attrib = root.querySelector('.unsplash-slider-attrib');
    var head = root.parentElement ? root.parentElement.querySelector('.unsplash-slider-head') : null;

    var prevBtn = head ? head.querySelector('[data-action="prev"]') : null;
    var nextBtn = head ? head.querySelector('[data-action="next"]') : null;

    var state = {
      photos: [],
      index: 0,
      loaded: false
    };

    var context = getSliderContext(root);
    var swipe = { down: false, x0: 0, y0: 0, dx: 0, dragging: false, width: 0 };

    function ensureSliderTrack() {
      if (!viewport) return;
      if (track) return;

      // Заменяем одиночный <img> на трек из 3 «вагонов»
      viewport.innerHTML = '';
      track = document.createElement('div');
      track.className = 'unsplash-slider-track';

      function mkSlide(kind) {
        var slide = document.createElement('div');
        slide.className = 'unsplash-slider-slide';
        var im = document.createElement('img');
        im.className = 'unsplash-slider-image ' + kind;
        im.loading = 'lazy';
        im.decoding = 'async';
        slide.appendChild(im);
        track.appendChild(slide);
        return im;
      }

      imgPrev = mkSlide('is-prev');
      imgCur = mkSlide('is-current');
      imgNext = mkSlide('is-next');
      viewport.appendChild(track);

      // Центральная картинка — текущая
      img = imgCur;
      setSliderTrackOffset(0, false);
    }

    function sliderBaseX() {
      return -(viewport ? viewport.clientWidth : 0);
    }

    function setSliderTrackOffset(dx, animate) {
      ensureSliderTrack();
      if (!track || !viewport) return;
      var x = sliderBaseX() + dx;
      track.style.transition = animate ? 'transform 220ms ease' : 'none';
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    }

    function go(delta) {
      if (!state.photos.length) return;
      state.index = (state.index + delta + state.photos.length) % state.photos.length;
      render(true);
      setSliderTrackOffset(0, false);
    }

    // Доступность: даём открыть фото с клавиатуры.
    if (viewport) {
      try {
        viewport.setAttribute('role', 'button');
        viewport.setAttribute('aria-label', 'Открыть фото');
        viewport.setAttribute('tabindex', '0');
        viewport.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            ensureLightbox().open(state.photos, state.index);
            e.preventDefault();
            e.stopPropagation();
          }
        });
      } catch (e) {}
    }

    function photoKey(photo) {
      return (photo && (photo.localUrl || photo.id)) || '';
    }

    // seoText и fileNo определены на верхнем уровне (нужны и в lightbox)

    function render(resetSwipe) {
      ensureSliderTrack();
      if (!img) return;
      if (!state.photos.length) {
        if (counter) counter.textContent = '';
        if (attrib) attrib.textContent = '';
        return;
      }

      // Сбрасываем трек в центр
      if (resetSwipe !== false) {
        swipe.dx = 0;
        swipe.dragging = false;
      }
      setSliderTrackOffset(0, false);

      var photo = state.photos[state.index];
      var src = chooseImgUrl(photo, 'slider');
      if (!src) return;

      // «Вагоны»: prev/current/next
      var prevI = (state.index - 1 + state.photos.length) % state.photos.length;
      var nextI = (state.index + 1) % state.photos.length;
      var pPrev = state.photos[prevI];
      var pNext = state.photos[nextI];
      var uPrev = chooseImgUrl(pPrev, 'slider');
      var uNext = chooseImgUrl(pNext, 'slider');
      if (imgPrev && uPrev) {
        imgPrev.src = uPrev;
        imgPrev.alt = seoText(pPrev, prevI, context);
        imgPrev.title = imgPrev.alt;
      }
      if (imgNext && uNext) {
        imgNext.src = uNext;
        imgNext.alt = seoText(pNext, nextI, context);
        imgNext.title = imgNext.alt;
      }

      img.style.opacity = '0.15';
      if (viewport) viewport.style.touchAction = 'pan-y';
      img.decoding = 'async';
      img.loading = 'lazy';

      // Прелоад через Image — уменьшает мерцание
      var pre = new Image();
      pre.onload = function () {
        img.src = src;
        var seo = seoText(photo, state.index, context);
        photo.seoAlt = seo;
        photo.seoTitle = seo;
        img.alt = seo;
        img.title = seo;
        img.style.opacity = '1';
      };
      pre.src = src;

      if (counter) counter.textContent = (state.index + 1).toString() + ' / ' + state.photos.length.toString();
      if (attrib) attrib.textContent = pickQuote(context, photoKey(photo));

      // Прелоад соседей для быстрого перелистывания
      if (uPrev) new Image().src = uPrev;
      if (uNext) new Image().src = uNext;
    }

    function next() {
      go(1);
    }

    function prev() {
      go(-1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Свайп: листание «вагонами». Тап/клик открывает lightbox.
    if (viewport) {
    // Десктоп: открываем по одиночному клику (обычный клик надёжнее pointer в некоторых окружениях)
      viewport.addEventListener('click', function (e) {
        // Игнорируем клики по кнопкам внутри слайдера
        var t = e.target;
        if (t && t.closest && t.closest('button')) return;
        // Только для устройств с наведением (десктоп); на мобильных открытие в pointerup
        var isDesktop = false;
        try {
          isDesktop = window.matchMedia && window.matchMedia('(hover: hover)').matches;
        } catch (err) {}
        if (!isDesktop) return;
        ensureLightbox().open(state.photos, state.index);
        try {
          e.preventDefault();
          e.stopPropagation();
        } catch (err2) {}
      });

      viewport.addEventListener('pointerdown', function (e) {
        ensureSliderTrack();
        swipe.down = true;
        swipe.dragging = false;
        swipe.x0 = e.clientX;
        swipe.y0 = e.clientY;
        swipe.dx = 0;
        swipe.width = viewport.clientWidth || 0;
        setSliderTrackOffset(0, false);
        try {
          viewport.setPointerCapture(e.pointerId);
        } catch (err) {}
      });

      viewport.addEventListener('pointermove', function (e) {
        if (!swipe.down || !track) return;
        var dx = e.clientX - swipe.x0;
        var dy = e.clientY - swipe.y0;

        // Горизонтальный свайп — двигаем трек, показывая соседнее фото
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 4) {
          swipe.dragging = true;
          swipe.dx = dx;
          var maxSwipe = swipe.width || viewport.clientWidth || 500;
          var clamped = Math.max(-maxSwipe, Math.min(maxSwipe, dx));
          setSliderTrackOffset(clamped, false);
          try {
            e.preventDefault();
          } catch (err) {}
        }
      });

      viewport.addEventListener('pointerup', function (e) {
        if (!swipe.down) return;
        swipe.down = false;
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch (err) {}
        var dx = e.clientX - swipe.x0;
        var dy = e.clientY - swipe.y0;

        // Если тянули по горизонтали — либо перелистываем, либо возвращаемся
        if (swipe.dragging && Math.abs(dx) > Math.abs(dy)) {
          var w = swipe.width || viewport.clientWidth || 400;
          var thresh = Math.max(40, w * 0.18);
          if (Math.abs(dx) >= thresh) {
            var to = dx < 0 ? -w : w;
            setSliderTrackOffset(to, true);
            var dir = dx < 0 ? 1 : -1;
            var done = false;
            var onEnd = function () {
              if (done) return;
              done = true;
              if (track) track.removeEventListener('transitionend', onEnd);
              swipe.dragging = false;
              swipe.dx = 0;
              go(dir);
            };
            if (track) track.addEventListener('transitionend', onEnd);
            setTimeout(onEnd, 280);
            return;
          } else {
            setSliderTrackOffset(0, true);
            swipe.dragging = false;
            swipe.dx = 0;
            return;
          }
        }

        // Если не было свайпа (маленькое движение) — открываем lightbox
        var isTouch = e.pointerType === 'touch';
        if (!isTouch || (Math.abs(dx) < 10 && Math.abs(dy) < 10)) {
          ensureLightbox().open(state.photos, state.index);
          try {
            e.preventDefault();
            e.stopPropagation();
          } catch (err) {}
          return;
        }
      });

      viewport.addEventListener('pointercancel', function () {
        swipe.down = false;
      });

      // Двойной клик оставляем как запасной вариант для десктопа.
      viewport.addEventListener('dblclick', function (e) {
        ensureLightbox().open(state.photos, state.index);
        e.preventDefault();
      });
    }

    async function load() {
      if (state.loaded) return;
      state.loaded = true;
      // Предпочитаем локальный кэш, чтобы всё работало без впн (например, в РФ)
      if (localDir) {
        try {
          var manifestUrl = joinPath(localDir, localManifest);
          var res = await fetch(manifestUrl, { credentials: 'same-origin' });
          if (res.ok) {
            var mj = await res.json();
            var items = (mj && mj.items) || [];
            state.photos = items.slice(0, perPage).map(function (it) {
              return {
                localUrl: joinPath(localDir, it.file),
                alt_description: it.alt || ''
              };
            });
            shuffleInPlace(state.photos);
          } else {
            dbg('local manifest not ok', res.status);
          }
        } catch (e) {
          dbg('local manifest load error', e);
        }
      }

      // Фолбэк: если локального кэша нет/он пустой — пробуем Unsplash API
      if (!state.photos.length) {
        state.photos = await unsplashSearchMulti({ queries: queries, perPage: perPage, orientation: orientation });
      }
      // Немного рандомизируем стартовую позицию
      if (state.photos.length) state.index = Math.floor(Math.random() * state.photos.length);
      render();
    }

    // Ленивая загрузка: загружаем только когда слайдер в зоне видимости
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (ent) {
            if (ent.isIntersecting) {
              load();
              io.disconnect();
            }
          });
        },
        { rootMargin: '250px 0px' }
      );
      io.observe(root);
    } else {
      // Фолбэк
      setTimeout(load, 500);
    }

  }

  function initSliders() {
    var nodes = document.querySelectorAll('.unsplash-slider');
    for (var i = 0; i < nodes.length; i++) initOneSlider(nodes[i]);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSliders();
  });
})();


