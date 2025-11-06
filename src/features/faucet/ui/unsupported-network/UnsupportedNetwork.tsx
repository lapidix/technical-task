"use client";

import { baseSepolia } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

export const UnsupportedNetwork = () => {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  return (
    <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-8 text-center">
      <p className="text-yellow-500 font-medium mb-4">
        ⚠️ Wrong Network Connected
      </p>
      <p className="text-gray-400 mb-6">
        Current: {chain?.name || "Unknown"}
        <br />
        Required: Base Sepolia
      </p>
      <button
        onClick={() => switchChain({ chainId: baseSepolia.id })}
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
        Switch to Base Sepolia
      </button>
    </div>
  );
};
