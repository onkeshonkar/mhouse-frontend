import dayjs from "dayjs"
import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import timeDifference from "../../../utils/timeDifference"
import { Chevron } from "../../icons"
import Spinner from "../../ui/Spinner"

// const data = {
//   schedules: [
//     { scheduledSlot: ["09:00", "17:0"] },
//     { leaveType: "Annual Leave" },
//   ],
// }

const TimeSheet = ({ employee }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [week, setWeek] = useState(dayjs().day(1).format("YYYY/MM/DD"))

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/schedules?date=${week}&type=week&employee=${employee.id}`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return toast.error(JSON.stringify(error))
    }
  }

  return (
    <div className="mt-7">
      <div className="flex justify-between px-2">
        <div className="flex items-center bg-background rounded-2xl px-6 py-4 w-72 gap-6">
          <button
            onClick={() =>
              setWeek(dayjs(week).subtract(7, "days").format("YYYY/MM/DD"))
            }
          >
            <Chevron className="text-x-grey rotate-90" />
          </button>

          <div className="text-sm text-primary font-normal opacity-50 flex justify-between w-full">
            <span>{dayjs(week).format("MMM D")}</span>
            <span>-</span>
            <span>{dayjs(week).add(6, "days").format("MMM D, YYYY")}</span>
          </div>

          <button
            onClick={() =>
              setWeek(dayjs(week).add(7, "days").format("YYYY/MM/DD"))
            }
          >
            <Chevron className="text-x-grey -rotate-90" />
          </button>
        </div>

        <div className="flex flex-col gap-2 w-72">
          <div className="flex items-center justify-between">
            <div className="text-xs font-normal">Total Hours this week</div>

            <div className="text-base font-bold">
              <span className=" text-x-green">32</span>
              <span> / </span>
              <span>168hr</span>
            </div>
          </div>

          <div className="w-72 h-1 rounded-sm bg-[#E2E2EA]">
            <div
              style={{ width: Math.floor((288 * 32) / 168) + "px" }}
              className={`h-1 rounded-sm bg-x-green`}
            />
          </div>
        </div>
      </div>

      {!data ? (
        <div className="mt-10 text-center">
          <Spinner />
        </div>
      ) : (
        <div className="mt-9">
          <div className="bg-background py-2.5 flex gap-9 pl-4">
            {new Array(7).fill("").map((_, i) => (
              <div
                key={i + "day"}
                className="w-[105px] h-9 border-r-2 last:border-none"
              >
                <div className="w-[60px] flex h-full items-center gap-1 text-sm font-light">
                  <span className="opacity-50 w-5">
                    {dayjs(week).add(i, "days").format("DD")}
                  </span>
                  <span>{dayjs(week).add(i, "days").format("ddd")}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-5 mt-6">
            {data.schedules.map((schedule, i) => (
              <div
                key={i}
                className={`${i != 6 && "border-r-2"} w-[121px] flex`}
              >
                {schedule.leaveType ? (
                  <div className="text-xs text-primary font-normal mx-auto self-center">
                    {schedule.leaveType}
                  </div>
                ) : (
                  <div className="text-xs text-primary font-normal p-4 flex items-center justify-between w-full">
                    <div className="flex flex-col items-center">
                      <span>{schedule.scheduledSlot[0]}</span>
                      <span>-</span>
                      <span>{schedule.scheduledSlot[1]}</span>
                    </div>
                    <span className="text-[#B5B5BE]">
                      ~
                      {timeDifference(
                        schedule.scheduledSlot[0],
                        schedule.scheduledSlot[1]
                      )}{" "}
                      hrs
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeSheet
