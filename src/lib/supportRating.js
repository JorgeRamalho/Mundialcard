import { supabase, isSupabaseConfigured } from "./supabase.js";

const STORAGE_KEY = "mundialcard_support_ratings";

function getSupportRatingsLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveSupportRatingLocal(entry) {
  const list = getSupportRatingsLocal();
  list.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return entry;
}

export function getSupportRatings() {
  return getSupportRatingsLocal();
}

export async function saveSupportRating({ channel, score, comment = "", context = "atendimento" }) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    channel,
    score,
    comment: comment.trim(),
    context,
    createdAt: new Date().toISOString(),
  };

  if (!isSupabaseConfigured()) {
    return saveSupportRatingLocal(entry);
  }

  const { data: authData } = await supabase.auth.getUser();

  const { error } = await supabase.from("support_ratings").insert({
    profile_id: authData?.user?.id ?? null,
    channel,
    score,
    comment: comment.trim() || null,
    context,
  });

  if (error) {
    return saveSupportRatingLocal(entry);
  }

  return saveSupportRatingLocal(entry);
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
