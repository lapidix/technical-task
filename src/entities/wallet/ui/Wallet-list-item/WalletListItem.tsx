import { tcm } from "@/shared/libs";
import { WalletIcon } from "@/shared/ui/icons/wallet";
import { HTMLAttributes } from "react";
import { SupportWalletType } from "../../types";

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
          ? "bg-[#2A2D2A] hover:bg-[#3A3D3A] border-2 border-[#3A3D3A]"
          : "bg-[#1A1D1A] border-2 border-[#2A2D2A]"
      )}
      {...props}>
      <div className="flex items-center gap-3">
        <WalletIcon icon={wallet.icon} />
        <span className="font-semibold text-[#ECEFEC]">{wallet.name}</span>
      </div>
      {!isInstalled && <span className="text-sm text-[#8C938C]">Install</span>}
    </button>
  );
};
