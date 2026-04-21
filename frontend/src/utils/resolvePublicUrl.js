/**
 * Image URLs from the API may be absolute (https://…) or served from the API host (/uploads/…).
 * When the site is built with VITE_API_URL pointing at a separate API origin, prefix relative paths
 * so <img src> loads from the API, not the static SPA host.
 */
const viteApi = import.meta.env.VITE_API_URL || '';

export function resolvePublicUrl(src) {
  if (src == null || src === '') return '';
  const s = String(src);
  if (/^(https?:|data:|blob:)/i.test(s)) return s;
  if (s.startsWith('/')) {
    const base = viteApi.replace(/\/api\/?$/i, '');
    if (base) return `${base}${s}`;
    return s;
  }
  return s;
}
