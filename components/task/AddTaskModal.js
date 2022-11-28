import { useState } from "react"

import Modal from "../ui/Modal"
import SelectDepartment from "./SelectDepartment"
import TaskInfo from "./TaskInfo"
import { useTaskAddStore } from "../../stores/useAddTaskStore"

const AddTaskModal = ({ onCancel }) => {
  const [currPage, setCurrPage] = useState(1)

  const clearTaskStore = useTaskAddStore((store) => store.clearTaskStore)

  const onSubmit = async () => {
    const { task } = useTaskAddStore.getState()
    console.log(task, "modal")
    // clearTaskStore()
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
