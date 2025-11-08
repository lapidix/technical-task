"use client";

import { ConnectButton } from "@/entities/wallet/ui";
import { ConnectedWalletButton } from "@/entities/wallet/ui/connected-wallet-button";
import { useWalletConnection } from "@/shared/hooks";

interface WalletConnectionButtonProps {
  onOpenModal: () => void;
}

export function WalletConnectionButton({
  onOpenModal,
}: WalletConnectionButtonProps) {
  const { address, isLoading, isConnected } = useWalletConnection();

  if (!isConnected) {
    return <ConnectButton onClick={onOpenModal} />;
  }

  return (
    <ConnectedWalletButton
      address={address}
      isLoading={isLoading}
      onClick={onOpenModal}
    />
  );
}
