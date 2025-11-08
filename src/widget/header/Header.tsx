"use client";

import {
  WalletConnectionButton,
  WalletConnectionModal,
} from "@/features/wallet/ui";
import { MenuIcon, RefreshIcon } from "@/shared/ui/icons/common";
import { LogoIcon } from "@/shared/ui/icons/common/LogoIcon";
import Link from "next/link";
import { Fragment, useState } from "react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <header className="sticky top-0 z-50 bg-black text-white py-4 min-h-16">
        <div className="">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <LogoIcon className="w-12 h-12 text-white cursor-pointer" />
            </Link>

            {/* Right side - Connect button or Account info */}
            <div className="flex-1 flex items-center justify-end gap-1.5">
              <Link className="hidden xl:block" href="/faucet">
                Faucet
              </Link>

              <RefreshIcon className="w-7 h-7 cursor-pointer text-accent" />
              <WalletConnectionButton
                onOpenModal={() => setIsModalOpen(true)}
              />
              <MenuIcon className="w-7 h-7 cursor-pointer text-gray-50" />
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Modal */}
      <WalletConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Fragment>
  );
}
