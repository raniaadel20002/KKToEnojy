"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { useQuestionsQuery } from "@/src/features/faq/api/get-questions";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function FaqSkeleton() {
  return (
    <div className="flex flex-col gap-[18px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-[70px] animate-pulse rounded-[14px] bg-[#FAF7F2]/20"
        />
      ))}
    </div>
  );
}

export function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const locale = useLocale();
  const t = useTranslations("FAQ");
  const { data: questions, isLoading } = useQuestionsQuery({ pageSize: 4 });

  function toggleItem(id: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section
      id="faq"
      className="bg-[#343B55] px-5 py-16 sm:px-8 sm:py-20 lg:px-0 lg:py-[82px]"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[900px]"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.h2
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-[40px] font-bold leading-[1.2] text-white sm:text-[52px]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-[family-name:var(--font-dm-sans)] mt-3 text-[16px] leading-[1.6] text-white/70 sm:text-[18px]"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 117 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="mx-auto mt-4 h-[6px] rounded-[20px] bg-[#198399]"
          />
        </div>

        {/* Accordion */}
        {isLoading ? (
          <FaqSkeleton />
        ) : (
          <div className="flex flex-col gap-[18px]">
            {questions?.map((item) => {
              const isOpen = openItems.has(item.id);

              return (
                <motion.article
                  variants={itemVariants}
                  key={item.id}
                  className="overflow-hidden rounded-[14px] border border-[#888888] bg-[#FAF7F2]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    className="flex min-h-[70px] w-full items-center justify-between gap-4 px-5 text-left sm:px-7"
                  >
                    <span className="font-[family-name:var(--font-dm-sans)] text-[17px] font-semibold leading-[1.5] text-[#198399] sm:text-[19px]">
                      {item.text}
                    </span>
                    <ChevronDown
                      size={22}
                      strokeWidth={2.5}
                      className={`shrink-0 text-[#198399] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                      >
                        <p className="font-[family-name:var(--font-dm-sans)] break-words px-5 pb-5 text-[16px] font-normal leading-[1.7] text-[#5B6B73] sm:px-7 sm:text-[17px]">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <motion.div variants={itemVariants} className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/faq`}
            className="font-[family-name:var(--font-dm-sans)] inline-flex items-center gap-2 rounded-full bg-[#198399] px-8 py-3 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("viewAll")}
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
