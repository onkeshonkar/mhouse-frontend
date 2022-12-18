import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Arrow, Close } from "../../icons"
import Button from "../../ui/Button"
import Input from "../../ui/Input"
import ListInput from "../../ui/ListInput"
import Modal from "../../ui/Modal"
import { toast } from "react-hot-toast"
import { APIService } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"

const schema = z.object({
  item: z.string().min(3, { message: "Must be at least 3 char" }).max(50),
  minStock: z.number().min(1),
  price: z.number().min(1),
})

const units = ["Kg", "Liter", "Box", "Piece", "Package"]

const AddStocktakeModal = ({ onClose, mutate }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [unit, setUnit] = useState(units[0])
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { price: 0, minStock: 0 },
  })

  const onSubmit = async (stocktake) => {
    setIsLoading(true)
    const data = { ...stocktake, unit }
    try {
      await APIService.post(
        `/v1/branches/${selectedBranch.id}/stocktakes`,
        data
      )
      toast.success("stocktake added")
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong")
    }
    setIsLoading(false)
    mutate()
    onClose()
  }

  return (
    <div className=" flex flex-col gap-20 relative bg-white py-10 px-20 rounded-2xl">
      <button onClick={onClose} className="absolute right-10">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold">Add New Item To Stocktake</h2>

      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-4">
          <Input
            type="text"
            label="Item name"
            className="w-[470px]"
            {...register("item")}
            error={errors.item}
          />

          <div className="relative">
            <Controller
              name="price"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Price per unit"
                    className="w-56"
                    {...field}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    error={errors.price}
                  />
                )
              }}
            />
            <span className="absolute text-sm top-4 right-6">AUD</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Controller
            name="minStock"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  label="Min.Stock"
                  className="w-56"
                  {...field}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                  error={errors.minStock}
                />
              )
            }}
          />

          <div className="w-44 bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
            <ListInput options={units} value={unit} onChange={setUnit} />
            <label className="absolute text-xs opacity-50 left-6 top-1">
              Select Unit
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center ">
        <Button onClick={onClose} className="bg-primary" gradient={false}>
          <Arrow
            width={20}
            height={20}
            className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
          />
          <span>Back</span>
        </Button>

        <Button onClick={handleSubmit(onSubmit)} loading={isLoading}>
          <span>Next</span>
          <Arrow
            width={20}
            height={20}
            className="ml-6 group-hover:translate-x-1 duration-300"
          />
        </Button>
      </div>
    </div>
  )
}

export default AddStocktakeModal
