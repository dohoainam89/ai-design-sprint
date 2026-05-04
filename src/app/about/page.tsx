import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "About — H.Studio",
  description:
    "Harvey Specter — graphic designer and web designer with 8+ years of experience across branding, digital design, and visual content.",
};

const LABEL = "text-[13px] leading-[1.1] uppercase tracking-[-0.02em]";

const specializations = [
  {
    name: "Branding",
    desc: "Crafting memorable visual identities that capture the essence of a business.",
  },
  {
    name: "Brand Strategy",
    desc: "Building clear, strategic foundations that help brands grow with purpose.",
  },
  {
    name: "Photography",
    desc: "Creating visuals that strengthen brand presence and communication.",
  },
  {
    name: "Videography",
    desc: "Producing engaging content that brings ideas and stories to life.",
  },
  {
    name: "Web Design",
    desc: "Designing modern, user-focused websites that combine aesthetics with functionality.",
  },
];

const stats = [
  { num: "8+", label: "Years of Experience" },
  { num: "100+", label: "Clients" },
  { num: "500+", label: "Projects" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="dark"
          className="bg-[#111] px-4 md:px-8 pt-[130px] md:pt-[160px] pb-12 md:pb-[80px]"
        >
          <p
            className={`${LABEL} text-white/40 mb-6 md:mb-10`}
            style={{ fontFamily: "var(--secondary-family)" }}
          >
            [ about ]
          </p>

          <h1 className="font-light text-white uppercase tracking-[-0.07em] leading-[0.86] mb-10 md:mb-16">
            <span className="block text-[20vw] md:text-[11vw]">Harvey</span>
            <span className="block text-[20vw] md:text-[11vw]">Specter</span>
          </h1>

          {/* Opening statement */}
          <div className="border-t border-white/15 pt-8 md:pt-10">
            <p className="text-white/65 text-[16px] md:text-[21px] font-light leading-[1.65] tracking-[-0.03em] max-w-[800px]">
              Design is more than making things look good — it is about creating
              meaningful experiences, building strong identities, and helping
              brands connect with people in a lasting way.
            </p>
          </div>
        </section>

        {/* ── Bio + Stats ──────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="light"
          className="px-4 md:px-8 py-12 md:py-[80px] border-b border-[#1f1f1f]/10"
        >
          <div className="flex flex-col md:flex-row md:gap-20">

            {/* Bio */}
            <div className="flex-1 flex flex-col gap-5 mb-12 md:mb-0">
              <p
                className={`${LABEL} text-[#1f1f1f]/40`}
                style={{ fontFamily: "var(--secondary-family)" }}
              >
                [ bio ]
              </p>
              <p className="text-[#1f1f1f]/75 text-[15px] leading-[1.85] tracking-[-0.02em]">
                I&apos;m Harvey Specter, a graphic designer and web designer
                with more than 8 years of experience, working with over 100
                clients and delivering 500+ projects across branding, digital
                design, and visual content. Over the years, I&apos;ve helped
                businesses bring their ideas to life through thoughtful design,
                strategic thinking, and creative execution.
              </p>
              <p className="text-[#1f1f1f]/75 text-[15px] leading-[1.85] tracking-[-0.02em]">
                My work combines creativity, strategy, and attention to detail.
                Whether I&apos;m building a brand from the ground up, designing
                a website, or creating visual content through photography and
                videography, my goal is always the same: to tell a story that
                feels authentic and makes an impact.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-row md:flex-col gap-0 shrink-0 md:w-[260px]">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 md:flex-none border-t border-[#1f1f1f]/12 pt-4 pb-8"
                >
                  <p className="font-light text-[#1f1f1f] text-[48px] md:text-[64px] leading-[0.88] tracking-[-0.06em]">
                    {stat.num}
                  </p>
                  <p
                    className={`${LABEL} text-[#1f1f1f]/35 mt-2`}
                    style={{ fontFamily: "var(--secondary-family)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── What I Do ────────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="dark"
          className="bg-black px-4 md:px-8 py-12 md:py-[80px]"
        >
          {/* Section header */}
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <p
              className={`${LABEL} text-white/40`}
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              [ what i do ]
            </p>
            <span className="font-light text-white uppercase tracking-[-0.08em] leading-none text-[32px] md:text-[96px]">
              [5]
            </span>
          </div>

          {/* Service rows — CSS-only hover effects, no JS needed */}
          <div className="flex flex-col">
            {specializations.map((s, i) => (
              <div
                key={s.name}
                className="group flex flex-col gap-2 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-white/25 text-[13px]"
                    style={{ fontFamily: "var(--secondary-family)" }}
                  >
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <div className="flex-1 border-t border-white/20 transition-colors duration-300 group-hover:border-white/70" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between pt-1 pb-8 gap-2 md:gap-0">
                  <p
                    className="font-bold italic text-white text-[28px] md:text-[36px] uppercase tracking-[-0.04em] leading-[1.1] shrink-0
                      translate-x-0 transition-transform duration-300 ease-out group-hover:translate-x-3"
                  >
                    {s.name}
                  </p>
                  <p
                    className="text-[14px] text-white/45 leading-[1.55] tracking-[-0.02em] md:max-w-[460px]
                      transition-colors duration-300 group-hover:text-white/70"
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── My Approach ──────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="light"
          className="px-4 md:px-8 py-12 md:py-[80px] border-b border-[#1f1f1f]/10"
        >
          <div className="flex flex-col md:flex-row">

            {/* Heading column */}
            <div className="md:w-[38%] shrink-0 mb-8 md:mb-0 md:pr-16">
              <p
                className={`${LABEL} text-[#1f1f1f]/40 mb-5`}
                style={{ fontFamily: "var(--secondary-family)" }}
              >
                [ approach ]
              </p>
              <h2
                className="font-black italic text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[0.9] text-[28px] md:text-[44px]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                My<br />Approach
              </h2>
            </div>

            {/* Text column */}
            <div className="flex-1 md:border-l md:border-[#1f1f1f]/10 md:pl-16 flex flex-col gap-5">
              <p className="text-[#1f1f1f]/70 text-[15px] leading-[1.85] tracking-[-0.02em]">
                Every brand has a unique story, and I believe great design
                starts with understanding that story. My process is
                collaborative, strategic, and tailored to each client&apos;s
                goals. I take the time to understand the vision, the audience,
                and the bigger picture so that every design decision has
                purpose.
              </p>
              <p className="text-[#1f1f1f]/70 text-[15px] leading-[1.85] tracking-[-0.02em]">
                Whether you are a startup looking to build a strong identity or
                an established business ready to elevate your brand, I help
                turn ideas into visuals that inspire trust, attract attention,
                and leave a lasting impression.
              </p>
            </div>

          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="dark"
          className="bg-black px-4 md:px-8 pt-16 md:pt-[100px] pb-0"
        >
          <div className="flex flex-col gap-6 md:gap-8">
            <p
              className={`${LABEL} text-white/35`}
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              [ let&apos;s talk ]
            </p>

            <h2 className="font-light text-white uppercase tracking-[-0.07em] leading-[0.88]">
              <span className="block text-[13vw] md:text-[7.5vw]">
                Let&apos;s Build
              </span>
              <span className="block text-[13vw] md:text-[7.5vw]">
                Something
              </span>
              <span className="block text-[13vw] md:text-[7.5vw]">
                Great
              </span>
            </h2>

            <p className="text-white/50 text-[15px] leading-[1.75] tracking-[-0.02em] max-w-[540px] mt-2">
              Great design can transform the way people see your brand. If
              you&apos;re looking for a creative partner who values quality,
              strategy, and results, I&apos;d be glad to help.
            </p>

            {/* CTA button — plain styled <a> so no client JS needed */}
            <div className="pb-16 md:pb-[80px]">
              <a
                href="#contact"
                className="group relative inline-flex overflow-hidden text-[14px] font-medium tracking-[-0.04em] px-5 py-3 rounded-full bg-white text-black cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[inherit] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out bg-black"
                />
                <span className="relative z-10 text-black group-hover:text-white transition-colors duration-200 ease-in-out">
                  Get in touch
                </span>
              </a>
            </div>
          </div>
        </section>

        <div data-navbar-theme="dark">
          <Footer />
        </div>
      </main>
    </>
  );
}
