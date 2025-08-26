import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
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
  // {
  //   rel: "stylesheet",
  //   href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;1,400&display=swap",
  // },
];

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
