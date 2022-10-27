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
import RegisterNewSafe from "./RegisterNewSafe"

const SafeDeposit = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [isAddNewSafe, setIsAddNewSafe] = useState(false)

  const { data, error, mutate } = useSWRImmutable(
    `/v1/branches/${selectedBranch.id}/safe-deposits`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return <span>{"Can't fetch safe deposits"}</span>
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
      {isAddNewSafe && (
        <RegisterNewSafe onClose={() => setIsAddNewSafe(false)} />
      )}
      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Finance Management</h1>
            <p className="text-sm font-light">800 $ in Safe Now</p>
          </div>

          <div className="flex gap-6">
            <TooltipButton text={"Filter"}>
              <Filter className="text-x-grey" />
            </TooltipButton>

            <TooltipButton text={"Download PDF"}>
              <Paper className="text-x-grey" />
            </TooltipButton>

            <Button onClick={() => setIsAddNewSafe(true)}>
              <Plus width={16} height={16} className="mr-2" />
              <span>New Deposit</span>
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
                  Comment
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
              {data.safeDeposits.map((safe) => (
                <tr key={safe.id}>
                  <td className="whitespace-nowrap py-2.5 pl-8 pr-4 text-sm text-primary font-normal ">
                    {safe["5C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["10C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["20C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["50C"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["1$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["2$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["5$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["10$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["20$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["50$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {safe["100$"]}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    <div className="group relative ">
                      <Draft
                        width={16}
                        height={16}
                        className={`${
                          safe.comment ? "cursor-pointer" : "opacity-30"
                        }`}
                      />
                      {safe.comment && (
                        <span className=" hidden group-hover:block z-10 text-xs absolute -top-8 -left-4 bg-slate-400 p-1 rounded-2xl">
                          {safe.comment}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar
                          user={safe.registeredBy}
                          width={36}
                          height={36}
                        />
                      </div>
                      {safe.registeredBy.fullName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {dayjs(safe.createdAt).format("DD MMM YYYY")}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-base text-primary font-medium ">
                    {safe.totalAmount} $
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

export default SafeDeposit
