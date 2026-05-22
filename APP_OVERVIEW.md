# CiferTrooper — Full App Overview

## What is this app?

CiferTrooper is a full-stack web platform for a digital agency + training academy.
One backend serves three frontend apps (academy, core website, commerce).
Currently the academy frontend is built and connected.

---

## Project Structure

```
Cifertrooper-UI-master/
├── cifertrooper-academy/     ← Frontend (React)
├── cifertrooper-backend/     ← Backend (Node.js API)
└── APP_OVERVIEW.md           ← This file
```

Frontend runs on: http://localhost:8080
Backend runs on:  http://localhost:5000
Swagger API docs: http://localhost:5000/api/docs

---

## Backend (cifertrooper-backend)

### Stack
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT Authentication + bcrypt
- Swagger (API docs)
- Docker support

### Entry Points
```
src/server.ts   → connects to MongoDB, starts Express on port 5000
src/app.ts      → registers all middleware and routes
```

### Middleware (applied to every request)
| Middleware     | Purpose                                      |
|----------------|----------------------------------------------|
| helmet         | Sets security HTTP headers                   |
| cors           | Allows requests from frontend origins        |
| compression    | Gzip responses                               |
| morgan         | Logs every request                           |
| rateLimit      | Max 100 requests per 15 min per IP           |

### Architecture Pattern: MVC + Service + Repository

Every module follows this 4-layer pattern:

```
Route → Controller → Service → Repository → MongoDB
```

- Route      — defines URL and HTTP method, applies validation
- Controller — handles request/response, calls the service
- Service    — business logic (e.g. check if email exists before registering)
- Repository — raw database queries (Mongoose calls)

### Modules

| Module      | What it does                                                        |
|-------------|---------------------------------------------------------------------|
| auth        | Register, login, logout, JWT tokens, bcrypt password hashing        |
| users       | Get/update user profile                                             |
| pages       | CMS — stores page content (home, about, team, FAQ, contact)         |
| services    | Dynamic service listings with full rich content                     |
| academy     | Courses listing, course detail, lead form submissions               |
| commerce    | Products, cart, checkout, orders                                    |
| contact     | Stores contact form submissions                                     |
| newsletter  | Email subscriptions                                                 |
| tools       | IP lookup, IP grabber tracking links, logs                          |

### Auth Flow
1. User registers → password hashed with bcrypt → saved to MongoDB
2. User logs in → password compared → JWT token returned
3. Protected routes → authenticate middleware verifies the JWT
4. Admin routes → authorize('admin') middleware checks the role

### Database Collections
| Collection    | Purpose                                      |
|---------------|----------------------------------------------|
| users         | Accounts with roles (admin/editor/user)      |
| pages         | CMS content (JSON blob per page)             |
| services      | Service cards + rich detail content          |
| courses       | Course info + full curriculum                |
| products      | E-commerce products                          |
| orders        | Customer orders                              |
| carts         | Shopping carts                               |
| contacts      | Contact form submissions                     |
| newsletters   | Email subscriptions                          |
| leads         | Academy enrollment leads                     |
| iplogs        | IP grabber tracking logs                     |
| grabberlinks  | IP grabber tracking links                    |

### API Endpoints

AUTH
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/logout
  GET    /api/user/profile
  PUT    /api/user/profile

CMS PAGES
  GET    /api/pages/home
  GET    /api/pages/about-us
  GET    /api/pages/services
  GET    /api/pages/team
  GET    /api/pages/faq
  GET    /api/pages/contact-us

SERVICES
  GET    /api/services
  GET    /api/services/:slug

ACADEMY
  GET    /api/courses
  GET    /api/courses/:slug
  POST   /api/courses/lead

COMMERCE
  GET    /api/commerce/products
  GET    /api/commerce/products/:slug
  GET    /api/commerce/cart
  POST   /api/commerce/cart/sync
  POST   /api/commerce/checkout
  GET    /api/commerce/orders
  GET    /api/commerce/orders/:orderId

CONTACT & NEWSLETTER
  POST   /api/contact
  POST   /api/newsletter

TOOLS
  GET    /api/tools/ip-lookup
  GET    /api/tools/ip-grabber/logs       (admin only)
  POST   /api/tools/ip-grabber/create-link (admin only)

### Seed Script
Run once to populate the database with sample data:
  node seed.mjs

Seeds: 5 users, 6 pages, 9 services, 8 courses, 8 products

Default credentials:
  Admin:  admin@cifertrooper.com  / Admin@1234
  Editor: editor@cifertrooper.com / Editor@1234
  User:   ravi@example.com        / User@1234

---

## Frontend (cifertrooper-academy)

### Stack
- React 19 + TypeScript
- TanStack Router (file-based routing)
- TanStack Query (data fetching + caching)
- Tailwind CSS v4
- Framer Motion (animations)
- Radix UI + shadcn/ui (components)

