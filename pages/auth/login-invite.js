import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Logo } from "../../components/icons"
import Avatar from "../../components/ui/Avatar"
import OTPBox from "../../components/ui/OTPBox"
import { useState } from "react"

const schema = z.object({
  password: z.string().regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
    message: "Password should be 8 char size with 1 number & 1 special char",
  }),
})

const user = {
  id: 1,
  fullName: "Onkesh",
  restaurent: "Chiken Shop",
  avatar:
    "https://assets.foodlert.com/sick-certificates/6325a65443820fc3a7c8052a-1663702770981.jpg",
}

const LoginInvite = () => {
  const [pin, setPin] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const [showOtpBox, setShowOtpBox] = useState(false) //  will ask otp for email verification

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const handleInvitation = (data) => {
    toast.error("PIN can't be empty")
    console.log(data)
  }

  const handleVerifyEmail = () => {
    console.log("hello")
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="py-10">
        <Logo />
      </div>

      <div className="bg-white px-20 py-10 rounded-2xl text-center shadow-2xl">
        {showOtpBox ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold">OTP Verification </h2>
            <p className="text-sm opacity-50">
              Enter otp sent to your registered email
            </p>

            <div className="mt-4">
              <OTPBox value={otp} handleValue={setOtp} />
            </div>

            <Button className="mt-10" onClick={handleVerifyEmail}>
              Submit
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-semibold">Login Invitation</h2>
            <p className="text-sm opacity-50 mt-4">
              <span className="font-medium">{user.restaurent}</span> sent you
              Invitation for Access Login
            </p>

            <div className="flex gap-4 items-center justify-center my-6">
              <div className="w-12 h-12 rounded-full">
                <Avatar user={user} height={100} width={100} />
              </div>

              <div className="flex flex-col items-star">
                <span className="text-sm">Welcome</span>
                <h3 className="text-base font-bold">{user.fullName}</h3>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleInvitation)}
              className="flex flex-col gap-6"
            >
              <Input
                type="password"
                label="Choose login Password"
                autoComplete="password"
                {...register("password")}
                error={errors.password}
              />

              <div>
                <span className=" block text-base font-medium opacity-50 mb-4">
                  Set your Foodlert PIN
                </span>

                <OTPBox value={pin} handleValue={setPin} />
              </div>

              <Button className="mt-1">Request OTP</Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
export default LoginInvite
