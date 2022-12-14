import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import toast from "react-hot-toast"

import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Arrow, Logo } from "../../components/icons"
import { useRef, useState } from "react"
import OTPBox from "../../components/ui/OTPBox"
import useRedirectDashboard from "../../hooks/useRedirectDashboard"
import useUserStore from "../../stores/useUserStore"
import { APIService } from "../../lib/axios"
import { useRouter } from "next/router"

const schema = z.object({
  venueName: z
    .string()
    .min(3, { message: "Venue should be at least 3 char" })
    .max(50),
  fullName: z
    .string()
    .min(3, { message: "Name should be at least 3 char" })
    .max(50),
  phoneNumber: z.string().regex(/^(\+61)\d{10}$/, {
    message: "Phone No.should be 10 digits with country code +61",
  }),
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
  useRedirectDashboard()

  const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const [showOtpBox, setShowOtpBox] = useState(false) //  will ask otp for email verification
  const [loading, setLoading] = useState(false)

  const otpTokenRef = useRef()
  const router = useRouter()

  const setAuthToken = useUserStore((store) => store.setAuthToken)
  const setUser = useUserStore((store) => store.setUser)
  const setSelectedBranch = useUserStore((store) => store.setSelectedBranch)

  const handleVerifyEmail = async () => {
    const OTP = Object.values(otp).join("")
    setLoading(true)

    try {
      const res = await APIService.post("/v1/user/auth/verify-otp", {
        otp: OTP,
        verifyOTPToken: otpTokenRef.current,
      })

      const { user, authToken } = res.data
      toast.success("Signup successfull")
      setLoading(false)
      setUser(user)
      setAuthToken(authToken)
      setSelectedBranch(user.branch)
      router.replace("/dashboard")
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
      setLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    if (data.password !== data.cnfPassword) {
      return toast.error("Passwords do not match!")
    }

    setLoading(true)
    console.log(data)
    try {
      const res = await APIService.post("/v1/user/auth/signup", { ...data })

      const { verifyOTPToken, message } = res.data

      toast.success(message, { duration: 2000 })
      otpTokenRef.current = verifyOTPToken
      setLoading(false)
      setShowOtpBox(true)
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
    <div className="w-full flex flex-col items-center">
      <div className="py-10">
        <Logo />
      </div>

      <div className="bg-white px-20 py-10 rounded-2xl text-center shadow-2xl">
        {showOtpBox ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold">OTP Verification </h2>
            <p className="text-sm opacity-50">Please Check Your Email</p>

            <div className="mt-4">
              <OTPBox value={otp} handleValue={setOtp} />
            </div>

            <Button
              loading={loading}
              className="mt-10"
              onClick={handleVerifyEmail}
            >
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
                  type="text"
                  label="Phone Number"
                  defaultValue={"+61"}
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

              <Button loading={loading} className="mx-auto mt-12">
                <span>Create Account</span>
                <Arrow
                  width={20}
                  height={20}
                  className="group-hover:translate-x-1 duration-300 ml-6"
                />
              </Button>
            </form>
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
