import { supabase, isSupabaseConfigured } from "../supabase.js";
import { dashboardPieCharts } from "../../data/dashboardCharts.js";
import { fetchLeadsFunnel } from "./leads.js";
import { countScheduledAppointments } from "./appointments.js";

const MOCK_CLIENTS = [
  { full_name: "Ana Souza", plan: "Ouro", city: "São Paulo", status: "ativo" },
  { full_name: "Carlos Lima", plan: "Prata", city: "Recife", status: "ativo" },
  { full_name: "Empresa Norte Ltda", plan: "Platinum B2B", city: "Manaus", status: "onboarding" },
];

const MOCK_KPIS = {
  clientes_ativos: 1284,
  leads_mes: 326,
  tickets_abertos: 18,
  consultas_agendadas: 47,
};

function formatKpi(value) {
  return value.toLocaleString("pt-BR");
}

function statusBadge(status) {
  if (status === "ativo") return { label: "Ativo", className: "badge badge-ok" };
  if (status === "onboarding") return { label: "Onboarding", className: "badge badge-warn" };
  return { label: status, className: "badge" };
}

export async function fetchDashboardData() {
  const funnel = await fetchLeadsFunnel();
  const consultas = await countScheduledAppointments();

  if (!isSupabaseConfigured()) {
    return {
      source: "mock",
      kpis: {
        clientes_ativos: formatKpi(MOCK_KPIS.clientes_ativos),
        leads_mes: formatKpi(MOCK_KPIS.leads_mes),
        tickets_abertos: formatKpi(MOCK_KPIS.tickets_abertos),
        consultas_agendadas: formatKpi(consultas),
      },
      clients: MOCK_CLIENTS.map((c) => ({
        name: c.full_name,
        plan: c.plan,
        city: c.city,
        badge: statusBadge(c.status),
      })),
      funnel: {
        interesse: funnel.interesse,
        educacao: funnel.educacao,
        contratacao: funnel.contratacao,
        kit: funnel.kit,
      },
      charts: dashboardPieCharts,
    };
  }

  const [kpisRes, clientsRes, leadsRes] = await Promise.all([
    supabase.from("dashboard_kpis").select("*").maybeSingle(),
    supabase
      .from("clients")
      .select("full_name, city, status, plans(name)")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase.from("leads").select("status"),
  ]);

  const kpisRow = kpisRes.data;
  const clients = clientsRes.data?.length
    ? clientsRes.data.map((row) => ({
        name: row.full_name,
        plan: row.plans?.name || "—",
        city: row.city || "—",
        badge: statusBadge(row.status),
      }))
    : MOCK_CLIENTS.map((c) => ({
        name: c.full_name,
        plan: c.plan,
        city: c.city,
        badge: statusBadge(c.status),
      }));

  const charts = buildChartsFromData(clientsRes.data, leadsRes.data);

  return {
    source: kpisRes.error ? "mock-fallback" : "supabase",
    kpis: {
      clientes_ativos: formatKpi(kpisRow?.clientes_ativos ?? MOCK_KPIS.clientes_ativos),
      leads_mes: formatKpi(kpisRow?.leads_mes ?? MOCK_KPIS.leads_mes),
      tickets_abertos: formatKpi(kpisRow?.tickets_abertos ?? MOCK_KPIS.tickets_abertos),
      consultas_agendadas: formatKpi(kpisRow?.consultas_agendadas ?? consultas),
    },
    clients,
    funnel,
    charts,
  };
}

function buildChartsFromData(clients, leads) {
  if (!clients?.length && !leads?.length) return dashboardPieCharts;

  const planCounts = {};
  for (const client of clients || []) {
    const plan = client.plans?.name || "Outros";
    planCounts[plan] = (planCounts[plan] || 0) + 1;
  }

  const leadSources = {};
  for (const lead of leads || []) {
    const src = lead.source || "site";
    leadSources[src] = (leadSources[src] || 0) + 1;
  }

  const planChart = dashboardPieCharts[0];
  const leadChart = dashboardPieCharts[1];

  const planSegments = Object.entries(planCounts).map(([label, value], index) => ({
    label,
    value,
    color: planChart.segments[index % planChart.segments.length]?.color || "#8c1417",
  }));

  const leadSegments = Object.entries(leadSources).map(([label, value], index) => ({
    label,
    value,
    color: leadChart.segments[index % leadChart.segments.length]?.color || "#14b8a6",
  }));

  return dashboardPieCharts.map((chart, index) => {
    if (index === 0 && planSegments.length) return { ...chart, segments: planSegments };
    if (index === 1 && leadSegments.length) return { ...chart, segments: leadSegments };
    return chart;
  });
}
