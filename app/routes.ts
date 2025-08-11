import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/feed/route.tsx"),
        route("events/:slug", "routes/events/route.tsx"),
    ]),

    layout("routes/auth/layout.tsx", [
        route("login", "routes/auth/login/route.tsx"),
        route("register", "routes/auth/register/route.tsx"),
    ]),

    layout("routes/protected/layout.tsx", [
        route("dashboard", "routes/protected/dashboard/route.tsx"),
        route("organiser-request", "routes/protected/organiser-request/route.tsx"),
        route("logout", "routes/protected/logout.tsx"),
    ]),
] satisfies RouteConfig;