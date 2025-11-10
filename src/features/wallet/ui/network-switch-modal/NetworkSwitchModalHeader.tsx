interface NetworkSwitchModalHeaderProps {
  needsToAddNetwork: boolean;
}

export function NetworkSwitchModalHeader({
  needsToAddNetwork,
}: NetworkSwitchModalHeaderProps) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-4">{needsToAddNetwork ? "➕" : "⚠️"}</div>
      <h2 className="text-2xl font-bold text-[#ECEFEC] mb-2">
        {needsToAddNetwork ? "Network Not Found" : "Wrong Network"}
      </h2>
      <p className="text-[#8C938C] text-sm">
        {needsToAddNetwork
          ? "Please add Base Sepolia network to your wallet"
          : "Please switch to the correct network to continue"}
      </p>
    </div>
  );
}
