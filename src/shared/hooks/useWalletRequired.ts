import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWalletConnection } from "./useWalletConnection";

export function useRequireWallet() {
  const router = useRouter();
  const { isConnected, isLoading } = useWalletConnection();

  useEffect(() => {
    if (!isLoading && !isConnected) {
      router.push("/");
    }
  }, [isConnected, isLoading, router]);

  return { isConnected, isLoading };
}
