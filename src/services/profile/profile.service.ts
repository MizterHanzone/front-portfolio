import { apiClient } from "../api.client";
import { apiRoutes } from "../api-route";
import { API_BASE_URL } from "../api.config";

/** Matches GET /api/profile (or equivalent) response. */
export interface Profile {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  /** Local or international digits; used for `tel:` links */
  phone: string;
  /** e.g. `t.me/sokhankheav` or `https://t.me/sokhankheav` */
  telegram: string;
  photo: string;
  description?: string;
  start_date?: string;
}

/** Normalize API `telegram` to a full https://t.me/... URL. */
export function telegramHref(telegram: string): string {
  const t = telegram.trim();
  if (!t) return "https://t.me/";
  if (/^https?:\/\//i.test(t)) return t;
  const path = t
    .replace(/^@/, "")
    .replace(/^(https?:\/\/)?t\.me\/?/i, "");
  return `https://t.me/${path}`;
}

/**
 * Builds a `tel:` URL so mobile browsers open the dialer / Phone app when the link is tapped.
 * Strips formatting; normalizes Cambodia local numbers (leading `0`) to `+855…` (E.164).
 */
export function phoneHref(phone: string): string {
  const raw = phone.trim();
  if (!raw) return "tel:";
  if (/^tel:/i.test(raw)) return raw;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "tel:";
  // Already has country code (e.g. 855… or long international)
  if (digits.startsWith("855") || digits.length >= 11) {
    return `tel:+${digits}`;
  }
  // Cambodia local: 0 + national number (typ. 8–9 digits after 0)
  if (digits.startsWith("0") && digits.length >= 9 && digits.length <= 10) {
    return `tel:+855${digits.slice(1)}`;
  }
  return `tel:+${digits}`;
}

/** `mailto:` URL so tapping opens the default mail app / composer. */
export function mailtoHref(email: string): string {
  const e = email.trim();
  if (!e) return "mailto:";
  return `mailto:${e}`;
}

function getProfileUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  if (base) return `${base}${apiRoutes.profile.profile}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return "http://127.0.0.1:8000/api/profile";
  }
  return apiRoutes.profile.profile;
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const url = getProfileUrl();
    const data = await apiClient.get<Profile>(url);
    return data?.first_name != null && data?.last_name != null ? data : null;
  } catch {
    return null;
  }
}

let cachedProfile: Profile | null | undefined = undefined;
let profileInflight: Promise<Profile | null> | null = null;

/**
 * Same as {@link getProfile}, but dedupes concurrent calls and caches the result for the session.
 */
export async function getProfileCached(): Promise<Profile | null> {
  if (cachedProfile !== undefined) return cachedProfile;
  if (profileInflight) return profileInflight;
  profileInflight = getProfile().then((p) => {
    cachedProfile = p;
    profileInflight = null;
    return p;
  });
  return profileInflight;
}
