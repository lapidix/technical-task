"use client";

import { useMainOverViewData } from "@/features/vault/hooks";
import { formatCompactNumber } from "@/shared/libs";
import { InformationIcon, RightArrowIcon } from "@/shared/ui/icons/common";

export const VaultOverviewContent = ({
  address,
}: {
  address?: `0x${string}`;
}) => {
  const { totalSupply, myTotalSupply, myTotalAPY, myVaultsCount } =
    useMainOverViewData(address);

  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="w-full flex items-center justify-between gap-2 ">
          <div className="flex items-end py-3">
            <h1 className="text-4xl font-medium self-end text-white">Vault</h1>
          </div>

          <div className="flex justify-center items-center gap-1.5 flex-shrink-0 border-[#2F332F] border px-2.5 py-2 rounded-3xl">
            <span className="text-[#8C938C] text-sm whitespace-nowrap">
              Total Supply
            </span>
            <span
              className="text-white text-sm font-medium whitespace-nowrap"
              suppressHydrationWarning>
              ${formatCompactNumber(totalSupply)}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-400 pr-4">
        Supply your tokens into a secure Vault to effortlessly earn optimized
        yield
      </p>

      {/* View My Vaults */}
      <button className="flex items-center gap-1 font-medium text-white text-lg mt-10 mb-4 hover:text-gray-300 transition-colors">
        <span className="self-end">View My Vaults</span>
        <span className="text-[#8C938C]">({myVaultsCount})</span>
        <RightArrowIcon className="w-5 h-5" />
      </button>

      {/* My Stats */}
      <div className="bg-[#1C1D1C] rounded-2xl p-4 flex justify-between gap-8">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-gray-400 text-xs">My Total Supply</span>
            <InformationIcon className="w-3 h-3" />
          </div>
          <div
            className="text-xl font-normal text-gray-50"
            suppressHydrationWarning>
            ${myTotalSupply.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <span className="text-gray-400 text-xs">My Total APY</span>
            <InformationIcon className="w-3 h-3" />
          </div>
          <div
            className="text-xl font-normal text-gray-50"
            suppressHydrationWarning>
            {myTotalAPY.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};
