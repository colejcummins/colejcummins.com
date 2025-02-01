import {create} from "zustand";

type PageType = "console" | "pdf";

interface PageStoreState {
  pageStack: PageType[];
}

const initialState: PageStoreState = {
  pageStack: []
};

export const usePageStore = create(() => {
  structuredClone(initialState);
});

