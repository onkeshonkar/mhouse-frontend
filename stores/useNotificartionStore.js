import create from "zustand"

const useNotificationStore = create((set) => ({
  notifications: [],
  updateNotifications: (notification) =>
    set((state) => ({
      ...state,
      notifications: [notification, ...state.notifications],
    })),

  initNotifications: (notifications) =>
    set((state) => ({
      ...state,
      notifications,
    })),

  markAllSeen: () =>
    set((state) => ({
      ...state,
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),
}))

export default useNotificationStore
