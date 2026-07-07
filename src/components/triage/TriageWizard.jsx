import { useMemo, useState } from "react";
import { AppLink } from "../AppLink.jsx";
import CameraCapture from "./CameraCapture.jsx";
import ComplianceConsent from "./ComplianceConsent.jsx";
import DrDigitalIcon from "./DrDigitalIcon.jsx";
import MedicalDocumentsGuide from "./MedicalDocumentsGuide.jsx";
import VoiceSymptoms from "./VoiceSymptoms.jsx";
import { contact } from "../../data/content.js";
import { allComplianceAccepted, complianceInitialState, drDigitalCompliance } from "../../data/drDigitalCompliance.js";
import { analyzeTriage } from "../../lib/triageEngine.js";
import { logComplianceAudit, scanForComplianceViolations } from "../../lib/triageCompliance.js";
import { saveTriageSession } from "../../lib/triageSession.js";

const STEPS = [
  { id: "consent", label: "Consentimento", icon: "🛡️" },
  { id: "identity", label: "Biometria", icon: "📸" },
  { id: "vitals", label: "Temperatura", icon: "🌡️" },
  { id: "symptoms", label: "Sintomas", icon: "🎙️" },
  { id: "analysis", label: "Análise IA", icon: "🩺" },
  { id: "result", label: "Resultado", icon: "✅" },
];

const SYMPTOM_OPTIONS = [
  { label: "Febre", icon: "🌡️" },
  { label: "Tosse", icon: "😷" },
  { label: "Dor de garganta", icon: "🫁" },
  { label: "Dor de cabeça", icon: "🤕" },
  { label: "Mal-estar", icon: "😔" },
  { label: "Coriza", icon: "🤧" },
  { label: "Náusea", icon: "🤢" },
  { label: "Dor no peito", icon: "💔" },
  { label: "Falta de ar", icon: "😮‍💨" },
];

const initialData = {
  compliance: { ...complianceInitialState, acceptances: {} },
  photoDataUrl: null,
  livenessScore: 0,
  biometryVerified: false,
  temperature: null,
  feeling: "normal",
  symptoms: [],
  symptomText: "",
  voiceTranscript: "",
  riskGroup: "none",
};

