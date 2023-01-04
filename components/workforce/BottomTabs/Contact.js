import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import Input from "../../ui/Input"
import Button from "../../ui/Button"

import { Check, Edit, Gmail, Location, Phone } from "../../icons"

const schema = z.object({
  rName: z
    .string()
    .min(3, { message: "Name should be at least 3 char" })
    .max(50),
  rPhoneNumber: z.string().regex(/^(\+91)\d{10}$/, {
    message: "Phone No.should be 10 digits with country code +91",
  }),
  relation: z.string().min(3),
  phoneNumber: z.string().regex(/^(\+91)\d{10}$/, {
    message: "Phone No.should be 10 digits with country code +91",
  }),
  fullAddress: z
    .string()
    .min(5, { message: "Must be 5 or more char long" })
    .max(50, { message: "Must be 50 or fewer char long" }),
  email: z.string().email({ message: "Please enter a valid email" }),
})

const Contact = ({ employee }) => {
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullAddress: employee.fullAddress,
      phoneNumber: employee.user.phoneNumber,
      email: employee.user.email,
      rPhoneNumber: employee.emergencyContact.phoneNumber,
      rName: employee.emergencyContact.fullName,
      relation: employee.emergencyContact.relation,
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    console.log(data)
    setLoading(false)
    setEdit(false)
  }

  return (
    <div className="mt-6 flex gap-10 px-12">
      <div className="flex flex-col gap-4 justify-start">
        <span className="text-sm font-light opacity-50">
          Your contact details:
        </span>

        <div className="flex gap-4 items-center">
          <Location />
          <Input
            type="text"
            label="Full Address"
            {...register("fullAddress")}
            error={errors.fullAddress}
            disabled={!edit}
            className={`w-72 ${!edit && "bg-inherit"}`}
          />
        </div>

        <div className="flex gap-4 items-center">
          <Gmail />
          <Input
            type="email"
            label="Email"
            {...register("email")}
            error={errors.email}
            disabled={!edit}
            className={`w-72 ${!edit && "bg-inherit"}`}
          />
        </div>

        <div className="flex gap-4 items-center">
          <Phone />
          <Input
            type="text"
            label="Phone Number"
            {...register("phoneNumber")}
            error={errors.phoneNumber}
            disabled={!edit}
            className={`w-72 ${!edit && "bg-inherit"}`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-start">
        <span className="text-sm font-light opacity-50">
          Emergency contact details:
        </span>

        <Input
          type="text"
          label="Phone Number"
          {...register("rPhoneNumber")}
          error={errors.rPhoneNumber}
          disabled={!edit}
          className={`w-72 ${!edit && "bg-inherit"}`}
        />

        <Input
          type="text"
          label="Full Name"
          {...register("rName")}
          error={errors.rName}
          disabled={!edit}
          className={`w-72 ${!edit && "bg-inherit"}`}
        />

        <Input
          type="text"
          label="Relation"
          {...register("relation")}
          error={errors.relation}
          disabled={!edit}
          className={`w-72 ${!edit && "bg-inherit"}`}
        />
      </div>

      {edit && (
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="self-center ml-10"
        >
          Update
        </Button>
      )}

      {!edit && (
        <Button onClick={() => setEdit(true)} className="self-center ml-10">
          <Edit className="mr-2" width={15} height={15} />
          Edit
        </Button>
      )}
    </div>
  )
}

export default Contact
