// Central API client — all components call these functions.
// Backend: http://localhost:5000

const BASE_URL = "http://localhost:5000";

// ── Generic helpers ────────────────────────────────────────────────────────

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  const json = await res.json();
  // Backend wraps responses in { success, data }
  return (json.data ?? json) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  const json = await res.json();
  return (json.data ?? json) as T;
}

// ── Auth ───────────────────────────────────────────────────────────────────

export interface AuthResult {
  token: string;
  user: { id: string; name: string; email: string; role: string };
}

export async function login(email: string, password: string): Promise<AuthResult> {
  return apiPost<AuthResult>("/api/auth/login", { email, password });
}

export async function register(name: string, email: string, password: string): Promise<AuthResult> {
  return apiPost<AuthResult>("/api/auth/register", { name, email, password });
}

// ── Pages (CMS) ────────────────────────────────────────────────────────────

export async function getPage<T = Record<string, unknown>>(slug: string): Promise<T> {
  const page = await apiGet<{ content: T }>(`/api/pages/${slug}`);
  return page.content as T;
}

// ── Services ───────────────────────────────────────────────────────────────

export interface ServiceItem {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

export async function getServices(): Promise<ServiceItem[]> {
  return apiGet<ServiceItem[]>("/api/services");
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem> {
  return apiGet<ServiceItem>(`/api/services/${slug}`);
}

// ── Courses ────────────────────────────────────────────────────────────────

export interface CourseModule {
  id: string;
  title: string;
  content: string[];
}

export interface Course {
  _id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  price: number;
  duration: string;
  level: string;
  instructor: string;
  curriculum: { title: string; lessons: string[] }[];
  tags: string[];
  // Legacy local fields (kept for compatibility)
  icon?: string;
  modules?: CourseModule[];
}

export async function getCourses(): Promise<Course[]> {
  return apiGet<Course[]>("/api/courses");
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    return await apiGet<Course>(`/api/courses/${slug}`);
  } catch {
    return null;
  }
}

// ── Contact ────────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  await apiPost("/api/contact", payload);
}

// ── Newsletter ─────────────────────────────────────────────────────────────

export async function subscribeNewsletter(email: string): Promise<void> {
  await apiPost("/api/newsletter", { email });
}

// ── Academy Lead ───────────────────────────────────────────────────────────

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  courseInterest?: string;
  message?: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  await apiPost("/api/courses/lead", payload);
}

// ── Commerce ───────────────────────────────────────────────────────────────

export interface Product {
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  tags: string[];
}

export async function getProducts(): Promise<Product[]> {
  return apiGet<Product[]>("/api/commerce/products");
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return apiGet<Product>(`/api/commerce/products/${slug}`);
}
