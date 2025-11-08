"use client";
import { VaultListItem } from "@/entities/vault/ui";
import { useAllVaultData } from "@/features/vault/hooks";
import { SearchIcon } from "@/shared/ui/icons/common";
import { useMemo, useState } from "react";

export const VaultList = () => {
  const { allVaultData } = useAllVaultData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVaults = useMemo(() => {
    if (!searchQuery.trim()) {
      return allVaultData;
    }

    const query = searchQuery.toLowerCase().trim();
    return allVaultData.filter((vault) => {
      return vault.symbol.toLowerCase().includes(query);
    });
  }, [allVaultData, searchQuery]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-full py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-500"
        />
      </div>
      <div className="flex items-center justify-between pt-8 pb-2 px-6">
        <h2 className="text-xl font-semibold text-gray-500">Vault</h2>
        <h3 className="text-lg font-semibold text-gray-500">APY</h3>
      </div>
      <div className="space-y-3">
        {filteredVaults.map((vault) => (
          <VaultListItem key={vault.id} vault={vault} />
        ))}
      </div>
    </div>
  );
};
