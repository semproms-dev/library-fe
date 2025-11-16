import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import App from "../App";
import {SearchBookComponent} from "../pages/SearchBookComponent.tsx";

// Root route (layout principal)
const rootRoute = createRootRoute({
    component: App,
});

// Search Books Screen
const searchBooksRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <h2><SearchBookComponent></SearchBookComponent></h2>,
});

// Insert Books Screen
const insertBooksRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/insertBook",
    component: () => <h2></h2>,
});

// Route tree
const routeTree = rootRoute.addChildren([searchBooksRoute, insertBooksRoute]);

// Crear router
export const router = createRouter({ routeTree });

// Declare the router type
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
