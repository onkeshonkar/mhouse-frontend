import { useState } from "react"
import Image from "next/image"

import { Chevron, Print, Paper } from "../../components/icons"
import ListInput from "../../components/ui/ListInput"
import dayjs from "dayjs"
import TooltipButton from "../../components/ui/ToolTipButton"
import DepartmentList from "../../components/ui/DepartmentList"

const Report = () => {
  const [department, setDepartment] = useState()
  const [month, setMonth] = useState(dayjs().format("YYYY-MM-DD"))

  return (
    <div className="mt-8 ml-6 mr-4">
      <main>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-60">
              <DepartmentList value={department} onChange={setDepartment} />
            </div>

            <div className="flex items-center bg-white rounded-2xl px-6 py-3 w-72 gap-6 ml-6">
              <button
                onClick={() =>
                  setMonth(
                    dayjs(month).subtract(1, "month").format("YYYY-MM-DD")
                  )
                }
              >
                <Chevron className="text-accent rotate-90" />
              </button>

              <div className="text-sm text-primary font-normal opacity-50 flex justify-between w-full">
                <span>{dayjs(month).format("MMM D")}</span>
                <span>-</span>

                <span>{dayjs(month).add(6, "days").format("MMM D, YYYY")}</span>
              </div>

              <button
                onClick={() =>
                  setMonth(dayjs(month).add(1, "month").format("YYYY-MM-DD"))
                }
              >
                <Chevron className="text-accent -rotate-90" />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <TooltipButton text={"Print"}>
              <Print className="text-[#92929D]" />
            </TooltipButton>

            <TooltipButton text={"Download"}>
              <Paper className="text-[#92929D]" />
            </TooltipButton>
          </div>
        </div>

        <div className="mt-9 flex gap-4 flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </div>
  )
}

export default Report

const Card = () => {
  const employees = [
    {
      id: 1,
      name: "Charlie Anderson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=144&q=500",
      department: "Account",
    },
    {
      id: 2,
      name: "Charlie Anderson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=144&q=500",
      department: "Account",
    },
    {
      id: 3,
      name: "Charlie Anderson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=144&q=500",
      department: "Account",
    },
  ]
  return (
    <div className="bg-white p-6 rounded-2xl w-[410px]">
      <h2 className="text-base font-bold">Most Reliable</h2>

      <div className="h-44 overflow-y-scroll pr-1.5">
        {employees.map((employee) => (
          <div key={employee.id} className="flex items-center mt-5">
            <div className="w-9 h-9 rounded-full mr-4">
              <Image
                src={employee.avatar}
                alt="profile pic"
                width={36}
                height={36}
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <span className="text-base font-medium w-60">{employee.name}</span>

            <span className="text-sm font-light opacity-70">
              {employee.department}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
