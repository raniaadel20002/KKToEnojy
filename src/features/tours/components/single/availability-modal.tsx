"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { X, Info, CalendarDays, ChevronDown, ShoppingCart, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Trip } from "@/src/features/tours/types/trip";
import { useCartStore } from "@/src/store/use-cart-store";
import { useToastStore } from "@/src/store/use-toast-store";
import type { AppLocale } from "@/src/i18n/locales";
import { AvailabilityDatePicker } from "./availability-date-picker";
import { QuantitySelector } from "./quantity-selector";
import { BookingSummary } from "./booking-summary";

interface AvailabilityModalProps {
  trip: Trip;
  isOpen: boolean;
  onClose: () => void;
}

export function AvailabilityModal({
  trip,
  isOpen,
  onClose,
}: AvailabilityModalProps) {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);
  const [healthInsurance, setHealthInsurance] = useState(true);
  const [medicalInsurance, setMedicalInsurance] = useState(false);

  // Initialize or reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null);
      setIsCalendarOpen(false);
      setAdultCount(2);
      setChildCount(trip.childPrice > 0 ? 1 : 0);
      setHealthInsurance(true);
      setMedicalInsurance(false);
    }
  }, [isOpen, trip.childPrice]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    if (!selectedDate) {
      setIsCalendarOpen(true);
      return;
    }
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    addItem({
      id: `${trip.id}-${dateStr}`,
      trip,
      date: dateStr,
      adultCount,
      childCount,
      extraServices: {
        healthInsurance,
        medicalInsurance,
      },
    });

    onClose();
    showToast(trip.name);
  };

  const handleProceedToCheckout = () => {
    if (!selectedDate) {
      setIsCalendarOpen(true);
      return;
    }
    handleAddToCart();
    router.push(`/${locale}/cart`);
  };

  const formattedDisplayDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      })
    : "Please select a date";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        className="relative w-full max-w-[960px] max-h-[92vh] overflow-y-auto rounded-[28px] sm:rounded-[32px] bg-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-[#EDE7DC]"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100/90 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Layout: 2 Columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Form & Selections */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Header */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#343B55] tracking-tight">
                Please select a tour date
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5B6B73]">
                {trip.name} · choose your date and group size
              </p>
            </div>

            {/* Date Picker Dropdown Button */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="w-full rounded-2xl border border-[#EDE7DC] bg-white px-4 py-3.5 flex items-center justify-between text-sm transition-all hover:border-[#198399] cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-2.5 text-[#343B55] font-medium">
                  <CalendarDays size={18} className="text-[#198399]" />
                  <span>{formattedDisplayDate}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-[#7A8B94] transition-transform duration-200 ${
                    isCalendarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Inline Calendar Collapsible */}
              <AnimatePresence>
                {isCalendarOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden rounded-2xl border border-[#EDE7DC] bg-[#FAF7F2] p-4 shadow-inner"
                  >
                    <AvailabilityDatePicker
                      availableDays={trip.availableDays}
                      selectedDate={selectedDate}
                      onDateSelect={(date) => {
                        setSelectedDate(date);
                        setIsCalendarOpen(false);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quantity Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#343B55]">
                  Quantity
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#198399]">
                  <Info size={14} />
                  <span>(Min: 1)</span>
                </div>
              </div>
              <p className="text-xs text-[#7A8B94]">
                You can select up to 50 for this package
              </p>

              {/* Adult Stepper */}
              <QuantitySelector
                label="Adult"
                unitPrice={trip.adultPrice}
                currency={trip.currencyName}
                count={adultCount}
                min={1}
                max={50}
                onIncrement={() => setAdultCount((prev) => Math.min(50, prev + 1))}
                onDecrement={() => setAdultCount((prev) => Math.max(1, prev - 1))}
              />

              {/* Children Stepper */}
              {trip.childPrice > 0 && (
                <QuantitySelector
                  label="Children"
                  sublabel="3–11 years"
                  unitPrice={trip.childPrice}
                  currency={trip.currencyName}
                  count={childCount}
                  min={0}
                  max={50}
                  onIncrement={() => setChildCount((prev) => Math.min(50, prev + 1))}
                  onDecrement={() => setChildCount((prev) => Math.max(0, prev - 1))}
                />
              )}
            </div>

            {/* Extra Services Section */}
            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#343B55]">
                Extra Services
              </h3>
              <p className="text-xs text-[#7A8B94]">
                Add extra services on your reservation
              </p>

              <div className="flex flex-col gap-3 mt-1">
                {/* Health Insurance */}
                <label
                  onClick={() => setHealthInsurance(!healthInsurance)}
                  className="flex items-center gap-3 cursor-pointer select-none group"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-[5px] transition-colors ${
                      healthInsurance
                        ? "bg-[#343B55] text-white"
                        : "border-2 border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {healthInsurance && <Check size={13} strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-medium text-[#343B55]">
                    Health Insurance
                  </span>
                  <span className="text-sm font-semibold text-[#765438]">
                    ($30)
                  </span>
                </label>

                {/* Medical Insurance */}
                <label
                  onClick={() => setMedicalInsurance(!medicalInsurance)}
                  className="flex items-center gap-3 cursor-pointer select-none group"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-[5px] transition-colors ${
                      medicalInsurance
                        ? "bg-[#343B55] text-white"
                        : "border-2 border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {medicalInsurance && <Check size={13} strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-medium text-[#343B55]">
                    Medical Insurance
                  </span>
                  <span className="text-sm font-semibold text-[#765438]">
                    ($50)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Summary & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <BookingSummary
              trip={trip}
              selectedDate={selectedDate}
              adultCount={adultCount}
              childCount={childCount}
              extraServices={{
                healthInsurance,
                medicalInsurance,
              }}
              onResetDate={() => {
                setSelectedDate(null);
                setIsCalendarOpen(true);
              }}
            />

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-full border border-[#343B55] bg-white py-3.5 text-center font-semibold text-sm text-[#343B55] transition-all hover:bg-[#FAF7F2] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingCart size={17} />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full rounded-full bg-[#343B55] py-3.5 text-center font-semibold text-sm text-white transition-all hover:bg-[#262c40] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to check out</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
