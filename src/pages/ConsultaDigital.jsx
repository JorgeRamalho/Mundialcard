import TriageWizard from "../components/triage/TriageWizard.jsx";
import DrDigitalIcon from "../components/triage/DrDigitalIcon.jsx";
import MobileCameraLink from "../components/triage/MobileCameraLink.jsx";
import { drDigitalCompliance } from "../data/drDigitalCompliance.js";

export default function ConsultaDigital() {
  return (
    <>
      <section className="page-hero page-hero--triage">
        <div className="container page-hero--triage__grid">
          <div className="page-hero--triage__icon-wrap">
            <DrDigitalIcon size={112} className="dr-digital-icon--hero" />
            <span className="page-hero--triage__badge" aria-hidden="true">
              🩺
            </span>
          </div>
          <div>
            <span className="eyebrow">🏥 Plano de saúde digital · Telemedicina</span>
            <h1>Dr. Digital — triagem e pré-atendimento</h1>
            <p className="section-lead">
              Médico virtual simulado: vê, ouve, lê temperatura (térmica simulada), analisa biometria e
              decide se você precisa de médico humano ou se a IA pode orientar agora.
            </p>
            <p className="compliance-hero-note">
              ⚖️ Uso sujeito à LGPD, CFM, ANS e ao contrato do seu plano. Condutas fraudulentas são
              bloqueadas e registradas para auditoria.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <MobileCameraLink />
          <TriageWizard />
        </div>
      </section>

      <section className="section">
        <div className="container compliance-page-notice">
          <span className="eyebrow">Conformidade e segurança</span>
          <h2>Proteção legal para pacientes e operadoras</h2>
          <p className="section-lead">
            O Dr. Digital foi desenhado para respeitar a legislação brasileira e os contratos de planos de
            saúde, impedindo burlas ao Código de Ética Médica e fraudes contra a operadora.
          </p>
          <div className="compliance-page-notice__grid">
            <article className="compliance-page-notice__card">
              <h3>📋 Marco legal</h3>
              <ul>
                {drDigitalCompliance.legalReferences.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
            </article>
            <article className="compliance-page-notice__card">
              <h3>🚫 Condutas vedadas</h3>
              <ul>
                {drDigitalCompliance.prohibitedConduct.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="compliance-page-notice__card">
              <h3>🛡️ Controles ativos</h3>
              <ul>
                <li>Termos obrigatórios antes da triagem (7 aceites + titularidade)</li>
                <li>Biometria facial e prova de vida anti-fraude</li>
                <li>Varredura de linguagem suspeita nos relatos</li>
                <li>Bloqueio automático e encaminhamento humano</li>
                <li>Registro de auditoria local (protocolo + ID de compliance)</li>
              </ul>
            </article>
          </div>
          <p className="compliance-consent__emergency">
            Emergência? Ligue <a href="tel:192">{drDigitalCompliance.emergency.samu} (SAMU)</a> — não
            utilize o Dr. Digital.
          </p>
        </div>
      </section>
    </>
  );
}
