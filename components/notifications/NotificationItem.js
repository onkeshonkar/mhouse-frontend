import Image from "next/image"
import { useCallback } from "react"

import {
  Draft,
  Finance,
  Inventory,
  Operation,
  Orders,
  Schedule,
  Tasks,
  Workforce,
} from "../icons"

const NotificationIcon = [
  { name: "tasks", icon: Tasks, text: "#A461D8", bg: "#F6EFFB" },
  { name: "inventory", icon: Inventory, text: "#FC5A5A", bg: "#FFEEEE" },
  { name: "finance", icon: Finance, text: "#3DD598", bg: "#EBFBF5" },
  { name: "schedule", icon: Schedule, text: "#297BFF", bg: "#E5EEF0" },
  { name: "workforce", icon: Workforce, text: "#50B5FF", bg: "#E8F5FF" },
  { name: "catering Orders", icon: Orders, text: "#FF9AD5", bg: "#F6EFFB" },
  { name: "operations", icon: Operation, text: "#A461D8", bg: "#F6EFFB" },
  { name: "menu", icon: Draft, text: "#297BFF", bg: "#E5EEF0" },
]

const NotificationItem = ({ notification }) => {
  const getIcon = useCallback(
    (name) => NotificationIcon.find((item) => item.name === name),
    []
  )

  const Icon = getIcon(notification.type)

  return (
    <div className="flex items-center justify-between bg-white rounded-md w-full py-5 pl-6 pr-10">
      <div className="flex gap-6">
        <div className="w-12 h-12 rounded-full bg-slate-400">
          <Image
            src={notification.avatar}
            width={100}
            height={100}
            className="rounded-full"
            alt="profilr pic"
            objectFit="cover"
          />
        </div>

        <div>
          <h3 className="text-sm font-light">{notification.name}</h3>
          <p className="text-xs mt-2">
            <span className="opacity-50">{notification.message} </span>
            <span className="text-accent opacity-100 ml-0.5">
              {notification.highlight}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-14" />

        {
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ color: Icon.text, background: Icon.bg }}
          >
            <Icon.icon width={20} height={20} />
          </div>
        }

        <span className="text-sm font-light ml-24">
          {notification.timestamp}
        </span>
      </div>
    </div>
  )
}

export default NotificationItem
