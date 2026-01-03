# Исправление ошибки 500: unexpected_failure

## Проблема

После успешной авторизации через Google OAuth появляется ошибка:
```json
{
  "code": 500,
  "error_code": "unexpected_failure",
  "msg": "Unexpected failure, please check server logs for more information"
}
```

## Причина

Эта ошибка обычно возникает, когда:
1. **Таблицы в базе данных не созданы** - SQL схема не была выполнена
2. **Пользователь не существует в таблице users** - триггер не сработал или таблица пустая
3. **Проблемы с RLS политиками** - политики безопасности блокируют доступ

## Решение

### Шаг 1: Проверьте, созданы ли таблицы

1. Откройте Supabase Dashboard: https://supabase.com/dashboard
2. Выберите ваш проект
3. Перейдите в **Table Editor** (в левом меню)
4. Проверьте, есть ли таблицы:
   - ✅ `users`
   - ✅ `logs`
   - ✅ `settings`

**Если таблиц нет** - перейдите к Шагу 2.

**Если таблицы есть** - перейдите к Шагу 3.

### Шаг 2: Создайте таблицы (если их нет)

1. В Supabase Dashboard перейдите в **SQL Editor** (в левом меню)
2. Откройте файл `supabase-schema.sql` из проекта
3. Скопируйте **весь** SQL код из файла
4. Вставьте в SQL Editor в Supabase
5. Нажмите **Run** (или F5)
6. Дождитесь выполнения (должно появиться сообщение об успехе)

**Важно:** Выполните весь SQL код, включая:
- Создание таблиц
- Создание индексов
- Настройку RLS политик
- Создание триггера для автоматического создания пользователей

### Шаг 3: Добавьте пользователя вручную

Даже если триггер настроен, лучше добавить первого пользователя вручную:

1. В Supabase Dashboard перейдите в **Table Editor**
2. Выберите таблицу **users**
3. Нажмите **Insert** → **Insert row**
4. Заполните поля:
   - **name**: `Ihor Vasyliev` (или ваше имя)
   - **email**: `b1ackproff@gmail.com` (ваш email из Google)
   - **role**: `admin` (или `user`)
5. Нажмите **Save**

**Важно:** Email должен **точно совпадать** с email вашего Google аккаунта!

### Шаг 4: Проверьте триггер

1. В Supabase Dashboard перейдите в **Database** → **Functions**
2. Проверьте, что функция `handle_new_user` существует
3. Если её нет, выполните SQL из `supabase-schema.sql` снова (часть с триггером)

### Шаг 5: Проверьте RLS политики

1. В Supabase Dashboard перейдите в **Authentication** → **Policies**
2. Или в **Table Editor** выберите таблицу → **Policies**
3. Убедитесь, что политики созданы:
   - Для `users`: "Anyone can read users"
   - Для `logs`: "Users can read own logs", "Users can insert own logs"
   - Для `settings`: "Anyone can read settings"

Если политик нет, выполните SQL из `supabase-schema.sql` снова.

### Шаг 6: Проверьте логи

1. В Supabase Dashboard перейдите в **Logs** → **Postgres Logs**
2. Или **Logs** → **API Logs**
3. Найдите последние ошибки
4. Это поможет понять точную причину проблемы

## Быстрая проверка

Выполните этот SQL запрос в SQL Editor, чтобы проверить состояние:

```sql
-- Проверка таблиц
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'logs', 'settings');

-- Проверка пользователей
SELECT * FROM users;

-- Проверка триггера
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

## После исправления

1. Очистите кэш браузера (Ctrl+Shift+Delete)
2. Откройте приложение: https://heyheylalaley.github.io
3. Попробуйте войти через Google снова
4. Теперь должно работать!

## Частые проблемы

### Проблема: "relation users does not exist"
**Решение:** Таблицы не созданы. Выполните SQL из `supabase-schema.sql`.

### Проблема: "User not found in database"
**Решение:** Добавьте пользователя вручную в таблицу `users` с правильным email.

### Проблема: "permission denied"
**Решение:** RLS политики не настроены. Выполните SQL из `supabase-schema.sql`.

### Проблема: Триггер не создает пользователя
**Решение:** 
1. Проверьте, что триггер существует
2. Проверьте логи на ошибки
3. Добавьте пользователя вручную

## Важно

- Email в таблице `users` должен **точно совпадать** с email Google аккаунта
- Все SQL команды из `supabase-schema.sql` должны быть выполнены
- RLS политики должны быть активны для всех таблиц

