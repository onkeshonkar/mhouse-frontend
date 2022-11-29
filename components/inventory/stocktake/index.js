import { useState } from "react"
import { Delete, Filter, Paper, Plus } from "../../icons"
import Button from "../../ui/Button"
import TooltipButton from "../../ui/ToolTipButton"
import AddStocktakeModal from "./AddStocktakeModal"

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
  const [isAddStocktake, setIsAddStocktake] = useState(false)

  return (
    <>
      {isAddStocktake && (
        <AddStocktakeModal onClose={() => setIsAddStocktake(false)} />
      )}

      <main>
        <header className="flex justify-between items-center px-4 -mt-10">
          <div>
            <h1 className="text-2xl font-bold">Stocktake Management</h1>
            <p className="text-sm font-light">160 Total Items (3,400$)</p>
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
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Unit
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Begin
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Purchased
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Min stocks
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Sold
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Waste
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  In-Stock
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {stockTakes.map((stocktake) => (
                <tr key={stocktake.id}>
                  <td className="whitespace-nowrap pl-8 pr-4 text-sm text-primary font-normal ">
                    {stocktake.item}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {stocktake.unit}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {stocktake.begin}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {stocktake.purchased}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {stocktake.minStock}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {stocktake.sold}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {stocktake.waste}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-sm text-primary font-normal ">
                    {stocktake.stock}
                  </td>

                  <td className="whitespace-nowrap py-5 px-4 text-base font-bold">
                    {stocktake.inStock}
                  </td>

                  <td className="whitespace-nowrap py-5 pl-8 text-sm text-primary font-normal ">
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
