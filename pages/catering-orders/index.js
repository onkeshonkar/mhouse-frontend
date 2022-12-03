import dayjs from "dayjs"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"
import AddCateringModal from "../../components/cateringOrders/AddOrderModal"

import { Filter, Plus, Report } from "../../components/icons/"
import Avatar from "../../components/ui/Avatar"
import Button from "../../components/ui/Button"
import Spinner from "../../components/ui/Spinner"
import TooltipButton from "../../components/ui/ToolTipButton"
import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"

const cateringOrders = [
  {
    id: "631f2df5378e719aafc43e7",
    clientName: "Random user",
    deliveryDate: "2022-09-19T16:27:22.329Z",
    bookedBy: {
      fullName: "Onkesh",
      email: "onkeshkumaronkar315@gmail.com",
      id: "631f2df5378e719aafc43e77",
    },
    aprovedBy: {
      fullName: "Onkesh",
      email: "onkeshkumaronkar315@gmail.com",
      id: "631f2df5378e719aafc43e77",
    },
    paymnetMethod: "Cash",
    deliveryMethod: "Pickup",
    status: "Pending",
  },
  {
    id: "631f2df5378e719aafc43e7c",
    clientName: "Random user2",
    deliveryDate: "2022-07-19T16:27:22.329Z",
    bookedBy: {
      fullName: "kumar",
      email: "onkeshkumaronkar315@gmail.com",
      id: "631f2df5378e719aafc43e77",
    },
    aprovedBy: {
      fullName: "Onkesh",
      email: "onkeshkumaronkar315@gmail.com",
      id: "631f2df5378e719aafc43e77",
    },
    paymnetMethod: "Credit",
    deliveryMethod: "Pickup",
    status: "Canceled",
  },
  {
    id: "631f2df5378e714aafc43e7b",
    clientName: "Random user",
    deliveryDate: "2022-09-19T16:27:22.329Z",
    bookedBy: {
      fullName: "Onkesh",
      email: "onkeshkumaronkar315@gmail.com",
      id: "631f2df5378e719aafc43e77",
    },
    aprovedBy: null,
    paymnetMethod: "Eftpos",
    deliveryMethod: "Delivery",
    status: "Completed",
  },
]

const CateringOrders = () => {
  const [isAddCatering, setIsAddCatering] = useState(false)
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  // const { data, error, mutate } = useSWR(
  //   `/v1/branches/${selectedBranch.id}/catering-orders`,
  //   fetcher
  // )

  // if (error) {
  //   if (error.code === "ERR_NETWORK") {
  //     toast.error(error.message)
  //   } else {
  //     return <span>{"Can't fetch employee list"}</span>
  //   }
  // }

  // if (!data)
  //   return (
  //     <div className="mt-10 text-center">
  //       <Spinner />
  //     </div>
  //   )

  const TOTAL_ORDERS = 26
  const PENDING_ORDERS = 10

  // const {cateringOrders} = data

  return (
    <>
      {isAddCatering && (
        <AddCateringModal onClose={() => setIsAddCatering(false)} />
      )}

      <div className="mt-8 ml-6">
        <div className="flex item center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Catering Orders</h1>
            <p className="text-sm font-light">
              {cateringOrders.length} Total Catering Orders
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-normal">Pending Catering Orders</p>
                <div className="text-base font-bold">
                  <span className="text-x-green">{TOTAL_ORDERS}</span>
                  <span> / </span>
                  <span>{PENDING_ORDERS}</span>
                </div>
              </div>

              <div className="w-56 h-1 rounded-sm bg-[#E2E2EA]">
                <div
                  style={{
                    width:
                      Math.floor((224 * PENDING_ORDERS) / TOTAL_ORDERS) + "px",
                  }}
                  className={`h-1 rounded-sm bg-x-green`}
                />
              </div>
            </div>

            <TooltipButton text="Report">
              <Report />
            </TooltipButton>

            <TooltipButton text="Filter">
              <Filter />
            </TooltipButton>

            <Button onClick={() => setIsAddCatering(true)}>
              <Plus width={12} height={12} />
              <span className="text-base font-semibold ml-2">
                New New Order
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-7">
          <table className="min-w-full border-spacing-y-1 border-separate">
            <thead className='bg-[#F1F1F5] leading-5 after:content-["."] after:block after:bg-background after:text-transparent'>
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Client Name
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Delivery Date
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Booked by
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Approved By
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Payment
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Delivery/Pickup
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {cateringOrders.map((cateringOrder) => (
                <tr key={cateringOrder.id}>
                  <td className="whitespace-nowrap py-2.5 px-4 text-xs text-primary font-normal transition-all duration-100 hover:text-amber-500 hover:underline ">
                    <Link
                      href={`/catering-orders/${cateringOrder.id}`}
                      prefetch={false}
                    >
                      <a>{cateringOrder.id}</a>
                    </Link>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal">
                    {cateringOrder.clientName}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal opacity-50">
                    {dayjs(cateringOrder.deliveryDate).format("DD MMM YYYY")}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar
                          user={cateringOrder.bookedBy}
                          width={36}
                          height={36}
                        />
                      </div>
                      {cateringOrder.bookedBy.fullName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cateringOrder.aprovedBy && (
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                          <Avatar
                            user={cateringOrder.aprovedBy}
                            width={36}
                            height={36}
                          />
                        </div>
                        {cateringOrder.aprovedBy.fullName}
                      </div>
                    )}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cateringOrder.paymnetMethod}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    {cateringOrder.deliveryMethod}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal">
                    {cateringOrder.status === "Completed" && (
                      <span className="bg-[#EBFBF5] text-x-green px-3 py-1.5 rounded-3xl">
                        {cateringOrder.status}
                      </span>
                    )}
                    {cateringOrder.status === "Pending" && (
                      <span className="bg-[#FFF9EC] text-accent px-3 py-1.5 rounded-3xl">
                        {cateringOrder.status}
                      </span>
                    )}
                    {cateringOrder.status === "Canceled" && (
                      <span className="bg-[#FFEEEE] text-x-red px-3 py-1.5 rounded-3xl">
                        {cateringOrder.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default CateringOrders
