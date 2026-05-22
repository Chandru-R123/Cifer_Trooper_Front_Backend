# CiferTrooper — Core Interface

![CiferTrooper Logo](public/Cifer-Trooper-Logo.svg)

**CiferTrooper Core** is a high-performance, premium web interface built with **TanStack Start**, **React 19**, and **Tailwind CSS v4**. It serves as the primary gateway for CiferTrooper's digital services, featuring a modern design system, SEO optimization, and a unique dual-mode architecture (Static/API-Ready) designed for high-concurrency deployment on **Cloudflare Workers**.

---

## 🚀 Quick Start

### Prerequisites

- **[Bun](https://bun.sh/)** (Highly Recommended for speed) or [Node.js](https://nodejs.org/)
- **Cloudflare Wrangler** (for deployment)

### Setup & Development

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```
3. **Start development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

---

## 🛠 Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/router/v1/docs/guide/start/overview) (Server-side rendering with React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Using modern CSS-first approach)
- **Routing:** TanStack Router (Type-safe, file-based routing)
- **State Management:** TanStack Query (React Query)
- **Animations:** Framer Motion (for premium micro-interactions)
- **Icons:** Lucide React
- **UI Components:** Radix UI (Shadcn/UI foundations)
- **Validation:** Zod & React Hook Form
- **Deployment:** Cloudflare Workers / Pages

---

## 🏗 Project Structure

```text
cifertrooper-core/
├── src/
│   ├── components/       # Premium UI components (Hero, Carousels, Forms)
│   │   ├── ui/           # Radix-based primitive components
│   │   └── ...           # Specialized sections (Header, Footer, ServiceCard)
│   ├── routes/           # File-based routing (TanStack Router)
│   │   ├── Play_Ground.  # Security & utility tools
│   │   ├── services.     # Dynamic service routing
│   │   └── index.tsx     # Homepage entry point
│   ├── lib/              # API wrappers and utility functions (api.ts)
│   ├── hooks/            # Custom React hooks for state and logic
│   └── styles.css        # Global styles & Tailwind v4 directives
├── public/               # Static assets (Logos, SVGs)
├── wrangler.jsonc        # Cloudflare Workers configuration
└── Frontend-endpoints.txt # Comprehensive API & Route reference for Backend
```

---

## 🔌 Dual-Mode Architecture

The project is built with a **"Production-Ready"** mindset, supporting two operational states:

1. **Static Mode (Default):** The application uses high-quality fallback data and constants. This ensures the UI is fully functional and visually complete even without a backend connection.
2. **API Mode:** Ready for live data integration. Developers can activate API connectivity by uncommenting the `apiGet` fetch blocks in the route components (e.g., `src/routes/index.tsx`).

### API Integration
All backend communications are centralized in `src/lib/api.ts`. To point the frontend to a specific backend, update the `BASE_URL` in that file.

For detailed request/response schemas, refer to the [**Frontend-endpoints.txt**](./Frontend-endpoints.txt) file.

---

## 🎯 Key Features & Pages

- **Dynamic Services Ecosystem:** Detailed pages for Branding, UI/UX, Web Dev, E-commerce, and AI solutions, all powered by dynamic slug routing (`/services/:slug`).
- **Play Ground (Security Tools):**
  - **IP Locator:** Advanced geo-location and network analysis utility.
  - **IP Grabber:** Demonstration tool for tracking and logging connection metadata.
- **SEO Optimized:** Automatic meta-tag generation, Open Graph support, and semantic HTML5 structure.
- **Premium UX:** High-end glassmorphism, responsive carousels, and smooth page transitions.

---

## 🌐 Deployment

To build and deploy the application to Cloudflare:

```bash
# Build the project
bun run build

# Deploy via Wrangler
npx wrangler deploy
```

---

## 🧹 Maintenance

Keep the codebase clean and consistent with these commands:

```bash
# Run ESLint
bun run lint

# Format code with Prettier
bun run format
```

---

## 📄 License

Internal Project - CiferTrooper © 2026
