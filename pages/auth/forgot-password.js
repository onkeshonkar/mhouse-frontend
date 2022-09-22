import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Logo, Arrow } from "../../components/icons"
import { useState } from "react"

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
})

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    toast.success("data")
    console.log(data)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="py-10">
        <Logo />
      </div>

      <div className="bg-white px-20 py-10 rounded-2xl text-center shadow-2xl">
        <h2 className="text-4xl font-medium">Enter Your Email</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-10"
        >
          <Input
            type="email"
            label="Email"
            autoComplete="email"
            {...register("email")}
            error={errors.email}
          />

          <Button className="mt-4">
            <span>Submit</span>
            <Arrow
              width={20}
              height={20}
              className="group-hover:translate-x-1 duration-300 ml-5"
            />
          </Button>
        </form>
      </div>
    </div>
  )
}
export default ForgotPassword
