import { apiClient } from "../api.client";
import { apiRoutes } from "../api-route";
import { API_BASE_URL } from "../api.config";

export interface Profile {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  photo: string;
  description?: string;
  start_date?: string;
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
