import { useToastStore } from "../store";

export const useToast = () => {
  const { showToast, hideToast } = useToastStore();
  return { showToast, hideToast };
};

export const createRetryAction = (onRetry: () => void) => ({
  label: "🔄 Retry",
  onClick: onRetry,
});

export const createToastAction = (label: string, onClick: () => void) => ({
  label,
  onClick,
});
