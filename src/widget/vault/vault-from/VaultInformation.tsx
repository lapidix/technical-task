import { VaultBase } from "@/entities/vault/types";
import { NetworkIcon } from "@/shared/ui/icons/network";

interface VaultInformationProps {
  vault: VaultBase;
  vaultBalance: number;
  tokenPrice: number;
}

export const VaultInformation = ({
  vault,
  vaultBalance,
  tokenPrice,
}: VaultInformationProps) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-gray-400">To</span>
        <NetworkIcon icon={vault.icon} className="w-6 h-6" />
        <span className="text-lg font-semibold">{vault.symbol} Multiply</span>
      </div>
      <div className="text-gray-400 text-sm">
        My Supplied:{" "}
        <span className="text-white font-medium" suppressHydrationWarning>
          $
          {(vaultBalance * tokenPrice).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span className="text-gray-500">
            {vaultBalance.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{" "}
            {vault.symbol}-MV
          </span>
        </span>
      </div>
    </div>
  );
};
