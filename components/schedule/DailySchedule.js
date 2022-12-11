import dayjs from "dayjs"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useSWR from "swr"

import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import timeDifference from "../../utils/timeDifference"
import Avatar from "../ui/Avatar"
import Input from "../ui/Input"
import Spinner from "../ui/Spinner"
import AddSchedule from "./AddSchedule"

const timings = [
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
  "00:00",
  "02:00",
  "04:00",
  "06:00",
]

const DailySchedule = ({ date, setUnPublished }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [query, setQuery] = useState("")

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/schedules?type=day&date=${date}`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      toast.error(JSON.stringify(error))
      return <span>{"Can't fetch employee list"}</span>
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const emps = data.employees
  setUnPublished(data.unPublishedSchedule)

  const filteredEmps =
    query === ""
      ? emps
      : emps.filter((emp) => {
          return emp.user.fullName.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="mt-9">
      <div className="flex gap-4">
        <div className="w-56">
          <h2 className="text-sm font-light mb-4">
            {emps.length} Total Employees
          </h2>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            label="Search Name..."
            className="w-full bg-orange-50"
          />
        </div>

        <div className="bg-[#F1F1F5] flex gap-8 items-center px-3 ">
          {timings.map((time, i) => (
            <div
              key={i}
              className="w-12 text-sm font-light opacity-50 flex flex-col items-center gap-2"
            >
              <span>{time}</span>
              <span className="w-0.5 h-5 bg-[#B5B5BE] opacity-50" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full">
          {filteredEmps.map((emp) => {
            return (
              <div key={emp.id} className="flex gap-4 mb-1">
                <div className={`p-4 rounded-md bg-white flex w-56`}>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sky-500">
                      <Avatar user={emp.user} width={36} height={36} />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-light">
                        {emp.user.fullName}
                      </span>
                      <span className="text-xs font-normal opacity-60">
                        {emp.jobTitle} / {emp.department}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-grow">
                  {emp.schedule?.leaveType && (
                    <div className="bg-white flex items-center justify-center rounded-md w-full">
                      {emp.schedule.leaveType === "Unpaid Leave" && (
                        <span className="bg-[#EBFBF5] text-x-green px-3 py-1.5 rounded-3xl">
                          {emp.schedule.leaveType}
                        </span>
                      )}
                      {emp.schedule.leaveType === "Annual Leave" && (
                        <span className="bg-[#FFF9EC] text-accent px-3 py-1.5 rounded-3xl">
                          {emp.schedule.leaveType}
                        </span>
                      )}
                      {emp.schedule.leaveType === "Sick Leave" && (
                        <span className="bg-[#FFEEEE] text-x-red px-3 py-1.5 rounded-3xl">
                          {emp.schedule.leaveType}
                        </span>
                      )}
                    </div>
                  )}

                  {!!emp.schedule?.scheduledSlot?.length && (
                    <div
                      className="bg-white flex items-center justify-center rounded-md"
                      style={{
                        width:
                          64 *
                            timeDifference(
                              emp.schedule.scheduledSlot[0],
                              emp.schedule.scheduledSlot[1]
                            ) +
                          "px",
                        marginLeft:
                          27 +
                          40 *
                            timeDifference(
                              dayjs(
                                dayjs().format("YYYY/MM/DD") + `06:00`
                              ).format("HH:mm"),
                              emp.schedule.scheduledSlot[0]
                            ) +
                          "px",
                      }}
                    >
                      <span className="text-xs font-normal">{`${emp.schedule.scheduledSlot[0]} - ${emp.schedule.scheduledSlot[1]}`}</span>
                    </div>
                  )}

                  {!emp.schedule && (
                    <div className="bg-white w-full flex items-center justify-center rounded-md">
                      {(() => {
                        const dayIndex = dayjs(date).day()
                        if (emp.workSlot[dayIndex]?.length) {
                          return (
                            <AddSchedule
                              workSlot={emp.workSlot[dayIndex]}
                              employeeId={emp.id}
                              date={date}
                              reloadSchedule={mutate}
                            />
                          )
                        }

                        return (
                          <div className="flex items-center opacity-70">
                            <span className="w-1 h-1 bg-x-red mr-3 rounded-full text-xs " />
                            <span className="text-sm">unavaible</span>
                          </div>
                        )
                      })()}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DailySchedule
