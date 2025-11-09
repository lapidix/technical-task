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
    <div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1C1D1C] text-xs text-gray-50 rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#2F332F] placeholder-gray-50/12"
        />
      </div>
      <div className="flex items-center justify-between pb-1 pt-4">
        <h2 className="text-sm font-medium text-[#8C938C]">Vault</h2>
        <h3 className="text-sm font-medium text-[#8C938C]">APY</h3>
      </div>
      {filteredVaults.map((vault) => (
        <VaultListItem key={vault.id} vault={vault} />
      ))}
    </div>
  );
};
