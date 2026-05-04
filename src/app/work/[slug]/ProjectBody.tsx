"use client";

import { useEffect, useState, useCallback } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export type SanityImg = SanityImageSource & { alt?: string };

export type TextSection = {
  _type: "textSection";
  _key: string;
  heading?: string;
  paragraph?: string;
};

export type FullImageSection = {
  _type: "fullImageSection";
  _key: string;
  image?: SanityImg;
};

export type TwoImageSection = {
  _type: "twoImageSection";
  _key: string;
  imageLeft?: SanityImg;
  imageRight?: SanityImg;
};

export type BodyBlock = TextSection | FullImageSection | TwoImageSection;

function getAlt(img: SanityImg | undefined | null): string {
  return (img as { alt?: string } | undefined)?.alt ?? "";
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white/50 hover:text-white text-[13px] uppercase tracking-[-0.04em] transition-colors"
        style={{ fontFamily: "var(--secondary-family)" }}
        aria-label="Close lightbox"
        onClick={onClose}
      >
        [ × close ]
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />
    </div>
  );
}

// ── Shared clickable image wrapper ─────────────────────────────────────────────

function LightboxImage({
  previewSrc,
  fullSrc,
  alt,
  className,
  openLightbox,
}: {
  previewSrc: string;
  fullSrc: string;
  alt: string;
  className?: string;
  openLightbox: (src: string, alt: string) => void;
}) {
  return (
    <button
      type="button"
      className={`group block w-full overflow-hidden cursor-zoom-in ${className ?? ""}`}
      onClick={() => openLightbox(fullSrc, alt)}
      aria-label={alt ? `Open: ${alt}` : "Open full-size image"}
    >
      <img
        src={previewSrc}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        draggable={false}
      />
    </button>
  );
}

// ── Block renderers ─────────────────────────────────────────────────────────────

function TextSectionBlock({ block }: { block: TextSection }) {
  return (
    <div
      data-navbar-theme="light"
      className="px-4 md:px-8 py-12 md:py-[80px] border-t border-[#1f1f1f]/10"
    >
      <div className="flex flex-col md:flex-row md:gap-0">
        {/* Heading — left ~38% */}
        <div className="md:w-[38%] shrink-0 mb-8 md:mb-0 md:pr-16">
          {block.heading && (
            <h2
              className="font-black italic text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[0.9] text-[28px] md:text-[44px] md:sticky md:top-[120px]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {block.heading}
            </h2>
          )}
        </div>

        {/* Paragraph — right, with a hairline separator */}
        <div className="flex-1 md:border-l md:border-[#1f1f1f]/10 md:pl-16 flex items-start">
          {block.paragraph && (
            <p className="text-[#1f1f1f]/70 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.02em]">
              {block.paragraph}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function FullImageSectionBlock({
  block,
  openLightbox,
}: {
  block: FullImageSection;
  openLightbox: (src: string, alt: string) => void;
}) {
  if (!block.image) return null;
  const previewSrc = urlFor(block.image as SanityImageSource).width(1800).url();
  const fullSrc = urlFor(block.image as SanityImageSource).width(2400).url();
  const alt = getAlt(block.image);

  return (
    <div data-navbar-theme="dark">
      <LightboxImage
        previewSrc={previewSrc}
        fullSrc={fullSrc}
        alt={alt}
        className="aspect-[16/9] md:aspect-[21/9]"
        openLightbox={openLightbox}
      />
    </div>
  );
}

function TwoImageSectionBlock({
  block,
  openLightbox,
}: {
  block: TwoImageSection;
  openLightbox: (src: string, alt: string) => void;
}) {
  const leftPreview = block.imageLeft
    ? urlFor(block.imageLeft as SanityImageSource).width(900).url()
    : null;
  const leftFull = block.imageLeft
    ? urlFor(block.imageLeft as SanityImageSource).width(1600).url()
    : null;
  const rightPreview = block.imageRight
    ? urlFor(block.imageRight as SanityImageSource).width(900).url()
    : null;
  const rightFull = block.imageRight
    ? urlFor(block.imageRight as SanityImageSource).width(1600).url()
    : null;

  return (
    <div
      data-navbar-theme="light"
      className="px-4 md:px-8 py-8 md:py-12 border-t border-[#1f1f1f]/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {leftPreview && leftFull && (
          <LightboxImage
            previewSrc={leftPreview}
            fullSrc={leftFull}
            alt={getAlt(block.imageLeft)}
            className="aspect-[4/3]"
            openLightbox={openLightbox}
          />
        )}
        {rightPreview && rightFull && (
          <LightboxImage
            previewSrc={rightPreview}
            fullSrc={rightFull}
            alt={getAlt(block.imageRight)}
            className="aspect-[4/3]"
            openLightbox={openLightbox}
          />
        )}
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export default function ProjectBody({ body }: { body: BodyBlock[] }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      {body.map((block) => {
        if (block._type === "textSection")
          return <TextSectionBlock key={block._key} block={block} />;
        if (block._type === "fullImageSection")
          return (
            <FullImageSectionBlock
              key={block._key}
              block={block}
              openLightbox={openLightbox}
            />
          );
        if (block._type === "twoImageSection")
          return (
            <TwoImageSectionBlock
              key={block._key}
              block={block}
              openLightbox={openLightbox}
            />
          );
        return null;
      })}

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
