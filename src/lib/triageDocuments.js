import { brand, contact } from "../data/content.js";
import { pharmacyNetwork } from "../data/pharmacyNetwork.js";

const DIAGNOSIS_MAP = [
  {
    match: ["febre", "tosse", "garganta", "coriza", "espirros", "mal-estar"],
    diagnosis: "Síndrome gripal / IVAS (infecção viral das vias aéreas superiores)",
    cid: "J06.9",
    medications: [
      { name: "Paracetamol 750 mg", dose: "1 comprimido", posology: "8/8h por até 3 dias, se febre ou dor", type: "otc", discount: "35%" },
      { name: "Dipirona sódica 500 mg", dose: "1 comprimido", posology: "6/6h se dor, máx. 5 dias", type: "otc", discount: "30%" },
      { name: "Loratadina 10 mg", dose: "1 comprimido", posology: "1x ao dia por 5 dias (se coriza/alergia)", type: "otc", discount: "25%" },
    ],
    restDays: 2,
  },
  {
    match: ["dor de cabeca", "dor de cabeça", "cabeca", "cabeça"],
    diagnosis: "Cefaleia tensional leve a moderada",
    cid: "R51",
    medications: [
      { name: "Paracetamol 750 mg", dose: "1 comprimido", posology: "8/8h por até 2 dias", type: "otc", discount: "35%" },
      { name: "Dipirona sódica 500 mg", dose: "1 comprimido", posology: "6/6h se necessário, máx. 3 dias", type: "otc", discount: "30%" },
    ],
    restDays: 1,
  },
  {
    match: ["nausea", "náusea", "vomito", "vômito", "diarreia"],
    diagnosis: "Gastroenterite aguda leve / distúrbio digestivo",
    cid: "A09",
    medications: [
      { name: "Soro de reidratação oral", dose: "200 ml", posology: "Após cada episódio de vômito/diarreia", type: "otc", discount: "20%" },
      { name: "Probiótico (Saccharomyces boulardii)", dose: "1 cápsula", posology: "12/12h por 5 dias", type: "otc", discount: "30%" },
    ],
    restDays: 2,
  },
  {
    match: ["mal estar", "mal-estar", "cansaco", "cansaço", "fraqueza"],
    diagnosis: "Mal-estar inespecífico — acompanhamento clínico",
    cid: "R53",
    medications: [
      { name: "Vitamina C + zinco", dose: "1 comprimido", posology: "1x ao dia por 7 dias", type: "otc", discount: "25%" },
      { name: "Paracetamol 750 mg", dose: "1 comprimido", posology: "8/8h se febre ou dor", type: "otc", discount: "35%" },
    ],
    restDays: 1,
  },
];

