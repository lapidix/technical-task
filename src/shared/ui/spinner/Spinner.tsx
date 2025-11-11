import { tcm } from "@/shared/libs";

interface SpinnerProps {
  size?: "SM" | "MD" | "LG";
  className?: string;
}

const SIZE_STYLE = {
  SM: "w-4 h-4 border-2",
  MD: "w-8 h-8 border-4",
  LG: "w-12 h-12 border-4",
};

export function Spinner({ size = "MD", className }: SpinnerProps) {
  return (
    <div
      className={tcm(
        "rounded-full border-gray-700 border-t-gray-400 animate-spin",
        SIZE_STYLE[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
