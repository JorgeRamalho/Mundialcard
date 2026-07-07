import { assetUrl } from "../lib/assetUrl.js";

export const brand = {
  name: "MundialCard",
  slogan: "Seu cartão de super benefícios",
  tagline: "Uma escolha correta muda tudo!",
  description:
    "Cartão de desconto e multibenefícios em saúde e bem-estar, com rede credenciada própria e empresas parceiras em todo o território nacional — atendimento de qualidade e preços acessíveis.",
};

/** Contato oficial (mundialcard.com.br) */
export const contact = {
  address: "R. Barão de Melgaço, 2468 - Centro, Cuiabá - MT, 78005-300",
  phone: "(65) 3365-1330",
  phoneHref: "tel:+556533651330",
  whatsapp: "5565992645537",
  whatsappUrl: "https://api.whatsapp.com/send?phone=5565992645537",
  whatsappLabel: "Fale no WhatsApp",
  site: "https://www.mundialcard.com.br/",
};

export const highlights = [
  "Ganhe de 20% a 50% de desconto em milhares de estabelecimentos",
  "Mais de 5.000 procedimentos em diversas áreas e serviços",
  "Consultas em diversas especialidades médicas",
  "Mais de 1.000 estabelecimentos credenciados no Mato Grosso",
];

export const differentials = [
  { icon: "✅", title: "Sem carência", text: "Comece a usar sem esperar longos prazos." },
  { icon: "♾️", title: "Sem limite de uso", text: "Use quantas vezes precisar na rede credenciada." },
  { icon: "👥", title: "Valor igual para todas as idades", text: "Condições justas para toda a família." },
  { icon: "🛡️", title: "Seguro de acidentes pessoais", text: "Proteção extra no seu plano de benefícios." },
  { icon: "🕊️", title: "Assistência funeral familiar nacional", text: "Cobertura familiar em todo o Brasil." },
  { icon: "💊", title: "Telemedicina inclusa", text: "Consultas online para usar todo mês." },
];

export const benefits = [
  { icon: "🏥", title: "Desconto em toda a área da saúde", text: "Rede credenciada própria e parceiros com preços acessíveis em todo o Brasil." },
  { icon: "🦷", title: "Desconto odontológico", text: "Economia em tratamentos e cuidados odontológicos na rede." },
  { icon: "🔬", title: "Desconto em exames médicos", text: "Exames com condições especiais para associados." },
  { icon: "💊", title: "Telemedicina", text: "Consultas online inclusas nos planos — valor real todos os meses." },
  { icon: "🛡️", title: "Seguro de acidentes pessoais", text: "Proteção adicional para imprevistos do dia a dia." },
  { icon: "🕊️", title: "Assistência funeral familiar", text: "Cobertura familiar nacional no momento mais sensível." },
  { icon: "🛒", title: "Cesta alimentação", text: "Benefício alimentar para apoiar a rotina da família." },
  { icon: "♾️", title: "Sem limite de uso", text: "Utilize os benefícios sempre que precisar, sem teto artificial." },
];

/** Parceiros oficiais do site mundialcard.com.br */
export const partners = [
  {
    name: "Otorrino MT",
    logo: assetUrl("/images/parceiros/parceiro-1.png"),
  },
  {
    name: "Hospital Militar de Mato Grosso",
    logo: assetUrl("/images/parceiros/parceiro-2.png"),
  },
  {
    name: "Hospital Ortopédico",
    logo: assetUrl("/images/parceiros/parceiro-3.png"),
  },
  {
    name: "Hospital São Judas Tadeu",
    logo: assetUrl("/images/parceiros/parceiro-4.png"),
  },
  {
    name: "Odonto Medicina",
    logo: assetUrl("/images/parceiros/parceiro-5.png"),
  },
  {
    name: "Usmedic",
    logo: assetUrl("/images/parceiros/parceiro-6.png"),
  },
  {
    name: "Odonto Medicina",
    logo: assetUrl("/images/parceiros/parceiro-7.png"),
  },
  {
    name: "Mundial Card — Cartão de Convênio Familiar",
    logo: assetUrl("/images/parceiros/mundial-card-cartao.png"),
    brandCard: true,
  },
];

export const plans = [
  {
    id: "bronze",
    name: "Bronze",
    tier: "tier-bronze",
    price: "29,90",
    featured: false,
    items: ["Auxílio funeral individual", "Telemedicina básica", "Carteirinha digital", "Suporte em horário comercial"],
  },
  {
    id: "prata",
    name: "Prata",
    tier: "tier-prata",
    price: "49,90",
    featured: false,
    items: ["Até 2 vidas", "Telemedicina ilimitada*", "Traslado regional", "Kit digital de boas-vindas"],
  },
  {
    id: "ouro",
    name: "Ouro",
    tier: "tier-ouro",
    price: "79,90",
    featured: true,
    items: ["Até 4 vidas", "Telemedicina + orientação", "Traslado nacional", "Prioridade no atendimento"],
  },
  {
    id: "diamante",
    name: "Diamante",
    tier: "tier-diamante",
    price: "119,90",
    featured: false,
    items: ["Até 6 vidas", "Telemedicina completa", "Assistência 24h", "Memorial digital"],
  },
  {
    id: "premium",
    name: "Premium",
    tier: "tier-premium",
    price: "159,90",
    featured: false,
    items: ["Família ampliada", "Psicologia online", "Rede preferencial", "Gerente de conta digital"],
  },
  {
    id: "platinum",
    name: "Platinum",
    tier: "tier-platinum",
    price: "219,90",
    featured: false,
    items: ["Cobertura máxima", "Concierge 24h", "Benefícios parceiros VIP", "Onboarding assistido B2B"],
  },
];

