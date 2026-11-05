"use client";

import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TripDescriptionProps {
  description: string;
}

export function TripDescription({ description }: TripDescriptionProps) {
  const t = useTranslations("TripDetails.about");

  return (
    <div className="mb-8">
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#343B55] sm:text-3xl">
        {t("title")}
      </h2>
      <div className="prose prose-gray mt-3 max-w-none font-[family-name:var(--font-dm-sans)] text-base leading-[1.8] text-[#5B6B73]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
