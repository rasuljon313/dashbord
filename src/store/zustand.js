import { create } from "zustand";


const useSidebarStore = create((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),

  isOpen: false,
  toggleIsOpen: (isOpen) => set(() => ({ isOpen })),

  isOpenCategory: false,
  toggleIsOpenCategory: (isOpenCategory) => set(() => ({ isOpenCategory })),

  editMode: false,
  setEditMode: (mode) => set(() => ({ editMode: mode })),

  editModeCategory: false,
  setEditModeCategory: (mode) => set(() => ({ editModeCategory: mode })),

  delate: false,
  setDelate: (mode) => set(() => ({ delate: mode })),
  
  delateName: null,
  setDelateName: (product) => set(() => ({ delateName: product })),

  delateNameCateg: null,
  setDelateNameCateg: (product) => set(() => ({delateNameCateg: product })),
  
  selectednameUz: null,
  setSelectednameUz: (product) => set(() => ({ selectednameUz: product })),
  selectednameRu: null,
  setSelectednameRu: (product) => set(() => ({ selectednameRu: product })),
  selectednameEn: null,
  setSelectednameEn: (product) => set(() => ({ selectednameEn: product })),

  selectedCategnameUz: null,
  setSelectedCategnameUz: (product) => set(() => ({ selectedCategnameUz: product })),
  selectedCategnameRu: null,
  setSelectedCategnameRu: (product) => set(() => ({ selectedCategnameRu: product })),
  selectedCategnameEn: null,
  setSelectedCategnameEn: (product) => set(() => ({ selectedCategnameEn: product })),
  
  delatee: "",
  setDelatee: (product) => set(() => ({ delatee: product })),

  delateCateg: "",
  setDelateCateg: (product) => set(() => ({ delateCateg: product })),

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
  
  chair: null,
  setselectchair: (product) => set(() => ({ chair: product })),

  table: null,
  setselecttable: (product) => set(() => ({ table: product })),
  
  getImg: "",
  setGetimg: (product) => set(() => ({ getImg: product })),

  getPdf: false,
  setGetPdf: (product) => set(() => ({ getPdf: product })),
  
  editIdUrl: "",
  setSelectIDUrl: (id) => set(() => ({ editIdUrl: id })),
  
  editIdUrlCateg: "",
  setSelectIDUrlCateg: (id) => set(() => ({ editIdUrlCateg: id })),

  a: [],
  seta: (product) => set(() => ({ a: product })),
  
  res: null,
  serResponse: (product) => set(() => ({ res: product })),
  
  b: [],
  setb: (product) => set(() => ({ b: product })),

  c: null,
  serResponseC: (product) => set(() => ({ resc: product })),

  select: [], 
  setSelect: (newSelect) => set({ select: newSelect }),

  multipleImages: [],
  setMultipleImages: (product) => set(() => ({ multipleImages: product })),

  multiple: [],
  setMultiple: (product) => set(() => ({ multiple: product })),

  sizes: [],
  setSizes: (product) => set(() => ({ sizes: product })),
  
  tostify: false,
  setTostify: (mode) => set(() => ({ tostify: mode })),


  // openCategoryM:false,
  // setOpenCategoryM: (mode) => set(() => ({ openCategoryM: mode })),
}));

export default useSidebarStore;