/**
 * ============================================================================
 * PLATAFORMA CORPORATIVA NEW HOLLAND CONSTRUCTION (LATAM)
 * Cliente Central de Integração com Supabase (Auth + RLS + Auditoria)
 * ============================================================================
 */

(function(window) {
    'use strict';

    const SUPABASE_CONFIG = {
        URL: 'https://tghzcprzjysrbdxhvdlu.supabase.co',
        PUBLISHABLE_KEY: 'sb_publishable_Ef2Rn59cywyibuxSupS5XQ_TMXNu3T1'
    };

    let clientInstance = null;

    function getSupabase() {
        if (!clientInstance) {
            if (window.supabase && typeof window.supabase.createClient === 'function') {
                clientInstance = window.supabase.createClient(
                    SUPABASE_CONFIG.URL,
                    SUPABASE_CONFIG.PUBLISHABLE_KEY,
                    {
                        auth: {
                            persistSession: true,
                            autoRefreshToken: true,
                            detectSessionInUrl: true
                        }
                    }
                );
            } else {
                console.error('[Supabase Client] SDK do Supabase não carregado no window.');
            }
        }
        return clientInstance;
    }

    const NHSupabase = {
        config: SUPABASE_CONFIG,

        getClient() {
            return getSupabase();
        },

        // 1. REGISTRO DE NOVO USUÁRIO (AUTH + PROFILE 'pending')
        async signUp({ email, password, fullName, dealership, cargo, roleTitle }) {
            const sb = getSupabase();
            if (!sb) throw new Error('Cliente Supabase não inicializado.');

            const cleanEmail = (email || '').trim().toLowerCase();
            const cleanName = (fullName || '').trim();
            const cleanDealer = (dealership || '').trim();
            const cleanCargo = (cargo || roleTitle || '').trim();

            const { data, error } = await sb.auth.signUp({
                email: cleanEmail,
                password: password,
                options: {
                    data: {
                        full_name: cleanName,
                        dealership: cleanDealer,
                        cargo: cleanCargo,
                        role: 'user',
                        status: 'pending'
                    }
                }
            });

            if (error) {
                return { success: false, error: error.message };
            }

            const user = data.user;
            if (user) {
                // Tenta garantir a inserção/upsert na tabela profiles caso a trigger não tenha rodado
                try {
                    await sb.from('profiles').upsert({
                        id: user.id,
                        full_name: cleanName,
                        email: cleanEmail,
                        dealership: cleanDealer,
                        cargo: cleanCargo,
                        role: 'user',
                        status: 'pending',
                        created_at: new Date().toISOString()
                    }, { onConflict: 'id' });
                } catch (profileErr) {
                    console.warn('[Supabase] Falha ao upsert profile (pode ter sido criado por trigger):', profileErr);
                }

                // Registrar log de novo cadastro
                await this.recordLog({
                    userId: user.id,
                    email: cleanEmail,
                    fullName: cleanName,
                    event: 'CADASTRO_SOLICITADO',
                    details: `Solicitação de acesso criada para ${cleanDealer}. Status: PENDENTE`
                });
            }

            return {
                success: true,
                user: data.user,
                session: data.session,
                message: 'Cadastro solicitado com sucesso! Seu acesso está em análise pela equipe de Desenvolvimento de Rede NHCE.'
            };
        },

        // 2. LOGIN COM SENHA
        async signIn({ email, password }) {
            const sb = getSupabase();
            if (!sb) throw new Error('Cliente Supabase não inicializado.');

            const cleanEmail = (email || '').trim().toLowerCase();

            const { data, error } = await sb.auth.signInWithPassword({
                email: cleanEmail,
                password: password
            });

            if (error) {
                await this.recordLog({
                    userId: null,
                    email: cleanEmail,
                    fullName: 'Desconhecido',
                    event: 'LOGIN_FALHA',
                    details: `Falha de autenticação: ${error.message}`
                });
                return { success: false, error: error.message };
            }

            const user = data.user;
            const profile = await this.getProfile(user.id);

            // Normalizar status e role em minúsculo
            const status = (profile?.status || user.user_metadata?.status || 'pending').toLowerCase();
            const role = (profile?.role || user.user_metadata?.role || 'user').toLowerCase();

            // 1. Se estiver BLOQUEADO
            if (status === 'blocked') {
                await sb.auth.signOut();
                await this.recordLog({
                    userId: user.id,
                    email: cleanEmail,
                    fullName: profile?.full_name || 'Usuário',
                    event: 'LOGIN_BLOQUEADO',
                    details: 'Tentativa de acesso por usuário com status bloqueado.'
                });
                return {
                    success: false,
                    status: 'blocked',
                    error: 'Sua conta está BLOQUEADA por segurança. Entre em contato com dealerdevelopmentnhce@newholland.com para solicitar o desbloqueio.'
                };
            }

            // 2. Se estiver PENDENTE
            if (status === 'pending') {
                await sb.auth.signOut();
                await this.recordLog({
                    userId: user.id,
                    email: cleanEmail,
                    fullName: profile?.full_name || 'Usuário',
                    event: 'LOGIN_PENDENTE',
                    details: 'Tentativa de acesso por usuário com cadastro pendente de aprovação.'
                });
                return {
                    success: false,
                    status: 'pending',
                    error: 'Seu cadastro está em análise pela equipe de Desenvolvimento de Rede (Status: PENDENTE). Aguarde a liberação do acesso.'
                };
            }

            // 3. Se estiver REPROVADO
            if (status === 'rejected') {
                await sb.auth.signOut();
                await this.recordLog({
                    userId: user.id,
                    email: cleanEmail,
                    fullName: profile?.full_name || 'Usuário',
                    event: 'LOGIN_REPROVADO',
                    details: 'Tentativa de acesso por usuário reprovado.'
                });
                return {
                    success: false,
                    status: 'rejected',
                    error: 'Sua solicitação de acesso não foi autorizada. Em caso de dúvidas, consulte a equipe Dealer Development.'
                };
            }

            // 4. Se estiver APROVADO
            if (status === 'approved') {
                // Atualizar último login e contagem de acessos
                try {
                    const currentCount = profile?.access_count || 0;
                    await sb.from('profiles').update({
                        last_login: new Date().toISOString(),
                        access_count: currentCount + 1
                    }).eq('id', user.id);
                } catch (e) {
                    console.warn('[Supabase] Falha ao atualizar last_login:', e);
                }

                await this.recordLog({
                    userId: user.id,
                    email: cleanEmail,
                    fullName: profile?.full_name || 'Usuário',
                    event: 'LOGIN_SUCESSO',
                    details: `Login autorizado com perfil ${role}.`
                });

                return {
                    success: true,
                    user: user,
                    session: data.session,
                    profile: profile || {
                        id: user.id,
                        full_name: user.user_metadata?.full_name || 'Colaborador',
                        email: cleanEmail,
                        dealership: user.user_metadata?.dealership || 'Rede NHCE',
                        cargo: user.user_metadata?.cargo || '',
                        role: role,
                        status: 'approved'
                    }
                };
            }

            return {
                success: false,
                status: status,
                error: 'Status de acesso não identificado. Contate o suporte.'
            };
        },

        // 3. OBTER SESSÃO ATUAL E VERIFICAR STATUS
        async getCurrentSession() {
            const sb = getSupabase();
            if (!sb) return null;

            try {
                const { data: { session }, error } = await sb.auth.getSession();
                if (error || !session || !session.user) return null;

                const profile = await this.getProfile(session.user.id);
                const status = (profile?.status || session.user.user_metadata?.status || 'pending').toLowerCase();
                const role = (profile?.role || session.user.user_metadata?.role || 'user').toLowerCase();

                return {
                    session,
                    user: session.user,
                    profile,
                    status,
                    role,
                    isApproved: status === 'approved',
                    isAdmin: role === 'admin' && status === 'approved'
                };
            } catch (e) {
                console.error('[Supabase] Erro ao recuperar sessão:', e);
                return null;
            }
        },

        // 4. LOGOUT
        async signOut() {
            const sb = getSupabase();
            if (!sb) return;

            try {
                const { data: { session } } = await sb.auth.getSession();
                if (session && session.user) {
                    await this.recordLog({
                        userId: session.user.id,
                        email: session.user.email,
                        fullName: session.user.user_metadata?.full_name || 'Usuário',
                        event: 'LOGOUT',
                        details: 'Sessão encerrada voluntariamente.'
                    });
                }
            } catch (e) {}

            await sb.auth.signOut();
        },

        // 5. OBTER PERFIL DO USUÁRIO
        async getProfile(userId) {
            const sb = getSupabase();
            if (!sb || !userId) return null;

            try {
                const { data, error } = await sb
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .maybeSingle();

                if (error) {
                    console.warn('[Supabase] Erro ao buscar profile:', error.message);
                    return null;
                }
                return data;
            } catch (e) {
                console.error('[Supabase] Falha ao consultar profiles:', e);
                return null;
            }
        },

        // 6. GESTÃO ADMINISTRATIVA: LISTAR TODOS OS USUÁRIOS
        async getAdminUsers() {
            const sb = getSupabase();
            if (!sb) return [];

            try {
                const { data, error } = await sb
                    .from('profiles')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('[Supabase Admin] Erro ao listar usuários:', error);
                    return [];
                }
                return data || [];
            } catch (e) {
                console.error('[Supabase Admin] Falha ao buscar lista de usuários:', e);
                return [];
            }
        },

        // 7. GESTÃO ADMINISTRATIVA: ATUALIZAR STATUS E PERFIL DE USUÁRIO
        async updateUserStatus(userId, newStatus, newRole = null) {
            const sb = getSupabase();
            if (!sb) throw new Error('Cliente Supabase não inicializado.');

            const updates = {
                status: newStatus.toLowerCase()
            };

            if (newStatus.toLowerCase() === 'approved') {
                updates.approved_at = new Date().toISOString();
            }

            if (newRole) {
                updates.role = newRole.toLowerCase();
            }

            const { data, error } = await sb
                .from('profiles')
                .update(updates)
                .eq('id', userId)
                .select();

            if (error) {
                console.error('[Supabase Admin] Erro ao atualizar status:', error);
                return { success: false, error: error.message };
            }

            // Registrar log de auditoria da alteração
            const targetUser = data && data[0] ? data[0] : null;
            await this.recordLog({
                userId: userId,
                email: targetUser?.email || 'N/A',
                fullName: targetUser?.full_name || 'Usuário',
                event: 'STATUS_ALTERADO_ADM',
                details: `Status alterado para ${newStatus.toUpperCase()}${newRole ? ' com perfil ' + newRole : ''} pelo Administrador.`
            });

            return { success: true, user: targetUser };
        },

        // 8. GESTÃO ADMINISTRATIVA: EXCLUIR PERFIL
        async deleteUserProfile(userId) {
            const sb = getSupabase();
            if (!sb) throw new Error('Cliente Supabase não inicializado.');

            const { error } = await sb
                .from('profiles')
                .delete()
                .eq('id', userId);

            if (error) {
                console.error('[Supabase Admin] Erro ao excluir usuário:', error);
                return { success: false, error: error.message };
            }

            await this.recordLog({
                userId: userId,
                email: 'N/A',
                fullName: 'Usuário',
                event: 'USUARIO_EXCLUIDO_ADM',
                details: `Registro de usuário excluído pelo Administrador.`
            });

            return { success: true };
        },

        // 9. AUDITORIA: REGISTRAR EVENTO DE LOG
        async recordLog({ userId = null, email = '', fullName = '', event = 'INFO', details = '' }) {
            const sb = getSupabase();
            if (!sb) return;

            try {
                await sb.from('access_logs').insert({
                    user_id: userId,
                    email: (email || '').toLowerCase(),
                    full_name: fullName || 'Visitante',
                    event: event,
                    details: details,
                    created_at: new Date().toISOString()
                });
            } catch (e) {
                console.warn('[Supabase Log] Falha ao registrar log de auditoria:', e);
            }
        },

        // 10. AUDITORIA: LISTAR LOGS DE ACESSO (PAINEL ADM)
        async getAccessLogs(limit = 100) {
            const sb = getSupabase();
            if (!sb) return [];

            try {
                const { data, error } = await sb
                    .from('access_logs')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(limit);

                if (error) {
                    console.error('[Supabase Admin] Erro ao buscar logs:', error);
                    return [];
                }
                return data || [];
            } catch (e) {
                console.error('[Supabase Admin] Falha ao consultar access_logs:', e);
                return [];
            }
        },

        // 11. RECUPERAÇÃO DE SENHA VIA SUPABASE AUTH
        async resetPassword(email) {
            const sb = getSupabase();
            if (!sb) throw new Error('Cliente Supabase não inicializado.');

            const cleanEmail = (email || '').trim().toLowerCase();
            const redirectTo = window.location.origin + window.location.pathname;

            const { data, error } = await sb.auth.resetPasswordForEmail(cleanEmail, {
                redirectTo: redirectTo
            });

            if (error) {
                return { success: false, error: error.message };
            }

            await this.recordLog({
                userId: null,
                email: cleanEmail,
                fullName: 'Solicitante',
                event: 'RECUPERACAO_SENHA',
                details: 'Link de recuperação de senha solicitado via e-mail.'
            });

            return { success: true, data };
        },

        // 12. RESET ADMINISTRATIVO DE SENHA (VIA SUPABASE EDGE FUNCTION)
        async adminResetPassword({ userId, newPassword }) {
            const sb = getSupabase();
            if (!sb) throw new Error('Cliente Supabase não inicializado.');

            try {
                const { data: { session }, error: sessionError } = await sb.auth.getSession();
                if (sessionError || !session || !session.access_token) {
                    return { success: false, error: 'Sessão administrativa não identificada ou expirada.' };
                }

                const token = session.access_token;
                let resultData = null;
                let resultError = null;

                // Tentar invocar via Supabase Functions SDK
                if (sb.functions && typeof sb.functions.invoke === 'function') {
                    const { data, error } = await sb.functions.invoke('admin-reset-password', {
                        body: { userId, newPassword },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    resultData = data;
                    resultError = error;
                } else {
                    // Fallback nativo via Fetch HTTPS caso o bundle SDK não contenha functions
                    const res = await fetch(`${SUPABASE_CONFIG.URL}/functions/v1/admin-reset-password`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'apikey': SUPABASE_CONFIG.PUBLISHABLE_KEY
                        },
                        body: JSON.stringify({ userId, newPassword })
                    });
                    const resJson = await res.json().catch(() => ({}));
                    if (!res.ok) {
                        resultError = new Error(resJson.error || `HTTP ${res.status}`);
                    } else {
                        resultData = resJson;
                    }
                }

                if (resultError) {
                    const msg = resultError.message || (typeof resultError === 'string' ? resultError : 'Falha na comunicação com o servidor.');
                    return { success: false, error: msg };
                }

                if (resultData && resultData.error) {
                    return { success: false, error: resultData.error };
                }

                return {
                    success: true,
                    message: resultData?.message || 'Senha redefinida com sucesso. Informe a nova senha ao usuário por outro canal.'
                };
            } catch (err) {
                return { success: false, error: err.message || 'Erro inesperado ao redefinir senha.' };
            }
        }
    };

    window.NHSupabase = NHSupabase;

})(window);
