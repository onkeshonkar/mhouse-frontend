import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import dayjs from "dayjs"

import useUserStore from "../../../stores/useUserStore"
import { fetcher } from "../../../lib/axios"
import Spinner from "../../../components/ui/Spinner"
import Avatar from "../../../components/ui/Avatar"
import Button from "../../../components/ui/Button"
import {
  Close,
  Gmail,
  Location,
  Notebook,
  Phone,
  Plus,
} from "../../../components/icons"
import TooltipButton from "../../../components/ui/ToolTipButton"
import AddCartModal from "../../../components/inventory/suppliers/AddCartModal"

const supplier = {
  info: {
    id: 323,
    totalItemPurchased: 14,
    avatar: "abc",
    fullName: "Onkesh",
    orderVia: "SMS",
    email: "onkeshkumaronkar@gmail.com",
    portalUrl: "abc.com",
    phone: "+917903123164",
    officePhone: "+917903123164",
    fullAddress: "3385 Asha Prairie, South Australia, AU",
    department: "Backery",
    deliveryInstructions:
      "This is some delivery instructions. Kuchh bhi liho yhan pe par jyada lamba nhi likhna hai",
    minOrderValue: 12,
    deliveryFee: 30,
    totalPurchase: 36,
  },
  cartHistory: [
    {
      id: "631f2df5378e719aafc43e78",
      orderDate: "2022-10-19T16:27:22.329Z",
      deliverDate: "2022-10-19T16:27:22.329Z",
      createdBy: {
        fullName: "Onkesh in",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e719aafc43e79",
      },
      RecievedBy: {
        fullName: "kumar",
        avatar:
          "https://assets.foodlert.com/avatars/631f2df5378e719aafc43e77-1664193392520.png",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e71aafc43e77",
      },
      notes:
        "Some notes extra hai kya make it little longer to test the layout.",
      paymentType: "Credit",
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
      createdBy: {
        avatar:
          "https://assets.foodlert.com/avatars/631f2df5378e719aafc43e77-1664193392520.png",
        fullName: "Onkesh",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e719aafc43e77",
      },
      RecievedBy: {
        avatar:
          "https://assets.foodlert.com/avatars/631f2df5378e719aafc43e77-1664193392520.png",
        fullName: "Onkesh",
        email: "onkeshkumaronkar315@gmail.com",
        id: "631f2df5378e719aaf43e77",
      },
      notes: "Some notes",
      paymentType: "Cash",
      status: "Delivered",
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
  const [isAddCartModal, setIsAddCartModal] = useState(false)

  const [selectedCart, setSelectedCart] = useState(supplier.cartHistory[0])

  const cancelOrder = (e) => {
    console.log(e.currentTarget.name)
  }
  const markOrderDelivered = (e) => {
    console.log(e.currentTarget.name)
  }

  const route = useRouter()
  const { supplierId } = route.query

  // const { data, error, mutate } = useSWR(
  //   `/v1/branches/${selectedBranch.id}/supplier/${supplierId}`,
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

  // const { supplier } = data

  return (
    <>
      {isAddCartModal && (
        <AddCartModal onClose={() => setIsAddCartModal(false)} />
      )}

      <div className="mt-8 ml-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="bg-white px-7 py-6 rounded-2xl flex flex-col gap-10 min-w-[720px] group relative">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Avatar
                    height={56}
                    width={56}
                    user={supplier.info}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold">{supplier.info.fullName}</h3>
                    <span className="text-sm opacity-70">
                      {supplier.info.department}
                    </span>
                  </div>
                </div>
                <Button onClick={() => setIsAddCartModal(true)}>
                  <Plus width={20} height={20} className="mr-2" />
                  <span>New Cart</span>
                </Button>
              </div>

              <aside className="hidden group-hover:flex rounded-b-2xl justify-between absolute bg-white w-full left-0 px-7 py-6 top-24 z-10">
                <ul className="flex flex-col gap-4 text-sm flex-grow pr-10">
                  <li className="flex justify-between ">
                    <p className="opacity-50">Total Items purchased </p>
                    <span className="text-base font-bold opacity-100 text-accent">
                      {supplier.info.totalItemPurchased} (1800$)
                    </span>
                  </li>

                  <li className="flex justify-between ">
                    <p className="opacity-50">Order via </p>
                    <span className="text-base font-bold">
                      {supplier.info.orderVia}
                    </span>
                  </li>

                  <li className="flex justify-between ">
                    <p className="opacity-50">Min Order Value </p>
                    <span className="text-base font-bold">
                      {supplier.info.minOrderValue} $
                    </span>
                  </li>

                  <li className="flex justify-between ">
                    <p className="opacity-50">Delivery Fees </p>
                    <span className="text-base font-bold">
                      {supplier.info.deliveryFee} $
                    </span>
                  </li>

                  <li>
                    <h3 className="opacity-50">Delivery Instructions</h3>
                    <p className="max-w-xs">
                      {supplier.info.deliveryInstructions}
                    </p>
                  </li>
                </ul>

                <div className="flex flex-col gap-5 text-sm">
                  <p className="flex gap-3">
                    <Location />
                    {supplier.info.fullAddress}
                  </p>
                  <p className="flex gap-3">
                    <Gmail />
                    {supplier.info.email}
                  </p>
                  <p className="flex gap-3">
                    <Phone />
                    {supplier.info.officePhone}
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
                    {supplier.info.phone}
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
                    {supplier.info.portalUrl}
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
            {supplier.cartHistory.map((cart) => (
              <div
                className={`${
                  cart.id == selectedCart.id && "ring-2 ring-accent"
                } bg-white py-4 px-6 rounded-2xl grid grid-cols-3 gap-4 items-center`}
                key={cart.id}
                onClick={() => {
                  setSelectedCart(cart)
                }}
              >
                <div className="flex flex-col gap-1.5 text-sm">
                  <span className="font-light opacity-50">Order Date</span>
                  <span>
                    <Notebook width={16} height={16} className="inline mr-2" />
                    {dayjs(cart.orderDate).format("DD MMM YYYY")}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-sm">
                  <span className="font-light opacity-50">Delivery Date</span>
                  {cart.deliverDate ? (
                    <span>
                      <Notebook
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      {dayjs(cart.deliverDate).format("DD MMM YYYY")}
                    </span>
                  ) : (
                    "---"
                  )}
                </div>

                <div className="justify-self-center">
                  {cart.status === "Open" && (
                    <div className="flex gap-2 justify-self-end">
                      <TooltipButton
                        name={cart.id}
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
                        name={cart.id}
                        onClick={cancelOrder}
                      >
                        <Close width={24} height={24} />
                      </TooltipButton>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                    <Avatar width={36} height={36} user={cart.createdBy} />
                  </div>

                  <div className="flex flex-col text-sm">
                    <span className="text-xs opacity-50">Created by</span>
                    <span>{cart.createdBy.fullName}</span>
                  </div>
                </div>

                {cart.RecievedBy && (
                  <div className="flex gap-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                      <Avatar width={36} height={36} user={cart.RecievedBy} />
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="text-xs opacity-50">Received by</span>
                      <span>{cart.RecievedBy.fullName}</span>
                    </div>
                  </div>
                )}

                <div className="justify-self-center">
                  {cart.status === "Delivered" && (
                    <div className="text-sm text-x-green px-3 py-1.5 bg-[#EBFBF5] rounded-3xl justify-self-center">
                      Delivered
                    </div>
                  )}
                  {cart.status === "Open" && (
                    <div className="text-sm text-accent px-3 py-1.5 bg-[#FFF9EC] rounded-3xl justify-self-center">
                      Open
                    </div>
                  )}
                  {cart.status === "Canceled" && (
                    <div className="text-sm text-x-red px-3 py-1.5 bg-[#FFEEEE] rounded-3xl justify-self-center">
                      Canceled
                    </div>
                  )}
                </div>

                <div className="col-end-4 justify-self-center">
                  {cart.upfrontPayment?.amount && (
                    <span className="text-2xl font-bold">
                      {cart.upfrontPayment.amount} /{" "}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-x-green">
                    {cart.totalPrice} $
                  </span>
                </div>

                <div className="flex flex-col text-sm col-span-2">
                  <span className="text-xs opacity-50">Notes</span>
                  <span>{cart.notes}</span>
                </div>

                <div className="flex flex-col text-sm">
                  <span className="text-xs opacity-50">Payment Method</span>
                  <span>{cart.paymentType}</span>
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
