import { useEffect, useState } from "react"
import { Listbox } from "@headlessui/react"
import useSWR from "swr"

import { Check, Chevron } from "../icons"
import useUserStore from "../../stores/useUserStore"
import { branchFetcher } from "../../lib/axios"

const BranchList = ({ value, onChange }) => {
  const user = useUserStore((store) => store.user)
  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState()

  const { data, error } = useSWR(
    `/v1/restaurents/${user.branch.restaurent.id}/branches?details=semi`,
    branchFetcher
  )

  const handleOnChange = (branch) => {
    setSelectedBranch(branch)
    onChange(branch)
  }

  useEffect(() => {
    if (data) {
      setBranches(data.branches)
      const foundBranch = data.branches.find((branch) => branch.id === value.id)
      setSelectedBranch(foundBranch)
    }
  }, [data, value])

  if (error) return <div>{JSON.stringify(error)}</div>

  if (!selectedBranch) return null

  return (
    <div className="w-full relative">
      <Listbox value={selectedBranch} onChange={handleOnChange}>
        {({ open }) => (
          <>
            <Listbox.Button className="flex w-full justify-between bg-inherit rounded-2xl text-sm px-6 pb-0 pt-3">
              <span>{selectedBranch.name}</span>
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
