import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Arrow, Close } from "../../icons"
import Button from "../../ui/Button"
import Input from "../../ui/Input"
import ListInput from "../../ui/ListInput"
import Modal from "../../ui/Modal"
import SupplierList from "./SupplierList"

const schema = z.object({
  itemName: z.string().min(3, { message: "Must be at least 3 char" }).max(50),
  minStock: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  qty: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
})

const units = ["Kg", "Liter", "Box", "Piece", "Package"]

const AddStocktakeModal = ({ onClose }) => {
  const [unit, setUnit] = useState(units[0])
  const [supplier, setSupplier] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
      <div className="max-w-8xl min-h-screen flex flex-col relative ">
        <button onClick={onClose} className="absolute right-0 mt-20">
          <Close />
        </button>

        <h2 className="text-4xl font-semibold my-20">
          Add New Item To Stocktake
        </h2>

        <div className="flex flex-col gap-4 items-center pt-20 h-[456px]">
          <div className="flex gap-4">
            <Input
              type="text"
              label="Item name"
              className="w-[470px]"
              {...register("itemName")}
              error={errors.itemName}
            />

            <div className="relative">
              <Input
                type="number"
                label="Price"
                className="w-56"
                {...register("price")}
                error={errors.price}
              />
              <span className="absolute text-sm top-4 right-6">AUD</span>
            </div>

            <Input
              type="number"
              label="Min. Stock"
              className="w-36"
              {...register("minStock")}
              error={errors.minStock}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-44 bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
              <ListInput options={units} value={unit} onChange={setUnit} />

              <label className="absolute text-xs opacity-50 left-6 top-1">
                Select Unit
              </label>
            </div>

            <Input
              type="number"
              label="Qty"
              className="w-32"
              {...register("qty")}
              error={errors.qty}
            />

            <div className="w-80 bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
              <SupplierList
                value={supplier}
                onChange={setSupplier}
                placeholder="Select Supplier"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-laptop">
          <Button onClick={onClose} className="bg-primary" gradient={false}>
            <Arrow
              width={20}
              height={20}
              className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
            />
            <span>Back</span>
          </Button>

          <Button onClick={handleSubmit(onSubmit)}>
            <span>Next</span>
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

export default AddStocktakeModal
