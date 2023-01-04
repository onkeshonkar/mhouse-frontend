import { useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import useSWR from "swr"
import { CateringOrderContext } from "../../context/CateringContext"
import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"

import { Arrow, Delete, Plus, Search } from "../icons"
import Button from "../ui/Button"
import Input from "../ui/Input"
import RadioInput from "../ui/RadioInput"
import Spinner from "../ui/Spinner"
import TextArea from "../ui/TextArea"

const paymentMethods = ["Cash", "Eftpos", "Credit"]

const OrderDetails = ({ handleSubmit, onBack }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const { orderDetails, setOrderDetails } = useContext(CateringOrderContext)

  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [paymentMethod, setPaymentMethod] = useState(
    orderDetails.paymentMethod || paymentMethods[0]
  )
  const [upfrontPayment, setUpfrontPayment] = useState(
    orderDetails.upfrontPayment || 0
  )
  const [notes, setNotes] = useState(orderDetails.notes || "")
  const [cart, setCart] = useState(orderDetails.cart || [])
  const [showMenuList, setShowMenuList] = useState(false)

  const divRef = useRef()
  const inputRef = useRef()

  const { data, error } = useSWR(
    `/v1/branches/${selectedBranch.id}/menu?meta=false`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

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
    inputRef.current?.focus()
    setShowMenuList(true)
  }, [])

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

  const filteredMenu =
    query === ""
      ? menu
      : menu.filter((menuItem) => {
          return menuItem.name.toLowerCase().includes(query.toLowerCase())
        })

  const cartAmount = cart.reduce((acc, cartItem) => {
    return acc + cartItem.sellPrice * cartItem.quantity
  }, 0)

  const onSubmit = async () => {
    setOrderDetails({
      ...orderDetails,
      paymentMethod,
      upfrontPayment,
      notes,
      cart,
    })

    setIsLoading(true)

    await handleSubmit({
      ...orderDetails,
      paymentMethod,
      upfrontPayment,
      notes,
      cart,
    })

    setIsLoading(false)
  }

  const addMenuToCart = (e) => {
    const menuId = e.currentTarget.name
    const foundMenu = menu.find((m) => m.id === menuId)
    setCart((prevCart) => {
      if (!prevCart.length) return [{ ...foundMenu, quantity: 1 }]
      const cartMenu = prevCart.find((m) => m.id === menuId)
      if (cartMenu) cartMenu.quantity++
      else prevCart.push({ ...foundMenu, quantity: 1 })
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
                label="Search Menu"
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

                  <span>{menuItem.dish}</span>
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
                type="Number"
                label="upfrontPayment Paid"
                className="w-56"
                value={upfrontPayment}
                onChange={(e) => setUpfrontPayment(e.target.valueAsNumber || 0)}
              />
              <span className="absolute text-sm top-4 right-6">AUD</span>
            </div>

            <RadioInput
              value={paymentMethod}
              options={paymentMethods}
              onChange={setPaymentMethod}
            />

            <TextArea
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between">
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
                    quantity
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
                        <span className="text-sm">{cartItem.dish}</span>
                        <span className="text-xs opacity-80">
                          ( {cartItem.sellPrice} $)
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                      {cartItem.quantity}
                    </td>
                    {/* <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                      <input
                        type={"number"}
                        className="block text-center w-16 px-5 py-2.5 text-sm bg-background outline-none focus:ring-2 ring-accent rounded-2xl"
                        value={cartItem.quantity}
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value)
                          if (isNaN(quantity)) return

                          setCart((prevCart) => {
                            return prevCart.map((item) => {
                              if (item.id == cartItem.id)
                                return {
                                  ...item,
                                  quantity,
                                }
                              else return { ...item }
                            })
                          })
                        }}
                      />
                    </td> */}

                    <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                      {cartItem.sellPrice * cartItem.quantity} $
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

        <Button onClick={onSubmit} loading={isLoading}>
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
