const STORAGE_KEY = "mundialcard_triage_sessions";

export function saveTriageSession(session) {
  const entry = {
    id: `TRI-${Date.now().toString(36).toUpperCase()}`,
    ...session,
    createdAt: new Date().toISOString(),
  };
  const list = getTriageSessions();
  list.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
  return entry;
}

export function getTriageSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
