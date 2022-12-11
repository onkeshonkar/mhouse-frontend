import { useContext, useState } from "react"

import { menuEngContext } from "../../context/MenuEngContext"
import { Arrow, Delete, Plus, Search } from "../icons"
import Button from "../ui/Button"
import Input from "../ui/Input"

const stockTakes = [
  {
    id: 12,
    item: "Tomato",
    unit: "kg",
    price: 12,
  },
  {
    id: 123,
    item: "Burger",
    unit: "L",
    price: 14,
  },
  {
    id: 1234,
    item: "Meat",
    unit: "kg",
    price: 19,
  },
]

const AddRawMaterial = ({ onNext, onBack }) => {
  const { menuDetails, setMenuDetails } = useContext(menuEngContext)
  const [query, setQuery] = useState("")
  const [cart, setCart] = useState(menuDetails.cart || [])

  const filteredStock =
    query === ""
      ? stockTakes
      : stockTakes.filter((stock) => {
          return stock.item.toLowerCase().includes(query.toLowerCase())
        })

  const onSubmit = () => {
    setMenuDetails({
      ...menuDetails,
      cart,
    })
    onBack()
  }

  const cartAmount = cart.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.qty
  }, 0)

  const addMenuToCart = (e) => {
    const stockId = e.currentTarget.name
    const foundStock = stockTakes.find((m) => m.id == stockId)
    setCart((prevCart) => {
      if (!prevCart.length) return [{ ...foundStock, qty: 1 }]
      const cartStock = prevCart.find((m) => m.id == stockId)
      if (cartStock) cartStock.qty++
      else prevCart.push({ ...foundStock, qty: 1 })
      return [...prevCart]
    })
  }

  return (
    <>
      <h2 className="text-4xl font-semibold mt-20 mb-10">Add Raw Material</h2>

      <div className="flex flex-col gap-7 h-[400px] max-w-7xl w-full mx-auto">
        <div className="flex justify-between">
          <div className="relative w-full max-w-sm">
            <Input
              type="text"
              label="Search Item"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />

            <Search width={20} height={20} className="absolute top-4 right-6" />
          </div>

          <div className="flex flex-col ">
            <span className="font-bold text-2xl text-x-green">
              {cartAmount} $
            </span>
            <p className="text-sm font-light">Total Price</p>
          </div>
        </div>

        <div className="flex gap-9 justify-between max-h-80 overflow-y-auto">
          <table className="max-w-xl w-full border-spacing-y-1 border-separate">
            <thead className="bg-[#F1F1F5]">
              <tr>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-5 py-2"
                >
                  Item
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-5 py-2"
                >
                  Unit
                </th>

                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-left px-2 py-2"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="text-sm text-primary font-normal text-center  px-2 py-2"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStock.map((stockTake) => (
                <tr key={stockTake.id}>
                  <td className="text-sm text-primary font-normal text-left px-5 py-2">
                    {stockTake.item}
                  </td>

                  <td className="whitespace-nowrap px-5 py-2 text-sm text-primary font-normal text-left">
                    {stockTake.unit}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-primary font-normal text-left">
                    {stockTake.price} $
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-primary font-normal ">
                    <button
                      name={stockTake.id}
                      onClick={addMenuToCart}
                      className="text-xs text-white bg-accent font-semibold rounded-md py-1.5 px-2 cursor-pointer"
                    >
                      ADD
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="max-w-xl w-full">
            <h3 className="bg-primary text-white text-left px-4 py-2 text-sm">
              Raw Material added to this Menu Item
            </h3>
            <table className=" w-full border-spacing-y-1 border-separate max-h-80 overflow-y-auto">
              <tbody>
                {cart.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td className="text-sm text-primary font-normal text-left px-5 py-2">
                      <div className="flex flex-col gap-2 col-span-2">
                        <span className="text-sm">{cartItem.item}</span>
                        <span className="text-xs opacity-80">
                          ( {cartItem.price} $)
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-2 text-sm text-primary font-normal text-left">
                      {cartItem.qty}
                      <span className="opacity-60"> {cartItem.unit}</span>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-primary font-normal text-left">
                      {cartItem.price * cartItem.qty} $
                    </td>
                    <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-bold">
                      <Delete
                        width={16}
                        height={16}
                        className="text-x-red cursor-pointer"
                        onClick={() => {
                          setCart((prevCart) =>
                            prevCart.filter((m) => m.id !== cartItem.id)
                          )
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-14 w-laptop">
        <Button onClick={onBack} className="bg-primary" gradient={false}>
          <Arrow
            width={20}
            height={20}
            className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
          />
          <span>Back</span>
        </Button>

        <span>
          <svg
            width="76"
            height="12"
            viewBox="0 0 76 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="24" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="70.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 70.01 6.01)"
              fill="#FFC34A"
            />
            <circle
              cx="6.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 6.01 6.01)"
              fill="#FFC34A"
            />
          </svg>
        </span>

        <Button onClick={onSubmit}>
          <span>Next</span>
          <Arrow
            width={20}
            height={20}
            className="ml-6 group-hover:translate-x-1 duration-300"
          />
        </Button>
      </div>
    </>
  )
}

export default AddRawMaterial