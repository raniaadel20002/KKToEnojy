"use client";

import { useTranslations } from "next-intl";
import type { BlogSection } from "@/src/features/admin/blogs/types";

interface TableOfContentsProps {
  sections: BlogSection[];
  activeSection: number | null;
}

export function TableOfContents({ sections, activeSection }: TableOfContentsProps) {
  const t = useTranslations("BlogDetails");

  const scrollToSection = (sectionId: number) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)] sm:p-7">
      <h3 className="mb-4 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.15em] text-[#765438] uppercase">
        {t("inThisStory")}
      </h3>
      <nav aria-label="Table of Contents">
        <ul className="space-y-3 font-[family-name:var(--font-dm-sans)] text-sm">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex items-center gap-2.5 text-left transition-colors ${
                    isActive
                      ? "font-bold text-[#343B55]"
                      : "font-normal text-[#5B6B73] hover:text-[#343B55]"
                  }`}
                >
                  <span
                    className={`size-2 shrink-0 rounded-full transition-colors ${
                      isActive ? "bg-[#765438]" : "bg-[#D1D5DB] group-hover:bg-[#765438]"
                    }`}
                  />
                  <span className="line-clamp-2 leading-snug">{section.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
