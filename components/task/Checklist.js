import dayjs from "dayjs"
import { toast } from "react-hot-toast"

import { APIService } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { Check } from "../icons"

const Checklist = ({ task, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const onCheck = async (e) => {
    // console.log(e.currentTarget.name)
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/tasks/${task.id}`,
        { subTaskId: e.currentTarget.name }
      )
      mutate()
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
  }

  return (
    <div className="flex flex-col gap-1.5 text-sm font-light">
      {task?.checkList.map((item) => {
        let isExpired
        if (item.dueTime) {
          isExpired = dayjs(
            dayjs().format("YYYY/MM/DD").toString() + ` ${item.dueTime}`
          ).isBefore(dayjs())
        }
        return (
          <div
            key={item._id}
            className={` ${
              isExpired ? "opacity-50" : ""
            } px-4 py-3 bg-background rounded-xl flex gap-7`}
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
  )
}

export default Checklist
