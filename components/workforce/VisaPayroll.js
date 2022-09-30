import { useState } from "react"

import { Arrow, Close } from "../icons"
import useAddEmpStore from "../../stores/useAddEmpStore"
import Input from "../ui/Input"
import Button from "../ui/Button"
import RadioInput from "../ui/RadioInput"
import toast from "react-hot-toast"
import PayrollGroups from "../ui/PayrollGroups"

const visaTypes = [
  "Student Visa(20hrs limit)",
  "Student Visa(non restricted)",
  "Temporary Work Visa",
  "PR",
  "Citizen",
]

const VisaPayroll = ({ onBack, onNext, onCancel }) => {
  const emp = useAddEmpStore((store) => store.emp)
  const updateEmp = useAddEmpStore((store) => store.updateEmp)

  const [visa, setVisa] = useState(
    emp.visa || { type: visaTypes[3], expiryDate: "" }
  )
  const [payrollGroup, setPayrollGroup] = useState(emp.payrollGroup || "")

  const onSubmit = async () => {
    if (!payrollGroup) {
      return toast.error("Select Payroll group")
    }

    if (visaTypes.slice(0, 3).includes(visa.type) && !visa.expiryDate) {
      return toast.error("Visa expiry required")
    }

    updateEmp({
      visa,
      payrollGroup,
    })

    onNext()
  }

  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">
        Select Visa And Payroll Group
      </h2>

      <div className="flex flex-col items-center gap-9 h-[340px]">
        <RadioInput
          value={visa.type}
          options={visaTypes}
          onChange={(type) => setVisa((state) => ({ ...state, type }))}
        />

        <Input
          type="date"
          label="Visa expiry date"
          className="w-56"
          value={visa.expiryDate}
          onChange={(e) =>
            setVisa((state) => ({ ...state, expiryDate: e.target.value }))
          }
        />

        <div className="mt-12">
          <PayrollGroups
            payrollGroup={payrollGroup}
            onChange={setPayrollGroup}
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
            <rect x="154" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="200.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 200.01 6.01)"
              fill="#F1F1F5"
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

export default VisaPayroll
