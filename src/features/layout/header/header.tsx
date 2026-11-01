"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { navItems } from "@/src/features/layout/constants/navigation";
import { CartIcon } from "@/src/shared/components/icons";
import { useCartStore } from "@/src/store/use-cart-store";
import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import { locales, type AppLocale } from "@/src/i18n/locales";

const LANGUAGE_INFO: Record<
  AppLocale,
  { labelKey: "english" | "french" | "german" | "polish"; flagUrl: string }
> = {
  en: { labelKey: "english", flagUrl: "https://flagcdn.com/gb.svg" },
  fr: { labelKey: "french",  flagUrl: "https://flagcdn.com/fr.svg" },
  de: { labelKey: "german",  flagUrl: "https://flagcdn.com/de.svg" },
  pl: { labelKey: "polish",  flagUrl: "https://flagcdn.com/pl.svg" },
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const headerT = useTranslations("Header");
  const navT = useTranslations("Navigation");
  const localeT = useTranslations("LocaleSwitcher");
  const cartItemsCount = useCartStore((state) => state.items.length);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch real destinations for the dropdown
  const { data: destinations } = useDestinationsQuery(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDestDropdownOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getLocalizedHref(href: string) {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  }

  function getPathWithoutLocale(path: string) {
    return path.replace(/^\/(en|fr|de|pl)(?=\/|$)/, "") || "/";
  }

  function isActiveHref(href: string) {
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    if (href === "/") return pathWithoutLocale === "/";
    return href.startsWith("/") && pathWithoutLocale.startsWith(href);
  }

  function handleDestinationsClick() {
    setDestDropdownOpen((v) => !v);
  }

  function handleLanguageSelect(nextLocale: AppLocale) {
    if (nextLocale === locale) {
      setLangDropdownOpen(false);
      return;
    }
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    const query = window.location.search;
    router.push(`/${nextLocale}${pathWithoutLocale}${query}`);
    setLangDropdownOpen(false);
  }

  function getLanguageName(targetLocale: AppLocale) {
    return localeT(LANGUAGE_INFO[targetLocale].labelKey);
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 border-b border-black/5 bg-white"
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 sm:h-[80px] sm:px-8 lg:h-[92px] lg:px-0">
        <Link
          href={getLocalizedHref("/")}
          className="flex shrink-0 items-center"
          aria-label={headerT("logoHome")}
        >
          <Image
            src="/Logo.png"
            alt="SunnySide Tours"
            width={150}
            height={32}
            priority
            unoptimized
            className="h-auto w-[120px] sm:w-[130px] lg:w-[150px]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = isActiveHref(item.href);

            if (item.hasMenu) {
              // Destinations item with dropdown
              return (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={handleDestinationsClick}
                    className={`group relative flex min-h-12 items-center gap-1.5 text-[20px] font-normal leading-none transition-colors ${
                      isActive || destDropdownOpen
                        ? "text-[var(--color-ocean)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-ocean)]"
                    }`}
                  >
                    <span>{navT(item.labelKey)}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2.2}
                      className={`transition-transform duration-200 ${
                        destDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute -bottom-[13px] left-0 h-[3px] w-full bg-[var(--color-ocean)]"
                      />
                    )}
                  </button>

                  {/* Desktop Dropdown Panel with AnimatePresence */}
                  <AnimatePresence>
                    {destDropdownOpen && destinations && destinations.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                      >
                        <div className="p-2">
                          <Link
                            href={getLocalizedHref("/Destinations")}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#003A5A] transition-colors hover:bg-[#F0F7FF]"
                            onClick={() => setDestDropdownOpen(false)}
                          >
                            {navT("allDestinations")} -&gt;
                          </Link>
                          <div className="my-1 h-px bg-gray-100" />
                          {destinations.map((dest) => (
                            <Link
                              key={dest.id}
                              href={getLocalizedHref(
                                `/trips?destinationId=${dest.id}`,
                              )}
                              onClick={() => setDestDropdownOpen(false)}
                              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#374151] transition-colors hover:bg-[#F0F7FF] hover:text-[#003A5A]"
                            >
                              <span>{dest.name.trim()}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={getLocalizedHref(item.href)}
                className={`group relative flex min-h-12 items-center gap-1.5 text-[20px] font-normal leading-none transition-colors ${
                  isActive
                    ? "text-[var(--color-ocean)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ocean)]"
                }`}
              >
                <span>{navT(item.labelKey)}</span>
                {isActive ? (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute -bottom-[13px] left-0 h-[3px] w-full bg-[var(--color-ocean)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative" ref={langDropdownRef}>
            <button
              className="flex h-9 items-center gap-1 sm:gap-2 rounded-lg bg-white px-2 sm:px-3 text-[var(--color-deep-ocean)] shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5 sm:h-10"
              type="button"
              aria-expanded={langDropdownOpen}
              aria-label={localeT("label")}
              onClick={() => setLangDropdownOpen((prev) => !prev)}
            >
              <img
                src={LANGUAGE_INFO[locale].flagUrl}
                alt={getLanguageName(locale)}
                className="w-6 h-4 shrink-0 rounded-[2px] shadow-sm object-cover"
              />
              <span className="hidden sm:inline text-sm font-bold">
                {getLanguageName(locale)}
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2.2}
                className={`transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-40 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                >
                  <div className="flex flex-col p-2">
                    {locales.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => handleLanguageSelect(l)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[#F0F7FF] ${
                          locale === l
                            ? "font-semibold text-[#003A5A] bg-[#F0F7FF]"
                            : "text-[#374151]"
                        }`}
                      >
                        <img
                          src={LANGUAGE_INFO[l].flagUrl}
                          alt={getLanguageName(l)}
                          className="w-6 h-4 shrink-0 rounded-[2px] shadow-sm object-cover"
                        />
                        <span className="font-medium">{getLanguageName(l)}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href={getLocalizedHref("/cart")}
            className="relative grid size-9 place-items-center rounded-lg bg-white text-[var(--color-deep-ocean)] shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5 sm:size-10"
            aria-label={headerT("openCart")}
          >
            <CartIcon className="size-6 sm:size-7" />
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                >
                  {cartItemsCount}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <button
            className="grid size-9 place-items-center bg-white text-[var(--color-deep-ocean)] sm:size-10 lg:hidden"
            type="button"
            aria-label={isOpen ? headerT("closeMenu") : headerT("openMenu")}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X size={25} /> : <Menu size={25} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
            aria-label="Mobile primary"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mx-auto flex max-w-[1280px] flex-col gap-1 px-5 pb-5 pt-2"
            >
              {navItems.map((item) => {
                const isActive = isActiveHref(item.href);

                if (item.hasMenu) {
                  return (
                    <motion.div variants={itemVariants} key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobileDestOpen((v) => !v)}
                        className={`flex min-h-11 w-full items-center justify-between text-lg transition-colors ${
                          isActive
                            ? "font-semibold text-[var(--color-ocean)]"
                            : "text-[var(--color-muted)]"
                        }`}
                      >
                        <span>{navT(item.labelKey)}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            mobileDestOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileDestOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col gap-1 overflow-hidden pl-4"
                          >
                            <div className="pt-2">
                              <Link
                                href={getLocalizedHref("/Destinations")}
                                onClick={() => setIsOpen(false)}
                                className="flex min-h-10 items-center text-base font-semibold text-[#003A5A]"
                              >
                                {navT("allDestinations")} -&gt;
                              </Link>
                              {destinations?.map((dest) => (
                                <Link
                                  key={dest.id}
                                  href={getLocalizedHref(
                                    `/trips?destinationId=${dest.id}`,
                                  )}
                                  onClick={() => setIsOpen(false)}
                                  className="flex min-h-9 items-center text-base text-[#4B5563] hover:text-[#003A5A]"
                                >
                                  {dest.name.trim()}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div variants={itemVariants} key={item.label}>
                    <Link
                      href={getLocalizedHref(item.href)}
                      onClick={() => setIsOpen(false)}
                      className={`flex min-h-11 items-center justify-between text-lg transition-colors ${
                        isActive
                          ? "font-semibold text-[var(--color-ocean)]"
                          : "text-[var(--color-muted)]"
                      }`}
                    >
                      <span>{navT(item.labelKey)}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
