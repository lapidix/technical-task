import { VaultBase } from "@/entities/vault/types";
import { NetworkIcon } from "@/shared/ui/icons/network";

interface TokenInformationProps {
  vault: VaultBase;
  tokenBalance: number;
  isSupply: boolean;
}

export const TokenInformation = ({
  vault,
  tokenBalance,
  isSupply,
}: TokenInformationProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1.5">
        <h1 className="text-xl text-[#C2C8C2] font-medium">
          {isSupply ? "Supply" : "Withdraw"}
        </h1>
        <div className="flex items-center gap-x-1">
          <NetworkIcon icon={vault.icon} className="w-5 h-5" />
          <span className="text-xl font-medium">{vault.symbol}</span>
        </div>
      </div>

      <div className="text-[#8C938C] font-medium text-sm">
        {isSupply ? "Wallet Balance:" : "Withdrawable:"}{" "}
        <span className="text-[#DFE2DF] font-medium" suppressHydrationWarning>
          {tokenBalance.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
