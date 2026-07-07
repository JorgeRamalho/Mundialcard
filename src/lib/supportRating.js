const STORAGE_KEY = "mundialcard_support_ratings";

export function getSupportRatings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSupportRating({ channel, score, comment = "", context = "atendimento" }) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    channel,
    score,
    comment: comment.trim(),
    context,
    createdAt: new Date().toISOString(),
  };

  const list = getSupportRatings();
  list.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return entry;
}

export const PENDING_HUMAN_RATING_KEY = "mundialcard_pending_human_rating";

export function markPendingHumanRating() {
  sessionStorage.setItem(PENDING_HUMAN_RATING_KEY, "1");
}

export function consumePendingHumanRating() {
  const pending = sessionStorage.getItem(PENDING_HUMAN_RATING_KEY) === "1";
  if (pending) {
    sessionStorage.removeItem(PENDING_HUMAN_RATING_KEY);
  }
  return pending;
}
