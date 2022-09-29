import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { mutate } from "swr"

import Button from "../../ui/Button"
import { APIService } from "../../../lib/axios"
import RadioInput from "../../ui/RadioInput"
import timeFormats from "../../../utils/timeFormates"
import ListInput from "../../ui/ListInput"
import timeZones from "../../../utils/timeZones"

import useUserStore from "../../../stores/useUserStore"
import payrollTypes from "../../../utils/payrollTypes"
import AmountInput from "../../ui/AmountInput"

const TimeCurrency = () => {
  const user = useUserStore((store) => store.user)
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [timeFormat, setTimeFormat] = useState()
  const [timeZone, setTimeZone] = useState()
  const [payrollType, setPayrollType] = useState()

  const [cashRegister, setCashRegister] = useState()
  const [safeDeposit, setSafeDeposit] = useState()
  const [closingAmount, setClosingAmount] = useState()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeFormat(selectedBranch.timeFormat || "")
    setTimeZone(selectedBranch.timeZone || "")
    setPayrollType(selectedBranch.payrollType || "")

    setCashRegister(selectedBranch.cashRegister)
    setSafeDeposit(selectedBranch.safeDeposit)
    setClosingAmount(selectedBranch.closingAmount)
  }, [selectedBranch])

  const onSubmit = async () => {
    setLoading(true)
    try {
      await APIService.patch(`/v1/branches/${selectedBranch.id}/settings`, {
        timeFormat,
        timeZone,
        payrollType,
        cashRegister,
        safeDeposit,
        closingAmount,
      })

      toast.success("Settings updated.")
      setLoading(false)
      mutate(
        `/v1/restaurents/${user.branch.restaurent.id}/branches?details=semi`
      )
    } catch (error) {
      setLoading(false)
      const { message } = error?.response?.data || error
      toast.error(message)
    }
  }

  return (
    <div className="bg-white flex flex-col gap-9 px-9 py-6 rounded-2xl">
      <div className="flex gap-16">
        <RadioInput
          value={timeFormat}
          options={timeFormats}
          onChange={setTimeFormat}
          label={"Time Format"}
        />

        <div className="w-96 bg-background rounded-2xl h-12 relative focus-within:ring-1 flex items-center">
          <ListInput
            value={timeZone}
            onChange={setTimeZone}
            options={timeZones}
            placeholder={"Select Time Zone"}
          />
          <label className="absolute text-xs opacity-50 left-6 top-1">
            Time Zone
          </label>
        </div>
      </div>

      <RadioInput
        value={payrollType}
        onChange={setPayrollType}
        options={payrollTypes}
        label={"Payroll Type"}
      />

      <AmountInput value={cashRegister} onChange={setCashRegister}>
        <AmountInput.Label className="text-base font-bold min-w-[240px]">
          Cash Register Floating Amount
        </AmountInput.Label>
      </AmountInput>

      <AmountInput value={safeDeposit} onChange={setSafeDeposit}>
        <AmountInput.Label className="text-base font-bold min-w-[240px]">
          Safe Deposit Floating Amount
        </AmountInput.Label>
      </AmountInput>

      <AmountInput value={closingAmount} onChange={setClosingAmount}>
        <AmountInput.Label className="text-base font-bold min-w-[240px]">
          Closing Day Floating Amount
        </AmountInput.Label>
      </AmountInput>

      <Button loading={loading} className=" self-end" onClick={onSubmit}>
        Update Change
      </Button>
    </div>
  )
}

export default TimeCurrency
