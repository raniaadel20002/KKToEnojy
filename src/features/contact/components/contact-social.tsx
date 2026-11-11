"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import { MessageCircle } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
} from "@/src/shared/components/icons";
import { SITE_CONTACT } from "@/src/shared/config/contact";

// Social animations
const socialContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const socialIconVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContactSocial() {
  const t = useTranslations("ContactPage.social");

  return (
    <div className="mt-6">
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="text-lg font-bold leading-[160%] text-[#343B55]"
      >
        {t("title")}
      </motion.h2>
      <motion.div
        variants={socialContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-4 flex items-center gap-6 text-[#343B55]"
      >
        <motion.div variants={socialIconVariants}>
          <Link
            href={SITE_CONTACT.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("links.facebook")}
            className="grid size-7 place-items-center transition-transform hover:-translate-y-0.5"
          >
            <FacebookIcon className="size-6" />
          </Link>
        </motion.div>
        <motion.div variants={socialIconVariants}>
          <Link
            href={SITE_CONTACT.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("links.instagram")}
            className="grid size-7 place-items-center transition-transform hover:-translate-y-0.5"
          >
            <InstagramIcon className="size-6" />
          </Link>
        </motion.div>
        <motion.div variants={socialIconVariants}>
          <Link
            href={`https://wa.me/${SITE_CONTACT.whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="grid size-7 place-items-center transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="size-6" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
