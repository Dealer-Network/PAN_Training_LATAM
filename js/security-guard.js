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
        // Bloquear menu de contexto (botão direito)
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        }, { capture: true });

        // Bloquear atalhos de teclado comuns de inspeção
        document.addEventListener('keydown', function(e) {
            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Ctrl + Shift + I (DevTools)
            // Ctrl + Shift + J (Console)
            // Ctrl + Shift + C (Element Inspector)
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Ctrl + U (View Source)
            if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Ctrl + S (Save Page)
            if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, { capture: true });

        // Mensagem discreta no console corporativo
        try {
            console.clear();
            console.log(
                '%c[NHCE LATAM - SEGURANÇA CORPORATIVA]%c Esta plataforma e seus conteúdos são protegidos por direitos autorais da CNH Industrial. O acesso não autorizado é monitorado e registrado.',
                'background: #FFCC00; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
                'color: #94A3B8; font-size: 11px;'
            );
        } catch (err) {}
    }

    // 2. GUARDIÃO DE ACESSO AO TREINAMENTO (treinamento.html)
    function protectTrainingPage() {
        if (!window.NHAuthService) {
            window.location.href = 'index.html';
            return;
        }

        const session = window.NHAuthService.getCurrentSession();

        // Se não houver sessão ou não estiver aprovado, redirecionar
        if (!session || session.status !== 'APROVADO') {
            window.location.href = 'index.html';
            return;
        }

        // Registrar evento de acesso ao treinamento
        window.NHAuthService.recordLog({
            user_id: session.userId,
            email: session.email,
            nome: session.nome,
            evento: 'ACESSO_TREINAMENTO',
            resultado: 'SUCESSO',
            detalhes: 'Usuário acessou o ambiente interativo de treinamento PAN.'
        });

        // Injetar barra superior com informações do usuário logado e botão de Sair
        document.addEventListener('DOMContentLoaded', function() {
            renderTrainingSessionBar(session);
        });
    }

    // Injetar barra superior no treinamento
    function renderTrainingSessionBar(session) {
        if (document.getElementById('nh-session-topbar')) return;

        const bar = document.createElement('div');
        bar.id = 'nh-session-topbar';
        bar.className = 'nh-session-bar';
        bar.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981;"></span>
                <span style="color: #94A3B8;">Usuário Conectado:</span>
                <strong style="color: #F8FAFC;">${escapeHtml(session.nome)}</strong>
                <span style="color: #64748B;">•</span>
                <span style="color: #FFCC00; font-size: 0.75rem;">${escapeHtml(session.empresa)}</span>
                ${session.role === 'ADMIN' ? '<a href="admin.html" style="background: rgba(255,204,0,0.2); border: 1px solid #FFCC00; color: #FFCC00; font-size: 0.7rem; font-weight: bold; padding: 2px 8px; border-radius: 4px; text-decoration: none; margin-left: 8px;"><i class="fa-solid fa-shield-halved"></i> PAINEL ADM</a>' : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="color: #64748B; font-size: 0.75rem;"><i class="fa-regular fa-clock"></i> Sessão Segura Ativa</span>
                <button id="nh-btn-logout-top" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #F87171; font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; transition: all 0.2s;">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Sair
                </button>
            </div>
        `;

        document.body.insertBefore(bar, document.body.firstChild);

        const logoutBtn = document.getElementById('nh-btn-logout-top');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                if (confirm('Deseja realmente encerrar sua sessão com segurança?')) {
                    window.NHAuthService.logout('LOGOUT_USUARIO');
                }
            });
        }
    }

    // 3. GUARDIÃO DO PAINEL ADMINISTRATIVO (admin.html)
    function protectAdminPage() {
        if (!window.NHAuthService) {
            window.location.href = 'index.html';
            return;
        }

        const session = window.NHAuthService.getCurrentSession();

        // Exige autenticação + Role ADMIN + Status APROVADO
        if (!session || session.role !== 'ADMIN' || session.status !== 'APROVADO') {
            alert('Acesso restrito: Esta área requer privilégios de Administrador.');
            window.location.href = 'index.html';
            return;
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    // Inicialização automática conforme a página atual
    applyCasualProtections();

    window.NHSecurity = {
        protectTrainingPage: protectTrainingPage,
        protectAdminPage: protectAdminPage
    };

})(window);
