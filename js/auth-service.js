/**
 * ============================================================================
 * PLATAFORMA CORPORATIVA NEW HOLLAND CONSTRUCTION (LATAM)
 * Serviço Central de Autenticação, Banco de Dados, Tentativas e Auditoria
 * ============================================================================
 */

(function(window) {
    'use strict';

    const DB_KEYS = {
        USERS: 'nhce_pan_users_db',
        LOGS: 'nhce_pan_access_logs',
        SESSION: 'nhce_pan_active_session',
        CONFIG: 'nhce_pan_sys_config'
    };

    // Função de Hash Criptográfico Seguro SHA-256 via Web Crypto API
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message + '_NHCE_PAN_LATAM_SALT_2026');
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    class AuthService {
        constructor() {
            this.maxAttempts = 5;
            this.sessionTimeoutHours = 8;
            this.initDatabase();
        }

        // Inicializa banco de dados com estrutura padrão e administrador inicial
        async initDatabase() {
            if (!localStorage.getItem(DB_KEYS.USERS)) {
                const defaultAdminPassHash = await sha256('Admin@NHCE2026!');
                const initialUsers = [
                    {
                        id: 'usr_admin_001',
                        nome: 'Administrador NHCE LATAM',
                        email: 'admin@newholland.com',
                        empresa: 'New Holland Construction - Dealer Development',
                        senhaHash: defaultAdminPassHash,
                        status: 'APROVADO',
                        role: 'ADMIN',
                        failed_login_attempts: 0,
                        blocked_at: null,
                        created_at: new Date().toISOString(),
                        approved_at: new Date().toISOString(),
                        last_login: null
                    }
                ];
                localStorage.setItem(DB_KEYS.USERS, JSON.stringify(initialUsers));
                
                this.recordLog({
                    user_id: 'usr_admin_001',
                    email: 'admin@newholland.com',
                    nome: 'Administrador NHCE LATAM',
                    evento: 'SISTEMA_INICIALIZADO',
                    resultado: 'SUCESSO',
                    detalhes: 'Base de dados inicializada com usuário administrador padrão'
                });
            }

            if (!localStorage.getItem(DB_KEYS.LOGS)) {
                localStorage.setItem(DB_KEYS.LOGS, JSON.stringify([]));
            }
        }

        // Obter todos os usuários do banco
        getUsersFromDB() {
            try {
                return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
            } catch (e) {
                console.error('Erro ao ler base de usuários:', e);
                return [];
            }
        }

        // Salvar usuários no banco
        saveUsersToDB(users) {
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
        }

        // Gravação de Log de Auditoria
        recordLog({ user_id, email, nome, evento, resultado, detalhes = '' }) {
            try {
                const logs = JSON.parse(localStorage.getItem(DB_KEYS.LOGS) || '[]');
                const newLog = {
                    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                    user_id: user_id || 'ANONIMO',
                    email: email || 'N/A',
                    nome: nome || 'Visitante',
                    evento: evento,
                    resultado: resultado,
                    dataHora: new Date().toISOString(),
                    sessao: sessionStorage.getItem('nh_session_id') || 'SESS_' + Date.now(),
                    detalhes: detalhes
                };
                logs.unshift(newLog); // Mais recentes primeiro
                // Mantém até 5000 logs em histórico
                if (logs.length > 5000) logs.pop();
                localStorage.setItem(DB_KEYS.LOGS, JSON.stringify(logs));
                return newLog;
            } catch (e) {
                console.error('Erro ao registrar log de auditoria:', e);
            }
        }

        // Obter logs para monitoramento
        getLogs(limit = 100) {
            try {
                const logs = JSON.parse(localStorage.getItem(DB_KEYS.LOGS) || '[]');
                return logs.slice(0, limit);
            } catch (e) {
                return [];
            }
        }

        // 1. CADASTRO DE NOVO USUÁRIO
        async register({ nome, email, empresa, senha }) {
            const cleanEmail = email.trim().toLowerCase();
            const users = this.getUsersFromDB();

            // Validação de duplicidade por e-mail
            const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
            if (existingUser) {
                return {
                    success: false,
                    message: 'Este e-mail corporativo já possui cadastro no sistema. Se esqueceu sua senha, solicite a redefinição.'
                };
            }

            const senhaHash = await sha256(senha);
            const newUser = {
                id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                nome: nome.trim(),
                email: cleanEmail,
                empresa: empresa.trim(),
                senhaHash: senhaHash,
                status: 'PENDENTE',
                role: 'USER',
                failed_login_attempts: 0,
                blocked_at: null,
                created_at: new Date().toISOString(),
                approved_at: null,
                last_login: null
            };

            users.push(newUser);
            this.saveUsersToDB(users);

            this.recordLog({
                user_id: newUser.id,
                email: newUser.email,
                nome: newUser.nome,
                evento: 'CADASTRO_CRIADO',
                resultado: 'SUCESSO',
                detalhes: `Novo usuário registrado para ${newUser.empresa}. Status inicial: PENDENTE`
            });

            return {
                success: true,
                message: 'Cadastro realizado com sucesso! Seu acesso está PENDENTE DE APROVAÇÃO pela equipe de Desenvolvimento de Rede NHCE.'
            };
        }

        // 2. LOGIN COM LIMITE DE 5 TENTATIVAS NO BANCO DE DADOS
        async login(email, senha) {
            const cleanEmail = email.trim().toLowerCase();
            const users = this.getUsersFromDB();
            const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);

            // Caso o usuário não exista
            if (userIndex === -1) {
                this.recordLog({
                    user_id: 'INEXISTENTE',
                    email: cleanEmail,
                    nome: 'Desconhecido',
                    evento: 'LOGIN_FALHA',
                    resultado: 'FALHA',
                    detalhes: 'Tentativa de login com e-mail não cadastrado.'
                });
                return {
                    success: false,
                    type: 'USER_NOT_FOUND',
                    message: 'E-mail corporativo não encontrado. Por favor, crie seu cadastro.'
                };
            }

            const user = users[userIndex];

            // 1. Verificar se usuário já está BLOQUEADO
            if (user.status === 'BLOQUEADO') {
                this.recordLog({
                    user_id: user.id,
                    email: user.email,
                    nome: user.nome,
                    evento: 'LOGIN_BLOQUEADO',
                    resultado: 'ALERTA',
                    detalhes: 'Usuário bloqueado tentou realizar login.'
                });
                return {
                    success: false,
                    type: 'USER_BLOCKED',
                    message: 'Sua conta está BLOQUEADA devido a 5 tentativas incorretas consecutivas. Entre em contato com dealerdevelopmentnhce@newholland.com para solicitar o desbloqueio.'
                };
            }

            // 2. Verificar se usuário está PENDENTE
            if (user.status === 'PENDENTE') {
                this.recordLog({
                    user_id: user.id,
                    email: user.email,
                    nome: user.nome,
                    evento: 'LOGIN_PENDENTE',
                    resultado: 'ALERTA',
                    detalhes: 'Usuário com cadastro pendente tentou realizar login.'
                });
                return {
                    success: false,
                    type: 'USER_PENDING',
                    message: 'Seu cadastro está em análise (Status: PENDENTE). O acesso será liberado após aprovação da equipe Dealer Development NHCE.'
                };
            }

            // 3. Verificar se usuário está REPROVADO
            if (user.status === 'REPROVADO') {
                this.recordLog({
                    user_id: user.id,
                    email: user.email,
                    nome: user.nome,
                    evento: 'LOGIN_REPROVADO',
                    resultado: 'FALHA',
                    detalhes: 'Usuário com cadastro reprovado tentou realizar login.'
                });
                return {
                    success: false,
                    type: 'USER_REJECTED',
                    message: 'Acesso não autorizado para esta conta. Entre em contato com a equipe de Desenvolvimento de Rede NHCE.'
                };
            }

            // 4. Validar Senha
            const inputHash = await sha256(senha);
            if (inputHash !== user.senhaHash) {
                user.failed_login_attempts = (user.failed_login_attempts || 0) + 1;

                // Regra de 5 tentativas consecutivas
                if (user.failed_login_attempts >= this.maxAttempts) {
                    user.status = 'BLOQUEADO';
                    user.blocked_at = new Date().toISOString();
                    users[userIndex] = user;
                    this.saveUsersToDB(users);

                    this.recordLog({
                        user_id: user.id,
                        email: user.email,
                        nome: user.nome,
                        evento: 'USUARIO_BLOQUEADO_TENTATIVAS',
                        resultado: 'FALHA',
                        detalhes: `Conta bloqueada automaticamente após 5 tentativas de senha incorretas.`
                    });

                    return {
                        success: false,
                        type: 'USER_BLOCKED_NOW',
                        message: '⛔ CONTA BLOQUEADA: Você atingiu o limite de 5 tentativas consecutivas de senha incorreta. Sua conta foi bloqueada por segurança. Solicite o desbloqueio ao Administrador.'
                    };
                }

                // Salvar incremento de falhas no banco
                users[userIndex] = user;
                this.saveUsersToDB(users);

                const remaining = this.maxAttempts - user.failed_login_attempts;
                const isLastAttempt = remaining === 1;

                this.recordLog({
                    user_id: user.id,
                    email: user.email,
                    nome: user.nome,
                    evento: 'LOGIN_FALHA_SENHA',
                    resultado: 'FALHA',
                    detalhes: `Senha incorreta. Tentativa ${user.failed_login_attempts} de 5.`
                });

                return {
                    success: false,
                    type: 'PASSWORD_INCORRECT',
                    attempts: user.failed_login_attempts,
                    remaining: remaining,
                    message: isLastAttempt
                        ? `⚠️ ATENÇÃO: Senha incorreta! Esta é sua ÚLTIMA tentativa antes do BLOQUEIO da conta.`
                        : `Senha incorreta. Tentativa ${user.failed_login_attempts} de 5 (${remaining} tentativas restantes).`
                };
            }

            // 5. Sucesso de Autenticação (Aprovado + Senha Correta)
            user.failed_login_attempts = 0;
            user.last_login = new Date().toISOString();
            users[userIndex] = user;
            this.saveUsersToDB(users);

            // Gerar Token de Sessão
            const sessionData = {
                sessionId: 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                userId: user.id,
                nome: user.nome,
                email: user.email,
                empresa: user.empresa,
                role: user.role,
                status: user.status,
                loginTime: new Date().toISOString(),
                expiresAt: new Date(Date.now() + this.sessionTimeoutHours * 60 * 60 * 1000).toISOString()
            };

            sessionStorage.setItem(DB_KEYS.SESSION, JSON.stringify(sessionData));
            sessionStorage.setItem('nh_session_id', sessionData.sessionId);

            this.recordLog({
                user_id: user.id,
                email: user.email,
                nome: user.nome,
                evento: 'LOGIN_SUCESSO',
                resultado: 'SUCESSO',
                detalhes: `Sessão iniciada com sucesso. Role: ${user.role}`
            });

            return {
                success: true,
                user: sessionData,
                message: 'Login realizado com sucesso!'
            };
        }

        // 3. CONTROLE E VALIDAÇÃO DE SESSÃO
        getCurrentSession() {
            try {
                const sessionStr = sessionStorage.getItem(DB_KEYS.SESSION);
                if (!sessionStr) return null;
                const session = JSON.parse(sessionStr);

                // Checar expiração
                if (new Date() > new Date(session.expiresAt)) {
                    this.logout('SESSAO_EXPIRADA');
                    return null;
                }

                // Validar status atualizado no banco de dados
                const users = this.getUsersFromDB();
                const freshUser = users.find(u => u.id === session.userId);
                if (!freshUser || freshUser.status !== 'APROVADO') {
                    this.logout('STATUS_ALTERADO');
                    return null;
                }

                return session;
            } catch (e) {
                return null;
            }
        }

        // Encerrar Sessão (Logout)
        logout(reason = 'LOGOUT_VOLUNTARIO') {
            const session = this.getCurrentSession();
            if (session) {
                this.recordLog({
                    user_id: session.userId,
                    email: session.email,
                    nome: session.nome,
                    evento: 'LOGOUT',
                    resultado: 'SUCESSO',
                    detalhes: `Sessão encerrada. Motivo: ${reason}`
                });
            }
            sessionStorage.removeItem(DB_KEYS.SESSION);
            sessionStorage.removeItem('nh_session_id');
            window.location.href = 'index.html';
        }

        // 4. AÇÕES ADMINISTRATIVAS (APROVAR, REPROVAR, BLOQUEAR, DESBLOQUEAR)
        approveUser(userId) {
            const users = this.getUsersFromDB();
            const index = users.findIndex(u => u.id === userId);
            if (index === -1) return { success: false, message: 'Usuário não encontrado' };

            users[index].status = 'APROVADO';
            users[index].approved_at = new Date().toISOString();
            users[index].failed_login_attempts = 0;
            this.saveUsersToDB(users);

            this.recordLog({
                user_id: userId,
                email: users[index].email,
                nome: users[index].nome,
                evento: 'USUARIO_APROVADO',
                resultado: 'SUCESSO',
                detalhes: `Usuário aprovado pelo Administrador.`
            });

            return { success: true, message: 'Usuário aprovado com sucesso!' };
        }

        rejectUser(userId) {
            const users = this.getUsersFromDB();
            const index = users.findIndex(u => u.id === userId);
            if (index === -1) return { success: false, message: 'Usuário não encontrado' };

            users[index].status = 'REPROVADO';
            this.saveUsersToDB(users);

            this.recordLog({
                user_id: userId,
                email: users[index].email,
                nome: users[index].nome,
                evento: 'USUARIO_REPROVADO',
                resultado: 'SUCESSO',
                detalhes: `Usuário reprovado pelo Administrador.`
            });

            return { success: true, message: 'Usuário reprovado com sucesso.' };
        }

        blockUser(userId) {
            const users = this.getUsersFromDB();
            const index = users.findIndex(u => u.id === userId);
            if (index === -1) return { success: false, message: 'Usuário não encontrado' };

            users[index].status = 'BLOQUEADO';
            users[index].blocked_at = new Date().toISOString();
            this.saveUsersToDB(users);

            this.recordLog({
                user_id: userId,
                email: users[index].email,
                nome: users[index].nome,
                evento: 'USUARIO_BLOQUEADO_ADMIN',
                resultado: 'SUCESSO',
                detalhes: `Usuário bloqueado manualmente pelo Administrador.`
            });

            return { success: true, message: 'Usuário bloqueado com sucesso.' };
        }

        async unblockUser(userId, novaSenha = null) {
            const users = this.getUsersFromDB();
            const index = users.findIndex(u => u.id === userId);
            if (index === -1) return { success: false, message: 'Usuário não encontrado' };

            users[index].status = 'APROVADO';
            users[index].blocked_at = null;
            users[index].failed_login_attempts = 0;

            if (novaSenha) {
                users[index].senhaHash = await sha256(novaSenha);
            }

            this.saveUsersToDB(users);

            this.recordLog({
                user_id: userId,
                email: users[index].email,
                nome: users[index].nome,
                evento: 'USUARIO_DESBLOQUEADO',
                resultado: 'SUCESSO',
                detalhes: novaSenha ? 'Usuário desbloqueado com redefinição de senha.' : 'Usuário desbloqueado e tentativas zeradas.'
            });

            return { success: true, message: 'Usuário desbloqueado e reativado com sucesso!' };
        }

        async resetPassword(email, novaSenha) {
            const cleanEmail = email.trim().toLowerCase();
            const users = this.getUsersFromDB();
            const index = users.findIndex(u => u.email.toLowerCase() === cleanEmail);
            if (index === -1) return { success: false, message: 'E-mail não cadastrado.' };

            users[index].senhaHash = await sha256(novaSenha);
            users[index].failed_login_attempts = 0;
            this.saveUsersToDB(users);

            this.recordLog({
                user_id: users[index].id,
                email: cleanEmail,
                nome: users[index].nome,
                evento: 'SENHA_REDEFINIDA',
                resultado: 'SUCESSO',
                detalhes: 'Senha redefinida com sucesso.'
            });

            return { success: true, message: 'Senha redefinida com sucesso!' };
        }

        // 5. MÉTRICAS E INDICADORES DO DASHBOARD
        getMetrics() {
            const users = this.getUsersFromDB();
            const logs = this.getLogs(500);

            const total = users.length;
            const approved = users.filter(u => u.status === 'APROVADO').length;
            const pending = users.filter(u => u.status === 'PENDENTE').length;
            const blocked = users.filter(u => u.status === 'BLOQUEADO').length;
            const rejected = users.filter(u => u.status === 'REPROVADO').length;

            const totalLogins = logs.filter(l => l.evento === 'LOGIN_SUCESSO').length;
            const totalAttemptsFailed = logs.filter(l => l.evento.includes('LOGIN_FALHA')).length;

            return {
                total,
                approved,
                pending,
                blocked,
                rejected,
                totalLogins,
                totalAttemptsFailed,
                recentLogs: logs.slice(0, 15)
            };
        }
    }

    // Instanciação Global
    window.NHAuthService = new AuthService();

})(window);
