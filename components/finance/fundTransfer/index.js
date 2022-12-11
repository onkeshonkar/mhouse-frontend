import dayjs from "dayjs"
import { useState } from "react"
import useSWRImmutable from "swr/immutable"

import { fetcher } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import { Check, Close, Filter, Paper, Plus } from "../../icons"
import Avatar from "../../ui/Avatar"
import Button from "../../ui/Button"
import Spinner from "../../ui/Spinner"
import TooltipButton from "../../ui/ToolTipButton"
import AddFundTransfer from "./AddFundTransfer"

const FundTransfer = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [isAddNewTransfer, setIsAddNewTransfer] = useState(false)

  const approveTransfer = (e) => {
    console.log(e.currentTarget.name)
  }
  const cancelTransfer = (e) => {
    console.log(e.currentTarget.name)
  }

  const { data, error, mutate } = useSWRImmutable(
    `/v1/branches/${selectedBranch.id}/fund-transfers`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      toast.error(JSON.stringify(error))
      return <span>{"Can't fetch transfered funds"}</span>
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
      {isAddNewTransfer && (
        <AddFundTransfer onClose={() => setIsAddNewTransfer(false)} />
      )}
      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Finance Management</h1>
            <p className="text-sm font-light">60K $ Total Transferred</p>
          </div>

          <div className="flex gap-6">
            <TooltipButton text={"Filter"}>
              <Filter className="text-x-grey" />
            </TooltipButton>

            <TooltipButton text={"Download PDF"}>
              <Paper className="text-x-grey" />
            </TooltipButton>

            <Button onClick={() => setIsAddNewTransfer(true)}>
              <Plus width={16} height={16} className="mr-2" />
              <span>New Transfer</span>
            </Button>
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