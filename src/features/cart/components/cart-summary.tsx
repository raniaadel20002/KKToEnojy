"use client";

import Image from "next/image";
import Link from "next/link";
import { X, CalendarDays, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { useCartStore } from "@/src/store/use-cart-store";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import type { AppLocale } from "@/src/i18n/locales";

interface CartSummaryProps {
  hideCheckoutButton?: boolean;
}

const summaryCardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const summaryCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function CartSummary({ hideCheckoutButton = false }: CartSummaryProps) {
  const { items, removeItem, getCartTotal } = useCartStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage.summary");
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-[24px] bg-white p-6 sm:p-8 shadow-sm border border-[#EDE7DC]/50 lg:w-[420px]">
        <h2 className="font-serif text-2xl font-bold text-[#343B55]">{t("title")}</h2>
        <p className="text-sm text-[#5B6B73]">{t("empty")}</p>
      </div>
    );
  }

  const currencyName = items[0]?.trip.currencyName || "EUR";

  // Check if any extra services are selected across all items
  const hasExtraServices = items.some(
    (item) => item.extraServices?.healthInsurance || item.extraServices?.medicalInsurance
  );

  return (
    <div className="flex w-full flex-col gap-5 rounded-[24px] bg-white p-6 sm:p-8 shadow-sm border border-[#EDE7DC]/60 lg:w-[420px]">
      <h2 className="font-serif text-2xl font-bold text-[#343B55]">
        {t("title")}
      </h2>

      {/* Mini Item Cards */}
      <motion.div
        variants={summaryCardContainerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {items.map((item) => {
          const primaryImage =
            item.trip.images.find((img) => img.isPrimary) ?? item.trip.images[0];

          const [year, month, day] = item.date.split("-").map(Number);
          const formattedDate = `${day}/${month}/${year}`;

          return (
            <motion.div
              key={item.id}
              variants={summaryCardVariants}
              className="flex items-center justify-between gap-3 rounded-2xl bg-[#FAF7F2] p-3.5 shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                {primaryImage && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={primaryImage.imageUrl}
                      alt={item.trip.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1 min-w-0 pr-2">
                  <span className="truncate text-xs sm:text-sm font-semibold text-[#343B55]">
                    {item.trip.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#5B6B73]">
                    <CalendarDays size={13} className="text-[#198399]" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={t("removeAria", { name: item.trip.name })}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200/60 hover:bg-gray-300 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Package Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-2 pt-2"
      >
        <h4 className="text-sm font-semibold text-[#343B55]">Package</h4>

        {items.map((item) => (
          <div key={`breakdown-${item.id}`} className="flex flex-col gap-1 text-xs sm:text-sm">
            {item.adultCount > 0 && (
              <div className="flex items-center justify-between text-[#5B6B73]">
                <span>
                  Adult: {item.adultCount} x{" "}
                  {item.trip.adultPrice === 0
                    ? "Free"
                    : formatPrice(item.trip.adultPrice, item.trip.currencyName)}
                </span>
                <span className="font-semibold text-[#343B55]">
                  {item.trip.adultPrice === 0
                    ? "Free"
                    : formatPrice(item.adultCount * item.trip.adultPrice, item.trip.currencyName)}
                </span>
              </div>
            )}
            {item.childCount > 0 && item.trip.childPrice > 0 && (
              <div className="flex items-center justify-between text-[#5B6B73]">
                <span>
                  Child: {item.childCount} x{" "}
                  {item.trip.childPrice === 0
                    ? "Free"
                    : formatPrice(item.trip.childPrice, item.trip.currencyName)}
                </span>
                <span className="font-semibold text-[#343B55]">
                  {item.trip.childPrice === 0
                    ? "Free"
                    : formatPrice(item.childCount * item.trip.childPrice, item.trip.currencyName)}
                </span>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Extra Services Section */}
      {hasExtraServices && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2 pt-1"
        >
          <h4 className="text-sm font-semibold text-[#343B55]">Extra Services</h4>

          {items.map((item) => (
            <div key={`extra-${item.id}`} className="flex flex-col gap-1 text-xs sm:text-sm">
              {item.extraServices?.healthInsurance && (
                <div className="flex items-center justify-between text-[#5B6B73]">
                  <span>Health insurance</span>
                  <span className="font-semibold text-[#343B55]">$30</span>
                </div>
              )}
              {item.extraServices?.medicalInsurance && (
                <div className="flex items-center justify-between text-[#5B6B73]">
                  <span>Medical insurance</span>
                  <span className="font-semibold text-[#343B55]">$50</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Divider */}
      <div className="h-px w-full bg-[#EDE7DC]" />

      {/* Total Box matching cart.png */}
      <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4 sm:p-5">
        <span className="font-serif text-lg sm:text-xl font-bold text-[#343B55]">
          {t("total")}
        </span>
        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#765438]">
          {items.some(
            (item) =>
              (item.trip.adultPrice === 0 && item.adultCount > 0) ||
              (item.trip.childPrice === 0 && item.childCount > 0)
          )
            ? total > 0
              ? `${formatPrice(total, currencyName)}`
              : "Free"
            : formatPrice(total, currencyName)}
        </span>
      </div>

      {/* Checkout Button (shown in summary if not hidden) */}
      {!hideCheckoutButton && (
        <div className="pt-2">
          <Link
            href={`/${locale}/checkout`}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-[#343B55] py-4 text-center font-semibold text-white transition-all hover:bg-[#262c40] active:scale-[0.99] shadow-md"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      )}
    </div>
  );
}
