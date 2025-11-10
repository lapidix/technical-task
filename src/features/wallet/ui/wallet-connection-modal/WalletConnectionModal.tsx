"use client";

import { SUPPORTED_WALLETS } from "@/entities/wallet/constants";
import { DisconnectButton, WalletListItem } from "@/entities/wallet/ui";
import { CloseIcon } from "@/shared/ui/icons/common";
import { BaseModal } from "@/shared/ui/modal";
import { useAccount } from "wagmi";
import { useWalletConnection, useWalletModalState } from "../../hooks";

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectionModal({
  isOpen,
  onClose,
}: WalletConnectionModalProps) {
  const { connectWallet, isPending, connectors } = useWalletConnection(onClose);
  const { isConnected, address, connector } = useAccount();
  const { shouldRender } = useWalletModalState(isOpen, onClose, isPending);

  if (!shouldRender) return null;

  const isWalletInstalled = (walletName: string) => {
    return connectors.some((c) => c.name === walletName);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#ECEFEC]">
          {isConnected ? "Account" : "Connect Wallet"}
        </h2>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="p-2 hover:bg-[#2A2D2A] rounded-lg transition-colors">
          <CloseIcon className="text-[#8C938C]" />
        </button>
      </div>

      {/* Content */}
      {isConnected ? (
        <div className="space-y-4">
          <div className="bg-[#1A1D1A] rounded-lg p-4 space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-[#8C938C]">Wallet</p>
              <p className="text-[#ECEFEC] font-semibold">
                {connector?.name || "Unknown"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-[#8C938C]">Address</p>
              <p className="text-[#ECEFEC] font-mono text-sm break-all">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
              </p>
            </div>
          </div>
          <DisconnectButton onClick={onClose}>Disconnect</DisconnectButton>
        </div>
      ) : (
        <div className="space-y-3">
          {SUPPORTED_WALLETS.map((wallet) => (
            <WalletListItem
              key={wallet.id}
              onClick={() => connectWallet(wallet)}
              disabled={isPending}
              isInstalled={isWalletInstalled(wallet.name)}
              wallet={wallet}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-[#2A2D2A]">
        <p className="text-xs text-[#8C938C] text-center">
          By connecting, you agree to our Terms of Service
        </p>
      </div>
    </BaseModal>
  );
}
