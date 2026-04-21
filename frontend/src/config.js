// Production (e.g. Vercel static): the browser must call a real API host — set VITE_API_URL at build time
// to your backend base, e.g. https://your-api.onrender.com/api (same value the deployed Express app would use for /api).
// Local Vite dev: use same-origin /api so vite.config.js proxies to http://127.0.0.1:5001 (IPv4 — avoids hitting the wrong app on localhost).
function normalizeApiBase(raw) {
  const v = (raw || '').trim();
  if (!v) return '/api';

  // Remove trailing slashes for consistent joining.
  const noTrail = v.replace(/\/+$/, '');

  // If they already provided ".../api" (or just "/api"), keep it.
  if (/\/api$/i.test(noTrail)) return noTrail;

  // If they provided only an origin (e.g. https://host or http://127.0.0.1:5001),
  // default to the API prefix we use in Express.
  return `${noTrail}/api`;
}

const API_URL = normalizeApiBase(import.meta.env.VITE_API_URL);

export default API_URL;
