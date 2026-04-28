"use client";

import { useState } from "react";

const heroImage =
  "https://www.figma.com/api/mcp/asset/84ad3d76-a79d-4d5a-86a2-d55cf1446777";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section className="relative h-dvh min-h-[600px] overflow-hidden bg-[#d8d5d0]">
        {/* ── Background photo ──
            Mobile:  object-[40%_top] shows the man's face/torso in the upper half.
            Desktop: object-[center_15%] keeps the wider crop centred.
        */}
        <img
          src={heroImage}
          alt=""
          aria-hidden={true}
          className="
            absolute inset-0 h-full w-full pointer-events-none select-none
            object-cover object-[40%_top]
            md:object-[center_15%]
          "
        />

        {/* ── Blur overlay — gradient mask removes the hard cutoff edge ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%] backdrop-blur-[10px]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 45%)",
          }}
        />

        {/* ── Layout ──
            Mobile:  justify-between → nav top, content bottom, image fills the gap.
            Desktop: justify-start + 240 px spacer mirrors the Figma gap.
        */}
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
            <button className="hidden md:flex items-center justify-center bg-black text-white text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
              Let&apos;s talk
            </button>

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

          {/* ── Hero content ──
              shrink-0 on both breakpoints so the block is exactly its content
              height. On mobile the outer justify-between pushes it to the bottom.
          */}
          <div className="shrink-0 flex flex-col items-start pb-6 md:pb-0 w-full gap-4 md:gap-0">

            {/* Name block */}
            <div className="flex flex-col w-full md:pb-[15px]">
              {/*
                  The H1 is full-width with text-center, so its left/right edges
                  are exactly the container edges.

                  Label:
                    Mobile  → text-center (centred above the centred name).
                    Desktop → text-left + px-[18px] indent (aligns to the "H"
                              of Harvey at the container's left edge).
              */}
              <p
                className="w-full text-center md:text-left md:px-[18px] text-white text-sm uppercase leading-[1.1] mix-blend-overlay"
                style={{ fontFamily: "var(--secondary-family)" }}
              >
                [ Hello I&apos;m ]
              </p>

              {/*
                  Fluid font size:
                    Mobile  → 25.6 vw  (= 96 px at 375 px, scales with viewport)
                    Desktop → clamp(130px, 13.75 vw, 198px)
                              13.75 vw = 198 px at 1440 px → text fills the
                              container; shrinks proportionally at smaller widths.

                  Tracking uses -0.07 em so it always scales with the font size,
                  matching the Figma's -13.86 px at 198 px and -6.72 px at 96 px.
              */}
              <h1
                className="
                  font-medium text-white text-center w-full capitalize
                  mix-blend-overlay whitespace-pre-wrap
                  leading-[0.8] tracking-[-0.07em]
                  text-[25.6vw]
                  md:text-[clamp(130px,13.75vw,198px)] md:leading-[1.1] md:mb-[-15px]
                "
              >
                {`Harvey   Specter`}
              </h1>
            </div>

            {/* Description + CTA
                Mobile:  full-width container so the paragraph aligns to the H1's
                         left edge and wraps naturally across the full content area.
                Desktop: fixed 293 px column right-aligned (matches Figma).
            */}
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
                <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                  Let&apos;s talk
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Mobile menu — slides in from the right ── */}
      <div
        className={`
          fixed inset-0 z-50 flex flex-col bg-black px-4 py-6
          transition-transform duration-500 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!menuOpen}
      >
        {/* Header */}
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

        {/* Links */}
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

        {/* CTA */}
        <div className="shrink-0 pt-6">
          <button className="w-full bg-white text-black text-[14px] font-medium tracking-[-0.04em] px-4 py-4 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
            Let&apos;s talk
          </button>
        </div>
      </div>
    </>
  );
}
