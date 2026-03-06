import { apiClient } from "../api.client";
import { apiRoutes } from "../api-route";
import { API_BASE_URL } from "../api.config";

export interface SkillCategory {
  id: number;
  name: string;
  description: string;
}

export interface Skill {
  id: number;
  skill_name: string;
  category_id: number;
  level: string;
  description?: string[];
  image: string;
  subimage?: string;
  thumbnail?: string[];
  created_at: string;
  updated_at: string;
  category: SkillCategory;
}

function getSkillsUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  if (base) return `${base}${apiRoutes.skill.skills}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return "http://127.0.0.1:8000/api/skills";
  }
  return apiRoutes.skill.skills;
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

function parseDescription(value: unknown): string[] {
  return parseStringArray(value);
}

function normalizeSkill(raw: Record<string, unknown>): Skill {
  let description = parseDescription(raw.description);
  if (description.length === 0) description = parseDescription(raw.descriptions);
  if (description.length === 0) description = parseDescription(raw.capabilities);
  const thumbnail = parseStringArray(raw.thumbnail);
  return {
    id: Number(raw.id),
    skill_name: String(raw.skill_name ?? ""),
    category_id: Number(raw.category_id ?? 0),
    level: String(raw.level ?? ""),
    description: description.length > 0 ? description : undefined,
    image: String(raw.image ?? ""),
    subimage: typeof raw.subimage === "string" && raw.subimage.trim() ? String(raw.subimage) : undefined,
    thumbnail: thumbnail.length > 0 ? thumbnail : undefined,
    created_at: String(raw.created_at ?? ""),
    updated_at: String(raw.updated_at ?? ""),
    category: raw.category && typeof raw.category === "object" && !Array.isArray(raw.category)
      ? {
          id: Number((raw.category as Record<string, unknown>).id),
          name: String((raw.category as Record<string, unknown>).name ?? ""),
          description: String((raw.category as Record<string, unknown>).description ?? ""),
        }
      : { id: 0, name: "", description: "" },
  };
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const url = getSkillsUrl();
    const data = await apiClient.get<unknown>(url, { skipAuth: true });

    let items: unknown[] = [];
    if (Array.isArray(data)) {
      items = data;
    } else if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      if (Array.isArray(d.data)) items = d.data;
      else if (Array.isArray(d.skills)) items = d.skills;
    }

    return items.map((item) => normalizeSkill(typeof item === "object" && item !== null ? (item as Record<string, unknown>) : {}));
  } catch {
    return [];
  }
}
