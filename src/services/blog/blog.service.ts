import { apiClient } from "../api.client";
import { API_BASE_URL } from "../api.config";
import { apiRoutes } from "../api-route";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string | string[];
  featured_image?: string | null;
  category?: string | null;
  tags?: string | string[];
  reading_time?: number | null;
  status?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string");
  }
  if (typeof value === "string") {
    // Accept either JSON array string or comma-separated list
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === "string");
    } catch {
      // fall through to comma split
    }
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function formatDate(dateStr: string | null | undefined): string {
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

export interface BlogDisplay {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  readingTime: string;
  publishedAt: string;
  href: string;
}

function normalizeBlog(raw: Record<string, unknown>): BlogDisplay {
  const title = String(raw.title ?? "");
  const slug = String(raw.slug ?? "");
  const excerpt = String(raw.excerpt ?? "");
  const content =
    Array.isArray(raw.content) ? raw.content.filter((c): c is string => typeof c === "string").join("\n\n") : String(raw.content ?? "");
  const image = String(raw.featured_image ?? "");
  const category = String(raw.category ?? "");
  const tags = parseTags(raw.tags);
  const readingTime =
    typeof raw.reading_time === "number" ? `${raw.reading_time} min read` : String(raw.reading_time ?? "");
  const publishedAt = formatDate(raw.published_at as string | null);

  return {
    id: Number(raw.id),
    title,
    slug,
    excerpt: excerpt || content.split("\n")[0]?.slice(0, 140) || "",
    content,
    image,
    category,
    tags,
    readingTime,
    publishedAt,
    href: slug ? `/blog/${slug}` : "#blog",
  };
}

function getBlogsUrl(): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  const path = apiRoutes.blog?.blogs ?? "/api/blogs";
  if (base) return `${base}${path}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return `http://127.0.0.1:8000${path}`;
  }
  return path;
}

export async function getBlogs(): Promise<BlogDisplay[]> {
  try {
    const url = getBlogsUrl();
    const data = await apiClient.get<unknown>(url, { skipAuth: true });

    let items: unknown[] = [];
    if (Array.isArray(data)) {
      items = data;
    } else if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      if (Array.isArray(d.data)) items = d.data;
      else if (Array.isArray(d.blogs)) items = d.blogs;
      else if (Array.isArray(d.posts)) items = d.posts;
    }

    return items.map((item) =>
      normalizeBlog(typeof item === "object" && item !== null ? (item as Record<string, unknown>) : {})
    );
  } catch {
    return [];
  }
}

function getBlogBySlugUrl(slug: string): string {
  const base = API_BASE_URL?.replace(/\/$/, "") || "";
  const path = (apiRoutes.blog?.blog ?? "/api/blogs/:slug").replace(":slug", encodeURIComponent(slug));
  if (base) return `${base}${path}`;
  if (typeof import.meta.env !== "undefined" && import.meta.env.DEV) {
    return `http://127.0.0.1:8000${path}`;
  }
  return path;
}

export async function getBlogBySlug(slug: string): Promise<BlogDisplay | null> {
  if (!slug || !slug.trim()) return null;
  try {
    const url = getBlogBySlugUrl(slug.trim());
    const data = await apiClient.get<unknown>(url, { skipAuth: true });
    if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      const raw = (d.data as Record<string, unknown>) ?? d;
      return normalizeBlog(typeof raw === "object" && raw !== null ? raw : {});
    }
    return null;
  } catch {
    return null;
  }
}

