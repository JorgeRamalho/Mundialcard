import { drDigitalCompliance } from "../data/drDigitalCompliance.js";

const AUDIT_KEY = "mundialcard_compliance_audit";

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function scanForComplianceViolations(data) {
  const combined = [
    data.symptomText,
    data.voiceTranscript,
    ...(data.symptoms || []),
  ]
    .filter(Boolean)
    .join(" ");

  const normalized = normalize(combined);
  const matches = drDigitalCompliance.fraudKeywords.filter((keyword) =>
    normalized.includes(normalize(keyword))
  );

  if (!data.biometryVerified) {
    return {
      blocked: true,
      reason: "Identidade biométrica não verificada. Atendimento bloqueado por segurança.",
      flags: ["biometry_missing"],
    };
  }

  if (!data.compliance?.declaredTitular) {
    return {
      blocked: true,
      reason: "Declaração de titular/dependente não confirmada.",
      flags: ["titular_not_declared"],
    };
  }

  if (matches.length > 0) {
    return {
      blocked: true,
      reason:
        "Detectamos relato incompatível com as regras de ética e conduta. Um atendente humano revisará o caso.",
      flags: ["suspicious_language"],
      matches,
    };
  }

  if (data.livenessScore > 0 && data.livenessScore < 70) {
    return {
      blocked: true,
      reason: "Prova de vida insuficiente. Repita a verificação biométrica ou fale com um atendente.",
      flags: ["low_liveness"],
    };
  }

  return { blocked: false, flags: [], matches: [] };
}

export function logComplianceAudit(entry) {
  const record = {
    id: `AUD-${Date.now().toString(36).toUpperCase()}`,
    ...entry,
    loggedAt: new Date().toISOString(),
    complianceVersion: drDigitalCompliance.version,
  };

  try {
    const list = JSON.parse(localStorage.getItem(AUDIT_KEY) || "[]");
    list.unshift(record);
    localStorage.setItem(AUDIT_KEY, JSON.stringify(list.slice(0, 100)));
  } catch {
    /* ignore storage errors */
  }

  return record;
}

export function getComplianceAuditLog() {
  try {
    return JSON.parse(localStorage.getItem(AUDIT_KEY) || "[]");
  } catch {
    return [];
  }
}
