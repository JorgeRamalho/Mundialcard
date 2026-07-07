import { useEffect, useState } from "react";
import { AppShell } from "./Dashboard";
import { fetchPartnerDashboard } from "../lib/api/partners.js";
import { isSupabaseConfigured } from "../lib/supabase.js";

export default function PartnerArea() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const ref = params.get("ref") || "REP-2048";

    fetchPartnerDashboard(ref).then((result) => {
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
      <AppShell title="Área do parceiro / representante">
        <p style={{ color: "var(--slate-500)" }}>Carregando área do parceiro...</p>
      </AppShell>
    );
  }

  return (
    <AppShell title="Área do parceiro / representante">
      {isSupabaseConfigured() ? (
        <p className="db-status db-status--online" style={{ marginBottom: "1rem" }}>
          Banco conectado — {data.company_name}
        </p>
      ) : (
        <p className="db-status db-status--local" style={{ marginBottom: "1rem" }}>
          Modo demonstração (local)
        </p>
      )}

      <div className="dash-grid">
        <div className="kpi">
          <span>Leads captados</span>
          <strong>{data.kpis.leads}</strong>
        </div>
        <div className="kpi">
          <span>Contratos fechados</span>
          <strong>{data.kpis.contratos}</strong>
        </div>
        <div className="kpi">
          <span>Vidas ativas</span>
          <strong>{data.kpis.vidas}</strong>
        </div>
        <div className="kpi">
          <span>Comissão do mês</span>
          <strong>{data.kpis.comissao}</strong>
        </div>
      </div>

      <div className="panel">
        <h3>Seu link de indicação</h3>
        <p style={{ color: "var(--slate-500)", marginBottom: "0.75rem" }}>
          Compartilhe com empresas e associados. O funil digital educa com vídeo/FAQ e fecha com kit
          automático.
        </p>
        <code
          style={{
            display: "block",
            padding: "0.85rem 1rem",
            borderRadius: 12,
            background: "var(--cream)",
            fontWeight: 700,
            wordBreak: "break-all",
          }}
        >
          {data.referralLink}
        </code>
      </div>

      <div className="panel">
        <h3>Funil B2B</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Empresa / Lead</th>
              <th>Etapa</th>
              <th>Plano</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.pipeline.map((row) => (
              <tr key={`${row.company_name}-${row.stage}`}>
                <td>{row.company_name}</td>
                <td>{row.stage}</td>
                <td>{row.plan_name}</td>
                <td>
                  <span className={row.badge?.className || "badge badge-warn"}>
                    {row.badge?.label || row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-3">
        <article className="info-card">
          <h3>Método</h3>
          <p>Prospecção → link exclusivo → conteúdo oficial → fechamento digital → comissão.</p>
        </article>
        <article className="info-card">
          <h3>Materiais</h3>
          <p>Vídeos, áudios, FAQ e tabelas de planos padronizados para não inventar promessa.</p>
        </article>
        <article className="info-card">
          <h3>Escalabilidade</h3>
          <p>Mesma máquina do B2C: ativação no sistema interno e kit de boas-vindas automático.</p>
        </article>
      </div>
    </AppShell>
  );
}
