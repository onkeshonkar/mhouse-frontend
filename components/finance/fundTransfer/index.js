import dayjs from "dayjs"
import { useState } from "react"
import { toast } from "react-hot-toast"
import useSWRImmutable from "swr/immutable"

import { APIService, fetcher } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import { Check, Close, Filter, Paper, Plus } from "../../icons"
import Avatar from "../../ui/Avatar"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import Spinner from "../../ui/Spinner"
import TooltipButton from "../../ui/ToolTipButton"
import AddFundTransfer from "./AddFundTransfer"

const FundTransfer = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const user = useUserStore((store) => store.user)

  const [isAddNewTransfer, setIsAddNewTransfer] = useState(false)

  const { data, error, isLoading, mutate } = useSWRImmutable(
    user.type === "OWNER" || user.roles.access["FUND_TRANSFER"].includes("view")
      ? `/v1/branches/${selectedBranch.id}/fund-transfers`
      : null,
    fetcher
  )

  const approveTransfer = async (e) => {
    const transferId = e.currentTarget.name
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/fund-transfers/${transferId}`,
        { status: "Approved" }
      )
      toast.success("Transfer status updated.")
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    mutate()
  }
  const cancelTransfer = async (e) => {
    const transferId = e.currentTarget.name
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/fund-transfers/${transferId}`,
        { status: "Canceled" }
      )
      toast.success("Transfer status updated.")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    mutate()
  }

  if (!isLoading && !data && !error) {
    return (
      <div className="mt-10 text-center">
        You don&apos;t have enough permission.
      </div>
    )
  }

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return (
        <div className="mt-10 text-center">
          {"Can't fetch transfered funds"}
        </div>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const totaltransfer = data.fundTransfers.reduce((prev, curr) => {
    return prev + (curr.status === "Approved" ? curr.amount : 0)
  }, 0)

  return (
    <>
      <Modal open={isAddNewTransfer} transparent={false}>
        <AddFundTransfer
          onClose={() => setIsAddNewTransfer(false)}
          mutate={mutate}
        />
      </Modal>

      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Finance Management</h1>
            <p className="text-sm font-light">
              $ {totaltransfer} Total Transferred
            </p>
          </div>

          <div className="flex gap-6">
            <TooltipButton text={"Filter"}>
              <Filter className="text-x-grey" />
            </TooltipButton>

            <TooltipButton text={"Download PDF"}>
              <Paper className="text-x-grey" />
            </TooltipButton>

            {(user.type === "OWNER" ||
              user.roles.access["FUND_TRANSFER"].includes("add")) && (
              <Button onClick={() => setIsAddNewTransfer(true)}>
                <Plus width={16} height={16} className="mr-2" />
                <span>New Transfer</span>
              </Button>
            )}
          </div>
        </header>

        <div className="mt-7">
          <table className="min-w-full border-spacing-y-1 border-separate">
            <thead className='bg-[#F1F1F5] leading-5 after:content-["."] after:block after:bg-background after:text-transparent'>
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                >
                  Depositor
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Method
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.fundTransfers.map((fund) => (
                <tr key={fund.id}>
                  <td className="whitespace-nowrap py-2.5 pl-8 pr-4 text-sm text-primary font-normal">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar user={fund.depositor} width={36} height={36} />
                      </div>
                      {fund.depositor.fullName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal">
                    {dayjs(fund.createdAt).format("DD MMM YYYY")}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal">
                    {fund.method}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-base text-primary font-medium ">
                    {fund.amount} $
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal">
                    {fund.status === "Approved" && (
                      <span className="bg-[#EBFBF5] text-x-green px-3 py-1.5 rounded-3xl">
                        {fund.status}
                      </span>
                    )}
                    {fund.status === "Pending" && (
                      <span className="bg-[#FFF9EC] text-accent px-3 py-1.5 rounded-3xl">
                        {fund.status}
                      </span>
                    )}
                    {fund.status === "Canceled" && (
                      <span className="bg-[#FFEEEE] text-x-red px-3 py-1.5 rounded-3xl">
                        {fund.status}
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal">
                    {fund.status === "Pending" && (
                      <div className="flex gap-2 ">
                        <button name={fund.id} onClick={approveTransfer}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-x-green opacity-50 hover:opacity-100"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>

                        <button name={fund.id} onClick={cancelTransfer}>
                          <Close
                            width={20}
                            height={20}
                            className="opacity-50 hover:opacity-100"
                          />
                        </button>
                      </div>
                    )}

                    {fund.status === "Approved" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-x-green ml-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}

                    {fund.status === "Canceled" && (
                      <Close width={20} height={20} className="ml-3" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default FundTransfer
