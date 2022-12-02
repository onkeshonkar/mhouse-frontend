import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"

import { Draft, Filter, Plus, Report } from "../components/icons/"
import AddTaskModal from "../components/task/AddTaskModal"
import Avatar from "../components/ui/Avatar"
import Button from "../components/ui/Button"
import Spinner from "../components/ui/Spinner"
import TooltipButton from "../components/ui/ToolTipButton"
import { fetcher } from "../lib/axios"
import useUserStore from "../stores/useUserStore"

const menus = [
  {
    id: "631f2df5378e719aafc43e7",
    name: "Pizza Margarita",
    sellCount: 15,
    sellPrice: 48,
    costPrice: 20,
    nutriScore: "A",
    popularity: "High",
    profitability: "High",
    status: "Plowhorse",
  },
  {
    id: "631f2df5378e719aafc3e7",
    name: "Pizza Chiken",
    picture: "abc",
    sellCount: 15,
    sellPrice: 48,
    costPrice: 20,
    nutriScore: "A",
    popularity: "High",
    profitability: "Low",
    status: "Plowhorse",
  },
  {
    id: "631f2df5378e719aafc437",
    name: "Chawmin",
    picture: "abc",
    sellCount: 15,
    sellPrice: 48,
    costPrice: 20,
    nutriScore: "A",
    popularity: "LOw",
    profitability: "Low",
    status: "Stars",
  },
]

const MenuEngineering = () => {
  const [isAddNewMenu, setIsAddNewMenu] = useState(false)
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  return (
    <>
      {/* {isAddNewMenu && (
        <AddTaskModal onCancel={() => setIsAddNewMenu(false)} />
      )} */}

      <div className="mt-8 ml-6">
        <div className="flex item center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Menu Engineering</h1>
            <p className="text-sm font-light">{menus.length} Total Items</p>
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
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  No. Sold (of All items)
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Sell Price
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Cost Price
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Nutri Score
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Popularity
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-4 py-2"
                >
                  Profitability
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
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <td className="text-sm text-primary font-normal text-left pl-8 pr-4 py-2">
                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent">
                        {menu.picture ? (
                          <Image
                            // src={user.avatar}
                            src={
                              "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                            }
                            alt="avatar"
                            width={36}
                            height={36}
                            objectFit="cover"
                            className="rounded-xl"
                          />
                        ) : (
                          <span className="text-xl text-white flex p-0">
                            {menu.name?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span>{menu.name}</span>
                    </div>
                  </td>

                  <td className="text-sm text-primary font-bold text-left px-4 py-2">
                    {menu.sellCount}
                  </td>

                  <td className="text-sm text-accent font-normal text-left px-4 py-2">
                    $ {menu.sellPrice}
                  </td>

                  <td className="text-sm text-x-red font-normal text-left px-4 py-2">
                    $ {menu.costPrice}
                  </td>

                  <td className="text-sm text-primary font-normal text-left px-4 py-2">
                    <span className="p-2 rounded-xl bg-x-green text-white">
                      {menu.nutriScore}
                    </span>
                  </td>

                  <td className="text-sm text-primary font-normal text-left px-4 py-2">
                    {menu.popularity}
                  </td>

                  <td className="text-sm text-primary font-normal text-left px-4 py-2">
                    {menu.profitability}
                  </td>

                  <td className="text-sm text-primary font-normal text-left px-4 py-2">
                    {menu.status}
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
