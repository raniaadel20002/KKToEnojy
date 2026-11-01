"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function FaqSkeleton() {
  return (
    <div className="flex flex-col gap-[22px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-[70px] animate-pulse rounded-[14px] bg-[var(--color-faq-box)]"
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
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-0 lg:py-[82px]"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[1280px]"
      >
        <div className="mx-auto mb-8 max-w-[680px] text-center">
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-[300px] break-words font-montez text-[30px] font-normal leading-[150%] text-[var(--color-faq-accent)] sm:max-w-none sm:text-[36px] sm:leading-[160%]"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mx-auto max-w-[340px] break-words text-[32px] font-semibold leading-[130%] text-[var(--color-ocean)] sm:max-w-none sm:text-[40px] sm:leading-[160%]"
          >
            {t("title")}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 117 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-1 h-2 bg-[var(--color-faq-accent)]"
          />
        </div>

        {isLoading ? (
          <FaqSkeleton />
        ) : (
          <div className="flex flex-col gap-[22px]">
            {questions?.map((item) => {
              const isOpen = openItems.has(item.id);

              return (
                <motion.article
                  variants={itemVariants}
                  key={item.id}
                  className="overflow-hidden rounded-[14px] bg-[var(--color-faq-box)]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    className="flex min-h-[70px] w-full items-center justify-between gap-4 px-4 text-left text-[22px] font-medium leading-[160%] text-[var(--color-deep-ocean)] sm:px-6 sm:text-2xl"
                  >
                    <span>{item.text}</span>
                    <ChevronDown
                      size={24}
                      strokeWidth={2.3}
                      className={`shrink-0 text-black transition-transform duration-200 ${
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
                        <p className="break-words px-4 pb-5 text-[18px] font-normal leading-[160%] text-[var(--color-muted)] sm:px-6 sm:text-xl">
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
            className="rounded-full border-2 border-[var(--color-ocean)] px-10 py-3 text-lg font-semibold text-[var(--color-ocean)] transition-colors hover:bg-[var(--color-ocean)] hover:text-white"
          >
            {t("viewAll")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
