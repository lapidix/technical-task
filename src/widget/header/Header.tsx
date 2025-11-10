"use client";

import { useNetworkValidation } from "@/features/wallet/hooks";
import {
  NetworkSwitchModal,
  WalletConnectionButton,
  WalletConnectionModal,
} from "@/features/wallet/ui";
import { MenuIcon, RefreshIcon } from "@/shared/ui/icons/common";
import { LogoIcon } from "@/shared/ui/icons/common/LogoIcon";
import Link from "next/link";
import { Fragment, useState } from "react";
import { baseSepolia } from "viem/chains";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    showModal,
    currentChainId,
    requiredChain,
    handleSwitchNetwork,
    handleCloseModal,
    isSwitching,
  } = useNetworkValidation(baseSepolia);

  return (
    <Fragment>
      <header className="sticky top-0 z-50 bg-black text-white py-4 min-h-16 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <LogoIcon className="w-10 h-10 text-white cursor-pointer" />
          </Link>

          {/* Right side - Connect button or Account info */}
          <div className="flex-1 flex items-center justify-end gap-1.5">
            <Link className="" href="/faucet">
              Faucet
            </Link>

            <RefreshIcon className="w-6 h-6 cursor-pointer text-accent" />
            <WalletConnectionButton onOpenModal={() => setIsModalOpen(true)} />
            <MenuIcon className="w-6 h-6 cursor-pointer text-gray-50" />
          </div>
        </div>
      </header>

      {/* Wallet Modal */}
      <WalletConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Network Switch Modal */}
      <NetworkSwitchModal
        isOpen={showModal}
        onClose={handleCloseModal}
        currentChainId={currentChainId}
        requiredChain={requiredChain}
        onSwitchNetwork={handleSwitchNetwork}
        isPending={isSwitching}
      />
    </Fragment>
  );
}
