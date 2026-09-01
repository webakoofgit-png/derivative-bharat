import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "@tanstack/react-router";
import { destinations, expeditions } from "../lib/site-data";

function getPlaceLabel(pathname: string) {
  const expedition = expeditions.find((item) => pathname.includes(item.slug));
  if (expedition) {
    return { title: expedition.shortTitle, coordinates: expedition.coordinates };
  }

  const destination = destinations.find((item) => pathname.includes(item.slug));
  if (destination) {
    return { title: destination.name, coordinates: destination.coordinates };
  }

  if (pathname.includes("heritage-walks")) {
    return { title: "Heritage Walks", coordinates: "18.5204 N, 73.8567 E" };
  }

  if (pathname.includes("journal")) {
    return { title: "Journal", coordinates: "22.9734 N, 78.6569 E" };
  }

  return { title: "Derivative Bharat", coordinates: "20.5937 N, 78.9629 E" };
}

export function PageTransition() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const place = getPlaceLabel(pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="page-transition"
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        aria-hidden="true"
      >
        <span>{place.title}</span>
        <small>{place.coordinates}</small>
      </motion.div>
    </AnimatePresence>
  );
}
