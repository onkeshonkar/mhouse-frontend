import { useContext, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import dayjs from "dayjs"

import useFileReader from "../../hooks/useFileReader"
import { Arrow, Camera } from "../icons"
import Avatar from "../ui/Avatar"
import Button from "../ui/Button"
import Input from "../ui/Input"
import RadioInput from "../ui/RadioInput"
import { CateringOrderContext } from "../../context/CateringContext"

const deliveryMethods = ["Delivery", "Pickup"]

const schema = z.object({
  fullName: z.string().min(3, { message: "Must be at least 3 char" }).max(50),
  phoneNumber: z.string().regex(/^(\+91)\d{10}$/, {
    message: "Must be 10 digits with country code +61",
  }),
  deliveryDate: z.string().min(3, { message: "Invalid date" }),
  deliveryTime: z.string().min(3, { message: "Invalid Time" }),
  fullAddress: z
    .string()
    .min(5, { message: "Must be 5 or more char long" })
    .max(50, { message: "Must be 50 or fewer char long" }),
})

const ClientDetails = ({ onNext, onBack }) => {
  const { orderDetails, setOrderDetails } = useContext(CateringOrderContext)

  const [deliveryMethod, setDeliveryMethod] = useState(
    orderDetails.deliveryMethod || deliveryMethods[0]
  )

  const { file, onDiscard, onSelect } = useFileReader(
    "image/png, image/jpg, image/jpeg"
  )
  const avatar = useMemo(() => {
    if (file) return file
    if (orderDetails.avatar) {
      return orderDetails.avatar
    }
    return ""
  }, [file, orderDetails])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    // console.log(data)
    setOrderDetails({ ...orderDetails, ...data, avatar, deliveryMethod })
    onNext()
  }

  return (
    <>
      <h2 className="text-4xl font-semibold mt-20 mb-10">
        Add Basic Info Of Order
      </h2>

      <div className="flex flex-col gap-5 max-w-xl mx-auto">
        <div className="flex gap-8 items-center ">
          <div className="flex flex-col items-center justify-center content-center w-48 h-48 bg-background rounded-2xl relative cursor-pointer group">
            {avatar && (
              <Avatar
                user={{ avatar: URL.createObjectURL(avatar) }}
                height={192}
                width={192}
                className="rounded-2xl"
              />
            )}
            <div
              className={`${
                avatar ? "opacity-0 " : ""
              } absolute flex flex-col items-center justify-center content-center inset-0 hover:opacity-100`}
            >
              <button onClick={onSelect}>
                <Camera width={48} height={48} className="text-gray-700" />
              </button>
              {!avatar && (
                <>
                  <span className="text-gray-700">Upload client img</span>
                  <span className="text-gray-700">(optional) </span>
                </>
              )}
            </div>
            {avatar && (
              <button
                onClick={onDiscard}
                className="absolute top-10 right-5 bg-gray-100 bg-opacity-30 p-0.5 text-red-600 rounded-full  hidden group-hover:flex "
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Input
              type="text"
              label="Client Full Name"
              autoComplete="fullName"
              className="w-[350px]"
              defaultValue={orderDetails.fullName || ""}
              {...register("fullName")}
              error={errors.fullName}
            />
            <Input
              type="text"
              autoComplete="phoneNumber"
              className="w-[350px]"
              label="Client Phone Number"
              defaultValue={orderDetails.phoneNumber || "+91"}
              {...register("phoneNumber")}
              error={errors.phoneNumber}
            />
          </div>
        </div>

        <Input
          type="text"
          label="Full Address"
          autoComplete="fullAddress"
          className="w-full"
          defaultValue={orderDetails.fullAddress || ""}
          {...register("fullAddress")}
          error={errors.fullAddress}
        />

        <div className="self-center">
          <RadioInput
            value={deliveryMethod}
            options={deliveryMethods}
            onChange={setDeliveryMethod}
            label={"Select delivery method"}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <Input
            type="date"
            label="Delivery Date"
            autoComplete="deliveryDate"
            className="w-64"
            defaultValue={
              (orderDetails.deliveryDate &&
                dayjs(orderDetails.deliveryDate).format("YYYY-MM-DD")) ||
              dayjs().format("YYYY-MM-DD")
            }
            {...register("deliveryDate")}
            error={errors.deliveryDate}
          />
          <Input
            type="time"
            label="Delivery Time"
            autoComplete="deliveryTime"
            className="w-64"
            defaultValue={orderDetails.deliveryTime || ""}
            {...register("deliveryTime")}
            error={errors.deliveryTime}
          />
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
            <rect x="24" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="70.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 70.01 6.01)"
              fill="#F1F1F5"
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
    </>
  )
}

export default ClientDetails
