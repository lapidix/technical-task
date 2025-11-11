interface VaultModeTabProps {
  mode: "supply" | "withdraw";
  onModeChange: (mode: "supply" | "withdraw") => void;
}

export const VaultModeTab = ({ mode, onModeChange }: VaultModeTabProps) => {
  return (
    <div className="px-4 py-2 flex-shrink-0">
      <div className="flex gap-2 bg-[#1A1D1A] rounded-lg p-1 relative">
        {/* Animated Background */}
        <div
          className="absolute top-1 bottom-1 rounded-md bg-[#2A2D2A] transition-all duration-300 ease-out"
          style={{
            left: mode === "supply" ? "4px" : "calc(50% + 2px)",
            right: mode === "supply" ? "calc(50% + 2px)" : "4px",
          }}
        />
        <button
          onClick={() => onModeChange("supply")}
          className={`flex-1 py-2 text-base rounded-md font-semibold transition-colors relative z-10 ${
            mode === "supply"
              ? "text-[#ECEFEC]"
              : "text-[#8C938C] hover:text-[#C2C8C2]"
          }`}>
          Supply
        </button>
        <button
          onClick={() => onModeChange("withdraw")}
          className={`flex-1 py-2 text-base rounded-md font-semibold transition-colors relative z-10 ${
            mode === "withdraw"
              ? "text-[#ECEFEC]"
              : "text-[#8C938C] hover:text-[#C2C8C2]"
          }`}>
          Withdraw
        </button>
      </div>
    </div>
  );
};
