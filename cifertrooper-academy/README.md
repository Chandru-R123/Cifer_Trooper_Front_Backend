# 🛡️ CiferTrooper Academy

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TanStack](https://img.shields.io/badge/TanStack-Router-FF4154?style=for-the-badge&logo=tanstack)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

> **CiferTrooper Academy** is a high-performance, modern educational platform for cyber security enthusiasts, researchers, and professional red teamers. Built with the latest React 19 ecosystem and TanStack Start.

---

## 🚀 Key Features

- **🎯 Specialized Courses**: 12+ industry-standard security programs from fundamentals to advanced Red Teaming.
- **🛠️ Play Ground**: Interactive security tools including IP Locator and IP Grabber for practical learning.
- **💼 Professional Services**: Showcase of CiferTrooper's development and branding capabilities.
- **⚡ Dual-Mode Architecture**: Works seamlessly with static data or live API endpoints.
- **🎨 Premium UI/UX**: Crafted with Tailwind CSS, Framer Motion, and Radix UI for a world-class student experience.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) |
| **Routing** | [TanStack Router](https://tanstack.com/router) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Components** | [Radix UI](https://www.radix-ui.com/) + [Shadcn/UI](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State/Data** | [TanStack Query](https://tanstack.com/query) + [Zod](https://zod.dev/) |

---

## 📁 Project Structure

```bash
cifertrooper-academy/
├── src/
│   ├── components/      # Reusable UI components (Shadcn + Custom)
│   ├── lib/             # API wrappers and shared utilities
│   ├── routes/          # TanStack File-based routing
│   │   ├── courses/     # Course-related pages
│   │   ├── services/    # Service-related pages
│   │   └── Play_Ground/ # Security tools
│   └── assets/          # Static images and styles
├── Frontend-endpoints.txt # Detailed API reference for Backend team
└── vite.config.ts       # Vite configuration
```

---

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Bun](https://bun.sh/) or [npm](https://www.npmjs.com/)

### Installation
```bash
# Clone the repository
git clone https://github.com/KavimugilRajasekar/cifertrooper-ui.git

# Navigate to the project
cd cifertrooper-academy

# Install dependencies
bun install
# or
npm install
```

### Development
```bash
bun dev
# or
npm run dev
```

---

## 📡 API Integration

The project is designed with a **Dual-Mode Strategy**. It ships with high-quality static data in `src/lib/courses.ts` and internal component states.

To connect to a live backend:
1. Refer to `Frontend-endpoints.txt` for the required API signatures.
2. Update the `BASE_URL` in `src/lib/api.ts`.
3. Un-comment the `apiGet` calls in the route components.

---

## 📄 License

© 2026 CiferTrooper. All rights reserved. Built for excellence in security education.
