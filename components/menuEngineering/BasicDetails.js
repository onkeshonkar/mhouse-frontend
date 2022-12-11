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
import { menuEngContext } from "../../context/MenuEngContext"
import ListInput from "../ui/ListInput"

const seasons = ["Winter", "Summer", "Black Friday", "Weekend", "Holidays"]
const categories = ["Drinks", "Appetizers", "Sea Food", "House", "Holidays"]

const schema = z.object({
  menuName: z.string().min(3, { message: "Must be at least 3 char" }).max(50),
  sellingPrice: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Must be a valid number",
  }),
  prepareTime: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Must be a valid duration",
  }),
})

const BasicDetails = ({ onNext, onBack }) => {
  const { menuDetails, setMenuDetails } = useContext(menuEngContext)

  const [season, setSeason] = useState(menuDetails.season || seasons[0])
  const [category, setCategory] = useState(
    menuDetails.category || categories[0]
  )

  const { file, onDiscard, onSelect } = useFileReader(
    "image/png, image/jpg, image/jpeg"
  )
  const avatar = useMemo(() => {
    if (file) return file
    if (menuDetails.avatar) {
      return menuDetails.avatar
    }
    return ""
  }, [file, menuDetails])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    // console.log(data)
    setMenuDetails({ ...menuDetails, ...data, avatar })
    onNext()
  }

  return (
    <>
      <h2 className="text-4xl font-semibold mt-20 mb-10">
        Add Basic Info Of Item
      </h2>

      <div className="flex flex-col gap-5 max-w-xl mx-auto h-[400px] justify-around">
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
              } absolute flex flex-col items-center justify-center content-center inset-0 hover:opacity-100 px-10`}
            >
              <button onClick={onSelect}>
                <Camera width={48} height={48} className="text-gray-700" />
              </button>
              {!avatar && (
                <>
                  <span className="text-gray-700 ">
                    Upload Photo of End Item
                  </span>
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
              label="Menu Item Name"
              autoComplete="menuName"
              className="w-[350px]"
              defaultValue={menuDetails.menuName || ""}
              {...register("menuName")}
              error={errors.menuName}
            />

            <div className=" bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
              <ListInput
                value={category}
                options={categories}
                onChange={setCategory}
                placeholder="Select Category"
              />
              <label className="absolute text-xs opacity-50 left-6 top-1">
                Select Category
              </label>
            </div>

            <div className=" bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
              <ListInput
                value={season}
                options={seasons}
                onChange={setSeason}
                placeholder="Select Season"
              />
              <label className="absolute text-xs opacity-50 left-6 top-1">
                Select Season
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          <div className="relative self-end">
            <Input
              type="number"
              label="Selling Price"
              className="w-56"
              defaultValue={menuDetails.sellingPrice || ""}
              {...register("sellingPrice")}
              error={errors.sellingPrice}
            />
            <span className="absolute text-sm top-4 right-6">AUD</span>
          </div>

          <div className="relative self-end">
            <Input
              type="number"
              label="Preparing Time"
              autoComplete="prepareTime"
              className="w-64"
              defaultValue={menuDetails.prepareTime || ""}
              {...register("prepareTime")}
              error={errors.prepareTime}
            />
            <span className="absolute text-sm top-4 right-6">Minutes</span>
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

export default BasicDetails
