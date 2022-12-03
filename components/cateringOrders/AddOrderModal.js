import { useState } from "react"

import { CateringOrderProvider } from "../../context/CateringContext"
import { Close } from "../icons"

import Modal from "../ui/Modal"
import ClientDetails from "./ClientDetails"
import OrderDetails from "./OrderDetails"

const AddCateringModal = ({ onClose }) => {
  const [currPage, setCurrPage] = useState(1)

  const handleSubmit = () => {
    onClose()
  }

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
      <div className="max-w-8xl min-h-screen flex flex-col relative ">
        <button onClick={onClose} className="absolute right-0 mt-20">
          <Close />
        </button>

        <CateringOrderProvider>
          {currPage === 1 && (
            <ClientDetails onBack={onClose} onNext={() => setCurrPage(2)} />
          )}

          {currPage === 2 && (
            <OrderDetails onBack={() => setCurrPage(1)} onNext={onClose} />
          )}
        </CateringOrderProvider>
      </div>
    </Modal>
  )
}

export default AddCateringModal
