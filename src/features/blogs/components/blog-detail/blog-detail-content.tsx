"use client";

import Image from "next/image";
import type { Blog } from "@/src/features/admin/blogs/types";

interface BlogDetailContentProps {
  blog: Blog;
}

/** Parses **text** markdown and returns React nodes with bold text */
function renderContent(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-[#343B55]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function BlogDetailContent({ blog }: BlogDetailContentProps) {
  const introParagraphs = blog.content
    ? blog.content.split("\n\n").filter((p) => p.trim())
    : [];

  return (
    <article className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* Intro paragraphs if any */}
      {introParagraphs.length > 0 && (
        <div className="space-y-4 font-[family-name:var(--font-dm-sans)] text-base leading-[1.8] text-[#5B6B73] sm:text-[17px]">
          {introParagraphs.map((paragraph, index) => (
            <p key={index}>{renderContent(paragraph)}</p>
          ))}
        </div>
      )}

      {/* Blog Sections */}
      {blog.blogSections?.map((section) => (
        <section
          key={section.id}
          id={`section-${section.id}`}
          className="scroll-mt-28"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.25] text-[#343B55] sm:text-3xl lg:text-[34px]">
            {section.title}
          </h2>

          <div className="mt-4 space-y-4 font-[family-name:var(--font-dm-sans)] text-base leading-[1.8] text-[#5B6B73] sm:text-[17px]">
            {section.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{renderContent(paragraph)}</p>
            ))}
          </div>

          {section.imageUrl && (
            <div className="relative my-8 aspect-[16/8] w-full overflow-hidden rounded-[20px] bg-gray-100 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.08)] sm:aspect-[16/9]">
              <Image
                src={section.imageUrl}
                alt={section.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 860px, 100vw"
              />
            </div>
          )}
        </section>
      ))}
    </article>
  );
}
