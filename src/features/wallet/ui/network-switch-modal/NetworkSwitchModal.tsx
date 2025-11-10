import type { Config } from "@/shared/config/wagmi.config";
import { BaseModal } from "@/shared/ui/modal";
import { AddNetworkGuide } from "./AddNetworkGuide";
import { NetworkInformation } from "./NetworkInformation";
import { NetworkSwitchModalActions } from "./NetworkSwitchModalActions";
import { NetworkSwitchModalHeader } from "./NetworkSwitchModalHeader";

interface NetworkSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChainId?: number;
  requiredChain: Config["chains"][number];
  onSwitchNetwork: () => void;
  isPending: boolean;
  needsToAddNetwork?: boolean;
}

export function NetworkSwitchModal({
  isOpen,
  onClose,
  currentChainId,
  requiredChain,
  onSwitchNetwork,
  isPending,
  needsToAddNetwork = false,
}: NetworkSwitchModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <NetworkSwitchModalHeader needsToAddNetwork={needsToAddNetwork} />

        <NetworkInformation
          currentChainId={currentChainId}
          requiredChain={requiredChain}
        />

        {needsToAddNetwork && <AddNetworkGuide requiredChain={requiredChain} />}

        <NetworkSwitchModalActions
          onClose={onClose}
          onSwitchNetwork={onSwitchNetwork}
          isPending={isPending}
          needsToAddNetwork={needsToAddNetwork}
        />
      </div>
    </BaseModal>
  );
}
