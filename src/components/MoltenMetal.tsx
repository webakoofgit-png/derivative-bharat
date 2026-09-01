import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./MoltenMetal.css";

type ColorMode = "molten" | "ember" | "frost";

type MoltenMetalProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  colorMode?: ColorMode;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  opacity?: number;
  backgroundColor?: string;
  lightMode?: boolean;
  className?: string;
};

type MoltenContext = {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
};

type Uniform = { value: any };

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [1, 1, 1];
  }

  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const colorModeToFloat = (mode: ColorMode) => (mode === "ember" ? 1 : mode === "frost" ? 2 : 0);

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform bool uLightMode;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  if (uLightMode) {
    float signal = 1.0 - exp(-max(c, 0.0) * 6.5);
    float body = smoothstep(0.075, 0.68, signal);
    float ridge = smoothstep(0.42, 0.92, signal);

    vec3 lightCol = mix(uColor1, uColor2, smoothstep(0.08, 0.52, signal));
    lightCol = mix(lightCol, uColor3, smoothstep(0.52, 0.96, signal));
    lightCol = mix(lightCol, lightCol * 0.72, ridge * 0.24);

    float coverage = body * mix(0.2, 0.86, signal) * uOpacity;
    if (uGrain > 0.5) {
      float gr = hash(gl_FragCoord.xy + iTime);
      coverage += (gr - 0.5) * uGrainIntensity * body * 0.16;
    }
    fragColor = vec4(mix(uBackgroundColor, lightCol, clamp(coverage, 0.0, 0.92)), 1.0);
  } else {
    fragColor = vec4(col * a, a);
  }
}
`;

const contexts = new WeakMap<HTMLDivElement, MoltenContext>();

export default function MoltenMetal({
  color1 = "#24180f",
  color2 = "#8b4a20",
  color3 = "#e7b94f",
  speed = 0.16,
  scale = 3.4,
  detail = 3,
  glow = 1.2,
  coreSize = 0.06,
  swirl = 1.15,
  fold = -0.2,
  blackPoint = 0.12,
  brightness = 0.62,
  colorMode = "molten",
  grain = true,
  grainIntensity = 0.025,
  mouseInteraction = true,
  mouseStrength = 0.16,
  opacity = 0.35,
  backgroundColor = "#19150e",
  lightMode = false,
  className = "",
}: MoltenMetalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    let renderer: Renderer;
    let program: Program;
    let mesh: Mesh;

    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });

      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      const canvas = gl.canvas;
      canvas.className = "molten-metal-canvas";
      container.appendChild(canvas);

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uSpeed: { value: speed },
          uScale: { value: scale },
          uDetail: { value: detail },
          uGlow: { value: glow },
          uCoreSize: { value: Math.max(coreSize, 0.001) },
          uSwirl: { value: swirl },
          uFold: { value: fold },
          uBlackPoint: { value: blackPoint },
          uBrightness: { value: brightness },
          uColorMode: { value: colorModeToFloat(colorMode) },
          uGrain: { value: grain ? 1 : 0 },
          uGrainIntensity: { value: grainIntensity },
          uOpacity: { value: opacity },
          uMouse: { value: new Float32Array([0.5, 0.5]) },
          uMouseStrength: { value: mouseStrength },
          uEnableMouse: { value: mouseInteraction },
          uColor1: { value: new Float32Array(hexToRgb(color1)) },
          uColor2: { value: new Float32Array(hexToRgb(color2)) },
          uColor3: { value: new Float32Array(hexToRgb(color3)) },
          uBackgroundColor: { value: new Float32Array(hexToRgb(backgroundColor)) },
          uLightMode: { value: lightMode },
        },
      });

      mesh = new Mesh(gl, { geometry, program });
      contexts.set(container, { renderer, program, mesh });

      const setSize = () => {
        const rect = container.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        renderer.setSize(width, height);
        const resolution = program.uniforms.iResolution.value as Float32Array;
        resolution[0] = gl.drawingBufferWidth;
        resolution[1] = gl.drawingBufferHeight;
        renderer.render({ scene: mesh });
      };

      const resizeObserver = new ResizeObserver(setSize);
      resizeObserver.observe(container);
      setSize();

      const targetMouse = [0.5, 0.5];
      const currentMouse = [0.5, 0.5];
      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        targetMouse[0] = (event.clientX - rect.left) / rect.width;
        targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height;
      };
      const handleMouseLeave = () => {
        targetMouse[0] = 0.5;
        targetMouse[1] = 0.5;
      };
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      let raf = 0;
      let isVisible = true;
      let isPageVisible = !document.hidden;
      const startTime = performance.now();
      const loop = (time: number) => {
        program.uniforms.iTime.value = (time - startTime) * 0.001;
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        const mouse = program.uniforms.uMouse.value as Float32Array;
        mouse[0] = currentMouse[0];
        mouse[1] = currentMouse[1];
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };
      const tryStart = () => {
        if (isVisible && isPageVisible && raf === 0) {
          raf = requestAnimationFrame(loop);
        }
      };
      const tryStop = () => {
        if (raf !== 0) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            tryStart();
          } else {
            tryStop();
          }
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(container);

      const handleVisibility = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible) {
          tryStart();
        } else {
          tryStop();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      tryStart();

      return () => {
        tryStop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibility);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        contexts.delete(container);
        if (canvas.parentNode === container) {
          container.removeChild(canvas);
        }
        const loseContext = renderer.getExtension("WEBGL_lose_context") as
          | { loseContext?: () => void }
          | null;
        loseContext?.loseContext?.();
      };
    } catch {
      return undefined;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const context = container ? contexts.get(container) : undefined;
    if (!context) {
      return;
    }

    const uniforms = context.program.uniforms as Record<string, Uniform>;
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uDetail.value = detail;
    uniforms.uGlow.value = glow;
    uniforms.uCoreSize.value = Math.max(coreSize, 0.001);
    uniforms.uSwirl.value = swirl;
    uniforms.uFold.value = fold;
    uniforms.uBlackPoint.value = blackPoint;
    uniforms.uBrightness.value = brightness;
    uniforms.uColorMode.value = colorModeToFloat(colorMode);
    uniforms.uGrain.value = grain ? 1 : 0;
    uniforms.uGrainIntensity.value = grainIntensity;
    uniforms.uOpacity.value = opacity;
    uniforms.uMouseStrength.value = mouseStrength;
    uniforms.uEnableMouse.value = mouseInteraction;
    uniforms.uLightMode.value = lightMode;

    const colors = [hexToRgb(color1), hexToRgb(color2), hexToRgb(color3), hexToRgb(backgroundColor)];
    ["uColor1", "uColor2", "uColor3", "uBackgroundColor"].forEach((key, index) => {
      const value = uniforms[key].value as Float32Array;
      const color = colors[index];
      value[0] = color[0];
      value[1] = color[1];
      value[2] = color[2];
    });
  }, [
    backgroundColor,
    blackPoint,
    brightness,
    color1,
    color2,
    color3,
    colorMode,
    coreSize,
    detail,
    fold,
    glow,
    grain,
    grainIntensity,
    lightMode,
    mouseInteraction,
    mouseStrength,
    opacity,
    scale,
    speed,
    swirl,
  ]);

  return <div ref={containerRef} className={`molten-metal-container ${className}`.trim()} aria-hidden="true" />;
}
