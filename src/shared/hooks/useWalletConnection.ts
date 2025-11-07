import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useWalletConnection() {
  const { address, status, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading =
    !mounted || status === "connecting" || status === "reconnecting";

  return {
    address, //! 타입이 `0x${string}`로 추론되지 않으므로 개선 필요
    status,
    isConnected,
    isLoading,
    mounted,
  };
}
