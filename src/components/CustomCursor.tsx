import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 420, damping: 36 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 36 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);

    const updateMedia = () => setEnabled(media.matches);
    const updatePosition = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const updateLabel = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(interactive?.dataset.cursor ?? "");
    };

    media.addEventListener("change", updateMedia);
    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerover", updateLabel);
    window.addEventListener("pointerout", updateLabel);

    return () => {
      media.removeEventListener("change", updateMedia);
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerover", updateLabel);
      window.removeEventListener("pointerout", updateLabel);
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className={`custom-cursor ${label ? "is-active" : ""}`}
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    >
      <span>{label}</span>
    </motion.div>
  );
}
