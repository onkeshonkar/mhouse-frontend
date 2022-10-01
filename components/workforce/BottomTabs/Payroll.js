import dayjs from "dayjs"
import { useState } from "react"
import useSWR from "swr"
import useUserStore from "../../../stores/useUserStore"

import { Chevron } from "../../icons"

const perWeekEarning = [1200, 1200, 2200, 1200, 1200, 1200, 1200, 1200]

const Payroll = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [month, setMonth] = useState(dayjs().format("YYYY/MM/DD"))

  // const { data, error, mutate } = useSWR(
  //   `/v1/branches/${selectedBranch.id}/payroll?date=${week}&employee=${employee.id}`,
  //   fetcher,
  //   {
  //     errorRetryCount: 2,
  //   }
  // )

  // if (error) {
  //   if (error.code === "ERR_NETWORK") {
  //     toast.error(error.message)
  //   } else {
  //     return toast.error(JSON.stringify(error))
  //   }
  // }

  return (
    <div className="mt-7 ">
      <div className="px-2 flex justify-between items-center">
        <div className="flex items-center bg-background rounded-2xl px-6 py-4 w-72 gap-6">
          <button
            onClick={() =>
              setMonth(dayjs(month).subtract(1, "month").format("YYYY/MM/DD"))
            }
          >
            <Chevron className="text-[#92929D] rotate-90" />
          </button>

          <div className="text-sm text-primary font-normal opacity-50 flex justify-between w-full px-5">
            <span>{dayjs(month).format("MMM")}</span>
            <span>-</span>
            <span>{dayjs(month).subtract(1, "month").format("MMM, YYYY")}</span>
          </div>

          <button
            onClick={() =>
              setMonth(dayjs(month).add(1, "month").format("YYYY/MM/DD"))
            }
          >
            <Chevron className="text-[#92929D] -rotate-90" />
          </button>
        </div>

        <span className="text-xs -mr-20">Group Payroll ex</span>

        <div className="flex flex-col gap-2 w-72">
          <div className="flex items-center justify-between">
            <p className="text-xs font-normal">Total Payroll this both month</p>

            <div className="text-base font-bold">
              <span className=" text-[#3DD598]">5K $</span>
              <span> / </span>
              <span>12K $</span>
            </div>
          </div>

          <div className="w-72 h-1 rounded-sm bg-[#E2E2EA]">
            <div
              style={{ width: Math.floor((288 * 5) / 12) + "px" }}
              className={`h-1 rounded-sm bg-[#3DD598]`}
            />
          </div>
        </div>
      </div>

      <div className="mt-9">
        <div className="bg-background py-2.5 flex gap-10 pl-11">
          {perWeekEarning.map((income, i) => (
            <div
              key={i + "income"}
              className={`${
                i != 7 && "border-r-2"
              } w-20 h-9 items-center flex text-sm font-light`}
            >
              Week {i + 1}
            </div>
          ))}
        </div>

        <div className="flex mt-6 gap-2 pl-3">
          {perWeekEarning.map((income, i) => (
            <div
              key={income + i + "i"}
              className={`${
                i != 7 && "border-r-2"
              } w-28 h-20 flex items-center justify-center text-sm `}
            >
              {income} AUD
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Payroll
