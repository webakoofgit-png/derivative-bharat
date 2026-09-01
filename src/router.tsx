import { type ComponentType, useCallback, useEffect, useMemo, useState } from "react";
import { NavigationProvider, getBrowserLocation, type AppLocation, type RouteParams } from "./lib/navigation";
import { RootLayout } from "./routes/__root";
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

type RouteMatch = {
  component: ComponentType;
  params: RouteParams;
};

type RouteConfig = {
  path: string;
  component: ComponentType;
};

const routes: RouteConfig[] = [
  { path: "/", component: HomePage },
  { path: "/expeditions", component: ExpeditionsPage },
  { path: "/expeditions/:slug", component: ExpeditionDetailPage },
  { path: "/destinations", component: DestinationsPage },
  { path: "/destinations/:slug", component: DestinationDetailPage },
  { path: "/heritage-walks", component: HeritageWalksPage },
  { path: "/departures", component: DeparturesPage },
  { path: "/journal", component: JournalPage },
  { path: "/about", component: AboutPage },
  { path: "/contact", component: ContactPage },
];

export function AppRouter() {
  const [location, setLocation] = useState<AppLocation>(() => getBrowserLocation());
  const match = useMemo(() => matchRoute(location.pathname), [location.pathname]);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const nextPath = `${url.pathname}${url.search}${url.hash}`;
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextPath !== currentPath) {
      window.history.pushState(null, "", nextPath);
    }

    setLocation(getBrowserLocation());
  }, []);

  useEffect(() => {
    const handlePopState = () => setLocation(getBrowserLocation());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigationValue = useMemo(
    () => ({
      ...location,
      params: match.params,
      navigate,
    }),
    [location, match.params, navigate]
  );

  const Page = match.component;

  return (
    <NavigationProvider value={navigationValue}>
      <RootLayout>
        <Page />
      </RootLayout>
    </NavigationProvider>
  );
}

function matchRoute(pathname: string): RouteMatch {
  for (const route of routes) {
    const params = matchPath(route.path, pathname);

    if (params) {
      return {
        component: route.component,
        params,
      };
    }
  }

  return {
    component: NotFoundPage,
    params: {},
  };
}

function matchPath(pattern: string, pathname: string) {
  const patternSegments = splitPath(pattern);
  const pathSegments = splitPath(pathname);

  if (patternSegments.length !== pathSegments.length) {
    return null;
  }

  return patternSegments.reduce<RouteParams | null>((params, segment, index) => {
    if (!params) {
      return null;
    }

    const pathSegment = pathSegments[index];

    if (segment.startsWith(":") && pathSegment) {
      return {
        ...params,
        [segment.slice(1)]: decodeURIComponent(pathSegment),
      };
    }

    return segment === pathSegment ? params : null;
  }, {});
}

function splitPath(path: string) {
  const pathname = path.split(/[?#]/)[0] || "/";
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return normalized.split("/").filter(Boolean);
}
