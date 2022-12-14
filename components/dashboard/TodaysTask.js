import { toast } from "react-hot-toast"
import useSWR from "swr"

import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import Spinner from "../ui/Spinner"
import Task from "./Task"

const TodaysTask = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const user = useUserStore((store) => store.user)

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/tasks?department=${user.department}`,
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
        <span className="mt-4 block text-center">{`can't fetch task's list`}</span>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const { tasks } = data

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{"Today's Tasks Assigned to you"}</h3>
          <span className="font-light text-xs">
            check circle to mark as completed
          </span>
        </div>

        <div className="text-sm">
          Total tasks{" "}
          <span className="font-bold text-lg ml-2"> {tasks.length} </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm">
        {!tasks.length && (
          <span className="flex justify-center font-semibold text-base mt-5">
            No task is Assigned Today.
          </span>
        )}
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default TodaysTask
