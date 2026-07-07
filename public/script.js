/**
 * MundialCard — utilitários de front (vanilla JS)
 * Complementa a aplicação React com helpers reutilizáveis.
 */

export function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
}

export function saveLead(lead) {
  const list = JSON.parse(localStorage.getItem("mundialcard_leads") || "[]");
  list.push({ ...lead, createdAt: new Date().toISOString() });
  localStorage.setItem("mundialcard_leads", JSON.stringify(list));
  return list;
}

export function getLeads() {
  return JSON.parse(localStorage.getItem("mundialcard_leads") || "[]");
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
