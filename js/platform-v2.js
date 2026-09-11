/* ==========================================================================
   PLATAFORMA CORPORATIVA NEW HOLLAND CONSTRUCTION (LATAM)
   Módulo de Autenticação, i18n, Temas e Governança (V2.1 - Escopo Seguro)
   ========================================================================== */

(function() {
  'use strict';

  const I18N_DICT = {
    pt: {
      brandSubtitle: "Desenvolvimento de Rede NHCE LATAM",
      secureHttps: "Ambiente Seguro HTTPS",
      shaActive: "Proteção SHA-256 Ativa",
      themeToggle: "Alternar Tema Claro/Escuro",
      loginTitle: "Capacitação PAN LATAM",
      loginSubtitle: "Guia Interativo de Atualização do Plano Anual de Negócios",
      emailLabel: "E-MAIL CORPORATIVO",
      emailPlaceholder: "seu.nome@concessionaria.com",
      passwordLabel: "SENHA DE ACESSO",
      passwordPlaceholder: "••••••••••••",
      forgotPassword: "Esqueceu a senha?",
      rememberEmail: "Lembrar meu e-mail",
      maxAttempts: "Máx. 5 tentativas",
      btnLogin: "ACESSAR TREINAMENTO →",
      newHere: "NOVO NA PLATAFORMA?",
      btnRequestAccess: "Solicitar Cadastro de Acesso",
      footerCopyright: "© 2026 CNH Industrial • New Holland Construction. Todos os direitos reservados.",
      footerDev: "Desenvolvimento de Rede NHCE LATAM • Plataforma de Capacitação Corporativa",
      cadTitle: "Solicitar Acesso",
      cadSubtitle: "Preencha os dados abaixo para solicitar autorização de acesso ao treinamento PAN",
      nameLabel: "NOME COMPLETO",
      namePlaceholder: "Ex: Carlos Silva",
      dealerLabel: "CONCESSIONÁRIA / FILIAL",
      dealerPlaceholder: "Ex: Paveca - Córdoba",
      roleLabel: "FUNÇÃO / CARGO",
      rolePlaceholder: "Ex: Gerente Geral / Diretor",
      cadPasswordLabel: "CRIAR SENHA",
      cadPasswordPlaceholder: "Mínimo 8 caracteres",
      cadConfirmLabel: "CONFIRMAR SENHA",
      cadConfirmPlaceholder: "Repita sua senha",
      pwdStrengthText: "Força da senha:",
      strengthWeak: "Fraca",
      strengthMedium: "Média",
      strengthStrong: "Forte",
      btnSubmitCad: "Enviar Solicitação de Acesso →",
      alreadyHaveAccount: "Já possui acesso?",
      btnBackLogin: "Voltar para o Login",
      adminHeaderTitle: "Painel de Governança & Acessos",
      adminHeaderSubtitle: "Desenvolvimento de Rede NHCE LATAM • Gestão de Usuários e Auditoria",
      btnGoTraining: "Ir para o Treinamento →",
      btnLogout: "Sair do Sistema",
      tabUsers: "Gestão de Usuários",
      tabMetrics: "Métricas & Auditoria",
      tabSecurity: "Segurança & Backup",
      kpiTotal: "Total de Usuários",
      kpiActive: "Usuários Aprovados",
      kpiPending: "Pendentes de Análise",
      kpiBlocked: "Contas Bloqueadas",
      kpiLogins: "Total de Acessos",
      kpiAlerts: "Incidentes / Bloqueios",
      searchPlaceholder: "Buscar por nome, e-mail ou concessionária...",
      filterStatusAll: "Todos os Status",
      filterStatusPending: "Pendentes",
      filterStatusApproved: "Aprovados",
      filterStatusBlocked: "Bloqueados",
      filterStatusRejected: "Reprovados",
      btnAddUser: "+ Adicionar Usuário",
      colUser: "Usuário",
      colDealer: "Concessionária",
      colDate: "Data de Cadastro",
      colRole: "Perfil",
      colStatus: "Status",
      colActions: "Ações",
      btnApprove: "Aprovar",
      btnReject: "Reprovar",
      btnUnblock: "Desbloquear",
      btnBlock: "Bloquear",
      btnDelete: "Excluir",
      roleViewer: "Leitor",
      roleAdmin: "Admin",
      errFillFields: "Por favor, preencha todos os campos obrigatórios.",
      errInvalidEmail: "Por favor, insira um e-mail corporativo válido.",
      errPasswordLength: "A senha deve conter no mínimo 8 caracteres.",
      errPasswordMismatch: "As senhas digitadas não coincidem.",
      errEmailRegistered: "Este e-mail já está cadastrado no sistema.",
      msgCadSuccess: "Solicitação enviada com sucesso! Seu acesso está em análise pela equipe de Dealer Development.",
      msgPendingAccount: "Seu cadastro está em análise pela equipe de Dealer Development. Aguarde a aprovação.",
      msgBlockedAccount: "Conta temporariamente bloqueada por excesso de tentativas. Contate o administrador.",
      msgRejectedAccount: "Sua solicitação de acesso não foi aprovada. Entre em contato com o suporte.",
      msgWrongPassword: "Senha incorreta. Tentativa {current} de {max}.",
      msgWarningLastChance: "ATENÇÃO: Última tentativa antes do bloqueio de segurança!",
      msgUserNotFound: "Usuário não encontrado. Verifique o e-mail ou solicite um cadastro.",
      msgLoginSuccess: "Login realizado com sucesso! Redirecionando...",
      forgotTitle: "Recuperação de Acesso Corporativo",
      forgotDesc: "Digite seu e-mail corporativo para solicitar a redefinição de senha ao administrador.",
      btnSendRecovery: "Enviar Solicitação",
      btnClose: "Fechar",
      msgForgotSent: "Solicitação enviada! O administrador do sistema foi notificado para redefinir seu acesso."
    },
    es: {
      brandSubtitle: "Desarrollo de Red NHCE LATAM",
      secureHttps: "Ambiente Seguro HTTPS",
      shaActive: "Protección SHA-256 Activa",
      themeToggle: "Alternar Tema Claro/Oscuro",
      loginTitle: "Capacitación PAN LATAM",
      loginSubtitle: "Guía Interactiva de Actualización del Plan Anual de Negocios",
      emailLabel: "CORREO CORPORATIVO",
      emailPlaceholder: "su.nombre@concesionario.com",
      passwordLabel: "CONTRASEÑA DE ACCESO",
      passwordPlaceholder: "••••••••••••",
      forgotPassword: "¿Olvidó su contraseña?",
      rememberEmail: "Recordar mi correo",
      maxAttempts: "Máx. 5 intentos",
      btnLogin: "ACCEDER A LA CAPACITACIÓN →",
      newHere: "¿NUEVO EN LA PLATAFORMA?",
      btnRequestAccess: "Solicitar Registro de Acceso",
      footerCopyright: "© 2026 CNH Industrial • New Holland Construction. Todos los derechos reservados.",
      footerDev: "Desarrollo de Red NHCE LATAM • Plataforma de Capacitación Corporativa",
      cadTitle: "Solicitar Acceso",
      cadSubtitle: "Complete los datos a continuación para solicitar autorización de acceso a la capacitación PAN",
      nameLabel: "NOMBRE COMPLETO",
      namePlaceholder: "Ej: Carlos Silva",
      dealerLabel: "CONCESIONARIO / SUCURSAL",
      dealerPlaceholder: "Ej: Paveca - Córdoba",
      roleLabel: "FUNCIÓN / CARGO",
      rolePlaceholder: "Ej: Gerente General / Director",
      cadPasswordLabel: "CREAR CONTRASEÑA",
      cadPasswordPlaceholder: "Mínimo 8 caracteres",
      cadConfirmLabel: "CONFIRMAR CONTRASEÑA",
      cadConfirmPlaceholder: "Repita su contraseña",
      pwdStrengthText: "Seguridad de contraseña:",
      strengthWeak: "Débil",
      strengthMedium: "Media",
      strengthStrong: "Fuerte",
      btnSubmitCad: "Enviar Solicitud de Acceso →",
      alreadyHaveAccount: "¿Ya tiene una cuenta?",
      btnBackLogin: "Volver al Inicio de Sesión",
      adminHeaderTitle: "Panel de Gobernanza y Accesos",
      adminHeaderSubtitle: "Desarrollo de Red NHCE LATAM • Gestión de Usuarios y Auditoría",
      btnGoTraining: "Ir a la Capacitación →",
      btnLogout: "Cerrar Sesión",
      tabUsers: "Gestión de Usuarios",
      tabMetrics: "Métricas y Auditoría",
      tabSecurity: "Seguridad y Copia de Seguridad",
      kpiTotal: "Total de Usuarios",
      kpiActive: "Usuarios Aprobados",
      kpiPending: "Pendientes de Análisis",
      kpiBlocked: "Cuentas Bloqueadas",
      kpiLogins: "Total de Accesos",
      kpiAlerts: "Incidentes / Bloqueos",
      searchPlaceholder: "Buscar por nombre, correo o concesionario...",
      filterStatusAll: "Todos los Estados",
      filterStatusPending: "Pendientes",
      filterStatusApproved: "Aprobados",
      filterStatusBlocked: "Bloqueados",
      filterStatusRejected: "Rechazados",
      btnAddUser: "+ Agregar Usuario",
      colUser: "Usuario",
      colDealer: "Concesionario",
      colDate: "Fecha de Registro",
      colRole: "Rol",
      colStatus: "Estado",
      colActions: "Acciones",
      btnApprove: "Aprobar",
      btnReject: "Rechazar",
      btnUnblock: "Desbloquear",
      btnBlock: "Bloquear",
      btnDelete: "Eliminar",
      roleViewer: "Lector",
      roleAdmin: "Admin",
      errFillFields: "Por favor, complete todos los campos obligatorios.",
      errInvalidEmail: "Por favor, ingrese un correo corporativo válido.",
      errPasswordLength: "La contraseña debe tener al menos 8 caracteres.",
      errPasswordMismatch: "Las contraseñas ingresadas no coinciden.",
      errEmailRegistered: "Este correo ya está registrado en el sistema.",
      msgCadSuccess: "¡Solicitud enviada con éxito! Su acceso está en revisión por el equipo de Dealer Development.",
      msgPendingAccount: "Su registro está en revisión por el equipo de Dealer Development. Espere la aprobación.",
      msgBlockedAccount: "Cuenta bloqueada temporalmente por exceso de intentos. Comuníquese con el administrador.",
      msgRejectedAccount: "Su solicitud de acceso no fue aprobada. Póngase en contacto con soporte.",
      msgWrongPassword: "Contraseña incorrecta. Intento {current} de {max}.",
      msgWarningLastChance: "¡ATENCIÓN: Último intento antes del bloqueo de seguridad!",
      msgUserNotFound: "Usuario no encontrado. Verifique el correo o solicite un registro.",
      msgLoginSuccess: "¡Inicio de sesión exitoso! Redirigiendo...",
      forgotTitle: "Recuperación de Acceso Corporativo",
      forgotDesc: "Ingrese su correo corporativo para solicitar el restablecimiento de contraseña al administrador.",
      btnSendRecovery: "Enviar Solicitud",
      btnClose: "Cerrar",
      msgForgotSent: "¡Solicitud enviada! El administrador ha sido notificado para restablecer su acceso."
    },
    en: {
      brandSubtitle: "Dealer Development NHCE LATAM",
      secureHttps: "Secure HTTPS Environment",
      shaActive: "Active SHA-256 Protection",
      themeToggle: "Toggle Light/Dark Theme",
      loginTitle: "PAN LATAM Training",
      loginSubtitle: "Interactive Annual Business Plan Update Guide",
      emailLabel: "CORPORATE EMAIL",
      emailPlaceholder: "your.name@dealership.com",
      passwordLabel: "ACCESS PASSWORD",
      passwordPlaceholder: "••••••••••••",
      forgotPassword: "Forgot password?",
      rememberEmail: "Remember my email",
      maxAttempts: "Max 5 attempts",
      btnLogin: "ACCESS TRAINING →",
      newHere: "NEW TO THE PLATFORM?",
      btnRequestAccess: "Request Access Registration",
      footerCopyright: "© 2026 CNH Industrial • New Holland Construction. All rights reserved.",
      footerDev: "Dealer Development NHCE LATAM • Corporate Training Platform",
      cadTitle: "Request Access",
      cadSubtitle: "Fill in the details below to request authorization to access the PAN training",
      nameLabel: "FULL NAME",
      namePlaceholder: "e.g. Carlos Silva",
      dealerLabel: "DEALERSHIP / BRANCH",
      dealerPlaceholder: "e.g. Paveca - Cordoba",
      roleLabel: "ROLE / POSITION",
      rolePlaceholder: "e.g. General Manager / Director",
      cadPasswordLabel: "CREATE PASSWORD",
      cadPasswordPlaceholder: "Minimum 8 characters",
      cadConfirmLabel: "CONFIRM PASSWORD",
      cadConfirmPlaceholder: "Repeat your password",
      pwdStrengthText: "Password strength:",
      strengthWeak: "Weak",
      strengthMedium: "Medium",
      strengthStrong: "Strong",
      btnSubmitCad: "Submit Access Request →",
      alreadyHaveAccount: "Already have an account?",
      btnBackLogin: "Back to Login",
      adminHeaderTitle: "Governance & Access Panel",
      adminHeaderSubtitle: "Dealer Development NHCE LATAM • User Management & Audit",
      btnGoTraining: "Go to Training →",
      btnLogout: "Sign Out",
      tabUsers: "User Management",
      tabMetrics: "Metrics & Audit",
      tabSecurity: "Security & Backup",
      kpiTotal: "Total Users",
      kpiActive: "Approved Users",
      kpiPending: "Pending Review",
      kpiBlocked: "Blocked Accounts",
      kpiLogins: "Total Logins",
      kpiAlerts: "Security Incidents",
      searchPlaceholder: "Search by name, email or dealership...",
      filterStatusAll: "All Statuses",
      filterStatusPending: "Pending",
      filterStatusApproved: "Approved",
      filterStatusBlocked: "Blocked",
      filterStatusRejected: "Rejected",
      btnAddUser: "+ Add User",
      colUser: "User",
      colDealer: "Dealership",
      colDate: "Registration Date",
      colRole: "Role",
      colStatus: "Status",
      colActions: "Actions",
      btnApprove: "Approve",
      btnReject: "Reject",
      btnUnblock: "Unblock",
      btnBlock: "Block",
      btnDelete: "Delete",
      roleViewer: "Reader",
      roleAdmin: "Admin",
      errFillFields: "Please fill in all required fields.",
      errInvalidEmail: "Please enter a valid corporate email.",
      errPasswordLength: "Password must be at least 8 characters long.",
      errPasswordMismatch: "Entered passwords do not match.",
      errEmailRegistered: "This email is already registered in the system.",
      msgCadSuccess: "Request sent successfully! Your access is under review by Dealer Development.",
      msgPendingAccount: "Your account is under review by Dealer Development. Please await approval.",
      msgBlockedAccount: "Account temporarily locked due to excessive failed attempts. Contact admin.",
      msgRejectedAccount: "Your access request was not approved. Please contact support.",
      msgWrongPassword: "Incorrect password. Attempt {current} of {max}.",
      msgWarningLastChance: "WARNING: Last attempt before security account lockout!",
      msgUserNotFound: "User not found. Check your email or request registration.",
      msgLoginSuccess: "Login successful! Redirecting...",
      forgotTitle: "Corporate Access Recovery",
      forgotDesc: "Enter your corporate email to request a password reset from the administrator.",
      btnSendRecovery: "Send Request",
      btnClose: "Close",
      msgForgotSent: "Request sent! The system administrator has been notified to reset your password."
    }
  };

  let activeLang = localStorage.getItem('nh_lang') || 'pt';
  let activeTheme = localStorage.getItem('nh_theme') || 'dark';
  let activeViewId = 'view-login';

  function tr(key, params = {}) {
    const dict = I18N_DICT[activeLang] || I18N_DICT['pt'];
    let text = dict[key] || I18N_DICT['pt'][key] || key;
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`{${k}}`, 'g'), v);
    }
    return text;
  }

  function setLanguage(lang) {
    if (!I18N_DICT[lang]) lang = 'pt';
    activeLang = lang;
    localStorage.setItem('nh_lang', lang);

    // Atualizar botões no cabeçalho
    ['pt', 'es', 'en'].forEach(l => {
      const btn = document.getElementById(`btn-lang-${l}`);
      if (btn) {
        if (l === lang) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });

    // Atualizar textos no DOM
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (k) el.innerHTML = tr(k);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.getAttribute('data-i18n-placeholder');
      if (k) el.placeholder = tr(k);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const k = el.getAttribute('data-i18n-title');
      if (k) el.title = tr(k);
    });

    // Atualizar tabela administrativa se visível
    if (activeViewId === 'view-admin') {
      renderAdminTable();
    }

    // Sincronizar com o motor de slides do treinamento
    if (typeof window.changeLanguage === 'function') {
      try {
        window.changeLanguage(lang);
      } catch(e) {
        console.warn('Sync training language:', e);
      }
    }
    const trainingLangSelect = document.getElementById('lang-select');
    if (trainingLangSelect) {
      trainingLangSelect.value = lang;
    }
  }

  function toggleTheme() {
    activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(activeTheme);
  }

  function applyTheme(theme) {
    activeTheme = theme;
    localStorage.setItem('nh_theme', theme);
    const icon = document.getElementById('theme-icon');
    
    if (theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      if (icon) icon.className = 'fa-solid fa-sun';
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      if (icon) icon.className = 'fa-solid fa-moon';
    }
  }

  function showView(viewId) {
    activeViewId = viewId;
    const views = ['view-login', 'view-cadastro', 'view-admin', 'view-training'];
    
    views.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === viewId) {
          el.classList.remove('hidden');
          if (id === 'view-training') {
            el.style.display = 'flex';
            const gHeader = document.getElementById('platform-global-header');
            if (gHeader) gHeader.style.display = 'none';
            const animBg = document.getElementById('nh-animated-bg');
            if (animBg) animBg.style.display = 'none';

            // Garantir que os slides e interface do treinamento inicializem
            if (typeof window.initInterface === 'function') {
              try { window.initInterface(); } catch(e) {}
            }
          } else {
            el.style.display = '';
            const gHeader = document.getElementById('platform-global-header');
            if (gHeader) gHeader.style.display = '';
            const animBg = document.getElementById('nh-animated-bg');
            if (animBg) animBg.style.display = '';
          }
        } else {
          el.classList.add('hidden');
          if (id === 'view-training') {
            el.style.display = 'none';
          }
        }
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewId === 'view-admin') {
      loadAdminData();
    }
  }

  /* ==========================================================================
     AUTENTICAÇÃO & SEGURANÇA (SHA-256 COM SALT CORPORATIVO)
     ========================================================================== */
  const STORAGE_KEYS = {
    USERS: 'nh_auth_users',
    SESSION: 'nh_auth_session',
    ATTEMPTS: 'nh_auth_failed_attempts',
    AUDIT: 'nh_auth_audit_logs'
  };

  const MASTER_SALT = 'NHCE_LATAM_DEALER_NETWORK_2026_SALT';
  const MAX_FAILED_ATTEMPTS = 5;

  async function sha256(text) {
    const enc = new TextEncoder();
    const data = enc.encode(text + MASTER_SALT);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function initDatabase() {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || 'null');
    if (!users || !Array.isArray(users) || users.length === 0) {
      users = [
        {
          id: 'usr_admin_master',
          name: 'Administrador Master NHCE',
          email: 'admin@newholland.com',
          dealership: 'CNH Industrial - Curitiba',
          role: 'ADMIN',
          status: 'APROVADO',
          passwordHash: 'e6c2e399581f440538a79a32dc4fbca1456209b50e0544520973686f0c60965e', // Admin@NHCE2026!
          createdAt: new Date().toISOString(),
          approvedAt: new Date().toISOString(),
          lastLogin: null
        }
      ];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    let audit = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || 'null');
    if (!audit) {
      audit = [
        {
          timestamp: new Date().toISOString(),
          type: 'SYSTEM_INIT',
          email: 'admin@newholland.com',
          details: 'Plataforma inicializada com sucesso.'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(audit));
    }
  }

  function addAuditLog(type, email, details) {
    const audit = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || '[]');
    audit.unshift({
      timestamp: new Date().toISOString(),
      type,
      email,
      details
    });
    if (audit.length > 200) audit.pop();
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(audit));
  }

  function showAlert(prefix, message, isError = true) {
    const alertBox = document.getElementById(`${prefix}-alert`);
    const alertText = document.getElementById(`${prefix}-alert-text`);
    const alertIcon = document.getElementById(`${prefix}-alert-icon`);
    if (!alertBox || !alertText) return;

    alertText.innerText = message;
    alertBox.className = isError
      ? 'mb-5 p-3.5 rounded-xl text-xs font-medium border flex items-start space-x-2.5 bg-rose-500/10 text-rose-300 border-rose-500/30'
      : 'mb-5 p-3.5 rounded-xl text-xs font-medium border flex items-start space-x-2.5 bg-emerald-500/10 text-emerald-300 border-emerald-500/30';

    if (alertIcon) {
      alertIcon.className = isError ? 'fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0 text-sm' : 'fa-solid fa-circle-check mt-0.5 flex-shrink-0 text-sm';
    }
    alertBox.classList.remove('hidden');
  }

  function hideAlert(prefix) {
    const alertBox = document.getElementById(`${prefix}-alert`);
    if (alertBox) alertBox.classList.add('hidden');
  }

  async function handleLoginSubmit(event) {
    if (event) event.preventDefault();
    hideAlert('login');

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const rememberCheckbox = document.getElementById('remember-email');

    const email = (emailInput?.value || '').trim().toLowerCase();
    const password = passwordInput?.value || '';

    if (!email || !password) {
      showAlert('login', tr('errFillFields'), true);
      return;
    }

    if (rememberCheckbox && rememberCheckbox.checked) {
      localStorage.setItem('nh_remembered_email', email);
    } else {
      localStorage.removeItem('nh_remembered_email');
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => (u.email || '').toLowerCase() === email);

    const attempts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '{}');
    const currentAttempts = attempts[email] || 0;

    if (user && user.status === 'BLOQUEADO') {
      showAlert('login', tr('msgBlockedAccount'), true);
      addAuditLog('LOGIN_BLOCKED_ATTEMPT', email, 'Tentativa de login em conta bloqueada.');
      return;
    }

    if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
      if (user) {
        user.status = 'BLOQUEADO';
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      }
      showAlert('login', tr('msgBlockedAccount'), true);
      addAuditLog('ACCOUNT_LOCKED', email, 'Bloqueio automático por exceder tentativas.');
      return;
    }

    if (!user) {
      showAlert('login', tr('msgUserNotFound'), true);
      addAuditLog('LOGIN_USER_NOT_FOUND', email, 'E-mail não cadastrado.');
      return;
    }

    const inputHash = await sha256(password);
    if (inputHash !== user.passwordHash) {
      const newCount = currentAttempts + 1;
      attempts[email] = newCount;
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

      if (newCount >= MAX_FAILED_ATTEMPTS) {
        user.status = 'BLOQUEADO';
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        showAlert('login', tr('msgBlockedAccount'), true);
        addAuditLog('ACCOUNT_LOCKED', email, 'Excedeu 5 tentativas de senha.');
      } else if (newCount === MAX_FAILED_ATTEMPTS - 1) {
        showAlert('login', `${tr('msgWrongPassword', { current: newCount, max: MAX_FAILED_ATTEMPTS })} - ${tr('msgWarningLastChance')}`, true);
        addAuditLog('LOGIN_FAILED_WARN', email, `Falha ${newCount}/5.`);
      } else {
        showAlert('login', tr('msgWrongPassword', { current: newCount, max: MAX_FAILED_ATTEMPTS }), true);
        addAuditLog('LOGIN_FAILED', email, `Falha ${newCount}/5.`);
      }
      return;
    }

    if (user.status === 'PENDENTE') {
      showAlert('login', tr('msgPendingAccount'), true);
      addAuditLog('LOGIN_PENDING', email, 'Acesso tentado em conta pendente.');
      return;
    }

    if (user.status === 'REPROVADO') {
      showAlert('login', tr('msgRejectedAccount'), true);
      addAuditLog('LOGIN_REJECTED', email, 'Acesso tentado em conta reprovada.');
      return;
    }

    // Sucesso
    attempts[email] = 0;
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

    user.lastLogin = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      dealership: user.dealership,
      status: user.status,
      loginTime: new Date().toISOString()
    };
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    addAuditLog('LOGIN_SUCCESS', email, `Login efetuado com perfil ${user.role}.`);

    showAlert('login', tr('msgLoginSuccess'), false);

    setTimeout(() => {
      if (user.role === 'ADMIN') {
        showView('view-admin');
      } else {
        showView('view-training');
      }
    }, 400);
  }

  async function handleCadastroSubmit(event) {
    if (event) event.preventDefault();
    hideAlert('cad');

    const name = document.getElementById('cad-name').value.trim();
    const dealer = document.getElementById('cad-dealer').value.trim();
    const role = document.getElementById('cad-role').value.trim();
    const email = document.getElementById('cad-email').value.trim().toLowerCase();
    const password = document.getElementById('cad-password').value;
    const confirm = document.getElementById('cad-confirm').value;

    if (!name || !dealer || !role || !email || !password || !confirm) {
      showAlert('cad', tr('errFillFields'), true);
      return;
    }

    if (password.length < 8) {
      showAlert('cad', tr('errPasswordLength'), true);
      return;
    }

    if (password !== confirm) {
      showAlert('cad', tr('errPasswordMismatch'), true);
      return;
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    if (users.some(u => (u.email || '').toLowerCase() === email)) {
      showAlert('cad', tr('errEmailRegistered'), true);
      return;
    }

    const passwordHash = await sha256(password);
    const newUser = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      name,
      dealership: dealer,
      jobTitle: role,
      email,
      role: 'USER',
      status: 'PENDENTE',
      passwordHash,
      createdAt: new Date().toISOString(),
      approvedAt: null,
      lastLogin: null
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    addAuditLog('REGISTER_REQUEST', email, `Novo cadastro solicitado por ${name} (${dealer}).`);

    showAlert('cad', tr('msgCadSuccess'), false);

    setTimeout(() => {
      document.getElementById('form-cadastro').reset();
      showView('view-login');
      showAlert('login', tr('msgCadSuccess'), false);
    }, 2000);
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    showView('view-login');
  }

  function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) { icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash'); }
    } else {
      input.type = 'password';
      if (icon) { icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye'); }
    }
  }

  function checkPasswordStrength(password) {
    const bar1 = document.getElementById('bar-strength-1');
    const bar2 = document.getElementById('bar-strength-2');
    const bar3 = document.getElementById('bar-strength-3');
    const label = document.getElementById('pwd-strength-label');
    if (!bar1 || !bar2 || !bar3 || !label) return;

    bar1.className = 'h-full w-1/3 bg-slate-700 transition-all duration-300';
    bar2.className = 'h-full w-1/3 bg-slate-700 transition-all duration-300';
    bar3.className = 'h-full w-1/3 bg-slate-700 transition-all duration-300';

    if (!password) {
      label.innerText = '-';
      label.className = 'font-semibold text-slate-500';
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

    if (score === 1) {
      bar1.className = 'h-full w-1/3 bg-rose-500';
      label.innerText = tr('strengthWeak');
      label.className = 'font-semibold text-rose-500';
    } else if (score === 2) {
      bar1.className = 'h-full w-1/3 bg-amber-500';
      bar2.className = 'h-full w-1/3 bg-amber-500';
      label.innerText = tr('strengthMedium');
      label.className = 'font-semibold text-amber-500';
    } else if (score >= 3) {
      bar1.className = 'h-full w-1/3 bg-emerald-500';
      bar2.className = 'h-full w-1/3 bg-emerald-500';
      bar3.className = 'h-full w-1/3 bg-emerald-500';
      label.innerText = tr('strengthStrong');
      label.className = 'font-semibold text-emerald-500';
    }
  }

  function loadAdminData() {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const audit = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || '[]');

    const total = users.length;
    const approved = users.filter(u => u.status === 'APROVADO').length;
    const pending = users.filter(u => u.status === 'PENDENTE').length;
    const blocked = users.filter(u => u.status === 'BLOQUEADO').length;
    const logins = audit.filter(a => a.type === 'LOGIN_SUCCESS').length;
    const incidents = audit.filter(a => a.type.includes('BLOCKED') || a.type.includes('LOCKED')).length;

    const elTotal = document.getElementById('kpi-total-users');
    const elActive = document.getElementById('kpi-active-users');
    const elPending = document.getElementById('kpi-pending-users');
    const elBlocked = document.getElementById('kpi-blocked-users');
    const elLogins = document.getElementById('kpi-total-logins');
    const elAlerts = document.getElementById('kpi-security-alerts');

    if (elTotal) elTotal.innerText = total;
    if (elActive) elActive.innerText = approved;
    if (elPending) elPending.innerText = pending;
    if (elBlocked) elBlocked.innerText = blocked;
    if (elLogins) elLogins.innerText = logins;
    if (elAlerts) elAlerts.innerText = incidents;

    renderAdminTable();
    renderAuditLogs();
  }

  function renderAdminTable() {
    const tbody = document.getElementById('admin-users-table-body');
    if (!tbody) return;

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const searchTerm = (document.getElementById('admin-search-input')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('admin-status-filter')?.value || 'ALL';

    const filtered = users.filter(u => {
      const matchSearch = (u.name || '').toLowerCase().includes(searchTerm) ||
                          (u.email || '').toLowerCase().includes(searchTerm) ||
                          (u.dealership || '').toLowerCase().includes(searchTerm);
      const matchStatus = statusFilter === 'ALL' || u.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-500 text-xs">Nenhum usuário encontrado com os filtros atuais.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(u => {
      const statusBadges = {
        APROVADO: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-approved">APROVADO</span>`,
        PENDENTE: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-pending">PENDENTE</span>`,
        BLOQUEADO: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-blocked">BLOQUEADO</span>`,
        REPROVADO: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-rejected">REPROVADO</span>`
      };

      const isMasterAdmin = u.email === 'admin@newholland.com';
      const dateFormatted = u.createdAt ? new Date(u.createdAt).toLocaleDateString(activeLang === 'pt' ? 'pt-BR' : activeLang === 'es' ? 'es-ES' : 'en-US') : '-';

      let actionBtns = '';
      if (!isMasterAdmin) {
        if (u.status === 'PENDENTE') {
          actionBtns += `
            <select id="role-select-${u.id}" class="bg-slate-800 text-slate-200 border border-slate-700 rounded px-1.5 py-1 text-xs mr-1 focus:outline-none cursor-pointer">
              <option value="USER" ${u.role !== 'ADMIN' ? 'selected' : ''}>${tr('roleViewer') || 'Leitor'}</option>
              <option value="ADMIN" ${u.role === 'ADMIN' ? 'selected' : ''}>${tr('roleAdmin') || 'Admin'}</option>
            </select>
            <button onclick="updateUserStatus('${u.id}', 'APROVADO', document.getElementById('role-select-${u.id}').value)" class="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold mr-1 transition-colors">${tr('btnApprove')}</button>
            <button onclick="updateUserStatus('${u.id}', 'REPROVADO')" class="px-2.5 py-1 rounded bg-slate-700/50 text-slate-300 hover:bg-slate-600 mr-1 transition-colors">${tr('btnReject')}</button>
          `;
        } else if (u.status === 'BLOQUEADO') {
          actionBtns += `<button onclick="updateUserStatus('${u.id}', 'APROVADO')" class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black font-semibold mr-1 transition-colors">${tr('btnUnblock')}</button>`;
        } else if (u.status === 'APROVADO') {
          actionBtns += `<button onclick="updateUserStatus('${u.id}', 'BLOQUEADO')" class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white font-semibold mr-1 transition-colors">${tr('btnBlock')}</button>`;
        }
        actionBtns += `<button onclick="deleteUser('${u.id}')" class="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" title="${tr('btnDelete')}"><i class="fa-solid fa-trash-can"></i></button>`;
      } else {
        actionBtns = `<span class="text-[10px] font-semibold text-nhyellow-500">PROTEGIDO</span>`;
      }

      return `
        <tr class="hover:bg-white/[0.02] transition-colors">
          <td class="py-3 px-3">
            <div class="font-semibold text-white">${escapeHtml(u.name)}</div>
            <div class="text-[11px] text-slate-400">${escapeHtml(u.email)}</div>
          </td>
          <td class="py-3 px-3 text-slate-300">
            <div>${escapeHtml(u.dealership || '-')}</div>
            <div class="text-[11px] text-slate-500">${escapeHtml(u.jobTitle || '')}</div>
          </td>
          <td class="py-3 px-3 text-slate-400">${dateFormatted}</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-nhyellow-500/20 text-nhyellow-500' : 'bg-slate-800 text-slate-400'}">${u.role}</span>
          </td>
          <td class="py-3 px-3">${statusBadges[u.status] || u.status}</td>
          <td class="py-3 px-3 text-right whitespace-nowrap">${actionBtns}</td>
        </tr>
      `;
    }).join('');
  }

  function filterAdminUsers() {
    renderAdminTable();
  }

  function updateUserStatus(userId, newStatus, newRole) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.id === userId);
    if (!user) return;

    user.status = newStatus;
    if (newRole) {
      user.role = newRole;
    }
    if (newStatus === 'APROVADO') {
      user.approvedAt = new Date().toISOString();
      const attempts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '{}');
      delete attempts[user.email.toLowerCase()];
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    addAuditLog('USER_STATUS_CHANGE', user.email, `Status alterado para ${newStatus} pelo Administrador.`);
    loadAdminData();
  }

  function deleteUser(userId) {
    if (!confirm('Deseja realmente excluir este usuário?')) return;
    let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.id === userId);
    if (!user) return;

    users = users.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    addAuditLog('USER_DELETED', user.email, `Usuário ${user.name} excluído do sistema.`);
    loadAdminData();
  }

  function switchAdminTab(tabName) {
    ['users', 'audit', 'backup'].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const content = document.getElementById(`admin-tab-${t}-content`);
      if (btn && content) {
        if (t === tabName) {
          btn.className = 'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-nhyellow-500 text-nhdark-950 font-heading';
          content.classList.remove('hidden');
        } else {
          btn.className = 'px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white font-heading';
          content.classList.add('hidden');
        }
      }
    });
  }

  function renderAuditLogs() {
    const box = document.getElementById('admin-audit-log-box');
    if (!box) return;
    const audit = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || '[]');
    if (audit.length === 0) {
      box.innerHTML = '<div class="text-slate-500 text-center py-4">Nenhum registro de auditoria disponível.</div>';
      return;
    }

    box.innerHTML = audit.map(a => {
      const time = new Date(a.timestamp).toLocaleString();
      return `<div><span class="text-slate-500">[${time}]</span> <span class="text-nhyellow-500 font-bold">${a.type}</span>: <span class="text-slate-300">${escapeHtml(a.email)}</span> - <span class="text-slate-400">${escapeHtml(a.details)}</span></div>`;
    }).join('');
  }

  function exportAuditCsv() {
    const audit = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || '[]');
    const csvRows = ['Data/Hora,Evento,Usuario,Detalhes'];
    audit.forEach(a => {
      csvRows.push(`"${a.timestamp}","${a.type}","${a.email}","${(a.details || '').replace(/"/g, '""')}"`);
    });
    downloadFile('nhce_audit_logs.csv', 'text/csv;charset=utf-8;', csvRows.join('\n'));
  }

  function clearAuditLogs() {
    if (!confirm('Deseja limpar todos os registros de auditoria?')) return;
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify([]));
    renderAuditLogs();
  }

  function exportFullDatabaseJson() {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const audit = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || '[]');
    const data = {
      exportDate: new Date().toISOString(),
      system: 'NHCE LATAM PAN Training Platform',
      version: '2.0.0',
      users,
      audit
    };
    downloadFile('nhce_pan_database_backup.json', 'application/json;charset=utf-8;', JSON.stringify(data, null, 2));
  }

  function importFullDatabaseJson(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.users && Array.isArray(data.users)) {
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data.users));
          if (data.audit) localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(data.audit));
          alert('Base de dados restaurada com sucesso!');
          loadAdminData();
        } else {
          alert('Formato de arquivo JSON inválido.');
        }
      } catch(err) {
        alert('Erro ao processar o arquivo: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function downloadFile(filename, type, content) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function openForgotPasswordModal() {
    const modal = document.getElementById('modal-forgot-password');
    if (modal) modal.classList.remove('hidden');
  }

  function closeForgotPasswordModal() {
    const modal = document.getElementById('modal-forgot-password');
    if (modal) modal.classList.add('hidden');
  }

  function handleForgotPasswordSubmit(event) {
    if (event) event.preventDefault();
    const email = (document.getElementById('forgot-email')?.value || '').trim();
    if (!email) return;

    addAuditLog('FORGOT_PASSWORD_REQUEST', email, 'Solicitação de recuperação de senha enviada.');
    alert(tr('msgForgotSent'));
    closeForgotPasswordModal();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  /* Expor funções globalmente no window */
  window.setLanguage = setLanguage;
  window.toggleTheme = toggleTheme;
  window.showView = showView;
  window.handleLoginSubmit = handleLoginSubmit;
  window.handleCadastroSubmit = handleCadastroSubmit;
  window.handleLogout = handleLogout;
  window.togglePasswordVisibility = togglePasswordVisibility;
  window.checkPasswordStrength = checkPasswordStrength;
  window.openForgotPasswordModal = openForgotPasswordModal;
  window.closeForgotPasswordModal = closeForgotPasswordModal;
  window.handleForgotPasswordSubmit = handleForgotPasswordSubmit;
  window.switchAdminTab = switchAdminTab;
  window.filterAdminUsers = filterAdminUsers;
  window.updateUserStatus = updateUserStatus;
  window.deleteUser = deleteUser;
  window.exportAuditCsv = exportAuditCsv;
  window.clearAuditLogs = clearAuditLogs;
  window.exportFullDatabaseJson = exportFullDatabaseJson;
  window.importFullDatabaseJson = importFullDatabaseJson;

  /* Inicialização automática */
  function bootPlatform() {
    initDatabase();
    applyTheme(activeTheme);
    setLanguage(activeLang);

    const savedEmail = localStorage.getItem('nh_remembered_email');
    if (savedEmail) {
      const emailInput = document.getElementById('login-email');
      const rememberCheckbox = document.getElementById('remember-email');
      if (emailInput) emailInput.value = savedEmail;
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    const session = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.SESSION) || 'null');
    if (session && session.status === 'APROVADO') {
      if (session.role === 'ADMIN') {
        showView('view-admin');
      } else {
        showView('view-training');
      }
    } else {
      showView('view-login');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPlatform);
  } else {
    bootPlatform();
  }

})();
