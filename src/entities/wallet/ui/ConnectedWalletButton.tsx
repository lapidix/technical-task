import { tcm } from "@/shared/libs";
import { HTMLAttributes } from "react";

interface ConnectedWalletButtonProps extends HTMLAttributes<HTMLButtonElement> {
  address: string;
}

export const ConnectedWalletButton: React.FC<ConnectedWalletButtonProps> = ({
  address,
  className,
  ...props
}) => {
  return (
    <button
      className={tcm(
        `w-44 gap-2 px-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-200 hover:scale-[1.02]`,
        className
      )}
      {...props}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      </div>
    </button>
  );
};
