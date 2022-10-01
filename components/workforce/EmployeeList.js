import { Fragment, useState } from "react"
import useSWR from "swr"
import { Combobox } from "@headlessui/react"

import toast from "react-hot-toast"

import { Chevron, Check } from "../icons"
import { fetcher } from "../../lib/axios"

import useUserStore from "../../stores/useUserStore"
import Input from "../ui/Input"
import Spinner from "../ui/Spinner"
import Avatar from "../ui/Avatar"
import Link from "next/link"

const EmployeeList = ({ empId }) => {
  const [query, setQuery] = useState("")

  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/employees`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  if (!data) return null

  if (error) return <span>{JSON.stringify(error)}</span>

  const emps = data.employees

  const filteredEmps =
    query === ""
      ? emps
      : emps.filter((emp) => {
          return emp.user.fullName.toLowerCase().includes(query.toLowerCase())
        })

  if (error) return toast.error(JSON.stringify(error))

  if (!data)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    )

  return (
    <div className="flex flex-col gap-4 items-start">
      <h2 className="text-sm font-light">{emps.length} Total Employees</h2>

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search Name..."
        className="w-full bg-orange-50"
      />

      <div className="w-full">
        {filteredEmps.map((emp) => (
          <Link key={emp.id} href={emp.id}>
            <a
              className={`${
                emp.id == empId && "ring-2 ring-accent"
              } p-4 rounded-md bg-white flex mb-1`}
            >
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sky-500">
                  <Avatar user={emp.user} width={36} height={36} />
                </div>

                <div className=" flex flex-col">
                  <span className="text-sm font-light">
                    {emp.user.fullName}
                  </span>
                  <span className="text-xs font-normal opacity-60">
                    {emp.jobTitle} / {emp.department}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default EmployeeList
