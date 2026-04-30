"use client";

/*
  Desktop — py-[120px], min-h-[900px], no horizontal padding:
    "Testimonials" (Inter Medium 198px) centered absolutely over the section.
    4 cards scattered & rotated around it, absolutely positioned as
    percentages of the 1440 px frame width so they scale with the viewport.

  Mobile — px-4 py-16:
    "Testimonials" heading (64px) stacked above a touch-swipeable card carousel.
    Cards snap one-at-a-time; dot indicators show current position.
*/

import { useRef, useState, useCallback, useEffect } from "react";

const testimonials = [
  {
    name: "Marko Stojković",
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    rotate: "-6.85deg",
    left: "7.1%",
    top: "142px",
  },
  {
    name: "Lukas Weber",
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    rotate: "2.9deg",
    left: "46.9%",
    top: "272px",
  },
  {
    name: "Sarah Jenkins",
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good — they solve business problems through visual clarity.",
    rotate: "2.23deg",
    left: "21.2%",
    top: "553px",
  },
  {
    name: "Sofia Martínez",
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    rotate: "-4.15deg",
    left: "68.5%",
    top: "546px",
  },
];

const mobileRotations = ["-3.5deg", "2deg", "-2.5deg", "3deg"];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 1.5l1.545 3.89 4.205.365-3.15 2.76 1.005 4.105L8 10.315 4.395 12.62 5.4 8.515 2.25 5.755l4.205-.365L8 1.5z"
            fill="#1f1f1f"
          />
        </svg>
      ))}
    </div>
  );
}

function Card({
  name,
  quote,
  rotate,
  width = "w-[353px]",
}: {
  name: string;
  quote: string;
  rotate: string;
  width?: string;
}) {
  return (
    <div
      className={`bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 ${width} shrink-0`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <Stars />
      <p className="text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {quote}
      </p>
      <p className="text-[16px] font-black text-black tracking-[-0.04em] uppercase leading-[1.1] whitespace-nowrap">
        {name}
      </p>
    </div>
  );
}

function MobileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 353;
  const GAP = 16;

  const updateIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP));
    setActiveIndex(Math.min(Math.max(idx, 0), testimonials.length - 1));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scrollend", updateIndex);
    // fallback for browsers without scrollend
    el.addEventListener("scroll", updateIndex, { passive: true });
    return () => {
      el.removeEventListener("scrollend", updateIndex);
      el.removeEventListener("scroll", updateIndex);
    };
  }, [updateIndex]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: (CARD_WIDTH + GAP) * index, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Scrollable track — overflow-x-auto scrolls; parent has no overflow-hidden so next card peeks */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {testimonials.map((t, i) => (
          <div key={t.name} className="snap-start shrink-0 py-3">
            <Card
              name={t.name}
              quote={t.quote}
              rotate={mobileRotations[i % mobileRotations.length]}
              width="w-[353px]"
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2" role="tablist" aria-label="Testimonials">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to testimonial by ${t.name}`}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-[#1f1f1f]" : "w-2 bg-[#ccc]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section>
      {/* ── Desktop: scattered cards around centered heading ── */}
      <div className="hidden md:block relative min-h-[900px] py-[120px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h2 className="font-medium text-black text-center capitalize tracking-[-0.07em] leading-[1.1] text-[198px]">
            Testimonials
          </h2>
        </div>

        {testimonials.map((t) => (
          <div
            key={t.name}
            className="absolute"
            style={{ left: t.left, top: t.top }}
          >
            <Card name={t.name} quote={t.quote} rotate={t.rotate} />
          </div>
        ))}
      </div>

      {/* ── Mobile: heading + swipeable carousel ── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <h2 className="font-medium text-black capitalize tracking-[-0.07em] leading-[0.8] text-[64px]">
          Testimonials
        </h2>

        <MobileCarousel />
      </div>
    </section>
  );
}
