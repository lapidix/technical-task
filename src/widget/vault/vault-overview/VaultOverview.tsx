"use client";
import { useWalletConnection } from "@/shared/hooks";
import { VaultOverviewContent } from "./VaultOverviewContent";

export const VaultOverview = () => {
  const { address } = useWalletConnection();

  // 지갑 연결 여부와 관계없이 VaultOverviewContent 렌더링
  // address가 없으면 Total Supply만 표시
  return <VaultOverviewContent address={address} />;
};
