import { useToastStore } from "../store";

export const useToast = () => {
  const { showToast, hideToast } = useToastStore();
  return { showToast, hideToast };
};

export const createToastAction = (
  label: string,
  onClick: () => void,
  icon?: React.ComponentType<{ className?: string }>
) => ({
  label,
  onClick,
  icon,
});
