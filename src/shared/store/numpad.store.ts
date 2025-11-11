import { create } from "zustand";

export const NUMBER_PAD_HEIGHT = 220;

type TargetSection = "deposit" | "withdraw" | null;

interface NumberPadStore {
  isOpen: boolean;
  amount: string;
  maxAmount: number;
  targetForm: TargetSection;
  disabled: boolean;

  // Actions
  open: (targetForm: TargetSection, maxAmount: number) => void;
  close: () => void;
  setAmount: (amount: string) => void;
  addDigit: (digit: string) => void;
  removeDigit: () => void;
  clear: () => void;
  setMaxAmount: (maxAmount: number) => void;
  setDisabled: (disabled: boolean) => void;
}

export const useNumberPadStore = create<NumberPadStore>((set, get) => ({
  // Initial state
  isOpen: false,
  amount: "0",
  maxAmount: 0,
  targetForm: null,
  disabled: false,

  // Actions
  open: (targetForm, maxAmount) =>
    set({
      isOpen: true,
      targetForm,
      maxAmount,
      amount: "0", // Reset amount when opening
    }),

  close: () =>
    set({
      isOpen: false,
      targetForm: null,
    }),

  setAmount: (amount) => {
    const { maxAmount } = get();
    const numAmount = parseFloat(amount);

    // Check if amount exceeds max
    if (maxAmount > 0 && numAmount > maxAmount) {
      set({ amount: maxAmount.toString() });
      return;
    }

    set({ amount });
  },

  addDigit: (digit) => {
    const { amount, maxAmount, disabled } = get();

    if (disabled) return;

    let newAmount: string;

    if (digit === ".") {
      // Don't add decimal point if already exists
      if (amount.includes(".")) return;
      newAmount = amount + digit;
    } else {
      // Replace '0' with digit, otherwise append
      newAmount = amount === "0" ? digit : amount + digit;
    }

    // Check if new amount exceeds max
    const numAmount = parseFloat(newAmount);
    if (maxAmount > 0 && numAmount > maxAmount) {
      return;
    }

    set({ amount: newAmount });
  },

  removeDigit: () => {
    const { amount, disabled } = get();

    if (disabled) return;

    const newAmount = amount.length > 1 ? amount.slice(0, -1) : "0";
    set({ amount: newAmount });
  },

  clear: () => set({ amount: "0" }),

  setMaxAmount: (maxAmount) => set({ maxAmount }),

  setDisabled: (disabled) => set({ disabled }),
}));
