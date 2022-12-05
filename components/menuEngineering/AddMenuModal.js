import { useState } from "react"

import Modal from "../ui/Modal"
import { Close } from "../icons"
import { MenuEngProvider } from "../../context/MenuEngContext"
import BasicDetails from "./BasicDetails"
import AddRawMaterial from "./AddRawMaterial"

const AddMenuModal = ({ onClose }) => {
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

        <MenuEngProvider>
          {currPage === 1 && (
            <BasicDetails onBack={onClose} onNext={() => setCurrPage(2)} />
          )}

          {currPage === 2 && (
            <AddRawMaterial onBack={() => setCurrPage(1)} onNext={onClose} />
          )}
        </MenuEngProvider>
      </div>
    </Modal>
  )
}

export default AddMenuModal
