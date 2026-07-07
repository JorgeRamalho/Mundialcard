import { useEffect, useState } from "react";
import { AppLink, AppNavLink } from "../components/AppLink.jsx";
import PieChart from "../components/PieChart.jsx";
import { fetchDashboardData } from "../lib/api/dashboard.js";
import { isSupabaseConfigured } from "../lib/supabase.js";

const links = [
  { to: "/dashboard", label: "Visão geral", end: true },
  { to: "/area-cliente", label: "Área do cliente" },
  { to: "/parceiros", label: "Parceiros B2B" },
  { to: "/atendimento", label: "Atendimento" },
  { to: "/consulta-digital", label: "Dr. Digital" },
  { to: "/agendamento", label: "Agendamentos" },
  { to: "/produtos", label: "Produtos" },
  { to: "/app", label: "App" },
];

export function AppShell({ title, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>Plataforma MundialCard</h2>
        {links.map((link) => (
          <AppNavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {link.label}
          </AppNavLink>
        ))}
        <AppLink to="/cadastro" className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>
          Novo lead
        </AppLink>
      </aside>
      <main className="app-main">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchDashboardData().then((result) => {
      if (active) {
        setData(result);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (loading || !data) {
    return (
      <AppShell title="Dashboard operacional">
        <p style={{ color: "var(--slate-500)" }}>Carregando indicadores...</p>
      </AppShell>
    );
  }

  return (
    <AppShell title="Dashboard operacional">
      {isSupabaseConfigured() ? (
        <p className="db-status db-status--online" style={{ marginBottom: "1rem" }}>
          Banco conectado — fonte: {data.source}
        </p>
      ) : (
        <p className="db-status db-status--local" style={{ marginBottom: "1rem" }}>
          Modo demonstração (local) — configure o Supabase em `.env.local`
        </p>
      )}

      <div className="dash-grid">
        <div className="kpi">
          <span>Clientes ativos</span>
          <strong>{data.kpis.clientes_ativos}</strong>
        </div>
        <div className="kpi">
          <span>Leads do mês</span>
          <strong>{data.kpis.leads_mes}</strong>
        </div>
        <div className="kpi">
          <span>Tickets abertos</span>
          <strong>{data.kpis.tickets_abertos}</strong>
        </div>
        <div className="kpi">
          <span>Consultas agendadas</span>
          <strong>{data.kpis.consultas_agendadas}</strong>
        </div>
      </div>

      <div className="dash-body">
        <div className="dash-body__main">
          <div className="panel">
            <h3>Clientes ativos no sistema interno</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Plano</th>
                  <th>Cidade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((client) => (
                  <tr key={`${client.name}-${client.city}`}>
                    <td>{client.name}</td>
                    <td>{client.plan}</td>
                    <td>{client.city}</td>
                    <td>
                      <span className={client.badge.className}>{client.badge.label}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h3>Funil de venda digital</h3>
            <div className="grid-4">
              <div className="kpi">
                <span>Interesse</span>
                <strong>{data.funnel.interesse}</strong>
              </div>
              <div className="kpi">
                <span>Educação (vídeo/FAQ)</span>
                <strong>{data.funnel.educacao}</strong>
              </div>
              <div className="kpi">
                <span>Contratação</span>
                <strong>{data.funnel.contratacao}</strong>
              </div>
              <div className="kpi">
                <span>Kit enviado</span>
                <strong>{data.funnel.kit}</strong>
              </div>
            </div>
          </div>
        </div>

        <aside className="dash-body__charts" aria-label="Indicadores visuais">
          <div className="dash-charts-head">
            <h3>Análise visual</h3>
            <p>Distribuição operacional em tempo real</p>
          </div>
          <div className="dash-charts-stack">
            {data.charts.map((chart) => (
              <PieChart
                key={chart.id}
                title={chart.title}
                subtitle={chart.subtitle}
                segments={chart.segments}
                centerLabel={chart.centerLabel}
              />
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
