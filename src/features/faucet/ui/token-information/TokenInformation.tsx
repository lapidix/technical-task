import { VaultBase } from "@/entities/vault/types/vault.types";

interface TokenInformationProps {
  token: VaultBase;
}

export const TokenInformation = ({ token }: TokenInformationProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <h3 className="text-sm font-medium text-gray-400">Selected Token Info</h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Token:</span>
          <span className="text-white font-mono">{token.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Address:</span>
          <span className="text-white font-mono text-xs">
            {token.tokenAddress.slice(0, 6)}...
            {token.tokenAddress.slice(-4)}
          </span>
        </div>
      </div>
    </div>
  );
};
