import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { Arrow } from "../../icons"
import Input from "../../ui/Input"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import AmountInput from "../../ui/AmountInput"
import useUserStore from "../../../stores/useUserStore"

const PayrollGroupModal = ({ onClose, onPayrollSubmit, payroll }) => {
  const user = useUserStore((store) => store.user)

  const [loading, setLoading] = useState(false)
  const [payrollGroup, setPayrollGroup] = useState(
    payroll || {
      name: "",
      weekdayRate: 1,
      publicHolidayRate: 1,
      saturdayRate: 1,
      sundayRate: 1,
    }
  )

  const currency = " AUD"

  const updatePayroll = (key, value) => {
    setPayrollGroup({ ...payrollGroup, [key]: value })
  }

  const onSubmit = async () => {
    if (!payrollGroup.name) return toast.error("Group name can't be empty")
    setLoading(true)
    await onPayrollSubmit(payrollGroup)
    setLoading(false)
  }

  const calculateApproxSalary = () => {
    const avgRate =
      (payrollGroup.weekdayRate * 5 +
        payrollGroup.sundayRate +
        payrollGroup.saturdayRate +
        payrollGroup.publicHolidayRate) /
      7

    if (user.branch.payrollType === "Weekly") {
      return Math.round(avgRate * 40) + currency + " Weekly"
    }
    if (user.branch.payrollType === "Fortnightly") {
      return Math.round(avgRate * 40 * 2) + currency + " Fortnightly"
    }
    if (user.branch.payrollType === "Monthly") {
      return Math.round(avgRate * 40 * 4 + currency) + " Monthly"
    }
  }

  return (
    <div className="px-9 py-12 bg-white rounded-2xl">
      <h3 className="text-4xl leading-6 font-medium">
        {payroll ? "Update" : "New"} Payroll Group
      </h3>

      <div className="flex gap-6 mt-14 items-center justify-around">
        <Input
          type="text"
          value={payrollGroup.name}
          label="Group Name"
          onChange={(e) => updatePayroll("name", e.target.value)}
        />

        <p className="text-sm flex flex-col -mt-1">
          Estimate Salary
          <span className="text-xs">~ {calculateApproxSalary()}</span>
        </p>
      </div>

      <div className="mt-14">
        <h4 className="text-base font-bold">
          Enter hourly pay rate in ({currency})
        </h4>

        <div className="grid grid-cols-2 gap-5 mt-9">
          <AmountInput
            value={payrollGroup.weekdayRate}
            onChange={(amt) => updatePayroll("weekdayRate", amt)}
          >
            <AmountInput.Label className="text-base font-medium w-28">
              Weekdays
            </AmountInput.Label>
          </AmountInput>

          <AmountInput
            value={payrollGroup.publicHolidayRate}
            onChange={(amt) => updatePayroll("publicHolidayRate", amt)}
          >
            <AmountInput.Label className="text-base font-medium w-28">
              Public Holiday
            </AmountInput.Label>
          </AmountInput>

          <AmountInput
            value={payrollGroup.saturdayRate}
            onChange={(amt) => updatePayroll("saturdayRate", amt)}
          >
            <AmountInput.Label className="text-base font-medium w-28">
              Saturday
            </AmountInput.Label>
          </AmountInput>

          <AmountInput
            label={"Sunday"}
            value={payrollGroup.sundayRate}
            onChange={(amt) => updatePayroll("sundayRate", amt)}
          >
            <AmountInput.Label className="text-base font-medium w-28">
              Sunday
            </AmountInput.Label>
          </AmountInput>
        </div>
      </div>

      <div className="flex justify-between items-center mt-16">
        <Button onClick={onClose}>
          <Arrow className="rotate-180 mr-4" />
          <span>Back</span>
        </Button>

        <Button loading={loading} onClick={onSubmit}>
          <span>{payroll ? "Update" : "Add"} Payroll Group</span>
          <Arrow className="ml-4" />
        </Button>
      </div>
    </div>
  )
}

export default PayrollGroupModal
