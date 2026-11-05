"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

const mapContainerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ContactMap() {
  const t = useTranslations("ContactPage.map");

  return (
    <motion.div
      variants={mapContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="mt-8 rounded-[24px] bg-white p-6 shadow-[0px_8px_28px_0px_#343B551A] sm:mt-10 sm:p-8 lg:p-10"
    >
      {/* Title */}
      <div className="flex items-center gap-2.5">
        <MapPin size={22} className="text-[#0E4A68]" />
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#343B55] sm:text-2xl">
          {t("title")}
        </h2>
      </div>

      {/* Two columns: Map on Left, Photo on Right */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6">
        {/* Left: Interactive / Custom Google Map */}
        <div className="relative min-h-[260px] w-full overflow-hidden rounded-[20px] bg-[#FAF7F2] sm:min-h-[300px]">
          <iframe
            id="contact-map"
            title={t("title")}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55271.15388997437!2d33.7844!3d27.2574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145285b0c6a9a5b1%3A0x7e74c70d0a43a6d7!2sHurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1691580000000!5m2!1sen!2seg"
            width="100%"
            height="100%"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right: Hurghada / Red Sea Photo (/Contact/photo.png) */}
        <div className="relative min-h-[260px] w-full overflow-hidden rounded-[20px] bg-[#FAF7F2] sm:min-h-[300px]">
          <Image
            src="/Contact/photo.png"
            alt="Hurghada resort and beach"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 500px, 100vw"
          />
        </div>
      </div>
    </motion.div>
  );
}
