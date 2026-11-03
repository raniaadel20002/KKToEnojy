"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import { useReviewsProjectQuery } from "../api/get-reviews-project";
import { ReviewProjectCard } from "./review-project-card";
import { ReviewProjectForm } from "./review-project-form";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ReviewsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[260px] animate-pulse rounded-[20px] border border-[#EDE7DC] bg-white/70 p-6 shadow-sm"
        />
      ))}
    </div>
  );
}

export function ReviewsProjectSection() {
  const t = useTranslations("ReviewsProject");
  const { data: reviews, isLoading, refetch, isFetching } = useReviewsProjectQuery({
    pageSize: 12,
  });

  const [visibleCount, setVisibleCount] = useState(3);
  const [isRotating, setIsRotating] = useState(false);

  const displayedReviews = reviews?.slice(0, visibleCount) ?? [];

  const hasMore = visibleCount < (reviews?.length ?? 0);

  const handleSeeMore = async () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 600);

    if (reviews && visibleCount < reviews.length) {
      setVisibleCount((prev) => prev + 3);
    } else {
      await refetch();
    }
  };

  return (
    <section
      id="reviews-project"
      className="relative w-full overflow-hidden bg-[#FAF7F2] py-16 md:py-20 lg:py-24"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[1360px] px-4 md:px-8 lg:px-10"
      >
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <motion.h2
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight text-[#343B55] md:text-4xl lg:text-[44px]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#5B6B73] md:text-base"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 117 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-3.5 h-2 w-[117px] rounded-[20px] bg-[#765438]"
          />
        </div>

        {/* Loading State */}
        {isLoading && <ReviewsSkeleton />}

        {/* Reviews Cards Grid */}
        {!isLoading && displayedReviews.length > 0 && (
          <div>
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {displayedReviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={cardVariants}
                  className="h-full"
                >
                  <ReviewProjectCard review={review} />
                </motion.div>
              ))}
            </motion.div>

            {/* See More Button */}
            {hasMore && (
              <motion.div
                variants={itemVariants}
                className="mt-8 flex justify-center md:mt-10"
              >
                <button
                  type="button"
                  onClick={handleSeeMore}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#A4A4A4]/50 bg-[#FAF7F2] px-5 py-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#7C7C7C] transition-all hover:border-[#7C7C7C] hover:bg-[#f5ede1] active:scale-95"
                >
                  <span>{t("seeMore")}</span>
                  <Image
                    src="/review/famicons_refresh.svg"
                    alt=""
                    width={16}
                    height={16}
                    className={`h-4 w-4 transition-transform duration-500 ${isRotating || isFetching ? "rotate-180" : ""
                      }`}
                    aria-hidden="true"
                  />
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayedReviews.length === 0 && (
          <div className="py-12 text-center text-[#5B6B73]">
            <p className="font-[family-name:var(--font-dm-sans)] text-base">
              {t("noReviews")}
            </p>
          </div>
        )}

        {/* Review Submission Form */}
        <motion.div
          variants={itemVariants}
          className="mt-14 md:mt-16 lg:mt-20"
        >
          <ReviewProjectForm />
        </motion.div>
      </motion.div>
    </section>
  );
}

