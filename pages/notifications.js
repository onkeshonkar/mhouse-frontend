import NotificationItem from "../components/notifications/NotificationItem"

const notifications = [
  {
    name: "Charlie Anderson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=144&q=500",
    message: "Transfered 12 KG Tomato to your Storage",
    highlight: "Sydney Storage",
    timestamp: "16 min",
    type: "tasks",
  },
  {
    name: "Charlie",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=144&q=500",
    message: "Register New Cash",
    highlight: "#2184523",
    timestamp: "2 days",
    type: "finance",
  },
]

const Notifications = () => {
  const readAllNotifications = () => {}

  return (
    <div className="mt-8 ml-6">
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

        <div className="flex flex-col gap-4 mt-6">
          {notifications.map((notification, i) => (
            <NotificationItem key={i} notification={notification} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Notifications
