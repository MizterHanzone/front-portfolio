import { apiClient } from "../api.client";
import { apiRoutes } from "../api-route";
import { API_BASE_URL } from "../api.config";

export interface AboutMe {
  title: string;
  description: string;
  subdescription: string[];
  image: string;
  thumbnail: string;
}

function getAboutMeUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  if (base) return `${base}${apiRoutes.aboutMe.aboutMe}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return "http://127.0.0.1:8000/api/about-me";
  }
  return apiRoutes.aboutMe.aboutMe;
}

export async function getAboutMe(): Promise<AboutMe | null> {
  try {
    const url = getAboutMeUrl();
    const data = await apiClient.get<AboutMe>(url, { skipAuth: true });
    return data?.title != null && data?.description != null ? data : null;
  } catch {
    return null;
  }
}
