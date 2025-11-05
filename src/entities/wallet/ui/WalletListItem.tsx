import { tcm } from "@/shared/libs";
import { WalletIcon } from "@web3icons/react";
import { HTMLAttributes } from "react";
import { SupportWalletType } from "../types";

interface WalletListItemProps extends HTMLAttributes<HTMLButtonElement> {
  wallet: SupportWalletType;
  disabled?: boolean;
  isInstalled?: boolean;
}

export const WalletListItem: React.FC<WalletListItemProps> = ({
  disabled,
  isInstalled,
  wallet,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={tcm(
        `w-full px-6 py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between`,
        isInstalled
          ? "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200"
          : "bg-gray-100 border-2 border-gray-300"
      )}
      {...props}>
      <div className="flex items-center gap-3">
        <WalletIcon id={wallet.id} variant="branded" size={32} />
        <span className="font-semibold text-gray-900">{wallet.name}</span>
      </div>
      {!isInstalled && <span className="text-sm text-gray-500">Install</span>}
    </button>
  );
};
