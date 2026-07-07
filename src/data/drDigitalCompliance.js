/**
 * Marco legal e ético — Dr. Digital MundialCard (Brasil).
 * Referências: LGPD (Lei 13.709/2018), CFM (Res. 2.314/2022 e correlatas),
 * Código de Ética Médica, ANS (RN nº 566/2022 e contratos de operadoras).
 */
export const drDigitalCompliance = {
  version: "2026.07",
  emergency: {
    samu: "192",
    bombeiros: "193",
    label: "Emergência médica",
  },
  requiredAcceptances: [
    {
      id: "lgpd",
      label: "Tratamento de dados sensíveis de saúde (LGPD)",
      text: "Autorizo o tratamento dos meus dados pessoais e de saúde (imagem, voz, biometria e sintomas) exclusivamente para triagem digital, registro assistencial e continuidade do cuidado, conforme a Lei nº 13.709/2018 (LGPD).",
    },
    {
      id: "truthfulness",
      label: "Veracidade das informações",
      text: "Declaro que todas as informações clínicas, sinais e relatos são verdadeiros e correspondem ao paciente atendido. É vedada a omissão, simulação ou distorção de sintomas (Código de Ética Médica — relação de confiança e veracidade).",
    },
    {
      id: "identity",
      label: "Identidade do beneficiário",
      text: "Confirmo ser o titular ou dependente legalmente cadastrado no plano MundialCard, com biometria e documentação compatíveis. É proibido o uso por terceiros não autorizados ou repasse de credenciais (fraude contra operadora de plano de saúde — Art. 171 CP).",
    },
    {
      id: "scope",
      label: "Escopo contratual do plano (ANS)",
      text: "Compreendo que o Dr. Digital realiza triagem e orientação dentro da cobertura contratada e das regras da ANS. Não substitui procedimentos presenciais quando indicados, internações, UTI ou benefícios não previstos no meu contrato.",
    },
    {
      id: "cfm",
      label: "Limites da telemedicina (CFM)",
      text: "Estou ciente de que este serviço não configura, isoladamente, consulta médica definitiva quando a telemedicina exige médico habilitado, prontuário e responsabilidade técnica (Resolução CFM nº 2.314/2022). Casos complexos serão encaminhados a profissional humano.",
    },
    {
      id: "ethics",
      label: "Código de ética e conduta",
      text: "Comprometo-me a não utilizar a plataforma para obter receitas, atestados ou laudos de forma indevida, burlar carências, incluir dependentes irregulares ou qualquer conduta contrária às leis brasileiras e ao contrato do plano de saúde.",
    },
    {
      id: "emergency",
      label: "Não emergência",
      text: "Reconheço que o Dr. Digital não atende emergências. Em risco de vida, acionarei imediatamente o SAMU (192) ou serviço de urgência presencial, sem depender desta triagem.",
    },
  ],
  prohibitedConduct: [
    "Informações falsas ou simuladas sobre sintomas",
    "Atendimento em nome de terceiro não cadastrado",
    "Solicitação indevida de receitas, atestados ou exames",
    "Tentativa de burlar carência, coparticipação ou cobertura",
    "Gravação ou repasse de dados de outros pacientes",
    "Uso automatizado (bots) ou fraude de biometria",
  ],
  legalReferences: [
    "Lei nº 13.709/2018 — LGPD",
    "Resolução CFM nº 2.314/2022 — Telemedicina",
    "Código de Ética Médica — CFM",
    "RN ANS nº 566/2022 — Telemedicina em planos de saúde",
    "Código Civil e Código Penal — responsabilidade civil e penal por fraude",
  ],
  fraudKeywords: [
    "mentir",
    "mentira",
    "falso",
    "falsa",
    "simular sintoma",
    "burlar",
    "enganar",
    "golpe",
    "receita falsa",
    "atestado falso",
    "nao sou eu",
    "não sou eu",
    "outra pessoa",
    "terceiro",
    "para meu amigo",
    "para minha amiga",
    "emprestar cartao",
    "emprestar cartão",
    "sem plano",
    "nao tenho plano",
    "não tenho plano",
    "fingir",
    "omitir",
  ],
};

export const complianceInitialState = {
  acceptances: {},
  declaredTitular: false,
  acknowledgedProhibited: false,
};

export function allComplianceAccepted(acceptances) {
  return drDigitalCompliance.requiredAcceptances.every((item) => acceptances[item.id] === true);
}
