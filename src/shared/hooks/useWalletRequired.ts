import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWalletConnection } from "./useWalletConnection";

const REDIRECT_DELAY = 500; // ms
const HOME_PATH = "/";

export function useRequireWallet() {
  const router = useRouter();
  const { isConnected, isLoading, status, mounted } = useWalletConnection();

  const hasRedirected = useRef(false);
  const hasSeenConnected = useRef(false);

  useEffect(() => {
    // Track if user was ever connected
    if (isConnected || status === "connected") {
      hasSeenConnected.current = true;
    }

    // Early returns for various states
    if (hasRedirected.current) return;
    if (!mounted || isLoading) return;
    if (status === "connecting" || status === "reconnecting") return;

    const isDisconnected = status === "disconnected" && !isConnected;
    if (!isDisconnected) return;

    // Case 1: Never connected - wait before redirecting (might be reconnecting)
    if (!hasSeenConnected.current) {
      const timeoutId = setTimeout(() => {
        if (!hasSeenConnected.current && !hasRedirected.current) {
          hasRedirected.current = true;
          router.push(HOME_PATH);
        }
      }, REDIRECT_DELAY);

      return () => clearTimeout(timeoutId);
    }

    // Case 2: Was connected but now disconnected - redirect immediately
    hasRedirected.current = true;
    router.push(HOME_PATH);
  }, [mounted, isLoading, isConnected, status, router]);

  return { isConnected, isLoading };
}
