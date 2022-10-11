import useSWRImmutable from "swr/immutable"
import { fetcher } from "../../lib/axios"
import useUserStore from "../../stores/useUserStore"
import { Check } from "../icons"
import Spinner from "../ui/Spinner"

const DepartmentsCheckBox = ({ departments, setDepartments }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const { data, error, mutate } = useSWRImmutable(
    `/v1/branches/${selectedBranch.id}/departments`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return <span>{"Can't fetch Departments"}</span>
    }
  }

  if (!data) {
    return (
      <div className="w-36 flex flex-col items-center bg-background gap-1 pt-1 pb-2 rounded-xl">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex gap-4 flex-wrap text-sm">
      {data.departments.map((dep, i) => (
        <CheckBox
          key={i + "dep"}
          label={dep}
          selected={departments.includes(dep)}
          onChange={() => {
            const exists = departments.includes(dep)

            if (exists) {
              const filtered = departments.filter((d) => d !== dep)
              setDepartments(filtered)
            } else setDepartments([...departments, dep])
          }}
        />
      ))}
    </div>
  )
}

export default DepartmentsCheckBox

const CheckBox = ({ selected, label, onChange }) => {
  return (
    <div className="flex gap-6">
      <div
        role="checkbox"
        aria-checked={selected}
        className={`${
          selected ? "bg-primary" : "bg-[#F1F1F5]"
        } flex items-center justify-center py-4 px-6 gap-3 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out`}
        onClick={onChange}
        onKeyUp={(e) => {
          if (e.key === " ") onChange()
        }}
      >
        <div
          className={`${
            selected ? "bg-accent" : "bg-white"
          } w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out`}
        >
          {selected && <Check className="text-white -mt-0.5" />}
        </div>

        <span
          className={`${
            selected ? "text-white" : "text-primary"
          } text-sm transition-all duration-100`}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
