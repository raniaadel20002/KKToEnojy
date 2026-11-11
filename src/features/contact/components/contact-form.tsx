"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SITE_CONTACT } from "@/src/shared/config/contact";

const formVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const t = useTranslations("ContactPage.form");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const text = encodeURIComponent(
      `New Contact Inquiry:\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${SITE_CONTACT.whatsappPhone}?text=${text}`, "_blank");
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full rounded-[24px] bg-white p-6 shadow-[0px_8px_28px_0px_#343B551A] sm:p-8 lg:p-10"
    >
      {/* Heading */}
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.25] text-[#343B55] sm:text-3xl lg:text-[32px]">
        {t("title")}
      </h2>
      <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.65] text-[#5B6B73] sm:text-base">
        {t("description")}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 sm:gap-6" noValidate>
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]"
          >
            {t("fields.name.label")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder={t("fields.name.placeholder")}
            className="h-[52px] w-full rounded-[14px] bg-[#FAF7F2] px-4 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#343B55] placeholder:text-[#888888] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#343B55]/20"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]"
          >
            {t("fields.email.label")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("fields.email.placeholder")}
            className="h-[52px] w-full rounded-[14px] bg-[#FAF7F2] px-4 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#343B55] placeholder:text-[#888888] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#343B55]/20"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-message"
            className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]"
          >
            {t("fields.message.label")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("fields.message.placeholder")}
            rows={5}
            className="w-full resize-none rounded-[14px] bg-[#FAF7F2] p-4 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#343B55] placeholder:text-[#888888] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#343B55]/20"
          />
        </div>

        {/* Submit Button */}
        <button
          id="contact-submit-btn"
          type="submit"
          className="mt-2 h-[52px] w-full cursor-pointer rounded-[30px] bg-[#343B55] font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#262c40]"
        >
          {t("submit")}
        </button>
      </form>
    </motion.div>
  );
}
