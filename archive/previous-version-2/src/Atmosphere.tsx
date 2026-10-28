import { useEffect, useRef } from "react";

type Ember = { x: number; y: number; r: number; s: number; drift: number; tone: number };

function makeEmber(): Ember {
  return {
    x: Math.random(),
    y: Math.random(),
    r: 0.6 + Math.random() * 1.8,
    s: 0.008 + Math.random() * 0.02,
    drift: (Math.random() - 0.5) * 0.012,
    tone: Math.random(),
  };
}

/** Original fog and ember field. No external video or game asset. */
export function Atmosphere({ quiet }: { quiet: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || (memory !== undefined && memory <= 4);
    const count = quiet ? 0 : lowPower ? 14 : 36;
    const embers = Array.from({ length: count }, makeEmber);
    const pointer = { x: 0.62, y: 0.28, tx: 0.62, ty: 0.28 };
    let frame = 0;
    let visible = !document.hidden;

    const onMove = (event: PointerEvent) => {
      pointer.tx = event.clientX / Math.max(window.innerWidth, 1);
      pointer.ty = event.clientY / Math.max(window.innerHeight, 1);
    };
    const onVisibility = () => {
      visible = !document.hidden;
    };
    if (!coarse && !quiet) window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    const draw = (time: number) => {
      if (!visible && !quiet) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      if (coarse || quiet) {
        pointer.tx = 0.5 + Math.sin(time / 9000) * 0.08;
        pointer.ty = 0.35 + Math.cos(time / 11000) * 0.05;
      }
      pointer.x += (pointer.tx - pointer.x) * (quiet ? 1 : 0.04);
      pointer.y += (pointer.ty - pointer.y) * (quiet ? 1 : 0.04);

      const fog = [
        { x: width * (0.2 + pointer.x * 0.15), y: height * (0.75 + pointer.y * 0.05), color: "rgba(70, 24, 16, 0.28)" },
        { x: width * (0.72 - pointer.x * 0.08), y: height * (0.22 + pointer.y * 0.06), color: "rgba(226, 91, 36, 0.07)" },
        { x: width * 0.5, y: height * (0.9 + Math.sin(time / 8000) * 0.02), color: "rgba(20, 16, 14, 0.45)" },
      ];
      for (const layer of fog) {
        const radius = Math.max(width, height) * 0.55;
        const gradient = context.createRadialGradient(layer.x, layer.y, 0, layer.x, layer.y, radius);
        gradient.addColorStop(0, layer.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }

      for (const ember of embers) {
        ember.y -= ember.s * (quiet ? 0 : 1);
        ember.x += ember.drift + Math.sin(time / 1800 + ember.y * 12) * 0.0008;
        if (ember.y < -0.02) {
          ember.y = 1.02;
          ember.x = Math.random();
        }
        context.beginPath();
        context.fillStyle = ember.tone > 0.82 ? "rgba(176, 42, 36, 0.75)" : "rgba(255, 146, 70, 0.8)";
        context.arc(ember.x * width, ember.y * height, ember.r, 0, Math.PI * 2);
        context.fill();
      }

      if (!quiet) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [quiet]);

  return <canvas ref={canvasRef} className="v2-atmosphere" aria-hidden="true" />;
}
