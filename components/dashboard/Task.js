import dayjs from "dayjs"
import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { mutate } from "swr"
import { APIService } from "../../lib/axios"

import useUserStore from "../../stores/useUserStore"
import { Check, Chevron } from "../icons"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Task = ({ task }) => {
  const user = useUserStore((store) => store.user)
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [expend, setExpend] = useState(false)

  const onCheck = async (e) => {
    console.log(e.currentTarget.name)
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/tasks/${task.id}`,
        { subTaskId: e.currentTarget.name }
      )
      mutate(
        `/v1/branches/${selectedBranch.id}/tasks?department=${user.department}`
      )
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
  }

  return (
    <div
      className={classNames(
        "bg-white py-2 px-5 rounded-lg cursor-pointer ring-1 ring-slate-100 transition-all duration-300",
        task.completedBy &&
          user.email !== task.completedBy.email &&
          "opacity-50"
      )}
    >
      <div className="flex justify-between items-center">
        <div>
          <span>{task.title}</span>
          <span className="block text-xs opacity-70">{task.department}</span>
        </div>

        <div className="flex gap-1 items-center">
          <span
            className={classNames(
              task.status === "open" && "bg-[#FFF9EC] text-accent",
              task.status === "completed" && "bg-[#EBFBF5] text-x-green",
              task.status === "pending" && "bg-[#FFEEEE] text-x-red",
              task.status === "in-progress" && "bg-blue-100 text-blue-600",
              "px-3 py-1.5 rounded-2xl text-xs"
            )}
          >
            {task.status}
          </span>

          <Chevron
            onClick={() => setExpend(!expend)}
            className={`${
              expend ? "rotate-180" : ""
            } ml-5 transition-all duration-300 -mt-1`}
          />
        </div>
      </div>
      {expend && (
        <div className="bg-white mt-3 flex flex-col gap-2 text-sm font-light">
          {task?.checkList.map((item) => {
            let isExpired
            if (item.dueTime) {
              isExpired = dayjs(
                dayjs().format("YYYY/MM/DD").toString() + ` ${"17:50"}`
              ).isBefore(dayjs())
            }
            return (
              <div
                key={item._id}
                className={` ${
                  isExpired && "opacity-50"
                } px-4 py-3 bg-background rounded-xl flex gap-7 `}
              >
                {!isExpired && !item.completed && (
                  <button
                    role={"radio"}
                    name={item._id}
                    onClick={onCheck}
                    aria-checked={item.completed}
                    className={`${
                      !item.completed && "border-2 border-accent"
                    } w-6 h-6 rounded-full flex items-center justify-between cursor-pointer`}
                  >
                    {item.completed && (
                      <span className="text-white bg-accent w-full h-full rounded-full flex items-center justify-center">
                        <Check width={12} height={12} />
                      </span>
                    )}
                  </button>
                )}

                {!isExpired && item.completed && (
                  <button
                    role={"radio"}
                    aria-checked={item.completed}
                    className={`${
                      !item.completed && "border-2 border-accent"
                    } w-6 h-6 rounded-full flex items-center justify-between cursor-pointer`}
                  >
                    {item.completed && (
                      <span className="text-white bg-accent w-full h-full rounded-full flex items-center justify-center">
                        <Check width={12} height={12} />
                      </span>
                    )}
                  </button>
                )}

                {isExpired && (
                  <span className="w-6 h-6 rounded-full border-2 border-accent opacity-90" />
                )}

                <span className={`${item.completed && "line-through"}`}>
                  {item.subTask}
                </span>

                <span className="opacity-50 ml-auto">
                  {item.dueTime || "anytime"}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Task
