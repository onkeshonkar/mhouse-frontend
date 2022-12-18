import { useState } from "react"
import { toast } from "react-hot-toast"
import { APIService } from "../../../lib/axios"

import useSupplierStore from "../../../stores/useSupplierStore"
import useUserStore from "../../../stores/useUserStore"
import { Close } from "../../icons"
import Instructions from "./Instructions"
import SupplierInfo from "./SupplierInfo"

const AddSupplierModal = ({ onClose, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const clearSupplierStore = useSupplierStore(
    (store) => store.clearSupplierStore
  )
  const [currPage, setCurrPage] = useState(1)

  const handleSubmit = async () => {
    const { supplier } = useSupplierStore.getState()
    try {
      await APIService.post(
        `/v1/branches/${selectedBranch.id}/suppliers`,
        supplier
      )
      toast.success("supplier added")
      clearSupplierStore()
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    mutate()
    onClose()
  }

  return (
    <div className=" flex flex-col relative ">
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
  )
}

export default AddSupplierModal
