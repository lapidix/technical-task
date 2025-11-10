import type { Config } from "@/shared/config/wagmi.config";

interface AddNetworkGuideProps {
  requiredChain: Config["chains"][number];
}

export function AddNetworkGuide({ requiredChain }: AddNetworkGuideProps) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
      <p className="text-blue-400 text-sm font-semibold mb-2">
        📝 Manual Setup Required
      </p>
      <p className="text-[#ECEFEC] text-xs mb-3">
        Your wallet doesn&apos;t have Base Sepolia network. Please add it
        manually:
      </p>
      <div className="bg-[#1A1D1A] rounded p-3 space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-[#8C938C]">Network Name:</span>
          <span className="text-[#ECEFEC] font-mono">{requiredChain.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8C938C]">RPC URL:</span>
          <span className="text-[#ECEFEC] font-mono">
            https://sepolia.base.org
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8C938C]">Chain ID:</span>
          <span className="text-[#ECEFEC] font-mono">{requiredChain.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8C938C]">Currency:</span>
          <span className="text-[#ECEFEC] font-mono">
            {requiredChain.nativeCurrency.symbol}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8C938C]">Explorer:</span>
          <span className="text-[#ECEFEC] font-mono text-xs">
            sepolia.basescan.org
          </span>
        </div>
      </div>
    </div>
  );
}
