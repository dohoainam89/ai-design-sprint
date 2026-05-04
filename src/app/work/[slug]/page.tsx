import { defineQuery } from "groq";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProjectBody, { type BodyBlock } from "./ProjectBody";

type PortfolioDetail = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: (SanityImageSource & { alt?: string }) | null;
  categories?: { _id: string; title: string }[] | null;
  link?: string | null;
  leadParagraph?: string | null;
  client?: string | null;
  year?: string | null;
  body?: BodyBlock[] | null;
};

const portfolioDetailQuery = defineQuery(
  `*[_type == "portfolioItem" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    "categories": categories[]->{_id, title},
    link,
    leadParagraph,
    client,
    year,
    body[]{ _type, _key, heading, paragraph, image, imageLeft, imageRight }
  }`
);

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "portfolioItem" && defined(slug.current)]{ "slug": slug.current }`
  );
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await client.fetch<{ title: string } | null>(
    `*[_type == "portfolioItem" && slug.current == $slug][0]{ title }`,
    { slug }
  );
  return {
    title: item ? `${item.title} — H.Studio` : "Work — H.Studio",
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: item } = (await sanityFetch({
    query: portfolioDetailQuery,
    params: { slug },
  })) as { data: PortfolioDetail | null };

  if (!item) notFound();

  const coverSrc = item.coverImage
    ? urlFor(item.coverImage as SanityImageSource).width(2000).url()
    : null;

  const hasInfo = item.leadParagraph || item.client || item.year;

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="dark"
          className="relative h-dvh min-h-[600px] overflow-hidden bg-[#111]"
        >
          {/* Cover image */}
          {coverSrc && (
            <img
              src={coverSrc}
              alt={(item.coverImage as { alt?: string } | undefined)?.alt ?? item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
          )}

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-[70%]"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
            }}
          />

          {/* Back link — top left */}
          <div className="absolute top-6 md:top-8 left-4 md:left-8 z-10">
            <Link
              href="/"
              className="text-white/50 hover:text-white text-[13px] uppercase tracking-[-0.04em] transition-colors"
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              [ ← back ]
            </Link>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 inset-x-0 px-4 md:px-8 pb-10 md:pb-16 flex flex-col gap-4 md:gap-5">

            {/* Category tags */}
            {item.categories && item.categories.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {item.categories.map((c: { _id: string; title: string }) => (
                  <span
                    key={c._id}
                    className="backdrop-blur-[8px] bg-white/15 border border-white/20 text-white text-[12px] font-medium tracking-[-0.02em] px-3 py-1 rounded-full"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="font-black italic text-white uppercase tracking-[-0.04em] leading-[0.88] text-[14vw] md:text-[8vw] max-w-[90%]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {item.title}
            </h1>

          </div>
        </section>

        {/* ── Info strip ───────────────────────────────────────────────────── */}
        {hasInfo && (
          <section
            data-navbar-theme="light"
            className="px-4 md:px-8 py-10 md:py-14 border-b border-[#1f1f1f]/10"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

              {/* Lead paragraph — grows */}
              {item.leadParagraph && (
                <p className="flex-1 text-[#1f1f1f]/70 text-[15px] leading-[1.8] tracking-[-0.02em] max-w-[640px]">
                  {item.leadParagraph}
                </p>
              )}

              {/* Client + Year — shrinks to fit */}
              {(item.client || item.year) && (
                <div className="flex gap-10 shrink-0 md:pt-1">
                  {item.client && (
                    <div className="flex flex-col gap-1.5">
                      <span
                        className="text-[#1f1f1f]/35 text-[10px] uppercase tracking-[0.1em]"
                        style={{ fontFamily: "var(--secondary-family)" }}
                      >
                        Client
                      </span>
                      <span className="text-[#1f1f1f] text-[14px] font-medium tracking-[-0.03em]">
                        {item.client}
                      </span>
                    </div>
                  )}
                  {item.year && (
                    <div className="flex flex-col gap-1.5">
                      <span
                        className="text-[#1f1f1f]/35 text-[10px] uppercase tracking-[0.1em]"
                        style={{ fontFamily: "var(--secondary-family)" }}
                      >
                        Year
                      </span>
                      <span className="text-[#1f1f1f] text-[14px] font-medium tracking-[-0.03em]">
                        {item.year}
                      </span>
                    </div>
                  )}
                </div>
              )}

            </div>
          </section>
        )}

        {/* ── Body blocks ──────────────────────────────────────────────────── */}
        {item.body && item.body.length > 0 && (
          <ProjectBody body={item.body as BodyBlock[]} />
        )}

        <div data-navbar-theme="dark">
          <Footer />
        </div>
      </main>
      <SanityLive />
    </>
  );
}
