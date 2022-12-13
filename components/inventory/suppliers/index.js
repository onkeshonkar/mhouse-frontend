import { useState } from "react"
import Link from "next/link"
import useSWR from "swr"

import { Filter, Paper, Phone, Plus } from "../../icons"
import Avatar from "../../ui/Avatar"
import Button from "../../ui/Button"
import TooltipButton from "../../ui/ToolTipButton"
import AddSupplierModal from "./AddSupplierModal"
import useUserStore from "../../../stores/useUserStore"
import Spinner from "../../ui/Spinner"
import { fetcher } from "../../../lib/axios"

const Supplier = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [isAddSupplier, setIsAddSupplier] = useState(false)

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/suppliers`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      // toast.error(JSON.stringify(error))
      return <span>{"Can't fetch suppliers list"}</span>
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const { suppliers } = data

  return (
    <>
      {isAddSupplier && (
        <AddSupplierModal
          onClose={() => setIsAddSupplier(false)}
          mutate={mutate}
        />
      )}

      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Suppliers Management</h1>
            <p className="text-sm font-light">
              {suppliers.length} Total Suppliers
            </p>
          </div>

          <div className="flex gap-6">
            <TooltipButton text={"Filter"}>
              <Filter className="text-x-grey" />
            </TooltipButton>

            <TooltipButton text={"Download PDF"}>
              <Paper className="text-x-grey" />
            </TooltipButton>

            <Button onClick={() => setIsAddSupplier(true)}>
              <Plus width={16} height={16} className="mr-2" />
              <span>New Supplier</span>
            </Button>
          </div>
        </header>

        <div className="mt-7 grid grid-cols-3 gap-4">
          {suppliers.map((sup) => (
            <Link
              href={`/inventory/suppliers/${sup.id}`}
              prefetch={false}
              key={sup.id}
            >
              <a>
                <div className="bg-white p-6 rounded-2xl flex flex-col justify-between h-64 hover:shadow-lg transition-all duration-100 hover:scale-105">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-sky-500">
                      <Avatar
                        user={sup}
                        width={56}
                        height={56}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-base">{sup.name}</h3>
                      <span className="text-sm opacity-70">
                        {sup.department}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between px-4">
                    <div className="flex gap-3 items-center">
                      <Phone />
                      <span className="text-base">{sup.officePhone}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8.573 1.436a1.008 1.008 0 0 0-1.147 0L1.715 5.37a1.015 1.015 0 0 0-.441.8 39.981 39.981 0 0 0 .035 4.384c.091 1.029.333 2.39.53 3.39a.992.992 0 0 0 .977.8h2.659a.207.207 0 0 0 .205-.21V11.18a1.452 1.452 0 0 1 1.436-1.467h2.011a1.452 1.452 0 0 1 1.436 1.467v3.353a.207.207 0 0 0 .205.21h2.415a.992.992 0 0 0 .977-.8c.2-1 .439-2.361.53-3.39a39.963 39.963 0 0 0 .035-4.384 1.015 1.015 0 0 0-.441-.8ZM6.739.394a2.217 2.217 0 0 1 2.522 0l5.712 3.933a2.278 2.278 0 0 1 .983 1.791 41.135 41.135 0 0 1-.039 4.545c-.1 1.1-.352 2.52-.549 3.525A2.229 2.229 0 0 1 13.184 16h-2.416a1.452 1.452 0 0 1-1.436-1.467V11.18a.207.207 0 0 0-.205-.21H7.116a.207.207 0 0 0-.205.21v3.353A1.452 1.452 0 0 1 5.475 16H2.816a2.229 2.229 0 0 1-2.183-1.812c-.2-1.005-.452-2.423-.549-3.525a41.144 41.144 0 0 1-.039-4.545 2.279 2.279 0 0 1 .983-1.791Z"
                          fill="#171725"
                          fillRule="evenodd"
                        />
                      </svg>
                      <span className="text-base">{sup.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex flex-col items-center gap-1.5 font-bold text-base">
                      <span className="opacity-50 font-light text-sm">
                        Items purchased
                      </span>
                      {sup.purchaseCount}
                    </div>
                    <div className="flex flex-col items-center gap-1.5 font-bold text-base">
                      <span className="opacity-50 font-light text-sm">
                        min Order Value
                      </span>
                      {sup.minOrderValue} $
                    </div>
                    <div className="flex flex-col items-center gap-1.5 font-bold text-base">
                      <span className="opacity-50 font-light text-sm">
                        Delivery Fees
                      </span>
                      {sup.deliveryFee} $
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export default Supplier
