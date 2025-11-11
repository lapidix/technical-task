import { VaultBase } from "@/entities/vault/types";
import { NetworkIcon } from "@/shared/ui/icons/network";

interface VaultInformationProps {
  vault: VaultBase;
  vaultBalance: number;
  tokenPrice: number;
  isSupply: boolean;
}

export const VaultInformation = ({
  vault,
  vaultBalance,
  tokenPrice,
  isSupply,
}: VaultInformationProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[#C2C8C2] text-xl font-medium">
          {isSupply ? "To" : "From"}
        </span>
        <div className="flex items-center gap-x-1">
          <NetworkIcon icon={vault.icon} className="w-5 h-5" />
          <span className="text-xl font-medium">{vault.symbol} Multiply</span>
        </div>
      </div>
      <div className="text-[#8C938C] font-medium text-sm">
        My Supplied:{" "}
        <span className="text-[#DFE2DF] font-medium" suppressHydrationWarning>
          $
          {(vaultBalance * tokenPrice).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span className="text-gray-500" suppressHydrationWarning>
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
