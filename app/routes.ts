import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/feed/route.tsx"),
    ]),

    layout("routes/auth/layout.tsx", [
        route("login", "routes/auth/login/route.tsx"),
        route("register", "routes/auth/register/route.tsx"),
    ]),
] satisfies RouteConfig;
