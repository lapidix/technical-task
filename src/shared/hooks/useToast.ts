import { useToastStore } from "../store";

export const useToast = () => {
  const { showToast, hideToast } = useToastStore();
  return { showToast, hideToast };
};

export const createToastAction = (
  label: string | React.ReactNode,
  onClick: () => void
) => ({
  label,
  onClick,
});
