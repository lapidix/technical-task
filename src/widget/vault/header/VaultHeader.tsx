"use client";
import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { SupportedVaultId } from "@/entities/vault/types";
import { VaultTransactionService } from "@/features/vault/services";
import { useNetworkValidation } from "@/features/wallet/hooks";
import { LeftArrowIcon } from "@/shared/ui/icons/common";
import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { baseSepolia } from "viem/chains";

//* NetworkSwitchModal을 lazy loading으로 변경
const NetworkSwitchModal = dynamic(
  () =>
    import("@/features/wallet/ui").then((mod) => ({
      default: mod.NetworkSwitchModal,
    })),
  { ssr: false }
);

interface VaultHeaderProps {
  currentVaultId: SupportedVaultId;
}

export const VaultHeader = ({ currentVaultId }: VaultHeaderProps) => {
  const { data: apy } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.currentVaultAPY(currentVaultId),
    queryFn: () => VaultTransactionService.getVaultAPY(currentVaultId),
  });
  const router = useRouter();

  const {
    showModal,
    currentChainId,
    requiredChain,
    handleSwitchNetwork,
    handleCloseModal,
    isSwitching,
    needsToAddNetwork,
  } = useNetworkValidation(baseSepolia);
  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white flex items-center justify-between px-4 py-2">
        <button onClick={() => router.back()} className="py-2">
          <LeftArrowIcon className="w-7 h-7" />
        </button>
        <div className="text-[#8C938C] text-base">
          APY{" "}
          <span className="text-white font-medium">
            {`${(apy * 100).toFixed(2)}%`}
          </span>
        </div>
      </header>

      {showModal && (
        <NetworkSwitchModal
          isOpen={showModal}
          onClose={handleCloseModal}
          currentChainId={currentChainId}
          requiredChain={requiredChain}
          onSwitchNetwork={handleSwitchNetwork}
          isPending={isSwitching}
          needsToAddNetwork={needsToAddNetwork}
        />
      )}
    </>
  );
};
