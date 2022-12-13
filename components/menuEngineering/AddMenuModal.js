import { useState } from "react"

import Modal from "../ui/Modal"
import { Close } from "../icons"
import { MenuEngProvider } from "../../context/MenuEngContext"
import BasicDetails from "./BasicDetails"
import AddRawMaterial from "./AddRawMaterial"
import { APIService } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { toast } from "react-hot-toast"

const AddMenuModal = ({ onClose, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [currPage, setCurrPage] = useState(1)

  const handleSubmit = async (menuData) => {
    const data = {
      dish: menuData.dish,
      category: menuData.category,
      season: menuData.season,
      prepareTime: menuData.prepareTime,
      sellPrice: menuData.sellPrice,
      rawItems: menuData.rawItems.map((item) => ({
        stocktake: item.id,
        price: item.price,
        quantity: item.quantity,
      })),
    }

    try {
      await APIService.post(`/v1/branches/${selectedBranch.id}/menu`, data)
      toast.success("Menu added")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }

    onClose()
    mutate()
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
            <AddRawMaterial
              onBack={() => setCurrPage(1)}
              handleSubmit={handleSubmit}
            />
          )}
        </MenuEngProvider>
      </div>
    </Modal>
  )
}

export default AddMenuModal
