"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

import { useCartStore } from "@/src/store/use-cart-store";
import { CartItemCard } from "@/src/features/cart/components/cart-item-card";
import { CartSummary } from "@/src/features/cart/components/cart-summary";
import type { AppLocale } from "@/src/i18n/locales";

// Header animations
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Cart items list
const cartListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cartItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const subscribeToCartHydration = (onStoreChange: () => void) =>
  useCartStore.persist.onFinishHydration(onStoreChange);

const getCartHydrationSnapshot = () => useCartStore.persist.hasHydrated();

const getServerCartHydrationSnapshot = () => false;

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const isCartHydrated = useSyncExternalStore(
    subscribeToCartHydration,
    getCartHydrationSnapshot,
    getServerCartHydrationSnapshot,
  );
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage");

  // Show spinner while hydrating
  if (!isCartHydrated) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center bg-[#FAF7F2]"
        role="status"
        aria-label={t("loading.label")}
      >
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#343B55] border-t-transparent" />
      </div>
    );
  }

  // Handle empty cart
  if (items.length === 0) {
    return (
      <section className="bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#343B55] mb-3">
            {t("empty.title")}
          </h2>
          <p className="text-sm sm:text-base text-[#5B6B73] mb-8 leading-relaxed max-w-md">
            {t("empty.description")}
          </p>
          <Link
            href={`/${locale}/trips`}
            className="inline-flex items-center gap-2 rounded-full bg-[#343B55] px-10 py-3.5 font-semibold text-white transition-all hover:bg-[#262c40] shadow-md"
          >
            <span>{t("empty.button")}</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching cart.png */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#5B6B73]"
        >
          <Link
            href={`/${locale}`}
            className="hover:text-[#343B55] transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={13} className="text-[#8C9BA5]" />
          <span className="font-semibold text-[#343B55]">Cart</span>
        </nav>

        {/* Page Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="mb-8 sm:mb-10 flex flex-col gap-1.5"
        >
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#343B55] tracking-tight">
            {t("header.title")}
          </h1>
          <p className="text-sm sm:text-base text-[#5B6B73]">
            {t("header.description")}
          </p>
        </motion.div>

        {/* Grid: Cart Items (Left) + Booking Summary (Right) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Left Column: Cart Items */}
          <motion.div
            variants={cartListVariants}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col gap-4 sm:gap-5"
          >
            {items.map((item) => (
              <motion.div key={item.id} variants={cartItemVariants}>
                <CartItemCard item={item} onRemove={removeItem} />
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Booking Summary Card */}
          <div className="shrink-0 lg:sticky lg:top-24">
            <CartSummary hideCheckoutButton={true} />
          </div>
        </div>

        {/* Proceed to Checkout Centered Button matching cart.png */}
        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/checkout`}
            className="flex items-center justify-center gap-2.5 rounded-full bg-[#343B55] px-10 sm:px-14 py-4 font-semibold text-white text-base transition-all hover:bg-[#262c40] active:scale-[0.99] shadow-md cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
