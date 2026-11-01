"use client";

import { ChevronDown, Globe2, MapPin, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";

import { navItems } from "@/src/features/layout/constants/navigation";
import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import {
  FacebookIcon,
  InstagramIcon,
} from "@/src/shared/components/icons";
import type { AppLocale } from "@/src/i18n/locales";

const quickActions = [
  ...navItems,
  { label: "FAQ", labelKey: "faq", href: "/faq", hasMenu: false },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Footer() {
  const [destOpen, setDestOpen] = useState(false);
  const locale = useLocale() as AppLocale;
  const navT = useTranslations("Navigation");
  const footerT = useTranslations("Footer");
  const { data: destinations } = useDestinationsQuery(false);

  function getLocalizedHref(href: string) {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  }

  return (
    <footer className="bg-[var(--color-footer-bg)] px-5 py-12 sm:px-8 lg:px-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto grid w-full max-w-[1280px] gap-10 rounded-[48px] bg-white px-8 py-10 sm:px-10 md:grid-cols-[1.5fr_0.9fr_1.8fr_1.3fr] md:gap-12 lg:px-8"
      >
        <motion.div variants={columnVariants} className="space-y-5">
          <Image
            src="/Logo.png"
            alt="SunnySide Tours"
            width={240}
            height={53}
            unoptimized
            className="h-auto w-[200px] sm:w-[240px]"
          />
          <p className="max-w-[292px] text-base font-normal leading-[160%] text-[var(--color-footer-text)]">
            {footerT("companyDescription")}
          </p>
        </motion.div>

        <motion.div variants={columnVariants}>
          <h2 className="mb-4 text-lg font-bold leading-[160%] text-[var(--color-footer-title)]">
            {footerT("quickAction")}
          </h2>
          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {quickActions.map((item) => {
              if (item.hasMenu) {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setDestOpen((v) => !v)}
                      className="flex w-fit items-center gap-1.5 text-base leading-[160%] text-[var(--color-footer-text)] transition-colors hover:text-[var(--color-ocean)]"
                    >
                      <span>{navT(item.labelKey)}</span>
                      <ChevronDown
                        size={16}
                        className={`text-[var(--color-footer-title)] transition-transform duration-200 ${destOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Expanded destinations list */}
                    {destOpen && (
                      <div className="mt-2 flex flex-col gap-2 pl-3">
                        <Link
                          href={getLocalizedHref("/Destinations")}
                          className="text-sm font-semibold text-[#003A5A] hover:underline"
                        >
                          {navT("allDestinations")} -&gt;
                        </Link>
                        {destinations?.map((dest) => (
                          <Link
                            key={dest.id}
                            href={getLocalizedHref(
                              `/trips?destinationId=${dest.id}`,
                            )}
                            className="text-sm text-[var(--color-footer-text)] hover:text-[var(--color-ocean)]"
                          >
                            {dest.name.trim()}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={getLocalizedHref(item.href)}
                  className="flex w-fit items-center gap-1.5 text-base leading-[160%] text-[var(--color-footer-text)] transition-colors hover:text-[var(--color-ocean)]"
                >
                  <span>{navT(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>

        <motion.div variants={columnVariants}>
          <h2 className="mb-4 text-lg font-bold leading-[160%] text-[var(--color-footer-title)]">
            {footerT("contactUs")}
          </h2>
          <address className="flex flex-col gap-4 not-italic">
            <a
              href="https://wa.me/201093943595"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base leading-[160%] text-[var(--color-footer-text)] transition-colors hover:text-[var(--color-ocean)]"
            >
              <Phone
                size={24}
                strokeWidth={2}
                className="shrink-0 text-[var(--color-footer-title)]"
              />
              <span>+201093943595</span>
            </a>
            <a
              href="mailto:info@sunnyside-tours.com"
              className="flex items-center gap-2 text-base leading-[160%] text-[var(--color-footer-text)] transition-colors hover:text-[var(--color-ocean)]"
            >
              <Globe2
                size={24}
                strokeWidth={2}
                className="shrink-0 text-[var(--color-footer-title)]"
              />
              <span>info@sunnyside-tours.com</span>
            </a>
            <p className="flex items-center gap-2 text-base leading-[160%] text-[var(--color-footer-text)]">
              <MapPin
                size={24}
                strokeWidth={2}
                className="shrink-0 text-[var(--color-footer-title)]"
              />
              <span>Egypt</span>
            </p>
          </address>
        </motion.div>

        <motion.div variants={columnVariants}>
          <h2 className="mb-8 text-lg font-bold leading-[160%] text-[var(--color-footer-title)]">
            {footerT("followUs")}
          </h2>
          <div className="flex items-center gap-8 text-[var(--color-footer-title)]">
            <Link
              href="https://www.facebook.com/people/SunnySide-Tours/61590996990350"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SunnySide Tours on Facebook"
              className="grid size-6 place-items-center transition-transform hover:-translate-y-0.5"
            >
              <FacebookIcon className="size-5" />
            </Link>
            <Link
              href="https://www.instagram.com/sunny_side_tours"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SunnySide Tours on Instagram"
              className="grid size-6 place-items-center transition-transform hover:-translate-y-0.5"
            >
              <InstagramIcon className="size-5" />
            </Link>
            <Link
              href="https://wa.me/201093943595"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact SunnySide Tours on WhatsApp"
              className="grid size-6 place-items-center transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mx-auto mt-6 text-center text-xs font-normal leading-[160%] text-white/75"
      >
        {footerT("poweredBy")}{" "}
        <a
          href="https://tech-gear.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white transition-colors hover:text-[#69DD84] hover:underline"
        >
          Tech Gear Solutions
        </a>{" "}
        © {new Date().getFullYear()} {footerT("allRightsReserved")}
      </motion.p>
    </footer>
  );
}
