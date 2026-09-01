import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const MOBILE_BREAKPOINT = 768;

type MagicBentoProps = {
  children: ReactNode;
  className?: string;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

function createParticleElement(color: string) {
  const particle = document.createElement("div");
  particle.className = "magic-bento-particle";
  particle.style.background = `rgba(${color}, 1)`;
  particle.style.boxShadow = `0 0 8px rgba(${color}, 0.65)`;
  return particle;
}

function updateCardGlowProperties(card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
}

function GlobalSpotlight({
  gridRef,
  disabled,
  spotlightRadius,
  glowColor,
}: {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disabled: boolean;
  spotlightRadius: number;
  glowColor: string;
}) {
  useEffect(() => {
    if (disabled || !gridRef.current) {
      return undefined;
    }

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.background = `radial-gradient(circle, rgba(${glowColor}, 0.16) 0%, rgba(${glowColor}, 0.08) 28%, rgba(${glowColor}, 0.03) 52%, transparent 72%)`;
    document.body.appendChild(spotlight);

    const handleMouseMove = (event: MouseEvent) => {
      const grid = gridRef.current;
      if (!grid) {
        return;
      }

      const rect = grid.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      const cards = grid.querySelectorAll<HTMLElement>(".magic-bento-card");

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach((card) => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      const proximity = spotlightRadius * 0.5;
      const fadeDistance = spotlightRadius * 0.75;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.max(
          0,
          Math.hypot(event.clientX - centerX, event.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2
        );
        minDistance = Math.min(minDistance, distance);

        const intensity =
          distance <= proximity
            ? 1
            : distance <= fadeDistance
              ? (fadeDistance - distance) / (fadeDistance - proximity)
              : 0;
        updateCardGlowProperties(card, event.clientX, event.clientY, intensity, spotlightRadius);
      });

      const opacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlight, {
        left: event.clientX,
        top: event.clientY,
        opacity,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf(spotlight);
      spotlight.remove();
    };
  }, [disabled, glowColor, gridRef, spotlightRadius]);

  return null;
}

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default function MagicBento({
  children,
  className = "",
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = "214, 166, 67",
  clickEffect = true,
  enableMagnetism = true,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const attachCardEffects = useCallback(
    (card: HTMLElement) => {
      const templates = Array.from({ length: particleCount }, () => createParticleElement(glowColor));
      const particles: HTMLElement[] = [];
      const timeouts: number[] = [];
      let hovered = false;

      const clearParticles = () => {
        timeouts.forEach((timeout) => window.clearTimeout(timeout));
        particles.splice(0).forEach((particle) => {
          gsap.killTweensOf(particle);
          particle.remove();
        });
      };

      const animateParticles = () => {
        if (!hovered) {
          return;
        }

        templates.forEach((template, index) => {
          const timeout = window.setTimeout(() => {
            if (!hovered) {
              return;
            }

            const particle = template.cloneNode(true) as HTMLElement;
            card.appendChild(particle);
            particles.push(particle);
            gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
            gsap.to(particle, {
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              rotation: Math.random() * 360,
              duration: 2 + Math.random() * 2,
              ease: "none",
              repeat: -1,
              yoyo: true,
            });
            gsap.to(particle, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
          }, index * 80);
          timeouts.push(timeout);
        });
      };

      const handleMouseEnter = () => {
        hovered = true;
        if (enableStars) {
          animateParticles();
        }
      };

      const handleMouseLeave = () => {
        hovered = false;
        clearParticles();
        if (enableTilt || enableMagnetism) {
          gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.3, ease: "power2.out" });
        }
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!enableTilt && !enableMagnetism) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotation = {
          rotateX: enableTilt ? ((y - centerY) / centerY) * -5 : 0,
          rotateY: enableTilt ? ((x - centerX) / centerX) * 5 : 0,
          x: enableMagnetism ? (x - centerX) * 0.025 : 0,
          y: enableMagnetism ? (y - centerY) * 0.025 : 0,
        };

        gsap.to(card, { ...rotation, duration: 0.16, ease: "power2.out", transformPerspective: 1000 });
      };

      const handleClick = (event: MouseEvent) => {
        if (!clickEffect) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const maxDistance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height)
        );
        const ripple = document.createElement("div");
        ripple.className = "magic-bento-ripple";
        ripple.style.width = `${maxDistance * 2}px`;
        ripple.style.height = `${maxDistance * 2}px`;
        ripple.style.left = `${x - maxDistance}px`;
        ripple.style.top = `${y - maxDistance}px`;
        ripple.style.background = `radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.16) 32%, transparent 70%)`;
        card.appendChild(ripple);
        gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("click", handleClick);

      return () => {
        hovered = false;
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("click", handleClick);
        clearParticles();
        gsap.killTweensOf(card);
        templates.forEach((template) => template.remove());
      };
    },
    [clickEffect, enableMagnetism, enableStars, enableTilt, glowColor, particleCount]
  );

  useEffect(() => {
    if (shouldDisableAnimations || !gridRef.current) {
      return undefined;
    }

    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>(".magic-bento-card"));
    const cleanups = cards.map(attachCardEffects);
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [attachCardEffects, shouldDisableAnimations]);

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disabled={shouldDisableAnimations}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      <div ref={gridRef} className={`magic-bento-grid ${className}`.trim()}>
        {children}
      </div>
      {textAutoHide && <span className="magic-bento-sr-only">Interactive expedition cards</span>}
      {enableBorderGlow && null}
    </>
  );
}
