import { useRef, useState } from "react"
import { toast } from "react-hot-toast"

import { APIService } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"

import { Arrow, Close } from "../../icons"
import Button from "../../ui/Button"
import CurrencyCount from "../../ui/CurrencyCount"
import Modal from "../../ui/Modal"
import OTPBox from "../../ui/OTPBox"
import TextArea from "../../ui/TextArea"

const RegisterNewSafe = ({ onClose, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [pin, setPin] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const [comment, setComment] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const currencyRef = useRef()

  const onSubmit = async () => {
    setIsLoading(true)
    const data = { ...currencyRef.current.currency, comment }
    console.log(data)
    try {
      await APIService.post(
        `/v1/branches/${selectedBranch.id}/safe-deposits`,
        data
      )
      toast.success("Cash registered")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    setIsLoading(false)
    mutate()
    onClose()
  }

  return (
    <div className="flex flex-col relative ">
      <button onClick={onClose} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">
        Register New Safe Deposite
      </h2>

      <div className="flex flex-col items-center gap-20">
        <TextArea
          label="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

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

export default RegisterNewSafe
