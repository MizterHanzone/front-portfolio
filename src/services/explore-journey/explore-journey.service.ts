import { apiClient } from "../api.client";
import { apiRoutes } from "../api-route";
import { API_BASE_URL } from "../api.config";

export interface ExploreJourney {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

function getExploreJourneysUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  if (base) return `${base}${apiRoutes.exploreJourney.exploreJourneys}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return "http://127.0.0.1:8000/api/explore-journeys";
  }
  return apiRoutes.exploreJourney.exploreJourneys;
}

export async function getExploreJourneys(): Promise<ExploreJourney | null> {
  try {
    const url = getExploreJourneysUrl();
    const data = await apiClient.get<ExploreJourney[]>(url, { skipAuth: true });
    const items = Array.isArray(data) ? data : [];
    const first = items[0];
    return first?.title != null && first?.description != null ? first : null;
  } catch {
    return null;
  }
}
