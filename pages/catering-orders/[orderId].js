import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import dayjs from "dayjs"

import Avatar from "../../components/ui/Avatar"
import TooltipButton from "../../components/ui/ToolTipButton"
import { Close, Location, Notebook, Phone } from "../../components/icons"
import useUserStore from "../../stores/useUserStore"
import Spinner from "../../components/ui/Spinner"
import { APIService, fetcher } from "../../lib/axios"
import { toast } from "react-hot-toast"

const Supplier = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const user = useUserStore((store) => store.user)

  const [selectedOrder, setSelectedOrder] = useState()
  const route = useRouter()

  const { data, error, mutate, isLoading } = useSWR(
    user.type === "OWNER" ||
      user.roles.access["CATERING_ORDERS"].includes("view")
      ? `/v1/branches/${selectedBranch.id}/catering-orders`
      : null,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  useEffect(() => {
    if (data) setSelectedOrder(data.cateringOrders[0])
  }, [data])

  if (!isLoading && !data && !error) {
    return (
      <div className="mt-10 text-center">
        You don&apos;t have enough permission.
      </div>
    )
  }

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return (
        <div className="mt-10 text-center">{"Can't fetch catering orders"}</div>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const { cateringOrders } = data

  const cancelOrder = async (e) => {
    const orderId = e.currentTarget.name
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/catering-orders/${orderId}`,
        { status: "Canceled" }
      )
      toast.success("Delivery status updated.")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    mutate()
  }

  const markOrderDelivered = async (e) => {
    const orderId = e.currentTarget.name
    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/catering-orders/${orderId}`,
        { status: "Delivered" }
      )
      toast.success("Delivery status updated.")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    mutate()
  }

  if (!selectedOrder) return

  return (
    <div className="mt-8 ml-6">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <div className="bg-white px-7 py-6 rounded-2xl flex flex-col gap-10 min-w-[720px]">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Avatar
                  height={56}
                  width={56}
                  user={selectedOrder}
                  className="rounded-xl"
                />
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm opacity-70">Client Details</span>
                  <h3 className="font-bold">{selectedOrder.clientName}</h3>
                </div>
              </div>

              <div className="text-sm flex flex-col gap-4">
                <p className="flex gap-3">
                  <Location />
                  {selectedOrder.fullAddress}
                </p>

                <p className="flex gap-3">
                  <Phone />
                  {selectedOrder.phoneNumber}
                </p>
              </div>
            </div>
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
                {selectedOrder.cart.map((cartItem) => (
                  <tr key={cartItem.menu}>
                    <td className="whitespace-nowrap py-2.5 pl-7 pr-4 text-sm text-primary font-normal ">
                      {cartItem.dish}
                    </td>

                    <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                      {cartItem.quantity}
                    </td>

                    <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                      {cartItem.sellPrice} $
                    </td>

                    <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-bold ">
                      $ {cartItem.sellPrice * cartItem.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-grow max-h-[85vh] overflow-y-auto p-2">
          {cateringOrders.map((history) => (
            <div
              className={`${
                history.id == selectedOrder.id && "ring-2 ring-accent"
              } bg-white py-4 px-6 rounded-2xl grid grid-cols-3 gap-4 items-center`}
              key={history.id}
              onClick={() => {
                route.replace(history.id)
                setSelectedOrder(history)
              }}
            >
              <div className="flex flex-col gap-1.5 text-sm">
                <span className="font-light opacity-50">Order Date</span>
                <span>
                  <Notebook width={16} height={16} className="inline mr-2" />
                  {dayjs(history.createdAt).format("DD MMM YYYY")}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 text-sm">
                <span className="font-light opacity-50">Delivery Date</span>
                {history.deliveryDate ? (
                  <span>
                    <Notebook width={16} height={16} className="inline mr-2" />
                    {dayjs(history.deliveryDate).format("HH:mm DD MMM YYYY")}
                  </span>
                ) : (
                  "---"
                )}
              </div>

              <div className="justify-self-center">
                {history.status === "Open" && (
                  <div className="flex gap-2 justify-self-end">
                    <TooltipButton
                      name={history.id}
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
                      name={history.id}
                      onClick={cancelOrder}
                    >
                      <Close width={24} height={24} />
                    </TooltipButton>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                  <Avatar width={36} height={36} user={history.createdBy} />
                </div>

                <div className="flex flex-col text-sm">
                  <span className="text-xs opacity-50">Booked by</span>
                  <span>{history.createdBy.fullName}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {history.updatedBy && (
                  <>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                      <Avatar width={36} height={36} user={history.updatedBy} />
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="text-xs opacity-50">Approved by</span>
                      <span>{history.updatedBy.fullName}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="justify-self-center">
                {history.status === "Delivered" && (
                  <div className="text-sm text-x-green px-3 py-1.5 bg-[#EBFBF5] rounded-3xl justify-self-center">
                    Delivered
                  </div>
                )}
                {history.status === "Open" && (
                  <div className="text-sm text-accent px-3 py-1.5 bg-[#FFF9EC] rounded-3xl justify-self-center">
                    Open
                  </div>
                )}
                {history.status === "Canceled" && (
                  <div className="text-sm text-x-red px-3 py-1.5 bg-[#FFEEEE] rounded-3xl justify-self-center">
                    Canceled
                  </div>
                )}
              </div>

              <div className="flex flex-col text-sm">
                <span className="text-xs opacity-50">Payment Method</span>
                <span>{history.paymentMethod}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="text-xs opacity-50">Delivery Method</span>
                <span>{history.deliveryMethod}</span>
              </div>

              <div className="col-end-4 justify-self-center">
                <span className="text-2xl font-bold">
                  {history.upfrontPayment} /{" "}
                </span>

                <span className="text-2xl font-bold text-x-green">
                  {history.orderAmount} $
                </span>
              </div>

              <div className="flex flex-col text-sm col-span-3">
                <span className="text-xs opacity-50">Notes</span>
                <span>{history.notes || "----"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Supplier
