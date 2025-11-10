import { VaultBase } from "@/entities/vault/types/vault.types";

interface TokenInformationProps {
  token: VaultBase;
}

export const TokenInformation = ({ token }: TokenInformationProps) => {
  return (
    <div className="px-2 py-2 space-y-2">
      <h3 className="text-sm font-medium text-[#8C938C]">
        Selected Token Info
      </h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-[#8C938C]">Token:</span>
          <span className="text-[#DFE2DF] font-medium">{token.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8C938C]">Address:</span>
          <span className="text-[#DFE2DF] font-mono text-xs">
            {token.tokenAddress.slice(0, 6)}...
            {token.tokenAddress.slice(-4)}
          </span>
        </div>
      </div>
    </div>
  );
};
