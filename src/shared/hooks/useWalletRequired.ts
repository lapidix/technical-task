import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWalletConnection } from "./useWalletConnection";

export function useRequireWallet() {
  const router = useRouter();
  const { isConnected, isLoading, status, mounted } = useWalletConnection();
  const hasRedirected = useRef(false);
  const renderCount = useRef(0);
  const hasSeenConnected = useRef(false);

  renderCount.current++;

  useEffect(() => {
    if (isConnected || status === "connected") {
      hasSeenConnected.current = true;
    }

    if (hasRedirected.current) return;

    if (!mounted || isLoading) return;

    if (status === "connecting" || status === "reconnecting") return;

    if (
      status === "disconnected" &&
      !isConnected &&
      !hasSeenConnected.current
    ) {
      const timeoutId = setTimeout(() => {
        if (!hasSeenConnected.current && !hasRedirected.current) {
          hasRedirected.current = true;
          router.push("/");
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }

    if (status === "disconnected" && !isConnected && hasSeenConnected.current) {
      hasRedirected.current = true;
      router.push("/");
    }
  }, [mounted, isLoading, isConnected, status, router]);

  return { isConnected, isLoading };
}
