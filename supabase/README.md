# Настройка Supabase для DevPortfolio

## Шаги настройки:

### 1. Создание проекта Supabase
1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Запомните:
   - Project URL: `https://your-project-id.supabase.co`
   - Anon Key: `your-anon-key`
   - Service Role Key: `your-service-role-key`

### 2. Настройка базы данных
1. В панели Supabase перейдите в SQL Editor
2. Скопируйте содержимое `migrations/create_tables.sql`
3. Выполните SQL запрос

### 3. Заполнение тестовыми данными (опционально)
1. В SQL Editor выполните `seed.sql`
2. Проверьте созданные данные в таблицах

### 4. Настройка аутентификации
1. Authentication → Settings → Enable Email provider
2. Site URL: `http://localhost:3000` (для разработки)
3. Disable email confirmations для разработки

### 5. Получение TypeScript типов
```bash
npx supabase gen types typescript --project-id your-project-id > ../frontend/src/lib/database.types.ts

Supabase_AnKo
