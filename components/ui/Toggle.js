import { Switch } from "@headlessui/react"

const Toggle = ({ checked, onChange, label }) => {
  return (
    <div className="flex gap-9">
      {label && <span className="text-sm text-primary">{label}</span>}
      <Switch
        checked={checked}
        onChange={onChange}
        className="relative inline-flex h-6 w-11 bg-[#F1F1F5] items-center rounded-full"
      >
        <span
          className={`${
            checked ? "translate-x-6 bg-accent" : "bg-gray-300"
          } inline-block h-[28px] w-[28px] transform rounded-full transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}

export default Toggle
