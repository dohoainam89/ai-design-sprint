import { defineQuery } from "groq";
import type { Metadata } from "next";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProjectsGrid from "./ProjectsGrid";
import type { PortfolioItem } from "@/app/components/SelectedWorkSection";

export const metadata: Metadata = {
  title: "Projects — H.Studio",
  description: "Browse all work by H.Studio — branding, web design, and creative direction.",
};

const allProjectsQuery = defineQuery(
  `*[_type == "portfolioItem"] | order(order asc) {
    _id,
    title,
    coverImage,
    "categories": categories[]->{_id, title},
    link,
    "slug": slug.current
  }`
);

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  const items = (projects ?? []) as PortfolioItem[];
  const count = String(items.length).padStart(3, "0");

  return (
    <>
      <Navbar />
      <main>

        {/* ── Page hero ────────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="dark"
          className="bg-[#111] px-4 md:px-8 pt-[130px] md:pt-[160px] pb-12 md:pb-[80px]"
        >
          {/* Top row: label + counter */}
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <p
              className="text-white/40 text-[13px] uppercase tracking-[-0.04em]"
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              [ portfolio ]
            </p>
            <p
              className="text-white/40 text-[13px]"
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              {count} projects
            </p>
          </div>

          {/* Title */}
          <h1
            className="font-light text-white uppercase tracking-[-0.07em] leading-[0.86] select-none"
          >
            <span className="block text-[22vw] md:text-[14vw]">All</span>
            <span className="block text-[22vw] md:text-[14vw]">Work</span>
          </h1>
        </section>

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="light"
          className="px-4 md:px-8 py-12 md:py-[80px]"
        >
          {items.length > 0 ? (
            <ProjectsGrid projects={items} />
          ) : (
            <p
              className="text-[#1f1f1f]/40 text-[14px]"
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              No projects yet.
            </p>
          )}
        </section>

        <div data-navbar-theme="dark">
          <Footer />
        </div>
      </main>
      <SanityLive />
    </>
  );
}
