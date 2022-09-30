import { useEffect, useState } from "react"
import useSWRImmutable from "swr/immutable"

import { Plus, Edit, Delete } from "../../icons"
import Button from "../../ui/Button"
import useUserStore from "../../../stores/useUserStore"
import { APIService, fetcher } from "../../../lib/axios"
import Avatar from "../../ui/Avatar"
import BranchModal from "./BranchModal"
import ConfirmModal from "../../ui/ConfirmModal"
import toast from "react-hot-toast"
import Spinner from "../../ui/Spinner"

const MyBranch = () => {
  const [isAddBranchModal, setIsAddBranchModal] = useState(false)
  const [isEditBranchModal, setIsEditBranchModal] = useState(false)
  const [isDeleteBranchModal, setIsDeleteBranchModal] = useState(false)
  const [branchToModify, setBranchToModify] = useState()

  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const { data, error, mutate } = useSWRImmutable(
    `/v1/restaurents/${selectedBranch.restaurent}/branches?manager=true`,
    fetcher
  )

  const onEditBranch = (e) => {
    const clickedBranchId = e.currentTarget.name
    const branch = data.branches.find((b) => b.id === clickedBranchId)
    setBranchToModify(branch)
    setIsEditBranchModal(!isEditBranchModal)
  }

  const onDeleteBranch = (e) => {
    const clickedBranchId = e.currentTarget.name
    const branch = data.branches.find((b) => b.id === clickedBranchId)
    setBranchToModify(branch)

    setIsDeleteBranchModal(!isDeleteBranchModal)
  }

  const handleAddBranch = async (data) => {
    try {
      await APIService.post(
        `/v1/restaurents/${selectedBranch.restaurent}/branches`,
        { ...data }
      )
      toast.success("Branch added")
      mutate()
    } catch (error) {
      const { message } = error?.response?.data || "Can't add Branch"
      toast.error(message)
      console.log(JSON.stringify(error))
    }
    setIsAddBranchModal(false)
  }

  const handleEditBranch = async (branch) => {
    try {
      await APIService.patch(
        `/v1/restaurents/${selectedBranch.restaurent}/branches/${branchToModify.id}`,
        { ...branch }
      )
      toast.success("Branch updated")
      await mutate()
    } catch (error) {
      const { message } = error?.response?.data || "Can't update Branch"
      toast.error(message)
      console.log(JSON.stringify(error))
    }
    setIsEditBranchModal(!isEditBranchModal)
    setBranchToModify(undefined)
  }

  const handleDeleteBranch = async () => {
    try {
      await APIService.delete(
        `/v1/restaurents/${selectedBranch.restaurent}/branches/${branchToModify.id}`
      )
      toast.success("Branch Deleted")
      await mutate()
    } catch (error) {
      const { message } = error?.response?.data || error
      toast.error(message)
    }

    setIsDeleteBranchModal(!isDeleteBranchModal)
    setBranchToModify(undefined)
  }

  if (error) return toast.error(JSON.stringify(error))

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  return (
    <>
      {isAddBranchModal && (
        <BranchModal
          onClose={() => setIsAddBranchModal(false)}
          onSubmitBranch={handleAddBranch}
        />
      )}

      {isEditBranchModal && (
        <BranchModal
          branch={branchToModify}
          onClose={() => setIsEditBranchModal(false)}
          onSubmitBranch={handleEditBranch}
        />
      )}

      {isDeleteBranchModal && (
        <ConfirmModal
          onConfirm={handleDeleteBranch}
          onClose={() => setIsDeleteBranchModal(false)}
        />
      )}

      <div className="relative">
        <div className=" absolute right-4 -top-20">
          <Button
            onClick={() => {
              setIsAddBranchModal(!isAddBranchModal)
            }}
          >
            <Plus width={15} height={15} />
            <span className="ml-2">New</span>
          </Button>
        </div>

        <div>
          <table className="min-w-full border-spacing-y-1 border-separate">
            <thead className='bg-[#F1F1F5] leading-5 after:content-["."] after:block after:bg-background after:text-transparent'>
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                >
                  Branch Name
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Location Address
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Branch Manager
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
              {data.branches.map((branch) => (
                <tr key={branch.id} className=" bg-white">
                  <td className="whitespace-nowrap py-5  pl-8 pr-4 text-sm text-primary font-normal ">
                    {branch.name}
                  </td>
                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {branch.address || (
                      <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded-xl">
                        Set Main Branch Address
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap py-2 px-4 text-sm text-primary font-normal ">
                    <div className="flex gap-4 items-center">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar user={branch.manager} width={36} height={36} />
                      </div>
                      <div className="flex flex-col items-start">
                        {branch.manager.fullName}
                        <span className="block text-xs">
                          {branch.manager.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {!branch.isMainBranch && (
                      <div className="flex gap-8">
                        <button onClick={onEditBranch} name={branch.id}>
                          <Edit width={20} height={20} />
                        </button>

                        <button onClick={onDeleteBranch} name={branch.id}>
                          <Delete
                            width={20}
                            height={20}
                            className="text-x-red"
                          />
                        </button>
                      </div>
                    )}
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

export default MyBranch
