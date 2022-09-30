import { useState } from "react"
import dayjs from "dayjs"

import { Arrow, Close } from "../icons"
import useAddEmpStore from "../../stores/useAddEmpStore"
import Button from "../ui/Button"
import TimeCheckBox from "../ui/TimeCheckBox"
import Input from "../ui/Input"
import toast from "react-hot-toast"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const WorkSlot = ({ onBack, onNext, onCancel }) => {
  const emp = useAddEmpStore((store) => store.emp)
  const updateEmp = useAddEmpStore((store) => store.updateEmp)

  const [workSlot, setWorkSlot] = useState(
    emp.workSlot || [[], [], [], [], [], [], []]
  )

  const updateWorkingHours = (dayIndex, key, time) => {
    console.log(dayIndex, key, time)
    if (key === "start") {
      workSlot[dayIndex][0] = time
    } else if (key === "end") {
      workSlot[dayIndex][1] = time
    } else if (key === "unavailable") {
      workSlot[dayIndex] = []
    }
    setWorkSlot([...workSlot])
  }

  const onSubmit = () => {
    let inValidTime = false
    workSlot.map((slot, i) => {
      if (slot[0] >= slot[1]) {
        inValidTime = true
        return toast.error(
          `${days[i]} start time must be smaller than end time`,
          { duration: 5000 }
        )
      }
    })

    if (inValidTime) return

    updateEmp({
      workSlot,
    })

    onNext()
  }

  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">
        Select Days And Time Work For This Employee
      </h2>

      <div className="flex flex-wrap gap-7 items-center justify-center h-[340px]">
        {days.map((day, i) => (
          <TimeCheckBox
            label={day}
            key={day}
            selected={workSlot[i].length == 0 ? false : true}
            onChange={() => updateWorkingHours(i, "unavailable")}
          >
            {(checked) => (
              <div className="flex gap-3 items-center">
                <Input
                  type="time"
                  value={workSlot[i][0] || ""}
                  disabled={!checked}
                  onChange={(e) =>
                    updateWorkingHours(i, "start", e.target.value)
                  }
                  className="w-44"
                  label="Start Time"
                />

                <Input
                  type="time"
                  value={workSlot[i][1] || ""}
                  disabled={!checked}
                  onChange={(e) => updateWorkingHours(i, "end", e.target.value)}
                  className="w-44"
                  label="End Time"
                />
              </div>
            )}
          </TimeCheckBox>
        ))}
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
            width="400"
            height="12"
            viewBox="0 0 400 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 11.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="28" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="74.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 74.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="91" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="137.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 137.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="154" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="200.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 200.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="217" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="263.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 263.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="280" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="326.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 326.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="343" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="389.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 389.01 6.01)"
              fill="#F1F1F5"
            />
          </svg>
        </span>

        <Button onClick={onSubmit}>
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

export default WorkSlot
