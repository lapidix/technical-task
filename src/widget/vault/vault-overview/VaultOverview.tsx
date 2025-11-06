"use client";

import { VAULT_QUERY_KEYS } from "@/entities/vault/api";
import { useVaultData } from "@/features/vault/hooks";
import { VaultService } from "@/features/vault/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const VaultOverview = () => {
  const { vaultData } = useVaultData();

  const { data: tokenPrices } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.tokenPrices,
    queryFn: VaultService.getTokenPrices,
    staleTime: 60000,
    refetchInterval: 60000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const totalSupply = useMemo(() => {
    const total = vaultData.reduce((sum, vault) => {
      const price = tokenPrices[vault.id] || 0;
      return sum + vault.totalAssets * price;
    }, 0);

    return total > 0
      ? `$${total.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "$0.00";
  }, [vaultData, tokenPrices]);

  const myTotalSupply = useMemo(() => {
    const total = vaultData.reduce((sum, vault) => {
      const price = tokenPrices[vault.id] || 0;
      return sum + vault.myBalance * price;
    }, 0);

    return total > 0 ? `$${total.toFixed(2)}` : "$0.00";
  }, [vaultData, tokenPrices]);

  const myTotalAPY = useMemo(() => {
    const totalBalance = vaultData.reduce(
      (sum, vault) => sum + vault.myBalance,
      0
    );
    if (totalBalance === 0) return "0.00%";

    const weightedAPY = vaultData.reduce((sum, vault) => {
      const weight = vault.myBalance / totalBalance;
      return sum + vault.apr * weight;
    }, 0);

    return `${weightedAPY.toFixed(2)}%`;
  }, [vaultData]);

  const myVaultsCount = useMemo(() => {
    return vaultData.filter((vault) => vault.myBalance > 0).length;
  }, [vaultData]);

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
          <span className="text-white font-semibold">{totalSupply}</span>
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
          <div className="text-3xl font-bold text-white">{myTotalSupply}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 text-sm">My Total APY</span>
            <span className="text-gray-500 text-xs">ⓘ</span>
          </div>
          <div className="text-3xl font-bold text-white">{myTotalAPY}</div>
        </div>
      </div>
    </div>
  );
};
