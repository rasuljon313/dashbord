import { create } from "zustand";


const useSidebarStore = create((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),

  isOpen: false,
  toggleIsOpen: (isOpen) => set(() => ({ isOpen })),

  editMode: false,
  setEditMode: (mode) => set(() => ({ editMode: mode })),

  delate: false,
  setDelate: (mode) => set(() => ({ delate: mode })),

  delateName: null,
  setDelateName: (product) => set(() => ({ delateName: product })),
  
  selectednameUz: null,
  setSelectednameUz: (product) => set(() => ({ selectednameUz: product })),
  selectednameRu: null,
  setSelectednameRu: (product) => set(() => ({ selectednameRu: product })),
  selectednameEn: null,
  setSelectednameEn: (product) => set(() => ({ selectednameEn: product })),

  desUz: null,
  setSelecteddescrUz: (product) => set(() => ({ desUz: product })),
  desRu: null,
  setSelecteddescrRU: (product) => set(() => ({ desRu: product })),
  desEn: null,
  setSelecteddescrEN: (product) => set(() => ({ desEn: product })),

  editPrice: null,
  setSelectedPrice: (product) => set(() => ({ editPrice: product })),

  editSize: null,
  setSelectedSize: (product) => set(() => ({ editSize: product })),

  editCategory: null,
  setSelectedCategory: (product) => set(() => ({ editCategory: product })),

  // openCategoryM:false,
  // setOpenCategoryM: (mode) => set(() => ({ openCategoryM: mode })),
}));

export default useSidebarStore;