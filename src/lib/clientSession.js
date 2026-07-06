const SESSION_KEY = "mundialcard_client_session";

export function getClientSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.username) return null;
    return data;
  } catch {
    return null;
  }
}

export function setClientSession(username) {
  const payload = {
    username: username.trim(),
    loggedAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent("client-session:updated", { detail: payload }));
  return payload;
}

export function clearClientSession() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent("client-session:updated", { detail: null }));
}

export function loginClient(username, password) {
  const user = username.trim();
  const pass = password.trim();

  if (!user || !pass) {
    return { ok: false, message: "Informe usuário e senha." };
  }

  if (pass.length < 4) {
    return { ok: false, message: "A senha deve ter pelo menos 4 caracteres." };
  }

  setClientSession(user);
  return { ok: true };
}
