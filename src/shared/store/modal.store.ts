import { create } from "zustand";

interface ModalStore {
  // State
  walletModalOpen: boolean;
  networkSwitchModalOpen: boolean;

  // Actions
  openWalletModal: () => void;
  closeWalletModal: () => void;
  openNetworkSwitchModal: () => void;
  closeNetworkSwitchModal: () => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  // Initial state
  walletModalOpen: false,
  networkSwitchModalOpen: false,

  // Actions
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
