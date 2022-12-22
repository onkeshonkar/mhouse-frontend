import NotificationItem from "../components/notifications/NotificationItem"
import useSocket from "../hooks/useSocket"
import useNotificartionStore from "../stores/useNotificartionStore"

const Notifications = () => {
  const notifications = useNotificartionStore((store) => store.notifications)
  const markAllSeen = useNotificartionStore((store) => store.markAllSeen)

  const socket = useSocket()

  const readAllNotifications = () => {
    socket.emit("mark all read")
    markAllSeen()
  }

  return (
    <div className="mt-8 ml-6">
      {notifications.length ? (
        <main>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Notifications</h1>
              <span className="text-sm font-light text-primary">
                {notifications.length} Total
              </span>
            </div>

            <button
              onClick={readAllNotifications}
              className="text-base text-white py-2.5 px-6 font-semibold bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] rounded-xl "
            >
              Mark all as Read
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </main>
      ) : (
        <div className="text-lg text-center font-semibold opacity-60">
          No Notification
        </div>
      )}
    </div>
  )
}

export default Notifications
