import { RadioGroup } from "@headlessui/react"
import { useEffect, useState } from "react"
import useSWR from "swr"

import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import Spinner from "./Spinner"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const PayrollGroups = ({ payrollGroup, onChange }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [selectedPayroll, setSelectedPayroll] = useState()

  const { data, error } = useSWR(
    `/v1/branches/${selectedBranch.id}/payroll-groups`,
    fetcher
  )

  const handleOnChange = (payrollGroup) => {
    setSelectedPayroll(payrollGroup)
    onChange(payrollGroup)
  }

  useEffect(() => {
    if (data) {
      const foundPayroll = data.payrollGroups.find(
        (p) => p.id == payrollGroup.id
      )
      setSelectedPayroll(foundPayroll)
    }
  }, [data, payrollGroup])

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      toast.error(JSON.stringify(error))
      return <span>{"Can't fetch Departments"}</span>
    }
  }

  if (!data)
    return (
      <div className="w-36 flex flex-col items-center gap-2 pt-1 pb-2 rounded-xl">
        <span>Payroll groups</span>
        <Spinner />
      </div>
    )

  return (
    <RadioGroup
      value={selectedPayroll}
      onChange={handleOnChange}
      className="flex flex-col items-center gap-6"
    >
      <RadioGroup.Label className="text-base font-semibold">
        Select Payoll Group
      </RadioGroup.Label>

      {!data.payrollGroups.length && (
        <span className="text-sm">
          No payroll exist, Ask Main branch Owner to create one!
        </span>
      )}

      <div className="flex gap-4 flex-wrap">
        {data.payrollGroups.map((payroll) => (
          <RadioGroup.Option value={payroll} key={payroll.id}>
            {({ checked }) => (
              <span
                className={classNames(
                  checked
                    ? "bg-accent text-white"
                    : " bg-background text-primary",
                  " flex px-6 py-3.5 text-sm cursor-pointer rounded-2xl"
                )}
              >
                {payroll.name}
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default PayrollGroups
