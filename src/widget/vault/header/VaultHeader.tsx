"use client";
import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { SupportedVaultId } from "@/entities/vault/types";
import { VaultService } from "@/features/vault/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface VaultHeaderProps {
  currentVaultId: SupportedVaultId;
}

export const VaultHeader = ({ currentVaultId }: VaultHeaderProps) => {
  const { data: apy } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.currentVaultAPY(currentVaultId),
    queryFn: () => VaultService.getVaultAPY(currentVaultId),
  });
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-4">
      <button onClick={() => router.back()} className="py-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="text-gray-400 text-sm">
        APY{" "}
        <span className="text-white font-semibold">
          {`${(apy * 100).toFixed(2)}%`}
        </span>
      </div>
    </div>
  );
};
