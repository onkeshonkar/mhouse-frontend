import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { APIService } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import { useState } from "react"

const schema = z.object({
  password: z.string().regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
    message: "Password should be 8 char size with 1 number & 1 special char",
  }),
  newPassword: z
    .string()
    .regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
      message: "Password should be 8 char size with 1 number & 1 special char",
    }),
  cnfrmPassword: z
    .string()
    .regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
      message: "Password should be 8 char size with 1 number & 1 special char",
    }),
})

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false)

  const storeUser = useUserStore((store) => store.user)

  const onSubmit = async (data) => {
    setLoading(true)

    if (data.password === data.newPassword) {
      return toast.error("New password and current password can't be same!")
    }

    if (data.newPassword !== data.cnfrmPassword) {
      return toast.error("Password and confirm password do not match")
    }

    try {
      await APIService.patch(`/v1/user/${storeUser.id}/password`, {
        ...data,
      })

      toast.success("Password Updated!")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const { message } = error?.response?.data || error
      toast.error(message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })
  return (
    <div className="bg-white flex gap-11 px-9 py-6 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between flex-grow"
      >
        <Input
          type="password"
          label="Current Password"
          className="w-72"
          {...register("password")}
          error={errors.password}
        />
        <Input
          type="password"
          label="New Password"
          className="w-72"
          {...register("newPassword")}
          error={errors.newPassword}
        />
        <Input
          type="password"
          label="Confirm Password"
          className="w-72"
          {...register("cnfrmPassword")}
          error={errors.cnfrmPassword}
        />

        <Button loading={loading} className="self-center">
          Change Password
        </Button>
      </form>
    </div>
  )
}

export default UpdatePassword
