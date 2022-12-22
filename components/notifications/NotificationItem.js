import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import Image from "next/image"
import { useCallback } from "react"
dayjs.extend(relativeTime)

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
  { name: "Task", icon: Tasks, text: "#A461D8", bg: "#F6EFFB" },
  { name: "Inventory", icon: Inventory, text: "#FC5A5A", bg: "#FFEEEE" },
  { name: "Finance", icon: Finance, text: "#3DD598", bg: "#EBFBF5" },
  { name: "Schedule", icon: Schedule, text: "#297BFF", bg: "#E5EEF0" },
  { name: "Workforce", icon: Workforce, text: "#50B5FF", bg: "#E8F5FF" },
  { name: "Catering", icon: Orders, text: "#FF9AD5", bg: "#F6EFFB" },
  { name: "Operations", icon: Operation, text: "#A461D8", bg: "#F6EFFB" },
  { name: "Menu", icon: Draft, text: "#297BFF", bg: "#E5EEF0" },
]

const NotificationItem = ({ notification }) => {
  const getIcon = useCallback(
    (name) => NotificationIcon.find((item) => item.name === name),
    []
  )

  const Icon = getIcon(notification.module)

  return (
    <div
      className={`${
        notification.isRead ? "bg-white" : "bg-orange-50"
      } flex items-center justify-between rounded-md w-full py-5 pl-6 pr-10`}
    >
      <div className="flex gap-6">
        <div className="w-12 h-12 rounded-full bg-slate-400">
          <Image
            src={
              notification.triggeredBy.avatar ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=144&q=500"
            }
            width={100}
            height={100}
            className="rounded-full"
            alt="profilr pic"
            objectFit="cover"
          />
        </div>

        <div>
          <h3 className="text-sm font-light">
            {notification.triggeredBy.fullName}
            <span className="text-xs opacity-60 block">
              {notification.triggeredBy.email}
            </span>
          </h3>
          <p className="text-xs mt-2">
            <span className="opacity-80">{notification.message} </span>
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ color: Icon.text, background: Icon.bg }}
        >
          <Icon.icon width={20} height={20} />
        </div>

        <span className="text-sm font-light ml-24">
          {dayjs(notification.createdAt).fromNow()}
        </span>
      </div>
    </div>
  )
}

export default NotificationItem
