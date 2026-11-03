"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { HomeBlogCard } from "./home-blog-card";

// Animation Variants
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
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function BlogsSection() {
  const { data: blogs, isLoading, error } = useGetBlogsQuery({
    pageSize: 5,
    pageNumber: 1,
  });
  const locale = useLocale();
  const t = useTranslations("Blogs");
  const displayedBlogs = blogs?.slice(0, 5);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2] py-16 md:py-20 lg:py-24">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-10"
      >
        {/* Header Block */}
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
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-3.5 h-1.5 w-[117px] rounded-[20px] bg-[#765438]"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 py-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-[340px] w-full max-w-[440px] sm:max-w-none mx-auto animate-pulse rounded-[16px] bg-white/70 shadow-md"
              />
            ))}
          </div>
        )}

        {/* Empty / Error State */}
        {!isLoading && (error || !displayedBlogs || displayedBlogs.length === 0) && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-[#5B6B73]">
            <p className="text-lg font-medium">{t("empty")}</p>
          </div>
        )}

        {/* Blog Cards Grid */}
        {!isLoading && displayedBlogs && displayedBlogs.length > 0 && (
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 py-4"
          >
            {displayedBlogs.map((blog, idx) => (
              <motion.div
                variants={cardVariants}
                key={blog.id}
                className="h-full w-full max-w-[440px] sm:max-w-none mx-auto"
              >
                <HomeBlogCard blog={blog} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Articles Button */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex justify-center w-full md:mt-12"
        >
          <Link
            href={`/${locale}/blogs`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#343B55] bg-transparent px-8 py-3 text-sm font-semibold text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer sm:text-base"
          >
            <span>{t("viewMore")}</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
