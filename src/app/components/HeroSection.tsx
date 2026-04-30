"use client";

import { useState, useEffect, useRef } from "react";
import WipeButton from "./WipeButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const heroImage = "/hero.jpg";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const harveyRef = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !imageWrap) return;

    // Set initial image scale (replaces lg:scale-[1.2] Tailwind class)
    const baseScale = window.innerWidth >= 1024 ? 1.2 : 1;
    gsap.set(imageWrap, { scale: baseScale });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Harvey + label drift left, Specter drifts right
      tl.to([harveyRef.current, labelRef.current], { x: "-12vw", ease: "none" }, 0)
        .to(specterRef.current, { x: "12vw", ease: "none" }, 0)
        // Image subtly grows as section leaves
        .to(imageWrap, { scale: baseScale * 1.1, ease: "none" }, 0)
        // Blur overlay fades out
        .to(blurRef.current, { opacity: 0, ease: "none" }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-dvh min-h-[600px] overflow-hidden bg-[#d8d5d0]"
      >
        {/* ── Background photo ──
            lg+ uses the oversized aspect-ratio container with negative margins;
            md–lg uses simple inset-0 fill to avoid horizontal overflow.
            Scale is controlled by GSAP (see useEffect above).
        */}
        <div
          ref={imageWrapRef}
          className="
            absolute inset-0 will-change-transform
            lg:inset-auto lg:-translate-y-1/2 lg:aspect-[2291/1346]
            lg:left-[-34.79%] lg:right-[-34.79%]
            lg:top-[calc(50%+88.84px+15rem)]
          "
        >
          <img
            src={heroImage}
            alt=""
            aria-hidden={true}
            className="absolute inset-0 size-full max-w-none object-cover object-center lg:object-[center_20%] pointer-events-none select-none"
          />
        </div>

        {/* ── Blur overlay ── */}
        <div
          ref={blurRef}
          className="absolute bottom-0 left-0 right-0 h-[55%] backdrop-blur-[10px] will-change-[opacity]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 45%)",
          }}
        />

        {/* ── Layout ── */}
        <div className="relative h-full flex flex-col justify-between md:justify-start px-4 md:px-8">

          {/* Nav */}
          <nav className="shrink-0 flex items-center justify-between py-6">
            <span className="font-semibold text-base tracking-[-0.04em] capitalize select-none">
              H.Studio
            </span>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-14 list-none m-0 p-0 font-semibold text-base tracking-[-0.04em] capitalize">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-[width] after:duration-300 hover:after:w-full"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <WipeButton className="hidden md:flex items-center justify-center">
              Let&apos;s talk
            </WipeButton>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1 cursor-pointer"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                <rect width="24" height="2" fill="black" />
                <rect y="7" width="24" height="2" fill="black" />
                <rect y="14" width="24" height="2" fill="black" />
              </svg>
            </button>
          </nav>

          {/* Desktop-only 240 px gap */}
          <div className="hidden md:block h-[240px] shrink-0" />

          {/* ── Hero content ── */}
          <div className="shrink-0 flex flex-col items-start pb-6 md:pb-0 w-full gap-8 md:gap-0">

            {/* Name block */}
            <div className="flex flex-col w-full md:pb-[15px]">
              <p
                ref={labelRef}
                className="w-full text-center md:text-left text-white text-sm uppercase leading-[1.1] mix-blend-overlay will-change-transform"
                style={{ fontFamily: "var(--secondary-family)" }}
              >
                [ Hello I&apos;m ]
              </p>

              <h1
                className="
                  font-medium text-white text-center w-full capitalize
                  mix-blend-overlay whitespace-pre-wrap
                  leading-[0.8] tracking-[-0.07em]
                  text-[25.6vw]
                  md:text-left md:text-[calc((100vw-4rem)*0.1439)] md:leading-[1.1] md:mb-[-15px]
                "
              >
                <span
                  ref={harveyRef}
                  className="inline-block will-change-transform"
                >
                  Harvey
                </span>
                {"   "}
                <span
                  ref={specterRef}
                  className="inline-block will-change-transform"
                >
                  Specter
                </span>
              </h1>
            </div>

            {/* Description + CTA */}
            <div className="flex w-full md:justify-end">
              <div className="flex flex-col gap-[17px] items-start w-full md:w-[293px]">
                <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.1]">
                  H.Studio is a{" "}
                  <span className="font-normal">full-service</span>
                  {" "}creative studio creating beautiful digital experiences
                  and products. We are an{" "}
                  <span className="font-normal">award winning</span>
                  {" "}desing and art group specializing in branding, web design
                  and engineering.
                </p>
                <WipeButton className="w-full md:w-auto">
                  Let&apos;s talk
                </WipeButton>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Mobile menu ── */}
      <div
        className={`
          fixed inset-0 z-50 flex flex-col bg-black px-4 py-6
          transition-transform duration-500 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between shrink-0">
          <span className="font-semibold text-base text-white tracking-[-0.04em] capitalize select-none">
            H.Studio
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-1 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col flex-1 justify-center gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/15 py-5 font-medium text-white text-4xl capitalize tracking-[-0.04em] hover:opacity-60 transition-opacity"
            >
              <span>{link}</span>
              <span
                className="text-sm font-normal opacity-40"
                style={{ fontFamily: "var(--secondary-family)" }}
              >
                0{i + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="shrink-0 pt-6">
          <button className="w-full bg-white text-black text-[14px] font-medium tracking-[-0.04em] px-4 py-4 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
            Let&apos;s talk
          </button>
        </div>
      </div>
    </>
  );
}
