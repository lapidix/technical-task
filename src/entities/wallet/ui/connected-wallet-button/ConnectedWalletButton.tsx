import { tcm } from "@/shared/libs";
import { DownArrowIcon } from "@/shared/ui/icons/common";
import { HTMLAttributes } from "react";

interface ConnectedWalletButtonProps extends HTMLAttributes<HTMLButtonElement> {
  address?: string;
  isLoading?: boolean;
}

export const ConnectedWalletButton: React.FC<ConnectedWalletButtonProps> = ({
  address,
  isLoading = false,
  className,
  ...props
}) => {
  return (
    <button
      className={tcm(
        `min-w-32 px-2 py-1.5 flex items-center justify-center rounded-2xl bg-[#ECEFEC1F] transition-all duration-200`,
        !isLoading && "hover:bg-gray-700 hover:scale-[1.01]",
        className
      )}
      disabled={isLoading}
      {...props}>
      {isLoading ? (
        <div className="h-5 w-full bg-white/10 rounded animate-pulse" />
      ) : (
        <>
          <div className="text-sm font-medium text-[#C2C8C2] px-2">
            {address?.slice(0, 5)}...{address?.slice(-3)}
          </div>
          <DownArrowIcon className="w-4 h-4" />
        </>
      )}
    </button>
  );
};
