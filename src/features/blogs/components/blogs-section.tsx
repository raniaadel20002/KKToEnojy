"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
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
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const planeVariants: Variants = {
  hidden: { opacity: 0, x: -100, y: 20 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function BlogsSection() {
  const { data: blogs, isLoading, error } = useGetBlogsQuery({
    pageSize: 3,
    pageNumber: 1,
  });
  const locale = useLocale();
  const t = useTranslations("Blogs");
  const displayedBlogs = blogs?.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#F5FCFF" }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Plane Decoration */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
          <Image
            src="/Blogs/plane.svg"
            alt=""
            width={500}
            height={500}
            unoptimized
            className="absolute left-[0%] top-[-5%] w-[350px] object-contain md:left-[15%] md:top-[-11%] md:w-[500px]"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto w-full px-5 md:px-8 lg:max-w-[1280px] lg:px-10">
          {/* Top Section Container */}
          <div className="relative mb-12 flex flex-col items-center md:mb-16 md:flex-row md:justify-center">
            {/* Header */}
            <div className="text-center">
              <motion.p
                variants={itemVariants}
                className="font-[family-name:var(--font-montez)] text-[24px] leading-[160%] text-[#69DD84] md:text-[32px]"
              >
                {t("subtitle")}
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="mt-1 font-sans text-[28px] font-bold leading-[160%] text-[var(--color-deep-ocean)] md:text-[40px]"
              >
                {t("title")}
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 117 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mx-auto mt-2 h-1 bg-[#69DD84]"
              />
            </div>

            {/* More Articals Button (Desktop) */}
            <motion.div
              variants={itemVariants}
              className="hidden md:absolute md:right-0 md:top-1/2 md:block md:-translate-y-1/2"
            >
              <Link
                href={`/${locale}/blogs`}
                className="inline-block rounded-full border border-[var(--color-deep-ocean)] px-8 py-2 text-sm font-medium text-[var(--color-deep-ocean)] transition-all hover:bg-[var(--color-deep-ocean)] hover:text-white"
              >
                {t("viewMore")}
              </Link>
            </motion.div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[400px] animate-pulse rounded-[20px] bg-white shadow-md"
                />
              ))}
            </div>
          )}

          {/* Empty / Error State */}
          {!isLoading && (error || !displayedBlogs || displayedBlogs.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-[var(--color-muted)]">
              <p className="text-lg font-medium">{t("empty")}</p>
            </div>
          )}

          {/* Blog Cards Grid */}
          {!isLoading && displayedBlogs && displayedBlogs.length > 0 && (
            <motion.div
              variants={cardContainerVariants}
              className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
            >
              {displayedBlogs.map((blog) => (
                <motion.div variants={cardVariants} key={blog.id}>
                  <HomeBlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* More Articals Button (Mobile) */}
          <motion.div variants={itemVariants} className="mt-12 text-center md:hidden">
            <Link
              href={`/${locale}/blogs`}
              className="inline-block rounded-full border border-[var(--color-deep-ocean)] px-8 py-2 text-sm font-medium text-[var(--color-deep-ocean)] transition-all hover:bg-[var(--color-deep-ocean)] hover:text-white md:text-base"
            >
              {t("viewMore")}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
