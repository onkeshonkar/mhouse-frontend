import { useState } from "react"

import { Arrow, Check, Close, Search } from "../../icons"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import useSupplierStore from "../../../stores/useSupplierStore"
import Input from "../../ui/Input"
import RadioInput from "../../ui/RadioInput"

const items = [
  {
    id: 12,
    item: "Burger",
    unit: "Piece",
    price: 10,
    minStock: "120",
    inHand: "130",
  },
  {
    id: 13,
    item: "Tomato",
    unit: "kg",
    price: 10,
    minStock: "10.00",
    inHand: "18",
  },
  {
    id: 14,
    item: "Meat",
    unit: "kg",
    price: 10,
    minStock: "10.00",
    inHand: "10",
  },
  {
    id: 15,
    item: "Besan",
    unit: "kg",
    price: 18,
    minStock: "100",
    inHand: "112",
  },
  {
    id: 16,
    item: "Sauce",
    unit: "kg",
    price: 179,
    minStock: "5.00",
    inHand: "18",
  },
]

const paymentTypes = ["Cash", "Eftpos", "Credit"]

const AddCartModal = ({ onClose }) => {
  const [query, setQuery] = useState("")
  const [showSelectedItems, setShowSelectedItem] = useState(false)
  const [paymentType, setPaymentType] = useState(paymentTypes[0])
  const [upfront, setUpfront] = useState(0)
  const [cart, setCart] = useState([
    ...items.map((item) => ({ ...item, qty: 0 })),
  ])

  const cartAmount = cart.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.qty
  }, 0)

  const cartLength = cart.reduce((acc, cartItem) => {
    return acc + (cartItem.qty > 0 ? 1 : 0)
  }, 0)

  const filteredCart =
    query === ""
      ? cart
      : cart.filter((c) => {
          return c.item.toLowerCase().includes(query.toLowerCase())
        })

  const handleSubmit = () => {
    onClose()
  }

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
      <div className="max-w-8xl min-h-screen flex flex-col relative ">
        <button onClick={onClose} className="absolute right-0 mt-20">
          <Close />
        </button>
        <h2 className="text-4xl font-semibold mt-20 mb-10">
          Let&apos;s Build Cart By Add Order Details
        </h2>

        <div className="flex gap-6 justify-center">
          <div className="flex flex-col gap-8 w-full max-w-2xl">
            <div className="flex justify-between">
              <div className="relative">
                <Input
                  type="text"
                  label="Search Item"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <Search
                  width={20}
                  height={20}
                  className="absolute top-4 right-6"
                />
              </div>

              <div
                role="checkbox"
                aria-checked={showSelectedItems}
                className={`${
                  showSelectedItems ? "bg-primary" : "bg-[#F1F1F5]"
                } w-48 flex items-center justify-center py-4 gap-3 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out`}
                onClick={() => {
                  setShowSelectedItem(!showSelectedItems)
                }}
                onKeyUp={(e) => {
                  if (e.key === " ") setShowSelectedItem(!showSelectedItems)
                }}
              >
                <div
                  className={`${
                    showSelectedItems ? "bg-accent" : "bg-white"
                  } w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out`}
                >
                  {showSelectedItems && (
                    <Check className="text-white -mt-0.5" />
                  )}
                </div>

                <span
                  className={`${
                    showSelectedItems ? "text-white" : "text-primary"
                  } text-sm transition-all duration-100`}
                >
                  Show Item selected
                </span>
              </div>
            </div>

            <div className="h-80">
              <table className="min-w-full border-spacing-y-1 border-separate">
                <thead className="bg-[#F1F1F5]">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-5 py-2 w-28"
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
                      className="text-sm text-primary font-normal text-left px-5 py-2"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-5 py-2"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-5 py-2"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-5 py-2"
                    >
                      Min Stock
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal text-left px-5 py-2"
                    >
                      In Hand
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!showSelectedItems &&
                    filteredCart.map((cartItem) => (
                      <tr key={cartItem.id}>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                          {cartItem.item}
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                          {cartItem.unit}
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                          <input
                            type={"number"}
                            className="block text-center w-16 px-5 py-2.5 text-sm bg-background outline-none focus:ring-2 ring-accent rounded-2xl"
                            value={cartItem.qty}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value)
                              if (isNaN(qty)) return

                              setCart((prevCart) => {
                                return prevCart.map((item) => {
                                  if (item.id == cartItem.id)
                                    return {
                                      ...item,
                                      qty,
                                    }
                                  else return { ...item }
                                })
                              })
                            }}
                          />
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                          {cartItem.price} $
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                          {cartItem.price * cartItem.qty} $
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                          {cartItem.minStock} {cartItem.unit}
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-bold ">
                          {cartItem.inHand} {cartItem.unit}
                        </td>
                      </tr>
                    ))}

                  {showSelectedItems &&
                    filteredCart.map((cartItem) => {
                      if (cartItem.qty == 0) return
                      return (
                        <tr key={cartItem.id}>
                          <td className="whitespace-nowrap px-5  py-1 text-sm text-primary font-normal w-28">
                            {cartItem.item}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            {cartItem.unit}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            <input
                              type={"number"}
                              className="block text-center w-16 px-5 py-2.5 text-sm bg-background outline-none focus:ring-2 ring-accent rounded-2xl"
                              value={cartItem.qty}
                              onChange={(e) => {
                                const qty = parseInt(e.target.value)

                                setCart((prevCart) => {
                                  return prevCart.map((item) => {
                                    if (item.id == cartItem.id)
                                      return {
                                        ...item,
                                        qty: qty > 0 ? qty : 0,
                                      }
                                    else return { ...item }
                                  })
                                })
                              }}
                            />
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            {cartItem.price}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            {cartItem.price * cartItem.qty}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            {cartItem.minStock}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-bold ">
                            {cartItem.inHand}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-bold text-2xl">{cartAmount} $</span>
                <p className="text-sm font-light">Total Cart Value</p>
              </div>
              <div>
                <span className="font-bold text-2xl">{cartLength}</span>
                <p className="text-sm font-light">Total items</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative mb-6 self-end">
                <Input
                  type="number"
                  label="Upfront Paid"
                  className="w-56"
                  value={upfront}
                  onChange={(e) => setUpfront(e.target.value)}
                />
                <span className="absolute text-sm top-4 right-6">AUD</span>
              </div>

              <RadioInput
                label={"Payment Method"}
                value={paymentType}
                options={paymentTypes}
                onChange={setPaymentType}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-14 w-laptop">
          <Button onClick={onClose} className="bg-primary" gradient={false}>
            <Arrow
              width={20}
              height={20}
              className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
            />
            <span>Back</span>
          </Button>

          <Button onClick={handleSubmit}>
            <span>Add Cart</span>
            <Arrow
              width={20}
              height={20}
              className="ml-6 group-hover:translate-x-1 duration-300"
            />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddCartModal
