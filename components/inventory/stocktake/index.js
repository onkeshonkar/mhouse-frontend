import { useState } from "react"
import useSWRImmutable from "swr/immutable"

import useUserStore from "../../../stores/useUserStore"
import { Delete, Filter, Paper, Plus } from "../../icons"
import Button from "../../ui/Button"
import TooltipButton from "../../ui/ToolTipButton"
import AddStocktakeModal from "./AddStocktakeModal"
import { fetcher } from "../../../lib/axios"
import Spinner from "../../ui/Spinner"

const stockTakes = [
  {
    id: 12,
    item: "Tomato",
    unit: "kg",
    begin: "7.00 kg",
    purchased: "8.00 kg",
    minStock: "10.00 kg",
    sold: "3.00 kg",
    waste: "1.50 kg",
    stock: "6.00 kg",
    inStock: "180 kg",
  },
  {
    id: 123,
    item: "Burger",
    unit: "L",
    begin: "9.00 kg",
    purchased: "8.00 kg",
    minStock: "10.00 kg",
    sold: "3.00 kg",
    waste: "1.50 kg",
    stock: "6.00 kg",
    inStock: "150 kg",
  },
  {
    id: 1234,
    item: "Meat",
    unit: "kg",
    begin: "7.00 kg",
    purchased: "8.00 kg",
    minStock: "10.00 kg",
    sold: "3.00 kg",
    waste: "1.50 kg",
    stock: "6.00 kg",
    inStock: "110 kg",
  },
]

const Stocktake = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [isAddStocktake, setIsAddStocktake] = useState(false)

  const { data, error, mutate } = useSWRImmutable(
    `/v1/branches/${selectedBranch.id}/stocktakes`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      // toast.error(JSON.stringify(error))
      return <span>{"Can't fetch stocktakes"}</span>
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const { stocktakes } = data

  return (
    <>
      {isAddStocktake && (
        <AddStocktakeModal
          onClose={() => setIsAddStocktake(false)}
          mutate={mutate}
        />
      )}

      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Stocktake Management</h1>
            <p className="text-sm font-light">
              {stocktakes.length} Total Items
            </p>
          </div>

          <div className="flex gap-6">
            <TooltipButton text={"Filter"}>
              <Filter className="text-x-grey" />
            </TooltipButton>

            <TooltipButton text={"Download PDF"}>
              <Paper className="text-x-grey" />
            </TooltipButton>

            <Button onClick={() => setIsAddStocktake(true)}>
              <Plus width={16} height={16} className="mr-2" />
              <span>New Item</span>
            </Button>
          </div>
        </header>

        <div className="mt-7">
          <table className="min-w-full border-spacing-y-1 border-separate">
            <thead className='bg-[#F1F1F5] leading-5 after:content-["."] after:block after:bg-background after:text-transparent'>
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal px-4 py-2 text-left"
                >
                  Unit
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal px-4 py-2 text-left"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal  px-4 py-2 text-center"
                >
                  Last Purchased
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal px-4 py-2 text-left"
                >
                  Min stocks
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal px-4 py-2 text-left"
                >
                  Waste
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal px-4 py-2 text-center"
                >
                  In-Stock
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal px-4 py-2 text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {stocktakes.map((stocktake) => (
                <tr key={stocktake.id}>
                  <td className="whitespace-nowrap pl-8 pr-4 text-sm text-primary font-normal px-4 py-2">
                    {stocktake.item}
                  </td>

                  <td className="whitespace-nowrap text-sm text-primary font-normal px-4 py-2">
                    {stocktake.unit}
                  </td>

                  <td className="whitespace-nowrap text-sm text-primary font-normal px-4 py-2">
                    $ {stocktake.price}
                  </td>

                  <td className="whitespace-nowrap text-sm text-primary font-normal px-4 py-2 text-center">
                    {stocktake.lastBuy?.quantity || "---"}{" "}
                    {stocktake.lastBuy?.quantity && stocktake.unit}
                  </td>

                  <td className="whitespace-nowrap text-sm text-primary font-normal px-4 py-2">
                    {stocktake.minStock} {stocktake.unit}
                  </td>

                  <td className="whitespace-nowrap text-sm text-primary font-normal px-4 py-2">
                    {stocktake.waste} {stocktake.unit}
                  </td>

                  <td className="whitespace-nowrap text-base font-bold text-center">
                    {stocktake.currentStock} {stocktake.unit}
                  </td>

                  <td className="whitespace-nowrap text-sm text-primary font-normal px-4 py-2 text-center">
                    <button className="text-x-red" onClick={() => {}}>
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default Stocktake
