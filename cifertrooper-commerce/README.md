# 🛒 CiferTrooper Commerce

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TanStack](https://img.shields.io/badge/TanStack-Router-FF4154?style=for-the-badge&logo=tanstack)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**CiferTrooper Commerce** is a premium, secure, and beautifully engineered digital storefront. It combines a high-performance shopping experience for security gadgets and kits with detailed service offerings, all optimized for the modern web.

---

## 🚀 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) |
| **Routing** | [TanStack Router](https://tanstack.com/router) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Infrastructure** | [Cloudflare Workers / Pages](https://workers.cloudflare.com/) |
| **State/Data** | [TanStack Query](https://tanstack.com/query) + Context API |

---

## 🛠️ Key Features

### 📦 E-Commerce Excellence
- **Intelligent Catalog**: High-performance listing of security gadgets and hardware kits.
- **Deep-Dive Specifications**: SEO-optimized product pages with technical breakdowns.
- **Dynamic Cart System**: Persistent, real-time shopping cart with smooth state management.
- **Secure Checkout Flow**: Professional multi-step checkout supporting UPI and COD.
- **Customer Accounts**: Secure authentication system with order tracking and history.

### 💼 Integrated Services
- **Agency Showcase**: Comprehensive overview of CiferTrooper's technical and creative services.
- **Dynamic Landing Pages**: Specialized routes for service-specific deep dives.

---

## 📂 Project Structure

```text
src/
├── components/     # Premium UI components (Radix/Shadcn foundations)
├── hooks/          # Custom React hooks for commerce logic
├── lib/            # Core business logic and Context providers
│   ├── auth-context.tsx  # User session & identity management
│   ├── cart-context.tsx  # Persistent shopping cart logic
│   ├── api.ts            # Centralized API fetch wrapper
│   └── commerce-data.ts  # High-quality static fallback data
├── routes/         # File-based routing (TanStack Router)
└── styles.css      # Global styles and Tailwind v4 directives
```

---

## 🔌 API Dual-Mode Architecture

Designed for seamless backend integration:
- **Static Mode**: Immediate visual parity using hardcoded fallback data.
- **API Mode**: Ready-to-activate fetch blocks for live backend communication.

Refer to [**Frontend-endpoints.txt**](./Frontend-endpoints.txt) for full API specifications.

---

## 🏃 Getting Started

### Prerequisites
- **[Bun](https://bun.sh/)** (Highly Recommended) or [Node.js](https://nodejs.org/)

### Installation & Development
```bash
# Install dependencies
bun install

# Start development server
bun dev
```

### Build & Deployment
```bash
# Generate production bundle
bun run build

# Deploy to Cloudflare
npx wrangler deploy
```

---

## 📄 License

© 2026 CiferTrooper. All rights reserved. Premium Digital Commerce Solutions.
