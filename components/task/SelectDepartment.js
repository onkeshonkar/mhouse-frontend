import { useEffect, useState } from "react"

import { Arrow, Close } from "../icons"
import Button from "../ui/Button"
import DepartmentsCheckBox from "./DepartmentsCheckBox"
import Input from "../ui/Input"
import ListInput from "../ui/ListInput"
import RadioInput from "../ui/RadioInput"
import Toggle from "../ui/Toggle"
import { useTaskAddStore } from "../../stores/useAddTaskStore"
import toast from "react-hot-toast"

const repeatTypes = ["Daily", "Weekly", "Monthly"]
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const SelectDepartment = ({ onSubmit, onCancel, onBack }) => {
  const task = useTaskAddStore((store) => store.task)
  const updateTask = useTaskAddStore((store) => store.updateTask)

  const [isRepeatType, setIsrepaeatType] = useState(task.isRepeatType || false)
  const [repeateDate, setRepeateDate] = useState(task.repeateDate || "")
  const [repeatType, setRepeateType] = useState(
    task.repeatType || repeatTypes[0]
  )
  const [repeatDay, setRepeatDay] = useState(task.repeatDay || weekDays[0])
  const [departments, setDepartments] = useState(task.departments || [])

  const handleSubmit = async () => {
    if (isRepeatType && repeatType === "Monthly" && !repeateDate) {
      return toast.error("Select repeat Date")
    }
    await updateTask({
      departments,
      isRepeatType,
      ...(isRepeatType && { repeatType }),
      ...(isRepeatType && repeatType === "Weekly" && { repeatDay }),
      ...(isRepeatType && repeatType === "Monthly" && { repeateDate }),
    })

    onSubmit()
  }

  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative ">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">
        Select Task Date And Assign It
      </h2>

      <div className="flex flex-col gap-24 items-center h-80">
        <div className="flex gap-4 items-center h-[50px]">
          <Toggle checked={isRepeatType} onChange={setIsrepaeatType} />
          <span className={`text-base font-bold text-primary`}>Repeat</span>

          {!isRepeatType ? (
            <div className="flex gap-4 text-sm">
              <span className="px-6 py-3.5 rounded-2xl text-opacity-50 bg-background">
                Daily
              </span>
              <span className="px-6 py-3.5 rounded-2xl text-opacity-50 bg-background">
                Weekly
              </span>
              <span className="px-6 py-3.5 rounded-2xl text-opacity-50 bg-background">
                Monthly
              </span>
            </div>
          ) : (
            <>
              <RadioInput
                options={repeatTypes}
                onChange={setRepeateType}
                value={repeatType}
              />

              {repeatType === "Monthly" && (
                <Input
                  type="date"
                  value={repeateDate}
                  onChange={(e) => setRepeateDate(e.target.value)}
                  label="Select Due Date"
                  className="w-60"
                />
              )}

              {repeatType === "Weekly" && (
                <div className="w-60 bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
                  <ListInput
                    options={weekDays}
                    value={repeatDay}
                    onChange={setRepeatDay}
                    placeholder="Repeat Day"
                  />
                  <label className="absolute text-xs opacity-50 left-6 top-1">
                    Select Repeat Day
                  </label>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col gap-9">
          <span className="text-base font-bold">Assign To Departments</span>

          <DepartmentsCheckBox
            departments={departments}
            setDepartments={setDepartments}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-24 w-laptop">
        <Button onClick={onBack} className="bg-primary" gradient={false}>
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
            <rect x="24" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="70.0096"
              cy="6.00959"
              r="4"
              transform="rotate(-0.137836 70.0096 6.00959)"
              fill="#FFC34A"
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
        <Button onClick={handleSubmit}>
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

export default SelectDepartment
