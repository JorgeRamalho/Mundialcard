import { supabase, isSupabaseConfigured } from "./supabase.js";

const SESSION_KEY = "mundialcard_client_session";

let cachedSession = null;

function mapSupabaseSession(session, profile = null) {
  if (!session?.user) return null;

  const email = session.user.email || "";
  const meta = session.user.user_metadata || {};

  return {
    userId: session.user.id,
    email,
    username: profile?.full_name || meta.full_name || email.split("@")[0],
    role: profile?.role || meta.role || "client",
    loggedAt: session.user.last_sign_in_at || new Date().toISOString(),
    mode: "supabase",
  };
}

function mapLocalSession(data) {
  if (!data?.username) return null;
  return { ...data, mode: "local" };
}

function persistLocalSession(username) {
  const payload = {
    username: username.trim(),
    loggedAt: new Date().toISOString(),
    mode: "local",
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  cachedSession = payload;
  window.dispatchEvent(new CustomEvent("client-session:updated", { detail: payload }));
  return payload;
}

async function fetchProfile(userId) {
  if (!supabase || !userId) return null;
  const { data } = await supabase.from("profiles").select("full_name, role").eq("id", userId).maybeSingle();
  return data;
}

export function getClientSession() {
  if (cachedSession) return cachedSession;

  if (!isSupabaseConfigured()) {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      cachedSession = mapLocalSession(JSON.parse(raw));
      return cachedSession;
    } catch {
      return null;
    }
  }

  return cachedSession;
}

export async function initAuth() {
  if (!isSupabaseConfigured()) {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      cachedSession = raw ? mapLocalSession(JSON.parse(raw)) : null;
    } catch {
      cachedSession = null;
    }
    return cachedSession;
  }

  const { data } = await supabase.auth.getSession();
  const profile = data.session ? await fetchProfile(data.session.user.id) : null;
  cachedSession = mapSupabaseSession(data.session, profile);

  supabase.auth.onAuthStateChange(async (_event, session) => {
    const nextProfile = session ? await fetchProfile(session.user.id) : null;
    cachedSession = mapSupabaseSession(session, nextProfile);
    window.dispatchEvent(new CustomEvent("client-session:updated", { detail: cachedSession }));
  });

  window.dispatchEvent(new CustomEvent("client-session:updated", { detail: cachedSession }));
  return cachedSession;
}

export async function clearClientSession() {
  cachedSession = null;

  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  } else {
    localStorage.removeItem(SESSION_KEY);
  }

  window.dispatchEvent(new CustomEvent("client-session:updated", { detail: null }));
}

export async function loginClient(usernameOrEmail, password) {
  const identifier = usernameOrEmail.trim();
  const pass = password.trim();

  if (!identifier || !pass) {
    return { ok: false, message: "Informe usuário/e-mail e senha." };
  }

  if (pass.length < 4) {
    return { ok: false, message: "A senha deve ter pelo menos 4 caracteres." };
  }

  if (!isSupabaseConfigured()) {
    persistLocalSession(identifier);
    return { ok: true, mode: "local" };
  }

  const email = identifier.includes("@") ? identifier : `${identifier}@mundialcard.demo`;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) {
    return { ok: false, message: "Credenciais inválidas ou usuário não cadastrado no Supabase." };
  }

  const profile = await fetchProfile(data.user.id);
  cachedSession = mapSupabaseSession(data.session, profile);
  window.dispatchEvent(new CustomEvent("client-session:updated", { detail: cachedSession }));

  return { ok: true, mode: "supabase" };
}

export function getProfileId() {
  return cachedSession?.userId || null;
}
