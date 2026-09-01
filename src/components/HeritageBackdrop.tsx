import { motion, useScroll, useTransform } from "motion/react";
import { site } from "../lib/site-data";

export function HeritageBackdrop() {
  const { scrollYProgress } = useScroll();
  const routeOffset = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const dustShift = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="heritage-backdrop" aria-hidden="true">
      <motion.svg
        className="cartography"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
        style={{ y: routeOffset }}
      >
        <defs>
          <pattern id="contours" width="180" height="140" patternUnits="userSpaceOnUse">
            <path d="M-20 70 C 40 20, 84 116, 162 58 S 252 35, 310 92" />
            <path d="M-40 116 C 22 52, 112 146, 184 82 S 278 70, 342 126" />
          </pattern>
        </defs>
        <rect width="1200" height="900" fill="url(#contours)" />
        <motion.path
          className="route-line"
          d="M100 735 C236 588 288 408 454 441 C642 479 610 190 804 220 C990 248 990 504 1132 352"
          pathLength="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.div className="sunlit-dust" style={{ y: dustShift }} />
      <div className="coordinate-readout">{site.coordinates}</div>
      <div className="compass-mark">
        <span>N</span>
      </div>
    </div>
  );
}
