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
    logo: "/images/parceiros/parceiro-1.png",
    url: "https://www.otorrinomt.com.br/site/",
  },
  {
    name: "Hospital Militar de Mato Grosso",
    logo: "/images/parceiros/parceiro-2.png",
    url: "#",
  },
  {
    name: "Hospital Ortopédico",
    logo: "/images/parceiros/parceiro-3.png",
    url: "http://www.ortopedicomt.com.br/",
  },
  {
    name: "Hospital São Judas Tadeu",
    logo: "/images/parceiros/parceiro-4.png",
    url: "https://www.hospitalsaojudas.com.br/",
  },
  {
    name: "Odonto Medicina",
    logo: "/images/parceiros/parceiro-5.png",
    url: "https://odontomedicina.com/",
  },
  {
    name: "Usmedic",
    logo: "/images/parceiros/parceiro-6.png",
    url: "https://usmedic-cuiaba-clinica-ame.negocio.site/",
  },
  {
    name: "Odonto Medicina",
    logo: "/images/parceiros/parceiro-7.png",
    url: "https://odontomedicina.com/",
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
    a: "Primeiro consulte a base de vídeos, áudios e FAQ. Se a dúvida permanecer, a IA orienta o próximo passo. Casos sensíveis ou sinistros seguem direto para atendimento humano prioritário.",
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
];

export const mediaAssets = {
  app: "/media/mundialcard-app.mp4",
  institucional: "/media/mundialcard-institucional.mp4",
};
