import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CiferTrooper — Secure, beautifully engineered platforms" },
      {
        name: "description",
        content: "We design, build and protect the platforms behind ambitious brands.",
      },
      { property: "og:title", content: "CiferTrooper — Secure, beautifully engineered platforms" },
      { name: "twitter:title", content: "CiferTrooper — Secure, beautifully engineered platforms" },
      {
        property: "og:description",
        content: "We design, build and protect the platforms behind ambitious brands.",
      },
      {
        name: "twitter:description",
        content: "We design, build and protect the platforms behind ambitious brands.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/72297b6b-948e-4e99-a0ca-b992887d761f/id-preview-ab9f8f74--00a7affc-a6bb-4328-9d75-3e0a01669b57.lovable.app-1777996221537.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/72297b6b-948e-4e99-a0ca-b992887d761f/id-preview-ab9f8f74--00a7affc-a6bb-4328-9d75-3e0a01669b57.lovable.app-1777996221537.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/Cifer-Trooper-Logo.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}
