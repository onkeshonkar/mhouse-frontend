import dayjs from "dayjs"
import useSWR from "swr"
import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { Check } from "../icons"
import Checklist from "../task/Checklist"
import Spinner from "../ui/Spinner"

const TodaysTask = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const taskId = "6328986a2d6183f653857c6a"

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/tasks/${taskId}`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return (
        <span className="mt-4 block text-center">{`No record exists for Task ${taskId}`}</span>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const task = data.task

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{"Today's Tasks Assigned to you"}</h3>
          <span className="font-light text-sm">
            check circle to mark as completed
          </span>
        </div>

        <div className="text-sm">
          Total tasks <span className="font-bold text-lg ml-4"> 8 </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col gap-1.5 text-sm font-light">
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
                {!isExpired ? (
                  <div
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
                  </div>
                ) : (
                  <span className="w-6 h-6 rounded-full border-2 border-accent opacity-90"></span>
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
      </div>
    </div>
  )
}

export default TodaysTask
