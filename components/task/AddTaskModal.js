import { useState } from "react"

import Modal from "../ui/Modal"
import SelectDepartment from "./SelectDepartment"
import TaskInfo from "./TaskInfo"
import { useTaskAddStore } from "../../stores/useAddTaskStore"
import { APIService } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { toast } from "react-hot-toast"

const AddTaskModal = ({ onCancel, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const clearTaskStore = useTaskAddStore((store) => store.clearTaskStore)
  const task = useTaskAddStore((store) => store.task)

  const [currPage, setCurrPage] = useState(1)

  const onSubmit = async () => {
    const {
      task: { departments },
    } = useTaskAddStore.getState()

    const checkList = task.checkList.map(({ subTask, dueTime }) => ({
      subTask,
      ...(dueTime && { dueTime }),
    }))

    task.checkList = checkList
    task.departments = departments
    if (!task.comment) delete task.comment

    console.log(task)
    try {
      await APIService.post(`/v1/branches/${selectedBranch.id}/tasks`, task)
      toast.success("task added")
      clearTaskStore()
      mutate()
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    onCancel()
  }

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
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
    </Modal>
  )
}

export default AddTaskModal
