"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import {
  FacebookIcon,
  InstagramIcon,
} from "@/src/shared/components/icons";
import type { AppLocale } from "@/src/i18n/locales";
import { SITE_CONTACT } from "@/src/shared/config/contact";

const footerLinks = [
  { labelKey: "home", href: "/" },
  { labelKey: "destinations", href: "/Destinations" },
  { labelKey: "trips", href: "/trips" },
  { labelKey: "gallery", href: "/gallery" },
  { labelKey: "blogs", href: "/blogs" },
  { labelKey: "faq", href: "/faq" },
  { labelKey: "about", href: "/About" },
  { labelKey: "contact", href: "/contact-us" },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Footer() {
  const locale = useLocale() as AppLocale;
  const navT = useTranslations("Navigation");
  const footerT = useTranslations("Footer");

  function getLocalizedHref(href: string) {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  }

  return (
    <footer className="w-full bg-[#343B55] px-4 pt-10 pb-6 sm:px-6 md:px-8 md:pt-14 md:pb-8 lg:px-12">
      {/* Main Floating Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto w-full max-w-[1360px] rounded-[28px] bg-[#FAF7F2] p-8 sm:p-10 md:p-12 lg:rounded-[36px] lg:px-16 lg:py-14"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.1fr_1fr] lg:gap-12">
          {/* Col 1: Brand Logo & Description */}
          <motion.div variants={columnVariants} className="flex flex-col items-start space-y-4">
            <Link
              href={getLocalizedHref("/")}
              className="block transition-transform hover:scale-105"
              aria-label="KKTOENJOY Home"
            >
              <Image
                src="/Hero/logo.png"
                alt="KKTOENJOY Tours & Travel"
                width={86}
                height={86}
                className="h-[56px] w-auto object-contain sm:h-[76px] lg:h-[128px]"
              />
            </Link>
            <p className="max-w-[300px] font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-relaxed text-[#343B55] sm:text-[15px]">
              {footerT("companyDescription")}
            </p>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={columnVariants} className="flex flex-col">
            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-[#343B55]">
                {footerT("quickLinks")}
              </h3>
              <span className="mt-2 block h-[3px] w-12 rounded-[20px] bg-[#765438]" />
            </div>
            <nav className="mt-5 flex flex-col space-y-2.5" aria-label="Footer Quick Links">
              {footerLinks.map((item) => (
                <Link
                  key={item.labelKey}
                  href={getLocalizedHref(item.href)}
                  className="w-fit font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#343B55] transition-colors hover:text-[#198399] sm:text-[15px]"
                >
                  {navT(item.labelKey)}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Col 3: Contact Us */}
          <motion.div variants={columnVariants} className="flex flex-col">
            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-[#343B55]">
                {footerT("contactUs")}
              </h3>
              <span className="mt-2 block h-[3px] w-12 rounded-[20px] bg-[#765438]" />
            </div>
            <address className="mt-5 flex flex-col space-y-3.5 not-italic">
              <a
                href={`tel:${SITE_CONTACT.rawPhone}`}
                className="w-fit font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#343B55] transition-colors hover:text-[#198399] sm:text-[15px]"
              >
                {SITE_CONTACT.displayPhone}
              </a>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="w-fit font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#343B55] transition-colors hover:text-[#198399] sm:text-[15px]"
              >
                {SITE_CONTACT.email}
              </a>
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#343B55] sm:text-[15px]">
                {footerT("address")}
              </span>
            </address>
          </motion.div>

          {/* Col 4: Follow Us */}
          <motion.div variants={columnVariants} className="flex flex-col">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-[#343B55]">
              {footerT("followUs")}
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={SITE_CONTACT.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-[#343B55] text-[#343B55] transition-all hover:scale-105 hover:bg-[#343B55] hover:text-white"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={SITE_CONTACT.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-[#343B55] text-[#343B55] transition-all hover:scale-105 hover:bg-[#343B55] hover:text-white"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar: Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 text-center font-[family-name:var(--font-dm-sans)] text-sm font-normal text-white md:mt-8 md:text-base"
      >
        {footerT("poweredBy")}{" "}
        <a
          href="https://tech-gear.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white hover:underline"
        >
          Tech Gear Solutions
        </a>{" "}
        © {new Date().getFullYear()} {footerT("allRightsReserved")}
      </motion.p>
    </footer>
  );
}
