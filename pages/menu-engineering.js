import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"

import { Filter, Plus, Report } from "../components/icons/"
import AddMenuModal from "../components/menuEngineering/AddMenuModal"
import Button from "../components/ui/Button"
import Spinner from "../components/ui/Spinner"
import TooltipButton from "../components/ui/ToolTipButton"
import { fetcher } from "../lib/axios"
import useUserStore from "../stores/useUserStore"

function random_item(items) {
  return items[Math.floor(Math.random() * items.length)]
}

const menuStatus = ["Plowhorse", "Stars", "Puzzle", "Dog"]

const MenuEngineering = () => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [isAddNewMenu, setIsAddNewMenu] = useState(false)

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/menu`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return <span>{"Can't fetch menu list"}</span>
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const { menu } = data
  const totalItemSold = menu.reduce((prevVal, currVal) => {
    return prevVal + currVal.sellCount
  }, 0)

  return (
    <>
      {isAddNewMenu && (
        <AddMenuModal onClose={() => setIsAddNewMenu(false)} mutate={mutate} />
      )}

      <div className="mt-8 ml-6">
        <div className="flex item center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Menu Engineering</h1>
            <p className="text-sm font-light">{menu.length} Total Items</p>
          </div>

          <div className="flex gap-4 items-center">
            <TooltipButton text="Report">
              <Report />
            </TooltipButton>

            <TooltipButton text="Filter">
              <Filter />
            </TooltipButton>

            <Button onClick={() => setIsAddNewMenu(true)}>
              <Plus width={12} height={12} />
              <span className="text-base font-semibold ml-2">New Item</span>
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
                  Item Name
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  No. Sold (% of All items)
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Sell Price
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Cost Price
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Nutri Score
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Popularity
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center px-4 py-2"
                >
                  Profitability
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
              {menu.map((menuItem) => (
                <tr key={menuItem.id}>
                  <td className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2">
                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent">
                        {menuItem.picture ? (
                          <Image
                            src={menuItem.picture}
                            alt="menu pic"
                            width={36}
                            height={36}
                            objectFit="cover"
                            className="rounded-xl"
                          />
                        ) : (
                          <span className="text-xl text-white flex p-0">
                            {menuItem.dish?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span>{menuItem.dish}</span>
                    </div>
                  </td>

                  <td className="text-sm text-primary font-bold text-center px-4 py-2">
                    {menuItem.sellCount}{" "}
                    <span className="opacity-50">
                      ({(menuItem.sellCount * 100) / totalItemSold} %)
                    </span>
                  </td>

                  <td className="text-sm text-accent font-normal text-center px-4 py-2">
                    $ {menuItem.sellPrice}
                  </td>

                  <td className="text-sm text-x-red font-normal text-center px-4 py-2">
                    $ {menuItem.rawMaterialCost}
                  </td>

                  <td className="text-sm text-primary font-normal text-center px-4 py-2">
                    <span className="p-2 rounded-xl bg-x-green text-white">
                      {menuItem.nutriScore}
                    </span>
                  </td>

                  <td className="text-sm text-primary font-normal text-center px-4 py-2">
                    {random_item(["High", "Low"])}
                  </td>

                  <td className="text-sm text-primary font-normal text-center px-4 py-2">
                    {random_item(["High", "Low"])}
                  </td>

                  <td className="text-sm text-primary font-normal text-center px-4 py-2">
                    {random_item(menuStatus)}
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

export default MenuEngineering
