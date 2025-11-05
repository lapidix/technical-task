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
    address,
    status,
    isConnected,
    isLoading,
    mounted,
  };
}
