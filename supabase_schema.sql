-- ============================================================================
-- SCRIPT DE BANCO DE DADOS SUPABASE — TREINAMENTO PAN LATAM (NHCE)
-- ============================================================================
-- Este script configura o schema corporativo com Row Level Security (RLS),
-- tabelas de perfis, auditoria de acessos e permissões administrativas.
-- Execute este script no SQL Editor do seu projeto Supabase:
-- https://tghzcprzjysrbdxhvdlu.supabase.co
-- ============================================================================

-- 1. TABELA DE PERFIS DE USUÁRIOS (public.profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    dealership TEXT NOT NULL,
    cargo TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'blocked', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    last_login TIMESTAMPTZ,
    access_count INT NOT NULL DEFAULT 0
);

-- Índices para otimização de consultas
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 2. TABELA DE LOGS DE AUDITORIA E ACESSOS (public.access_logs)
CREATE TABLE IF NOT EXISTS public.access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT,
    full_name TEXT,
    event TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para auditoria
CREATE INDEX IF NOT EXISTS idx_access_logs_user_id ON public.access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_created_at ON public.access_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_access_logs_event ON public.access_logs(event);

-- 3. FUNÇÃO DE SEGURANÇA (SECURITY DEFINER) PARA VERIFICAÇÃO DE ADMIN
-- Evita recursão infinita nas políticas RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid()
          AND role = 'admin'
          AND status = 'approved'
    );
$$;

-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

-- 5. POLÍTICAS DE RLS PARA public.profiles

-- Política de Leitura: Usuário pode ler seu próprio perfil OU Admin pode ler todos
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
CREATE POLICY "profiles_select_policy"
ON public.profiles
FOR SELECT
TO authenticated
USING (
    auth.uid() = id OR public.is_admin()
);

-- Política de Inserção: Usuário pode criar seu próprio registro inicial OU Admin pode criar
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
CREATE POLICY "profiles_insert_policy"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = id OR public.is_admin()
);

-- Política de Atualização: Usuário pode atualizar campos básicos próprios (sem mudar role ou status)
-- OU Administradores podem atualizar tudo (aprovar, bloquear, alterar role)
DROP POLICY IF EXISTS "profiles_update_user_policy" ON public.profiles;
CREATE POLICY "profiles_update_user_policy"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
    auth.uid() = id OR public.is_admin()
)
WITH CHECK (
    public.is_admin() OR (
        auth.uid() = id
        -- Garante que usuário comum não se promova a ADMIN nem mude status
        AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
        AND status = (SELECT p.status FROM public.profiles p WHERE p.id = auth.uid())
    )
);

-- Política de Exclusão: Apenas Administradores podem excluir perfis
DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;
CREATE POLICY "profiles_delete_policy"
ON public.profiles
FOR DELETE
TO authenticated
USING (
    public.is_admin()
);

-- 6. POLÍTICAS DE RLS PARA public.access_logs

-- Inserção de Logs: Usuários autenticados podem inserir seus logs
DROP POLICY IF EXISTS "access_logs_insert_policy" ON public.access_logs;
CREATE POLICY "access_logs_insert_policy"
ON public.access_logs
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Leitura de Logs: Apenas Administradores podem visualizar os logs de auditoria
DROP POLICY IF EXISTS "access_logs_select_policy" ON public.access_logs;
CREATE POLICY "access_logs_select_policy"
ON public.access_logs
FOR SELECT
TO authenticated
USING (
    public.is_admin()
);

-- 7. TRIGGER AUTOMÁTICO PARA CRIAR PERFIL AO REGISTRAR NO SUPABASE AUTH
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        dealership,
        cargo,
        role,
        status,
        created_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Colaborador'),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'dealership', 'CNH Industrial / Rede'),
        COALESCE(NEW.raw_user_meta_data->>'cargo', NEW.raw_user_meta_data->>'role_title', 'Colaborador'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
        COALESCE(NEW.raw_user_meta_data->>'status', 'pending'),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        dealership = EXCLUDED.dealership,
        cargo = EXCLUDED.cargo;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. COMANDO AUXILIAR: DEFINIR/PROMOVER CONTA ADMINISTRADORA EXISTENTE
-- Se você já criou a conta de admin (ex: admin@newholland.com ou seu e-mail),
-- execute o comando abaixo substituindo pelo e-mail desejado:
/*
UPDATE public.profiles
SET role = 'admin', status = 'approved', approved_at = NOW()
WHERE email = 'admin@newholland.com';
*/
