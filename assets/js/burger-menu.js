/* Burger Menu для SEO-страниц */

(function() {
    'use strict';
    
    // Создаем структуру burger menu
    function createBurgerMenu() {
        // Проверяем, не создано ли уже меню
        if (document.querySelector('.burger-menu')) {
            return;
        }
        
        const menuHTML = `
            <div class="burger-menu">
                <button class="burger-menu-button" id="burger-menu-toggle" aria-label="Открыть меню">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="burger-menu-overlay" id="burger-menu-overlay"></div>
            <div class="burger-menu-panel" id="burger-menu-panel">
                <button class="burger-menu-close" id="burger-menu-close" aria-label="Закрыть меню"></button>
                <ul class="burger-menu-list">
                    <li class="burger-menu-item">
                        <a href="/" class="burger-menu-link">Главная</a>
                    </li>
                    <li class="burger-menu-item has-submenu">
                        <a href="#" class="burger-menu-link">База знаний</a>
                        <ul class="burger-menu-submenu">
                            <li><a href="/chto-takoe-tabata.html" class="burger-menu-link">Что такое Табата</a></li>
                            <li><a href="/kak-ispolzovat-tajmer.html" class="burger-menu-link">Как использовать таймер</a></li>
                            <li><a href="/hiit-trenirovki.html" class="burger-menu-link">HIIT тренировки</a></li>
                            <li><a href="/emom-trenirovki.html" class="burger-menu-link">EMOM тренировки</a></li>
                            <li><a href="/amrap-trenirovki.html" class="burger-menu-link">AMRAP тренировки</a></li>
                        </ul>
                    </li>
                    <li class="burger-menu-item has-submenu">
                        <a href="#" class="burger-menu-link">Готовые тренировки</a>
                        <ul class="burger-menu-submenu">
                            <li><a href="/trenirovki-dlya-nachinayushchih.html" class="burger-menu-link">Для начинающих</a></li>
                            <li><a href="/trenirovki-dlya-prodvinutyh.html" class="burger-menu-link">Для продвинутых</a></li>
                            <li><a href="/trenirovki-dlya-zhenshchin.html" class="burger-menu-link">Для женщин</a></li>
                            <li><a href="/trenirovki-dlya-muzhchin.html" class="burger-menu-link">Для мужчин</a></li>
                        </ul>
                    </li>
                    <li class="burger-menu-item has-submenu">
                        <a href="#" class="burger-menu-link">Настройки таймера</a>
                        <ul class="burger-menu-submenu">
                            <li><a href="/nastrojki-tabata-tajmera.html#tabata-20-10" class="burger-menu-link">Табата 20/10</a></li>
                            <li><a href="/nastrojki-tabata-tajmera.html#tabata-30-30" class="burger-menu-link">Табата 30/30</a></li>
                            <li><a href="/nastrojki-tabata-tajmera.html#tabata-40-20" class="burger-menu-link">Табата 40/20</a></li>
                            <li><a href="/nastrojki-tabata-tajmera.html#tabata-45-15" class="burger-menu-link">Табата 45/15</a></li>
                            <li><a href="/nastrojki-tabata-tajmera.html#custom" class="burger-menu-link">Кастомные настройки</a></li>
                            <li><a href="/nastrojki-tabata-tajmera.html#music" class="burger-menu-link">Музыка для тренировок</a></li>
                        </ul>
                    </li>
                    <li class="burger-menu-item">
                        <a href="/blog.html" class="burger-menu-link">Блог</a>
                    </li>
                    <li class="burger-menu-item">
                        <a href="/faq.html" class="burger-menu-link">FAQ</a>
                    </li>
                    <li class="burger-menu-item">
                        <a href="https://t.me/fitnesstimer" target="_blank" class="burger-menu-link">Telegram канал</a>
                    </li>
                </ul>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
    }
    
    // Инициализация burger menu
    function initBurgerMenu() {
        const toggle = document.getElementById('burger-menu-toggle');
        const overlay = document.getElementById('burger-menu-overlay');
        const panel = document.getElementById('burger-menu-panel');
        const closeBtn = document.getElementById('burger-menu-close');
        const submenuToggles = document.querySelectorAll('.burger-menu-item.has-submenu > .burger-menu-link');
        
        if (!toggle || !overlay || !panel) return;
        
        // Переключение меню
        function toggleMenu() {
            const isActive = toggle.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            toggle.classList.add('active');
            overlay.classList.add('active');
            panel.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            panel.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Обработчики событий
        toggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }
        
        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && toggle.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Обработка подменю
        submenuToggles.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                const isOpen = parent.classList.contains('open');
                
                // Закрываем все остальные подменю
                document.querySelectorAll('.burger-menu-item.has-submenu').forEach(function(item) {
                    if (item !== parent) {
                        item.classList.remove('open');
                    }
                });
                
                // Переключаем текущее подменю
                if (isOpen) {
                    parent.classList.remove('open');
                } else {
                    parent.classList.add('open');
                }
            });
        });
        
        // Закрытие меню при клике на ссылку (кроме подменю)
        const menuLinks = document.querySelectorAll('.burger-menu-link');
        menuLinks.forEach(function(link) {
            if (!link.parentElement.classList.contains('has-submenu')) {
                link.addEventListener('click', function() {
                    // Небольшая задержка для плавности
                    setTimeout(closeMenu, 150);
                });
            }
        });
    }
    
    // Функция для проверки, нужно ли показывать меню
    function shouldShowMenu() {
        const hash = window.location.hash;
        const pathname = window.location.pathname;
        const hideOnHashes = ['#tabata', '#girls', '#timer', '#men'];
        
        // Нормализуем pathname
        const normalizedPath = pathname === '' || pathname === '/' || pathname === '/index.html' || pathname.endsWith('/') ? '/' : pathname;
        
        // Если мы не на главной странице (например, на /nastrojki-tabata-tajmera.html) - показываем меню
        if (normalizedPath !== '/') {
            return true;
        }
        
        // На главной странице: если hash пустой или не в списке скрытия - показываем меню
        if (!hash || hash === '' || !hideOnHashes.includes(hash)) {
            return true;
        }
        
        // Если hash в списке скрытия - не показываем
        return false;
    }
    
    // Инициализация при загрузке DOM
    // Всегда создаём меню, а видимость управляется через updateMenuVisibility()
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createBurgerMenu();
            initBurgerMenu();
            // Устанавливаем правильную видимость после создания
            setTimeout(updateMenuVisibility, 50);
        });
    } else {
        createBurgerMenu();
        initBurgerMenu();
        // Устанавливаем правильную видимость после создания
        setTimeout(updateMenuVisibility, 50);
    }
    
    // Функция для обновления видимости меню
    function updateMenuVisibility() {
        const menu = document.querySelector('.burger-menu');
        const shouldShow = shouldShowMenu();
        
        if (!menu) {
            // Если меню не существует и нужно показать - создаём его
            if (shouldShow) {
                createBurgerMenu();
                initBurgerMenu();
            }
            return;
        }
        
        if (shouldShow) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    }
    
    // Скрываем/показываем меню при изменении hash
    window.addEventListener('hashchange', function() {
        setTimeout(updateMenuVisibility, 10);
    });
    
    // Также слушаем события popstate (кнопки назад/вперёд)
    window.addEventListener('popstate', function() {
        setTimeout(updateMenuVisibility, 10);
    });
    
    // Отслеживаем клики по ссылкам на главной странице
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            const url = new URL(link.href);
            // Если ссылка ведет на главную страницу или меняет hash
            if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '') {
                setTimeout(updateMenuVisibility, 100);
            }
        }
    }, true);
    
    // Также обновляем при изменении pathname (навигация между страницами)
    let lastPathname = window.location.pathname;
    let lastHash = window.location.hash;
    
    // Проверяем изменения каждые 50ms для более быстрой реакции
    setInterval(function() {
        const currentPathname = window.location.pathname;
        const currentHash = window.location.hash;
        
        if (currentPathname !== lastPathname || currentHash !== lastHash) {
            lastPathname = currentPathname;
            lastHash = currentHash;
            updateMenuVisibility();
        }
    }, 50);
    
    // Обновляем видимость при загрузке страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(updateMenuVisibility, 100);
        });
    } else {
        setTimeout(updateMenuVisibility, 100);
    }
})();

