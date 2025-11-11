"use client";

import { useNumberPadStore, useToastStore } from "@/shared/store";
import { Toast } from "./Toast";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  const hideToast = useToastStore((state) => state.hideToast);
  const isNumberPadOpen = useNumberPadStore((state) => state.isOpen);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 w-full max-w-4xl px-4 transition-[bottom] duration-300 ease-out"
      style={{
        bottom: isNumberPadOpen ? "240px" : "42px",
      }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
          action={toast.action}
        />
      ))}
    </div>
  );
};
