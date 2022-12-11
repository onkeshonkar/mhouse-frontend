import { useState } from "react"

import { Delete } from "../icons"

const ScheduleItem = ({ schedule }) => {
  const [mode, setMode] = useState("schedule")

  const onDelete = async () => {}

  return (
    <div className="flex items-center cursor-pointer">
      {mode === "schedule" && (
        <div onClick={() => setMode("delete")}>
          {schedule.scheduledSlot.length ? (
            <div className="flex flex-col items-center justify-between py-2 text-xs font-semibold">
              <span>{schedule.scheduledSlot[0]}</span>
              <span>-</span>
              <span>{schedule.scheduledSlot[1]}</span>
            </div>
          ) : (
            <>
              {schedule.leaveType === "Unpaid Leave" && (
                <span className="bg-[#EBFBF5] text-x-green px-3 py-1.5 rounded-3xl">
                  {schedule.leaveType}
                </span>
              )}
              {schedule.leaveType === "Annual Leave" && (
                <span className="bg-[#FFF9EC] text-accent px-3 py-1.5 rounded-3xl">
                  {schedule.leaveType}
                </span>
              )}
              {schedule.leaveType === "Sick Leave" && (
                <span className="bg-[#FFEEEE] text-x-red px-3 py-1.5 rounded-3xl">
                  {schedule.leaveType}
                </span>
              )}
            </>
          )}
        </div>
      )}

      {mode === "delete" && (
        <button
          onClick={() => setMode("deleteOptions")}
          className="bg-x-red h-9 w-9 rounded-lg flex items-center justify-center"
        >
          <Delete width={16} height={16} className="text-white" />
        </button>
      )}

      {mode === "deleteOptions" && (
        <div className="flex gap-4">
          <button
            className="text-white bg-accent px-3 py-1.5 rounded-lg"
            onClick={() => setMode("schedule")}
          >
            No
          </button>
          <button
            className="text-white bg-red-500 px-3 py-1.5 rounded-lg"
            onClick={onDelete}
          >
            Yes
          </button>
        </div>
      )}
    </div>
  )
}

export default ScheduleItem
