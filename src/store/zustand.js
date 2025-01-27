import { create } from "zustand";


const useSidebarStore = create((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),

  isOpen: false,
  toggleIsOpen: (isOpen) => set(() => ({ isOpen })),

  editMode: false,
  setEditMode: (mode) => set(() => ({ editMode: mode })),

  selectedProduct: null,
  setSelectedProduct: (product) => set(() => ({ selectedProduct: product })),
}));

export default useSidebarStore;