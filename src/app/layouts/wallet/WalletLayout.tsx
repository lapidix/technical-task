"use client";

import { ToastProvider } from "@/app/providers/toast-provider";
import { useRequireWallet } from "@/shared/hooks";
import { Spinner } from "@/shared/ui/spinner";
import { ToastContainer } from "@/shared/ui/toast";
import { ReactNode } from "react";

interface WalletLayoutProps {
  children: ReactNode;
}

export function WalletLayout({ children }: WalletLayoutProps) {
  const { isConnected, isLoading } = useRequireWallet();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isConnected) {
    return null;
  }

  return (
    <ToastProvider>
      {children}
      <ToastContainer />
    </ToastProvider>
  );
}
