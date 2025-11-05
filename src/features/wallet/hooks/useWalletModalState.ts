"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useWalletModalState(
  isOpen: boolean,
  onClose: () => void,
  isPending: boolean
) {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [wasConnecting, setWasConnecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 연결 중일 때 상태 추적
  useEffect(() => {
    if (isPending) {
      setWasConnecting(true);
    }
  }, [isPending]);

  // 연결이 완료되면 모달 닫기 (연결 중이었을 때만)
  useEffect(() => {
    if (isConnected && wasConnecting && !isPending) {
      setWasConnecting(false);
      onClose();
    }
  }, [isConnected, wasConnecting, isPending, onClose]);

  return {
    mounted,
    shouldRender: isOpen && mounted,
  };
}
