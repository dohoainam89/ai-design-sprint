"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import WipeButton from "./WipeButton";

const navLinks: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(true); // hero section is first → dark
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const navH = navRef.current?.offsetHeight ?? 68;
      const midY = navH / 2;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-navbar-theme]")
      );

      // Walk sections top-to-bottom; the last one whose top ≤ navMidY is
      // the section currently behind the navbar.
      let theme = sections[0]?.dataset.navbarTheme ?? "light";
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= midY) {
          theme = el.dataset.navbarTheme ?? "light";
        }
      }
      setIsDark(theme === "dark");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const fill = isDark ? "white" : "black";

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between
          px-4 md:px-8 py-6 transition-colors duration-300
          ${isDark ? "text-white" : "text-black"}`}
      >
        <span className="font-semibold text-base tracking-[-0.04em] capitalize select-none">
          H.Studio
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-14 list-none m-0 p-0 font-semibold text-base tracking-[-0.04em] capitalize">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={`relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                  after:transition-[width] after:duration-300 hover:after:w-full
                  ${isDark ? "after:bg-white" : "after:bg-black"}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <WipeButton
          variant={isDark ? "dark" : "light"}
          className="hidden md:flex items-center justify-center"
        >
          Let&apos;s talk
        </WipeButton>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 cursor-pointer"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
            <rect width="24" height="2" fill={fill} />
            <rect y="7" width="24" height="2" fill={fill} />
            <rect y="14" width="24" height="2" fill={fill} />
          </svg>
        </button>
      </nav>

      {/* Mobile menu — slides in from the right */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-black px-4 py-6
          transition-transform duration-500 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
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
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/15 py-5 font-medium text-white text-4xl capitalize tracking-[-0.04em] hover:opacity-60 transition-opacity"
            >
              <span>{label}</span>
              <span
                className="text-sm font-normal opacity-40"
                style={{ fontFamily: "var(--secondary-family)" }}
              >
                0{i + 1}
              </span>
            </Link>
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
