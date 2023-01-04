import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import dayjs from "dayjs"

import { Arrow, Camera, Close } from "../icons"
import useFileReader from "../../hooks/useFileReader"
import useAddEmpStore from "../../stores/useAddEmpStore"
import Avatar from "../ui/Avatar"
import Input from "../ui/Input"
import ListInput from "../ui/ListInput"
import Button from "../ui/Button"

const genders = ["Male", "Female", "Others"]

const schema = z.object({
  fullName: z.string().min(3, { message: "Must be at least 3 char" }).max(50),
  dateOfBirth: z.string().min(3, { message: "Invalid date" }),
  phoneNumber: z.string().regex(/^(\+91)\d{10}$/, {
    message: "Must be 10 digits with country code +91",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  fullAddress: z
    .string()
    .min(5, { message: "Must be 5 or more char long" })
    .max(50, { message: "Must be 50 or fewer char long" }),
})

const BasicInfo = ({ onBack, onNext, onCancel }) => {
  const emp = useAddEmpStore((store) => store.emp)
  const updateEmp = useAddEmpStore((store) => store.updateEmp)

  const [gender, setGender] = useState(emp.gender || genders[0])

  const { file, onDiscard, onSelect } = useFileReader(
    "image/png, image/jpg, image/jpeg"
  )
  // const [avatar, setAavtar] = useState(emp.avatar || "")

  const avatar = useMemo(() => {
    if (file) return file
    if (emp.avatar) {
      return emp.avatar
    }
    return ""
  }, [file, emp])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    updateEmp({
      ...data,
      gender,
      avatar,
    })
    // console.log(emp)
    onNext()
  }

  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">Basic Info For User</h2>

      <div className="h-[340px]">
        <div className="flex gap-8 justify-center">
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
                  <span className="text-gray-700">Upload Image</span>
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
              label="Full Name"
              autoComplete="fullName"
              className="w-[350px]"
              defaultValue={emp.fullName || ""}
              {...register("fullName")}
              error={errors.fullName}
            />
            <Input
              type="date"
              label="Date of birth"
              autoComplete="dateOfBirth"
              className="w-[350px]"
              defaultValue={
                (emp.dateOfBirth &&
                  dayjs(emp.dateOfBirth).format("YYYY-MM-DD")) ||
                ""
              }
              {...register("dateOfBirth")}
              error={errors.dateOfBirth}
            />
            <div className=" bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
              <ListInput
                options={genders}
                value={gender}
                onChange={setGender}
                placeholder="Select Gender"
              />
              <label className="absolute text-xs opacity-50 left-6 top-1">
                Gender
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center max-w-3xl mx-auto">
          <div className="flex gap-6 mt-12 justify-between">
            <Input
              type="text"
              label="Phone Number"
              autoComplete="phoneNumber"
              className="w-[350px]"
              defaultValue={emp.phoneNumber || "+91"}
              {...register("phoneNumber")}
              error={errors.phoneNumber}
            />
            <Input
              type="email"
              label="Email"
              autoComplete="email"
              className="w-[350px]"
              defaultValue={emp.email || ""}
              {...register("email")}
              error={errors.email}
            />
          </div>
          <Input
            type="text"
            label="Full Address"
            autoComplete="fullAddress"
            className="w-full"
            defaultValue={emp.fullAddress || ""}
            {...register("fullAddress")}
            error={errors.fullAddress}
          />
        </div>
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
            <rect x="28" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="74.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 74.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="91" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="137.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 137.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="154" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="200.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 200.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="217" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="263.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 263.01 6.01)"
              fill="#F1F1F5"
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

export default BasicInfo
