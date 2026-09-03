import { useEffect, useRef, useState, type MouseEvent, type KeyboardEvent } from "react";
import "./GooeyNav.css";

export type GooeyNavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  activeIndex?: number;
  onNavigate?: (href: string) => void;
  className?: string;
};

type Particle = {
  start: [number, number];
  end: [number, number];
  time: number;
  scale: number;
  color: number;
  rotate: number;
};

export default function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex,
  onNavigate,
  className = "",
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [internalActiveIndex, setInternalActiveIndex] = useState(initialActiveIndex);
  const selectedIndex = activeIndex ?? internalActiveIndex;

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (index: number): Particle => {
    const rotate = noise(particleR / 10);
    return {
      start: getXY(particleDistances[0], particleCount - index, particleCount),
      end: getXY(particleDistances[1] + noise(7), particleCount - index, particleCount),
      time: animationTime * 2 + noise(timeVariance * 2),
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + particleR / 20) * 10 : (rotate - particleR / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLSpanElement) => {
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let index = 0; index < particleCount; index += 1) {
      const particleData = createParticle(index);
      element.classList.remove("active");

      window.setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${particleData.start[0]}px`);
        particle.style.setProperty("--start-y", `${particleData.start[1]}px`);
        particle.style.setProperty("--end-x", `${particleData.end[0]}px`);
        particle.style.setProperty("--end-y", `${particleData.end[1]}px`);
        particle.style.setProperty("--time", `${particleData.time}ms`);
        particle.style.setProperty("--scale", `${particleData.scale}`);
        particle.style.setProperty("--color", `var(--color-${particleData.color}, white)`);
        particle.style.setProperty("--rotate", `${particleData.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add("active"));
        window.setTimeout(() => particle.remove(), particleData.time);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const position = element.getBoundingClientRect();
    const filterBleed = 6;
    const textStyles = {
      left: `${position.x - containerRect.x}px`,
      top: `${position.y - containerRect.y}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
    };
    const filterStyles = {
      ...textStyles,
      left: `${position.x - containerRect.x - filterBleed}px`,
      width: `${position.width + filterBleed * 2}px`,
    };

    Object.assign(filterRef.current.style, filterStyles);
    Object.assign(textRef.current.style, textStyles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    const listItem = event.currentTarget.parentElement;
    if (!listItem || selectedIndex === index) {
      return;
    }

    setInternalActiveIndex(index);
    updateEffectPosition(listItem);

    if (filterRef.current) {
      filterRef.current.querySelectorAll(".particle").forEach((particle) => particle.remove());
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    onNavigate?.(items[index].href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  useEffect(() => {
    const resetEffect = () => {
      const filter = filterRef.current;
      const text = textRef.current;

      filter?.classList.remove("active");
      filter?.querySelectorAll(".particle").forEach((particle) => particle.remove());
      text?.classList.remove("active");

      if (filter) {
        Object.assign(filter.style, { left: "0px", top: "0px", width: "0px", height: "0px" });
      }
      if (text) {
        Object.assign(text.style, { left: "0px", top: "0px", width: "0px", height: "0px" });
        text.innerText = "";
      }
    };

    if (!navRef.current || !containerRef.current || selectedIndex < 0) {
      resetEffect();
      return undefined;
    }

    const activeItem = navRef.current.querySelectorAll("li")[selectedIndex];
    if (activeItem) {
      updateEffectPosition(activeItem);
      textRef.current?.classList.add("active");
    }

    if (typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentItem = navRef.current?.querySelectorAll("li")[selectedIndex];
      if (currentItem) {
        updateEffectPosition(currentItem);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [selectedIndex, items.length]);

  return (
    <div
      ref={containerRef}
      className={`gooey-nav-container ${className}`.trim()}
      style={{
        "--color-1": "var(--gold)",
        "--color-2": "var(--terracotta)",
        "--color-3": "var(--forest)",
        "--color-4": "var(--ivory)",
      } as React.CSSProperties}
    >
      <nav ref={navRef} aria-label="Primary navigation">
        <ul>
          {items.map((item, index) => (
            <li key={item.href} className={selectedIndex === index ? "active" : ""}>
              <a href={item.href} onClick={(event) => handleClick(event, index)} onKeyDown={handleKeyDown}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}
