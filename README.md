# 🚜 Plataforma de Treinamento PAN — New Holland Construction (LATAM)

Plataforma Corporativa de Capacitação Interativa do **Plano Anual de Negócios (PAN)** no Portal CNH Industrial 360 para a Rede de Concessionários New Holland Construction Latin America (NHCE LATAM).

---

## 🌐 Acesso Online / Live Platform

- 🔗 **Portal de Login**: [https://dealer-network.github.io/PAN_Training_LATAM/](https://dealer-network.github.io/PAN_Training_LATAM/)
- 🔗 **Solicitar Cadastro**: [cadastro.html](cadastro.html)
- 🔗 **Painel Administrativo**: [admin.html](admin.html) *(Requer perfil de Administrador)*
- 🔗 **Ambiente de Treinamento**: [treinamento.html](treinamento.html) *(Protegido por autenticação)*

---

## 🌟 Funcionalidades da Plataforma

### 🔐 Camada de Autenticação e Segurança
- **Controle de Acesso em Múltiplos Níveis**: Visitante ➔ Cadastro Pendente ➔ Aprovação ADM ➔ Acesso Liberado.
- **Criptografia SHA-256 com Salt Corporativo**: Segurança nativa através da Web Crypto API.
- **Bloqueio Automático após 5 Tentativas Incorretas**: Proteção contra força bruta diretamente no banco de dados.
- **Guardião de Rotas (Anti-Bypass)**: Redirecionamento instantâneo caso ocorra tentativa de acesso direto à URL do treinamento ou do painel ADM.
- **Proteção de Front-end**: Bloqueio de atalhos de inspeção casual (`F12`, `Ctrl+Shift+I/J/C`, `Ctrl+U`, `Ctrl+S` e clique direito).

### 🛠️ Painel Administrativo & Auditoria (`admin.html`)
- **Dashboard com Indicadores em Tempo Real**: Total de cadastros, aprovados, pendentes, bloqueados e sessões.
- **Gestão de Usuários**: Aprovação, reprovação, bloqueio, redefinição de senha e exclusão.
- **Monitoramento de Acessos**: Tabela detalhada de logs com histórico completo de eventos de login, logout e navegação.
- **Exportação e Backup**: Download de relatórios em formato CSV e backup completo do banco em JSON.

### 📚 Treinamento Interativo Preservado (`treinamento.html`)
- 🇧🇷 🇪🇸 🇺🇸 **Trilíngue Completo**: Suporte nativo e alternância instantânea entre Português, Espanhol e Inglês.
- 🔊 **Locução de Áudio Integrada**: Narração em voz feminina nativa com sintetizador de voz (Web Speech API) e onda sonora dinâmica.
- 💬 **Assistente Virtual Inteligente (Chatbot IA)**: Respostas rápidas sobre login, preenchimento, download/upload do Excel e suporte.
- 🔍 **Visualizador em Alta Definição (HD)**: Lightbox interativo com zoom em todas as telas oficiais.
- 📱 **Barra Superior de Sessão**: Exibição do usuário conectado, concessionária, status e botão de encerramento seguro de sessão.

---

## 📁 Estrutura de Arquivos

```
Treinamento PAN/
├── index.html                  # Página de Login Corporativo (Portal de Entrada)
├── cadastro.html               # Formulário de Solicitação de Cadastro e Validações
├── admin.html                  # Painel Administrativo, Gestão de Usuários e Monitoramento
├── treinamento.html            # Ambiente de Treinamento PAN Completo e Protegido
├── PAN_Training_LATAM.html     # Backup Original do Treinamento Interativo
├── GUIA_ADMINISTRADOR.md       # Manual de Administração, Credenciais e Banco de Dados
├── README.md                   # Documentação Geral do Projeto
├── css/
│   └── platform-custom.css     # Design System Corporativo New Holland Construction
└── js/
    ├── auth-service.js         # Serviço Central de Autenticação, 5 Tentativas e Logs
    └── security-guard.js       # Guardião de Rotas, Sessão e Proteção de Front-end
```

---

## 🔑 Credenciais Iniciais de Administrador
- **E-mail**: `admin@newholland.com`
- **Senha Inicial**: `Admin@NHCE2026!`

Consulte o [GUIA_ADMINISTRADOR.md](GUIA_ADMINISTRADOR.md) para obter todos os detalhes de administração.

---

## 📩 Suporte e Mesa de Ajuda
- **Departamento**: Desenvolvimento de Rede NHCE (Dealer Network LATAM)
- **E-mail**: [dealerdevelopmentnhce@newholland.com](mailto:dealerdevelopmentnhce@newholland.com)
