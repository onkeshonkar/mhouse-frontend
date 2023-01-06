import { useState } from "react"

import SelectDepartment from "./SelectDepartment"
import TaskInfo from "./TaskInfo"
import { useTaskAddStore } from "../../stores/useAddTaskStore"
import { APIService } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { toast } from "react-hot-toast"
import dayjs from "dayjs"

const AddTaskModal = ({ onCancel, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const clearTaskStore = useTaskAddStore((store) => store.clearTaskStore)
  // const task = useTaskAddStore((store) => store.task)

  const [currPage, setCurrPage] = useState(1)

  const onSubmit = async () => {
    const { task } = useTaskAddStore.getState()
    const taskData = {}

    const checkList = task.checkList.map(({ subTask, dueTime }) => ({
      subTask,
      ...(dueTime && { dueTime }),
    }))

    taskData.checkList = checkList
    taskData.title = task.title
    taskData.departments = task.departments
    if (task.comment) {
      taskData.comment = task.comment
    }

    if (task.isRepeatType) {
      taskData.repeatType = task.repeatType

      if (task.repeatType == "Weekly") {
        taskData.weeklyDueDay = task.repeatDay
      }

      if (task.repeatType == "Monthly") {
        taskData.monthlyDueDate = dayjs(task.repeateDate).get("D")
      }
    }

    console.log(taskData)

    try {
      await APIService.post(`/v1/branches/${selectedBranch.id}/tasks`, taskData)
      toast.success("task added")
      clearTaskStore()
      mutate()
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    onCancel()
  }

  return (
    <>
      {currPage === 1 && (
        <TaskInfo onCancel={onCancel} onNext={() => setCurrPage(2)} />
      )}

      {currPage === 2 && (
        <SelectDepartment
          onCancel={onCancel}
          onBack={() => setCurrPage(1)}
          onSubmit={onSubmit}
        />
      )}
    </>
  )
}

export default AddTaskModal