export default function TriageWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(initialData);
  const [result, setResult] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const [complianceBlock, setComplianceBlock] = useState(null);
  const [auditId, setAuditId] = useState("");

  const step = STEPS[stepIndex];

  const patch = (partial) => setData((current) => ({ ...current, ...partial }));

  const toggleAcceptance = (id) => {
    setData((current) => ({
      ...current,
      compliance: {
        ...current.compliance,
        acceptances: {
          ...current.compliance.acceptances,
          [id]: !current.compliance.acceptances[id],
        },
      },
    }));
  };

  const next = () => setStepIndex((index) => Math.min(index + 1, STEPS.length - 1));
  const back = () => setStepIndex((index) => Math.max(index - 1, 0));

  const canAdvance = useMemo(() => {
    switch (step.id) {
      case "consent":
        return (
          allComplianceAccepted(data.compliance.acceptances) &&
          data.compliance.declaredTitular &&
          data.compliance.acknowledgedProhibited
        );
      case "identity":
        return data.biometryVerified;
      case "vitals":
        return data.temperature != null;
      case "symptoms":
        return data.symptoms.length > 0 || data.symptomText.trim().length > 3;
      default:
        return true;
    }
  }, [step.id, data]);

  const runAnalysis = () => {
    setAnalyzing(true);
    setComplianceBlock(null);
    setStepIndex(STEPS.findIndex((item) => item.id === "analysis"));

    setTimeout(() => {
      const violation = scanForComplianceViolations(data);

      if (violation.blocked) {
        const audit = logComplianceAudit({
          type: "blocked",
          reason: violation.reason,
          flags: violation.flags,
          matches: violation.matches,
          protocol: null,
        });
        setAuditId(audit.id);
        setComplianceBlock(violation);
        setResult({
          level: "red",
          channel: "human_urgent",
          blocked: true,
          summary: violation.reason,
          flags: violation.flags,
          confidence: 0,
        });
        saveTriageSession({
          ...data,
          complianceBlocked: true,
          auditId: audit.id,
          result: { blocked: true, reason: violation.reason },
        });
        setAnalyzing(false);
        setStepIndex(STEPS.findIndex((item) => item.id === "result"));
        return;
      }

      const triage = analyzeTriage(data);
      const audit = logComplianceAudit({
        type: "approved",
        flags: violation.flags,
        triageLevel: triage.level,
        channel: triage.channel,
      });
      const saved = saveTriageSession({
        ...data,
        auditId: audit.id,
        complianceBlocked: false,
        result: triage,
      });
      setAuditId(audit.id);
      setResult(triage);
      setSessionId(saved.id);
      setAnalyzing(false);
      setStepIndex(STEPS.findIndex((item) => item.id === "result"));
    }, 2800);
  };

  const toggleSymptom = (symptom) => {
    setData((current) => ({
      ...current,
      symptoms: current.symptoms.includes(symptom)
        ? current.symptoms.filter((item) => item !== symptom)
        : [...current.symptoms, symptom],
    }));
  };

  const stepIcon = STEPS[stepIndex]?.icon ?? "🩺";

  const restart = () => {
    setData({ ...initialData, compliance: { ...complianceInitialState, acceptances: {} } });
    setResult(null);
    setComplianceBlock(null);
    setAuditId("");
    setSessionId("");
    setStepIndex(0);
  };

  return (
    <div className="triage-wizard">
      <div className="triage-wizard__brand">
        <DrDigitalIcon size={56} className="dr-digital-icon--panel" />
        <div>
          <strong>Dr. Digital MundialCard</strong>
          <span>Triagem do seu plano de saúde</span>
        </div>
      </div>

      <div className="triage-wizard__progress" aria-label="Progresso da triagem">
        {STEPS.map((item, index) => (
          <div
            key={item.id}
            className={`triage-step-dot${index <= stepIndex ? " is-done" : ""}${index === stepIndex ? " is-current" : ""}`}
          >
            <span className="triage-step-dot__icon" aria-hidden="true">
              {item.icon}
            </span>
            <small>{item.label}</small>
          </div>
        ))}
      </div>

      <div className="triage-wizard__panel panel">
        <div className="triage-step-head" aria-hidden="true">
          <span className="triage-step-head__emoji">{stepIcon}</span>
        </div>
        {step.id === "consent" && (
          <>
            <span className="eyebrow">🏥 Plano de saúde · Dr. Digital</span>
            <h2>Termos legais, ética e conformidade</h2>
            <p className="triage-lead">
              Antes da triagem, aceite os termos exigidos pela LGPD, CFM, ANS e pelo contrato do seu
              plano de saúde. Isso protege você e impede uso fraudulento da plataforma.
            </p>
            <ComplianceConsent
              acceptances={data.compliance.acceptances}
              onToggle={toggleAcceptance}
              declaredTitular={data.compliance.declaredTitular}
              onTitularChange={(value) =>
                patch({ compliance: { ...data.compliance, declaredTitular: value } })
              }
              acknowledgedProhibited={data.compliance.acknowledgedProhibited}
              onProhibitedChange={(value) =>
                patch({ compliance: { ...data.compliance, acknowledgedProhibited: value } })
              }
            />
          </>
        )}

        {step.id === "identity" && (
          <>
            <h2>Identificação — selfie e prova de vida</h2>
            <p className="triage-lead">
              Posicione o rosto do <strong>titular ou dependente autorizado</strong> na câmera. Tentativa
              de burlar identidade viola o Código de Ética e o contrato do plano (Art. 171 e 299 CP).
            </p>
            <CameraCapture
              mode="identity"
              onCapture={(payload) => patch(payload)}
            />
            {data.biometryVerified ? (
              <p className="triage-ok" role="status">
                ✓ Identidade verificada (liveness {data.livenessScore}%)
              </p>
            ) : null}
          </>
        )}

        {step.id === "vitals" && (
          <>
            <h2>Leitura térmica simulada</h2>
            <p className="triage-lead">
              Aponte a câmera frontal para o rosto. O mapa térmico simula a temperatura corporal.
            </p>
            <div className="triage-feeling">
              <span>Como você se sente?</span>
              {[
                { id: "normal", label: "Normal" },
                { id: "hot", label: "Calor" },
                { id: "fever", label: "Febre" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`btn btn-sm ${data.feeling === item.id ? "btn-primary" : "btn-outline"}`}
                  onClick={() => patch({ feeling: item.id, temperature: null })}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <CameraCapture
              mode="thermal"
              feeling={data.feeling}
              onThermalReading={(temperature) => patch({ temperature })}
            />
            {data.temperature != null ? (
              <p className="triage-ok" role="status">
                ✓ Temperatura registrada: <strong>{data.temperature.toFixed(1)} °C</strong> (simulação)
              </p>
            ) : null}
          </>
        )}

        {step.id === "symptoms" && (
          <>
            <h2>Sintomas — áudio e formulário</h2>
            <p className="triage-lead">
              Descreva com <strong>verdade</strong> o que sente. Relatos falsos ou simulados violam o
              Código de Ética Médica e podem configurar fraude contra a operadora do plano.
            </p>

            <VoiceSymptoms onTranscript={(voiceTranscript) => patch({ voiceTranscript })} />

            <div className="triage-chips">
              {SYMPTOM_OPTIONS.map((symptom) => (
                <button
                  key={symptom.label}
                  type="button"
                  className={`triage-chip${data.symptoms.includes(symptom.label) ? " is-active" : ""}`}
                  onClick={() => toggleSymptom(symptom.label)}
                >
                  <span className="triage-chip__icon" aria-hidden="true">
                    {symptom.icon}
                  </span>
                  {symptom.label}
                </button>
              ))}
            </div>

            <div className="form-field">
              <label htmlFor="symptom-text">Detalhes adicionais</label>
              <textarea
                id="symptom-text"
                rows={4}
                value={data.symptomText}
                onChange={(event) => patch({ symptomText: event.target.value })}
                placeholder="Ex.: começou ontem à noite, piora ao tossir..."
              />
            </div>

            <div className="form-field">
              <label htmlFor="risk-group">Grupo de risco</label>
              <select
                id="risk-group"
                value={data.riskGroup}
                onChange={(event) => patch({ riskGroup: event.target.value })}
              >
                <option value="none">Nenhum / adulto saudável</option>
                <option value="child">Criança menor de 12 anos</option>
                <option value="elderly">Idoso acima de 65</option>
                <option value="pregnant">Gestante</option>
                <option value="immunocompromised">Imunossuprimido</option>
              </select>
            </div>
          </>
        )}

        {step.id === "analysis" && (
          <div className="triage-analysis" aria-live="polite">
            <DrDigitalIcon size={88} className="dr-digital-icon--pulse" />
            <h2>🩺 Dr. Digital analisando…</h2>
            <p>Correlacionando biometria, temperatura, áudio e sintomas.</p>
            <ul className="triage-analysis__list">
              <li>Validando conformidade LGPD / CFM / ANS</li>
              <li>Verificando identidade biométrica e anti-fraude</li>
              <li>Interpretando mapa térmico simulado</li>
              <li>Processando relato por voz e texto</li>
              <li>Classificando risco clínico e conduta ética</li>
              <li>Gerando guias de receita e atestado médico</li>
            </ul>
            {analyzing ? <p className="triage-analysis__status">Aguarde…</p> : null}
          </div>
        )}

        {step.id === "result" && result ? (
          <div className={`triage-result triage-result--${result.level}${result.blocked ? " triage-result--blocked" : ""}`}>
            <div className="triage-result__icon">
              <DrDigitalIcon size={64} />
              <span aria-hidden="true">
                {result.blocked ? "⛔" : result.level === "green" ? "💚" : result.level === "yellow" ? "🟡" : "🔴"}
              </span>
            </div>
            <span className={`triage-level triage-level--${result.blocked ? "red" : result.level}`}>
              {result.blocked
                ? "Triagem bloqueada — revisão humana"
                : result.level === "green"
                  ? "Baixo risco"
                  : result.level === "yellow"
                    ? "Risco moderado"
                    : "Prioridade alta"}
            </span>
            <h2>
              {result.blocked
                ? "Atendimento suspenso por segurança e conformidade"
                : result.channel === "ai"
                  ? "Dr. Digital pode conduzir seu atendimento"
                  : result.channel === "human_urgent"
                    ? "Encaminhamento humano prioritário"
                    : "Teleconsulta humana recomendada"}
            </h2>
            <p>{result.summary}</p>

            <div className="triage-result__meta">
              {!result.blocked ? <span>Confiança da triagem: {result.confidence}%</span> : null}
              {sessionId ? <span>Protocolo: {sessionId}</span> : null}
              {auditId ? <span>Auditoria: {auditId}</span> : null}
              <span>Versão compliance: {drDigitalCompliance.version}</span>
            </div>

            {complianceBlock ? (
              <div className="compliance-block-notice" role="alert">
                <strong>⚖️ Registro de conformidade</strong>
                <p>
                  Esta sessão foi bloqueada para proteger o paciente, a operadora e o profissional de
                  saúde. Um atendente humano analisará o caso. Tentativas de burlar regras podem ser
                  reportadas conforme contrato e legislação brasileira.
                </p>
              </div>
            ) : (
              <div className="compliance-ok-notice">
                <strong>✓ Termos aceitos e auditados</strong>
                <p>
                  Triagem realizada com aceite de LGPD, veracidade, titularidade, escopo ANS/CFM e Código
                  de Ética. Registro vinculado ao protocolo acima.
                </p>
              </div>
            )}

            {result.flags?.length ? (
              <ul className="triage-flags">
                {result.flags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            ) : null}

            {result.aiPlan ? (
              <div className="triage-plan">
                <h3>{result.aiPlan.title}</h3>
                <ul>
                  {result.aiPlan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="triage-plan__follow">{result.aiPlan.followUp}</p>
              </div>
            ) : null}

            {!result.blocked ? (
              <MedicalDocumentsGuide sessionData={data} result={result} sessionId={sessionId} />
            ) : null}

            <div className="triage-result__actions">
              {result.blocked || result.channel !== "ai" ? (
                <AppLink to="/agendamento" className="btn btn-primary">
                  Falar com médico humano
                </AppLink>
              ) : (
                <AppLink to="/area-cliente" className="btn btn-primary">
                  Ver orientação na área do cliente
                </AppLink>
              )}
              <a
                href={contact.whatsappUrl}
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
              <AppLink to="/atendimento" className="btn btn-ghost">
                Central de atendimento
              </AppLink>
              <button type="button" className="btn btn-outline" onClick={restart}>
                Nova triagem
              </button>
            </div>
          </div>
        ) : null}

        {step.id !== "analysis" && step.id !== "result" ? (
          <div className="triage-wizard__nav">
            {stepIndex > 0 ? (
              <button type="button" className="btn btn-outline" onClick={back}>
                Voltar
              </button>
            ) : (
              <span />
            )}
            {step.id === "symptoms" ? (
              <button type="button" className="btn btn-primary" disabled={!canAdvance} onClick={runAnalysis}>
                Analisar com Dr. Digital
              </button>
            ) : (
              <button type="button" className="btn btn-primary" disabled={!canAdvance} onClick={next}>
                Continuar
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
