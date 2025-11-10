import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWalletConnection } from "./useWalletConnection";

export function useRequireWallet() {
  const router = useRouter();
  const { isConnected, isLoading, status, mounted } = useWalletConnection();
  const hasCheckedConnection = useRef(false);

  useEffect(() => {
    if (status === "connecting" || status === "reconnecting" || isConnected) {
      hasCheckedConnection.current = true;
    }

    if (
      mounted &&
      !isLoading &&
      !isConnected &&
      status === "disconnected" &&
      hasCheckedConnection.current
    ) {
      router.push("/");
    }
  }, [mounted, isConnected, isLoading, status, router]);

  return { isConnected, isLoading };
}
