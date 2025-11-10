"use client";

import { ToastContext, ToastMessage } from "@/shared/contexts/toast";
import { ReactNode, useCallback, useState } from "react";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (
      message: string,
      type: ToastMessage["type"] = "INFO",
      options?: {
        duration?: number;
        action?: {
          label: string;
          onClick: () => void;
        };
      }
    ) => {
      const id = Date.now().toString();
      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          type,
          duration: options?.duration,
          action: options?.action,
        },
      ]);
    },
    []
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
