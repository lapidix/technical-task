"use client";

import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { SupportedVaultId } from "@/entities/vault/types";
import { VaultHeader } from "@/widget/vault/header";
import { VaultForm } from "@/widget/vault/vault-from";
import { VaultFormSkeleton } from "@/widget/vault/vault-from/VaultFormSkeleton";
import { Suspense } from "react";

export const VaultPage = ({ token }: { token: SupportedVaultId }) => {
  const vault = SUPPORTED_VAULTS.find((v) => v.id === token);
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <VaultHeader currentVaultId={token} />
      <div className="flex-1 flex flex-col">
        <Suspense fallback={<VaultFormSkeleton />}>
          {vault && <VaultForm vault={vault} />}
        </Suspense>
      </div>
    </div>
  );
};
