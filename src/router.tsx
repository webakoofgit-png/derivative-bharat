import { createRoute, createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root";
import { AboutPage } from "./routes/about";
import { ContactPage } from "./routes/contact";
import { DeparturesPage } from "./routes/departures";
import { DestinationDetailPage } from "./routes/destinations.$slug";
import { DestinationsPage } from "./routes/destinations";
import { ExpeditionDetailPage } from "./routes/expeditions.$slug";
import { ExpeditionsPage } from "./routes/expeditions";
import { HeritageWalksPage } from "./routes/heritage-walks";
import { HomePage } from "./routes/index";
import { JournalPage } from "./routes/journal";
import { NotFoundPage } from "./routes/not-found";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const expeditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/expeditions",
  component: ExpeditionsPage,
});

const expeditionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/expeditions/$slug",
  component: ExpeditionDetailPage,
});

const destinationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/destinations",
  component: DestinationsPage,
});

const destinationDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/destinations/$slug",
  component: DestinationDetailPage,
});

const heritageWalksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/heritage-walks",
  component: HeritageWalksPage,
});

const departuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/departures",
  component: DeparturesPage,
});

const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journal",
  component: JournalPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  expeditionsRoute,
  expeditionDetailRoute,
  destinationsRoute,
  destinationDetailRoute,
  heritageWalksRoute,
  departuresRoute,
  journalRoute,
  aboutRoute,
  contactRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
