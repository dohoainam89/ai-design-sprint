/*
  Desktop — black bg, px-8 py-[80px], gap-[48px] between sections:
    [ SERVICES ]
    [4]                          DELIVERABLES   (Inter Light 96px, justify-between)
    — 4 rows: [ N ] + rule, then name (left) / description + 151px image (right) —

  Mobile — px-4 py-12, gap-[32px] between sections:
    [ SERVICES ]
    [4]          DELIVERABLES   (Inter Light 32px, justify-between)
    — 4 rows: same header, then name / description / image stacked —
*/

const LABEL = "text-[14px] text-white leading-[1.1]";
const HERO_TYPE =
  "font-light text-white uppercase tracking-[-0.08em] leading-none text-[32px] md:text-[96px]";

const services = [
  {
    index: "1",
    name: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/257961f4-4a95-460c-ba3b-0239da9aab48",
  },
  {
    index: "2",
    name: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/a01941a3-1148-4f85-bc7c-e36f02fe1ab5",
  },
  {
    index: "3",
    name: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/0b7e352b-a83e-499e-90a6-cdb6fe7ea699",
  },
  {
    index: "4",
    name: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/bea02a35-42c7-4e35-9c41-82a6554f7ddd",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12">

      {/* [ SERVICES ] */}
      <p className={`${LABEL} uppercase`} style={{ fontFamily: "var(--secondary-family)" }}>
        [ services ]
      </p>

      {/* [4]   DELIVERABLES */}
      <div className="flex items-center justify-between">
        <span className={HERO_TYPE}>[4]</span>
        <span className={HERO_TYPE}>Deliverables</span>
      </div>

      {/* Service rows */}
      <div className="flex flex-col gap-12">
        {services.map((s) => (
          <div key={s.index} className="flex flex-col gap-[9px] md:gap-[9px]">

            {/* Index + horizontal rule */}
            <p className={`${LABEL} uppercase`} style={{ fontFamily: "var(--secondary-family)" }}>
              [ {s.index} ]
            </p>
            <div className="border-t border-white/40" />

            {/* Content — desktop: name left / desc+image right; mobile: stacked */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between pt-[9px] gap-4 md:gap-0">

              <p className="font-bold italic text-white text-[36px] uppercase tracking-[-0.04em] leading-[1.1] shrink-0">
                {s.name}
              </p>

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                  {s.description}
                </p>
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-[151px] h-[151px] object-cover shrink-0"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
