import { useEffect, useState } from "react"
import useSWR from "swr"

import { Plus, Edit, Delete } from "../../icons"
import Button from "../../ui/Button"
import useUserStore from "../../../stores/useUserStore"
import { APIService, fetcher } from "../../../lib/axios"
import Spinner from "../../ui/Spinner"
import toast from "react-hot-toast"
import PayrollGroupModal from "./PayrollGroupModal"
import ConfirmModal from "../../ui/ConfirmModal"

const PayrollGroup = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [isAddPayrollModal, setIsAddPayrollModal] = useState(false)
  const [isEditPayrollModal, setIsEditPayrollModal] = useState(false)
  const [isDeletePayrollModal, setIsDeletePayrollModal] = useState(false)
  const [payrollToModify, setPayrollToModify] = useState()

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/payroll-groups`,
    fetcher
  )

  const onEditPayroll = (e) => {
    const clickedPayrollId = e.currentTarget.name
    const payrolll = data.payrollGroups.find((p) => p.id === clickedPayrollId)
    setPayrollToModify(payrolll)
    setIsEditPayrollModal(!isEditPayrollModal)
    console.log(payrolll)
  }

  const onDeletePayroll = (e) => {
    const clickedPayrollId = e.currentTarget.name
    const payrolll = data.payrollGroups.find((p) => p.id === clickedPayrollId)
    setPayrollToModify(payrolll)
    console.log(payrolll, "d")

    setIsDeletePayrollModal(!isDeletePayrollModal)
  }

  const handleAddPayroll = async (payroll) => {
    try {
      await APIService.post(
        `/v1/branches/${selectedBranch.id}/payroll-groups`,
        {
          ...payroll,
        }
      )
      toast.success("Payroll group added")
      mutate()
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    setIsAddPayrollModal(false)
  }

  const handleEditPayroll = async (data) => {
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/payroll-groups/${payrollToModify.id}`,
        {
          ...data,
        }
      )
      toast.success("Payroll group updated")
      mutate()
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
      console.log(error)
    }
    setIsEditPayrollModal(false)
  }

  const handleDeletePayroll = async () => {
    try {
      await APIService.delete(
        `/v1/branches/${selectedBranch.id}/payroll-groups/${payrollToModify.id}`
      )
      toast.success("Payroll group Deleted")
      mutate()
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    setIsDeletePayrollModal(false)
  }

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return toast.error(JSON.stringify(error))
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  return (
    <>
      {isAddPayrollModal && (
        <PayrollGroupModal
          onClose={() => setIsAddPayrollModal(false)}
          onPayrollSubmit={handleAddPayroll}
        />
      )}

      {isEditPayrollModal && (
        <PayrollGroupModal
          onClose={() => setIsEditPayrollModal(false)}
          onPayrollSubmit={handleEditPayroll}
          payroll={payrollToModify}
        />
      )}

      {isDeletePayrollModal && (
        <ConfirmModal
          onClose={() => {
            setIsDeletePayrollModal(false)
          }}
          onConfirm={handleDeletePayroll}
        />
      )}

      <div className="relative">
        <div className=" absolute right-4 -top-20">
          <Button
            onClick={() => {
              setIsAddPayrollModal(!isAddPayrollModal)
            }}
          >
            <Plus width={15} height={15} />
            <span className="ml-2">New</span>
          </Button>
        </div>

        <div>
          <table className="min-w-full border-spacing-y-1 border-separate">
            <thead className='bg-[#F1F1F5] leading-5 after:content-["."] after:block after:bg-background after:text-transparent'>
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                >
                  Group Name
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Weekdays
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Public Holidays
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Saturday
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Sunday
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.payrollGroups.map((payroll) => (
                <tr className="bg-white" key={payroll.name}>
                  <td className="whitespace-nowrap py-5 pl-8 pr-4 text-sm text-primary font-normal ">
                    {payroll.name}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary text-center font-normal ">
                    <span className="font-light">$</span>
                    {payroll.weekdayRate}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary text-center font-normal ">
                    <span className="font-light">$</span>
                    {payroll.publicHolidayRate}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary text-center font-normal ">
                    <span className="font-light">$</span>
                    {payroll.saturdayRate}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary text-center font-normal ">
                    <span className="font-light">$</span>
                    {payroll.sundayRate}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    <div className="flex gap-8">
                      <button onClick={onEditPayroll} name={payroll.id}>
                        <Edit width={20} height={20} />
                      </button>

                      <button onClick={onDeletePayroll} name={payroll.id}>
                        <Delete width={20} height={20} className="text-x-red" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PayrollGroup
