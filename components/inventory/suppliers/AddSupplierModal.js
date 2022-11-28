import { useState } from "react"
import useSupplierStore from "../../../stores/useSupplierStore"

import { Close } from "../../icons"
import Modal from "../../ui/Modal"
import Instructions from "./Instructions"
import SupplierInfo from "./SupplierInfo"

const AddSupplierModal = ({ onClose }) => {
  const [currPage, setCurrPage] = useState(1)
  // const supplier = useSupplierStore((store) => store.supplier)

  const handleSubmit = () => {
    const { supplier } = useSupplierStore.getState()
    console.log(supplier)
    onClose()
  }

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
      <div className="max-w-8xl min-h-screen flex flex-col relative ">
        <button onClick={onClose} className="absolute right-0 mt-20">
          <Close />
        </button>

        {currPage == 1 && (
          <SupplierInfo onNext={() => setCurrPage(2)} onBack={onClose} />
        )}
        {currPage == 2 && (
          <Instructions onNext={handleSubmit} onBack={() => setCurrPage(1)} />
        )}
      </div>
    </Modal>
  )
}

export default AddSupplierModal
