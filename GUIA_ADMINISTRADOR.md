# 🚜 Manual do Administrador & Guia de Implantação Supabase
## Plataforma Corporativa de Treinamento PAN — New Holland Construction (LATAM)

Este documento contém todas as instruções para operação, governança de usuários, aprovação de acessos, auditoria em tempo real e segurança via **Supabase**.

---

## 1. 🔑 Credenciais e Conexão com o Supabase

A plataforma está conectada diretamente ao projeto Supabase corporativo utilizando autenticação e banco de dados relacional com **Row Level Security (RLS)**:

- **Supabase Project URL**: `https://tghzcprzjysrbdxhvdlu.supabase.co`
- **Publishable Key**: `sb_publishable_Ef2Rn59cywyibuxSupS5XQ_TMXNu3T1`
- **Dashboard do Supabase**: [https://supabase.com/dashboard/project/tghzcprzjysrbdxhvdlu](https://supabase.com/dashboard/project/tghzcprzjysrbdxhvdlu)

> 🛡️ **Segurança**: Somente a `Publishable Key` é utilizada no frontend. As permissões de acesso, aprovação e visualização de dados são validadas pelas políticas RLS no próprio banco PostgreSQL do Supabase.

---

## 2. 🗄️ Execução do Script SQL no Supabase (Passo Obrigatório Inicial)

Caso ainda não tenha executado a estrutura de tabelas e políticas de segurança no seu projeto Supabase, siga estes passos:

1. Acesse o **SQL Editor** do Supabase no link: [https://supabase.com/dashboard/project/tghzcprzjysrbdxhvdlu/sql/new](https://supabase.com/dashboard/project/tghzcprzjysrbdxhvdlu/sql/new).
2. Abra o arquivo [`supabase_schema.sql`](supabase_schema.sql) localizado na raiz deste projeto.
3. Copie todo o conteúdo e cole no editor SQL do Supabase.
4. Clique no botão verde **Run** para executar.
5. As tabelas `public.profiles`, `public.access_logs`, a função `public.is_admin()`, as políticas **RLS** e o trigger de criação automática de perfil estarão ativas.

### Como Promover um Usuário a Administrador no Supabase:
Para definir uma conta existente como Administradora Master, execute no SQL Editor:
```sql
UPDATE public.profiles
SET role = 'admin', status = 'approved', approved_at = NOW()
WHERE email = 'admin@newholland.com'; -- Substitua pelo seu e-mail corporativo cadastrado
```

---

## 3. 🔄 Fluxo de Autenticação e Controle de Acesso

```
[Visitante / Colaborador]
         │
         ▼
[Página de Login (index.html)]
         │
         ├─ Novo Cadastro ────────► Status inicial: "pending" (Aguardando Aprovação)
         │                                   │
         ├─ Login com Senha Incorreta ──────► Mensagem de Erro e Log Registrado
         │                                   │
         ├─ Conta com Status "pending" ─────► Bloqueia acesso e exibe alerta de Análise
         │                                   │
         ├─ Conta com Status "blocked" ─────► Nega acesso com alerta de Bloqueio
         │                                   │
         ▼                                   ▼
[Autenticado + "approved"] ◄──────── [ADMIN APROVA no Painel ou no Supabase]
         │
         ├─ Role: "user"  ────────► Acesso Liberado ao Treinamento PAN
         │
         └─ Role: "admin" ────────► Acesso Liberado ao Treinamento + Painel de Governança
```

---

## 4. 📊 Operação do Painel Administrativo

Ao fazer login com uma conta com perfil `ADMIN`, a opção de **Painel ADM** é liberada:

### A. Aprovação de Novos Cadastros
1. No menu superior da área administrativa, acesse **Gestão de Usuários**.
2. Filtre por status **Pendentes**.
3. Na linha do colaborador, selecione o Perfil desejado (`Leitor` ou `Admin`).
4. Clique no botão verde **Aprovar** para liberar o acesso imediatamente. O status no Supabase é atualizado para `approved`.

### B. Bloqueio e Reativação de Usuários
- Para suspender o acesso de um usuário: clique no botão vermelho **Bloquear**. O status passa para `blocked` e o usuário não conseguirá mais entrar.
- Para reativar uma conta bloqueada: clique no botão amarelo **Desbloquear**. O status volta para `approved`.

### C. Auditoria e Monitoramento de Acessos em Tempo Real
1. Acesse a aba **Métricas & Auditoria**.
2. Visualize o histórico detalhado com data, hora, e-mail do usuário e tipo de evento (Logins com sucesso, falhas, bloqueios, aprovações).
3. Clique em **Exportar CSV** para gerar um relatório em formato compatível com Excel.

### D. Backup e Restauração
- Na aba **Segurança & Backup**, clique em **Baixar Backup JSON** para salvar uma cópia completa dos registros de usuários e histórico de auditoria.

---

## 5. 🚀 Publicação no GitHub Pages (HTTPS)

Como a plataforma é compatível com ambientes estáticos HTTPS e utiliza o SDK oficial do Supabase:

1. Verifique as alterações locais:
   ```bash
   git status
   ```
2. Realize o commit e push para o repositório:
   ```bash
   git add .
   git commit -m "Integracao oficial Supabase: Auth, RLS, Perfis e Painel Administrativo"
   git push origin main
   ```
3. O GitHub Pages publicará a versão atualizada automaticamente em:
   🔗 **`https://dealer-network.github.io/PAN_Training_LATAM/`**

---

## 📩 Suporte e Governança
- **Departamento**: Desenvolvimento de Rede NHCE (Dealer Network LATAM)
- **E-mail de Suporte**: [dealerdevelopmentnhce@newholland.com](mailto:dealerdevelopmentnhce@newholland.com)
