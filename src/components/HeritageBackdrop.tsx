import { motion, useScroll, useTransform } from "motion/react";
import { Plane } from "lucide-react";
import { site } from "../lib/site-data";

type Point = [number, number];

const routeSegments: [Point, Point, Point, Point][] = [
  [
    [100, 735],
    [236, 588],
    [288, 408],
    [454, 441],
  ],
  [
    [454, 441],
    [642, 479],
    [610, 190],
    [804, 220],
  ],
  [
    [804, 220],
    [990, 248],
    [990, 504],
    [1132, 352],
  ],
];

function cubicPoint(segment: [Point, Point, Point, Point], progress: number): Point {
  const t = Math.max(0, Math.min(progress, 1));
  const inverse = 1 - t;
  const [start, controlOne, controlTwo, end] = segment;
  return [
    inverse ** 3 * start[0] + 3 * inverse ** 2 * t * controlOne[0] + 3 * inverse * t ** 2 * controlTwo[0] + t ** 3 * end[0],
    inverse ** 3 * start[1] + 3 * inverse ** 2 * t * controlOne[1] + 3 * inverse * t ** 2 * controlTwo[1] + t ** 3 * end[1],
  ];
}

function routePoint(progress: number): Point {
  const scaled = Math.max(0, Math.min(progress, 0.99999)) * routeSegments.length;
  const segmentIndex = Math.min(routeSegments.length - 1, Math.floor(scaled));
  return cubicPoint(routeSegments[segmentIndex], scaled - segmentIndex);
}

function routeAngle(progress: number) {
  const current = routePoint(progress);
  const next = routePoint(Math.min(progress + 0.01, 1));
  return (Math.atan2(next[1] - current[1], next[0] - current[0]) * 180) / Math.PI + 90;
}

export function HeritageBackdrop() {
  const { scrollYProgress } = useScroll();
  const routeOffset = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const dustShift = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const planeLeft = useTransform(scrollYProgress, (progress) => `${-4 + (routePoint(progress)[0] / 1200) * 108}%`);
  const planeTop = useTransform(scrollYProgress, (progress) => `${-8 + (routePoint(progress)[1] / 900) * 112}%`);
  const planeRotation = useTransform(scrollYProgress, (progress) => routeAngle(progress));

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

      <motion.div className="scroll-plane" style={{ left: planeLeft, top: planeTop, rotate: planeRotation }}>
        <span className="scroll-plane-icon">
          <Plane size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </motion.div>

      <motion.div className="sunlit-dust" style={{ y: dustShift }} />
      <div className="coordinate-readout">{site.coordinates}</div>
      <div className="compass-mark">
        <span>N</span>
      </div>
    </div>
  );
}
