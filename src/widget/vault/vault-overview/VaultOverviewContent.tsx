"use client";

import { useMainOverViewData } from "@/features/vault/hooks";
import { formatCompactNumber } from "@/shared/libs";

export const VaultOverviewContent = ({
  address,
}: {
  address?: `0x${string}`;
}) => {
  const { totalSupply, myTotalSupply, myTotalAPY, myVaultsCount } =
    useMainOverViewData(address);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Vault</h1>
          <p className="text-gray-400">
            Supply your tokens into a secure Vault to effortlessly earn
            optimized yield
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Total Supply</span>
          <span className="text-white font-semibold" suppressHydrationWarning>
            ${formatCompactNumber(totalSupply)}
          </span>
        </div>
      </div>

      {/* View My Vaults */}
      <button className="flex items-center gap-2 text-white text-lg mb-6 hover:text-gray-300 transition-colors">
        <span>View My Vaults</span>
        <span className="text-gray-400">({myVaultsCount})</span>
        <span>›</span>
      </button>

      {/* My Stats */}
      <div className="bg-gray-900 rounded-2xl p-6 grid grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 text-sm">My Total Supply</span>
            <span className="text-gray-500 text-xs">ⓘ</span>
          </div>
          <div
            className="text-3xl font-bold text-white"
            suppressHydrationWarning>
            ${myTotalSupply}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 text-sm">My Total APY</span>
            <span className="text-gray-500 text-xs">ⓘ</span>
          </div>
          <div
            className="text-3xl font-bold text-white"
            suppressHydrationWarning>
            {myTotalAPY.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};
