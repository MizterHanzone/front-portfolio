import { apiClient } from "../api.client";
import { apiRoutes } from "../api-route";
import { API_BASE_URL } from "../api.config";

export interface Banner {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

function getBannerUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  if (base) return `${base}${apiRoutes.banner.banner}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return "http://127.0.0.1:8000/api/banner";
  }
  return apiRoutes.banner.banner;
}

export async function getBanner(): Promise<Banner | null> {
  try {
    const url = getBannerUrl();
    const data = await apiClient.get<Banner>(url, { skipAuth: true });
    return data?.title != null && data?.image != null ? data : null;
  } catch {
    return null;
  }
}
