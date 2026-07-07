import { AppLink } from "../components/AppLink.jsx";
import { AppShell } from "./Dashboard";
import RegistrationFormDownload from "../components/RegistrationFormDownload";
import { benefits, plans } from "../data/content";

export default function Produtos() {
  return (
    <AppShell title="Produtos e serviços">
      <div className="panel">
        <h3>Categorias de benefícios</h3>
        <div className="grid-4">
          {benefits.map((item) => (
            <article key={item.title} className="kpi">
              <span>{item.icon}</span>
              <strong style={{ fontSize: "1rem" }}>{item.title}</strong>
            </article>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>Planos digitais nacionais</h3>
        <div className="plans-grid">
          {plans.map((plan) => (
            <article key={plan.id} className="plan-card">
              <span className={`plan-tier ${plan.tier}`}>{plan.name}</span>
              <h3>{plan.name}</h3>
              <div className="plan-price">
                R$ {plan.price}
                <small>/mês</small>
              </div>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <AppLink to="/cadastro" className="btn btn-outline">
                Contratar
              </AppLink>
            </article>
          ))}
        </div>
        <RegistrationFormDownload variant="panel" showEyebrow={false} />
      </div>
    </AppShell>
  );
}
