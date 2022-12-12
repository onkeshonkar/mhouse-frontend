import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Arrow } from "../../icons"
import Button from "../../ui/Button"
import DepartmentList from "../../ui/DepartmentList"
import Input from "../../ui/Input"
import RadioInput from "../../ui/RadioInput"
import TextArea from "../../ui/TextArea"
import useSupplierStore from "../../../stores/useSupplierStore"
import { toast } from "react-hot-toast"

const orderMethods = ["Email", "SMS", "Portal", "Link Via SMS"]

const schema = z.object({
  minOrderValue: z.number().min(1),
  deliveryFee: z.number().min(0),
  deliveryInstruction: z
    .string()
    .min(10, { message: "Must be 10 or more char long" })
    .max(200, { message: "Must be 50 or fewer char long" }),
})

const Instructions = ({ onNext, onBack }) => {
  const supplier = useSupplierStore((store) => store.supplier)
  const updateSupplier = useSupplierStore((store) => store.updateSupplier)

  const [orderVia, setOrderVia] = useState(supplier.orderVia || orderMethods[0])
  const [department, setDepartment] = useState(supplier.department || "")

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      minOrderValue: supplier.minOrderValue || 0,
      deliveryFee: supplier.deliveryFee || 0,
    },
  })

  // setValue()

  const onSubmit = async (data) => {
    if (!department) return toast.error("Select Department")
    updateSupplier({ ...data, department, orderVia })
    onNext()
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold mt-20 mb-10">
        Let We Subscribe Some Instructions
      </h2>

      <div className="flex flex-col gap-6 h-[456px] max-w-3xl mx-auto justify-center">
        <div className="self-center">
          <RadioInput
            label={"Order Via"}
            value={orderVia}
            options={orderMethods}
            onChange={setOrderVia}
          />
        </div>

        <div className="flex gap-6">
          <DepartmentList value={department} onChange={setDepartment} />

          <div className="relative">
            <Controller
              name="minOrderValue"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    // type="number"
                    label="min order value"
                    className="w-56"
                    {...field}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    error={errors.minOrderValue}
                  />
                )
              }}
            />
            <span className="absolute text-sm top-4 right-6">AUD</span>
          </div>

          <div className="relative">
            {/* <Input
              type="number"
              label="Delivery Fees"
              className="w-56"
              defaultValue={supplier.deliveryFee || 0}
              {...register("deliveryFee")}
              error={errors.deliveryFee}
            /> */}
            <Controller
              name="deliveryFee"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Delivery Fees"
                    className="w-56"
                    {...field}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    error={errors.deliveryFee}
                  />
                )
              }}
            />
            <span className="absolute text-sm top-4 right-6">AUD</span>
          </div>
        </div>

        <TextArea
          type="text"
          label="Delivery Instructions"
          className="w-full"
          defaultValue={supplier.deliveryInstruction || ""}
          {...register("deliveryInstruction")}
          error={errors.deliveryInstruction}
        />
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
  )
}

export default Instructions
