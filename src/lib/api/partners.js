import { supabase, isSupabaseConfigured } from "../supabase.js";

const MOCK_PARTNER = {
  referral_code: "REP-2048",
  company_name: "MundialCard Representações MT",
  kpis: {
    leads: 84,
    contratos: 19,
    vidas: 146,
    comissao: "R$ 3,2k",
  },
  pipeline: [
    { company_name: "Tech Sul RH", stage: "Educação", plan_name: "Premium", status: "em_andamento" },
    { company_name: "Mercado Central", stage: "Fechamento", plan_name: "Ouro", status: "proposta_enviada" },
    { company_name: "Associação Norte", stage: "Kit enviado", plan_name: "Platinum", status: "ativo" },
  ],
};

function pipelineBadge(status) {
  if (status === "ativo") return { label: "Ativo", className: "badge badge-ok" };
  if (status === "proposta_enviada") return { label: "Proposta enviada", className: "badge badge-ok" };
  return { label: "Em andamento", className: "badge badge-warn" };
}

export async function fetchPartnerDashboard(referralCode = "REP-2048") {
  if (!isSupabaseConfigured()) {
    return {
      source: "mock",
      referralLink: `https://mundialcard.netlify.app/#/cadastro?ref=${MOCK_PARTNER.referral_code}`,
      ...MOCK_PARTNER,
    };
  }

  const { data: partner, error } = await supabase
    .from("partners")
    .select("id, company_name, referral_code, commission_rate")
    .eq("referral_code", referralCode)
    .maybeSingle();

  if (error || !partner) {
    return {
      source: "mock-fallback",
      referralLink: `https://mundialcard.netlify.app/#/cadastro?ref=${MOCK_PARTNER.referral_code}`,
      ...MOCK_PARTNER,
    };
  }

  const [leadsRes, pipelineRes, clientsRes] = await Promise.all([
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", partner.id),
    supabase
      .from("partner_pipeline")
      .select("company_name, stage, plan_name, status")
      .eq("partner_id", partner.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", partner.id)
      .eq("status", "ativo"),
  ]);

  const pipeline = pipelineRes.data?.length
    ? pipelineRes.data.map((row) => ({
        ...row,
        badge: pipelineBadge(row.status),
      }))
    : MOCK_PARTNER.pipeline.map((row) => ({
        ...row,
        badge: pipelineBadge(row.status),
      }));

  const leadsCount = leadsRes.count ?? MOCK_PARTNER.kpis.leads;
  const vidas = clientsRes.count ?? MOCK_PARTNER.kpis.vidas;
  const comissao = ((leadsCount * partner.commission_rate) / 10).toFixed(1);

  return {
    source: "supabase",
    company_name: partner.company_name,
    referral_code: partner.referral_code,
    referralLink: `${window.location.origin}${window.location.pathname}#/cadastro?ref=${partner.referral_code}`,
    kpis: {
      leads: leadsCount,
      contratos: Math.max(1, Math.round(leadsCount * 0.22)),
      vidas: vidas,
      comissao: `R$ ${comissao}k`,
    },
    pipeline,
  };
}
