# Настройка EmailJS для отправки форм

## Важно!
Формы на сайте используют EmailJS для отправки писем. После миграции на GitHub Pages нужно настроить EmailJS.

## Шаги настройки:

### 1. Регистрация на EmailJS
1. Перейдите на https://www.emailjs.com/
2. Зарегистрируйтесь (бесплатный план: 200 писем/месяц)
3. Войдите в аккаунт

### 2. Создание Email Service
1. В Dashboard перейдите в "Email Services"
2. Нажмите "Add New Service"
3. Выберите "Gmail" или "Outlook" (или другой email провайдер)
4. Подключите ваш email: `admin@tabatatimer.ru`
5. Сохраните **Service ID** (например: `service_xxxxx`)

### 3. Создание Email Template
1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Настройте шаблон:
   - **Template Name**: `tabatatimer-form`
   - **Subject**: `Заявка с сайта tabatatimer.ru`
   - **Content**:
   ```
   Товар: {{goods}}
   
   Имя: {{myrealname}}
   Email: {{email}}
   Телефон: {{phone}}
   ```
4. В "To Email" укажите: `info@allmulticam.ru`
5. В "CC Email" укажите: `allmulticam.ru@gmail.com`
6. Сохраните **Template ID** (например: `template_xxxxx`)

### 4. Получение Public Key
1. Перейдите в "Account" → "General"
2. Найдите "Public Key" (например: `xxxxxxxxxxxxx`)
3. Скопируйте его

### 5. Обновление кода в index.html
Найдите в файле `index.html` следующие строки и замените:

```javascript
// Строка ~860 (в <head>)
emailjs.init('YOUR_PUBLIC_KEY'); // Замените на ваш публичный ключ

// Строка ~3620 (в обработчике формы)
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

**Замените:**
- `YOUR_PUBLIC_KEY` → ваш Public Key из шага 4
- `YOUR_SERVICE_ID` → ваш Service ID из шага 2
- `YOUR_TEMPLATE_ID` → ваш Template ID из шага 3

### 6. Тестирование
1. Откройте сайт
2. Заполните форму заказа товара
3. Отправьте форму
4. Проверьте, что письмо пришло на `info@allmulticam.ru`

## Альтернативные решения

Если EmailJS не подходит, можно использовать:

1. **Formspree** (https://formspree.io/)
   - Бесплатно: 50 отправок/месяц
   - Проще в настройке
   - Не требует JavaScript библиотеки

2. **Netlify Forms** (если использовать Netlify вместо GitHub Pages)
   - Бесплатно: 100 отправок/месяц
   - Автоматическая защита от спама

3. **GitHub Actions + SendGrid/Mailgun**
   - Более сложная настройка
   - Требует серверной логики через GitHub Actions

## Текущая конфигурация

После настройки EmailJS формы будут отправлять письма на:
- **Основной получатель**: `info@allmulticam.ru`
- **Копия**: `allmulticam.ru@gmail.com`
- **Тема**: `Заявка с сайта tabatatimer.ru`

