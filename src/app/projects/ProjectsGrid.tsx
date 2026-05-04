"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";
import type { PortfolioItem } from "@/app/components/SelectedWorkSection";

function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 text-[#111] text-[12px] font-medium tracking-[-0.04em] px-2 py-1 rounded-full whitespace-nowrap">
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioItem;
  index: number;
}) {
  const imgSrc = project.coverImage
    ? urlFor(project.coverImage).width(700).url()
    : "";
  const num = String(index + 1).padStart(2, "0");

  const inner = (
    <div className="flex flex-col gap-3">
      {/* Image */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-[#e8e8e8]">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={(project.coverImage as { alt?: string })?.alt ?? project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        {project.categories && project.categories.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
            {project.categories.map((c) => (
              <Tag key={c._id} label={c.title} />
            ))}
          </div>
        )}
      </div>

      {/* Title row */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <p className="font-black text-black uppercase leading-[1.1] tracking-[-0.04em] text-[18px] md:text-[24px] group-hover:text-black/50 transition-colors duration-300">
          {project.title}
        </p>
        <span
          className="text-[#1f1f1f]/30 text-[12px] shrink-0 mt-0.5"
          style={{ fontFamily: "var(--secondary-family)" }}
        >
          {num}
        </span>
      </div>
    </div>
  );

  if (project.slug) {
    return (
      <Link href={`/work/${project.slug}`} className="group" data-card>
        {inner}
      </Link>
    );
  }
  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        data-card
      >
        {inner}
      </a>
    );
  }
  return (
    <div className="group" data-card>
      {inner}
    </div>
  );
}

export default function ProjectsGrid({
  projects,
}: {
  projects: PortfolioItem[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll<HTMLElement>("[data-card]");

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: grid,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16"
    >
      {projects.map((project, i) => (
        <ProjectCard key={project._id} project={project} index={i} />
      ))}
    </div>
  );
}
