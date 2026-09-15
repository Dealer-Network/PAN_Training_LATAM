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

### E. Reset Administrativo de Senha (Sem E-mail) 🔑
1. Na aba **Gestão de Usuários**, localize o usuário desejado.
2. Na coluna **Ações**, clique no ícone de chave 🔑.
3. No modal **Resetar Senha**, digite a nova senha de acesso (mínimo de 8 caracteres).
4. Clique em **Resetar Senha**.
5. O sistema atualizará a credencial com segurança no Supabase Auth via Edge Function.
6. Informe a nova senha diretamente ao colaborador através de um canal seguro corporativo (WhatsApp, telefone, Teams, etc.).
7. **Importante**: O reset de senha altera apenas a credencial e **não altera** o status do usuário (se estava aprovado, pendente, bloqueado ou reprovado, permanece o mesmo).

---

## 5. ⚡ Implantação da Supabase Edge Function (`admin-reset-password`)

A redefinição administrativa de senha é protegida por uma **Edge Function** no Supabase, garantindo que operações administrativas privilegiadas ocorram exclusivamente no servidor.

### Opção 1: Implantação via Supabase CLI
```bash
# 1. Login no Supabase
supabase login

# 2. Vincular ao projeto
supabase link --project-ref tghzcprzjysrbdxhvdlu

# 3. Publicar a Edge Function
supabase functions deploy admin-reset-password --no-verify-jwt
```

### Opção 2: Criação via Dashboard do Supabase
1. Acesse o menu **Edge Functions** no Dashboard do Supabase: [https://supabase.com/dashboard/project/tghzcprzjysrbdxhvdlu/functions](https://supabase.com/dashboard/project/tghzcprzjysrbdxhvdlu/functions).
2. Clique em **New Function** e nomeie como `admin-reset-password`.
3. Cole o código do arquivo [`supabase/functions/admin-reset-password/index.ts`](supabase/functions/admin-reset-password/index.ts).
4. No Dashboard em **Edge Functions > Secrets**, certifique-se de cadastrar o secret `ADMIN_SERVICE_ROLE_KEY` com o valor da sua chave secreta privada (`sb_secret_...`). As variáveis `SUPABASE_URL` e `SUPABASE_ANON_KEY` são injetadas automaticamente pelo Supabase.
5. Salve e implante a função.

---

## 6. 🚀 Publicação no GitHub Pages (HTTPS)

Como a plataforma é compatível com ambientes estáticos HTTPS e utiliza o SDK oficial do Supabase:

1. Verifique as alterações locais:
   ```bash
   git status
   ```
2. Realize o commit e push para o repositório (apenas após aprovação):
   ```bash
   git add .
   git commit -m "Implementacao do Reset Administrativo de Senha via Edge Function"
   git push origin main
   ```
3. O GitHub Pages publicará a versão atualizada automaticamente em:
   🔗 **`https://dealer-network.github.io/PAN_Training_LATAM/`**

---

## 📩 Suporte e Governança
- **Departamento**: Desenvolvimento de Rede NHCE (Dealer Network LATAM)
- **E-mail de Suporte**: [dealerdevelopmentnhce@newholland.com](mailto:dealerdevelopmentnhce@newholland.com)
