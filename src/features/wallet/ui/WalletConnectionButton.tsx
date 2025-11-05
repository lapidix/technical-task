"use client";

import { ConnectButton } from "@/entities/wallet/ui/ConnectButton";
import { ConnectedWalletButton } from "@/entities/wallet/ui/ConnectedWalletButton";
import { useWalletConnection } from "@/shared/hooks";
import { ButtonSkeleton } from "@/shared/ui/skeleton";

interface WalletConnectionButtonProps {
  onOpenModal: () => void;
}

export function WalletConnectionButton({
  onOpenModal,
}: WalletConnectionButtonProps) {
  const { address, isLoading } = useWalletConnection();

  // 공통 컨테이너 스타일: 높이 고정
  const baseClass =
    "inline-flex items-center justify-center h-10 rounded-lg transition-all duration-200";

  return (
    <div className="relative">
      {/* 실제 버튼 - 먼저 렌더링 */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          !isLoading ? "opacity-100" : "opacity-0"
        }`}>
        {address ? (
          // 연결됨 - 지갑 주소 표시
          <ConnectedWalletButton
            address={address}
            onClick={onOpenModal}
            className={baseClass}
          />
        ) : (
          // 연결 안 됨 - Connect 버튼
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
