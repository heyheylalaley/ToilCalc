# Исправление ошибки: trigger already exists

## Проблема

При выполнении SQL схемы появляется ошибка:
```
ERROR: 42710: trigger "on_auth_user_created" for relation "users" already exists
```

## Причина

Это означает, что часть SQL схемы уже была выполнена ранее. Триггер уже существует в базе данных.

## Решение

### Вариант 1: Использовать обновленную SQL схему (рекомендуется)

Я обновил файл `supabase-schema.sql` - теперь он безопасен для повторного выполнения. Просто выполните его снова:

1. Откройте Supabase Dashboard → **SQL Editor**
2. Скопируйте **весь** код из обновленного файла `supabase-schema.sql`
3. Вставьте в SQL Editor
4. Нажмите **Run**

Теперь схема использует `DROP TRIGGER IF EXISTS`, что позволяет безопасно пересоздать триггер.

### Вариант 2: Выполнить только недостающие части

Если не хотите выполнять всю схему заново, выполните только эту команду:

```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Вариант 3: Удалить триггер вручную

1. В Supabase Dashboard → **Database** → **Triggers**
2. Найдите триггер `on_auth_user_created`
3. Удалите его
4. Затем выполните SQL схему снова

## Проверка

После выполнения проверьте:

1. **Таблицы созданы:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('users', 'logs', 'settings');
   ```

2. **Триггер создан:**
   ```sql
   SELECT trigger_name 
   FROM information_schema.triggers 
   WHERE trigger_name = 'on_auth_user_created';
   ```

3. **Пользователь существует:**
   ```sql
   SELECT * FROM users;
   ```

## Важно

- Обновленная SQL схема теперь безопасна для повторного выполнения
- Используется `DROP ... IF EXISTS` для безопасного удаления перед созданием
- Функция триггера использует `ON CONFLICT DO NOTHING` для предотвращения дубликатов

## После исправления

После успешного выполнения SQL схемы:
1. Добавьте пользователя вручную (если его еще нет)
2. Попробуйте войти через Google снова
3. Ошибка 500 должна исчезнуть

