import { create } from "zustand"

const useUserStore = create((set) => ({
  user: undefined,
  selectedBranch: undefined,
  isLoggedIn: false,
  authToken: undefined,
  authTokenExists: true,

  setUser: (user) => set((state) => ({ ...state, user, isLoggedIn: true })),

  setSelectedBranch: (branch) =>
    set((state) => ({ ...state, selectedBranch: branch })),

  logOut: () => {
    localStorage.removeItem("auth-token")
    set((state) => ({
      ...state,
      authToken: undefined,
      user: undefined,
      isLoggedIn: false,
    }))
  },

  setAuthToken: (token) => {
    localStorage.setItem("auth-token", token)
    set((state) => ({ ...state, authToken: token }))
  },

  readAuthToken: () => {
    const token = window.localStorage.getItem("auth-token")

    set((state) => ({
      ...state,
      authToken: token || "",
      authTokenExists: !!token,
    }))
  },
}))

export default useUserStore
