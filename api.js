// Change this once and every page follows.
// Use your Cloudflare tunnel URL when the pages are hosted somewhere other than your own PC.
const API_BASE = 'https://relay-api.bricksverse.org';

// Small fetch wrapper: sends the login cookie, sends/receives JSON, throws Error(message) on failure.
async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(API_BASE + path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try { data = await res.json(); } catch (e) { /* 204 or empty body */ }

  if (!res.ok) throw new Error((data && data.error) || 'Request failed (' + res.status + ')');
  return data;
}
