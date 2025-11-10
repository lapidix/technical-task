"use client";

import type { Config } from "@/shared/config/wagmi.config";
import { useEffect, useRef, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export function useNetworkValidation(requiredChain: Config["chains"][number]) {
  const { chainId, isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const [showModal, setShowModal] = useState(false);
  const [needsToAddNetwork, setNeedsToAddNetwork] = useState(false);
  const hasAttemptedSwitch = useRef(false);

  const isWrongNetwork =
    isConnected && chainId !== undefined && chainId !== requiredChain.id;

  useEffect(() => {
    if (isWrongNetwork) {
      setShowModal(true);
      // Automatically try to switch once to detect if network exists
      if (!hasAttemptedSwitch.current) {
        hasAttemptedSwitch.current = true;
        handleSwitchNetwork();
      }
    } else {
      setShowModal(false);
      setNeedsToAddNetwork(false);
      hasAttemptedSwitch.current = false;
    }
  }, [isWrongNetwork]);

  const handleSwitchNetwork = () => {
    switchChain(
      { chainId: requiredChain.id },
      {
        onSuccess: () => {
          setShowModal(false);
          setNeedsToAddNetwork(false);
        },
        onError: (error) => {
          // Check if network doesn't exist in wallet
          if (
            error.message.includes("Unknown Network") ||
            error.message.includes("eip155")
          ) {
            setNeedsToAddNetwork(true);
          }
        },
      }
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNeedsToAddNetwork(false);
  };

  return {
    showModal,
    currentChainId: chainId,
    requiredChain,
    isWrongNetwork,
    isSwitching: isPending,
    handleSwitchNetwork,
    handleCloseModal,
    needsToAddNetwork,
  };
}
