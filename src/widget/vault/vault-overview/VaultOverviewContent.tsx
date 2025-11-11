"use client";

import { useMainOverViewData } from "@/features/vault/hooks";
import { formatCompactNumber } from "@/shared/libs";
import { useModalStore } from "@/shared/store";
import {
  InformationIcon,
  LinkIcon,
  RightArrowIcon,
} from "@/shared/ui/icons/common";

export const VaultOverviewContent = ({
  address,
}: {
  address?: `0x${string}`;
}) => {
  const { totalSupply, myTotalSupply, myTotalAPY, myVaultsCount } =
    useMainOverViewData(address);
  const { openWalletModal } = useModalStore();

  return (
    <div>
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

      {/* View My Vaults - 항상 표시 */}
      <div className="flex items-center gap-1 font-medium text-white text-lg mt-10 mb-4">
        <span className="self-end">View My Vaults</span>
        {address && <span className="text-[#8C938C]">({myVaultsCount})</span>}
        <RightArrowIcon className="w-5 h-5" />
      </div>

      {/* My Stats */}
      {address ? (
        <div className="bg-[#1C1D1C] rounded-2xl p-4 flex justify-between gap-8">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-gray-400 text-xs">My Total Supply</span>
              <InformationIcon className="w-3 h-3" />
            </div>
            <div
              className="text-xl font-normal text-gray-50"
              suppressHydrationWarning>
              ${formatCompactNumber(myTotalSupply)}
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
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            openWalletModal();
          }}
          type="button"
          className="w-full h-24 bg-[#1C1D1C] hover:bg-[#2A2D2A] rounded-2xl flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer gap-y-2">
          <div className="flex items-center justify-center gap-x-2 text-lg font-medium text-white">
            <LinkIcon className="w-6 h-6" />
            Connect Wallet
          </div>
          <span className="text-sm text-gray-400">
            View your vault stats and manage your assets
          </span>
        </button>
      )}
    </div>
  );
};
