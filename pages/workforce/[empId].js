import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tab } from "@headlessui/react"
import toast from "react-hot-toast"
import useSWR from "swr"
import dayjs from "dayjs"

import { Edit, Delete, Print, Notebook } from "../../components/icons"
import useUserStore from "../../stores/useUserStore"
import TooltipButton from "../../components/ui/ToolTipButton"
import Spinner from "../../components/ui/Spinner"
import { fetcher } from "../../lib/axios"
import Button from "../../components/ui/Button"

import EditEmpModal from "../../components/workforce/modals/EditEmpModal"
import TimeSheet from "../../components/workforce/BottomTabs/TimeSheet"
import Payroll from "../../components/workforce/BottomTabs/Payroll"
import Experience from "../../components/workforce/BottomTabs/Experience"
import Badges from "../../components/workforce/BottomTabs/Badges"
import SickCertificates from "../../components/workforce/BottomTabs/SickCertificate"
import Resume from "../../components/workforce/BottomTabs/Resume"
import Contact from "../../components/workforce/BottomTabs/Contact"
import EmployeeList from "../../components/workforce/EmployeeList"

const tabs = [
  { name: "Timesheet", panel: TimeSheet },
  { name: "Payroll", panel: Payroll },
  { name: "Badges", panel: Badges },
  { name: "Experience", panel: Experience },
  { name: "Sick Certificates", panel: SickCertificates },
  { name: "Resume", panel: Resume },
  { name: "Contact", panel: Contact },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Employee = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const user = useUserStore((store) => store.user)

  const route = useRouter()
  const empId = route.query.empId

  const { data, error, isLoading } = useSWR(
    user.type === "OWNER" || user.roles.access["WORKFORCE"].includes("view")
      ? `/v1/branches/${selectedBranch.id}/employees/${empId}`
      : null,
    fetcher,
    {
      errorRetryCount: 2,
    }
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
        <span className="mt-4 block text-center">{`No record exists for employee ${empId}`}</span>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const employee = data.employee
  return (
    <>
      <div className="mt-8 ml-6">
        <div className="flex gap-4">
          <main>
            <div className="w-[1015px]">
              <section className="flex gap-6 bg-white rounded-2xl px-6 py-7 mb-8">
                <div className="w-36 h-36 rounded-xl shadow-2xl">
                  <Image
                    src={employee.user.avatar}
                    alt="profile pic"
                    width={144}
                    height={144}
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>

                <div className="w-full flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-base font-bold">
                        {employee.user.fullName}
                        <span className="text-sm font-light opacity-50 ml-6">
                          # {employee.employeeId}
                        </span>
                      </h1>

                      <h3 className="text-sm font-normal opacity-70">
                        {employee.jobTitle} / {employee.department}
                      </h3>
                    </div>

                    <div className="flex gap-4 items-center">
                      <span className="w-2 h-2 block rounded-full bg-x-green" />
                      <span className="text-base font-medium text-x-gbg-x-green mr-6">
                        {employee.employementType}
                      </span>

                      <TooltipButton text={"Print"}>
                        <Print className="text-x-silver" />
                      </TooltipButton>

                      <TooltipButton text={"Edit"} className="bg-accent">
                        <Edit className="text-white" />
                      </TooltipButton>

                      <TooltipButton text={"Delete"} className="bg-x-red">
                        <Delete className="text-white" />
                      </TooltipButton>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-light">
                      <span className="opacity-50">Start Job in</span>
                      <p className="font-normal ">
                        <Notebook
                          width={16}
                          height={16}
                          className="inline mr-2"
                        />
                        {dayjs(employee.createdAt).format("DD MMM YYYY")}
                        <span className="opacity-50 pl-1">
                          (~
                          {dayjs(Date.now()).diff(employee.createdAt, "y")} y)
                        </span>
                      </p>
                    </div>

                    <div className="text-sm font-light">
                      <span className="opacity-50">Tenure</span>
                      <p className="font-normal mt-1">
                        {employee.tenure.duration} {employee.tenure.period}
                      </p>
                    </div>

                    <div className="text-sm font-light">
                      <span className="opacity-50">Branch Name</span>
                      <p className="font-normal mt-1">{employee.branch.name}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-normal">Annual Leave</div>
                        <div className="text-base font-bold">
                          <span className=" text-x-green">
                            {employee.annualLeave.consumed}
                          </span>
                          <span>/</span>
                          <span>{employee.annualLeave.available}</span>
                        </div>
                      </div>

                      <div className="w-44 h-1 rounded-sm bg-[#E2E2EA]">
                        <div
                          style={{
                            width:
                              Math.floor(
                                (176 * employee.annualLeave.consumed) /
                                  employee.annualLeave.available
                              ) + "px",
                          }}
                          className={`h-1 rounded-sm bg-x-green`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-light">
                      <span className="opacity-50">Date of Birth</span>
                      <p className="font-normal ">
                        <Notebook
                          width={16}
                          height={16}
                          className="inline mr-2"
                        />
                        {dayjs(employee.user.dateOfBirth).format("DD MMM YYYY")}
                        <span className="opacity-50 pl-1">
                          (~
                          {dayjs(new Date()).diff(
                            employee.user.dateOfBirth,
                            "y"
                          )}{" "}
                          y)
                        </span>
                      </p>
                    </div>

                    <div className="text-sm font-light">
                      <span className="opacity-50">visa/resident type</span>

                      <p className="font-normal">
                        {employee.visa.type}
                        {employee.visa.expiryDate && (
                          <span className="opacity-50 ml-2">
                            Expiry Date (
                            {dayjs(employee.visa.expiryDate).format(
                              "DD MMM YYYY"
                            )}
                            )
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-normal">Sick Leave</span>
                        <div className="text-base font-bold">
                          <span className=" text-x-green">
                            {employee.sickLeave.consumed}
                          </span>
                          <span>/</span>
                          <span>{employee.sickLeave.available}</span>
                        </div>
                      </div>

                      <div className="w-44 h-1 rounded-sm bg-[#E2E2EA]">
                        <div
                          style={{
                            width:
                              Math.floor(
                                (176 * employee.sickLeave.consumed) /
                                  employee.sickLeave.available
                              ) + "px",
                          }}
                          className={`h-1 rounded-sm bg-x-green`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl p-4 h-[360px]">
                <Tab.Group>
                  <Tab.List className="flex justify-between bg-background rounded-md">
                    {tabs.map((item) => (
                      <Tab
                        key={item.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "bg-[#92929D] text-white"
                              : "text-[#92929D]",
                            "text-base font-medium px-6 py-1.5 rounded-md transition-all duration-200 outline-none"
                          )
                        }
                      >
                        {item.name}
                      </Tab>
                    ))}
                  </Tab.List>

                  <Tab.Panels>
                    {tabs.map((item) => (
                      <Tab.Panel key={item.name}>
                        <item.panel employee={employee} />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </section>
            </div>
          </main>

          <aside>
            <EmployeeList empId={empId} />
          </aside>
        </div>
      </div>
    </>
  )
}

export default Employee
