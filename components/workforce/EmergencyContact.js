import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Arrow, Close } from "../icons"
import useAddEmpStore from "../../stores/useAddEmpStore"
import Input from "../ui/Input"
import Button from "../ui/Button"

const schema = z.object({
  fullName: z.string().min(3, { message: "Must be at least 3 char" }).max(50),
  relation: z.string().min(3, { message: "Must be at least 3 char" }).max(15),
  phoneNumber: z.string().regex(/^(\+91)\d{10}$/, {
    message: "Must be 10 digits with country code +91",
  }),
})

const EmergencyContact = ({ onBack, onNext, onCancel }) => {
  const emp = useAddEmpStore((store) => store.emp)
  const updateEmp = useAddEmpStore((store) => store.updateEmp)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    updateEmp({
      emergencyContact: { ...data },
    })

    onNext()
  }

  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">
        Emergency Contact Details
      </h2>

      <div className="flex flex-col gap-4 pt-14 items-center h-[340px]">
        <Input
          type="text"
          label="Full Name"
          className="w-[350px]"
          defaultValue={emp.emergencyContact?.fullName || ""}
          {...register("fullName")}
          error={errors.fullName}
        />

        <Input
          type="text"
          label="Phone Number"
          autoComplete="phoneNumber"
          className="w-[350px]"
          defaultValue={emp.emergencyContact?.phoneNumber || "+91"}
          {...register("phoneNumber")}
          error={errors.phoneNumber}
        />

        <Input
          type="text"
          label="Relation to Employee"
          autoComplete="relation"
          className="w-[350px]"
          defaultValue={emp.emergencyContact?.relation || ""}
          {...register("relation")}
          error={errors.relation}
        />
      </div>

      <div className="flex items-center justify-between mt-24 w-laptop">
        <Button onClick={onBack} className="bg-primary" gradient={false}>
          <Arrow
            width={20}
            height={20}
            className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
          />
          <span> Back</span>
        </Button>

        <span>
          <svg
            width="400"
            height="12"
            viewBox="0 0 400 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 11.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="28" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="74.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 74.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="91" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="137.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 137.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="154" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="200.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 200.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="217" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="263.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 263.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="280" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="326.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 326.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="343" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="389.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 389.01 6.01)"
              fill="#F1F1F5"
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

export default EmergencyContact
