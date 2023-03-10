import { useMemo, useRef, useState } from "react"
import { toast } from "react-hot-toast"

import { APIService } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"
import { Arrow, Close } from "../../icons"
import Button from "../../ui/Button"
import CurrencyCount from "../../ui/CurrencyCount"
import Input from "../../ui/Input"
import Modal from "../../ui/Modal"
import OTPBox from "../../ui/OTPBox"
import TextArea from "../../ui/TextArea"
import ClosingCount from "./ClosingCount"

const RegisterNewClosing = ({ onClose, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [pin, setPin] = useState({ 0: "", 1: "", 2: "", 3: "" })
  const [note, setNote] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [txnCount, setTxnCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const currencyRef = useRef()
  const [income, setIncome] = useState({
    eftpos: 0,
    deliveroo: 0,
    uber: 0,
    menulog: 0,
    doorDash: 0,
    orderUp: 0,
    pos: 0,
  })

  const cash = currencyRef.current?.totalCash || 0

  const totalIncome = useMemo(() => {
    const _totalRevenue =
      income.eftpos +
      income.deliveroo +
      income.uber +
      income.menulog +
      income.doorDash +
      income.orderUp +
      income.pos +
      parseFloat(cash)

    return _totalRevenue.toFixed(2)
  }, [income, cash])

  const onSubmit = async () => {
    if (!txnCount)
      return toast.error("Transaction count must be greater than 0")
    setIsLoading(true)
    const data = {
      totalIncome,
      note,
      ...income,
      cash,
      transactionCount: txnCount,
    }
    try {
      await APIService.post(`/v1/branches/${selectedBranch.id}/closings`, data)
      toast.success("closing added")
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

      <h2 className="text-4xl font-semibold my-10">Register Closing Day</h2>

      {currentPage == 1 && (
        <div className="flex flex-col items-center gap-20">
          <div className="flex items-center gap-4">
            <span>Enter Your PIN</span>
            <OTPBox value={pin} handleValue={setPin} />
          </div>

          <CurrencyCount ref={currencyRef} />
        </div>
      )}

      {currentPage == 2 && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6 m-0.5">
            <Input
              type="Number"
              label="Transaction Count"
              value={txnCount}
              onChange={(e) => setTxnCount(e.target.valueAsNumber || 0)}
            />

            <div className="">
              <span className="text-2xl font-bold text-x-green">
                {totalIncome} $
              </span>
              <h4 className="text-sm font-light">Total Income</h4>
            </div>
          </div>

          <ClosingCount cash={cash} income={income} setIncome={setIncome} />

          <TextArea
            label="Write Note Here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-24 w-laptop">
        {currentPage == 1 && (
          <>
            <Button onClick={onClose} className="bg-primary" gradient={false}>
              <Arrow
                width={20}
                height={20}
                className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
              />
              <span> Back</span>
            </Button>

            <span>
              <svg
                width="76"
                height="12"
                viewBox="0 0 76 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="24"
                  y="3"
                  width="28"
                  height="6"
                  rx="3"
                  fill="#F1F1F5"
                />
                <circle
                  cx="70.01"
                  cy="6.01"
                  r="4"
                  transform="rotate(-.138 70.01 6.01)"
                  fill="#F1F1F5"
                />
                <circle
                  cx="6.01"
                  cy="6.01"
                  r="4"
                  transform="rotate(-.138 6.01 6.01)"
                  fill="#FFC34A"
                />
              </svg>
            </span>

            <Button onClick={() => setCurrentPage(2)}>
              <span>Next</span>
              <Arrow
                width={20}
                height={20}
                className="ml-6 group-hover:translate-x-1 duration-300"
              />
            </Button>
          </>
        )}

        {currentPage == 2 && (
          <>
            <Button
              onClick={() => setCurrentPage(1)}
              className="bg-primary"
              gradient={false}
            >
              <Arrow
                width={20}
                height={20}
                className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
              />
              <span> Back</span>
            </Button>

            <span>
              <svg
                width="76"
                height="12"
                viewBox="0 0 76 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="24"
                  y="3"
                  width="28"
                  height="6"
                  rx="3"
                  fill="#FFC34A"
                />
                <circle
                  cx="70.01"
                  cy="6.01"
                  r="4"
                  transform="rotate(-.138 70.01 6.01)"
                  fill="#FFC34A"
                />
                <circle
                  cx="6.01"
                  cy="6.01"
                  r="4"
                  transform="rotate(-.138 6.01 6.01)"
                  fill="#FFC34A"
                />
              </svg>
            </span>

            <Button onClick={onSubmit} loading={isLoading}>
              <span>Submit</span>
              <Arrow
                width={20}
                height={20}
                className="ml-6 group-hover:translate-x-1 duration-300"
              />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default RegisterNewClosing
