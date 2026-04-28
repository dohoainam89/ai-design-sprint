/*
  Desktop layout — staggered type at 96 px Inter Light:
    A CREATIVE DIRECTOR   /  [001]
          PHOTOGRAPHER
                              BORN & RAISED
    ON THE SOUTH SIDE
                              OF CHICAGO.  [creative freelancer]

  Mobile layout — centered at 32 px, stacked:
    [001]
    A CREATIVE DIRECTOR  /
    PHOTOGRAPHER
    BORN & RAISED
    ON THE SOUTH SIDE
    OF CHICAGO.
    [creative freelancer]

  Indents are expressed as percentages of the content-box width so they
  scale with the viewport (calculated from the Figma's 214 px / 610 px /
  606 px at a 1376 px content width at 1440 px viewport).
*/

const LINES_SHARED =
  "font-light text-black uppercase tracking-[-0.08em] leading-[0.84] whitespace-nowrap";
const LABEL_SHARED = "text-[14px] text-[#1f1f1f] leading-[1.1]";

export default function TaglineSection() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-[120px]">
      <div className="flex flex-col gap-6">

        {/* ── Header: badge + full-width rule ── */}
        <div className="flex flex-col gap-3 items-end">
          <p
            className={`${LABEL_SHARED} uppercase text-right w-full`}
            style={{ fontFamily: "var(--secondary-family)" }}
          >
            [ 8+ years in industry ]
          </p>
          <div className="border-t border-[#1f1f1f] w-full" />
        </div>

        {/* ── Stanza ── */}
        <div className="flex flex-col gap-2 items-center md:items-start">

          {/* "001" — mobile: above line 1; desktop: inline-right of line 1 */}
          <p
            className={`md:hidden ${LABEL_SHARED}`}
            style={{ fontFamily: "var(--secondary-family)" }}
          >
            001
          </p>

          {/* Line 1 — A CREATIVE DIRECTOR / */}
          <div className="flex items-start gap-3 text-center md:text-left">
            <span className={`${LINES_SHARED} text-[32px] md:text-[96px] whitespace-pre`}>
              {`A creative director   /`}
            </span>
            <span
              className={`hidden md:block ${LABEL_SHARED} mt-3 shrink-0`}
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              001
            </span>
          </div>

          {/* Line 2 — PHOTOGRAPHER (indented 214/1376 = 15.55% on desktop) */}
          <div className="text-center md:text-left md:pl-[15.55%]">
            <span className={`${LINES_SHARED} text-[32px] md:text-[96px]`}>
              Photographer
            </span>
          </div>

          {/* Line 3 — BORN & RAISED (indented 610/1376 = 44.3%)
              The & uses Playfair Display Italic, matching the Figma. */}
          <div className="text-center md:text-left md:pl-[44.3%]">
            <span className={`${LINES_SHARED} text-[32px] md:text-[96px]`}>
              Born{" "}
              <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
                &amp;
              </span>
              {" "}raised
            </span>
          </div>

          {/* Line 4 — ON THE SOUTH SIDE (full left) */}
          <div className="text-center md:text-left">
            <span className={`${LINES_SHARED} text-[32px] md:text-[96px]`}>
              On the south side
            </span>
          </div>

          {/* Line 5 — OF CHICAGO. (indented 606/1376 = 44%)
              Desktop: "[ CREATIVE FREELANCER ]" is absolute-positioned to the right.
                left-[34.4%] is measured from this div's own left edge:
                (1079 − 606) / 1376 = 34.4%  →  places the label at 78.4% of
                the section content width, matching the Figma exactly.
              Mobile: label is rendered as a separate element below.
          */}
          <div className="relative text-center md:text-left md:pl-[44%]">
            <span className={`${LINES_SHARED} text-[32px] md:text-[96px]`}>
              Of Chicago.
            </span>
            <span
              className={`hidden md:block absolute top-[26px] left-[34.4%] ${LABEL_SHARED} whitespace-nowrap`}
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              [ CREATIVE FREELANCER ]
            </span>
          </div>

          {/* "[ CREATIVE FREELANCER ]" — mobile only, below the stanza */}
          <p
            className={`md:hidden ${LABEL_SHARED}`}
            style={{ fontFamily: "var(--secondary-family)" }}
          >
            [ CREATIVE FREELANCER ]
          </p>

        </div>
      </div>
    </section>
  );
}
