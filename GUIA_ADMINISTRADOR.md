# 🚜 Manual do Administrador & Guia de Implantação
## Plataforma Corporativa de Treinamento PAN — New Holland Construction (LATAM)

Este documento contém todas as instruções para operação, segurança, governança de usuários, auditoria de acessos e publicação da nova arquitetura da plataforma.

---

## 1. 🔑 Credenciais Iniciais de Administrador

Ao acessar o sistema pela primeira vez, o banco de dados é inicializado automaticamente com o perfil de Administrador Master:

- **URL de Acesso**: `index.html` ou `admin.html`
- **E-mail**: `admin@newholland.com`
- **Senha Padrão**: `Admin@NHCE2026!`
- **Role**: `ADMIN` (Acesso irrestrito a todas as áreas)

> 💡 **Recomendação de Segurança**: Após o primeiro login no Painel ADM, você pode alterar a senha padrão ou cadastrar novos administradores através da aba **Gestão de Usuários > Novo Usuário** com perfil `ADMIN`.

---

## 2. 🔄 Fluxo Operacional da Plataforma

```
[Visitante / Colaborador]
         │
         ▼
[Página de Login (index.html)]
         │
         ├─ Sem Cadastro ──────► [cadastro.html] ──► Status: "PENDENTE"
         │                                                │
         ├─ Senha Incorreta (até 4x) ──► Alerta e Contador│
         │                                                │
         ├─ 5ª Senha Incorreta ────────► Status: "BLOQUEADO"
         │                                                │
         ▼                                                ▼
[Autenticado + Aprovado] ◄─────────────────── [ADMIN APROVA no Painel]
         │
         ▼
[Treinamento Completo (treinamento.html)]
  - Proteção por Guardião de Sessão
  - Barra Superior com Identificação e Logout
  - Bloqueio de F12 e Atalhos de Inspeção
```

---

## 3. 🛡️ Funcionalidades de Segurança Implementadas

1. **Criptografia SHA-256 com Salt Corporativo**: Nenhuma senha trafega ou é armazenada em texto puro. O hash é gerado diretamente pela **Web Crypto API** nativa.
2. **Bloqueio Estrito após 5 Tentativas Consecutivas**:
   - 1ª a 3ª falha: Exibe aviso e contador decrescente.
   - 4ª falha: Alerta de última tentativa antes do bloqueio.
   - 5ª falha: O status no banco é alterado imediatamente para `BLOQUEADO`.
   - O desbloqueio só pode ser efetuado por um administrador no painel.
3. **Guardião de Rotas em Tempo Real**:
   - Tentativas de acessar diretamente `treinamento.html` ou `admin.html` sem sessão válida e status `APROVADO` são imediatamente interceptadas e redirecionadas para o login antes do carregamento do conteúdo.
4. **Proteção Contra Inspeção Casual de Front-end**:
   - Bloqueio do botão direito (menu de contexto).
   - Bloqueio de atalhos de desenvolvedor: `F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+Shift+C`, `Ctrl+U` e `Ctrl+S`.
5. **Auditoria e Monitoramento Contínuo**:
   - Registro detalhado de cada evento com data, hora, usuário, e-mail, resultado e IP/sessão.
   - Exportação de relatórios em `.CSV` (compatível com Excel) e `.JSON`.

---

## 4. 📊 Como Operar o Painel Administrativo (`admin.html`)

### A. Aprovação de Novos Cadastros
1. No menu superior, clique em **Gestão de Usuários**.
2. Filtre por status **Pendentes**.
3. Clique no botão verde de **Aprovar** (<i class="fa-solid fa-check"></i>) para liberar o acesso ou no botão vermelho de **Reprovar**.

### B. Desbloqueio de Usuários Bloqueados por Tentativas
1. Usuários que atingiram 5 erros de senha exibirão o status `BLOQUEADO`.
2. Na tabela, clique no botão **Desbloquear**.
3. Uma janela se abrirá permitindo:
   - Manter a senha atual e apenas zerar o contador de falhas; OU
   - Definir uma **nova senha provisória** para o colaborador.

### C. Backup e Sincronização entre Dispositivos
1. Acesse a aba **Banco de Dados & Backup**.
2. Clique em **Baixar Backup Completo (.JSON)** para salvar um instantâneo de todos os usuários e logs.
3. Para carregar o banco em outro computador/navegador, clique em **Restaurar Base de Dados** e selecione o arquivo gerado.

---

## 5. 🚀 Publicação no GitHub Pages (HTTPS)

Como a aplicação é 100% autossuficiente e client-side com Web Crypto API:

1. Faça o commit e push dos arquivos para a branch principal (`main`):
   ```bash
   git add .
   git commit -m "Evolução da plataforma: Login, Cadastro, Painel ADM e Controle de Acesso"
   git push origin main
   ```
2. O GitHub Pages atualizará automaticamente o site no endereço:
   🔗 **`https://dealer-network.github.io/PAN_Training_LATAM/`**
3. O ponto de entrada principal agora é a página de login corporativo `index.html`.

---

## 6. 🌐 Arquitetura em Nuvem Multi-Device (Opcional - Supabase / Firebase)

Se no futuro a CNH Industrial optar por um banco de dados relacional em nuvem centralizado multi-dispositivos (ex: Supabase / PostgreSQL), a estrutura de tabelas necessária é:

```sql
-- TABELA DE USUÁRIOS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    empresa TEXT NOT NULL,
    senha_hash TEXT NOT NULL,
    status TEXT DEFAULT 'PENDENTE', -- PENDENTE, APROVADO, BLOQUEADO, REPROVADO
    role TEXT DEFAULT 'USER',       -- USER, ADMIN
    failed_login_attempts INT DEFAULT 0,
    blocked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE
);

-- TABELA DE LOGS DE AUDITORIA
CREATE TABLE access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    email TEXT,
    nome TEXT,
    evento TEXT NOT NULL,
    resultado TEXT NOT NULL,
    data_hora TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sessao TEXT,
    detalhes TEXT
);
```

---

## 📩 Suporte e Governança
- **Departamento**: Desenvolvimento de Rede NHCE (Dealer Network LATAM)
- **E-mail de Suporte**: [dealerdevelopmentnhce@newholland.com](mailto:dealerdevelopmentnhce@newholland.com)
