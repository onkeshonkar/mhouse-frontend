import { useEffect, useState } from "react"
import Link from "next/link"
import useSWRImmutable from "swr/immutable"
import toast from "react-hot-toast"

import { Plus, Edit, Delete, Filter } from "../../components/icons"
import useUserStore from "../../stores/useUserStore"
import TooltipButton from "../../components/ui/ToolTipButton"
import Spinner from "../../components/ui/Spinner"
import { fetcher } from "../../lib/axios"
import Avatar from "../../components/ui/Avatar"
import Button from "../../components/ui/Button"
import AddEmpModal from "../../components/workforce/modals/AddEmpModal"
import EditEmpModal from "../../components/workforce/modals/EditEmpModal"

const Workforce = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [isAddEmpModal, setIsAddEmpModal] = useState(false)
  const [isEditEmpModal, setIsEditEmpModal] = useState(false)
  const [empToModify, setEmpToModify] = useState()

  const { data, error, mutate } = useSWRImmutable(
    `/v1/branches/${selectedBranch.id}/employees`,
    fetcher
  )

  const onEditEmp = (e) => {
    const clickedEmpId = e.currentTarget.name
    const emp = data.employees.find((p) => p.id === clickedEmpId)
    setEmpToModify(emp)
    setIsEditEmpModal(true)
  }

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return <span>{"Can't fetch employee list"}</span>
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )
  const { employees } = data
  const todaysEmploye = employees.length
  const nowEmploye = 0

  return (
    <>
      {isAddEmpModal && (
        <AddEmpModal
          onCancel={() => {
            setIsAddEmpModal(false)
            mutate()
          }}
        />
      )}

      {isEditEmpModal && (
        <EditEmpModal
          onCancel={() => {
            setIsEditEmpModal(false)
            mutate()
          }}
          emp={empToModify}
        />
      )}

      <div className="mt-8 ml-6">
        <main>
          <header className="flex justify-between items-center px-4">
            <div>
              <h1 className="text-2xl font-bold">Workforce Management</h1>
              <p className="text-sm font-light">
                {employees.length} Total Employees
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-normal">Employees Working Today</p>
                <div className="text-base font-bold">
                  <span className="text-x-green">{todaysEmploye}</span>
                  <span> / </span>
                  <span>{employees.length}</span>
                </div>
              </div>

              <div className="w-56 h-1 rounded-sm bg-[#E2E2EA]">
                <div
                  style={{
                    width:
                      Math.floor((224 * todaysEmploye) / employees.length) +
                      "px",
                  }}
                  className={`h-1 rounded-sm bg-x-green`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-normal">Employees Working Now</p>
                <div className="text-base font-bold">
                  <span className="text-x-green">{nowEmploye}</span>
                  <span> / </span>
                  <span>{employees.length}</span>
                </div>
              </div>

              <div className="w-56 h-1 rounded-sm bg-[#E2E2EA]">
                <div
                  style={{
                    width:
                      Math.floor((224 * nowEmploye) / employees.length) + "px",
                  }}
                  className={`h-1 rounded-sm bg-[#3DD598]`}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <TooltipButton text={"Filter"}>
                <Filter className="text-x-grey" />
              </TooltipButton>

              <Button onClick={() => setIsAddEmpModal(true)}>
                <Plus width={20} height={20} className="mr-2" />
                <span>New Employee</span>
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
                    ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm text-primary font-normal text-left px-4 py-2"
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm text-primary font-normal text-left px-4 py-2"
                  >
                    Title / Department
                  </th>
                  <th
                    scope="col"
                    className="text-sm text-primary font-normal text-left px-4 py-2"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-sm text-primary font-normal text-left px-4 py-2"
                  >
                    Tenure
                  </th>
                  <th
                    scope="col"
                    className="text-sm text-primary font-normal text-left px-4 py-2"
                  >
                    Payroll Group
                  </th>

                  <th
                    scope="col"
                    className="text-sm text-primary font-normal text-left px-4 py-2"
                  >
                    Last Salary
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
                {data.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="whitespace-nowrap py-5 pl-8 pr-4 text-sm text-primary font-normal ">
                      {employee.employeeId}
                    </td>

                    <td className="whitespace-nowrap py-2 px-4 text-sm text-primary font-normal ">
                      <Link href={`/workforce/${employee.id}`}>
                        <a>
                          <div className="flex gap-4 items-center">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                              <Avatar
                                width={36}
                                height={36}
                                user={employee.user}
                              />
                            </div>
                            <div className="flex flex-col">
                              {employee.user.fullName}
                              <span className="text-xs">
                                {employee.user.email}
                              </span>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </td>

                    <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                      {employee.jobTitle} / {employee.department}
                    </td>

                    <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                      {employee.employementType}
                    </td>

                    <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                      {`${employee.tenure.duration} ${employee.tenure.period}`}
                    </td>

                    <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                      {employee.payrollGroup.name}
                    </td>

                    <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                      {employee.lastSalary}
                      {!employee.lastSalary && (
                        <span className="py-1 px-2 bg-red-100 text-red-700 rounded-md">
                          unavailable
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                      <button name={employee.id} onClick={onEditEmp}>
                        <Edit width={20} height={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  )
}

export default Workforce
