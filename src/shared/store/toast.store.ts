import { ToastType } from "@/shared/types";
import { create } from "zustand";

export interface ToastAction {
  label: string;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: ToastAction;
}

interface ToastOptions {
  duration?: number;
  action?: ToastAction;
}

interface ToastStore {
  //
  toasts: ToastMessage[];

  showToast: (
    message: string,
    type?: ToastType,
    options?: ToastOptions
  ) => void;
  hideToast: (id: string) => void;
  clearAll: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (message, type = "INFO", options) => {
    const id = `${Date.now()}-${crypto.randomUUID()}`;

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
