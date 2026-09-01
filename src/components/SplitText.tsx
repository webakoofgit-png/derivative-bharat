import { useEffect, useRef, useState, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./SplitText.css";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type SplitTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type AnimationVars = Record<string, any>;

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: AnimationVars;
  to?: AnimationVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  tag?: SplitTag;
  onLetterAnimationComplete?: () => void;
};

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const splitInstanceRef = useRef<GSAPSplitText | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
      return undefined;
    }

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) {
        setFontsLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !text || !fontsLoaded) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animationCompletedRef.current = true;
        return;
      }

      if (animationCompletedRef.current) {
        return;
      }

      splitInstanceRef.current?.revert();

      const startPercentage = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? Number.parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch?.[2] || "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPercentage}%${sign}`;

      const splitInstance = new GSAPSplitText(element, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (split) => {
          const targets = splitType.includes("chars") && split.chars.length
            ? split.chars
            : splitType.includes("words") && split.words.length
              ? split.words
              : splitType.includes("lines") && split.lines.length
                ? split.lines
                : split.chars.length
                  ? split.chars
                  : split.words.length
                    ? split.words
                    : split.lines;

          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: element,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: "transform, opacity",
              force3D: true,
            },
          );
        },
      });

      splitInstanceRef.current = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
        splitInstance.revert();
        splitInstanceRef.current = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: ref,
    },
  );

  const Tag = tag as ElementType;
  return (
    <Tag ref={ref} className={`split-parent ${className}`.trim()} style={{ textAlign }}>
      {text}
    </Tag>
  );
}