const DEFAULT_DIAGNOSIS = {
  diagnosis: "Quadro clínico leve pós-triagem Dr. Digital — acompanhamento ambulatorial",
  cid: "Z00.0",
  medications: [
    { name: "Paracetamol 750 mg", dose: "1 comprimido", posology: "8/8h se febre ou dor, máx. 3 dias", type: "otc", discount: "35%" },
  ],
  restDays: 1,
};

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function resolveClinicalProfile(symptoms, symptomText, voiceTranscript, temperature, level) {
  const combined = normalize([...(symptoms || []), symptomText, voiceTranscript].join(" "));

  let profile = { ...DEFAULT_DIAGNOSIS };
  for (const entry of DIAGNOSIS_MAP) {
    if (entry.match.some((term) => combined.includes(normalize(term)))) {
      profile = { ...entry, medications: [...entry.medications] };
      break;
    }
  }

  if (temperature >= 38) {
    profile.restDays = Math.max(profile.restDays, level === "yellow" ? 3 : 2);
    if (!profile.medications.some((m) => m.name.includes("Paracetamol"))) {
      profile.medications.unshift({
        name: "Paracetamol 750 mg",
        dose: "1 comprimido",
        posology: "8/8h por febre, máx. 5 dias",
        type: "otc",
        discount: "35%",
      });
    }
  }

  if (level === "yellow") {
    profile.restDays = Math.max(profile.restDays, 3);
    profile.requiresHumanValidation = true;
  }
  if (level === "red") {
    profile.requiresHumanValidation = true;
    profile.restDays = 0;
  }

  return profile;
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function buildTriageDocuments(sessionData, result, sessionId) {
  const profile = resolveClinicalProfile(
    sessionData.symptoms,
    sessionData.symptomText,
    sessionData.voiceTranscript,
    sessionData.temperature ?? 36.6,
    result.level
  );

  const today = formatDate();
  const patientName = "_______________________________";
  const cardNumber = "**** 4821";
  const protocol = sessionId || "TRI-PENDENTE";

  const prescription = {
    type: "receita",
    title: "Guia de preenchimento — Receita Médica",
    subtitle: "Rede de Farmácias MundialCard · Desconto " + pharmacyNetwork.discountRange,
    protocol,
    date: today,
    patientName,
    cardNumber,
    diagnosis: profile.diagnosis,
    cid: profile.cid,
    temperature: sessionData.temperature != null ? `${sessionData.temperature.toFixed(1)} °C` : "—",
    symptoms: [...(sessionData.symptoms || []), sessionData.symptomText].filter(Boolean).join("; ") || "Conforme triagem",
    medications: profile.medications,
    doctorName: "Dr. _________________________",
    crm: "CRM/UF _____________",
    requiresValidation: profile.requiresHumanValidation || result.channel !== "ai",
    validationNote: result.channel === "ai"
      ? "Triagem Dr. Digital — orientação inicial. Medicamentos OTC conforme bula. Controlados exigem receita médica humana."
      : "Validação e assinatura de médico habilitado obrigatórias antes da dispensação.",
    triageLevel: result.level,
    confidence: result.confidence,
  };

  const restDays = profile.restDays;
  const certificate = {
    type: "atestado",
    title: "Guia de preenchimento — Atestado Médico",
    subtitle: "Documento orientativo pós-triagem Dr. Digital",
    protocol,
    date: today,
    patientName,
    cardNumber,
    diagnosis: profile.diagnosis,
    cid: profile.cid,
    restDays: restDays > 0 ? restDays : "—",
    restPeriod:
      restDays > 0
        ? `${today} a ${formatDate(new Date(Date.now() + restDays * 86400000))}`
        : "A definir pelo médico assistente",
    cidDescription: profile.diagnosis,
    doctorName: "Dr. _________________________",
    crm: "CRM/UF _____________",
    requiresValidation: profile.requiresHumanValidation || result.channel !== "ai",
    validationNote:
      "Atestado médico válido somente com assinatura, carimbo e CRM do profissional (Res. CFM nº 2.314/2022).",
    triageLevel: result.level,
  };

  return {
    prescription,
    certificate,
    pharmacy: pharmacyNetwork,
    brand: brand.name,
    contact,
    generatedAt: new Date().toISOString(),
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function documentStyles() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, 'Times New Roman', serif; color: #1e293b; padding: 24px; max-width: 720px; margin: 0 auto; font-size: 13px; line-height: 1.5; }
    .header { border-bottom: 3px solid #8c1417; padding-bottom: 12px; margin-bottom: 16px; }
    .header h1 { font-size: 18px; color: #8c1417; }
    .header p { font-size: 11px; color: #64748b; margin-top: 4px; }
    .badge { display: inline-block; background: #0d9488; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-top: 6px; }
    .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; font-size: 12px; }
    .field { margin-bottom: 10px; }
    .field label { display: block; font-size: 10px; text-transform: uppercase; color: #64748b; letter-spacing: 0.04em; margin-bottom: 2px; }
    .field .value { border-bottom: 1px dashed #94a3b8; min-height: 20px; padding: 2px 0; }
    .section { margin: 16px 0; }
    .section h2 { font-size: 13px; color: #8c1417; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 8px; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
    th { background: #f8fafc; font-size: 10px; text-transform: uppercase; }
    .discount { color: #0d9488; font-weight: bold; }
    .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px; }
    .sign-line { border-top: 1px solid #1e293b; padding-top: 4px; font-size: 11px; text-align: center; margin-top: 48px; }
    .footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #64748b; }
    .alert { background: #fef3c7; border: 1px solid #f59e0b; padding: 8px 10px; border-radius: 4px; font-size: 11px; margin: 12px 0; }
    @media print { body { padding: 12px; } }
  `;
}

export function renderPrescriptionHtml(doc) {
  const meds = doc.medications
    .map(
      (m) =>
        `<tr><td>${escapeHtml(m.name)}</td><td>${escapeHtml(m.dose)}</td><td>${escapeHtml(m.posology)}</td><td class="discount">${escapeHtml(m.discount)}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>${escapeHtml(doc.title)}</title><style>${documentStyles()}</style></head><body>
    <div class="header">
      <h1>${escapeHtml(doc.title)}</h1>
      <p>${escapeHtml(doc.subtitle)}</p>
      <span class="badge">Protocolo ${escapeHtml(doc.protocol)}</span>
    </div>
    <div class="meta">
      <div class="field"><label>Data</label><div class="value">${escapeHtml(doc.date)}</div></div>
      <div class="field"><label>Cartão MundialCard</label><div class="value">${escapeHtml(doc.cardNumber)}</div></div>
    </div>
    <div class="field"><label>Paciente (nome completo)</label><div class="value">${escapeHtml(doc.patientName)}</div></div>
    <div class="section">
      <h2>Diagnóstico clínico (triagem Dr. Digital)</h2>
      <div class="field"><label>Hipótese diagnóstica</label><div class="value">${escapeHtml(doc.diagnosis)}</div></div>
      <div class="field"><label>CID-10 sugerido</label><div class="value">${escapeHtml(doc.cid)}</div></div>
      <div class="field"><label>Sintomas relatados</label><div class="value">${escapeHtml(doc.symptoms)}</div></div>
      <div class="field"><label>Temperatura registrada</label><div class="value">${escapeHtml(doc.temperature)}</div></div>
    </div>
    <div class="section">
      <h2>Medicamentos sugeridos — desconto rede credenciada</h2>
      <table><thead><tr><th>Medicamento</th><th>Dose</th><th>Posologia</th><th>Desc. MC</th></tr></thead><tbody>${meds}</tbody></table>
    </div>
    ${doc.requiresValidation ? `<div class="alert">⚠ ${escapeHtml(doc.validationNote)}</div>` : `<p style="font-size:11px;color:#64748b;margin-top:8px">${escapeHtml(doc.validationNote)}</p>`}
    <div class="signatures">
      <div><div class="sign-line">${escapeHtml(doc.doctorName)}<br>${escapeHtml(doc.crm)}<br>Assinatura e carimbo</div></div>
      <div><div class="sign-line">Farmácia credenciada<br>Carimbo / data da dispensação</div></div>
    </div>
    <div class="footer">
      ${escapeHtml(pharmacyNetwork.legalNote)}<br>
      ${escapeHtml(brand.name)} · ${escapeHtml(contact.phone)} · ${escapeHtml(contact.site)}
    </div>
  </body></html>`;
}

export function renderCertificateHtml(doc) {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>${escapeHtml(doc.title)}</title><style>${documentStyles()}</style></head><body>
    <div class="header">
      <h1>${escapeHtml(doc.title)}</h1>
      <p>${escapeHtml(doc.subtitle)}</p>
      <span class="badge">Protocolo ${escapeHtml(doc.protocol)}</span>
    </div>
    <div class="meta">
      <div class="field"><label>Data de emissão</label><div class="value">${escapeHtml(doc.date)}</div></div>
      <div class="field"><label>Cartão MundialCard</label><div class="value">${escapeHtml(doc.cardNumber)}</div></div>
    </div>
    <div class="field"><label>Paciente (nome completo)</label><div class="value">${escapeHtml(doc.patientName)}</div></div>
    <div class="section">
      <h2>Dados clínicos</h2>
      <div class="field"><label>CID-10</label><div class="value">${escapeHtml(doc.cid)} — ${escapeHtml(doc.cidDescription)}</div></div>
      <div class="field"><label>Afastamento sugerido (dias)</label><div class="value">${escapeHtml(doc.restDays)}</div></div>
      <div class="field"><label>Período de afastamento</label><div class="value">${escapeHtml(doc.restPeriod)}</div></div>
    </div>
    <p style="margin:16px 0;font-size:12px;line-height:1.6">
      Atesto, para os devidos fins, que o(a) paciente acima identificado(a) necessita de afastamento
      de suas atividades habituais pelo período indicado, em razão do quadro clínico descrito.
    </p>
    ${doc.requiresValidation ? `<div class="alert">⚠ ${escapeHtml(doc.validationNote)}</div>` : ""}
    <div class="signatures">
      <div><div class="sign-line">${escapeHtml(doc.doctorName)}<br>${escapeHtml(doc.crm)}<br>Assinatura e carimbo</div></div>
    </div>
    <div class="footer">
      Documento orientativo gerado pela triagem Dr. Digital. Validade legal apenas com médico habilitado.<br>
      ${escapeHtml(brand.name)} · ${escapeHtml(contact.phone)}
    </div>
  </body></html>`;
}

export function renderPharmacyGuideHtml(documents) {
  const { prescription, pharmacy } = documents;
  const partners = pharmacy.partners
    .map(
      (p) =>
        `<tr><td>${escapeHtml(p.name)}</td><td class="discount">${escapeHtml(p.discount)}</td><td>${escapeHtml(p.region)}</td></tr>`
    )
    .join("");
  const steps = pharmacy.howToUse.map((s, i) => `<li>${i + 1}. ${escapeHtml(s)}</li>`).join("");

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Guia — Rede de Farmácias MundialCard</title><style>${documentStyles()}</style></head><body>
    <div class="header">
      <h1>Guia de utilização — Rede de Farmácias MundialCard</h1>
      <p>Desconto de ${escapeHtml(pharmacy.discountRange)} em medicamentos credenciados</p>
      <span class="badge">Protocolo ${escapeHtml(prescription.protocol)}</span>
    </div>
    <div class="section">
      <h2>Como usar seu benefício</h2>
      <ol style="padding-left:1.2rem;font-size:12px;line-height:1.6">${steps}</ol>
    </div>
    <div class="section">
      <h2>Farmácias parceiras</h2>
      <table><thead><tr><th>Rede</th><th>Desconto</th><th>Região</th></tr></thead><tbody>${partners}</tbody></table>
    </div>
    <div class="section">
      <h2>Medicamentos da sua triagem</h2>
      <table><thead><tr><th>Medicamento</th><th>Posologia</th><th>Desc. MC</th></tr></thead><tbody>
        ${prescription.medications.map((m) => `<tr><td>${escapeHtml(m.name)}</td><td>${escapeHtml(m.posology)}</td><td class="discount">${escapeHtml(m.discount)}</td></tr>`).join("")}
      </tbody></table>
    </div>
    <div class="footer">${escapeHtml(pharmacy.legalNote)}<br>${escapeHtml(brand.name)} · ${escapeHtml(contact.phone)}</div>
  </body></html>`;
}

function resolveDocumentHtml(type, documents) {
  if (type === "receita") return renderPrescriptionHtml(documents.prescription);
  if (type === "atestado") return renderCertificateHtml(documents.certificate);
  if (type === "guia") return renderPharmacyGuideHtml(documents);
  return renderPrescriptionHtml(documents.prescription);
}

export function downloadMedicalDocument(type, documents, sessionId) {
  const html = resolveDocumentHtml(type, documents);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mundialcard-${type}-${sessionId || "triagem"}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

