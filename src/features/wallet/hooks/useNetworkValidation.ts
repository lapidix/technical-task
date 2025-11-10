"use client";

import type { Config } from "@/shared/config/wagmi.config";
import { useEffect, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export function useNetworkValidation(requiredChain: Config["chains"][number]) {
  const { chainId, isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const [showModal, setShowModal] = useState(false);

  const isWrongNetwork =
    isConnected && chainId !== undefined && chainId !== requiredChain.id;

  useEffect(() => {
    setShowModal(isWrongNetwork);
  }, [isWrongNetwork]);

  const handleSwitchNetwork = () => {
    switchChain(
      { chainId: requiredChain.id },
      {
        onSuccess: () => {
          setShowModal(false);
        },
      }
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    currentChainId: chainId,
    requiredChain,
    isWrongNetwork,
    isSwitching: isPending,
    handleSwitchNetwork,
    handleCloseModal,
  };
}
