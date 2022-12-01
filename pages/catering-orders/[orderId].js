import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import dayjs from "dayjs"

import Avatar from "../../components/ui/Avatar"
import TooltipButton from "../../components/ui/ToolTipButton"
import { Close, Location, Notebook, Phone } from "../../components/icons"
import useUserStore from "../../stores/useUserStore"

const allOrders = {
  client: {
    id: "631f2df5378e719aafc43e7c",
    clientName: "Random user2",
    avatar: "abc",
    deliveryDate: "2022-07-19T16:27:22.329Z",
    phone: "+917903123164",
    fullAddress: "3385 Asha Prairie, South Australia, AU",
  },
  orderHIstory: [
    {
      id: "631f2df5378e719aafc43e78",
      orderDate: "2022-10-19T16:27:22.329Z",
      deliverDate: "2022-10-19T16:27:22.329Z",
      bookedBy: {
        fullName: "Onkesh in",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e719aafc43e79",
      },
      approvedBy: {
        fullName: "kumar",
        avatar:
          "https://assets.foodlert.com/avatars/631f2df5378e719aafc43e77-1664193392520.png",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e71aafc43e77",
      },
      notes:
        "Some notes extra hai kya make it little longer to test the layout.",
      paymentType: "Credit",
      deliveryMethod: "Pickup",
      status: "Open",
      totalPrice: 400,
      upfrontPayment: { type: "Eftpos", amount: 80 },
      cartItems: [
        { id: 123, item: "Burger", qty: 8, unit: "Box", price: 26, total: 208 },
        { id: 124, item: "Tomato", qty: 10, unit: "kg", price: 30, total: 300 },
      ],
    },
    {
      id: "631f2df537e719aafc43e77",
      orderDate: "2022-09-19T16:27:22.329Z",
      deliverDate: "2022-09-19T16:27:22.329Z",
      bookedBy: {
        avatar:
          "https://assets.foodlert.com/avatars/631f2df5378e719aafc43e77-1664193392520.png",
        fullName: "Onkesh",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e719aafc43e77",
      },
      approvedBy: {
        avatar:
          "https://assets.foodlert.com/avatars/631f2df5378e719aafc43e77-1664193392520.png",
        fullName: "Onkesh",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e719aaf43e77",
      },
      notes: "Some notes",
      paymentType: "Cash",
      status: "Delivered",
      deliveryMethod: "Delivery",
      totalPrice: 320,
      upfrontPayment: {},
      cartItems: [
        { id: 123, item: "Burger", qty: 8, unit: "Box", price: 26, total: 208 },
        { id: 124, item: "Tomato", qty: 10, unit: "kg", price: 30, total: 300 },
        { id: 134, item: "Meat", qty: 5, unit: "kg", price: 150, total: 750 },
      ],
    },
  ],
}

const Supplier = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [selectedCart, setSelectedCart] = useState(allOrders.orderHIstory[0])

  const cancelOrder = (e) => {
    console.log(e.currentTarget.name)
  }
  const markOrderDelivered = (e) => {
    console.log(e.currentTarget.name)
  }

  const route = useRouter()
  const { orderId } = route.query
  console.log(orderId)

  // const { data, error, mutate } = useSWR(
  //   `/v1/branches/${selectedBranch.id}/allOrders/${supplierId}`,
  //   fetcher,
  //   {
  //     errorRetryCount: 2,
  //   }
  // )

  // if (error) {
  //   if (error.code === "ERR_NETWORK") {
  //     toast.error("Network Error")
  //   } else {
  //     return (
  //       <span className="mt-4 block text-center">{`No record exists for Task ${supplierId}`}</span>
  //     )
  //   }
  // }

  // if (!data)
  //   return (
  //     <div className="mt-10 text-center">
  //       <Spinner />
  //     </div>
  //   )

  // const { allOrders } = data

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
                  user={allOrders.client}
                  className="rounded-xl"
                />
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm opacity-70">Client Details</span>
                  <h3 className="font-bold">{allOrders.client.clientName}</h3>
                </div>
              </div>

              <div className="text-sm flex flex-col gap-4">
                <p className="flex gap-3">
                  <Location />
                  {allOrders.client.fullAddress}
                </p>

                <p className="flex gap-3">
                  <Phone />
                  {allOrders.client.phone}
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
                {selectedCart.cartItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td className="whitespace-nowrap py-2.5 pl-7 pr-4 text-sm text-primary font-normal ">
                      {cartItem.item}
                    </td>

                    <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                      {cartItem.qty}
                    </td>

                    <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal opacity-50">
                      {cartItem.unit}
                    </td>

                    <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                      {cartItem.price} $
                    </td>

                    <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-bold ">
                      {cartItem.total} $
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-grow">
          {allOrders.orderHIstory.map((history) => (
            <div
              className={`${
                history.id == selectedCart.id && "ring-2 ring-accent"
              } bg-white py-4 px-6 rounded-2xl grid grid-cols-3 gap-4 items-center`}
              key={history.id}
              onClick={() => {
                setSelectedCart(history)
              }}
            >
              <div className="flex flex-col gap-1.5 text-sm">
                <span className="font-light opacity-50">Order Date</span>
                <span>
                  <Notebook width={16} height={16} className="inline mr-2" />
                  {dayjs(history.orderDate).format("DD MMM YYYY")}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 text-sm">
                <span className="font-light opacity-50">Delivery Date</span>
                {history.deliverDate ? (
                  <span>
                    <Notebook width={16} height={16} className="inline mr-2" />
                    {dayjs(history.deliverDate).format("DD MMM YYYY")}
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
                  <Avatar width={36} height={36} user={history.bookedBy} />
                </div>

                <div className="flex flex-col text-sm">
                  <span className="text-xs opacity-50">Booked by</span>
                  <span>{history.bookedBy.fullName}</span>
                </div>
              </div>

              {history.approvedBy && (
                <div className="flex gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                    <Avatar width={36} height={36} user={history.approvedBy} />
                  </div>

                  <div className="flex flex-col text-sm">
                    <span className="text-xs opacity-50">Approved by</span>
                    <span>{history.approvedBy.fullName}</span>
                  </div>
                </div>
              )}

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
                <span>{history.paymentType}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="text-xs opacity-50">Delivery Method</span>
                <span>{history.deliveryMethod}</span>
              </div>

              <div className="col-end-4 justify-self-center">
                {history.upfrontPayment?.amount && (
                  <span className="text-2xl font-bold">
                    {history.upfrontPayment.amount} /{" "}
                  </span>
                )}
                <span className="text-2xl font-bold text-x-green">
                  {history.totalPrice} $
                </span>
              </div>

              <div className="flex flex-col text-sm col-span-3">
                <span className="text-xs opacity-50">Notes</span>
                <span>{history.notes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Supplier
