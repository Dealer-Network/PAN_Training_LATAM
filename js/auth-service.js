/**
 * ============================================================================
 * PLATAFORMA CORPORATIVA NEW HOLLAND CONSTRUCTION (LATAM)
 * Serviço Central de Autenticação e Governança com Supabase Backend
 * ============================================================================
 */

(function(window) {
    'use strict';

    class AuthService {
        constructor() {
            this.maxAttempts = 5;
            this.sessionTimeoutHours = 8;
        }

        get client() {
            return window.NHSupabase;
        }

        // Gravação de Log de Auditoria
        async recordLog({ user_id, email, nome, evento, resultado, detalhes = '' }) {
            if (this.client) {
                return await this.client.recordLog({
                    userId: user_id,
                    email: email,
                    fullName: nome,
                    event: evento,
                    details: `${resultado ? '[' + resultado + '] ' : ''}${detalhes}`
                });
            }
        }

        // Obter logs para monitoramento
        async getLogs(limit = 100) {
            if (this.client) {
                return await this.client.getAccessLogs(limit);
            }
            return [];
        }

        // 1. CADASTRO DE NOVO USUÁRIO
        async register({ nome, email, empresa, cargo, senha }) {
            if (!this.client) {
                return { success: false, message: 'Serviço de autenticação indisponível.' };
            }

            const result = await this.client.signUp({
                email,
                password: senha,
                fullName: nome,
                dealership: empresa,
                cargo: cargo
            });

            if (!result.success) {
                return {
                    success: false,
                    message: result.error || 'Erro ao realizar cadastro.'
                };
            }

            return {
                success: true,
                message: 'Cadastro realizado com sucesso! Seu acesso está PENDENTE DE APROVAÇÃO pela equipe de Desenvolvimento de Rede NHCE.'
            };
        }

        // 2. LOGIN COM CONTROLE DE STATUS NO SUPABASE
        async login(email, senha) {
            if (!this.client) {
                return { success: false, message: 'Serviço de autenticação indisponível.' };
            }

            const result = await this.client.signIn({
                email,
                password: senha
            });

            if (!result.success) {
                return {
                    success: false,
                    status: result.status,
                    message: result.error || 'Falha ao autenticar usuário.'
                };
            }

            return {
                success: true,
                user: result.profile,
                session: result.session,
                message: 'Login realizado com sucesso!'
            };
        }

        // 3. CONTROLE E VALIDAÇÃO DE SESSÃO
        async getCurrentSession() {
            if (!this.client) return null;
            return await this.client.getCurrentSession();
        }

        // Encerrar Sessão (Logout)
        async logout(reason = 'LOGOUT_VOLUNTARIO') {
            if (this.client) {
                await this.client.signOut();
            }
            sessionStorage.clear();
            window.location.href = 'index.html';
        }

        // 4. AÇÕES ADMINISTRATIVAS
        async approveUser(userId, role = null) {
            if (!this.client) return { success: false, message: 'Cliente indisponível' };
            const res = await this.client.updateUserStatus(userId, 'approved', role);
            return res.success 
                ? { success: true, message: 'Usuário aprovado com sucesso!' }
                : { success: false, message: res.error || 'Erro ao aprovar usuário.' };
        }

        async rejectUser(userId) {
            if (!this.client) return { success: false, message: 'Cliente indisponível' };
            const res = await this.client.updateUserStatus(userId, 'rejected');
            return res.success 
                ? { success: true, message: 'Usuário reprovado com sucesso.' }
                : { success: false, message: res.error || 'Erro ao reprovar usuário.' };
        }

        async blockUser(userId) {
            if (!this.client) return { success: false, message: 'Cliente indisponível' };
            const res = await this.client.updateUserStatus(userId, 'blocked');
            return res.success 
                ? { success: true, message: 'Usuário bloqueado com sucesso.' }
                : { success: false, message: res.error || 'Erro ao bloquear usuário.' };
        }

        async unblockUser(userId) {
            if (!this.client) return { success: false, message: 'Cliente indisponível' };
            const res = await this.client.updateUserStatus(userId, 'approved');
            return res.success 
                ? { success: true, message: 'Usuário desbloqueado e reativado com sucesso!' }
                : { success: false, message: res.error || 'Erro ao desbloquear usuário.' };
        }

        async deleteUser(userId) {
            if (!this.client) return { success: false, message: 'Cliente indisponível' };
            const res = await this.client.deleteUserProfile(userId);
            return res.success 
                ? { success: true, message: 'Usuário excluído com sucesso!' }
                : { success: false, message: res.error || 'Erro ao excluir usuário.' };
        }

        async resetPassword(email) {
            if (!this.client) return { success: false, message: 'Cliente indisponível' };
            const res = await this.client.resetPassword(email);
            return res.success 
                ? { success: true, message: 'Instruções de redefinição de senha enviadas por e-mail.' }
                : { success: false, message: res.error || 'Erro ao solicitar redefinição.' };
        }

        // 5. MÉTRICAS E INDICADORES DO DASHBOARD
        async getMetrics() {
            if (!this.client) {
                return { total: 0, approved: 0, pending: 0, blocked: 0, rejected: 0, totalLogins: 0, totalAlerts: 0 };
            }

            const users = await this.client.getAdminUsers();
            const logs = await this.client.getAccessLogs(200);

            const total = users.length;
            const approved = users.filter(u => (u.status || '').toLowerCase() === 'approved').length;
            const pending = users.filter(u => (u.status || '').toLowerCase() === 'pending').length;
            const blocked = users.filter(u => (u.status || '').toLowerCase() === 'blocked').length;
            const rejected = users.filter(u => (u.status || '').toLowerCase() === 'rejected').length;

            const totalLogins = logs.filter(l => l.event === 'LOGIN_SUCESSO').length;
            const totalAlerts = logs.filter(l => (l.event || '').includes('BLOQUEADO') || (l.event || '').includes('FALHA')).length;

            return {
                total,
                approved,
                pending,
                blocked,
                rejected,
                totalLogins,
                totalAlerts,
                users,
                recentLogs: logs.slice(0, 50)
            };
        }
    }

    window.NHAuthService = new AuthService();

})(window);
