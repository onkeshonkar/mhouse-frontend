import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import dayjs from "dayjs"

import useUserStore from "../../../stores/useUserStore"
import { APIService, fetcher } from "../../../lib/axios"
import Spinner from "../../../components/ui/Spinner"
import Avatar from "../../../components/ui/Avatar"
import Button from "../../../components/ui/Button"
import {
  Close,
  Delete,
  Gmail,
  Location,
  Notebook,
  Phone,
  Plus,
} from "../../../components/icons"
import TooltipButton from "../../../components/ui/ToolTipButton"
import AddCartModal from "../../../components/inventory/suppliers/AddCartModal"
import { toast } from "react-hot-toast"

const Supplier = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [isAddCartModal, setIsAddCartModal] = useState(false)

  const [selectedOrder, setSelectedOrder] = useState()
  const route = useRouter()
  const { supplierId } = route.query

  const cancelOrder = async (e) => {
    const orderId = e.currentTarget.name
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/suppliers/orders/${orderId}`,
        { status: "Canceled" }
      )
      toast.success("Delivery status updated.")
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    mutateOrder()
  }

  const markOrderDelivered = async (e) => {
    const orderId = e.currentTarget.name
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/suppliers/orders/${orderId}`,
        { status: "Delivered" }
      )
      toast.success("Delivery status updated.")
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
    mutateOrder()
    mutate()
  }

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/suppliers/${supplierId}`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  const {
    data: ordersData,
    error: orderError,
    mutate: mutateOrder,
  } = useSWR(
    `/v1/branches/${selectedBranch.id}/suppliers/${supplierId}/orders`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  const onDelete = async () => {
    try {
      await APIService.delete(
        `/v1/branches/${selectedBranch.id}/suppliers/${supplierId}`
      )
      toast.success("supplier deleted")
      route.back()
      mutate()
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message)
      } else {
        const { message } = error?.response?.data || "Something went wrong"
        toast.error(message)
      }
    }
  }

  useEffect(() => {
    if (ordersData) setSelectedOrder(ordersData.orders[0])
  }, [ordersData])

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error("Network Error")
    } else {
      return (
        <span className="mt-4 block text-center">{`No record exists for Supplier ${supplierId}`}</span>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const { supplier } = data

  return (
    <>
      {isAddCartModal && (
        <AddCartModal
          onClose={() => setIsAddCartModal(false)}
          mutateOrder={mutateOrder}
          supplier={supplierId}
        />
      )}

      <div className="mt-8 ml-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="bg-white px-7 py-6 rounded-2xl flex flex-col gap-10 min-w-[720px] relative">
              <div className="flex justify-between peer">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-sky-500">
                    <Avatar
                      height={56}
                      width={56}
                      user={supplier}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold">{supplier.name}</h3>
                    <span className="text-sm opacity-70">
                      {supplier.department}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <TooltipButton
                    text={"Delete"}
                    className="bg-x-red"
                    onClick={onDelete}
                  >
                    <Delete className="text-white" />
                  </TooltipButton>
                  <Button onClick={() => setIsAddCartModal(true)}>
                    <Plus width={20} height={20} className="mr-2" />
                    <span>New Cart</span>
                  </Button>
                </div>
              </div>

              <aside className="hidden peer-hover:flex rounded-b-2xl justify-between absolute bg-white w-full left-0 px-7 py-6 top-24 z-10">
                <ul className="flex flex-col gap-4 text-sm flex-grow pr-10">
                  <li className="flex justify-between ">
                    <p className="opacity-50">Total Items purchased </p>
                    <span className="text-base font-bold opacity-100 text-accent">
                      {supplier.purchaseCount} (${" "}
                      {supplier.purchaseValue / 1000} K)
                    </span>
                  </li>

                  <li className="flex justify-between ">
                    <p className="opacity-50">Order via </p>
                    <span className="text-base font-bold">
                      {supplier.orderVia}
                    </span>
                  </li>

                  <li className="flex justify-between ">
                    <p className="opacity-50">Min Order Value </p>
                    <span className="text-base font-bold">
                      {supplier.minOrderValue} $
                    </span>
                  </li>

                  <li className="flex justify-between ">
                    <p className="opacity-50">Delivery Fees </p>
                    <span className="text-base font-bold">
                      {supplier.deliveryFee} $
                    </span>
                  </li>

                  <li>
                    <h3 className="opacity-50">Delivery Instructions</h3>
                    <p className="max-w-xs">{supplier.deliveryInstruction}</p>
                  </li>
                </ul>

                <div className="flex flex-col gap-5 text-sm">
                  <p className="flex gap-3">
                    <Location />
                    {supplier.fullAddress}
                  </p>
                  <p className="flex gap-3">
                    <Gmail />
                    {supplier.email}
                  </p>
                  <p className="flex gap-3">
                    <Phone />
                    {supplier.officePhone}
                  </p>
                  <p className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    {supplier.phoneNumber}
                  </p>
                  <p className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                      />
                    </svg>
                    {supplier.portalURL}
                  </p>
                </div>
              </aside>
            </div>

            <div className="bg-white px-5 py-7 rounded-2xl">
              <table className="min-w-full border-spacing-y-1 border-separate">
                <thead className="bg-[#F1F1F5] leading-5 ">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-4 py-2"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-4 py-2"
                    >
                      Unit
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-4 py-2"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-4 py-2"
                    >
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {selectedOrder?.orderItems.map((order) => (
                    <tr key={order.stocktakeId}>
                      <td className="whitespace-nowrap py-2.5 pl-7 pr-4 text-sm text-primary font-normal ">
                        {order.item}
                      </td>

                      <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                        {order.quantity}
                      </td>

                      <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal opacity-50">
                        {order.unit}
                      </td>

                      <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                        {order.price} $
                      </td>

                      <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-bold ">
                        {order.price * order.quantity} $
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {ordersData && !ordersData.orders.length && (
            <div className="flex flex-col gap-1 py-4 bg-white w-full items-center justify-center rounded-xl">
              <span className="text-lg font-semibold opacity-70">
                Create first CART
              </span>
              <span>for {supplier.name}</span>
            </div>
          )}

          <div className="flex flex-col gap-4 flex-grow px-2 py-2 max-h-[80vh] overflow-y-auto">
            {ordersData &&
              selectedOrder &&
              ordersData.orders.map((order) => (
                <div
                  className={`${
                    order.id == selectedOrder.id && "ring-2 ring-accent"
                  } bg-white py-4 px-6 rounded-2xl grid grid-cols-3 gap-4 items-center`}
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order)
                  }}
                >
                  <div className="flex flex-col gap-1.5 text-sm">
                    <span className="font-light opacity-50">Order Date</span>
                    <span>
                      <Notebook
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      {dayjs(order.createdAt).format("DD MMM YYYY")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 text-sm">
                    <span className="font-light opacity-50">Delivery Date</span>
                    {order.updatedAt ? (
                      <span>
                        <Notebook
                          width={16}
                          height={16}
                          className="inline mr-2"
                        />
                        {dayjs(order.deliverDate).format("DD MMM YYYY")}
                      </span>
                    ) : (
                      "---"
                    )}
                  </div>

                  <div className="justify-self-center">
                    {order.status === "Open" && (
                      <div className="flex gap-2 justify-self-end">
                        <TooltipButton
                          name={order.id}
                          onClick={markOrderDelivered}
                          text={"Mark as Delivered"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8 text-x-green"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </TooltipButton>

                        <TooltipButton
                          text={"Cancel Order"}
                          name={order.id}
                          onClick={cancelOrder}
                        >
                          <Close width={24} height={24} />
                        </TooltipButton>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                      <Avatar width={36} height={36} user={order.createdBy} />
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="text-xs opacity-50">Created by</span>
                      <span>{order.createdBy.fullName}</span>
                    </div>
                  </div>

                  {order.updatedBy && (
                    <div className="flex gap-2">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar width={36} height={36} user={order.updatedBy} />
                      </div>

                      <div className="flex flex-col text-sm">
                        <span className="text-xs opacity-50">Received by</span>
                        <span>{order.updatedBy.fullName}</span>
                      </div>
                    </div>
                  )}

                  <div className="justify-self-center col-end-4">
                    {order.status === "Delivered" && (
                      <div className="text-sm text-x-green px-3 py-1.5 bg-[#EBFBF5] rounded-3xl justify-self-center">
                        Delivered
                      </div>
                    )}
                    {order.status === "Open" && (
                      <div className="text-sm text-accent px-3 py-1.5 bg-[#FFF9EC] rounded-3xl justify-self-center">
                        Open
                      </div>
                    )}
                    {order.status === "Canceled" && (
                      <div className="text-sm text-x-red px-3 py-1.5 bg-[#FFEEEE] rounded-3xl justify-self-center">
                        Canceled
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col text-sm">
                    <span className="text-xs opacity-50">Payment Method</span>
                    <span>{order.paymentMethod}</span>
                  </div>

                  <div className="col-end-4 justify-self-center">
                    <span className="text-2xl font-bold">
                      {order.upfrontPayment} /{" "}
                    </span>

                    <span className="text-2xl font-bold text-x-green">
                      {order.orderValue} $
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Supplier
