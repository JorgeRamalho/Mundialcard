/** Rede credenciada de farmácias — benefício MundialCard */
export const pharmacyNetwork = {
  title: "Rede de Farmácias MundialCard",
  discountRange: "20% a 50%",
  discountNote:
    "Apresente seu cartão MundialCard e o protocolo Dr. Digital na farmácia credenciada para obter o desconto.",
  howToUse: [
    "Leve a guia de receita médica (validada pelo médico, quando exigido) e seu cartão MundialCard",
    "Informe o protocolo da triagem Dr. Digital no balcão",
    "O desconto é aplicado sobre medicamentos da lista credenciada",
    "Medicamentos controlados exigem receita em duas vias, conforme ANVISA",
  ],
  partners: [
    { name: "Drogasil / Raia Drogasil", discount: "até 35%", region: "Nacional" },
    { name: "Pague Menos", discount: "até 40%", region: "Nacional" },
    { name: "Extrafarma", discount: "até 30%", region: "Nacional" },
    { name: "Farmácias credenciadas MT", discount: "até 50%", region: "Mato Grosso" },
    { name: "Rede parceira MundialCard", discount: "20% a 50%", region: "Todo o Brasil" },
  ],
  legalNote:
    "Descontos sujeitos à disponibilidade do produto e à adesão da farmácia à rede credenciada. " +
    "Receitas e atestados só têm validade legal com assinatura e CRM de médico habilitado (CFM).",
};
