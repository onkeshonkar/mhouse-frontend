import dayjs from "dayjs"
import Image from "next/image"
import { useState } from "react"
import useFileReader from "../../../hooks/useFileReader"
import { Camera, Edit, Notebook } from "../../icons"

const experiences = {
  comapny: "Comapany Name",
  department: "Department name",
  logo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
  startDate: "08 Mar 2020",
  endDate: "15 Jan 2021",
}

const Experience = ({ employee }) => {
  const updateExperience = () => {}

  const { file, onSelect, onDiscard } = useFileReader(
    "image/png, image/jpg, image/jpeg, application/pdf"
  )
  return (
    <div className="px-2 mt-6 flex flex-col">
      {employee.experience && (
        <>
          <div className="flex justify-between ">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-xl relative group bg-slate-100 flex items-center justify-center text-xs">
                {employee?.experience?.logo ? (
                  <Image
                    src={employee?.experience?.logo}
                    width={56}
                    height={56}
                    alt="logo"
                    objectFit="cover"
                    className="rounded-xl "
                  />
                ) : (
                  "No logo"
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-base font-bold text-primary">
                  {employee?.experience.companyName}
                </span>
                <span className="text-sm font-normal text-primary">
                  {employee?.experience?.department}
                </span>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div>
                <p className="flex items-center text-sm">
                  <span className="font-light opacity-50 w-[68px]">
                    Start Date
                  </span>
                  <span className="ml-11">
                    <Notebook width={16} height={16} />
                  </span>
                  <span className="ml-2">
                    {dayjs(employee?.experience.startDate).format("DD MM YYYY")}
                  </span>
                </p>

                <p className="flex items-center text-sm">
                  <span className="font-light opacity-50 w-[68px]">
                    {" "}
                    End Date
                  </span>
                  <span className="ml-11">
                    <Notebook width={16} height={16} />
                  </span>
                  <span className="ml-2">
                    {dayjs(employee?.experience.endDate).format("DD MM YYYY")}
                  </span>
                </p>
              </div>

              <div>
                <span className="text-[#B5B5BE]">(~3yrs)</span>
              </div>
            </div>
          </div>

          <div className="self-end mt-10">
            <button className="text-white text-sm font-normal bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] py-2 px-4 rounded-lg">
              Edit Experience
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Experience
