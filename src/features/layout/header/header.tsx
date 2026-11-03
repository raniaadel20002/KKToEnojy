"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { navItems } from "@/src/features/layout/constants/navigation";
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

function HeroCartIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className} aria-hidden="true">
      <path
        d="M21.25 22.5C19.8625 22.5 18.75 23.6125 18.75 25C18.75 25.663 19.0134 26.2989 19.4822 26.7678C19.9511 27.2366 20.587 27.5 21.25 27.5C21.913 27.5 22.5489 27.2366 23.0178 26.7678C23.4866 26.2989 23.75 25.663 23.75 25C23.75 24.337 23.4866 23.7011 23.0178 23.2322C22.5489 22.7634 21.913 22.5 21.25 22.5ZM1.25 2.5V5H3.75L8.25 14.4875L6.55 17.55C6.3625 17.9 6.25 18.3125 6.25 18.75C6.25 19.413 6.51339 20.0489 6.98223 20.5178C7.45107 20.9866 8.08696 21.25 8.75 21.25H23.75V18.75H9.275C9.19212 18.75 9.11263 18.7171 9.05403 18.6585C8.99542 18.5999 8.9625 18.5204 8.9625 18.4375C8.9625 18.375 8.975 18.325 9 18.2875L10.125 16.25H19.4375C20.375 16.25 21.2 15.725 21.625 14.9625L26.1 6.875C26.1875 6.675 26.25 6.4625 26.25 6.25C26.25 5.91848 26.1183 5.60054 25.8839 5.36612C25.6495 5.1317 25.3315 5 25 5H6.5125L5.3375 2.5M8.75 22.5C7.3625 22.5 6.25 23.6125 6.25 25C6.25 25.663 6.51339 26.2989 6.98223 26.7678C7.45107 27.2366 8.08696 27.5 8.75 27.5C9.41304 27.5 10.0489 27.2366 10.5178 26.7678C10.9866 26.2989 11.25 25.663 11.25 25C11.25 24.337 10.9866 23.7011 10.5178 23.2322C10.0489 22.7634 9.41304 22.5 8.75 22.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Detect scroll to apply sticky glassmorphism / shadow
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 15);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    const query = typeof window !== "undefined" ? window.location.search : "";
    router.push(`/${nextLocale}${pathWithoutLocale}${query}`);
    setLangDropdownOpen(false);
  }

  function getLanguageName(targetLocale: AppLocale) {
    return localeT(LANGUAGE_INFO[targetLocale].labelKey);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#343B55]/10"
          : "bg-[#FAF7F2] border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1360px] items-center justify-between px-4 sm:px-8 lg:px-10 transition-all duration-300 ${
          isScrolled
            ? "h-[62px] sm:h-[74px] lg:h-[82px]"
            : "h-[68px] sm:h-[84px] lg:h-[96px]"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href={getLocalizedHref("/")}
          className="flex shrink-0 items-center transition-transform hover:scale-105"
          aria-label={headerT("logoHome")}
        >
          <Image
            src="/Hero/logo.png"
            alt="KKTOENJOY Tours & Travel"
            width={86}
            height={86}
            priority
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled
                ? "h-[50px] sm:h-[68px] lg:h-[78px]"
                : "h-[56px] sm:h-[76px] lg:h-[88px]"
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-7 lg:gap-8 lg:flex font-[family-name:var(--font-dm-sans)]"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = isActiveHref(item.href);

            if (item.hasMenu) {
              // Destinations dropdown
              return (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={handleDestinationsClick}
                    className={`group relative flex items-center gap-1.5 py-2 text-[15px] lg:text-[16px] font-medium transition-colors ${
                      isActive || destDropdownOpen
                        ? "text-[#765438]"
                        : "text-[#343B55] hover:text-[#765438]"
                    }`}
                  >
                    <span>{navT(item.labelKey)}</span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${
                        destDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute -bottom-[4px] left-0 h-[2px] w-full bg-[#765438]"
                      />
                    )}
                  </button>

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {destDropdownOpen && destinations && destinations.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-[#343B55]/10 bg-[#FAF7F2] shadow-xl p-2 z-50"
                      >
                        <Link
                          href={getLocalizedHref("/Destinations")}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#765438] transition-colors hover:bg-black/5"
                          onClick={() => setDestDropdownOpen(false)}
                        >
                          {navT("allDestinations")} -&gt;
                        </Link>
                        <div className="my-1 h-px bg-[#343B55]/10" />
                        {destinations.map((dest) => (
                          <Link
                            key={dest.id}
                            href={getLocalizedHref(
                              `/trips?destinationId=${dest.id}`,
                            )}
                            onClick={() => setDestDropdownOpen(false)}
                            className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#343B55] transition-colors hover:bg-black/5 hover:text-[#765438]"
                          >
                            <span>{dest.name.trim()}</span>
                          </Link>
                        ))}
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
                className={`group relative flex items-center py-2 text-[15px] lg:text-[16px] font-medium transition-colors ${
                  isActive
                    ? "text-[#765438]"
                    : "text-[#343B55] hover:text-[#765438]"
                }`}
              >
                <span>{navT(item.labelKey)}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute -bottom-[4px] left-0 h-[2px] w-full bg-[#765438]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher, Cart & Mobile Menu */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3.5 font-[family-name:var(--font-dm-sans)]">
          {/* Language Selector Pill */}
          <div className="relative" ref={langDropdownRef}>
            <button
              className="flex h-8 sm:h-9 lg:h-10 items-center gap-1.5 sm:gap-2 rounded-[12px] sm:rounded-[9.35px] border border-[#343B55BF]bg-transparent px-2.5 sm:px-3 text-[#343B55] transition-colors hover:border-[#343B55]/60 hover:text-[#765438]"
              type="button"
              aria-expanded={langDropdownOpen}
              aria-label={localeT("label")}
              onClick={() => setLangDropdownOpen((prev) => !prev)}
            >
              <img
                src={LANGUAGE_INFO[locale].flagUrl}
                alt={getLanguageName(locale)}
                className="hidden sm:inline-block w-4 sm:w-5 h-3 sm:h-3.5 shrink-0 rounded-[2px] shadow-2xs object-cover"
              />
              <span className="text-xs sm:text-sm font-medium">
                {getLanguageName(locale)}
              </span>
              <ChevronDown
                size={13}
                strokeWidth={2}
                className={`transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-2xl border border-[#343B55]/10 bg-[#FAF7F2] shadow-xl p-1.5 z-50"
                >
                  <div className="flex flex-col">
                    {locales.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => handleLanguageSelect(l)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                          locale === l
                            ? "font-semibold text-[#765438] bg-black/5"
                            : "text-[#343B55] hover:bg-black/5 hover:text-[#765438]"
                        }`}
                      >
                        <img
                          src={LANGUAGE_INFO[l].flagUrl}
                          alt={getLanguageName(l)}
                          className="w-4 h-3 shrink-0 rounded-[2px] shadow-2xs object-cover"
                        />
                        <span className="font-medium">{getLanguageName(l)}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Icon Button (circle with border matching herores.png) */}
          <Link
            href={getLocalizedHref("/cart")}
            className="relative flex size-8 sm:size-9 lg:size-10 items-center justify-center rounded-full border border-[#343B55]/20 bg-white sm:border-0 sm:bg-transparent text-[#343B55] hover:text-[#765438] transition-colors"
            aria-label={headerT("openCart")}
          >
            <HeroCartIcon className="size-[19px] sm:size-6 text-current" />
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#765438] text-[10px] font-bold text-white shadow-xs"
                >
                  {cartItemsCount}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile hamburger button (dark circle matching herores.png) */}
          <button
            className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-[#343B55] text-white shadow-2xs hover:bg-[#272c40] transition-colors lg:hidden"
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
                {isOpen ? <X size={18} /> : <Menu size={18} strokeWidth={2.2} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#343B55]/10 bg-[#FAF7F2] lg:hidden font-[family-name:var(--font-dm-sans)]"
            aria-label="Mobile primary"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mx-auto flex max-w-[1360px] flex-col gap-1 px-5 pb-5 pt-3"
            >
              {navItems.map((item) => {
                const isActive = isActiveHref(item.href);

                if (item.hasMenu) {
                  return (
                    <motion.div variants={itemVariants} key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobileDestOpen((v) => !v)}
                        className={`flex min-h-11 w-full items-center justify-between text-base font-medium transition-colors ${
                          isActive
                            ? "font-semibold text-[#765438]"
                            : "text-[#343B55]"
                        }`}
                      >
                        <span>{navT(item.labelKey)}</span>
                        <ChevronDown
                          size={16}
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
                            <div className="pt-1">
                              <Link
                                href={getLocalizedHref("/Destinations")}
                                onClick={() => setIsOpen(false)}
                                className="flex min-h-10 items-center text-sm font-semibold text-[#765438]"
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
                                  className="flex min-h-9 items-center text-sm text-[#343B55] hover:text-[#765438]"
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
                      className={`flex min-h-11 items-center justify-between text-base font-medium transition-colors ${
                        isActive
                          ? "font-semibold text-[#765438]"
                          : "text-[#343B55] hover:text-[#765438]"
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
