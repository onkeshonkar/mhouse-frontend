import { Fragment, useState } from "react"
import Image from "next/image"
import useSWR from "swr"
import { Combobox } from "@headlessui/react"

import toast from "react-hot-toast"

import { Chevron, Check } from "../icons"
import { fetcher } from "../../lib/axios"
import Avatar from "./Avatar"
import Spinner from "./Spinner"

const UserList = ({ value, onChange, placeholder = "" }) => {
  const [query, setQuery] = useState("")

  const { data, error } = useSWR(`/v1/user`, fetcher)

  if (!data) return null

  if (error) return <span>{JSON.stringify(error)}</span>

  const users = data.users

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) => {
          return (
            user.fullName.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
          )
        })

  if (error) return toast.error(JSON.stringify(error))

  if (!data)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    )

  return (
    <div className="relative w-full">
      <Combobox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="flex items-center">
              <Combobox.Input
                displayValue={(item) => item?.fullName || ""}
                placeholder="Users"
                autoComplete="off"
                className="block peer w-full px-6 py-4 text-sm bg-inherit outline-none focus:ring-0 placeholder-transparent pt-6"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Label className="absolute pointer-events-none text-xs opacity-50 left-6 peer-focus:text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:top-5 top-2 peer-focus:top-2 transition-all">
                {placeholder}
              </Combobox.Label>

              <Combobox.Button className=" text-gray-500 mr-6">
                <Chevron
                  className={`${
                    open ? "rotate-180" : ""
                  } ml-5 transition-all duration-300`}
                />
              </Combobox.Button>
            </div>

            <Combobox.Options className="absolute z-10 overflow-y-auto bg-gray-50 inset-x-0 max-h-60 rounded-md mt-3">
              {filteredUsers.map((user, i) => (
                <Combobox.Option
                  key={user.email}
                  value={user}
                  disabled={user.unavailable}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active && "bg-[#EEEEF8]"
                      } py-1.5 pl-5 rounded-lg my-1 flex gap-4 items-center relative opacity-80`}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sky-500">
                        <Avatar user={user} width={36} height={36} />
                      </div>

                      <div className="flex flex-col items-start">
                        {user.fullName}
                        <span className="block text-xs">{user.email}</span>
                      </div>

                      {selected && (
                        <span className="absolute right-8 text-x-green">
                          <Check />
                        </span>
                      )}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </>
        )}
      </Combobox>
    </div>
  )
}

export default UserList
