import {create} from "zustand";

type WindowType = "console" | "pdf";

interface WindowStoreState {
  windowStack: WindowType[];
}

const initialState: WindowStoreState = {
  windowStack: []
};

export const useWindowStore = create<WindowStoreState>(() => {
  structuredClone(initialState);
});
