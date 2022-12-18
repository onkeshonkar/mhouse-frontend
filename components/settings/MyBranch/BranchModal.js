import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import { Arrow } from "../../icons"
import Input from "../../ui/Input"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import UserList from "../../ui/UserList"

const schema = z.object({
  branchName: z.string().min(2, { message: "Must be at least 2 chars" }),
  address: z.string().min(10, { message: "Must be at least 10 chars" }),
})

const BranchModal = ({ onClose, onSubmitBranch, branch }) => {
  const [loading, setLoading] = useState(false)
  const [manager, setManager] = useState(branch ? branch.manager : undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    if (!manager) return toast.error("Please select a Manager")
    setLoading(true)
    await onSubmitBranch({
      name: data.branchName,
      address: data.address,
      manager: manager.id,
    })
    setLoading(false)
  }

  return (
    <div className="px-9 py-12 bg-white rounded-2xl">
      <h3 className="text-4xl leading-6 font-medium">
        {branch ? "Update" : "New"} Branch
      </h3>

      <div className="flex gap-12 mt-12 ">
        <Input
          type="text"
          label="Branch Name"
          defaultValue={branch && branch.name}
          {...register("branchName")}
          error={errors.branchName}
          className="w-72"
        />

        <div className="bg-background rounded-2xl focus-within:ring-2 ring-accent flex items-center h-[50px] w-72">
          <UserList
            value={manager}
            onChange={setManager}
            placeholder={"Select Branch Manager"}
          />
        </div>
      </div>

      <div className="mt-6">
        <Input
          type="text"
          defaultValue={branch && branch.address}
          label="Location Address"
          {...register("address")}
          error={errors.address}
          className="min-w-full"
        />
      </div>

      <div className="flex justify-between items-center mt-16">
        <Button onClick={onClose}>
          <Arrow className="rotate-180 mr-4" />
          <span>Back</span>
        </Button>

        <Button loading={loading} onClick={handleSubmit(onSubmit)}>
          <span>{branch ? "Update" : "Add"} Branch</span>
          <Arrow className="ml-4" />
        </Button>
      </div>
    </div>
  )
}

export default BranchModal
