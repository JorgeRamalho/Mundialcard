const RED_FLAG_SYMPTOMS = [
  "dor no peito",
  "falta de ar",
  "dificuldade para respirar",
  "desmaio",
  "confusao mental",
  "confusão mental",
  "sangramento intenso",
  "convulsao",
  "convulsão",
  "dor abdominal intensa",
  "formigamento no braco",
  "formigamento no braço",
  "perda de consciencia",
  "perda de consciência",
];

const RED_FLAG_KEYWORDS = [
  "peito",
  "nao consigo respirar",
  "não consigo respirar",
  "desmaiei",
  "sangue",
  "convulsao",
  "convulsão",
  "emergencia",
  "emergência",
  "samu",
];

const MODERATE_SYMPTOMS = [
  "febre",
  "tosse persistente",
  "dor de garganta",
  "dor de cabeca",
  "dor de cabeça",
  "nausea",
  "náusea",
  "vomito",
  "vômito",
  "diarreia",
  "mal estar",
  "mal-estar",
  "coriza",
  "espirros",
];

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function textHasAny(text, list) {
  const value = normalize(text);
  return list.some((item) => value.includes(normalize(item)));
}

function countMatches(text, list) {
  const value = normalize(text);
  return list.filter((item) => value.includes(normalize(item))).length;
}

export function analyzeTriage(input) {
  const {
    temperature = 36.6,
    symptoms = [],
    symptomText = "",
    riskGroup = "none",
    biometryVerified = false,
    livenessScore = 0,
    voiceTranscript = "",
  } = input;

  const combinedText = [...symptoms, symptomText, voiceTranscript].join(" ");
  const flags = [];
  let score = 0;

  if (temperature >= 39.5) {
    score += 40;
    flags.push("Temperatura muito elevada detectada");
  } else if (temperature >= 38) {
    score += 22;
    flags.push("Febre identificada");
  } else if (temperature >= 37.5) {
    score += 10;
    flags.push("Temperatura acima do habitual");
  }

  if (textHasAny(combinedText, RED_FLAG_SYMPTOMS) || textHasAny(combinedText, RED_FLAG_KEYWORDS)) {
    score += 50;
    flags.push("Sinal de alerta clínico reportado");
  }

  const moderateCount = countMatches(combinedText, MODERATE_SYMPTOMS) + symptoms.length;
  if (moderateCount >= 3) score += 18;
  else if (moderateCount >= 1) score += 8;

  if (riskGroup === "pregnant" || riskGroup === "child" || riskGroup === "elderly") {
    score += 15;
    flags.push("Grupo que requer atenção clínica reforçada");
  }
  if (riskGroup === "immunocompromised") {
    score += 25;
    flags.push("Paciente com risco imunológico");
  }

  if (!biometryVerified || livenessScore < 70) {
    flags.push("Identidade biométrica parcial — validação humana recomendada");
    score += 5;
  }

  let level = "green";
  let channel = "ai";

  if (score >= 55) {
    level = "red";
    channel = "human_urgent";
  } else if (score >= 28) {
    level = "yellow";
    channel = "human_scheduled";
  }

  const confidence = Math.min(98, Math.max(62, 88 - score * 0.3 + (biometryVerified ? 8 : 0)));

  return {
    level,
    channel,
    score,
    flags: [...new Set(flags)],
    confidence: Math.round(confidence),
    aiPlan: buildAiPlan(level, combinedText, temperature),
    summary: buildSummary(level, channel, temperature),
  };
}

function buildSummary(level, channel, temperature) {
  if (level === "red") {
    return "Triagem indica necessidade de avaliação humana prioritária. Não substitui emergência presencial (192/SAMU).";
  }
  if (level === "yellow") {
    return "Sintomas moderados ou perfil de risco: recomendamos teleconsulta com médico humano em breve.";
  }
  if (channel === "ai") {
    return `Sinais estáveis (temp. ${temperature.toFixed(1)}°C simulada). O Dr. Digital pode conduzir orientação inicial.`;
  }
  return "Triagem concluída.";
}

function buildAiPlan(level, text, temperature) {
  if (level !== "green") return null;

  const items = [
    "Hidratação frequente com água ou soro caseiro",
    "Repouso em ambiente ventilado",
    "Monitorar temperatura a cada 4 horas",
  ];

  if (temperature >= 37.8) {
    items.push("Considerar antitérmico conforme bula, se não houver contraindicação");
  }
  if (textHasAny(text, ["tosse", "garganta"])) {
    items.push("Evitar ambientes frios e ar-condicionado direto; mel pode ajudar em dor de garganta leve");
  }
  if (textHasAny(text, ["diarreia", "vomito", "vômito"])) {
    items.push("Priorizar líquidos; evitar alimentos gordurosos nas primeiras 24h");
  }

  items.push("Retornar se piora em 48h ou surgirem sinais de alerta");

  return {
    title: "Plano de cuidado — Dr. Digital MundialCard",
    items,
    followUp: "Reavaliação automática disponível em 24h pela plataforma",
  };
}

export function simulateThermalReading(videoCanvas, feeling = "normal") {
  if (!videoCanvas) {
    return feeling === "fever" ? 38.2 : feeling === "hot" ? 37.8 : 36.6;
  }

  const ctx = videoCanvas.getContext("2d");
  const { width, height } = videoCanvas;
  const image = ctx.getImageData(Math.floor(width * 0.35), Math.floor(height * 0.2), Math.floor(width * 0.3), Math.floor(height * 0.45));
  let warm = 0;
  for (let i = 0; i < image.data.length; i += 4) {
    warm += image.data[i] - image.data[i + 2];
  }
  const avgWarm = warm / (image.data.length / 4);
  const base = feeling === "fever" ? 37.8 : feeling === "hot" ? 37.3 : 36.4;
  const adjusted = base + avgWarm * 0.008 + (Math.random() * 0.3 - 0.15);
  return Math.round(adjusted * 10) / 10;
}
