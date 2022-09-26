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
  bankAccount: z.string(),
})

const BankDetails = () => {
  const [loading, setLoading] = useState(false)

  const storeUser = useUserStore((store) => store.user)

  const onSubmit = async (data) => {
    console.log(data)

    try {
      await APIService.patch(`/v1/user/${storeUser.id}/password`, {
        ...data,
      })

      toast.success("Password Updated!")
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
      BankDetails
    </div>
  )
}

export default BankDetails
