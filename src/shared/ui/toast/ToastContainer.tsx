"use client";

import { useToast } from "../../hooks/useToast";
import { Toast } from "./Toast";

export const ToastContainer = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col items-end">
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
