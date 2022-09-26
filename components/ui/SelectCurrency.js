import { Combobox } from "@headlessui/react"
import { Fragment, useState } from "react"

import currencies from "../../utils/currencies"
import { Chevron, Check } from "../icons"

const SelectCurrency = ({ selectedCurrency, onChange }) => {
  const [query, setQuery] = useState("")

  const filteredCurrencies =
    query === ""
      ? currencies
      : currencies.filter((currency) => {
          return currency.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="relative w-full">
      <Combobox value={selectedCurrency} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="flex items-center">
              <Combobox.Input
                placeholder="Currency"
                autoComplete="off"
                className="block peer w-full px-6 py-4 text-sm bg-inherit outline-none focus:ring-0 placeholder-transparent pt-6"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Label className="absolute pointer-events-none text-xs opacity-50 left-6 peer-focus:text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:top-5 top-2 peer-focus:top-2 transition-all">
                Currency
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
              {filteredCurrencies.map((currency) => (
                <Combobox.Option key={currency} value={currency} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active && "bg-[#EEEEF8]"
                      } py-1.5 pl-8 rounded-lg my-1 flex items-center relative opacity-80`}
                    >
                      {selected && (
                        <span className="absolute left-4">
                          <Check className="text-x-green" />
                        </span>
                      )}
                      {currency}
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

export default SelectCurrency
