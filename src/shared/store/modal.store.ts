import { create } from "zustand";

interface ModalStore {
  walletModalOpen: boolean;
  networkSwitchModalOpen: boolean;

  openWalletModal: () => void;
  closeWalletModal: () => void;
  openNetworkSwitchModal: () => void;
  closeNetworkSwitchModal: () => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  walletModalOpen: false,
  networkSwitchModalOpen: false,

  openWalletModal: () => set({ walletModalOpen: true }),
  closeWalletModal: () => set({ walletModalOpen: false }),
  openNetworkSwitchModal: () => set({ networkSwitchModalOpen: true }),
  closeNetworkSwitchModal: () => set({ networkSwitchModalOpen: false }),
  closeAllModals: () =>
    set({
      walletModalOpen: false,
      networkSwitchModalOpen: false,
    }),
}));
