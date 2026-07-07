import { drDigitalCompliance } from "../../data/drDigitalCompliance.js";

export default function ComplianceConsent({
  acceptances,
  onToggle,
  declaredTitular,
  onTitularChange,
  acknowledgedProhibited,
  onProhibitedChange,
}) {
  return (
    <div className="compliance-consent">
      <div className="compliance-consent__alert" role="alert">
        <strong>⚖️ Conformidade legal — Brasil</strong>
        <p>
          Para proteger pacientes, operadora e profissionais de saúde, é obrigatório aceitar os termos
          abaixo antes da triagem. Uso indevido pode configurar fraude e violação do contrato do plano.
        </p>
      </div>

      <div className="compliance-consent__laws-block">
        <h3 className="compliance-consent__laws-title">Marco legal aplicável</h3>
        <ul className="compliance-consent__laws">
          {drDigitalCompliance.legalReferences.map((ref) => (
            <li key={ref}>{ref}</li>
          ))}
        </ul>
      </div>

      <div className="compliance-consent__checks-heading">
        <h3>Termos obrigatórios</h3>
        <p>Marque cada item abaixo para continuar a triagem.</p>
      </div>

      <ul className="compliance-consent__checks">
        {drDigitalCompliance.requiredAcceptances.map((item) => (
          <li key={item.id} className="compliance-consent__item">
            <label htmlFor={`compliance-${item.id}`}>
              <input
                id={`compliance-${item.id}`}
                type="checkbox"
                checked={Boolean(acceptances[item.id])}
                onChange={() => onToggle(item.id)}
              />
              <span className="compliance-consent__item-body">
                <strong>{item.label}</strong>
                <p>{item.text}</p>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="compliance-consent__prohibited">
        <h3>🚫 Condutas proibidas</h3>
        <ul>
          {drDigitalCompliance.prohibitedConduct.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="compliance-consent__item compliance-consent__item--nested">
          <label htmlFor="compliance-prohibited">
            <input
              id="compliance-prohibited"
              type="checkbox"
              checked={acknowledgedProhibited}
              onChange={(event) => onProhibitedChange(event.target.checked)}
            />
            <span className="compliance-consent__item-body">
              <p>Li e compreendo as condutas proibidas e as penalidades legais aplicáveis.</p>
            </span>
          </label>
        </div>
      </div>

      <div className="compliance-consent__item compliance-consent__item--highlight">
        <label htmlFor="compliance-titular">
          <input
            id="compliance-titular"
            type="checkbox"
            checked={declaredTitular}
            onChange={(event) => onTitularChange(event.target.checked)}
          />
          <span className="compliance-consent__item-body">
            <strong>Declaração de titularidade</strong>
            <p>
              Sou o beneficiário titular ou dependente autorizado no contrato MundialCard e compareço
              pessoalmente nesta triagem (Art. 299 CP — falsidade ideológica em documento/e-saúde).
            </p>
          </span>
        </label>
      </div>

      <p className="compliance-consent__emergency">
        Emergência? Ligue <a href="tel:192">{drDigitalCompliance.emergency.samu} (SAMU)</a> ou{" "}
        <a href="tel:193">{drDigitalCompliance.emergency.bombeiros}</a> — não use o Dr. Digital.
      </p>
    </div>
  );
}
