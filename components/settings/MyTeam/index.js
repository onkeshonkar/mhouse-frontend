import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"

import { APIService, fetcher } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"

import { Plus, Edit, Delete } from "../../icons"
import Spinner from "../../ui/Spinner"
import TeamModal from "./TeamModal"

const MyTeam = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [isUpdateTeamModal, setIsUpdateTeamModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState()

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/employees`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  const onEditTeam = (e) => {
    const clickedEmpId = e.currentTarget.name
    const emp = data.employees.find((e) => e.id === clickedEmpId)
    setSelectedMember(emp)
    setIsUpdateTeamModal(true)
  }

  const handleEditTeam = async (data) => {
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/employees/${selectedMember.id}/access`,
        { ...data }
      )
      toast.success("Emplyoyee permissions updated")
      await mutate()
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    setIsUpdateTeamModal(false)
    setSelectedMember(undefined)
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
      {isUpdateTeamModal && (
        <TeamModal
          onClose={() => setIsUpdateTeamModal(false)}
          onSubmitTeam={handleEditTeam}
          emp={selectedMember}
        />
      )}

      <div className="relative">
        <div>
          <table className="min-w-full border-spacing-y-1 border-separate">
            <thead className='bg-[#F1F1F5] leading-5 after:content-["."] after:block after:bg-background after:text-transparent'>
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Branch
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
              {data.employees.map((emp) => (
                <tr key={emp.id} className="bg-white">
                  <td className="whitespace-nowrap py-5 pl-8 pr-4 text-sm text-primary font-normal flex flex-col items-start">
                    {emp.user.fullName}
                    <span className="bg-green-100 text-x-green text-[10px] px-2 rounded-full">
                      {emp.user.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {emp.user.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {emp.user.email}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {emp.department}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {emp.user.roles.role ? (
                      emp.user.roles.role
                    ) : (
                      <span className="bg-pink-100-100 text-x-red text-[10px] px-2 rounded-full">
                        {"Not assigned"}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {emp.branch.name}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    <div className="flex gap-8">
                      <button onClick={onEditTeam} name={emp.id}>
                        <Edit width={20} height={20} />
                      </button>
                      {/* <button onClick={() => onDeleteTeam(emp)}>
                        <Delete
                          width={20}
                          height={20}
                          className="text-[#FC5A5A]"
                        />
                      </button> */}
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

export default MyTeam
