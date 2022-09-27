import { RadioGroup } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const RadioInput = ({ options, value, onChange, label }) => {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="flex items-center gap-6"
    >
      {label && (
        <RadioGroup.Label className="text-base font-semibold">
          {label}
        </RadioGroup.Label>
      )}

      <div className="flex gap-4">
        {options.map((option) => (
          <RadioGroup.Option value={option} key={option}>
            {({ checked }) => (
              <span
                className={classNames(
                  checked
                    ? "bg-accent text-white"
                    : " bg-background text-primary",
                  " flex px-6 py-4 text-sm cursor-pointer rounded-2xl"
                )}
              >
                {option}
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default RadioInput
