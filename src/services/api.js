/**
 * API client – use for backend integration later.
 * For now, the app is static; add base URL and fetch/axios calls when ready.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
