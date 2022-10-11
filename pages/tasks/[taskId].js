import dayjs from "dayjs"
import { useRouter } from "next/router"
import useSWR from "swr"
import { Delete, Draft, Notebook } from "../../components/icons"
import Checklist from "../../components/task/Checklist"
import Avatar from "../../components/ui/Avatar"
import Button from "../../components/ui/Button"

import Spinner from "../../components/ui/Spinner"
import TooltipButton from "../../components/ui/ToolTipButton"
import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"

const Task = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const route = useRouter()
  const taskId = route.query.taskId

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
    <div className="mt-8 ml-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">{task.title}</h1>

        <TooltipButton text={"Delete"} className="bg-x-red">
          <Delete className="text-white" />
        </TooltipButton>
      </div>

      <main className="flex gap-4 mt-8">
        <div className="bg-white rounded-2xl flex-1 py-6 px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-base">Checklists</h2>
              <span className="font-light text-sm">
                check circle to mark as completed
              </span>
            </div>

            <span
              className={`${
                task.status === "open" && "bg-[#FFF9EC] text-accent"
              } ${task.status === "completed" && "bg-[#EBFBF5] text-x-green"}
                    ${task.status === "pending" && "bg-[#FFEEEE] text-x-red"}
                    ${
                      task.status === "in-progress" &&
                      "bg-blue-100 text-blue-600"
                    } px-3 py-1.5 rounded-2xl text-sm font-light self-center`}
            >
              {task.status}
            </span>

            <div className="flex gap-1 text-sm font-light items-center">
              <Draft width={16} height={16} />
              <span>
                {task.checkList?.reduce((prev, curr) => {
                  if (curr.completed) return prev + 1
                  return prev
                }, 0)}
                / {task.checkList?.length}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Checklist task={task} />
          </div>
        </div>

        <div className="bg-white rounded-2xl flex-1 py-6 px-8 text-sm">
          <div>
            <span className="text-xs font-light opacity-50">Completed by</span>
            {task.completedBy && (
              <div className="flex items-center gap-4 mt-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                  <Avatar user={task.completedBy} width={36} height={36} />
                </div>
                {task.completedBy.fullName}
              </div>
            )}
          </div>

          <div className="flex gap-28 mt-12">
            <div className="flex flex-col gap-1.5 w-40">
              <span className="text-xs font-light opacity-50">Due Data</span>
              {task.dueDate ? (
                <span>
                  <Notebook width={16} height={16} className="inline mr-2" />
                  {dayjs(task.dueDate).format("DD MMM YYYY")}
                </span>
              ) : (
                <span className="opacity-50">----</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-light opacity-50">
                Completed Date
              </span>
              {task.completedDate ? (
                <span>
                  <Notebook width={16} height={16} className="inline mr-2" />
                  {dayjs(task.completedDate).format("DD MMM YYYY")}
                </span>
              ) : (
                <span className="opacity-50">----</span>
              )}
            </div>
          </div>

          <div className="flex gap-28 mt-12 ">
            <div className="flex flex-col w-40">
              <span className="text-xs font-light opacity-50">Assigned To</span>
              <span>{task.department}</span>
            </div>

            <div>
              <span className="text-xs font-light opacity-50">Created By</span>
              <div className="flex items-center gap-4 mt-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                  <Avatar user={task.createdBy} width={36} height={36} />
                </div>
                {task.createdBy.fullName}
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-light opacity-50">Comments</span>
            <p>{task.comment || "----"}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Task
