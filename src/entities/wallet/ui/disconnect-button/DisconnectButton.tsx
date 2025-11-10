import { tcm } from "@/shared/libs";
import { HTMLAttributes } from "react";
import { useDisconnect } from "wagmi";

export const DisconnectButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  className,
  children,
  ...props
}) => {
  const { disconnect } = useDisconnect();
  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    disconnect(undefined, {
      onSuccess: () => {
        onClick?.(e);
      },
    });
  };
  return (
    <button
      onClick={handleDisconnect}
      className={tcm(
        "w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold",
        className
      )}
      {...props}>
      {children}
    </button>
  );
};
