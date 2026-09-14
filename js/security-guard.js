/**
 * ============================================================================
 * PLATAFORMA CORPORATIVA NEW HOLLAND CONSTRUCTION (LATAM)
 * Guardião de Segurança de Rotas, Controle de Acesso e Proteção de Front-end
 * ============================================================================
 */

(function(window) {
    'use strict';

    // 1. PROTEÇÃO CONTRA INSPEÇÃO CASUAL (F12, DevTools, Botão Direito)
    function applyCasualProtections() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        }, { capture: true });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, { capture: true });

        try {
            console.clear();
            console.log(
                '%c[NHCE LATAM - SEGURANÇA CORPORATIVA]%c Plataforma corporativa protegida com autenticação e auditoria Supabase.',
                'background: #FFCC00; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
                'color: #94A3B8; font-size: 11px;'
            );
        } catch (err) {}
    }

    // 2. GUARDIÃO DE ACESSO AO TREINAMENTO
    async function protectTrainingPage() {
        if (!window.NHSupabase) {
            window.location.href = 'index.html';
            return;
        }

        const sessionData = await window.NHSupabase.getCurrentSession();

        if (!sessionData || !sessionData.isApproved) {
            window.location.href = 'index.html';
            return;
        }

        await window.NHSupabase.recordLog({
            userId: sessionData.user.id,
            email: sessionData.user.email,
            fullName: sessionData.profile?.full_name || 'Colaborador',
            event: 'ACESSO_TREINAMENTO',
            details: 'Acesso liberado ao ambiente interativo de capacitação PAN.'
        });

        document.addEventListener('DOMContentLoaded', function() {
            renderTrainingSessionBar(sessionData);
        });
    }

    function renderTrainingSessionBar(sessionData) {
        if (document.getElementById('nh-session-topbar')) return;

        const profile = sessionData.profile || {};
        const userName = profile.full_name || sessionData.user?.email || 'Usuário Conectado';
        const userDealer = profile.dealership || 'Rede Concessionários';
        const isAdmin = sessionData.isAdmin;

        const bar = document.createElement('div');
        bar.id = 'nh-session-topbar';
        bar.className = 'nh-session-bar';
        bar.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981;"></span>
                <span style="color: #94A3B8;">Usuário Conectado:</span>
                <strong style="color: #F8FAFC;">${escapeHtml(userName)}</strong>
                <span style="color: #64748B;">•</span>
                <span style="color: #FFCC00; font-size: 0.75rem;">${escapeHtml(userDealer)}</span>
                ${isAdmin ? '<button type="button" onclick="if(window.showView) window.showView(\'view-admin\');" style="background: rgba(255,204,0,0.2); border: 1px solid #FFCC00; color: #FFCC00; font-size: 0.7rem; font-weight: bold; padding: 2px 8px; border-radius: 4px; cursor: pointer; margin-left: 8px;"><i class="fa-solid fa-shield-halved"></i> PAINEL ADM</button>' : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="color: #64748B; font-size: 0.75rem;"><i class="fa-solid fa-lock"></i> Supabase Auth Ativo</span>
                <button id="nh-btn-logout-top" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #F87171; font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; transition: all 0.2s;">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Sair
                </button>
            </div>
        `;

        document.body.insertBefore(bar, document.body.firstChild);

        const logoutBtn = document.getElementById('nh-btn-logout-top');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async function() {
                if (confirm('Deseja realmente encerrar sua sessão com segurança?')) {
                    if (window.handleLogout) {
                        await window.handleLogout();
                    } else if (window.NHSupabase) {
                        await window.NHSupabase.signOut();
                        window.location.href = 'index.html';
                    }
                }
            });
        }
    }

    async function protectAdminPage() {
        if (!window.NHSupabase) {
            window.location.href = 'index.html';
            return;
        }

        const sessionData = await window.NHSupabase.getCurrentSession();

        if (!sessionData || !sessionData.isAdmin) {
            alert('Acesso restrito: Esta área requer privilégios de Administrador.');
            window.location.href = 'index.html';
            return;
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    applyCasualProtections();

    window.NHSecurity = {
        protectTrainingPage: protectTrainingPage,
        protectAdminPage: protectAdminPage
    };

})(window);
