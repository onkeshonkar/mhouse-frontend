import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { APIService } from "../../../lib/axios"

import useUserStore from "../../../stores/useUserStore"
import { Arrow, Close } from "../../icons"
import Button from "../../ui/Button"
import CurrencyCount from "../../ui/CurrencyCount"
import Modal from "../../ui/Modal"
import OTPBox from "../../ui/OTPBox"
import RadioInput from "../../ui/RadioInput"

const times = ["Breakfast", "Lunch", "Dinner", "Night"]

const RegisterNewCash = ({ onClose, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [pin, setPin] = useState({ 0: "", 1: "", 2: "", 3: "" })

  const [isLoading, setIsLoading] = useState(false)
  const [time, setTime] = useState(times[0])
  const currencyRef = useRef()

  const onSubmit = async () => {
    setIsLoading(true)
    const data = { ...currencyRef.current.currency, time }

    try {
      await APIService.post(
        `/v1/branches/${selectedBranch.id}/cash-register`,
        data
      )
      toast.success("Cash registered")
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    setIsLoading(false)
    mutate()
    onClose()
  }

  return (
    <div className="flex flex-col relative ">
      <button onClick={onClose} className="absolute right-0 mt-10">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-10">Register New Cash</h2>

      <div className="flex flex-col items-center gap-20">
        <RadioInput onChange={setTime} value={time} options={times} />

        <CurrencyCount ref={currencyRef} />
      </div>

      <div className="flex items-center justify-between mt-24 w-laptop">
        <Button onClick={onClose} className="bg-primary" gradient={false}>
          <Arrow
            width={20}
            height={20}
            className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
          />
          <span> Back</span>
        </Button>

        <div className="flex items-center gap-4">
          <span>Enter Your PIN</span>
          <OTPBox value={pin} handleValue={setPin} />
        </div>

        <Button onClick={onSubmit} loading={isLoading}>
          <span>Submit</span>
          <Arrow
            width={20}
            height={20}
            className="ml-6 group-hover:translate-x-1 duration-300"
          />
        </Button>
      </div>
    </div>
  )
}

export default RegisterNewCash
