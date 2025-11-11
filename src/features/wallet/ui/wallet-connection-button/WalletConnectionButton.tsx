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

  // Show skeleton while checking wallet connection
  if (isLoading) {
    return <div className={"w-32 h-8 rounded-lg bg-white/10 animate-pulse"} />;
  }

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
