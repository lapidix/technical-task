"use client";

import type { Config } from "@/shared/config/wagmi.config";
import { BaseModal } from "@/shared/ui/modal";

interface NetworkSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChainId?: number;
  requiredChain: Config["chains"][number];
  onSwitchNetwork: () => void;
  isPending: boolean;
}

export function NetworkSwitchModal({
  isOpen,
  onClose,
  currentChainId,
  requiredChain,
  onSwitchNetwork,
  isPending,
}: NetworkSwitchModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#ECEFEC] mb-2">
            Wrong Network
          </h2>
          <p className="text-[#8C938C] text-sm">
            Please switch to the correct network to continue
          </p>
        </div>

        {/* Network Info */}
        <div className="bg-[#2A2D2A] rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[#8C938C] text-sm">Current Network:</span>
            <span className="text-yellow-500 font-medium">
              Chain ID: {currentChainId || "Unknown"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8C938C] text-sm">Required Network:</span>
            <span className="text-green-500 font-medium">
              {requiredChain.name} (ID: {requiredChain.id})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg bg-[#2A2D2A] text-[#ECEFEC] font-semibold hover:bg-[#3A3D3A] transition-colors"
            disabled={isPending}>
            Cancel
          </button>
          <button
            onClick={onSwitchNetwork}
            disabled={isPending}
            className="flex-1 py-3 px-4 rounded-lg bg-accent text-black font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isPending ? "Switching..." : "Switch Network"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
