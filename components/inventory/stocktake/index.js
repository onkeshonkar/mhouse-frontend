import { Filter, Paper, Plus } from "../../icons"
import Button from "../../ui/Button"
import TooltipButton from "../../ui/ToolTipButton"

const stockTakes = [
  {
    item: "Tomato",
    unit: "kg",
    begin: "7.00 kg",
    purchased: "8.00 kg",
    minStock: "10.00 kg",
    sold: "3.00 kg",
    stock: "6.00",
    waste: "1.50 kg",
    inStock: "1.50 kg",
  },
]

const Stocktake = () => {
  return (
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

          <Button onClick={() => setIsNewCash(true)}>
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

          <tbody className="bg-white"></tbody>
        </table>
      </div>
    </main>
  )
}

export default Stocktake
