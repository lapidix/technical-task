"use client";
import { useWalletConnection } from "@/shared/hooks";
import { Suspense } from "react";
import { VaultOverviewContent } from "./VaultOverviewContent";
import { VaultOverviewSkeleton } from "./VaultOverviewSkeleton";

export const VaultOverview = () => {
  const { address, mounted } = useWalletConnection();
  if (!mounted) {
    return <VaultOverviewSkeleton />;
  }

  return (
    <Suspense fallback={<VaultOverviewSkeleton />}>
      <VaultOverviewContent address={address} />
    </Suspense>
  );
};
