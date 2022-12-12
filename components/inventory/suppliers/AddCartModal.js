import { useEffect, useState } from "react"

import { Arrow, Check, Close, Search } from "../../icons"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import useSupplierStore from "../../../stores/useSupplierStore"
import Input from "../../ui/Input"
import RadioInput from "../../ui/RadioInput"
import useSWR from "swr"
import useUserStore from "../../../stores/useUserStore"
import Spinner from "../../ui/Spinner"
import { toast } from "react-hot-toast"
import { APIService, fetcher } from "../../../lib/axios"

const paymentMethods = ["Cash", "Eftpos", "Credit"]

const AddCartModal = ({ onClose, supplier, mutateOrder }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [query, setQuery] = useState("")
  const [showSelectedItems, setShowSelectedItem] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])
  const [upfront, setUpfront] = useState(0)
  const [cart, setCart] = useState([])

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/stocktakes`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )

  useEffect(() => {
    if (data)
      setCart([
        ...data.stocktakes.map((product) => ({
          item: product.item,
          unit: product.unit,
          price: product.price,
          stocktakeId: product.id,
          minStock: product.minStock,
          currentStock: product.currentStock,
          quantity: 0,
        })),
      ])
  }, [data])

  const cartAmount = cart.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.quantity
  }, 0)

  const cartLength = cart.reduce((acc, cartItem) => {
    return acc + (cartItem.quantity > 0 ? 1 : 0)
  }, 0)

  const filteredCart =
    query === ""
      ? cart
      : cart.filter((c) => {
          return c.item.toLowerCase().includes(query.toLowerCase())
        })

  const handleSubmit = async () => {
    const data = {
      upfrontPayment: upfront,
      orderItems: cart,
      paymentMethod,
      supplier,
    }
    try {
      await APIService.post(
        `/v1/branches/${selectedBranch.id}/suppliers/orders`,
        data
      )
      toast.success("Order created")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    mutateOrder()
    onClose()
  }

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error("Network Error")
    } else {
      return (
        <span className="mt-4 block text-center">{`something went wrong`}</span>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

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
                      className="text-sm text-primary font-normal px-5 py-2"
                    >
                      Unit
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal px-5 py-2"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal px-5 py-2"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal px-5 py-2"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal px-5 py-2"
                    >
                      Min Stock
                    </th>
                    <th
                      scope="col"
                      className="text-sm text-primary font-normal px-5 py-2"
                    >
                      In Hand
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!showSelectedItems &&
                    filteredCart.map((cartItem) => (
                      <tr key={cartItem.stocktakeId}>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal text-left">
                          {cartItem.item}
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal">
                          {cartItem.unit}
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal">
                          <input
                            key={cartItem.stocktakeId}
                            type={"Number"}
                            className="block text-center w-16 px-5 py-2.5 text-sm bg-background outline-none focus:ring-2 ring-accent rounded-2xl"
                            value={cartItem.quantity}
                            onChange={(e) => {
                              const quantity = e.target.valueAsNumber || 0

                              setCart((prevCart) => {
                                return prevCart.map((item) => {
                                  if (item.stocktakeId == cartItem.stocktakeId)
                                    return {
                                      ...item,
                                      quantity,
                                    }
                                  else return { ...item }
                                })
                              })
                            }}
                          />
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal">
                          {cartItem.price} $
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal">
                          {cartItem.price * cartItem.quantity} $
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal">
                          {cartItem.minStock} {cartItem.unit}
                        </td>
                        <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-bold">
                          {cartItem.currentStock} {cartItem.unit}
                        </td>
                      </tr>
                    ))}

                  {showSelectedItems &&
                    filteredCart.map((cartItem) => {
                      if (cartItem.quantity == 0) return
                      return (
                        <tr key={cartItem.stocktakeId}>
                          <td className="whitespace-nowrap px-5  py-1 text-sm text-primary font-normal w-28">
                            {cartItem.item}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            {cartItem.unit}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            <input
                              type={"Number"}
                              className="block text-center w-16 px-5 py-2.5 text-sm bg-background outline-none focus:ring-2 ring-accent rounded-2xl"
                              value={cartItem.quantity}
                              onChange={(e) => {
                                const quantity = parseInt(
                                  e.target.valueAsNumber
                                )
                                if (isNaN(quantity)) return
                                setCart((prevCart) => {
                                  return prevCart.map((item) => {
                                    if (item.id == cartItem.id)
                                      return {
                                        ...item,
                                        quantity: quantity > 0 ? quantity : 0,
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
                            {cartItem.price * cartItem.quantity}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-normal ">
                            {cartItem.minStock}
                          </td>
                          <td className="whitespace-nowrap px-5 py-1 text-sm text-primary font-bold ">
                            {cartItem.currentStock} {cartItem.unit}
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
                <span className="font-bold text-2xl text-x-green">
                  {cartAmount} $
                </span>
                <p className="text-sm font-light">Total Cart Value</p>
              </div>
              <div>
                <span className="font-bold text-2xl text-x-green">
                  {cartLength}
                </span>
                <p className="text-sm font-light">Total items</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative mb-6 self-end">
                <Input
                  type="Number"
                  label="Upfront Paid"
                  className="w-56"
                  value={upfront}
                  onChange={(e) => setUpfront(e.target.valueAsNumber || 0)}
                />
                <span className="absolute text-sm top-4 right-6">AUD</span>
              </div>

              <RadioInput
                label={"Payment Method"}
                value={paymentMethod}
                options={paymentMethods}
                onChange={setPaymentMethod}
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
