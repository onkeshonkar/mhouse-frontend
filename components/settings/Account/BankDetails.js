import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import { mutate } from "swr"

import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { APIService } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import { useEffect, useState } from "react"
import SelectBankName from "../../ui/SelectBankName"
import SelectCurrency from "../../ui/SelectCurrency"

const schema = z
  .object({
    bankAccount: z.string().min(3, { message: "Bank Account is required" }),
  })
  .required()

const BankDetails = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [loading, setLoading] = useState(false)
  const [bankName, setBankName] = useState()
  const [currency, setCurrency] = useState()

  const onSubmit = async (data) => {
    try {
      await APIService.patch(`/v1/branches/${selectedBranch.id}/bank-details`, {
        bankAccount: data.bankAccount,
        bankName,
        currency,
      })

      toast.success("Bank Details updated.")
      setLoading(false)
      mutate(
        `/v1/restaurents/${selectedBranch.restaurent}/branches?details=semi`
      )
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
    setValue,
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    setBankName(selectedBranch.bankName || "")
    setCurrency(selectedBranch.currency || "")
    setValue("bankAccount", selectedBranch.bankAccount)
  }, [selectedBranch])

  return (
    <div className="bg-white flex gap-11 px-9 py-6 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between  flex-grow"
      >
        <div className="bg-background rounded-2xl relative overflow-hiddenl focus-within:ring-2 ring-accent flex items-center h-[50px] w-[312px]">
          <SelectBankName selectedBank={bankName} onChange={setBankName} />
        </div>

        <Input
          type="text"
          label="Bank Account"
          autoComplete="bankAccount"
          defaultValue={selectedBranch.bankAccount || ""}
          {...register("bankAccount")}
          error={errors.bankAccount}
        />

        <div className="bg-background rounded-2xl relative overflow-hiddenl focus-within:ring-2 ring-accent flex items-center h-[50px] w-[312px]">
          <SelectCurrency selectedCurrency={currency} onChange={setCurrency} />{" "}
        </div>

        <Button loading={loading} className="self-center">
          Update Change
        </Button>
      </form>
    </div>
  )
}

export default BankDetails
