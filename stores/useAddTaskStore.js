import { create } from "zustand"

export const useTaskAddStore = create((set) => ({
  task: {},
  updateTask: (newTask) =>
    set((state) => ({ ...state, task: { ...state.task, ...newTask } })),

  clearTaskStore: () => set((state) => ({ ...state, task: {} }), true),
}))
