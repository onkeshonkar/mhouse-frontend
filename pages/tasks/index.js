import dayjs from "dayjs"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"

import { Draft, Filter, Plus, Report } from "../../components/icons/"
import AddTaskModal from "../../components/task/AddTaskModal"
import Avatar from "../../components/ui/Avatar"
import Button from "../../components/ui/Button"
import Modal from "../../components/ui/Modal"
import Spinner from "../../components/ui/Spinner"
import TooltipButton from "../../components/ui/ToolTipButton"
import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"

const Tasks = () => {
  const [isAddTask, setIsAddTask] = useState(false)
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const user = useUserStore((store) => store.user)

  const { data, error, isLoading, mutate } = useSWR(
    user.type === "OWNER" || user.roles.access["TASKS"].includes("view")
      ? `/v1/branches/${selectedBranch.id}/tasks`
      : null,
    fetcher,
    { errorRetryCount: 2 }
  )

  if (!isLoading && !data && !error) {
    return (
      <div className="mt-10 text-center">
        You don&apos;t have enough permission.
      </div>
    )
  }

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

  const { tasks } = data
  const todaysTasks = tasks.length
  const completeTaks = tasks.reduce((prevVal, currVal) => {
    if (currVal.status === "completed") return prevVal + 1
    return prevVal
  }, 0)

  return (
    <>
      <Modal open={isAddTask} transparent={false}>
        <AddTaskModal onCancel={() => setIsAddTask(false)} mutate={mutate} />
      </Modal>

      <div className="mt-8 ml-6">
        <div className="flex item center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Task Management</h1>
            <p className="text-sm font-light">{tasks.length} Total Tasks</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-normal">Todays task</p>
                <div className="text-base font-bold">
                  <span className="text-x-green">{completeTaks}</span>
                  <span> / </span>
                  <span>{todaysTasks}</span>
                </div>
              </div>

              <div className="w-56 h-1 rounded-sm bg-[#E2E2EA]">
                <div
                  style={{
                    width:
                      Math.floor((224 * completeTaks) / todaysTasks) + "px",
                  }}
                  className={`h-1 rounded-sm bg-x-green`}
                />
              </div>
            </div>

            <TooltipButton text="Report">
              <Report />
            </TooltipButton>

            <TooltipButton text="Filter">
              <Filter />
            </TooltipButton>

            {(user.type === "OWNER" ||
              user.roles.access["TASKS"].includes("add")) && (
              <Button onClick={() => setIsAddTask(true)}>
                <Plus width={12} height={12} />
                <span className="text-base font-semibold ml-2">New Task</span>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-7">
          <table className="min-w-full border-spacing-y-1 border-separate">
            <thead className='bg-[#F1F1F5] leading-5 after:content-["."] after:block after:bg-background after:text-transparent'>
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                >
                  Task Title
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Checklists
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Completed Date
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Assigned To
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Completed By
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal transition-all duration-100 hover:text-amber-500 hover:underline ">
                    <Link href={`/tasks/${task.id}`} prefetch={false}>
                      <a>{task.title}</a>
                    </Link>
                  </td>

                  <td
                    className={`${
                      !task.checkList.length && "opacity-50"
                    } whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal`}
                  >
                    <span className="flex gap-1 h-9 items-center">
                      <Draft width={18} height={18} />
                      {task.checkList.length}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal opacity-50">
                    {dayjs(task.dueDate).format("DD MMM YYYY")}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-center">
                    {task.completedDate ? (
                      <span className="text-x-green">
                        {dayjs(task.completedDate).format("DD MMM YYYY")}
                      </span>
                    ) : (
                      <span className="opacity-50">---</span>
                    )}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal">
                    {task.department}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-center">
                    {task.completedBy ? (
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                          <Avatar
                            user={task.completedBy}
                            width={36}
                            height={36}
                          />
                        </div>
                        {task.completedBy.fullName}
                      </div>
                    ) : (
                      "----"
                    )}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-center">
                    <span
                      className={`${
                        task.status === "open" && "bg-[#FFF9EC] text-accent"
                      } ${
                        task.status === "completed" &&
                        "bg-[#EBFBF5] text-x-green"
                      }
                    ${task.status === "pending" && "bg-[#FFEEEE] text-x-red"}
                    ${
                      task.status === "in-progress" &&
                      "bg-blue-100 text-blue-600"
                    } px-3 py-2 rounded-2xl`}
                    >
                      {" "}
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Tasks
