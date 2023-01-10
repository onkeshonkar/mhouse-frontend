import { create } from "zustand"

const useSupplierStore = create((set) => ({
  supplier: {},
  updateSupplier: (newSupplier) =>
    set((state) => ({
      ...state,
      supplier: { ...state.supplier, ...newSupplier },
    })),

  clearSupplierStore: () => set((state) => ({ ...state, supplier: {} }), true),
}))

export default useSupplierStore
