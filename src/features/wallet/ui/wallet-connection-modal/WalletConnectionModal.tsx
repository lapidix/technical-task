"use client";

import { SUPPORTED_WALLETS } from "@/entities/wallet/constants";
import { DisconnectButton, WalletListItem } from "@/entities/wallet/ui";
import { CloseIcon } from "@/shared/ui/icons";
import { Modal } from "@/shared/ui/modal";
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
  const { isConnected } = useAccount();
  const { shouldRender } = useWalletModalState(isOpen, onClose, isPending);

  if (!shouldRender) return null;

  const isWalletInstalled = (walletName: string) => {
    return connectors.some((c) => c.name === walletName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isConnected ? "Account" : "Connect Wallet"}
        </h2>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <CloseIcon className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      {isConnected ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-center">Connected to your wallet</p>
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
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          By connecting, you agree to our Terms of Service
        </p>
      </div>
    </Modal>
  );
}
