/*
  Desktop layout — two-column row at px-8 py-[80px]:
    [ ABOUT ]  |  (text with corner brackets)  (002 / portrait)
    ^flex-1       ^─────────── 71.4% of content width ────────────^

  Mobile layout — stacked at px-4 py-12:
    002
    [ ABOUT ]
    (bracketed paragraph)
    (full-width portrait  aspect-[422/594])
*/

const portrait =
  "https://www.figma.com/api/mcp/asset/0b46a5ee-802b-4b05-af42-89550001f6f2";

const LABEL = "text-[14px] text-[#1f1f1f] leading-[1.1]";

function CornerBrackets() {
  return (
    <>
      <span className="absolute top-0 left-0  w-5 h-5 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0  w-5 h-5 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#1f1f1f]" />
    </>
  );
}

export default function AboutSection() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-[80px]">

      {/* Mobile-only header: 002 → [ ABOUT ] */}
      <div className="flex flex-col gap-3 mb-8 md:hidden">
        <p className={LABEL} style={{ fontFamily: "var(--secondary-family)" }}>
          002
        </p>
        <p
          className={`${LABEL} uppercase`}
          style={{ fontFamily: "var(--secondary-family)" }}
        >
          [ ABOUT ]
        </p>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* Left column — [ ABOUT ] label (desktop only) */}
        <div className="hidden md:block flex-1">
          <p
            className={`${LABEL} uppercase`}
            style={{ fontFamily: "var(--secondary-family)" }}
          >
            [ ABOUT ]
          </p>
        </div>

        {/* Right column — 983/1376 ≈ 71.4% of content width */}
        <div className="flex flex-col md:flex-row md:w-[71.4%] gap-8 md:gap-6">

          {/* Bracketed biography paragraph */}
          <div className="relative flex-1 p-6">
            <CornerBrackets />
            <p className="text-[14px] text-[#1f1f1f] leading-[1.65] tracking-[-0.02em]">
              Harvey Specter is a creative director and photographer born and
              raised on the South Side of Chicago. With over 8 years of
              experience across branding, art direction, and editorial
              photography, he brings a razor-sharp visual perspective to every
              project. His work lives at the intersection of culture, craft, and
              storytelling — shaped by the energy and textures of the city he
              calls home.
            </p>
          </div>

          {/* Photo column — 002 is pinned to the photo's top-left corner */}
          <div className="relative shrink-0">
            <p
              className={`hidden md:block absolute top-0 left-0 -translate-y-full pb-1.5 ${LABEL}`}
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              002
            </p>
            <img
              src={portrait}
              alt="Harvey Specter portrait"
              className="
                block w-full aspect-[422/594] object-cover object-top
                md:w-[436px] md:h-[614px] md:aspect-auto
              "
            />
          </div>

        </div>
      </div>
    </section>
  );
}
