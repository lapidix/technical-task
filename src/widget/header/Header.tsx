"use client";

import {
  WalletConnectionButton,
  WalletConnectionModal,
} from "@/features/wallet/ui";
import { LogoIcon } from "@/shared/ui/icons/common/LogoIcon";
import Link from "next/link";
import { Fragment, useState } from "react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <header className="sticky top-0 z-50 bg-black text-white border-b border-gray-800 py-6">
        <div className="">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <LogoIcon />

            {/* Right side - Connect button or Account info */}
            <div className="flex items-center gap-">
              <Link className="hidden xl:block" href="/faucet">
                Faucet
              </Link>
              <WalletConnectionButton
                onOpenModal={() => setIsModalOpen(true)}
              />
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
