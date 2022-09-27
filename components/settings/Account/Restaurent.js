import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { APIService } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import { useState } from "react"

const schema = z
  .object({
    businessName: z.string().min(3, { message: "BusinessName is required" }),
    address: z.string().min(3, { message: "Address is required" }),
  })
  .required()

const Restaurent = () => {
  const [loading, setLoading] = useState(false)

  const user = useUserStore((store) => store.user)

  const onSubmit = async (data) => {
    try {
      await APIService.patch(
        `/v1/restaurents/${user.branch.restaurent.id}/businnes-details`,
        {
          ...data,
        }
      )

      toast.success("Business updated sucessfully")
      setLoading(false)
    } catch (error) {
      const { message } = error?.response?.data || ""
      toast.error(message)
      console.log(JSON.stringify(error))
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  return (
    <div className="bg-white flex gap-11 px-9 py-6 rounded-2xl">
      {user.type && user.type === "OWNER" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between  flex-grow"
        >
          <Input
            type="text"
            label="Bussiness Name"
            autoComplete="businessName"
            defaultValue={user.branch.restaurent?.businessName || ""}
            {...register("businessName")}
            error={errors.businessName}
          />

          <Input
            type="text"
            label="Main Branch Address"
            autoComplete="address"
            defaultValue={user.branch.restaurent.address || ""}
            {...register("address")}
            error={errors.address}
          />

          <Button loading={loading} className="self-center">
            Update Change
          </Button>
        </form>
      )}

      {!user.type ||
        (user.type === "MANAGER" && (
          <>
            <div className="bg-background text-primary rounded-2xl h-[50px] relative flex items-center min-w-[312px]">
              <div className="w-full text-sm px-6 pt-3">
                {user.branch.restaurent?.businessName || ""}
              </div>
              <span className="absolute text-xs opacity-50 left-6 top-1">
                Business Name
              </span>
            </div>
            <div className="bg-background text-primary rounded-2xl h-[50px] relative flex items-center min-w-[312px]">
              <div className="w-full text-sm px-6 pt-3">
                {user.branch.restaurent?.address || ""}
              </div>
              <span className="absolute text-xs opacity-50 left-6 top-1">
                Main Branch Address
              </span>
            </div>
          </>
        ))}
    </div>
  )
}

export default Restaurent
