import { useCallback, useRef, useState } from "react";

export function BeforeAfter({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div
      ref={ref}
      className="group relative aspect-4/3 w-full cursor-ew-resize touch-none overflow-hidden select-none"
      onPointerDown={(e) => {
        e.preventDefault();
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) {
          e.preventDefault();
          move(e.clientX);
        }
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={(e) => {
        dragging.current = false;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      }}
    >
      <img
        src={after}
        alt={`${alt} — после ремонта`}
        loading="lazy"
        className="image-depth absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${alt} — до ремонта`}
          loading="lazy"
          className="image-depth absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <span className="eyebrow absolute top-3 left-3 rounded-sm bg-ink/75 px-2 py-1 text-chalk backdrop-blur-sm">
        До
      </span>
      <span className="eyebrow absolute top-3 right-3 rounded-sm bg-bronze/90 px-2 py-1 text-ink backdrop-blur-sm">
        После
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-bronze transition-[left] duration-75 ease-out"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bronze bg-ink/80 text-bronze-soft shadow-lg backdrop-blur transition-transform duration-300 group-active:scale-95">
          <span className="text-xs tracking-widest">◀▶</span>
        </div>
      </div>
    </div>
  );
}
