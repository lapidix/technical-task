import { VaultEntity } from "@/entities/vault/types";
import { NetworkIcon } from "@/shared/ui/icons/network";
import Link from "next/link";

interface VaultListItemProps {
  vault: VaultEntity;
}

export const VaultListItem = ({ vault }: VaultListItemProps) => {
  return (
    <Link href={`/vault/${vault.id}`}>
      <div className="flex items-center justify-between py-1.5 mb-4 hover:bg-gray-900/50 transition-colors cursor-pointer rounded-xl">
        <div className="flex items-center gap-4">
          {/* Vault 아이콘 */}
          <div className="w-6 h-6 flex items-center justify-center">
            <NetworkIcon icon={vault.icon} />
          </div>
          <div>
            <h3 className="text-base font-medium text-white">
              {vault.symbol}{" "}
              <span className="font-medium text-[#AFB6AF]">Vault</span>
            </h3>
            <p className="text-[#7A817A] text-xs" suppressHydrationWarning>
              $
              {(vault.totalAssets * vault.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* APY */}
        <div className="text-lg font-medium text-white">
          {vault.apr.toFixed(2)}%
        </div>
      </div>
    </Link>
  );
};
