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
  const { address, isConnected, isLoading } = useWalletConnection();

  // hydration 중이거나 연결 상태 확인 중에는 스켈레톤 표시
  if (isLoading) {
    return (
      <div className="px-4 py-2 rounded-full bg-white/10 animate-pulse">
        <div className="h-5 w-24" />
      </div>
    );
  }

  // 지갑 연결 안 되어 있으면 Connect 버튼
  if (!isConnected) {
    return <ConnectButton onClick={onOpenModal} />;
  }

  // 지갑 연결되어 있으면 주소 표시 버튼
  return (
    <ConnectedWalletButton
      address={address}
      isLoading={false}
      onClick={onOpenModal}
    />
  );
}
