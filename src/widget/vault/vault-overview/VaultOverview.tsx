"use client";
import { useWalletConnection } from "@/shared/hooks";
import { VaultOverviewContent } from "./VaultOverviewContent";
import { VaultOverviewSkeleton } from "./VaultOverviewSkeleton";

export const VaultOverview = () => {
  const { address, mounted } = useWalletConnection();
  if (!mounted) {
    return <VaultOverviewSkeleton />;
  }

  return <VaultOverviewContent address={address} />;
};
