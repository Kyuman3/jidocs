"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** 화면에 들어올 때 부드럽게 나타납니다. JS가 없거나 모션 줄이기 설정이면 그대로 보입니다. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // 첫 화면에 보이는 요소는 그대로 둠

    el.classList.add("reveal-hidden");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            el.classList.remove("reveal-hidden");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
      {children}
    </div>
  );
}
