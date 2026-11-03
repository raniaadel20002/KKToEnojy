"use client";

import { useEffect } from "react";
import { Check, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/src/store/use-toast-store";
import type { AppLocale } from "@/src/i18n/locales";

export function CenteredSuccessToast() {
  const { isOpen, tripName, hideToast } = useToastStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Tours");

  // Auto-dismiss after 3.5 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [isOpen, hideToast]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={hideToast}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-[380px] rounded-[24px] bg-white p-6 shadow-2xl border border-[#EDE7DC] flex flex-col items-center text-center"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={hideToast}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Success Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#198399]/10 text-[#198399] mb-3 mt-1">
              <Check className="h-7 w-7 stroke-[2.5]" />
            </div>

            {/* Heading */}
            <h3 className="font-serif text-xl font-bold text-[#343B55]">
              {t("addedToCart")}
            </h3>

            {/* Description */}
            <p className="mt-1.5 text-sm text-[#5B6B73] line-clamp-2 px-2">
              <span className="font-semibold text-[#343B55]">&quot;{tripName}&quot;</span>{" "}
              {t("addedSuccess")}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 w-full">
              <Link
                href={`/${locale}/cart`}
                onClick={hideToast}
                className="flex items-center justify-center gap-2 h-11 w-full rounded-[30px] bg-[#343B55] font-semibold text-white text-sm transition-colors hover:bg-[#262c40] cursor-pointer shadow-sm"
              >
                <ShoppingBag size={16} />
                <span>{t("viewCart")}</span>
              </Link>

              <button
                type="button"
                onClick={hideToast}
                className="text-xs font-medium text-[#5B6B73] hover:text-[#343B55] transition-colors py-1 cursor-pointer"
              >
                {t("continueBrowsing")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

