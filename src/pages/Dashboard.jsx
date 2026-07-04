import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Visão geral", end: true },
  { to: "/area-cliente", label: "Área do cliente" },
  { to: "/parceiros", label: "Parceiros B2B" },
  { to: "/atendimento", label: "Atendimento" },
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
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/cadastro" className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>
          Novo lead
        </Link>
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
  return (
    <AppShell title="Dashboard operacional">
      <div className="dash-grid">
        <div className="kpi">
          <span>Clientes ativos</span>
          <strong>1.284</strong>
        </div>
        <div className="kpi">
          <span>Leads do mês</span>
          <strong>326</strong>
        </div>
        <div className="kpi">
          <span>Tickets abertos</span>
          <strong>18</strong>
        </div>
        <div className="kpi">
          <span>Consultas agendadas</span>
          <strong>47</strong>
        </div>
      </div>

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
            <tr>
              <td>Ana Souza</td>
              <td>Ouro</td>
              <td>São Paulo</td>
              <td>
                <span className="badge badge-ok">Ativo</span>
              </td>
            </tr>
            <tr>
              <td>Carlos Lima</td>
              <td>Prata</td>
              <td>Recife</td>
              <td>
                <span className="badge badge-ok">Ativo</span>
              </td>
            </tr>
            <tr>
              <td>Empresa Norte Ltda</td>
              <td>Platinum B2B</td>
              <td>Manaus</td>
              <td>
                <span className="badge badge-warn">Onboarding</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h3>Funil de venda digital</h3>
        <div className="grid-4">
          <div className="kpi">
            <span>Interesse</span>
            <strong>820</strong>
          </div>
          <div className="kpi">
            <span>Educação (vídeo/FAQ)</span>
            <strong>510</strong>
          </div>
          <div className="kpi">
            <span>Contratação</span>
            <strong>190</strong>
          </div>
          <div className="kpi">
            <span>Kit enviado</span>
            <strong>176</strong>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