export const faqItems = [
  {
    q: "Como funciona a contratação digital?",
    a: "Você escolhe o plano, preenche os dados, assina o contrato eletrônico e realiza o pagamento. Em minutos o sistema interno ativa seu cadastro e envia o kit de boas-vindas digital.",
  },
  {
    q: "O que vem no kit de boas-vindas?",
    a: "Carteirinha digital com QR Code, contrato em PDF, vídeo e áudio explicativos, link da telemedicina, contatos de emergência e acesso à área do cliente.",
  },
  {
    q: "A telemedicina está inclusa em todos os planos?",
    a: "Sim. Todos os planos MundialCard incluem telemedicina, com níveis de cobertura que aumentam do Bronze ao Platinum.",
  },
  {
    q: "Os planos funerários valem em todo o Brasil?",
    a: "Sim. A estrutura é nacional, com rede de prestadores e suporte centralizado para acionamento e acompanhamento.",
  },
  {
    q: "Quando devo acionar a IA ou um atendente humano?",
    a: "Primeiro consulte a base de vídeos, áudios e FAQ. Se a dúvida permanecer, a IA orienta o próximo passo. Casos sensíveis ou sinistros seguem direto para atendimento humano prioritário. Ao final, em ambos os casos, solicitamos sua avaliação do atendimento.",
  },
  {
    q: "Como funciona o canal B2B com representantes?",
    a: "Representantes comerciais usam link exclusivo, materiais oficiais e portal parceiro para captar empresas e vidas, com comissão e acompanhamento em tempo real.",
  },
];

export const journeySteps = [
  { emoji: "📲", title: "Interesse", text: "Lead chega por ads, indicação ou representante." },
  { emoji: "🎥", title: "Educação", text: "Vídeo, áudio e FAQ tiram dúvidas antes do fechamento." },
  { emoji: "✍️", title: "Contratação", text: "Dados, contrato digital e pagamento recorrente." },
  { emoji: "⚙️", title: "Ativação", text: "Cliente entra no sistema interno como ativo." },
  { emoji: "🎁", title: "Kit digital", text: "Boas-vindas automáticas por e-mail e WhatsApp." },
];

export const supportSteps = [
  "Busca na base (FAQ, vídeo e áudio)",
  "Assistente de IA orienta o próximo passo",
  "Atendimento humano quando necessário",
  "Sistema interno registra e resolve",
  "Avaliação do atendimento (IA ou humano)",
];

/** Avaliação de suporte — site e referência para fluxo WhatsApp */
export const supportRating = {
  title: "Como foi seu atendimento?",
  subtitle:
    "Sua avaliação é solicitada ao final de todo atendimento — seja pela IA ou por um atendente humano.",
  channels: [
    { id: "ia", label: "Assistente virtual (IA)" },
    { id: "humano", label: "Atendente humano (WhatsApp / telefone)" },
  ],
  whatsapp: {
    alwaysAsk: true,
    prompt:
      "Antes de encerrar, gostaríamos de saber: *como foi seu atendimento hoje?* Responda com uma nota de *1 a 5* (1 = péssimo, 5 = excelente).",
    followUp:
      "Obrigado! Sua avaliação foi registrada e nos ajuda a melhorar o suporte MundialCard. Posso ajudar em mais alguma coisa?",
    options: [
      { score: 1, label: "1 — Péssimo" },
      { score: 2, label: "2 — Ruim" },
      { score: 3, label: "3 — Regular" },
      { score: 4, label: "4 — Bom" },
      { score: 5, label: "5 — Excelente" },
    ],
    commentPrompt: "Quer deixar um comentário sobre o atendimento? (opcional)",
    channelLabels: {
      ia: "Assistente virtual (IA)",
      humano: "Atendente humano",
    },
  },
};

export const mediaAssets = {
  app: assetUrl("/media/mundialcard-app.mp4"),
  institucional: assetUrl("/media/mundialcard-institucional.mp4"),
};

/** Ficha de cadastro — Cartão de Convênio Familiar (PDF editável, hospedado no site) */
export const registrationForm = {
  title: "Ficha de cadastro — Cartão de Convênio Familiar",
  description:
    "Baixe o contrato em PDF, preencha os dados do titular e dependentes e envie para concluir sua adesão ao plano escolhido.",
  fileName: "ficha-cadastro-convenio-familiar.pdf",
  url: assetUrl("/documents/ficha-cadastro-convenio-familiar.pdf"),
  mimeType: "application/pdf",
  sizeLabel: "822 KB",
  trustPoints: [
    "Download seguro direto do site oficial MundialCard",
    "Arquivo PDF padrão — sem programas, instalação ou executáveis",
    "Abra com o leitor de PDF do celular, tablet ou computador",
  ],
  trustNote:
    "Documento estático em PDF verificado. Em produção, a transferência ocorre por HTTPS com tipo de arquivo declarado pelo servidor.",
};
