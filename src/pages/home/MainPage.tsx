import { Header } from "@/widget/header";
import { BottomNavigation } from "@/widget/navigation/bottom-navigation";
import { VaultList, VaultListSkeleton } from "@/widget/vault/vault-list";
import { VaultOverview } from "@/widget/vault/vault-overview";
import { Suspense } from "react";

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <main className="max-w-7xl mx-auto flex-1 flex flex-col w-full">
        <Header />
        <div className="flex flex-col px-4">
          {/* Overview Section */}
          <VaultOverview />
          {/* Vault List Section */}
          <div className="flex-1 flex flex-col space-y-4 mt-10">
            <div className="flex items-center">
              <h2 className="text-xl font-medium text-gray-50">All Vaults</h2>
            </div>

            <div className="flex-1">
              <Suspense fallback={<VaultListSkeleton />}>
                <VaultList />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};
