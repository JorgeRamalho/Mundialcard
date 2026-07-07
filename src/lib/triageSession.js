import { supabase, isSupabaseConfigured } from "./supabase.js";

const STORAGE_KEY = "mundialcard_triage_sessions";

function saveTriageSessionLocal(entry) {
  const list = getTriageSessionsLocal();
  list.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
  return entry;
}

function getTriageSessionsLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export async function saveTriageSession(session) {
  const externalId = `TRI-${Date.now().toString(36).toUpperCase()}`;
  const entry = {
    id: externalId,
    ...session,
    createdAt: new Date().toISOString(),
  };

  if (!isSupabaseConfigured()) {
    return saveTriageSessionLocal(entry);
  }

  const { data: authData } = await supabase.auth.getUser();
  const { result, ...payload } = session;

  const { error } = await supabase.from("triage_sessions").insert({
    profile_id: authData?.user?.id ?? null,
    external_id: externalId,
    payload,
    result: result || {},
  });

  if (error) {
    return saveTriageSessionLocal(entry);
  }

  saveTriageSessionLocal(entry);
  return entry;
}

export async function getTriageSessions() {
  if (!isSupabaseConfigured()) {
    return getTriageSessionsLocal();
  }

  const { data: authData } = await supabase.auth.getUser();
  const userId = authData?.user?.id;

  if (!userId) {
    return getTriageSessionsLocal();
  }

  const { data, error } = await supabase
    .from("triage_sessions")
    .select("external_id, payload, result, created_at")
    .eq("profile_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data?.length) {
    return getTriageSessionsLocal();
  }

  return data.map((row) => ({
    id: row.external_id,
    ...row.payload,
    result: row.result,
    createdAt: row.created_at,
  }));
}
