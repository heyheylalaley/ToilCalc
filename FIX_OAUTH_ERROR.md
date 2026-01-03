# Исправление ошибки OAuth: redirect_uri_mismatch

## Проблема
Ошибка `400: redirect_uri_mismatch` означает, что redirect URI в запросе не совпадает с настройками в Google Cloud Console.

## Решение

### Шаг 1: Откройте Google Cloud Console

1. Перейдите на https://console.cloud.google.com/
2. Выберите ваш проект
3. Перейдите в **APIs & Services → Credentials**
4. Найдите OAuth 2.0 Client ID: `821999196894-20d8semsbtdp3dcpu4qf2p1h0u4okb39`
5. Нажмите на него для редактирования

### Шаг 2: Добавьте Authorized redirect URIs

В разделе **Authorized redirect URIs** добавьте следующие URL:

#### Обязательно добавьте:
```
https://qwtwezxoodqfmdqpzkkl.supabase.co/auth/v1/callback
```

Это callback URL Supabase, который обрабатывает OAuth ответ от Google.

#### Также добавьте ваш домен приложения:

Если вы используете GitHub Pages, добавьте:
```
https://heyheylalaley.github.io
```

Или если используете другой домен, добавьте его:
```
https://YOUR_DOMAIN.com
```

**Важно**: URL должен быть точным, включая протокол (https://) и без слеша в конце!

### Шаг 3: Сохраните изменения

1. Нажмите **Save** внизу страницы
2. Подождите несколько секунд, пока изменения применятся

### Шаг 4: Проверьте настройки в Supabase

1. Откройте Supabase Dashboard: https://supabase.com/dashboard
2. Выберите ваш проект
3. Перейдите в **Authentication → Providers → Google**
4. Убедитесь, что:
   - ✅ Google включен
   - ✅ **Client ID (for OAuth)**: `821999196894-20d8semsbtdp3dcpu4qf2p1h0u4okb39.apps.googleusercontent.com`
   - ✅ **Client Secret**: заполнен (получите из Google Cloud Console)

### Шаг 5: Проверьте Redirect URL в Supabase

В настройках Google Provider в Supabase должно быть указано:

**Redirect URL** (автоматически):
```
https://qwtwezxoodqfmdqpzkkl.supabase.co/auth/v1/callback
```

Этот URL должен совпадать с тем, что вы добавили в Google Cloud Console.

### Шаг 6: Проверьте Site URL в Supabase

1. В Supabase Dashboard перейдите в **Settings → API**
2. Проверьте **Site URL** - должен быть ваш домен приложения:
   ```
   https://heyheylalaley.github.io
   ```
   или
   ```
   http://localhost:8000
   ```
   (для локальной разработки)

3. Если нужно, измените и сохраните

## Проверка

После выполнения всех шагов:

1. Очистите кэш браузера (Ctrl+Shift+Delete)
2. Откройте приложение заново
3. Попробуйте войти через Google

## Дополнительная информация

### Если используете локальную разработку:

Добавьте в Google Cloud Console:
```
http://localhost:8000
http://127.0.0.1:8000
```

И в Supabase Site URL укажите:
```
http://localhost:8000
```

### Если ошибка все еще возникает:

1. Проверьте, что в Google Cloud Console добавлен **точный** URL:
   - С протоколом `https://`
   - Без слеша в конце
   - Без параметров

2. Убедитесь, что изменения сохранены в Google Cloud Console

3. Подождите 1-2 минуты после сохранения (изменения могут применяться с задержкой)

4. Проверьте консоль браузера (F12) на наличие других ошибок

5. Проверьте логи в Supabase Dashboard → Logs

## Структура OAuth flow

```
1. Пользователь нажимает "Sign in with Google"
2. Приложение перенаправляет на Supabase OAuth
3. Supabase перенаправляет на Google
4. Google проверяет redirect_uri (должен быть Supabase callback)
5. Google перенаправляет обратно на Supabase callback
6. Supabase обрабатывает токен и перенаправляет на ваше приложение
```

Поэтому важно, чтобы в Google Cloud Console был добавлен именно Supabase callback URL!

