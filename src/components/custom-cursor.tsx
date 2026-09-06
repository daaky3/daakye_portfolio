import { useEffect, useRef, useState } from "react";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/use-media";

type Mode = "default" | "hover" | "view" | "media";

export function CustomCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    document.documentElement.classList.toggle("has-cursor", enabled);
    return () => document.documentElement.classList.remove("has-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const attr = t?.getAttribute("data-cursor");
      if (attr === "view" || attr === "hover" || attr === "media") {
        setMode(attr);
        return;
      }
      if ((e.target as HTMLElement | null)?.closest?.("a,button")) {
        setMode("hover");
        return;
      }
      setMode("default");
    };

    const loop = () => {
      x += (tx - x) * 0.28;
      y += (ty - y) * 0.28;
      wrap.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size =
    mode === "view" ? 84 : mode === "media" ? 44 : mode === "hover" ? 36 : 8;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-white text-[0.62rem] font-medium tracking-[0.22em] text-black"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          transition:
            "width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), margin 220ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {mode === "view" ? "VIEW" : null}
      </div>
    </div>
  );
}
