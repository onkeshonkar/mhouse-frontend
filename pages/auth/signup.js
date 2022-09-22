import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Arrow, Logo } from "../../components/icons"
import { useState } from "react"
import OTPBox from "../../components/ui/OTPBox"

const schema = z.object({
  venueName: z
    .string()
    .min(3, { message: "Venue should be at least 3 char" })
    .max(50),
  fullName: z
    .string()
    .min(3, { message: "Name should be at least 3 char" })
    .max(50),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone should be 10 digits" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
    message: "Password should be 8 char size with 1 number & 1 special char",
  }),
  cnfPassword: z
    .string()
    .regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
      message: "Password should be 8 char size with 1 number & 1 special char",
    }),
})

const Signup = () => {
  const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const [showOtpBox, setShowOtpBox] = useState(false) //  will ask otp for email verification

  const handleVerifyEmail = () => {
    console.log("hello")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => console.log(data)

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
            <h1 className="text-4xl font-semibold">Getting Started</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-9">
                <Input
                  type="text"
                  label="Venue Name"
                  autoComplete="venueName"
                  {...register("venueName")}
                  error={errors.venueName}
                />
                <Input
                  type="text"
                  label="Full Name"
                  autoComplete="fullName"
                  {...register("fullName")}
                  error={errors.fullName}
                />
                <Input
                  type="phoneNumber"
                  label="Phone Number"
                  autoComplete="phoneNumber"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber}
                />
                <Input
                  type="email"
                  label="Email"
                  autoComplete="email"
                  {...register("email")}
                  error={errors.email}
                />
                <Input
                  type="password"
                  label="Password"
                  autoComplete="password"
                  {...register("password")}
                  error={errors.password}
                />
                <Input
                  type="password"
                  label="Confirm-Password"
                  autoComplete="password"
                  {...register("cnfPassword")}
                  error={errors.cnfPassword}
                />
                <div className="col-span-2 mt-5 text-start flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    required
                    className="border-[#F1F1F5] border-2 rounded focus:ring-0 h-4 w-4 focus:outline-none shadow-lg"
                  />
                  <label htmlFor="terms" className="text-sm font-light ml-4">
                    By Creating Account you are Agree Our{" "}
                    <a href="/terms" className="text-accent hover:underline">
                      Terms & Privacy
                    </a>
                  </label>
                </div>
              </div>

              <Button className="mx-auto mt-12">
                <span>Create Account</span>
                <Arrow
                  width={20}
                  height={20}
                  className="group-hover:translate-x-1 duration-300 ml-6"
                />
              </Button>
            </form>{" "}
          </>
        )}
      </div>

      {!showOtpBox && (
        <p className="text-sm mt-10">
          <span>Already have account?&#160; </span>
          <a href="login" className="text-accent hover:underline">
            Login now
          </a>
        </p>
      )}
    </div>
  )
}
export default Signup
