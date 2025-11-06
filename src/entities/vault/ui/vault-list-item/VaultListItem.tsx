import { VaultEntity } from "@/entities/vault/types";
import { TokenIcon } from "@web3icons/react";

interface VaultListItemProps {
  vault: VaultEntity;
}

export const VaultListItem = ({ vault }: VaultListItemProps) => {
  return (
    <div className="flex items-center justify-between py-4 hover:bg-gray-900/50 transition-colors cursor-pointer rounded-xl px-4">
      <div className="flex items-center gap-4">
        {/* Vault 아이콘 */}
        <div className="w-14 h-14 flex items-center justify-center">
          <TokenIcon symbol={vault.id} variant="branded" size={56} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">
            {vault.symbol}{" "}
            <span className="font-normal text-gray-400">Vault</span>
          </h3>
          <p className="text-gray-400 text-base">
            $
            {(vault.totalAssets * vault.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* APY */}
      <div className="text-2xl font-semibold text-white">
        {vault.apr.toFixed(2)}%
      </div>
    </div>
  );
};
