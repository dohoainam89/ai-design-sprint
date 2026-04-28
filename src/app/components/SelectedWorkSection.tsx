/*
  Desktop — px-8 py-[80px]:
    Header: "Selected Work" (Inter Light 96px, 2 lines) + "004" inline · "[ PORTFOLIO ]" rotated right
    Two-column staggered grid (gap-6, items-end):
      Left  (flex-1):  card 744px → card 699px → CTA box (w-[465px])   (justify-between)
      Right (flex-1):  pt-[240px]  card 699px → gap-[117px] → card 744px

  Mobile — px-4 py-12:
    Header: "[ portfolio ]" above · "Selected Work" 32px + "004" right
    All 4 cards stacked (390px each) → CTA box full-width
*/

const img = {
  surfers:  "https://www.figma.com/api/mcp/asset/dca348a1-e774-4647-a874-93debea50a87",
  cyberpunk:"https://www.figma.com/api/mcp/asset/85499749-0137-4b7b-b98b-ea008d9240f9",
  agency:   "https://www.figma.com/api/mcp/asset/45829f49-3471-4e0b-8d06-b184f0c77d92",
  minimal:  "https://www.figma.com/api/mcp/asset/7abc0efd-dc5a-4c02-8635-26a8249084da",
};

const projects = [
  { name: "Surfers Paradise",   image: img.surfers,   tags: ["Social Media", "Photography"] },
  { name: "Cyberpunk Caffe",    image: img.cyberpunk,  tags: ["Social Media", "Photography"] },
  { name: "Agency 976",         image: img.agency,    tags: ["Social Media", "Photography"] },
  { name: "Minimal Playground", image: img.minimal,   tags: ["Social Media", "Photography"] },
];

const LABEL = "text-[14px] text-[#1f1f1f] leading-[1.1]";

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="16" cy="16" r="15.5" stroke="#1f1f1f" />
      <path
        d="M12 20L20 12M20 12H14.5M20 12V17.5"
        stroke="#1f1f1f"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 text-[#111] text-[14px] font-medium tracking-[-0.04em] px-2 py-1 rounded-full whitespace-nowrap">
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  heightClass,
}: {
  project: (typeof projects)[0];
  heightClass: string;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className={`relative w-full overflow-hidden ${heightClass}`}>
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {project.tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-black text-black uppercase leading-[1.1] tracking-[-0.04em] text-[24px] md:text-[36px]">
          {project.name}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
}

function CTABox({ className = "" }: { className?: string }) {
  return (
    <div className={`relative p-6 ${className}`}>
      <span className="absolute top-0 left-0  w-5 h-5 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0  w-5 h-5 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#1f1f1f]" />
      <div className="flex flex-col gap-[10px] items-start">
        <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
          Let&apos;s talk
        </button>
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-[80px]">

      {/* ── Mobile header ── */}
      <div className="md:hidden flex flex-col gap-4 mb-8">
        <p className={`${LABEL} uppercase`} style={{ fontFamily: "var(--secondary-family)" }}>
          [ portfolio ]
        </p>
        <div className="flex items-start justify-between">
          <div className="font-light text-black uppercase tracking-[-0.08em]">
            <p className="text-[32px] leading-[0.86]">Selected</p>
            <p className="text-[32px] leading-[0.86]">Work</p>
          </div>
          <p className={LABEL} style={{ fontFamily: "var(--secondary-family)" }}>004</p>
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-center justify-between mb-[61px]">
        <div className="flex gap-[10px] items-start">
          <div className="font-light text-black uppercase tracking-[-0.08em]">
            <p className="text-[96px] leading-[0.86]">Selected</p>
            <p className="text-[96px] leading-[0.86]">Work</p>
          </div>
          <p className={`${LABEL} mt-1`} style={{ fontFamily: "var(--secondary-family)" }}>004</p>
        </div>
        {/* Rotated [ PORTFOLIO ] — contained in 15×110 px box */}
        <div className="flex h-[110px] w-[15px] items-center justify-center shrink-0">
          <p
            className={`-rotate-90 whitespace-nowrap ${LABEL} uppercase`}
            style={{ fontFamily: "var(--secondary-family)" }}
          >
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex flex-col gap-6 md:hidden">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} heightClass="h-[390px]" />
        ))}
        <CTABox />
      </div>

      {/* ── Desktop: staggered two-column ── */}
      <div className="hidden md:flex gap-6 items-end">

        {/* Left column: card 744 / card 699 / CTA */}
        <div className="flex-1 flex flex-col justify-between gap-[100px]">
          <ProjectCard project={projects[0]} heightClass="h-[744px]" />
          <ProjectCard project={projects[1]} heightClass="h-[699px]" />
          <CTABox className="w-[465px]" />
        </div>

        {/* Right column: offset 240px, gap 117px between cards */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          <ProjectCard project={projects[2]} heightClass="h-[699px]" />
          <ProjectCard project={projects[3]} heightClass="h-[744px]" />
        </div>

      </div>
    </section>
  );
}
