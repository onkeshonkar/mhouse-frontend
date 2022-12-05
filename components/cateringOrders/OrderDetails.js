import { useContext, useEffect, useRef, useState } from "react"
import { CateringOrderContext } from "../../context/CateringContext"

import { Arrow, Delete, Plus, Search } from "../icons"
import Button from "../ui/Button"
import Input from "../ui/Input"
import RadioInput from "../ui/RadioInput"
import TextArea from "../ui/TextArea"

const menus = [
  {
    id: "631",
    name: "Pizza Margarita",
    sellPrice: 20,
  },
  {
    id: "631f",
    name: "Pizza Chiken",
    sellPrice: 48,
  },
  {
    id: "631f2",
    name: "Chawmin",
    sellPrice: 50,
  },
]

const paymentTypes = ["Cash", "Eftpos", "Credit"]

const OrderDetails = ({ onNext, onBack }) => {
  const { orderDetail, setOrderDetails } = useContext(CateringOrderContext)

  const [query, setQuery] = useState("")
  const [paymentType, setPaymentType] = useState(
    orderDetail.paymentType || paymentTypes[0]
  )
  const [upfront, setUpfront] = useState(orderDetail.upfront || 0)
  const [note, setNote] = useState(orderDetail.note || "")
  const [cart, setCart] = useState(orderDetail.cart || [])
  const [showMenuList, setShowMenuList] = useState(false)

  const divRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowMenuList(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    inputRef.current.focus()
    setShowMenuList(true)
  }, [])

  const filteredMenu =
    query === ""
      ? menus
      : menus.filter((menuItem) => {
          return menuItem.name.toLowerCase().includes(query.toLowerCase())
        })

  const cartAmount = cart.reduce((acc, cartItem) => {
    return acc + cartItem.sellPrice * cartItem.qty
  }, 0)

  const onSubmit = () => {
    setOrderDetails({
      ...orderDetail,
      paymentType,
      upfront,
      note,
      cart,
    })
    onBack()
  }

  const addMenuToCart = (e) => {
    const menuId = e.currentTarget.name
    const foundMenu = menus.find((m) => m.id === menuId)
    setCart((prevCart) => {
      if (!prevCart.length) return [{ ...foundMenu, qty: 1 }]
      const cartMenu = prevCart.find((m) => m.id === menuId)
      if (cartMenu) cartMenu.qty++
      else prevCart.push({ ...foundMenu, qty: 1 })
      return [...prevCart]
    })
  }

  return (
    <>
      <h2 className="text-4xl font-semibold mt-20 mb-10">
        Add Order And Payment Details
      </h2>

      <div className="flex justify-between mx-auto w-full max-w-4xl">
        <div className="flex flex-col justify-between gap-7 w-full max-w-md">
          <div className="flex flex-col w-full relative">
            <div className="relative">
              <Input
                type="text"
                label="Search Item"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
                onClick={() => setShowMenuList(true)}
                ref={inputRef}
              />

              <Search
                width={20}
                height={20}
                className="absolute top-4 right-6"
              />
            </div>

            <ul
              ref={divRef}
              className={`${
                showMenuList ? "block" : "hidden"
              } w-full rounded-lg max-h-60 overflow-y-auto absolute top-14 bg-slate-50 z-20`}
            >
              {filteredMenu.map((menuItem) => (
                <li
                  key={menuItem.id}
                  className="px-5 py-2 hover:bg-slate-200 text-left flex gap-4 items-center"
                >
                  <button
                    name={menuItem.id}
                    onClick={addMenuToCart}
                    className="text-xs text-white bg-accent font-semibold rounded-md py-1.5 px-2 cursor-pointer"
                  >
                    ADD
                  </button>

                  <span>{menuItem.name}</span>
                  <span className="text-xs -ml-2 opacity-70 text-x-green">
                    ( {menuItem.sellPrice} $)
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 self-end">
            <div className="relative self-end">
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
              value={paymentType}
              options={paymentTypes}
              onChange={setPaymentType}
            />

            <TextArea
              label="Notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          {/* <ul className="flex flex-col gap-1">
            {cart.map((cartItem) => (
              <li
                key={cartItem.id}
                className=" rounded-2xl px-3 py-1.5 grid grid-cols-5 gap-5 bg-background items-center"
              >
                <div className="flex flex-col gap-2 col-span-2">
                  <span className="text-sm">{cartItem.name}</span>
                  <span className="text-xs opacity-80">
                    ( {cartItem.sellPrice} $)
                  </span>
                </div>
                <span>{cartItem.qty} </span>
                <span>{cartItem.sellPrice * cartItem.qty} $</span>
                <Delete width={16} height={16} className="text-x-red" />
              </li>
            ))}
          </ul> */}

          <div className="h-80 overflow-x-auto">
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
                    className="text-sm text-primary font-normal text-center px-5 py-2"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cart.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                      <div className="flex flex-col gap-2 col-span-2">
                        <span className="text-sm">{cartItem.name}</span>
                        <span className="text-xs opacity-80">
                          ( {cartItem.sellPrice} $)
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                      {cartItem.qty}
                    </td>
                    {/* <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
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
                    </td> */}

                    <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                      {cartItem.sellPrice * cartItem.qty} $
                    </td>

                    <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-bold">
                      <Delete
                        width={16}
                        height={16}
                        className="text-x-red"
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

          <div className="self-end flex flex-col items-end mt-8">
            <span className="font-bold text-2xl text-x-green">
              {cartAmount} $
            </span>
            <p className="text-sm font-light">Total Price</p>
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

export default OrderDetails
