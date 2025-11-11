"use client";

import { useNetworkValidation } from "@/features/wallet/hooks";
import { WalletConnectionButton } from "@/features/wallet/ui";
import { useModalStore } from "@/shared/store";
import { MenuIcon, RefreshIcon } from "@/shared/ui/icons/common";
import { LogoIcon } from "@/shared/ui/icons/common/LogoIcon";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Fragment } from "react";
import { baseSepolia } from "viem/chains";

const WalletConnectionModal = dynamic(
  () =>
    import("@/features/wallet/ui").then((mod) => ({
      default: mod.WalletConnectionModal,
    })),
  { ssr: false }
);

const NetworkSwitchModal = dynamic(
  () =>
    import("@/features/wallet/ui").then((mod) => ({
      default: mod.NetworkSwitchModal,
    })),
  { ssr: false }
);

export function Header() {
  const { walletModalOpen, openWalletModal, closeWalletModal } =
    useModalStore();

  const {
    showModal,
    currentChainId,
    requiredChain,
    handleSwitchNetwork,
    handleCloseModal,
    isSwitching,
    needsToAddNetwork,
  } = useNetworkValidation(baseSepolia);

  const handleRefresh = () => {
    // router.refresh();
    window.location.reload();
  };

  return (
    <Fragment>
      <header className="sticky top-0 z-50 bg-black text-white py-4 min-h-16 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <LogoIcon className="w-10 h-10 text-[#ECEFEC] hover:text-[#E6F5AA] cursor-pointer transition-all duration-300 hover:scale-110" />
          </Link>

          {/* Right side - Connect button or Account info */}
          <div className="flex-1 flex items-center justify-end gap-1.5">
            <Link
              className="text-[#ECEFEC] hover:text-[#E6F5AA] transition-colors"
              href="/faucet">
              Faucet
            </Link>

            <RefreshIcon
              onClick={handleRefresh}
              className={`w-6 h-6 cursor-pointer text-accent transition-transform duration-500 hover:rotate-180`}
            />
            <WalletConnectionButton onOpenModal={openWalletModal} />
            <MenuIcon className="w-6 h-6 cursor-pointer text-[#ECEFEC] hover:text-[#E6F5AA] transition-all duration-300 hover:scale-110" />
          </div>
        </div>
      </header>

      {/* Wallet Modal */}
      <WalletConnectionModal
        isOpen={walletModalOpen}
        onClose={closeWalletModal}
      />

      {/* Network Switch Modal */}
      <NetworkSwitchModal
        isOpen={showModal}
        onClose={handleCloseModal}
        currentChainId={currentChainId}
        requiredChain={requiredChain}
        onSwitchNetwork={handleSwitchNetwork}
        isPending={isSwitching}
        needsToAddNetwork={needsToAddNetwork}
      />
    </Fragment>
  );
}
