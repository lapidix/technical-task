"use client";
import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { SupportedVaultId } from "@/entities/vault/types";
import { ApiErrorFallback, ErrorBoundary } from "@/shared/ui/error-boundary";
import { VaultHeader } from "@/widget/vault/header";
import { VaultContainerSkeleton } from "@/widget/vault/vault-container";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const VaultContainer = dynamic(
  () =>
    import("@/widget/vault/vault-container").then((mod) => ({
      default: mod.VaultContainer,
    })),
  {
    loading: () => <VaultContainerSkeleton />,
    ssr: true,
  }
);

const VaultHeaderSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 bg-black text-white flex items-center justify-between px-4 py-2">
      <div className="w-7 h-7 bg-white/10 rounded animate-pulse" />
      <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
    </header>
  );
};

const VaultPageContentSkeleton = () => {
  return (
    <>
      <VaultHeaderSkeleton />
      <main className="flex-1 flex flex-col w-full">
        <VaultContainerSkeleton />
      </main>
    </>
  );
};

const VaultPageContent = ({ token }: { token: SupportedVaultId }) => {
  const vault = SUPPORTED_VAULTS.find((v) => v.id === token);

  return (
    <>
      <VaultHeader currentVaultId={token} />
      <main className="flex-1 flex flex-col w-full">
        {vault && <VaultContainer vault={vault} />}
      </main>
    </>
  );
};

export const VaultPage = ({ token }: { token: SupportedVaultId }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col w-full">
        <ErrorBoundary
          fallback={(error, reset) => (
            <ApiErrorFallback error={error} reset={reset} />
          )}>
          <Suspense fallback={<VaultPageContentSkeleton />}>
            <VaultPageContent token={token} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
