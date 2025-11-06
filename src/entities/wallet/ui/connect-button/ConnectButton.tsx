import { tcm } from "@/shared/libs";
import { ConnectIcon } from "@/shared/ui/icons/common";
import { HTMLAttributes } from "react";

export const ConnectButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={tcm(
        "w-44 px-4 bg-blue-600 hover:bg-blue-700 font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25",
        className
      )}
      {...props}>
      <span className="flex items-center gap-2">
        <ConnectIcon />
        Connect
      </span>
    </button>
  );
};
