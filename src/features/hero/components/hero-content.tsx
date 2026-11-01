import Link from "next/link";
import { useLocale } from "next-intl";

interface HeroContentProps {
  slide: {
    subtitle: string;
    title: string;
    description: string;
  };
  ctaLabel: string;
  previousSlideLabel: string;
  nextSlideLabel: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export function HeroContent({
  slide,
  ctaLabel,
  previousSlideLabel,
  nextSlideLabel,
  onPrev,
  onNext,
}: HeroContentProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-col">
      {/* "Explore" — Montez, green */}
      <p className="font-[family-name:var(--font-montez)] text-[var(--color-hero-accent)] leading-[160%]
        text-[28px] md:text-[40px] lg:text-[56px]">
        {slide.subtitle}
      </p>

      {/* Title — Roboto SemiBold, white, large */}
      <h1 className="font-sans font-semibold text-white leading-[120%] mt-1
        text-[36px] md:text-[52px] lg:text-[64px]
        max-w-[520px]">
        {slide.title}
      </h1>

      {/* Description */}
      <p className="font-sans font-normal text-white leading-[160%] mt-4
        text-[14px] md:text-[16px] lg:text-[20px]
        max-w-[380px]">
        {slide.description}
      </p>

      {/* CTA button */}
      <Link
        href={`/${locale}/trips`}
        className="mt-6 md:mt-8 flex items-center justify-center rounded-[37px] bg-white font-sans font-semibold text-[var(--color-ocean)]
          h-[48px] w-[180px] text-[15px]
          md:h-[52px] md:w-[210px] md:text-[16px]
          lg:h-[56px] lg:w-[249px] lg:text-[17px]
          shadow-md transition-opacity hover:opacity-90
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {ctaLabel}
      </Link>

      {/* Prev / Next arrows — below the CTA, desktop only */}
      {(onPrev || onNext) && (
        <div className="mt-4 hidden md:flex items-center gap-3">
          <button
            type="button"
            aria-label={previousSlideLabel}
            onClick={onPrev}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/50 bg-transparent text-white transition-colors hover:border-white/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 14L6 9L11 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={nextSlideLabel}
            onClick={onNext}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/50 bg-transparent text-white transition-colors hover:border-white/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
