import { SupportWalletType } from "@/entities/wallet";
import { useConnect } from "wagmi";

export const useWalletConnection = (onSuccess?: () => void) => {
  const { connect, connectors, isPending } = useConnect({
    mutation: { onSuccess },
  });

  const getConnectorForWallet = (walletName: string) => {
    return connectors.find((c) => c.name === walletName);
  };

  const connectWallet = (wallet: SupportWalletType) => {
    const connector = getConnectorForWallet(wallet.name);

    if (connector) {
      connect({ connector });
    } else {
      window.open(wallet.installUrl, "_blank", "noopener,noreferrer");
    }
  };

  return { connectWallet, isPending, connectors };
};
