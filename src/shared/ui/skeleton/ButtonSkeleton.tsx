import { tcm } from "@/shared/libs";

export function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={tcm(
        "w-32 h-8 rounded-lg",
        "bg-white/10 animate-pulse",
        className
      )}
    />
  );
}
