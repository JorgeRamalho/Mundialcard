const STORAGE_KEY = "mundialcard_cookie_consent";

export const defaultPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function getStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    return {
      essential: true,
      analytics: Boolean(data.analytics),
      marketing: Boolean(data.marketing),
      decided: Boolean(data.decided),
      timestamp: data.timestamp || null,
    };
  } catch {
    return null;
  }
}

export function saveConsent(preferences) {
  const payload = {
    essential: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
    decided: true,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  applyConsent(payload);
  window.dispatchEvent(new CustomEvent("cookie-consent:updated", { detail: payload }));
  return payload;
}

/** Aplica as preferências salvas ao documento (LGPD — só ativa opcionais com consentimento). */
export function applyConsent(consent = getStoredConsent()) {
  const root = document.documentElement;
  const decided = Boolean(consent?.decided);
  const analytics = decided && Boolean(consent?.analytics);
  const marketing = decided && Boolean(consent?.marketing);

  root.dataset.cookieConsent = decided ? "decided" : "pending";
  root.dataset.cookieAnalytics = analytics ? "granted" : "denied";
  root.dataset.cookieMarketing = marketing ? "granted" : "denied";
}
