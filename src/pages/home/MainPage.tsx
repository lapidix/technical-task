import { Header } from "@/widget/header";
import { VaultList, VaultListSkeleton } from "@/widget/vault/vault-list";
import {
  VaultOverview,
  VaultOverviewSkeleton,
} from "@/widget/vault/vault-overview";
import { Suspense } from "react";

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <Suspense fallback={<VaultOverviewSkeleton />}>
            <VaultOverview />
          </Suspense>
        </div>
        {/* Vault List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Vault</h2>
            <h3 className="text-xl font-semibold text-gray-400">APY</h3>
          </div>

          <Suspense fallback={<VaultListSkeleton />}>
            <VaultList />
          </Suspense>
        </div>
      </main>
    </div>
  );
};
