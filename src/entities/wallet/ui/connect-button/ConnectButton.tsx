import { tcm } from "@/shared/libs";
import { HTMLAttributes } from "react";

export const ConnectButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={tcm(
        "min-w-32 px-4 py-1.5 flex items-center justify-center gap-2 rounded-2xl bg-[#D2EC6F] text-black font-medium transition-all duration-200 hover:bg-[#C5DF5F] hover:scale-[1.01]",
        className
      )}
      {...props}>
      {/* <ConnectIcon className="w-4 h-4" /> */}
      <span className="text-sm">Connect Wallet</span>
    </button>
  );
};
