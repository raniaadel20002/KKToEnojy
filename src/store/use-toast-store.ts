import { create } from "zustand";

interface ToastState {
  isOpen: boolean;
  tripName: string;
  showToast: (tripName: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false,
  tripName: "",
  showToast: (tripName: string) => {
    set({ isOpen: true, tripName });
  },
  hideToast: () => {
    set({ isOpen: false, tripName: "" });
  },
}));

