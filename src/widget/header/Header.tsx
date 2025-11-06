"use client";

import {
  WalletConnectionButton,
  WalletConnectionModal,
} from "@/features/wallet/ui";
import { Logo } from "@/shared/ui/logo";
import Link from "next/link";
import { Fragment, useState } from "react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <header className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Right side - Connect button or Account info */}
            <div className="flex items-center gap-12">
              <Link href="/faucet">Faucet</Link>
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
