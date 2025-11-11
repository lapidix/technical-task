"use client";
import { useWalletConnection } from "@/shared/hooks";
import { VaultOverviewSkeleton } from "@/widget/vault/vault-overview/VaultOverviewSkeleton";
import { VaultOverviewContent } from "./VaultOverviewContent";

export const VaultOverview = () => {
  const { address } = useWalletConnection();

  if (!address) return <VaultOverviewSkeleton />;

  return <VaultOverviewContent address={address} />;
};
