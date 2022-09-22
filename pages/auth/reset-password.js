import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Logo, Arrow } from "../../components/icons"
import { useRouter } from "next/router"

const schema = z.object({
  password: z.string().regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
    message: "Password should be 8 char size with 1 number & 1 special char",
  }),
  cnfrmPassword: z
    .string()
    .regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/, {
      message: "Password should be 8 char size with 1 number & 1 special char",
    }),
})

const user = {
  fullName: "Onkesh",
}

const ResetPassword = () => {
  const [valid, setValid] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    toast.success("data")
    console.log(data)
  }

  useEffect(() => {
    const { token } = router.query
    if (token) setValid(true)
  }, [router])

  return (
    <div className="w-full flex flex-col items-center">
      <div className="py-10">
        <Logo />
      </div>

      {valid ? (
        <div className="bg-white px-20 py-10 rounded-2xl text-center shadow-2xl">
          <h2 className="text-4xl font-semibold ">Password Reset</h2>
          <p className="text-sm font-normal opacity-50 mt-4">
            Hi {user.fullName}, choose your new password
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-10"
          >
            <Input
              type="password"
              label="New Password"
              autoComplete="password"
              {...register("password")}
              error={errors.password}
            />

            <Input
              type="password"
              label="Confirm New Password"
              autoComplete="password"
              {...register("cnfrmPassword")}
              error={errors.cnfrmPassword}
            />

            <Button className="mt-4">
              <span>Reset</span>
              <Arrow
                width={20}
                height={20}
                className="group-hover:translate-x-1 duration-300 ml-5"
              />
            </Button>
          </form>
        </div>
      ) : (
        <span> Link expired</span>
      )}
    </div>
  )
}
export default ResetPassword
