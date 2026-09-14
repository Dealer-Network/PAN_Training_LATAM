# 🚜 Plataforma de Treinamento PAN — New Holland Construction (LATAM)

Plataforma Corporativa de Capacitação Interativa do **Plano Anual de Negócios (PAN)** no Portal CNH Industrial 360 para a Rede de Concessionários New Holland Construction Latin America (NHCE LATAM).

---

## 🌐 Acesso Online / Live Platform

- 🔗 **Plataforma Completa (SPA)**: [https://dealer-network.github.io/PAN_Training_LATAM/](https://dealer-network.github.io/PAN_Training_LATAM/)
- 🔗 **Arquivo Principal Local**: [index.html](index.html) ou [PAN_Training_LATAM.html](PAN_Training_LATAM.html)

---

## 🌟 Funcionalidades da Plataforma Integrada

### 🔐 Autenticação e Controle de Acesso Seguro (Supabase)
- **Supabase Auth + Row Level Security (RLS)**: Autenticação corporativa com banco de dados em nuvem.
- **Controle de Acesso em Múltiplos Níveis**: Visitante ➔ Cadastro Pendente (`pending`) ➔ Aprovação ADM (`approved`) ➔ Acesso Liberado ao Treinamento.
- **Bloqueio de Contas**: Usuários com status `blocked` ou `rejected` têm acesso imediatamente negado.
- **Roteamento SPA Seguro**: Visibilidade de views controlada por estado (`#view-login`, `#view-cadastro`, `#view-admin`, `#view-training`). Acesso direto ao treinamento sem autenticação e status aprovado é bloqueado.
- **Proteção de Front-end**: Bloqueio de atalhos de inspeção casual (`F12`, `Ctrl+Shift+I/J/C/K`, `Ctrl+U`, `Ctrl+S` e clique direito).

### 🛠️ Painel Administrativo & Auditoria
- **Dashboard com 6 Indicadores em Tempo Real**: Total de cadastros, aprovados, pendentes, bloqueados, acessos totais e alertas de segurança.
- **Gestão Completa de Usuários**: Aprovação, bloqueio, reativação e filtros dinâmicos por nome, e-mail, concessionária e status.
- **Monitoramento de Acessos**: Trilha de auditoria em tempo real conectada à tabela `public.access_logs` no Supabase.
- **Exportação e Backup**: Download de relatórios em formato CSV e backup completo em JSON.

### 📚 Treinamento Interativo 100% Preservado
- 🇧🇷 🇪🇸 🇺🇸 **Trilíngue Completo**: Suporte nativo e alternância instantânea entre Português, Espanhol e Inglês.
- 🌓 **Alternador de Tema Claro/Escuro**: Modo Dark de alta fidelidade e Modo Light Clean com persistência no navegador.
- 🔊 **Locução de Áudio Integrada**: Narração em voz nativa com sintetizador de voz (Web Speech API) e animação sonora.
- 💬 **Assistente Virtual Inteligente (Chatbot)**: Respostas rápidas sobre login, preenchimento, download/upload do Excel e suporte.
- 🔍 **Visualizador em Alta Definição (HD)**: Lightbox interativo com zoom em todas as telas oficiais.

---

## 📁 Estrutura de Arquivos

```
Treinamento PAN/
├── index.html                  # Aplicação Central SPA (GitHub Pages)
├── PAN_Training_LATAM.html     # Espelho Unificado Local
├── supabase_schema.sql         # Script DDL com Tabelas, RLS e Triggers no Supabase
├── GUIA_ADMINISTRADOR.md       # Manual de Administração e Governança Supabase
├── README.md                   # Documentação Geral do Projeto
├── js/
│   ├── supabase-client.js      # Conector Seguro com SDK do Supabase
│   ├── auth-service.js         # Serviço Central de Autenticação
│   ├── platform-v2.js          # Lógica da Plataforma, Painel ADM e i18n
│   └── security-guard.js       # Guardião de Rotas e Segurança
├── css/                        # Folhas de Estilo e Temas Corporativos
└── media/                      # Recursos visuais e logos oficiais da marca
```

---

## 🔑 Credenciais e Implantação Supabase
- **URL**: `https://tghzcprzjysrbdxhvdlu.supabase.co`
- **Publishable Key**: `sb_publishable_Ef2Rn59cywyibuxSupS5XQ_TMXNu3T1`

Consulte o [GUIA_ADMINISTRADOR.md](GUIA_ADMINISTRADOR.md) e execute o [`supabase_schema.sql`](supabase_schema.sql) no SQL Editor do Supabase para inicializar o ambiente.

---

## 📩 Suporte e Mesa de Ajuda
- **Departamento**: Desenvolvimento de Rede NHCE (Dealer Network LATAM)
- **E-mail**: [dealerdevelopmentnhce@newholland.com](mailto:dealerdevelopmentnhce@newholland.com)
