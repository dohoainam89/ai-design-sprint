/*
  Desktop — pt-[48px] px-8, bg-black:
    Top row (3 equal columns, ~298px each):
      Left:   "Have a PROJECT in mind?" (24px italic+black mix) + "Let's talk" pill
      Center: FACEBOOK / INSTAGRAM (text-center, 18px)
      Right:  X.COM / LINKEDIN (text-right, 18px)
    Thin white divider line
    Bottom row (items-end justify-between):
      Left: "H.Studio" 290px semibold clipped + "[Coded By Claude]" rotated -90° beside it
      Right: LICENCES · PRIVACY POLICY (12px underlined, pb-8)

  Mobile — pt-[48px] px-4, bg-black:
    "Have a PROJECT in mind?" + "Let's talk" pill
    FACEBOOK / INSTAGRAM / X.COM / LINKEDIN stacked (18px)
    Thin white divider
    LICENCES · PRIVACY POLICY centered (12px underlined)
    "[Coded By Claude]" (10px mono)
    "H.Studio" (91px semibold, overflows right for decorative crop effect)
*/

const socials = ["Facebook", "Instagram", "X.com", "Linkedin"];

export default function Footer() {
  return (
    <footer className="bg-black overflow-hidden">

      {/* ── Mobile ── */}
      <div className="md:hidden pt-12 px-4 flex flex-col gap-12">

        {/* CTA + socials */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="font-light italic text-white text-[24px] uppercase tracking-[-0.04em] leading-[1.1]">
              Have a{" "}
              <span className="font-black not-italic">project</span>
              {" "}in mind?
            </p>
            <button className="border border-white rounded-full px-4 py-3 text-white text-[14px] font-medium tracking-[-0.04em] w-fit cursor-pointer hover:bg-white hover:text-black transition-colors">
              Let&apos;s talk
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            {socials.map((s) => (
              <a key={s} href="#" className="text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1]">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 w-full" />

        {/* Legal */}
        <div className="flex gap-8 justify-center text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1]">
          <a href="#" className="underline">Licences</a>
          <a href="#" className="underline">Privacy Policy</a>
        </div>

        {/* Wordmark: [Coded By Claude] label above, H.Studio below overflowing right */}
        <div className="flex flex-col gap-3">
          <p className="text-white text-[10px] uppercase leading-[1.1]" style={{ fontFamily: "var(--secondary-family)" }}>
            [ Coded By Claude ]
          </p>
          <p className="font-semibold text-white text-[24vw] leading-[0.8] tracking-[-0.06em] capitalize whitespace-nowrap">
            H.Studio
          </p>
        </div>

      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col gap-[120px] pt-[48px] px-8">

        {/* Top: CTA + social columns + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">

            {/* Left: CTA */}
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="font-light italic text-white text-[24px] uppercase tracking-[-0.04em] leading-[1.1]">
                Have a{" "}
                <span className="font-black not-italic">project</span>
                {" "}in mind?
              </p>
              <button className="border border-white rounded-full px-4 py-3 text-white text-[14px] font-medium tracking-[-0.04em] w-fit cursor-pointer hover:bg-white hover:text-black transition-colors">
                Let&apos;s talk
              </button>
            </div>

            {/* Center: Facebook / Instagram */}
            <div className="w-[298px] text-center flex flex-col gap-[2px]">
              {["Facebook", "Instagram"].map((s) => (
                <a key={s} href="#" className="block text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1]">
                  {s}
                </a>
              ))}
            </div>

            {/* Right: X.com / Linkedin */}
            <div className="w-[298px] text-right flex flex-col gap-[2px]">
              {["X.com", "Linkedin"].map((s) => (
                <a key={s} href="#" className="block text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1]">
                  {s}
                </a>
              ))}
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/20 w-full" />
        </div>

        {/* Bottom: wordmark row with legal links absolute at bottom-right */}
        <div className="relative flex items-end">

          {/* Rotated label column — height matches wordmark cap-height (~16vw) */}
          <div className="relative w-4 shrink-0" style={{ height: "16vw" }}>
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-white text-[14px] uppercase leading-[1.1]"
              style={{ fontFamily: "var(--secondary-family)" }}
            >
              [ Coded By Claude ]
            </span>
          </div>

          {/* H.Studio — vw-based so it scales and clips at the footer's overflow boundary */}
          <p className="font-semibold text-white text-[20vw] leading-[0.8] tracking-[-0.06em] capitalize whitespace-nowrap">
            H.Studio
          </p>

          {/* Legal links — absolute bottom-right, no layout box to cover the wordmark */}
          <div className="absolute bottom-8 right-0 flex gap-[34px] text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1]">
            <a href="#" className="underline">Licences</a>
            <a href="#" className="underline">Privacy Policy</a>
          </div>

        </div>

      </div>

    </footer>
  );
}
