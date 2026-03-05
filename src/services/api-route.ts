/**
 * API Routes
 *
 * Centralized API endpoint definitions. Paths are relative to the global base URL.
 * Base URL is set via VITE_API_BASE_URL in .env (e.g. http://127.0.0.1:8000).
 * Change the env value when you need a different domain.
 *
 * Usage:
 * ```ts
 * import { apiRoutes } from "@/services/api-route";
 * import { API_BASE_URL } from "@/services/api.config";
 * const url = `${API_BASE_URL.replace(/\/$/, "")}${apiRoutes.auth.login}`;
 * ```
 */


/** Profile endpoints */
export const profileRoutes = {
  profile: "/api/profile",
} as const;

/** All API routes grouped together */
export const apiRoutes = {
  profile: profileRoutes,
} as const;

export default apiRoutes;

  