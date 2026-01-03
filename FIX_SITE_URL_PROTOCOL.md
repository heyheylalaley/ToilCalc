# Исправление: Site URL без протокола https://

## Проблема

URL выглядит неправильно:
```
https://qwtwezxoodqfmdqpzkkl.supabase.co/heyheylalaley.github.io#access_token=...
```

Это происходит потому, что в Supabase Dashboard в поле **Site URL** указано:
```
heyheylalaley.github.io
```

Без протокола `https://`!

## Решение

### Шаг 1: Откройте URL Configuration

Вы уже на правильной странице! Это:
- **Authentication** → **URL Configuration**

Или прямая ссылка:
```
https://supabase.com/dashboard/project/qwtwezxoodqfmdqpzkkl/auth/url-configuration
```

### Шаг 2: Исправьте Site URL

В разделе **Site URL** найдите поле с текстом:
```
heyheylalaley.github.io
```

**Измените его на:**
```
https://heyheylalaley.github.io
```

**Важно:** 
- ✅ Добавьте `https://` в начало
- ✅ Без слеша в конце
- ✅ Без пути (только домен)

### Шаг 3: Проверьте Redirect URLs

В разделе **Redirect URLs** убедитесь, что там тоже указан полный URL:

Если там есть:
```
heyheylalaley.github.io
```

**Измените на:**
```
https://heyheylalaley.github.io
```

Или добавьте новый URL через кнопку **Add URL**, если его там нет.

### Шаг 4: Сохраните изменения

1. Нажмите кнопку **Save changes** (зеленая кнопка внизу секции Site URL)
2. Подождите несколько секунд
3. Вы должны увидеть уведомление об успешном сохранении

### Шаг 5: Проверьте

1. Откройте ваше приложение: https://heyheylalaley.github.io
2. Попробуйте войти через Google снова
3. После авторизации должно перенаправить на правильный URL:
   ```
   https://heyheylalaley.github.io#access_token=...
   ```

## Правильный формат

**Site URL должен быть:**
```
https://heyheylalaley.github.io
```

**НЕ:**
- ❌ `heyheylalaley.github.io` (без протокола)
- ❌ `https://heyheylalaley.github.io/` (со слешем)
- ❌ `http://heyheylalaley.github.io` (http вместо https)

## Почему это важно?

Без протокола `https://` Supabase не знает, что это полный URL, и пытается использовать его как относительный путь на своем домене, что приводит к неправильному редиректу.

## После исправления

После сохранения правильного Site URL с `https://`, OAuth будет работать корректно и перенаправлять на:
```
https://heyheylalaley.github.io#access_token=...
```

Вместо неправильного:
```
https://qwtwezxoodqfmdqpzkkl.supabase.co/heyheylalaley.github.io#access_token=...
```

