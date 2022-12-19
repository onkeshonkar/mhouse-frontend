import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import { Arrow, Close } from "../../icons"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import DepartmentList from "../../ui/DepartmentList"
import RoleList from "../../ui/RoleList"
import BranchList from "../../ui/BranchList"
import DefineAccess from "./DefineAccess"

const schema = z.object({
  ip: z.string().optional(),
  mac: z.string().optional(),
})

const TeamModal = ({ onClose, onSubmitTeam, emp }) => {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState(emp.user.roles.role || "")
  const [department, setDepartment] = useState(emp.department || "")
  const [branch, setBranch] = useState(emp.branch)
  const [access, setAccess] = useState(emp.user.roles.access)

  console.log(emp)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    if (!role) return toast.error("Please select a role")
    if (!department) return toast.error("Please select a department")

    setLoading(true)
    await onSubmitTeam({
      ...(data.ip && { ip: data.ip }),
      ...(data.mac && { mac: data.mac }),
      department,
      roles: { role, access },
      branch: branch.id,
    })
    setLoading(false)
  }
  return (
    <div className="max-w-8xl min-h-screen flex flex-col gap-11 relative">
      <button onClick={onClose} className="absolute right-0 mt-20">
        <Close />
      </button>
      <h2 className="text-4xl font-semibold mt-20">Basic Info For User</h2>

      <div className="flex gap-4">
        <Input
          type="text"
          label="Full Name"
          defaultValue={emp.user.fullName}
          disabled={true}
        />
        <Input
          type="text"
          label="Email"
          defaultValue={emp.user.email}
          disabled={true}
        />
        <Input
          type="text"
          label="Phone Number"
          defaultValue={emp.user.phoneNumber}
          disabled={true}
        />
      </div>

      <div className="flex justify-around">
        <Input
          type="text"
          label="Ip Address (optional)"
          defaultValue={emp.user.ip || ""}
          {...register("ip")}
          error={errors.ip}
        />

        <Input
          type="text"
          label="mac Address (optional)"
          defaultValue={emp.user.mac || ""}
          {...register("mac")}
          error={errors.mac}
        />
      </div>

      <div className="flex gap-9">
        <RoleList value={role} onChange={setRole} />
        <DepartmentList value={department} onChange={setDepartment} />
        <BranchList value={branch} onChange={setBranch} />
      </div>

      <DefineAccess access={access} setAccess={setAccess} />

      <div className="flex justify-between w-full mt-10 mb-20">
        <Button onClick={onClose}>
          <Arrow className="rotate-180 mr-2" />
          <span>Back</span>
        </Button>

        <Button onClick={handleSubmit(onSubmit)} loading={loading}>
          <span className="mr-2">Update</span>
          <Arrow />
        </Button>
      </div>
    </div>
  )
}

export default TeamModal
