// Generic API wrapper. All UI components call this — back-end is plug-and-play.
// Replace BASE_URL or swap the implementation with axios as needed.

const BASE_URL = "";

export async function apiGet<T>(path: string): Promise<T> {
  // // Example: apiGet('/api/pages/home')
  const res = await fetch(`${BASE_URL}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  // // Example: apiPost('/api/contact', { name, email, ... })
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}
