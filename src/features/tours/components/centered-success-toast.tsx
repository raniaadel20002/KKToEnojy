"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/src/store/use-toast-store";

export function CenteredSuccessToast() {
  const { isOpen, hideToast } = useToastStore();
  const t = useTranslations("Tours");

  // Auto-dismiss after 3.5 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [isOpen, hideToast]);

  // Dismiss on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hideToast();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
            className="fixed inset-0 bg-black/40 backdrop-blur-[3px]"
          />

          {/* Dialog Card matching Confirmation.png */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-[440px] rounded-[28px] bg-white px-8 py-10 shadow-2xl border border-[#EDE7DC]/80 flex flex-col items-center text-center"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={hideToast}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#111827] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={22} strokeWidth={2.2} />
            </button>

            {/* Success SVG Icon */}
            <div className="mt-2 flex items-center justify-center">
              <Image
                src="/Success.svg"
                alt="Success"
                width={100}
                height={104}
                priority
                className="h-[100px] w-[100px] object-contain drop-shadow-sm select-none pointer-events-none"
              />
            </div>

            {/* Heading */}
            <h3 className="font-serif text-2xl font-bold text-[#0E4A68] mt-6 tracking-tight">
              {t("tripSuccessfullyBooked") || "Trip Successfully Booked"}
            </h3>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
