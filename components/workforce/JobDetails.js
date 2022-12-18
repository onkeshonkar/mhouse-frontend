import { useState } from "react"

import { Arrow, Close } from "../icons"
import useAddEmpStore from "../../stores/useAddEmpStore"
import Input from "../ui/Input"
import Button from "../ui/Button"
import useSWR from "swr"
import useUserStore from "../../stores/useUserStore"
import { fetcher } from "../../lib/axios"
import DepartmentList from "../ui/DepartmentList"
import JobTitleList from "../ui/JobTitleList"
import RadioInput from "../ui/RadioInput"
import toast from "react-hot-toast"

const employementTypes = ["FullTime", "PartTime", "Casual"]

const tenurePeriods = ["Day", "Month", "Year"]

const JobDetails = ({ onBack, onNext, onCancel }) => {
  const emp = useAddEmpStore((store) => store.emp)
  const updateEmp = useAddEmpStore((store) => store.updateEmp)
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [department, setDepartment] = useState(emp.department || "")
  const [jobTitle, setJobTitle] = useState(emp.jobTitle || "")
  const [employementType, setEmployementType] = useState(
    emp.employementType || employementTypes[0]
  )
  const [tenure, setTenure] = useState(
    emp.tenure || { period: tenurePeriods[0], duration: "" }
  )

  const { data, error, mutate } = useSWR(
    `/v1/restaurents/${selectedBranch.restaurent}`,
    fetcher
  )

  const onSubmit = async () => {
    if (!department) {
      return toast.error("Select department")
    }
    if (!jobTitle) {
      return toast.error("Select JobTitle")
    }
    if (!tenure.duration) {
      return toast.error("Enter Tenure duration")
    }

    updateEmp({
      department,
      jobTitle,
      tenure,
      employementType,
    })

    onNext()
  }

  return (
    <div className="max-w-8xl min-h-screen flex flex-col relative">
      <button onClick={onCancel} className="absolute right-0 mt-20">
        <Close />
      </button>

      <h2 className="text-4xl font-semibold my-20">Let We Add Job Details</h2>

      <div className="flex flex-col gap-16 items-center h-[340px]">
        <div className="flex gap-4 mt-2 justify-between w-full px-16">
          <div className="bg-background rounded-xl w-52 h-12 flex items-center justify-between px-6 text-sm">
            <span className="opacity-50">
              {data && data.restaurent.payrollId + 1}
            </span>
            <span>Payroll ID</span>
          </div>

          <div className="bg-background rounded-2xl h-12 relative focus-within:ring-1 flex items-center w-60">
            <span className=" text-sm px-6 pb-0 pt-3">
              {selectedBranch.name}
            </span>

            <label className="absolute text-xs opacity-50 left-6 top-1">
              Branch
            </label>
          </div>

          <div className="w-60">
            <DepartmentList value={department} onChange={setDepartment} />
          </div>

          <div className="w-60">
            <JobTitleList value={jobTitle} onChange={setJobTitle} />
          </div>
        </div>

        <RadioInput
          value={employementType}
          options={employementTypes}
          onChange={setEmployementType}
        />

        <div className="flex gap-4 items-center">
          <Input
            type="number"
            label="Tenure Duration"
            className="w-56"
            value={tenure.duration}
            onChange={(e) =>
              setTenure((state) => ({ ...state, duration: e.target.value }))
            }
          />

          <RadioInput
            value={tenure.period}
            options={tenurePeriods}
            onChange={(period) => setTenure((state) => ({ ...state, period }))}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-24 w-laptop">
        <Button onClick={onBack} className="bg-primary" gradient={false}>
          <Arrow
            width={20}
            height={20}
            className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
          />
          <span> Back</span>
        </Button>

        <span>
          <svg
            width="400"
            height="12"
            viewBox="0 0 400 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 11.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="28" y="3" width="28" height="6" rx="3" fill="#FFC34A" />
            <circle
              cx="74.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 74.01 6.01)"
              fill="#FFC34A"
            />
            <rect x="91" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="137.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 137.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="154" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="200.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 200.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="217" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="263.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 263.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="280" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="326.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 326.01 6.01)"
              fill="#F1F1F5"
            />
            <rect x="343" y="3" width="28" height="6" rx="3" fill="#F1F1F5" />
            <circle
              cx="389.01"
              cy="6.01"
              r="4"
              transform="rotate(-.138 389.01 6.01)"
              fill="#F1F1F5"
            />
          </svg>
        </span>

        <Button onClick={onSubmit}>
          <span>Next</span>
          <Arrow
            width={20}
            height={20}
            className="ml-6 group-hover:translate-x-1 duration-300"
          />
        </Button>
      </div>
    </div>
  )
}

export default JobDetails
