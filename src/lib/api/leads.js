import { supabase, isSupabaseConfigured } from "../supabase.js";

const LEADS_KEY = "mundialcard_leads";

export function makeCoupon(nome) {
  const prefix = nome.trim().split(" ")[0].slice(0, 4).toUpperCase();
  const code = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MUND-${prefix}${code}`;
}

function saveLeadLocal(entry) {
  const list = JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
  list.push(entry);
  localStorage.setItem(LEADS_KEY, JSON.stringify(list));
  return entry;
}

async function resolvePartnerId(referralCode) {
  if (!referralCode?.trim() || !isSupabaseConfigured()) return null;

  const code = referralCode.trim().toUpperCase();
  const { data, error } = await supabase
    .from("partners")
    .select("id")
    .eq("referral_code", code)
    .maybeSingle();

  if (error || !data) return null;
  return data.id;
}

export async function createLead(values, options = {}) {
  const coupon = makeCoupon(values.nome);
  const partnerId = await resolvePartnerId(options.referralCode);

  const payload = {
    nome: values.nome.trim(),
    nascimento: values.nascimento || null,
    cidade: values.cidade.trim(),
    telefone: values.telefone.trim(),
    email: values.email.trim().toLowerCase(),
    endereco: values.endereco.trim(),
    coupon,
    source: partnerId ? "parceiro" : "site",
    status: "interesse",
    ...(partnerId ? { partner_id: partnerId } : {}),
  };

  if (!isSupabaseConfigured()) {
    const entry = { ...payload, createdAt: new Date().toISOString() };
    saveLeadLocal(entry);
    return { ok: true, coupon, mode: "local" };
  }

  const { error } = await supabase.from("leads").insert(payload);

  if (error) {
    saveLeadLocal({ ...payload, createdAt: new Date().toISOString() });
    return { ok: true, coupon, mode: "local-fallback", warning: error.message };
  }

  return { ok: true, coupon, mode: "supabase" };
}

export async function fetchLeadsFunnel() {
  const fallback = {
    interesse: 820,
    educacao: 510,
    contratacao: 190,
    kit: 176,
  };

  if (!isSupabaseConfigured()) return fallback;

  const { data, error } = await supabase.from("leads").select("status");

  if (error || !data?.length) return fallback;

  const counts = { interesse: 0, educacao: 0, contratacao: 0, kit: 0 };
  for (const row of data) {
    const key = row.status;
    if (key in counts) counts[key] += 1;
    else counts.interesse += 1;
  }
  return counts;
}
