import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // 1. Responder a requisições preflight OPTIONS para CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método não permitido." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // 2. Obter variáveis de ambiente seguras do Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("ADMIN_SERVICE_ROLE_KEY") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("[admin-reset-password] Variáveis de ambiente de servidor não configuradas.");
      return new Response(
        JSON.stringify({ error: "Configuração do servidor incompleta." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Extrair e validar o Token JWT do cabeçalho de autorização do solicitante (ADM)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Acesso negado: Token de autenticação não fornecido." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();

    // Cliente para validar a sessão do solicitante
    const callerAuthClient = createClient(supabaseUrl, supabaseAnonKey || supabaseServiceRoleKey, {
      auth: { persistSession: false },
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

    const { data: { user: callerUser }, error: callerAuthError } = await callerAuthClient.auth.getUser(token);

    if (callerAuthError || !callerUser) {
      return new Response(
        JSON.stringify({ error: "Acesso negado: Sessão de administrador inválida ou expirada." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Cliente Administrativo com Privilégios (Service Role)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    // 5. Validar no banco de dados se o solicitante possui role = 'admin' e status = 'approved'
    const { data: callerProfile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, role, status, email")
      .eq("id", callerUser.id)
      .maybeSingle();

    if (profileError || !callerProfile) {
      return new Response(
        JSON.stringify({ error: "Acesso negado: Perfil do administrador não localizado." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const callerRole = (callerProfile.role || "").toLowerCase();
    const callerStatus = (callerProfile.status || "").toLowerCase();

    if (callerRole !== "admin" || callerStatus !== "approved") {
      return new Response(
        JSON.stringify({ error: "Acesso negado: Usuário solicitante não possui privilégios de Administrador Aprovado." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 6. Ler e validar o payload da requisição
    const body = await req.json().catch(() => ({}));
    const { userId, newPassword } = body;

    if (!userId || typeof userId !== "string" || !userId.trim()) {
      return new Response(
        JSON.stringify({ error: "Identificador de usuário inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 8) {
      return new Response(
        JSON.stringify({ error: "A nova senha deve possuir no mínimo 8 caracteres." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const targetUserId = userId.trim();

    // 7. Obter perfil do usuário alvo para auditoria
    const { data: targetProfile, error: targetProfileError } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, status, role")
      .eq("id", targetUserId)
      .maybeSingle();

    if (targetProfileError || !targetProfile) {
      return new Response(
        JSON.stringify({ error: "Usuário alvo não encontrado na base de dados." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 8. Executar o reset da credencial diretamente no Supabase Auth via Admin API
    // Obs: NÃO envia e-mail e NÃO altera campos de perfil/status
    const { error: updateAuthError } = await supabaseAdmin.auth.admin.updateUserById(
      targetUserId,
      { password: newPassword }
    );

    if (updateAuthError) {
      console.error("[admin-reset-password] Erro ao atualizar credencial no Auth Admin:", updateAuthError.message);
      return new Response(
        JSON.stringify({ error: "Falha ao redefinir a senha do usuário no Supabase Auth." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 9. Registrar evento de auditoria em public.access_logs utilizando a estrutura existente:
    // (user_id = ID do usuário alvo, email = e-mail do usuário alvo, action = 'ADMIN_PASSWORD_RESET')
    // created_at é gerado automaticamente pelo banco.
    try {
      await supabaseAdmin.from("access_logs").insert({
        user_id: targetProfile.id,
        email: (targetProfile.email || "").toLowerCase(),
        action: "ADMIN_PASSWORD_RESET"
      });
    } catch (logErr) {
      console.warn("[admin-reset-password] Alerta ao registrar access_log:", logErr);
      // Se a auditoria falhar, NÃO tentar alterar a senha novamente.
    }

    // 10. Retornar resposta de sucesso sem expor senhas ou segredos
    return new Response(
      JSON.stringify({
        success: true,
        message: "Senha redefinida com sucesso. Informe a nova senha ao usuário por outro canal."
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("[admin-reset-password] Erro inesperado na Edge Function:", err?.message || err);
    return new Response(
      JSON.stringify({ error: "Erro interno no processamento da solicitação de reset." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
