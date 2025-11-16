import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import App from "../App";

// Root route (layout principal)
const rootRoute = createRootRoute({
    component: App,
});

// Home route
const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <h2></h2>,
});

// About route
const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: () => <h2></h2>,
});

// Route tree
const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

// Crear router
export const router = createRouter({ routeTree });

// Declare the router type
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
