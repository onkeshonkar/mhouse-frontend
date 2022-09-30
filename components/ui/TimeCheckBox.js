import { useState } from "react"

import { Check } from "../icons"

const TimeCheckBox = ({ children, selected, label, onChange }) => {
  const [checked, setChecked] = useState(selected)

  return (
    <>
      <div className="flex gap-6">
        <div
          role="checkbox"
          aria-checked={checked}
          className={`${
            checked ? "bg-primary" : "bg-[#F1F1F5]"
          } w-24 flex items-center justify-center py-4 gap-3 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out`}
          onClick={() => {
            setChecked(!checked)
            onChange()
          }}
          onKeyUp={(e) => {
            if (e.key === " ") setChecked(!checked)
            onChange()
          }}
        >
          <div
            className={`${
              checked ? "bg-accent" : "bg-white"
            } w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out`}
          >
            {checked && <Check className="text-white -mt-0.5" />}
          </div>

          <span
            className={`${
              checked ? "text-white" : "text-primary"
            } text-sm transition-all duration-100`}
          >
            {label}
          </span>
        </div>
        {children(checked)}
      </div>
    </>
  )
}

export default TimeCheckBox
