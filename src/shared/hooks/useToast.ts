import { useContext } from "react";
import { ToastContext } from "../contexts/toast";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const createRetryAction = (onRetry: () => void) => ({
  label: "🔄 Retry",
  onClick: onRetry,
});

export const createToastAction = (label: string, onClick: () => void) => ({
  label,
  onClick,
});
