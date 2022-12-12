import dayjs from "dayjs"
import { useState } from "react"
import useSWRImmutable from "swr/immutable"

import { fetcher } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import { Draft, Filter, Paper, Plus } from "../../icons"
import Avatar from "../../ui/Avatar"
import Button from "../../ui/Button"
import Spinner from "../../ui/Spinner"
import TooltipButton from "../../ui/ToolTipButton"
import RegisterNewClosing from "./RegisterNewClosing"

const Closing = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [isNewClosing, setIsNewClosing] = useState(false)

  const { data, error, mutate } = useSWRImmutable(
    `/v1/branches/${selectedBranch.id}/closings`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return <span>{"Can't fetch closings"}</span>
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
      {isNewClosing && (
        <RegisterNewClosing
          onClose={() => setIsNewClosing(false)}
          mutate={mutate}
        />
      )}

      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Finance Management</h1>
            <p className="text-sm font-light">1,687 Days Closed</p>
          </div>

          <div className="flex gap-6">
            <TooltipButton text={"Filter"}>
              <Filter className="text-x-grey" />
            </TooltipButton>

            <TooltipButton text={"Download PDF"}>
              <Paper className="text-x-grey" />
            </TooltipButton>

            <Button onClick={() => setIsNewClosing(true)}>
              <Plus width={16} height={16} className="mr-2" />
              <span>New Closing</span>
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
                  Cash
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Eftpos
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Deliveroo
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Uber
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Menulog
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  DoorDash
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  OrderUp
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Notes
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
                  Total Income
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.closings.map((closing) => (
                <tr key={closing.id}>
                  <td className="whitespace-nowrap py-2.5 pl-8 pr-4 text-sm text-primary font-normal ">
                    {closing.cash}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {closing.eftpos}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {closing.deliveroo}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {closing.uber}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {closing.menulog}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {closing.doorDash}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {closing.orderUp}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    <div className="group relative ">
                      <Draft
                        width={16}
                        height={16}
                        className={`${
                          closing.note ? "cursor-pointer" : "opacity-30"
                        }`}
                      />
                      {closing.note && (
                        <span className=" hidden group-hover:block z-10 text-xs absolute -top-8 -left-4 bg-slate-400 p-1 rounded-2xl">
                          {closing.note}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {dayjs(closing.createdAt).format("DD MMM YYYY")}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar
                          user={closing.registeredBy}
                          width={36}
                          height={36}
                        />
                      </div>
                      {closing.registeredBy.fullName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-base text-primary font-medium ">
                    {closing.totalIncome} $
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

export default Closing
