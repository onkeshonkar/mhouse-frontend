import dayjs from "dayjs"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"
import AddCateringModal from "../../components/cateringOrders/AddOrderModal"

import { Filter, Plus, Report } from "../../components/icons/"
import Avatar from "../../components/ui/Avatar"
import Button from "../../components/ui/Button"
import Modal from "../../components/ui/Modal"
import Spinner from "../../components/ui/Spinner"
import TooltipButton from "../../components/ui/ToolTipButton"
import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"

const CateringOrders = () => {
  const [isAddCatering, setIsAddCatering] = useState(false)
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const user = useUserStore((store) => store.user)

  const { data, error, isLoading, mutate } = useSWR(
    user.type === "OWNER" ||
      user.roles.access["CATERING_ORDERS"].includes("view")
      ? `/v1/branches/${selectedBranch.id}/catering-orders`
      : null,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

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
  const TOTAL_ORDERS = cateringOrders.length
  const PENDING_ORDERS = cateringOrders.reduce((prevVal, currVal) => {
    if (currVal.status === "Delivered") return prevVal + 1
    return prevVal
  }, 0)

  return (
    <>
      <Modal open={isAddCatering} transparent={false}>
        <AddCateringModal
          onClose={() => setIsAddCatering(false)}
          mutate={mutate}
        />
      </Modal>

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
                  <span className="text-x-green">{PENDING_ORDERS}</span>
                  <span> / </span>
                  <span>{TOTAL_ORDERS}</span>
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

            {(user.type === "OWNER" ||
              user.roles.access["CATERING_ORDERS"].includes("add")) && (
              <Button onClick={() => setIsAddCatering(true)}>
                <Plus width={12} height={12} />
                <span className="text-base font-semibold ml-2">
                  New New Order
                </span>
              </Button>
            )}
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
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Delivery Date
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Booked by
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Approved By
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Payment
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Delivery/Pickup
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
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

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-left">
                    {cateringOrder.clientName}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal opacity-50 text-center">
                    {dayjs(cateringOrder.deliveryDate).format("DD MMM YYYY")}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal ">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar
                          user={cateringOrder.createdBy}
                          width={36}
                          height={36}
                        />
                      </div>
                      {cateringOrder.createdBy.fullName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-center">
                    {cateringOrder.updatedBy ? (
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-500">
                          <Avatar
                            user={cateringOrder.updatedBy}
                            width={36}
                            height={36}
                          />
                        </div>
                        {cateringOrder.updatedBy.fullName}
                      </div>
                    ) : (
                      <spna>----</spna>
                    )}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-center ">
                    <div className="flex flex-col">
                      <span> {cateringOrder.paymentMethod}</span>
                      <span className="text-xs opacity-70">
                        ($ {cateringOrder.orderAmount})
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-center ">
                    {cateringOrder.deliveryMethod}
                  </td>

                  <td className="whitespace-nowrap py-2.5 px-4 text-sm text-primary font-normal text-center">
                    {cateringOrder.status === "Open" && (
                      <span className="bg-[#EBFBF5] text-x-green px-3 py-1.5 rounded-3xl">
                        {cateringOrder.status}
                      </span>
                    )}
                    {cateringOrder.status === "Delivered" && (
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
