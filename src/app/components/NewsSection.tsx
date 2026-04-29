/*
  Desktop — px-8 py-[120px], bg-[#f3f3f3]:
    Left: "KEEP UP WITH MY LATEST / NEWS & ACHIEVEMENTS" rotated -90°
      (Inter Light 64px, uppercase, tracking tight) in a 110×706px column
    Right: 3 news cards (353px each) with thin vertical dividers between them
      Card 1 & 3 are top-aligned (h-581px image h-469px)
      Card 2 is offset down (pt-[120px]) with image h-469px
      Each card: image → 14px description → "Read more ↗" underlined link

  Mobile — px-4 py-16, bg-[#f3f3f3]:
    Title: "Keep up with my latest news & achievements" (32px light uppercase)
    3 cards (300px) in a horizontally-scrollable row, gap-4
*/

const img = {
  news1: "https://www.figma.com/api/mcp/asset/8f8f0e29-ae66-4780-9454-a97c4f696306",
  news2: "https://www.figma.com/api/mcp/asset/5da1bfdc-1644-4327-bdfe-718d2399d95c",
  news3: "https://www.figma.com/api/mcp/asset/20a73a08-ee91-45e4-8e41-c5073cb1f3e1",
};

const articles = [
  { image: img.news1, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { image: img.news2, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { image: img.news3, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M5 13L13 5M13 5H7.5M13 5V10.5" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReadMoreLink() {
  return (
    <a
      href="#"
      className="flex items-center gap-[10px] border-b border-black pb-1 w-fit"
    >
      <span className="font-medium text-[14px] text-black tracking-[-0.04em] leading-normal">
        Read more
      </span>
      <ArrowUpRight />
    </a>
  );
}

function NewsCard({
  article,
  cardWidth,
  imageHeight,
  offsetClass = "",
}: {
  article: (typeof articles)[0];
  cardWidth: string;
  imageHeight: string;
  offsetClass?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 shrink-0 ${cardWidth} ${offsetClass}`}>
      <div className={`relative overflow-hidden w-full ${imageHeight}`}>
        <img
          src={article.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {article.description}
      </p>
      <ReadMoreLink />
    </div>
  );
}

export default function NewsSection() {
  return (
    <section className="bg-[#f3f3f3]">

      {/* ── Mobile ── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <h2 className="font-light text-black uppercase tracking-[-0.08em] leading-[0.86] text-[32px]">
          Keep up with my latest news &amp; achievements
        </h2>
        <div className="flex gap-4 overflow-x-auto -mr-4 pr-4 pb-1">
          {articles.map((article, i) => (
            <NewsCard
              key={i}
              article={article}
              cardWidth="w-[300px]"
              imageHeight="h-[398px]"
            />
          ))}
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-end justify-between px-8 py-[120px]">

        {/* Rotated title */}
        <div className="flex h-[706px] w-[110px] items-center justify-center shrink-0">
          <div className="-rotate-90 whitespace-nowrap">
            <p className="font-light text-black uppercase tracking-[-0.08em] leading-[0.86] text-[64px]">
              Keep up with my latest
            </p>
            <p className="font-light text-black uppercase tracking-[-0.08em] leading-[0.86] text-[64px]">
              news &amp; achievements
            </p>
          </div>
        </div>

        {/* 3 cards with dividers — gap-[31px] × 4 gaps + 3×300px cards ≈ 1024px, leaving ~240px for justify-between gap */}
        <div className="flex gap-[31px] items-start shrink-0">
          <NewsCard
            article={articles[0]}
            cardWidth="w-[300px]"
            imageHeight="h-[400px]"
          />

          <div className="self-stretch w-px bg-black/20 shrink-0" />

          <NewsCard
            article={articles[1]}
            cardWidth="w-[300px]"
            imageHeight="h-[400px]"
            offsetClass="pt-[120px]"
          />

          <div className="self-stretch w-px bg-black/20 shrink-0" />

          <NewsCard
            article={articles[2]}
            cardWidth="w-[300px]"
            imageHeight="h-[400px]"
          />
        </div>

      </div>
    </section>
  );
}
