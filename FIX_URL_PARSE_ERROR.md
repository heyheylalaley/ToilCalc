# Исправление ошибки: URL parse error

## Проблема

В логах Supabase видна ошибка:
```
ERROR: /callback | Unhandled server error: parse "https://heyheylalaley.github.io": first path segment in URL cannot contain colon
```

Это означает, что Supabase не может правильно распарсить URL для редиректа.

## Причина

Проблема может быть в:
1. **Лишние пробелы в Site URL** в настройках Supabase
2. **Неправильный формат URL** в настройках
3. **Проблема с передачей redirectTo** в коде

## Решение

### Шаг 1: Проверьте Site URL в Supabase (ОБЯЗАТЕЛЬНО!)

1. Откройте Supabase Dashboard: https://supabase.com/dashboard
2. Выберите проект
3. Перейдите в **Authentication** → **URL Configuration**
4. Найдите поле **Site URL**

**Проверьте:**
- ✅ Должно быть: `https://heyheylalaley.github.io`
- ❌ НЕ должно быть:
  - `  https://heyheylalaley.github.io` (с пробелами в начале)
  - `https://heyheylalaley.github.io  ` (с пробелами в конце)
  - `heyheylalaley.github.io` (без https://)
  - `https://heyheylalaley.github.io/` (со слешем в конце)

**Если есть пробелы:**
1. Удалите все пробелы до и после URL
2. Убедитесь, что URL начинается с `https://`
3. Убедитесь, что URL не заканчивается слешем
4. Нажмите **Save changes**

### Шаг 2: Проверьте Redirect URLs

В том же разделе **Redirect URLs**:

1. Проверьте, что там указан правильный URL:
   ```
   https://heyheylalaley.github.io
   ```

2. Если там есть URL с пробелами или неправильным форматом:
   - Удалите его
   - Добавьте новый через кнопку **Add URL**
   - Введите: `https://heyheylalaley.github.io` (без пробелов!)

### Шаг 3: Очистите и пересохраните настройки

1. В **URL Configuration**:
   - Удалите все URL из **Redirect URLs** (если они есть)
   - Очистите поле **Site URL**
   - Сохраните (если есть кнопка Save)
2. Затем:
   - Введите заново в **Site URL**: `https://heyheylalaley.github.io`
   - Добавьте в **Redirect URLs**: `https://heyheylalaley.github.io`
   - Сохраните изменения

### Шаг 4: Проверьте код (опционально)

Откройте файл `app.js` и проверьте строку ~164:

```javascript
redirectTo: window.location.origin,
```

Это должно быть правильно. Но если вы используете GitHub Pages, `window.location.origin` должен возвращать `https://heyheylalaley.github.io`.

### Шаг 5: Проверьте после исправления

1. Очистите кэш браузера (Ctrl+Shift+Delete)
2. Откройте: https://heyheylalaley.github.io
3. Попробуйте войти через Google снова
4. Проверьте логи в Supabase - ошибка должна исчезнуть

## Важно

- **URL должен быть точным** - без пробелов, с `https://`, без слеша в конце
- **Пробелы в начале или конце URL** вызывают ошибку парсинга
- **Проверьте оба места**: Site URL и Redirect URLs

## Альтернативное решение

Если проблема все еще есть, попробуйте использовать другой формат в коде:

В `app.js` замените:
```javascript
redirectTo: window.location.origin,
```

На:
```javascript
redirectTo: 'https://heyheylalaley.github.io',
```

Это жестко задаст URL, но гарантирует правильный формат.

## Проверка в логах

После исправления проверьте логи в Supabase:
- **Logs** → **API Logs** → выберите **Auth**
- Ошибка `parse "https://heyheylalaley.github.io"` должна исчезнуть
- Вместо ошибок 500 должны быть успешные запросы (200 или 302)

