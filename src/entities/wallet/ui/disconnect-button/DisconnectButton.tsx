import { tcm } from "@/shared/libs";
import { useModalStore } from "@/shared/store";
import { HTMLAttributes } from "react";
import { useDisconnect } from "wagmi";

export const DisconnectButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  className,
  children,
  ...props
}) => {
  const { disconnect } = useDisconnect();
  const { closeWalletModal } = useModalStore();

  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    disconnect(undefined, {
      onSuccess: () => {
        closeWalletModal();
        onClick?.(e);
      },
      onError: (error) => {
        console.error("Disconnect error:", error);
        closeWalletModal();
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
