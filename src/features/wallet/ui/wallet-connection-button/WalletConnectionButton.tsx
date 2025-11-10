"use client";

import { ConnectButton } from "@/entities/wallet/ui";
import { ConnectedWalletButton } from "@/entities/wallet/ui/connected-wallet-button";
import { useWalletConnection } from "@/shared/hooks";
import { ButtonSkeleton } from "@/shared/ui/skeleton";

interface WalletConnectionButtonProps {
  onOpenModal: () => void;
}

export function WalletConnectionButton({
  onOpenModal,
}: WalletConnectionButtonProps) {
  const { address, isLoading, isConnected } = useWalletConnection();

  // Show skeleton while checking wallet connection
  if (isLoading) {
    return <ButtonSkeleton width="120px" />;
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
