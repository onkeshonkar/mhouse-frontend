import { Fragment, useState } from "react"
import { Combobox } from "@headlessui/react"
import useSWR from "swr"
import toast from "react-hot-toast"

import { Chevron, Check, Plus, Delete } from "../icons"
import Spinner from "./Spinner"
import Button from "./Button"
import useUserStore from "../../stores/useUserStore"
import { APIService, fetcher } from "../../lib/axios"
import Input from "./Input"

const JobTitleList = ({ value, onChange }) => {
  const user = useUserStore((store) => store.user)
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [loading, setLoading] = useState(false)
  const [showAddBox, setShowAddBox] = useState(false)
  const [title, newTitle] = useState("")
  const [query, setQuery] = useState("")

  const { data, error, mutate } = useSWR(
    `/v1/branches/${selectedBranch.id}/job-titles`,
    fetcher,
    {
      errorRetryCount: 2,
    }
  )
  const filteredJobTitles =
    query === ""
      ? data?.jobTitles
      : data?.jobTitles?.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase())
        })

  const handleDeleteTitle = async (title) => {
    try {
      await APIService.delete(
        `/v1/branches/${selectedBranch.id}/job-titles?name=${title}`
      )
      toast.success("JobTitle Deleted")
      mutate()
      if (title === value) onChange("")
    } catch (error) {
      const { message } = error?.response?.data || ""
      toast.error(message)
      console.log(error)
    }
  }

  const handleAddDeptmnt = async (title) => {
    if (!title) return
    setLoading(true)
    try {
      await APIService.post(`/v1/branches/${selectedBranch.id}/job-titles`, {
        name: title,
      })
      toast.success("JobTitle added")
      mutate()
    } catch (error) {
      const { message } = error?.response?.data || error
      toast.error(message)
      console.log(error)
    }
    setLoading(false)
  }

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      toast.error(JSON.stringify(error))
      return <span>{"Can't fetch Job-Titles"}</span>
    }
  }

  if (!data)
    return (
      <div className="w-36 flex flex-col items-center bg-background gap-1 pt-1 pb-2 rounded-xl">
        <span>JobTitle</span>
        <Spinner />
      </div>
    )

  return (
    <div className="w-full relative">
      <Combobox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="flex justify-between items-center bg-background rounded-2xl h-[50px] outline-2 outline-accent">
              <Combobox.Input
                placeholder={
                  value || `Select JobTitle (${data.jobTitles.length})`
                }
                onChange={(e) => setQuery(e.target.value)}
                displayValue={value}
                autoComplete="off"
                className="w-full bg-inherit text-sm rounded-2xl outline-none focus:ring-0 border-none pt-2 pl-6"
              />

              <Combobox.Label className="absolute text-xs opacity-50 left-6 top-1">
                JobTitle
              </Combobox.Label>

              <Combobox.Button className=" text-gray-500 mr-6">
                <Chevron
                  className={`${
                    open ? "rotate-180" : ""
                  } ml-5 transition-all duration-300`}
                />
              </Combobox.Button>
            </div>

            <Combobox.Options
              className="absolute z-10 bg-gray-50 inset-x-0 max-h-80 rounded-md mt-3 outline-none "
              as="div"
            >
              <ul className="overflow-y-auto max-h-56" role="listbox">
                {filteredJobTitles.map((title, i) => (
                  <Combobox.Option key={title} value={title} as={Fragment}>
                    {({ active, selected }) => (
                      <li
                        className={`${
                          active && "bg-[#EEEEF8]"
                        } py-1.5 pl-8 rounded-lg my-1 flex items-center relative opacity-80`}
                      >
                        {selected && (
                          <span className="absolute left-4 text-x-green">
                            <Check />
                          </span>
                        )}
                        {title}

                        {["OWNER", "MANAGER"].includes(user.type) && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteTitle(title)
                            }}
                            className="absolute right-4 text-[#FC5A5A] hover:bg-[#FC5A5A] hover:text-white transition-all p-2.5 rounded-full"
                          >
                            <Delete width={20} height={20} />
                          </span>
                        )}
                      </li>
                    )}
                  </Combobox.Option>
                ))}
              </ul>

              {["OWNER", "MANAGER"].includes(user.type) && (
                <div className="w-full flex flex-col gap-4 justify-center py-4 px-2.5 bg-gray-100 transition-all duration-300 ">
                  {showAddBox ? (
                    <>
                      <Input
                        type="text"
                        label="JobTitle Name"
                        value={title}
                        onChange={(e) => newTitle(e.target.value)}
                        className="w-11/12 mx-auto"
                      />
                      <div className=" flex gap-2 justify-between px-6">
                        <button
                          onClick={() => setShowAddBox(false)}
                          className="bg-x-red text-white text-base px-6 py-3 font-semibold rounded-xl"
                        >
                          Cancel
                        </button>

                        <Button
                          loading={loading}
                          onClick={() => {
                            handleAddDeptmnt(title)
                            newTitle("")
                            setShowAddBox(false)
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button onClick={() => setShowAddBox(true)}>
                      <Plus width={12} height={12} />
                      <span className="ml-2">Add JobTitle</span>
                    </Button>
                  )}
                </div>
              )}
            </Combobox.Options>
          </>
        )}
      </Combobox>
    </div>
  )
}

export default JobTitleList
