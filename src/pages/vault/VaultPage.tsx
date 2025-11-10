import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { SupportedVaultId } from "@/entities/vault/types";
import { VaultHeader } from "@/widget/vault/header";
import { VaultForm } from "@/widget/vault/vault-from";

export const VaultPage = ({ token }: { token: SupportedVaultId }) => {
  const vault = SUPPORTED_VAULTS.find((v) => v.id === token);

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col w-full">
        <VaultHeader currentVaultId={token} />
        <main className="flex-1 flex flex-col w-full">
          {vault && <VaultForm vault={vault} />}
        </main>
      </div>
    </div>
  );
};
