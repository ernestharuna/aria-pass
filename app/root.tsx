import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  type MetaFunction,
} from "react-router";

import type { Route } from "./+types/root";
import "./styles/app.css";
import "./styles/global.css";
import { Toaster } from "sonner";
import SplashScreen from "./components/skeletons/splash-screen";
import DefaultError from "./components/errors/default-error";
import ProgressBar from "./components/navigation/progress-bar";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  const title = "AriaPass - Discover the community behind the concerts";
  const description = "AriaPass is a new way to experience live events. Discover and connect with other fans, plan meetups before concerts, and organize your event tickets with a community of music lovers. A product of OwenaHub Collective.";
  const imageUrl = "https://ariapass.owenahub.com/images/banners/app_banner.png";
  const url = "https://ariapass.owenahub.com";

  return [
    // Standard Meta Tags
    { title: title },
    { name: "description", content: description },
    { name: "theme-color", content: "#625DF5" },
    { name: "keywords", content: "concert community, music events, fan meetups, social ticketing, event organization, AriaPass, OwenaHub" },
    { name: "author", content: "OwenaHub Collective" },
    { name: "robots", content: "index, follow" },

    // Open Graph (Facebook, LinkedIn)
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@owenahub" }, // Optional: Add your Twitter handle
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <ProgressBar />
        <Scripts />
        <Toaster
          richColors
          // closeButton
          position="bottom-right"
          toastOptions={{
            classNames: {
              actionButton: '!px-2 !rounded-full !text-white',
            },
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  const { state } = useNavigation();
  let busy: boolean = state === "submitting" || state === "loading";

  return (
    <div className={`${busy && "opacity-35"} transition overflow-x-hidden`}>
      <Outlet />
    </div>
  )

}

export function HydrateFallback() {
  return <SplashScreen />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <DefaultError error={error} />
}
