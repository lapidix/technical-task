import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { SupportedVaultId } from "@/entities/vault/types";
import { VaultPage } from "@/pages/vault";
import { notFound } from "next/navigation";

function isSupportedVaultId(token: string): token is SupportedVaultId {
  return SUPPORTED_VAULTS.some((vault) => vault.id === token);
}

export default async function page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!isSupportedVaultId(token)) {
    return notFound();
  }

  return <VaultPage token={token} />;
}
