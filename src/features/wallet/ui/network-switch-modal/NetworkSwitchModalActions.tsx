interface NetworkSwitchModalActionsProps {
  onClose: () => void;
  onSwitchNetwork: () => void;
  isPending: boolean;
  needsToAddNetwork: boolean;
}

export function NetworkSwitchModalActions({
  onClose,
  onSwitchNetwork,
  isPending,
  needsToAddNetwork,
}: NetworkSwitchModalActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onClose}
        className="flex-1 py-3 px-4 rounded-lg bg-[#2A2D2A] text-[#ECEFEC] font-semibold hover:bg-[#3A3D3A] transition-colors"
        disabled={isPending}>
        Cancel
      </button>
      <button
        onClick={onSwitchNetwork}
        disabled={isPending || needsToAddNetwork}
        className="flex-1 py-3 px-4 rounded-lg bg-accent text-black font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {isPending
          ? "Switching..."
          : needsToAddNetwork
          ? "Add Network First"
          : "Switch Network"}
      </button>
    </div>
  );
}
