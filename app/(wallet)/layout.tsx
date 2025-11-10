"use client";

import { useRequireWallet } from "@/shared/hooks";
import { Spinner } from "@/shared/ui/spinner";
import { ReactNode } from "react";

interface WalletLayoutProps {
  children: ReactNode;
}

/**
 * Layout for routes that require wallet connection.
 * Automatically redirects to home page if wallet is not connected.
 */
export default function WalletLayout({ children }: WalletLayoutProps) {
  const { isConnected, isLoading } = useRequireWallet();

  // Show loading while checking wallet connection
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // If not connected, hook will redirect to home
  if (!isConnected) {
    return null;
  }

  return <>{children}</>;
}
