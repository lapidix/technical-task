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

  useEffect(() => {
    if (isPending) {
      setWasConnecting(true);
    }
  }, [isPending]);

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
