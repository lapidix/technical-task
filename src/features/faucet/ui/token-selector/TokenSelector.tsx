import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { VaultBase } from "@/entities/vault/types/vault.types";
import { NetworkIcon } from "@/shared/ui/icons/network";

interface TokenSelectorProps {
  selectedToken: VaultBase;
  onSelect: (token: VaultBase) => void;
}

export const TokenSelector = ({
  selectedToken,
  onSelect,
}: TokenSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-3">
        Select Token
      </label>
      <div className="grid grid-cols-3 gap-3">
        {SUPPORTED_VAULTS.map((vault) => (
          <button
            key={vault.id}
            onClick={() => onSelect(vault)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedToken.id === vault.id
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-700 bg-gray-800 hover:border-gray-600"
            }`}>
            <div className="mb-2 flex justify-center">
              <NetworkIcon icon={vault.icon} />
            </div>
            <div className="text-white font-semibold">{vault.symbol}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
