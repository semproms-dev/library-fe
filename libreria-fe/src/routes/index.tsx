import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import App from '../App';
import { InsertBookComponent } from '../pages/InsertBookComponent.tsx';
import { GenericBookComponent } from '../pages/GenericBookComponent.tsx';

// Root route (layout principal)
const rootRoute = createRootRoute({
  component: App,
});

// Search Books Screen
const searchBooksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <h2>
      <GenericBookComponent component={'search'} />
    </h2>
  ),
});

// Insert Books Screen
const insertBooksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/insertBook',
  component: () => (
    <h2>
      <GenericBookComponent component={'insert'} />
    </h2>
  ),
});

// Route tree
const routeTree = rootRoute.addChildren([searchBooksRoute, insertBooksRoute]);

// Crear router
export const router = createRouter({ routeTree });

// Declare the router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
