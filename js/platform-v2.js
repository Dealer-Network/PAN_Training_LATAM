/* ==========================================================================
   PLATAFORMA CORPORATIVA NEW HOLLAND CONSTRUCTION (LATAM)
   Módulo de Autenticação, i18n, Temas e Governança com Supabase Backend
   ========================================================================== */

(function() {
  'use strict';

  const I18N_DICT = {
    pt: {
      brandSubtitle: "Desenvolvimento de Rede NHCE LATAM",
      secureHttps: "Ambiente Seguro HTTPS",
      shaActive: "Supabase Auth & RLS Ativo",
      themeToggle: "Alternar Tema Claro/Escuro",
      loginTitle: "Capacitação PAN LATAM",
      loginSubtitle: "Guia Interativo de Atualização do Plano Anual de Negócios",
      emailLabel: "E-MAIL CORPORATIVO",
      emailPlaceholder: "seu.nome@concessionaria.com",
      passwordLabel: "SENHA DE ACESSO",
      passwordPlaceholder: "••••••••••••",
      forgotPassword: "Esqueceu a senha?",
      rememberEmail: "Lembrar meu e-mail",
      maxAttempts: "Autenticação Segura",
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
      msgCadSuccess: "Cadastro realizado com sucesso! Seu acesso está aguardando aprovação pelo Painel Administrativo.",
      msgPendingAccount: "Seu cadastro está aguardando aprovação pelo Administrador. Aguarde a liberação do acesso.",
      msgBlockedAccount: "Conta temporariamente bloqueada por segurança. Contate o administrador.",
      msgRejectedAccount: "Sua solicitação de acesso não foi aprovada. Entre em contato com o suporte.",
      msgWrongPassword: "E-mail ou senha incorretos.",
      msgUserNotFound: "Usuário não encontrado. Verifique o e-mail ou solicite um cadastro.",
      msgLoginSuccess: "Login realizado com sucesso! Redirecionando...",
      forgotTitle: "Recuperação de Acesso Corporativo",
      forgotDesc: "Digite seu e-mail corporativo para receber o link seguro de redefinição de senha.",
      btnSendRecovery: "Enviar Link de Recuperação",
      btnClose: "Fechar",
      msgForgotSent: "Instruções de redefinição enviadas! Verifique sua caixa de entrada de e-mail."
    },
    es: {
      brandSubtitle: "Desarrollo de Red NHCE LATAM",
      secureHttps: "Ambiente Seguro HTTPS",
      shaActive: "Supabase Auth y RLS Activo",
      themeToggle: "Alternar Tema Claro/Oscuro",
      loginTitle: "Capacitación PAN LATAM",
      loginSubtitle: "Guía Interactiva de Actualización del Plan Anual de Negocios",
      emailLabel: "CORREO CORPORATIVO",
      emailPlaceholder: "su.nombre@concesionario.com",
      passwordLabel: "CONTRASEÑA DE ACCESO",
      passwordPlaceholder: "••••••••••••",
      forgotPassword: "¿Olvidó su contraseña?",
      rememberEmail: "Recordar mi correo",
      maxAttempts: "Autenticación Segura",
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
      colRole: "Perfil",
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
      msgCadSuccess: "¡Registro realizado con éxito! Su solicitud está pendiente de aprobación por el Panel Administrativo.",
      msgPendingAccount: "Su cuenta está pendiente de aprobación por el Administrador. Espere la autorización de acceso.",
      msgBlockedAccount: "Cuenta bloqueada temporalmente por seguridad. Contacte al administrador.",
      msgRejectedAccount: "Su solicitud de acceso no fue aprobada. Comuníquese con soporte.",
      msgWrongPassword: "Correo o contraseña incorrectos.",
      msgUserNotFound: "Usuario no encontrado. Verifique su correo o solicite un registro.",
      msgLoginSuccess: "¡Inicio de sesión exitoso! Redirigiendo...",
      forgotTitle: "Recuperación de Acceso Corporativo",
      forgotDesc: "Ingrese su correo corporativo para recibir el enlace de recuperación de contraseña.",
      btnSendRecovery: "Enviar Enlace",
      btnClose: "Cerrar",
      msgForgotSent: "¡Instrucciones enviadas! Revise su bandeja de entrada de correo."
    },
    en: {
      brandSubtitle: "Dealer Development NHCE LATAM",
      secureHttps: "Secure HTTPS Environment",
      shaActive: "Supabase Auth & RLS Active",
      themeToggle: "Toggle Light/Dark Theme",
      loginTitle: "PAN Training LATAM",
      loginSubtitle: "Interactive Annual Business Plan Update Guide",
      emailLabel: "CORPORATE EMAIL",
      emailPlaceholder: "your.name@dealership.com",
      passwordLabel: "ACCESS PASSWORD",
      passwordPlaceholder: "••••••••••••",
      forgotPassword: "Forgot password?",
      rememberEmail: "Remember my email",
      maxAttempts: "Secure Authentication",
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
      msgCadSuccess: "Registration successful! Your request is pending approval via the Admin Panel.",
      msgPendingAccount: "Your registration is pending approval by the Administrator. Please await access clearance.",
      msgBlockedAccount: "Account temporarily locked for security. Contact admin.",
      msgRejectedAccount: "Your access request was not approved. Please contact support.",
      msgWrongPassword: "Invalid email or password.",
      msgUserNotFound: "User not found. Check your email or request registration.",
      msgLoginSuccess: "Login successful! Redirecting...",
      forgotTitle: "Corporate Access Recovery",
      forgotDesc: "Enter your corporate email to receive the password reset link.",
      btnSendRecovery: "Send Link",
      btnClose: "Close",
      msgForgotSent: "Reset instructions sent! Please check your email inbox."
    }
  };

  let activeLang = localStorage.getItem('nh_lang') || 'pt';
  let activeTheme = localStorage.getItem('nh_theme') || 'dark';
  let activeViewId = 'view-login';
  let cachedAdminUsers = [];

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

    ['pt', 'es', 'en'].forEach(l => {
      const btn = document.getElementById(`btn-lang-${l}`);
      if (btn) {
        if (l === lang) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });

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

    if (activeViewId === 'view-admin') {
      renderAdminTable();
    }

    if (typeof window.changeLanguage === 'function') {
      try {
        window.changeLanguage(lang);
      } catch(e) {}
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

  function showAlert(prefix, message, isError = true) {
    const alertBox = document.getElementById(`${prefix}-alert`);
    const alertText = document.getElementById(`${prefix}-alert-text`) || document.getElementById(`${prefix}-alert-msg`);
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

  // 1. SUBMIT DE LOGIN (SUPABASE AUTH)
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

    const btnSubmit = document.getElementById('btn-login-submit');
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Autenticando...`;
    }

    try {
      const res = await window.NHSupabase.signIn({ email, password });

      if (!res.success) {
        showAlert('login', res.error || tr('msgWrongPassword'), true);
        return;
      }

      showAlert('login', tr('msgLoginSuccess'), false);

      setTimeout(() => {
        const profile = res.profile || {};
        const role = (profile.role || '').toLowerCase();
        if (role === 'admin') {
          showView('view-admin');
        } else {
          showView('view-training');
        }
      }, 400);

    } catch (err) {
      showAlert('login', err.message || 'Erro ao conectar ao Supabase.', true);
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = `<span data-i18n="btnLogin">${tr('btnLogin')}</span>`;
      }
    }
  }

  // 2. SUBMIT DE CADASTRO (SUPABASE AUTH + PENDING PROFILE)
  async function handleCadastroSubmit(event) {
    if (event) event.preventDefault();
    hideAlert('cad');

    const name = document.getElementById('cad-name').value.trim();
    const dealer = (document.getElementById('cad-dealer') || document.getElementById('cad-dealership'))?.value.trim();
    const role = document.getElementById('cad-role').value.trim();
    const email = document.getElementById('cad-email').value.trim().toLowerCase();
    const password = document.getElementById('cad-password').value;
    const confirm = (document.getElementById('cad-confirm') || document.getElementById('cad-confirm-password'))?.value;

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

    const btnSubmit = document.getElementById('btn-cad-submit');
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Registrando...`;
    }

    try {
      const res = await window.NHSupabase.signUp({
        email,
        password,
        fullName: name,
        dealership: dealer,
        cargo: role
      });

      if (!res.success) {
        showAlert('cad', res.error || tr('errEmailRegistered'), true);
        return;
      }

      showAlert('cad', tr('msgCadSuccess'), false);

      setTimeout(() => {
        document.getElementById('form-cadastro').reset();
        showView('view-login');
        showAlert('login', tr('msgCadSuccess'), false);
      }, 2000);

    } catch (err) {
      showAlert('cad', err.message || 'Erro ao solicitar cadastro no Supabase.', true);
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = `<span data-i18n="btnSubmitCad">${tr('btnSubmitCad')}</span>`;
      }
    }
  }

  // 3. LOGOUT
  async function handleLogout() {
    if (window.NHSupabase) {
      await window.NHSupabase.signOut();
    }
    showView('view-login');
  }

  function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isPass ? 'fa-regular fa-eye-slash text-xs' : 'fa-regular fa-eye text-xs';
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

  // 4. PAINEL ADM: DADOS E MÉTRICAS DO SUPABASE
  async function loadAdminData() {
    if (!window.NHSupabase) return;

    const users = await window.NHSupabase.getAdminUsers();
    const logs = await window.NHSupabase.getAccessLogs(200);

    cachedAdminUsers = users || [];

    const total = cachedAdminUsers.length;
    const approved = cachedAdminUsers.filter(u => (u.status || '').toLowerCase() === 'approved').length;
    const pending = cachedAdminUsers.filter(u => (u.status || '').toLowerCase() === 'pending').length;
    const blocked = cachedAdminUsers.filter(u => (u.status || '').toLowerCase() === 'blocked').length;
    const totalLogins = logs.filter(l => l.event === 'LOGIN_SUCESSO').length;
    const totalAlerts = logs.filter(l => (l.event || '').includes('BLOQUEADO') || (l.event || '').includes('FALHA')).length;

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
    if (elLogins) elLogins.innerText = totalLogins;
    if (elAlerts) elAlerts.innerText = totalAlerts;

    renderAdminTable();
    renderAuditLogs(logs);
  }

  function renderAdminTable() {
    const tbody = document.getElementById('admin-users-table-body');
    if (!tbody) return;

    const searchTerm = (document.getElementById('admin-search-input')?.value || '').toLowerCase().trim();
    const statusFilter = document.getElementById('admin-status-filter')?.value || 'ALL';

    const filtered = cachedAdminUsers.filter(u => {
      const name = (u.full_name || u.name || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      const dealer = (u.dealership || '').toLowerCase();
      const matchSearch = !searchTerm || name.includes(searchTerm) || email.includes(searchTerm) || dealer.includes(searchTerm);

      const status = (u.status || '').toUpperCase();
      const matchStatus = statusFilter === 'ALL' || 
                          status === statusFilter || 
                          (statusFilter === 'APROVADO' && status === 'APPROVED') ||
                          (statusFilter === 'PENDENTE' && status === 'PENDING') ||
                          (statusFilter === 'BLOQUEADO' && status === 'BLOCKED') ||
                          (statusFilter === 'REPROVADO' && status === 'REJECTED');

      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-500 text-xs">Nenhum usuário encontrado com os filtros atuais.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(u => {
      const rawStatus = (u.status || 'pending').toLowerCase();
      const statusBadges = {
        approved: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-approved">APROVADO</span>`,
        pending: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-pending">PENDENTE</span>`,
        blocked: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-blocked">BLOQUEADO</span>`,
        rejected: `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold nh-badge-rejected">REPROVADO</span>`
      };

      const rawRole = (u.role || 'user').toLowerCase();
      const isMasterAdmin = u.email === 'admin@newholland.com' || rawRole === 'admin';
      const dateFormatted = u.created_at ? new Date(u.created_at).toLocaleDateString(activeLang === 'pt' ? 'pt-BR' : activeLang === 'es' ? 'es-ES' : 'en-US') : '-';
      const lastLoginFormatted = u.last_login ? new Date(u.last_login).toLocaleString(activeLang === 'pt' ? 'pt-BR' : activeLang === 'es' ? 'es-ES' : 'en-US') : 'Nunca acessou';
      const accessCount = u.access_count || 0;

      let actionBtns = '';
      if (!isMasterAdmin) {
        if (rawStatus === 'pending') {
          actionBtns += `
            <select id="role-select-${u.id}" class="bg-slate-800 text-slate-200 border border-slate-700 rounded px-1.5 py-1 text-xs mr-1 focus:outline-none cursor-pointer">
              <option value="user" ${rawRole !== 'admin' ? 'selected' : ''}>${tr('roleViewer') || 'Leitor'}</option>
              <option value="admin" ${rawRole === 'admin' ? 'selected' : ''}>${tr('roleAdmin') || 'Admin'}</option>
            </select>
            <button onclick="window.updateUserStatus('${u.id}', 'approved', document.getElementById('role-select-${u.id}').value)" class="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold mr-1 transition-colors">${tr('btnApprove')}</button>
            <button onclick="window.updateUserStatus('${u.id}', 'rejected')" class="px-2.5 py-1 rounded bg-slate-700/50 text-slate-300 hover:bg-slate-600 mr-1 transition-colors">${tr('btnReject')}</button>
          `;
        } else if (rawStatus === 'blocked' || rawStatus === 'rejected') {
          actionBtns += `<button onclick="window.updateUserStatus('${u.id}', 'approved')" class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black font-semibold mr-1 transition-colors">${tr('btnUnblock')}</button>`;
        } else if (rawStatus === 'approved') {
          actionBtns += `<button onclick="window.updateUserStatus('${u.id}', 'blocked')" class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white font-semibold mr-1 transition-colors">${tr('btnBlock')}</button>`;
        }
        actionBtns += `<button onclick="window.deleteUser('${u.id}')" class="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" title="${tr('btnDelete')}"><i class="fa-solid fa-trash-can"></i></button>`;
      } else {
        actionBtns = `<span class="text-[10px] font-semibold text-nhyellow-500">PROTEGIDO (ADMIN)</span>`;
      }

      return `
        <tr class="hover:bg-white/[0.02] transition-colors">
          <td class="py-3 px-3">
            <div class="font-semibold text-white">${escapeHtml(u.full_name || u.name || 'Usuário')}</div>
            <div class="text-[11px] text-slate-400">${escapeHtml(u.email)}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Acessos: <strong class="text-slate-300">${accessCount}</strong> • Último: <span class="text-slate-400">${lastLoginFormatted}</span></div>
          </td>
          <td class="py-3 px-3 text-slate-300">
            <div>${escapeHtml(u.dealership || '-')}</div>
            <div class="text-[11px] text-slate-500">${escapeHtml(u.cargo || u.role_title || u.jobTitle || '')}</div>
          </td>
          <td class="py-3 px-3 text-slate-400">${dateFormatted}</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${rawRole === 'admin' ? 'bg-nhyellow-500/20 text-nhyellow-500' : 'bg-slate-800 text-slate-400'}">${rawRole.toUpperCase()}</span>
          </td>
          <td class="py-3 px-3">${statusBadges[rawStatus] || rawStatus}</td>
          <td class="py-3 px-3 text-right whitespace-nowrap">${actionBtns}</td>
        </tr>
      `;
    }).join('');
  }

  function filterAdminUsers() {
    renderAdminTable();
  }

  async function updateUserStatus(userId, newStatus, newRole = null) {
    if (!window.NHSupabase) return;
    try {
      const res = await window.NHSupabase.updateUserStatus(userId, newStatus, newRole);
      if (!res.success) {
        alert('Erro ao atualizar status: ' + (res.error || 'Operação não autorizada.'));
        return;
      }
      await loadAdminData();
    } catch (err) {
      alert('Erro ao processar: ' + err.message);
    }
  }

  async function deleteUser(userId) {
    if (!confirm('Deseja realmente excluir o cadastro deste usuário?')) return;
    if (!window.NHSupabase) return;
    try {
      const res = await window.NHSupabase.deleteUserProfile(userId);
      if (!res.success) {
        alert('Erro ao excluir usuário: ' + (res.error || 'Operação não autorizada.'));
        return;
      }
      await loadAdminData();
    } catch (err) {
      alert('Erro ao excluir: ' + err.message);
    }
  }

  function switchAdminTab(tabName) {
    ['users', 'audit', 'backup'].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const content = document.getElementById(`admin-tab-${t}-content`) || document.getElementById(`admin-tab-${t}`);
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

  function renderAuditLogs(logs) {
    const box = document.getElementById('admin-audit-log-box');
    if (!box) return;
    if (!logs || logs.length === 0) {
      box.innerHTML = '<div class="text-slate-500 text-center py-4">Nenhum registro de auditoria disponível no Supabase.</div>';
      return;
    }

    box.innerHTML = logs.map(a => {
      const time = new Date(a.created_at || a.timestamp).toLocaleString();
      return `<div><span class="text-slate-500">[${time}]</span> <span class="text-nhyellow-500 font-bold">${escapeHtml(a.event || a.type)}</span>: <span class="text-slate-300">${escapeHtml(a.email || '')}</span> - <span class="text-slate-400">${escapeHtml(a.details || '')}</span></div>`;
    }).join('');
  }

  async function exportAuditCsv() {
    if (!window.NHSupabase) return;
    const logs = await window.NHSupabase.getAccessLogs(1000);
    const csvRows = ['Data/Hora,Evento,Usuario,Detalhes'];
    logs.forEach(a => {
      csvRows.push(`"${a.created_at}","${a.event}","${a.email}","${(a.details || '').replace(/"/g, '""')}"`);
    });
    downloadFile('nhce_audit_logs_supabase.csv', 'text/csv;charset=utf-8;', csvRows.join('\n'));
  }

  async function exportFullDatabaseJson() {
    if (!window.NHSupabase) return;
    const users = await window.NHSupabase.getAdminUsers();
    const logs = await window.NHSupabase.getAccessLogs(500);
    const data = {
      exportDate: new Date().toISOString(),
      system: 'NHCE LATAM PAN Training Platform (Supabase)',
      version: '3.0.0',
      users,
      logs
    };
    downloadFile('nhce_pan_database_backup.json', 'application/json;charset=utf-8;', JSON.stringify(data, null, 2));
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

  async function handleForgotPasswordSubmit(event) {
    if (event) event.preventDefault();
    const email = (document.getElementById('forgot-email')?.value || '').trim();
    if (!email) return;

    if (window.NHSupabase) {
      await window.NHSupabase.resetPassword(email);
    }
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
  window.exportFullDatabaseJson = exportFullDatabaseJson;
  window.loadAdminData = loadAdminData;

  /* Inicialização automática e verificação de sessão */
  async function bootPlatform() {
    applyTheme(activeTheme);
    setLanguage(activeLang);

    const savedEmail = localStorage.getItem('nh_remembered_email');
    if (savedEmail) {
      const emailInput = document.getElementById('login-email');
      const rememberCheckbox = document.getElementById('remember-email');
      if (emailInput) emailInput.value = savedEmail;
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    if (window.NHSupabase) {
      const sessionData = await window.NHSupabase.getCurrentSession();
      if (sessionData && sessionData.isApproved) {
        if (sessionData.isAdmin) {
          showView('view-admin');
        } else {
          showView('view-training');
        }
      } else {
        showView('view-login');
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
