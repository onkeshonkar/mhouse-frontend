import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Input from "../ui/Input"
import { Delete, Plus } from "../icons"

import { randomBytes } from "crypto"

const schema = z.object({
  subTask: z.string().min(5, { message: "Must be at least 5 char" }).max(30),
  dueTime: z.string(),
})

const AddChecklistItem = ({ checklistItem, onAdd, onDelete }) => {
  const onSubmit = (data) => {
    onAdd({ ...data, id: randomBytes(5).toString("hex") })
    reset({ subTask: "", dueTime: "" }, { keepDirty: false })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subTask: checklistItem?.subTask || "",
      dueTime: checklistItem?.dueTime || "",
    },
  })

  return (
    <div className="flex gap-4 items-start">
      <Input
        type="text"
        label="Sub-Task"
        className="w-96"
        {...register("subTask")}
        error={errors.subTask}
      />
      <Input
        type="time"
        label="Due Time"
        className="w-52"
        {...register("dueTime")}
        error={errors.dueTime}
      />

      {checklistItem ? (
        <button
          className="bg-x-red text-white p-2 rounded-md self-center"
          onClick={(e) => onDelete(e.currentTarget.name)}
          name={checklistItem.id}
        >
          <Delete width={18} height={18} />
        </button>
      ) : (
        <button
          className="bg-accent text-white p-2 rounded-md self-center"
          onClick={handleSubmit(onSubmit)}
        >
          <Plus width={18} height={18} />
        </button>
      )}
    </div>
  )
}

export default AddChecklistItem
