/** Dados demonstrativos para os gráficos do dashboard operacional. */
export const dashboardPieCharts = [
  {
    id: "plans",
    title: "Distribuição por plano",
    subtitle: "Base de clientes ativos no mês",
    centerLabel: "Clientes",
    segments: [
      { label: "Bronze", value: 231, color: "#b87333" },
      { label: "Prata", value: 359, color: "#94a3b8" },
      { label: "Ouro", value: 411, color: "#d4a017" },
      { label: "Diamante", value: 154, color: "#14b8a6" },
      { label: "Premium", value: 90, color: "#8c1417" },
      { label: "Platinum", value: 39, color: "#6e0f12" },
    ],
  },
  {
    id: "leads",
    title: "Origem dos leads",
    subtitle: "Captação digital — últimos 30 dias",
    centerLabel: "Leads",
    segments: [
      { label: "Site / Landing", value: 137, color: "#8c1417" },
      { label: "WhatsApp", value: 101, color: "#25d366" },
      { label: "Representantes B2B", value: 59, color: "#14b8a6" },
      { label: "Indicação", value: 29, color: "#d4a017" },
    ],
  },
  {
    id: "status",
    title: "Status operacional",
    subtitle: "Situação dos contratos ativos",
    centerLabel: "Contratos",
    segments: [
      { label: "Ativos", value: 1002, color: "#10b981" },
      { label: "Onboarding", value: 180, color: "#f59e0b" },
      { label: "Pendência doc.", value: 72, color: "#ef4444" },
      { label: "Renovação", value: 30, color: "#0ea5e9" },
    ],
  },
  {
    id: "channels",
    title: "Canais de atendimento",
    subtitle: "Volume de contatos registrados",
    centerLabel: "Contatos",
    segments: [
      { label: "WhatsApp", value: 412, color: "#25d366" },
      { label: "Dr. Digital", value: 198, color: "#14b8a6" },
      { label: "Telefone", value: 176, color: "#8c1417" },
      { label: "Central web", value: 114, color: "#64748b" },
    ],
  },
];
