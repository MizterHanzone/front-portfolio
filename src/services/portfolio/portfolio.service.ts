import { apiClient } from "../api.client";
import { API_BASE_URL } from "../api.config";
import { apiRoutes } from "../api-route";

export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  thumbnail?: string[] | string | null;
  github_url?: string | null;
  project_url?: string[] | string | null;
  category?: { name?: string; slug?: string } | null;
  is_featured?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === "string");
    } catch {
      return value.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  const s = String(dateStr);
  const cleaned = s.replace(/\.(\d+)Z$/, (_m, p1) => {
    const ms = (p1 + "000").slice(0, 3);
    return `.${ms}Z`;
  });
  const d = new Date(cleaned);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export interface PortfolioDisplay {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  thumbnails: string[];
  githubUrl: string;
  projectUrls: string[];
  category: string;
  featured: boolean;
  dates: string;
  href: string;
  projectName?: string;
  status?: string;
}

function normalizePortfolio(raw: Record<string, unknown>): PortfolioDisplay {
  const thumbnails = parseStringArray(raw.thumbnail ?? raw.thumbnails ?? []);
  const projectUrls = parseStringArray(raw.project_url ?? raw.project_urls ?? raw.projectUrl ?? []);
  const image = String(raw.image ?? "");
  const category =
    typeof raw.category === "object" && raw.category !== null
      ? String((raw.category as Record<string, unknown>).name ?? "")
      : String(raw.category ?? "");
  const description =
    Array.isArray(raw.description) ? raw.description.filter((d): d is string => typeof d === "string").join("\n\n") : String(raw.description ?? "");
  const created = formatDate(String(raw.created_at ?? raw.createdAt ?? ""));

  // If there's a nested `project` object, merge its thumbnails, description, and meta URLs.
  const projectObj = typeof raw.project === "object" && raw.project !== null ? (raw.project as Record<string, unknown>) : null;
  if (projectObj) {
    // merge project thumbnails
    const projThumbs = parseStringArray(projectObj.thumbnail ?? projectObj.thumbnails ?? []);
    if (projThumbs.length > 0) {
      // prepend project thumbnails so they show first in the gallery
      (thumbnails as string[]).unshift(...projThumbs);
    }
  }

  // Extract URLs from project.meta fields (strings like "url: https://...") and merge into projectUrls
  const metaUrls: string[] = [];
  if (projectObj && Array.isArray(projectObj.meta)) {
    const metaArr = projectObj.meta as unknown[];
    for (const m of metaArr) {
      if (typeof m === "string") {
        const matches = m.match(/https?:\/\/[^\]\s'"]+/g);
        if (matches) metaUrls.push(...matches);
      }
    }
  }
  // Dedupe only URLs from portfolio fields; keep every `meta` entry so duplicate URLs
  // in `meta` still render as separate links when the API lists them twice.
  const combinedProjectUrls = [...Array.from(new Set(projectUrls)), ...metaUrls];

  // Final description (handle possible project description merge above)
  let finalDescription = description;
  if (projectObj) {
    const projDesc =
      Array.isArray(projectObj.description) ? (projectObj.description as unknown[]).filter((d): d is string => typeof d === "string").join("\n\n") : String(projectObj.description ?? "");
    if (projDesc && projDesc !== "undefined" && projDesc !== "null") {
      finalDescription = [description].filter(Boolean).concat([projDesc].filter(Boolean)).join("\n\n");
    }
  }

  const allThumbnails = thumbnails as string[];
  const mainImage = image || (allThumbnails.length > 0 ? allThumbnails[0] : "");
  const projectName = projectObj ? String(projectObj.name ?? "") : "";
  const status = projectObj ? String(projectObj.status ?? "") : "";

  return {
    id: Number(raw.id),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    description: finalDescription,
    image: mainImage,
    thumbnails: allThumbnails,
    githubUrl: String(raw.github_url ?? ""),
    projectUrls: combinedProjectUrls,
    category,
    featured: Boolean(raw.is_featured),
    dates: created,
    href: String(raw.slug ?? "") ? `/portfolio/${String(raw.slug)}` : "#portfolio",
    projectName: projectName || undefined,
    status: status || undefined,
  };
}

function getPortfoliosUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  const path = apiRoutes.portfolio?.portfolios ?? "/api/portfolios";
  if (base) return `${base}${path}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return `http://127.0.0.1:8000${path}`;
  }
  return path;
}

export async function getPortfolios(): Promise<PortfolioDisplay[]> {
  try {
    const url = getPortfoliosUrl();
    const data = await apiClient.get<unknown>(url, { skipAuth: true });
    let items: unknown[] = [];
    if (Array.isArray(data)) items = data;
    else if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      if (Array.isArray(d.data)) items = d.data;
      else if (Array.isArray(d.portfolios)) items = d.portfolios;
      else if (Array.isArray(d.items)) items = d.items;
    }
    return items.map((it) => normalizePortfolio(typeof it === "object" && it !== null ? (it as Record<string, unknown>) : {}));
  } catch {
    return [];
  }
}

export interface ProjectSummary {
  completed: number;
  in_progress: number;
  total: number;
}

function getProjectSummaryUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  const path = apiRoutes.project?.summary ?? "/api/projects/summary";
  if (base) return `${base}${path}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return `http://127.0.0.1:8000${path}`;
  }
  return path;
}

export async function getProjectSummary(): Promise<ProjectSummary | null> {
  try {
    const url = getProjectSummaryUrl();
    const data = await apiClient.get<unknown>(url, { skipAuth: true });
    if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      const inner = (d.data as Record<string, unknown>) ?? d;
      return {
        completed: Number(inner.completed ?? 0),
        in_progress: Number(inner.in_progress ?? 0),
        total: Number(inner.total ?? 0),
      };
    }
    return null;
  } catch {
    return null;
  }
}

