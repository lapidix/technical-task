import { ToastType } from "@/shared/types";
import { create } from "zustand";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string | React.ReactNode;
    onClick: () => void;
  };
}

interface ToastOptions {
  duration?: number;
  action?: {
    label: string | React.ReactNode;
    onClick: () => void;
  };
}

interface ToastStore {
  // State
  toasts: ToastMessage[];

  // Actions
  showToast: (
    message: string,
    type?: ToastType,
    options?: ToastOptions
  ) => void;
  hideToast: (id: string) => void;
  clearAll: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  // Initial state
  toasts: [],

  // Actions
  showToast: (message, type = "INFO", options) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const newToast: ToastMessage = {
      id,
      message,
      type,
      duration: options?.duration,
      action: options?.action,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-hide toast after duration (default 5 seconds)
    const duration = options?.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      }, duration);
    }
  },

  hideToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearAll: () => set({ toasts: [] }),
}));
