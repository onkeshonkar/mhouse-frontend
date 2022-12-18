import { useState } from "react"
import useSWRImmutable from "swr/immutable"
import { toast } from "react-hot-toast"

import useUserStore from "../../../stores/useUserStore"
import { Filter, Paper, Plus } from "../../icons"
import Button from "../../ui/Button"
import Spinner from "../../ui/Spinner"
import TooltipButton from "../../ui/ToolTipButton"
import { fetcher } from "../../../lib/axios"
import dayjs from "dayjs"
import Avatar from "../../ui/Avatar"
import RegisterNewCash from "./RegisterNewCash"
import Modal from "../../ui/Modal"

const CashRegister = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const user = useUserStore((store) => store.user)

  const [isNewCash, setIsNewCash] = useState(false)

  const { data, error, isLoading, mutate } = useSWRImmutable(
    user.type === "OWNER" || user.roles.access["CASH_REGISTER"].includes("view")
      ? `/v1/branches/${selectedBranch.id}/cash-register`
      : null,
    fetcher
  )

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
        <div className="mt-10 text-center">{"Can't fetch cash registers"}</div>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const totalCash = data.cashRegisters.reduce((prev, curr) => {
    return prev + curr.totalAmount
  }, 0)

  return (
    <>
      <Modal open={isNewCash} transparent={false}>
        <RegisterNewCash onClose={() => setIsNewCash(false)} mutate={mutate} />
      </Modal>

      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Finance Management</h1>
            <p className="text-sm font-light">$ {totalCash} Total Registered</p>
          </div>

          <div className="flex gap-6">
            <TooltipButton text={"Filter"}>
              <Filter className="text-x-grey" />
            </TooltipButton>

            <TooltipButton text={"Download PDF"}>
              <Paper className="text-x-grey" />
            </TooltipButton>

            {(user.type === "OWNER" ||
              user.roles.access["CASH_REGISTER"].includes("add")) && (
              <Button onClick={() => setIsNewCash(true)}>
                <Plus width={16} height={16} className="mr-2" />
                <span>New Count</span>
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
                  5C
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  10C
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  20C
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  50C
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  1$
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  2$
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  5$
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  10$
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  20$
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  50$
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  100$
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Register Date
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Register By
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Total Amount
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.cashRegisters.map((cash) => (
                <tr key={cash.id}>
                  <td className="whitespace-nowrap py-2.5 pl-8 pr-4 text-sm text-primary font-normal ">
                    {cash["5C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["10C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["20C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["50C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["1$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["2$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["5$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["10$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["20$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["50$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash["100$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cash.time === "Breakfast" && (
                      <span className="bg-[#FFF9EC] text-accent px-3 py-1.5 rounded-3xl">
                        {cash.time}
                      </span>
                    )}
                    {cash.time === "Lunch" && (
                      <span className="bg-[#EBFBF5] text-x-green px-3 py-1.5 rounded-3xl">
                        {cash.time}
                      </span>
                    )}
                    {cash.time === "Dinner" && (
                      <span className="bg-[#FEEFF8] text-[#FF9AD5] px-3 py-1.5 rounded-3xl">
                        {cash.time}
                      </span>
                    )}
                    {cash.time === "Night" && (
                      <span className="bg-[#F6EFFB] text-[#A461D8] px-3 py-1.5 rounded-3xl">
                        {cash.time}
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {dayjs(cash.createdAt).format("DD MMM YYYY")}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar
                          user={cash.registeredBy}
                          width={36}
                          height={36}
                        />
                      </div>
                      {cash.registeredBy.fullName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-base text-primary font-medium ">
                    {cash.totalAmount} $
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

export default CashRegister
