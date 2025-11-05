"use client";

import { WalletConnectionButton, WalletModal } from "@/features/wallet";
import { useState } from "react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">VaultDapp</div>
            </div>

            {/* Right side - Connect button or Account info */}
            <div className="flex items-center gap-4">
              <WalletConnectionButton
                onOpenModal={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Modal */}
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
