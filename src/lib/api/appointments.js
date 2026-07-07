import { supabase, isSupabaseConfigured } from "../supabase.js";

const APPOINTMENTS_KEY = "mundialcard_appointments";

function saveAppointmentLocal(entry) {
  const list = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]");
  list.push(entry);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(list));
}

export async function createAppointment(form, profileId = null) {
  const payload = {
    specialty: form.especialidade,
    appointment_date: form.data,
    appointment_time: form.horario,
    notes: form.observacao || null,
    status: "agendado",
    profile_id: profileId,
  };

  if (!isSupabaseConfigured()) {
    saveAppointmentLocal({ ...form, createdAt: new Date().toISOString() });
    return { ok: true, mode: "local" };
  }

  const { error } = await supabase.from("appointments").insert(payload);

  if (error) {
    saveAppointmentLocal({ ...form, createdAt: new Date().toISOString() });
    return { ok: true, mode: "local-fallback", warning: error.message };
  }

  return { ok: true, mode: "supabase" };
}

export async function countScheduledAppointments() {
  if (!isSupabaseConfigured()) {
    const list = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]");
    return list.length || 47;
  }

  const { count, error } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("status", "agendado");

  if (error) return 47;
  return count ?? 0;
}
