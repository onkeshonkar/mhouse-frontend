import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { APIService } from "../../../lib/axios"
import { Camera } from "../../icons"
import Avatar from "../../ui/Avatar"
import useUserStore from "../../../stores/useUserStore"
import { useState } from "react"
import dayjs from "dayjs"
import useFileReader from "../../../hooks/useFileReader"

const schema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name should be at least 3 char" })
    .max(50),
  phoneNumber: z.string().regex(/^(\+91)\d{10}$/, {
    message: "Phone No.should be 10 digits with country code +91",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
  dateOfBirth: z.string({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
})

const Profile = () => {
  const [loading, setLoading] = useState(false)

  const storeUser = useUserStore((store) => store.user)
  const setUser = useUserStore((store) => store.setUser)

  const { file, onDiscard, onSelect } = useFileReader(
    "image/png, image/jpg, image/jpeg"
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await APIService.patch(`/v1/user/${storeUser.id}/profile`, {
        ...data,
      })

      let { user } = res.data

      if (file) {
        let formData = new FormData()
        formData.append("avatar", file)
        formData.append("userId", storeUser.id)
        try {
          const uploadResponse = await APIService.post(
            `/v1/uploads/avatar`,
            formData
          )

          user.avatar =
            "https://assets.foodlert.com/" + uploadResponse.data.msg.Key
        } catch (error) {
          toast.custom(JSON.stringify(error))
        }
      }
      setLoading(false)
      toast.success("Profile updated")
      setUser(user)
    } catch (error) {
      setLoading(false)
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
  }

  return (
    <div className="bg-white flex gap-11 px-9 py-6 rounded-2xl">
      <div className="bg-primary w-28 h-28 rounded-full relative flex items-center justify-center group cursor-pointer">
        {!file && <Avatar user={storeUser} height={120} width={120} />}
        {file && (
          <Avatar
            user={{ avatar: URL.createObjectURL(file) }}
            height={120}
            width={120}
          />
        )}

        <button
          onClick={onSelect}
          className="absolute w-full h-full hidden group-hover:flex items-center justify-center bg-primary opacity-40 rounded-full "
        >
          <Camera width={50} height={50} className="text-gray-300" />
        </button>

        {file && (
          <button
            onClick={onDiscard}
            className="absolute top-5 right-5 bg-gray-100 bg-opacity-30 p-0.5 text-red-600 rounded-full  hidden group-hover:flex "
          >
            <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      <form
        className="flex gap-4 flex-grow justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Full Name"
            autoComplete="fullName"
            className="w-[350px]"
            defaultValue={storeUser.fullName}
            {...register("fullName")}
            error={errors.fullName}
          />

          <Input
            type="date"
            label="Date of birth"
            autoComplete="dateOfBirth"
            className="w-[350px]"
            defaultValue={
              (storeUser.dateOfBirth &&
                dayjs(storeUser.dateOfBirth).format("YYYY-MM-DD")) ||
              ""
            }
            {...register("dateOfBirth")}
            error={errors.dateOfBirth}
          />
          <Input
            type="text"
            label="Phone Number"
            autoComplete="phoneNumber"
            className="w-[350px]"
            defaultValue={storeUser.phoneNumber}
            {...register("phoneNumber")}
            error={errors.phoneNumber}
          />

          <Input
            type="email"
            label="Email"
            autoComplete="email"
            className="w-[350px]"
            defaultValue={storeUser.email}
            {...register("email")}
            error={errors.email}
          />
        </div>

        <Button loading={loading} className="self-center">
          Update Profile
        </Button>
      </form>
    </div>
  )
}

export default Profile
