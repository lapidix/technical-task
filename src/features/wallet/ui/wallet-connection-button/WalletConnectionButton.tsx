"use client";

import { ConnectButton } from "@/entities/wallet/ui/connect-button/ConnectButton";
import { ConnectedWalletButton } from "@/entities/wallet/ui/connected-wallet-button/ConnectedWalletButton";
import { useWalletConnection } from "@/shared/hooks";
import { ButtonSkeleton } from "@/shared/ui/skeleton";

interface WalletConnectionButtonProps {
  onOpenModal: () => void;
}

export function WalletConnectionButton({
  onOpenModal,
}: WalletConnectionButtonProps) {
  const { address, isLoading } = useWalletConnection();

  const baseClass =
    "inline-flex items-center justify-center h-10 rounded-lg transition-all duration-200";

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          !isLoading ? "opacity-100" : "opacity-0"
        }`}>
        {address ? (
          <ConnectedWalletButton
            address={address}
            onClick={onOpenModal}
            className={baseClass}
          />
        ) : (
          <ConnectButton onClick={onOpenModal} className={baseClass} />
        )}
      </div>

      {/* 스켈레톤 UI - 위에 겹쳐서 표시 */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-300 ease-in-out ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <ButtonSkeleton width={"180px"} />
      </div>
    </div>
  );
}
