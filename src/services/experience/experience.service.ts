import { apiClient } from "../api.client";
import { apiRoutes } from "../api-route";
import { API_BASE_URL } from "../api.config";

export interface Experience {
  id: number;
  company_name: string;
  location: string;
  position: string;
  description: string | string[];
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  thumbnail: string[];
  language_code: string[];
  created_at: string;
  updated_at: string;
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    } catch {
      return value.trim() ? [value] : [];
    }
  }
  return [];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  // Some APIs return fractional seconds with more than 3 digits (microseconds).
  // Normalize fractional seconds to milliseconds so Date can parse reliably.
  const s = String(dateStr);
  const cleaned = s.replace(/\.(\d+)Z$/, (_m, p1) => {
    const ms = (p1 + "000").slice(0, 3); // take first 3 digits, pad if needed
    return `.${ms}Z`;
  });
  const date = new Date(cleaned);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function parseDescription(value: unknown): string {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").join("\n\n");
  }
  if (typeof value === "string") {
    return value;
  }
  if (value == null) return "";
  try {
    return String(value);
  } catch {
    return "";
  }
}

export interface ExperienceDisplay {
  id: number;
  company: string;
  location: string;
  dates: string;
  role: string;
  shortDescription: string;
  description: string;
  tags: string[];
  highlighted: boolean;
  thumbnails: string[];
  href: string;
}

function normalizeExperience(raw: Record<string, unknown>): ExperienceDisplay {
  const startDate = formatDate(raw.start_date as string | null);
  const isCurrent =
    raw.is_current === true || String(raw.is_current).toLowerCase() === "true";
  const endDate = isCurrent ? "Present" : formatDate(raw.end_date as string | null);
  const dates = [startDate, endDate].filter(Boolean).join(" - ");

  const description = parseDescription(raw.description ?? "");
  const shortDescription = description.split(".")[0]?.trim() || description.slice(0, 80);

  return {
    id: Number(raw.id),
    company: String(raw.company_name ?? ""),
    location: String(raw.location ?? ""),
    dates: dates || "—",
    role: String(raw.position ?? ""),
    shortDescription,
    description,
    tags: parseStringArray(raw.language_code),
    highlighted: isCurrent,
    thumbnails: parseStringArray(raw.thumbnail),
    href: "#portfolio",
  };
}

function getExperiencesUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  if (base) return `${base}${apiRoutes.experience.experiences}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return "http://127.0.0.1:8000/api/experiences";
  }
  return apiRoutes.experience.experiences;
}

export async function getExperiences(): Promise<ExperienceDisplay[]> {
  try {
    const url = getExperiencesUrl();
    const data = await apiClient.get<unknown>(url, { skipAuth: true });

    let items: unknown[] = [];
    if (Array.isArray(data)) {
      items = data;
    } else if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      if (Array.isArray(d.data)) items = d.data;
      else if (Array.isArray(d.experiences)) items = d.experiences;
    }

    return items.map((item) =>
      normalizeExperience(typeof item === "object" && item !== null ? (item as Record<string, unknown>) : {})
    );
  } catch {
    return [];
  }
}
