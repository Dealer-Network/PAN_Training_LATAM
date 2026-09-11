# 🚜 Plataforma de Treinamento PAN — New Holland Construction (LATAM)

Plataforma Corporativa de Capacitação Interativa do **Plano Anual de Negócios (PAN)** no Portal CNH Industrial 360 para a Rede de Concessionários New Holland Construction Latin America (NHCE LATAM).

---

## 🌐 Acesso Online / Live Platform

- 🔗 **Plataforma Completa (SPA)**: [https://dealer-network.github.io/PAN_Training_LATAM/](https://dealer-network.github.io/PAN_Training_LATAM/)
- 🔗 **Arquivo Principal Local**: [PAN_Training_LATAM.html](PAN_Training_LATAM.html)

---

## 🌟 Funcionalidades da Plataforma Integrada

### 🔐 Camada de Autenticação e Segurança
- **Controle de Acesso em Múltiplos Níveis**: Visitante ➔ Cadastro Pendente ➔ Aprovação ADM ➔ Acesso Liberado ao Treinamento.
- **Criptografia SHA-256 com Salt Corporativo**: Segurança nativa através da Web Crypto API.
- **Bloqueio Automático após 5 Tentativas Incorretas**: Proteção contra força bruta diretamente na base de dados.
- **Roteamento SPA Seguro**: Visibilidade de views controlada por estado (`#view-login`, `#view-cadastro`, `#view-admin`, `#view-training`). Acesso direto ao treinamento sem autenticação é bloqueado.
- **Proteção de Front-end (Item 9)**: Bloqueio de atalhos de inspeção casual (`F12`, `Ctrl+Shift+I/J/C/K`, `Ctrl+U`, `Ctrl+S` e clique direito).

### 🛠️ Painel Administrativo & Auditoria
- **Dashboard com 6 Indicadores em Tempo Real**: Total de cadastros, aprovados, pendentes, bloqueados, acessos totais e alertas de segurança.
- **Gestão Completa de Usuários**: Aprovação, reprovação, bloqueio, desbloqueio e filtros dinâmicos por nome, e-mail, empresa e status.
- **Monitoramento de Acessos**: Trilha de auditoria em tempo real com histórico completo de eventos (logins, falhas, bloqueios, cadastros).
- **Exportação e Backup**: Download de relatórios em formato CSV e backup/restauração completa do banco em JSON.

### 📚 Treinamento Interativo 100% Preservado
- 🇧🇷 🇪🇸 🇺🇸 **Trilíngue Completo**: Suporte nativo e alternância instantânea entre Português, Espanhol e Inglês.
- 🌓 **Alternador de Tema Claro/Escuro**: Modo Dark de alta fidelidade e Modo Light Clean com persistência no navegador.
- 🔊 **Locução de Áudio Integrada**: Narração em voz feminina nativa com sintetizador de voz (Web Speech API) e onda sonora dinâmica.
- 💬 **Assistente Virtual Inteligente (Chatbot IA)**: Respostas rápidas sobre login, preenchimento, download/upload do Excel e suporte.
- 🔍 **Visualizador em Alta Definição (HD)**: Lightbox interativo com zoom em todas as telas oficiais.

---

## 📁 Estrutura de Arquivos

```
Treinamento PAN/
├── PAN_Training_LATAM.html     # Aplicação Central Unificada (Login, Cadastro, Admin e Treinamento)
├── index.html                  # Espelho Idêntico para Publicação no GitHub Pages
├── GUIA_ADMINISTRADOR.md       # Manual de Administração, Credenciais e Governança
├── README.md                   # Documentação Geral do Projeto
└── media/                      # Recursos visuais e logos oficiais da marca
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
