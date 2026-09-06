import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteProvider } from "@/lib/site-context";
import { SITE } from "@/lib/data";
import appCss from "../styles.css?url";

const BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("daakye-theme");var dark=t!=="light";document.documentElement.classList.toggle("dark",dark);var skip=false;try{skip=sessionStorage.getItem("daakye-intro")==="1"}catch(e){skip=true}if(skip||window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-done")}else{document.documentElement.classList.add("intro-pending")}}catch(e){document.documentElement.classList.add("dark");document.documentElement.classList.add("intro-done")}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { name: "keywords", content: SITE.keywords },
      { name: "theme-color", content: "#050505" },
      { name: "author", content: SITE.brand },
      { name: "application-name", content: SITE.brand },
      {
        name: "google-site-verification",
        content: "85vxuWIKOHYc-nagngHC3uPnUX3sPIPPLJCF5QEAcSg",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE.url },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..800&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="antialiased bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteProvider>
            <Outlet />
          </SiteProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
