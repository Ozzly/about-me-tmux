import { create } from "zustand";

interface PopupStore {
  helpPopupVisible: boolean;
  setHelpPopupVisible: (isVisible: boolean) => void;
  toggleHelpPopup: () => void;
}

const usePopupStore = create<PopupStore>((set) => ({
  helpPopupVisible: false,
  setHelpPopupVisible: (isVisible: boolean) =>
    set({ helpPopupVisible: isVisible }),
  toggleHelpPopup: () =>
    set((state) => ({ helpPopupVisible: !state.helpPopupVisible })),
}));

export default usePopupStore;
