import { useState } from "react"
import { toast } from "react-hot-toast"

import { CateringOrderProvider } from "../../context/CateringContext"
import { APIService } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { Close } from "../icons"

import Modal from "../ui/Modal"
import ClientDetails from "./ClientDetails"
import OrderDetails from "./OrderDetails"

const AddCateringModal = ({ onClose, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [currPage, setCurrPage] = useState(1)

  const handleSubmit = async (orderDetails) => {
    const data = {
      clientName: orderDetails.fullName,
      phoneNumber: orderDetails.phoneNumber,
      fullAddress: orderDetails.fullAddress,
      deliveryMethod: orderDetails.deliveryMethod,
      deliveryDate: orderDetails.deliveryDate,
      paymentMethod: orderDetails.paymentMethod,
      upfrontPayment: orderDetails.upfrontPayment,
      ...(orderDetails.notes && { notes: orderDetails.notes }),
      cart: orderDetails.cart.map((item) => ({
        menu: item.id,
        dish: item.dish,
        sellPrice: item.sellPrice,
        quantity: item.quantity,
      })),
    }

    try {
      await APIService.post(
        `/v1/branches/${selectedBranch.id}/catering-orders`,
        data
      )
      toast.success("Order created")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }

    mutate()
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
            <OrderDetails
              onBack={() => setCurrPage(1)}
              handleSubmit={handleSubmit}
            />
          )}
        </CateringOrderProvider>
      </div>
    </Modal>
  )
}

export default AddCateringModal
