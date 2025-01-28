import { create } from "zustand";


const useSidebarStore = create((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),

  isOpen: false,
  toggleIsOpen: (isOpen) => set(() => ({ isOpen })),

  editMode: false,
  setEditMode: (mode) => set(() => ({ editMode: mode })),

  delate: false,
  setDelateMode: (mode) => set(() => ({ editMode: mode })),

  delateNamet: null,
  setDelateName: (product) => set(() => ({ selectedProduct: product })),
  
  selectedProduct: null,
  setSelectedProduct: (product) => set(() => ({ selectedProduct: product })),
}));

export default useSidebarStore;