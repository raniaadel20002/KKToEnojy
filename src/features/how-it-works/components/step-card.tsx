import Image from "next/image";

import type { Step } from "@/src/features/how-it-works/data/steps-data";

interface StepCardProps {
  step: Step;
  t: (key: string) => string;
}

export function StepCard({ step, t }: StepCardProps) {
  return (
    <div className="relative flex h-full flex-col">
      {/* Icon image at top - much bigger */}
      <div className="absolute left-1/2 -top-16 z-10 -translate-x-1/2 md:-top-20">
        <Image
          src={step.iconImage}
          alt={t(step.titleKey)}
          width={120}
          height={120}
          unoptimized
          className="h-[100px] w-[100px] md:h-[120px] md:w-[120px]"
        />
      </div>

      {/* Card content - fixed height for consistency with less top padding */}
      <div className="flex h-full flex-col rounded-[20px] bg-white px-4 py-6 pt-12 text-center shadow-md md:rounded-[24px] md:px-8 md:py-8 md:pt-16">
        <h3 className="mb-3 text-[16px] font-semibold leading-[140%] text-[#1A1A1A] md:mb-4 md:text-[18px] lg:text-[20px]">
          {t(step.titleKey)}
        </h3>
        <p className="text-[14px] leading-[160%] text-[#6B7280] md:text-[15px] lg:text-[16px]">
          {t(step.descriptionKey)}
        </p>
      </div>
    </div>
  );
}
