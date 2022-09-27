import { Listbox } from "@headlessui/react"

import { Chevron, Check } from "../icons"

const ListInput = ({ options, value, onChange, placeholder }) => {
  return (
    <div className="w-full relative">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Button className="flex w-full justify-between bg-inherit rounded-2xl text-sm px-6 pb-0 pt-3">
              <span>{value || placeholder}</span>
              <Chevron
                className={`${
                  open ? "rotate-180" : ""
                } ml-5 transition-all duration-300 -mt-1`}
              />
            </Listbox.Button>

            <Listbox.Options className="absolute z-20 overflow-y-auto inset-x-0 w-full bg-gray-50 max-h-60 rounded-md flex flex-col gap-1.5 mt-3 py-1">
              {options.map((option, i) => (
                <Listbox.Option key={option} value={option}>
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
                      {option}
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

export default ListInput
