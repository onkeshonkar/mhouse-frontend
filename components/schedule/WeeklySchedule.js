import dayjs from "dayjs"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"

import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { PartialCloud } from "../icons"
import Avatar from "../ui/Avatar"
import Input from "../ui/Input"
import Spinner from "../ui/Spinner"
import AddSchedule from "./AddSchedule"
import Budget from "./Budget"
import ScheduleItem from "./ScheduleItem"

const WeeklySchedule = ({ week }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [query, setQuery] = useState("")

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/schedules?type=week&date=${week}`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return (
        <div className="mt-10 text-center">{"Can't fetch employee list"}</div>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const emps = data.employees

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

        <div className="bg-[#F1F1F5] flex gap-2 items-center">
          {new Array(7).fill("").map((_, i) => (
            <div key={i} className="flex gap-1">
              <div
                className={`w-[136px] flex items-center justify-between px-4`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-light opacity-50">
                    {dayjs(week).add(i, "day").format("DD")}
                  </span>
                  <span className="text-sm font-light">
                    {dayjs(week).add(i, "day").format("ddd")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="w-6 h-6 mb-0.5">
                    <PartialCloud />
                  </div>
                  <span className="text-xs font-normal">22 &#8451;</span>
                </div>
              </div>

              {i != 6 && (
                <span className="flex w-0.5 self-center h-14 bg-x-silver opacity-70" />
              )}
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

                <div className="flex gap-2">
                  {new Array(7).fill("").map((_, i) => {
                    const schedule = emp.schedules.find((sch) => {
                      return dayjs(sch.scheduledDate).day() === i
                    })
                    return (
                      <div key={i} className="flex gap-1">
                        <div className="w-[136px] flex gap-1">
                          <div className="rounded-md text-sm bg-white w-full flex items-center justify-center ">
                            {schedule && <ScheduleItem schedule={schedule} />}

                            {!schedule && (
                              <AddSchedule
                                workSlot={emp.workSlot[i]}
                                employeeId={emp.id}
                                date={dayjs(dayjs(week).add(i, "day")).format(
                                  "YYYY-MM-DD"
                                )}
                                reloadSchedule={mutate}
                              />
                            )}
                          </div>
                        </div>
                        {i != 6 && (
                          <span className="flex w-[2px] self-center h-14 bg-x-silver opacity-70" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Budget week={week} />
    </div>
  )
}

export default WeeklySchedule
