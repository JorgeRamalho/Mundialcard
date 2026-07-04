import { AppShell } from "./Dashboard";

export default function PartnerArea() {
  return (
    <AppShell title="Área do parceiro / representante">
      <div className="dash-grid">
        <div className="kpi">
          <span>Leads captados</span>
          <strong>84</strong>
        </div>
        <div className="kpi">
          <span>Contratos fechados</span>
          <strong>19</strong>
        </div>
        <div className="kpi">
          <span>Vidas ativas</span>
          <strong>146</strong>
        </div>
        <div className="kpi">
          <span>Comissão do mês</span>
          <strong>R$ 3.2k</strong>
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
          }}
        >
          https://mundialcard.app/r/REP-2048
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
            <tr>
              <td>Tech Sul RH</td>
              <td>Educação</td>
              <td>Premium</td>
              <td>
                <span className="badge badge-warn">Em andamento</span>
              </td>
            </tr>
            <tr>
              <td>Mercado Central</td>
              <td>Fechamento</td>
              <td>Ouro</td>
              <td>
                <span className="badge badge-ok">Proposta enviada</span>
              </td>
            </tr>
            <tr>
              <td>Associação Norte</td>
              <td>Kit enviado</td>
              <td>Platinum</td>
              <td>
                <span className="badge badge-ok">Ativo</span>
              </td>
            </tr>
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
