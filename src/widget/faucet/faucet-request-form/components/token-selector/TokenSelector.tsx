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
    <div className="px-2 py-2">
      <label className="block text-sm font-medium text-[#8C938C] mb-3">
        Select Token
      </label>
      <div className="grid grid-cols-3 gap-3">
        {SUPPORTED_VAULTS.map((vault) => (
          <button
            key={vault.id}
            onClick={() => onSelect(vault)}
            className={`p-4 rounded-lg border transition-all ${
              selectedToken.id === vault.id
                ? "border-[#E6F5AA] bg-[#E6F5AA]/10"
                : "border-[#3A3D3A] bg-[#3A3D3A]/30 hover:bg-[#3A3D3A]/50"
            }`}>
            <div className="mb-2 flex justify-center">
              <NetworkIcon icon={vault.icon} />
            </div>
            <div className="text-[#ECEFEC] font-medium">{vault.symbol}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
