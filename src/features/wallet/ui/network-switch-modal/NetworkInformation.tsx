import type { Config } from "@/shared/config/wagmi.config";

interface NetworkInformationProps {
  currentChainId?: number;
  requiredChain: Config["chains"][number];
}
export const NetworkInformation = ({
  currentChainId,
  requiredChain,
}: NetworkInformationProps) => {
  return (
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
  );
};
