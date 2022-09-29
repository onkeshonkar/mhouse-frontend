import { useEffect, useState } from "react"
import { Listbox } from "@headlessui/react"
import useSWR from "swr"
import toast from "react-hot-toast"

import { Check, Chevron } from "../icons"
import useUserStore from "../../stores/useUserStore"
import { fetcher } from "../../lib/axios"
import Spinner from "./Spinner"

const BranchList = ({ value, onChange, isDarkMode }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [branches, setBranches] = useState([])
  const [visibleBranch, setVisibleBranch] = useState()

  const { data, error } = useSWR(
    `/v1/restaurents/${selectedBranch.restaurent}/branches?details=semi`,
    fetcher,
    { revalidateOnFocus: true, errorRetryCount: 3 }
  )

  const handleOnChange = (branch) => {
    setVisibleBranch(branch)
    onChange(branch)
  }

  useEffect(() => {
    if (data) {
      setBranches(data.branches)
      const foundBranch = data.branches.find((branch) => branch.id === value.id)
      setVisibleBranch(foundBranch)
    }
  }, [data, value])

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      toast.error(JSON.stringify(error))
    }
    return <span className="flex mx-auto">{"can't fetch branch"}</span>
  }

  if (!visibleBranch || !data)
    return (
      <div className="text-center mx-auto">
        <Spinner />
      </div>
    )

  return (
    <div className="w-full relative">
      <Listbox value={visibleBranch} onChange={handleOnChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`flex w-full justify-between items-center rounded-2xl text-sm px-6 pb-0 pt-3 h-[50px] ${
                isDarkMode ? "bg-primary" : "bg-background"
              }`}
            >
              <span>{visibleBranch.name}</span>
              <Listbox.Label className="absolute text-xs opacity-50 left-6 top-1">
                Branch
              </Listbox.Label>
              <Chevron
                className={`${
                  open ? "rotate-180" : ""
                } ml-5 transition-all duration-300 -mt-1`}
              />
            </Listbox.Button>

            <Listbox.Options className="absolute z-20 overflow-y-auto inset-x-0 w-full bg-gray-50 max-h-60 rounded-md flex flex-col gap-1.5 mt-3 py-1">
              {branches.map((branch, i) => (
                <Listbox.Option
                  key={branch.name}
                  value={branch}
                  disabled={branch.unavailable}
                >
                  {({ active, selected }) => (
                    <div
                      className={`${
                        active && "bg-[#EEEEF8]"
                      } py-1.5 pl-8 rounded-lg my-1 flex items-center relative opacity-80 text-primary text-sm`}
                    >
                      {selected && (
                        <span className="absolute left-4 text-x-green">
                          <Check />
                        </span>
                      )}
                      {branch.name}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default BranchList
