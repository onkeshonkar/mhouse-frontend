import { useState } from "react"
import { appendErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Arrow, Close } from "../icons"
import Button from "../ui/Button"
import Input from "../ui/Input"
import TextArea from "../ui/TextArea"
import AddChecklistItem from "./AddChecklistItem"
import { useTaskAddStore } from "../../stores/useAddTaskStore"

const schema = z.object({
  title: z.string().min(5, { message: "Must be at least 5 char" }).max(30),
  comment: z.string(),
})

const TaskInfo = ({ onNext, onCancel }) => {
  const task = useTaskAddStore((state) => state.task)
  const updateTask = useTaskAddStore((state) => state.updateTask)
  const [checkList, setCheckList] = useState(task.checkList || [])

  const onSubmit = async (data) => {
    updateTask({ ...data, checkList })
    onNext()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative ">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">Add Task Info</h2>

      <div className="flex flex-col w-4/5 mx-auto gap-4 h-80">
        <Input
          type="text"
          label="Task Title*"
          className="w-full"
          defaultValue={task.title}
          {...register("title")}
          error={errors.title}
        />

        <TextArea
          label="Comment (optional)"
          className="w-full"
          defaultValue={task.comment}
          {...register("comment")}
          error={errors.comment}
        />

        <div className=" flex flex-col gap-4 mt-7 ">
          <h2 className="text-base font-semibold self-start">
            Checklists (optional)
          </h2>

          {checkList.map((item, i) => (
            <AddChecklistItem
              key={item.id}
              checklistItem={item}
              onDelete={(id) => {
                const filtredList = checkList.filter((item) => item.id !== id)

                setCheckList([...filtredList])
              }}
            />
          ))}

          <AddChecklistItem
            onAdd={(checklistItem) =>
              setCheckList([...checkList, checklistItem])
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-24 w-laptop">
        <Button onClick={onCancel} className="bg-primary" gradient={false}>
          <Arrow
            width={20}
            height={20}
            className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
          />
          <span> Back</span>
        </Button>
        <span>
          <svg
            width="76"
            height="12"
            viewBox="0 0 76 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="24" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="70.0096"
              cy="6.00959"
              r="4"
              transform="rotate(-0.137836 70.0096 6.00959)"
              fill="#F1F1F5"
            />
            <circle
              cx="6.00961"
              cy="6.00959"
              r="4"
              transform="rotate(-0.137836 6.00961 6.00959)"
              fill="#FFC34A"
            />
          </svg>
        </span>
        <Button onClick={handleSubmit(onSubmit)}>
          <span>Next</span>
          <Arrow
            width={20}
            height={20}
            className="ml-6 group-hover:translate-x-1 duration-300"
          />
        </Button>
      </div>
    </div>
  )
}

export default TaskInfo