### Entry Points
```
src/router.tsx         → creates TanStack Router with QueryClient
src/routes/__root.tsx  → root layout (Header + Footer wrapping all pages)
```

### Pages and Routes

| File                          | URL                              | Fetches from                  |
|-------------------------------|----------------------------------|-------------------------------|
| routes/index.tsx              | /                                | /api/pages/home + /api/courses|
| routes/about-us.tsx           | /about-us                        | /api/pages/about-us           |
| routes/team.tsx               | /team                            | /api/pages/team               |
| routes/faq.tsx                | /faq                             | /api/pages/faq                |
| routes/contact-us.tsx         | /contact-us                      | /api/pages/contact-us         |
| routes/services.index.tsx     | /services                        | /api/services                 |
| routes/services_.$slug.tsx    | /services/:slug                  | /api/services/:slug           |
| routes/courses.$slug.tsx      | /courses/:slug                   | /api/courses/:slug            |

### Data Fetching Pattern
Every page uses TanStack Query (useQuery) to fetch from the backend:

```ts
const { data } = useQuery({
  queryKey: ["page", "home"],
  queryFn: () => getPage("home"),  // calls GET /api/pages/home
});
```

All API calls go through src/lib/api.ts which points to http://localhost:5000.
Query results are cached for 5 minutes (staleTime in router.tsx).

### Components

| Component             | Purpose                                          |
|-----------------------|--------------------------------------------------|
| Header                | Sticky nav with Services + Academy dropdowns     |
| Footer                | 5-column layout with links, socials, contact     |
| CourseCard            | Card grid for courses on home page               |
| ContactForm           | Posts to /api/contact                            |
| EnrollmentPopup       | Posts to /api/courses/lead                       |
| NewsletterInlineForm  | Posts to /api/newsletter                         |
| ServiceDetail         | Renders rich service page sections               |
| CallToAction          | Reusable CTA banner used across pages            |
| TeamCardGrid          | Grid of team member cards                        |
| FaqAccordion          | Accordion for FAQ items                          |

### Styling
Tailwind CSS v4 with a custom design system in src/styles.css:
- CSS variables for all colors (--background, --accent, etc.)
- Light and dark mode variants
- Custom utilities: container-page, text-gradient

### Dark Mode
- Preference stored in localStorage
- Applied by toggling the "dark" class on <html>
- Inline <script> in <head> applies it before page paints (prevents flash)
- Toggle button in the Header

---

## How a Request Flows End-to-End

Example: user visits /team

```
1. Browser loads /team
2. team.tsx renders, calls useQuery → getPage("team")
3. api.ts sends: GET http://localhost:5000/api/pages/team
4. Backend: pages.routes.ts → pages.controller.ts → pages.service.ts
5. pages.service.ts calls PagesRepository.findBySlug("team")
6. MongoDB returns the team page document
7. Response: { success: true, data: { content: { members: [...] } } }
8. Frontend renders 8 team member cards from the data
```

---

## How to Run

```bash
# Step 1 — Start MongoDB (must be running locally on port 27017)

# Step 2 — Backend
cd cifertrooper-backend
cp .env.example .env        # first time only
node seed.mjs               # seed database (first time only)
npm run dev                 # starts on localhost:5000

# Step 3 — Frontend
cd cifertrooper-academy
npm install                 # first time only
npm run dev                 # starts on localhost:8080
```

---

## Environment Variables (cifertrooper-backend/.env)

| Variable              | Description                        | Default                              |
|-----------------------|------------------------------------|--------------------------------------|
| PORT                  | Server port                        | 5000                                 |
| MONGO_URI             | MongoDB connection string          | mongodb://localhost:27017/cifertrooper|
| JWT_SECRET            | JWT signing secret                 | (required — change this)             |
| JWT_EXPIRES_IN        | Token expiry                       | 7d                                   |
| CORS_ORIGINS          | Allowed frontend origins           | http://localhost:8080                |
| RATE_LIMIT_MAX        | Max requests per window            | 100                                  |
| RATE_LIMIT_WINDOW_MS  | Rate limit window in ms            | 900000 (15 min)                      |

---

## Key Design Decisions

1. One backend, multiple frontends
   The backend is designed to serve the academy, core website, and commerce
   platform from the same API using shared modules.

2. CMS via MongoDB
   Page content (hero text, stats, team members, FAQs) is stored in the
   database, not hardcoded. Update content without touching code.

3. Role-based access
   Three roles: admin, editor, user. Admin can access tools and manage data.
   Editor can manage content. User is a regular customer/student.

4. No hardcoded fallbacks
   All page data comes from the backend. If the API is down, pages show a
   loading state rather than stale hardcoded content.

5. Dark mode without flash
   Theme is read from localStorage synchronously before first render using
   an inline script in <head>, preventing the white flash on navigation.
