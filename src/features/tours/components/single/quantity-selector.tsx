"use client";

import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/src/features/tours/utils/format-price";

interface QuantitySelectorProps {
  label: string;
  sublabel?: string;
  unitPrice: number;
  currency: string;
  count: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantitySelector({
  label,
  sublabel,
  unitPrice,
  currency,
  count,
  min = 0,
  max = 50,
  onIncrement,
  onDecrement,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] px-5 py-4 transition-colors">
      {/* Label and Sublabel */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[#343B55]">{label}</span>
        {sublabel && (
          <span className="text-xs text-[#7A8B94]">{sublabel}</span>
        )}
      </div>

      {/* Price + Stepper Controls */}
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="min-w-[60px] text-right text-sm font-bold text-[#343B55]">
          {unitPrice === 0
            ? "Free"
            : formatPrice(unitPrice, currency)}
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDecrement}
            disabled={count <= min}
            aria-label={`Decrease ${label}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#343B55] text-white shadow-sm transition-transform active:scale-95 hover:bg-[#262c40] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
          >
            <Minus size={15} strokeWidth={2.5} />
          </button>

          <span className="w-5 text-center text-sm font-bold text-[#343B55]">
            {count}
          </span>

          <button
            type="button"
            onClick={onIncrement}
            disabled={count >= max}
            aria-label={`Increase ${label}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#343B55] text-white shadow-sm transition-transform active:scale-95 hover:bg-[#262c40] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
