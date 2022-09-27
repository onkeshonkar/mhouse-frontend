import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { mutate } from "swr"

import { APIService } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import Button from "../ui/Button"
import Toggle from "../ui/Toggle"

const Notification = () => {
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState()

  const selectedBranch = useUserStore((store) => store.selectedBranch)

  useEffect(() => {
    setNotify(selectedBranch.notifications)
  }, [selectedBranch])

  const toggleEmail = (item) => {
    notify[item] = notify[item].includes("email")
      ? notify[item].filter((i) => i !== "email")
      : [...notify[item], "email"]

    setNotify({ ...notify })
  }

  const toggleSMS = (item) => {
    notify[item] = notify[item].includes("sms")
      ? notify[item].filter((i) => i !== "sms")
      : [...notify[item], "sms"]
    setNotify({ ...notify })
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/notifications`,
        {
          notifications: notify,
        }
      )

      toast.success("Notification's setting updated.")
      setLoading(false)
      mutate(
        `/v1/restaurents/${selectedBranch.restaurent.id}/branches?details=semi`
      )
    } catch (error) {
      const { message } = error?.response?.data || ""
      toast.error(message)
      console.log(JSON.stringify(error))
    }
  }

  return (
    <div className="bg-white px-9 py-9 rounded-2xl flex flex-col gap-20">
      <div className="flex flex-col gap-6">
        {notify &&
          Object.keys(notify).map((item) => (
            <div key={item} className="flex justify-between max-w-4xl">
              <span className="text-base text-primary font-bold">{item}</span>
              <div className="flex gap-40">
                <Toggle
                  label="Email"
                  checked={notify[item].includes("email")}
                  onChange={() => toggleEmail(item)}
                />

                <Toggle
                  label="SMS"
                  checked={notify[item].includes("sms")}
                  onChange={() => toggleSMS(item)}
                />
              </div>
            </div>
          ))}
      </div>

      <Button loading={loading} onClick={onSubmit} className="self-end">
        Update Changes
      </Button>
    </div>
  )
}

export default Notification
