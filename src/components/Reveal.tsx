import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

type MaskedLinesProps = {
  lines: string[];
  as?: "h1" | "h2" | "p";
  className?: string;
  immediate?: boolean;
};

export function MaskedLines({ lines, as: Tag = "h2", className = "", immediate = false }: MaskedLinesProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Tag className={`masked-lines ${className}`}>
      {lines.map((line, index) => (
        <span className="masked-line" key={line}>
          <motion.span
            initial={immediate || reducedMotion ? false : { y: "115%" }}
            animate={immediate ? { y: "0%" } : undefined}
            whileInView={immediate || reducedMotion ? undefined : { y: "0%" }}
            viewport={immediate || reducedMotion ? undefined : { once: true, margin: "-80px" }}
            transition={immediate ? { duration: 0 } : { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
