CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  position TEXT,
  bio TEXT,
  avatar_url TEXT,
  github_url TEXT,
  gitlab_url TEXT,
  phone TEXT,
  birth_date DATE,
  experience TEXT,
  education TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  role TEXT NOT NULL,
  demo_url TEXT,
  code_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE POLICY "Публичные профили доступны всем" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Пользователи могут обновлять свой профиль" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Публичные проекты доступны всем" 
  ON public.projects FOR SELECT 
  USING (true);

CREATE POLICY "Пользователи могут создавать проекты" 
  ON public.projects FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователи могут обновлять свои проекты" 
  ON public.projects FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Пользователи могут удалять свои проекты" 
  ON public.projects FOR DELETE 
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
