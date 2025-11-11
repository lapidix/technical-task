"use client";
import { useWalletConnection } from "@/shared/hooks";
import { ApiErrorFallback, ErrorBoundary } from "@/shared/ui/error-boundary";
import { Header } from "@/widget/header";
import { BottomNavigation } from "@/widget/navigation/bottom-navigation";
import { VaultList, VaultListSkeleton } from "@/widget/vault/vault-list";
import {
  VaultOverview,
  VaultOverviewSkeleton,
} from "@/widget/vault/vault-overview";
import { Suspense } from "react";

const MainPageContentSkeleton = () => {
  return (
    <>
      <VaultOverviewSkeleton />
      <div className="flex-1 flex flex-col space-y-4 mt-10">
        <div className="flex items-center">
          <h2 className="text-xl font-medium text-gray-50">All Vaults</h2>
        </div>
        <div className="flex-1">
          <VaultListSkeleton />
        </div>
      </div>
    </>
  );
};

const MainPageContent = () => {
  const { mounted } = useWalletConnection();

  if (!mounted) {
    return <MainPageContentSkeleton />;
  }
  return (
    <>
      <VaultOverview />
      <div className="flex-1 flex flex-col space-y-4 mt-10">
        <div className="flex items-center">
          <h2 className="text-xl font-medium text-gray-50">All Vaults</h2>
        </div>
        <div className="flex-1">
          <VaultList />
        </div>
      </div>
    </>
  );
};

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <main className="max-w-7xl mx-auto flex-1 flex flex-col w-full">
        <Header />
        <div className="flex flex-col px-4">
          <ErrorBoundary
            fallback={(error, reset) => (
              <ApiErrorFallback error={error} reset={reset} />
            )}>
            <Suspense fallback={<MainPageContentSkeleton />}>
              <MainPageContent />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};
