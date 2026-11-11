"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
} from "@/src/shared/components/icons";
import { SITE_CONTACT } from "@/src/shared/config/contact";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContactInfo() {
  const t = useTranslations("ContactPage");

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* 1. Location Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex items-center gap-4 rounded-[24px] bg-white p-5 shadow-[0px_8px_28px_0px_#343B551A] sm:p-6"
      >
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] text-[#198399]">
          <MapPin size={20} />
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#343B55] sm:text-lg">
            {t("info.location.label")}
          </h3>
          <p className="mt-0.5 font-[family-name:var(--font-dm-sans)] text-xs font-normal text-[#5B6B73] sm:text-sm">
            {t("info.location.value")}
          </p>
        </div>
      </motion.div>

      {/* 2. Call Us Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex items-center gap-4 rounded-[24px] bg-white p-5 shadow-[0px_8px_28px_0px_#343B551A] sm:p-6"
      >
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] text-[#198399]">
          <Phone size={20} />
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#343B55] sm:text-lg">
            {t("info.phone.label")}
          </h3>
          <a
            href={`tel:${SITE_CONTACT.rawPhone}`}
            className="mt-0.5 block font-[family-name:var(--font-dm-sans)] text-xs font-normal text-[#5B6B73] transition-colors hover:text-[#198399] sm:text-sm"
          >
            {SITE_CONTACT.phone}
          </a>
        </div>
      </motion.div>

      {/* 3. Email Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex items-center gap-4 rounded-[24px] bg-white p-5 shadow-[0px_8px_28px_0px_#343B551A] sm:p-6"
      >
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] text-[#198399]">
          <Mail size={20} />
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#343B55] sm:text-lg">
            {t("info.email.label")}
          </h3>
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="mt-0.5 block font-[family-name:var(--font-dm-sans)] text-xs font-normal text-[#5B6B73] transition-colors hover:text-[#198399] sm:text-sm"
          >
            {SITE_CONTACT.email}
          </a>
        </div>
      </motion.div>

      {/* 4. Follow Us Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-3 rounded-[24px] bg-white p-5 shadow-[0px_8px_28px_0px_#343B551A] sm:p-6"
      >
        <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#343B55] sm:text-lg">
          {t("social.title")}
        </h3>
        <div className="flex items-center gap-3">
          <a
            href={SITE_CONTACT.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex size-10 items-center justify-center rounded-full border border-[#EDE7DC] text-[#343B55] transition-all hover:scale-105 hover:bg-[#343B55] hover:text-white"
          >
            <FacebookIcon className="size-4" />
          </a>
          <a
            href={SITE_CONTACT.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex size-10 items-center justify-center rounded-full border border-[#EDE7DC] text-[#343B55] transition-all hover:scale-105 hover:bg-[#343B55] hover:text-white"
          >
            <InstagramIcon className="size-4" />
          </a>
          <a
            href={SITE_CONTACT.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="flex size-10 items-center justify-center rounded-full border border-[#EDE7DC] text-[#343B55] transition-all hover:scale-105 hover:bg-[#343B55] hover:text-white"
          >
            <XIcon className="size-4" />
          </a>
          <a
            href={SITE_CONTACT.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex size-10 items-center justify-center rounded-full border border-[#EDE7DC] text-[#343B55] transition-all hover:scale-105 hover:bg-[#343B55] hover:text-white"
          >
            <TikTokIcon className="size-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
