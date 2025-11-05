import { tcm } from "@/shared/libs";

export function ButtonSkeleton({
  className,
  width = "140px",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={tcm(
        "h-10 rounded-lg",
        "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
        "bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]",
        "border border-gray-800/50",
        "transition-all duration-200",
        className
      )}
      style={{ width }}
    />
  );
}
