import { useRef, useState } from "react"

import { Arrow, Close } from "../../icons"
import Button from "../../ui/Button"
import CurrencyCount from "../../ui/CurrencyCount"
import Modal from "../../ui/Modal"
import OTPBox from "../../ui/OTPBox"
import TextArea from "../../ui/TextArea"

const RegisterNewSafe = ({ onClose }) => {
  const [pin, setPin] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const currencyRef = useRef()

  const onSubmit = () => {
    console.log(currencyRef)
    onClose()
  }

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
      <div className="max-w-8xl min-h-screen flex flex-col relative ">
        <button onClick={onClose} className="absolute right-0 mt-20">
          <Close />
        </button>

        <h2 className="text-4xl font-semibold my-20">
          Register New Safe Deposite
        </h2>

        <div className="flex flex-col items-center gap-20">
          <TextArea label="Comment (optional)" />

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

          <Button onClick={onSubmit}>
            <span>Submit</span>
            <Arrow
              width={20}
              height={20}
              className="ml-6 group-hover:translate-x-1 duration-300"
            />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default RegisterNewSafe
