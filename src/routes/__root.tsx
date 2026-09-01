import { useEffect } from "react";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { CustomCursor } from "../components/CustomCursor";
import { Footer } from "../components/Footer";
import { HeritageBackdrop } from "../components/HeritageBackdrop";
import { Nav } from "../components/Nav";
import { PageTransition } from "../components/PageTransition";
import { SmoothScroll } from "../components/SmoothScroll";
import { JsonLd, organizationSchema } from "../lib/seo";

function useGoogleFonts() {
  useEffect(() => {
    const preconnectGoogle = document.createElement("link");
    preconnectGoogle.rel = "preconnect";
    preconnectGoogle.href = "https://fonts.googleapis.com";

    const preconnectStatic = document.createElement("link");
    preconnectStatic.rel = "preconnect";
    preconnectStatic.href = "https://fonts.gstatic.com";
    preconnectStatic.crossOrigin = "anonymous";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap";

    document.head.append(preconnectGoogle, preconnectStatic, fontLink);

    return () => {
      preconnectGoogle.remove();
      preconnectStatic.remove();
      fontLink.remove();
    };
  }, []);
}

function ScrollToTop() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function RootComponent() {
  useGoogleFonts();

  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <HeritageBackdrop />
      <Nav />
      <PageTransition />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CustomCursor />
      <JsonLd data={organizationSchema()} />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
