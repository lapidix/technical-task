"use client";

import { VaultEntity } from "@/entities/vault/types";
import { useToast, useWalletConnection } from "@/shared/hooks";
import { useModalStore } from "@/shared/store";
import { NetworkIcon } from "@/shared/ui/icons/network";
import { useRouter } from "next/navigation";

interface VaultListItemProps {
  vault: VaultEntity;
}

export const VaultListItem = ({ vault }: VaultListItemProps) => {
  const { isConnected } = useWalletConnection();
  const { showToast } = useToast();
  const { openWalletModal } = useModalStore();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isConnected) {
      e.preventDefault();
      showToast(
        "Please connect your wallet first to access the vault.",
        "WARNING",
        {
          duration: 3000,
          action: {
            label: "Connect",
            onClick: openWalletModal,
          },
        }
      );
      return;
    }
    router.push(`/vault/${vault.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between py-1.5 px-2 mb-4 hover:bg-[#1A1D1A] transition-colors cursor-pointer rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 flex items-center justify-center">
          <NetworkIcon icon={vault.icon} />
        </div>
        <div>
          <h3 className="text-base font-medium text-white">
            {vault.symbol}{" "}
            <span className="font-medium text-[#AFB6AF]">Vault</span>
          </h3>
          <p className="text-[#7A817A] text-xs" suppressHydrationWarning>
            $
            {(vault.totalAssets * vault.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="text-lg font-medium text-white">
        {vault.apr.toFixed(2)}%
      </div>
    </div>
  );
};
