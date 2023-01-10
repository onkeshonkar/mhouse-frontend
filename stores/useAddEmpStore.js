import { create } from "zustand"

const useAddEmpStore = create((set) => ({
  emp: {},
  updateEmp: (newEmp) => {
    return set((state) => ({ ...state, emp: { ...state.emp, ...newEmp } }))
  },
  clearEmpStore: () => set((state) => ({ ...state, emp: {} })),
}))

export default useAddEmpStore
