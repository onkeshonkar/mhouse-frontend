import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Logo } from "../../components/icons"
import { useRef, useState } from "react"
import OTPBox from "../../components/ui/OTPBox"
import useUserStore from "../../stores/useUserStore"
import { useRouter } from "next/router"
import useRedirectDashboard from "../../hooks/useRedirectDashboard"
import { APIService } from "../../lib/axios"

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
    message: "Password should be 8 char size with 1 number & 1 special char",
  }),
})

const Login = () => {
  useRedirectDashboard()

  const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const [showOtpBox, setShowOtpBox] = useState(false) //  will ask otp for email verification

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const otpTokenRef = useRef()

  const setAuthToken = useUserStore((store) => store.setAuthToken)
  const setUser = useUserStore((store) => store.setUser)

  const handleVerifyEmail = async () => {
    setLoading(true)
    const OTP = Object.values(otp).join("")
    setLoading(true)

    try {
      const res = await APIService.post("/v1/user/auth/verify-otp", {
        otp: OTP,
        verifyOTPToken: otpTokenRef.current,
      })

      const { user, authToken } = res.data
      setLoading(false)
      toast.success("Login successfull")

      setUser(user)
      setAuthToken(authToken)
      router.replace("/dashboard")
    } catch (error) {
      const { message } = error.response?.data
      toast.error(message)
      setLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      const res = await APIService.post("/v1/user/auth/login", { ...data })

      const { user, authToken, verifyOTPToken, message } = res.data

      if (verifyOTPToken) {
        toast.success(message, { duration: 2000 })
        setLoading(false)
        setShowOtpBox(true)
        otpTokenRef.current = verifyOTPToken
        return
      }
      setLoading(false)
      toast.success("Welcome Back")
      setUser(user)
      setAuthToken(authToken)
      router.replace("/dashboard")
    } catch (error) {
      setLoading(false)
      const { message } = error?.response?.data
      toast.error(message || JSON.stringify(error))
      console.log(error)
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
              Verify
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-semibold ">Welcome Back</h2>
            <p className="text-sm font-normal opacity-50 mt-4">
              Enter Your Details To Access Your Account
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-10"
            >
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
              <a
                href="forgot-password"
                className="text-right text-sm font-thin inline-block text-accent hover:underline"
              >
                Forgot Password?
              </a>
              <Button loading={loading}>Sign In</Button>
            </form>
          </>
        )}
      </div>

      {!showOtpBox && (
        <p className="mt-9 text-sm">
          <span>Don&#39;t have account yet? </span>
          <a href="signup" className="ml-1 text-accent hover:underline">
            Create Account
          </a>
        </p>
      )}
    </div>
  )
}
export default Login
