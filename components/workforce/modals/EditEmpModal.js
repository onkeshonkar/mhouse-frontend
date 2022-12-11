import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import { Arrow, Camera, Check, Close } from "../../icons"
import Input from "../../ui/Input"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import ListInput from "../../ui/ListInput"
import Avatar from "../../ui/Avatar"
import dayjs from "dayjs"
import DepartmentList from "../../ui/DepartmentList"
import JobTitleList from "../../ui/JobTitleList"
import RadioInput from "../../ui/RadioInput"
import PayrollGroups from "../../ui/PayrollGroups"
import TimeCheckBox from "../../ui/TimeCheckBox"
import { APIService } from "../../../lib/axios"
import useUserStore from "../../../stores/useUserStore"

const genders = ["Male", "Female", "Others"]
const employementTypes = ["FullTime", "PartTime", "Casual"]
const tenurePeriods = ["Day", "Month", "Year"]
const visaTypes = [
  "Student Visa(20hrs limit)",
  "Student Visa(non restricted)",
  "Temporary Work Visa",
  "PR",
  "Citizen",
]
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const schema = z.object({
  fullName: z.string().min(3, { message: "Must be at least 3 char" }).max(50),
  dateOfBirth: z.string().min(3, { message: "Invalid date" }),
})
const EditEmpModal = ({ onCancel, emp }) => {
  const selectedBranch = useUserStore((store) => store.selectedBranch)

  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState(emp.gender)
  const [department, setDepartment] = useState(emp.department || "")
  const [jobTitle, setJobTitle] = useState(emp.jobTitle || "")
  const [employementType, setEmployementType] = useState(
    emp.employementType || employementTypes[0]
  )
  const [tenure, setTenure] = useState(
    emp.tenure || { period: tenurePeriods[0], duration: "" }
  )

  const [visa, setVisa] = useState(
    emp.visa || { type: visaTypes[3], expiryDate: "" }
  )

  const [payrollGroup, setPayrollGroup] = useState(emp.payrollGroup || "")

  const [workSlot, setWorkSlot] = useState(
    emp.workSlot || [[], [], [], [], [], [], []]
  )

  const updateWorkingHours = (dayIndex, key, time) => {
    // console.log(dayIndex, key, time)
    if (key === "start") {
      workSlot[dayIndex][0] = time
    } else if (key === "end") {
      workSlot[dayIndex][1] = time
    } else if (key === "unavailable") {
      workSlot[dayIndex] = []
    }
    setWorkSlot([...workSlot])
  }

  const onSubmit = async (data) => {
    setLoading(true)

    if (!department) {
      toast.error("Select department")
      return setLoading(false)
    }
    if (!jobTitle) {
      toast.error("Select JobTitle")
      return setLoading(false)
    }
    if (!tenure.duration) {
      toast.error("Enter Tenure duration")
      return setLoading(false)
    }
    if (!payrollGroup) {
      toast.error("Select Payroll group")
      return setLoading(false)
    }

    if (visaTypes.slice(0, 3).includes(visa.type) && !visa.expiryDate) {
      toast.error("Visa expiry required")
      return setLoading(false)
    }

    let inValidTime = false
    workSlot.map((slot, i) => {
      if (slot[0] >= slot[1]) {
        inValidTime = true
        return toast.error(
          `${days[i]} start time must be smaller than end time`,
          { duration: 5000 }
        )
      }
    })

    if (inValidTime) return setLoading(false)

    try {
      await APIService.patch(
        `/v1/branches/${selectedBranch.id}/employees/${emp.id}`,
        {
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          gender,
          department,
          jobTitle,
          employementType,
          tenure,
          visa: {
            type: visa.type,
            ...(visa.expiryDate && { expiryDate: visa.expiryDate }),
          },
          workSlot,
        }
      )
      toast.success("Employee updated")
    } catch (error) {
      const { message } = error?.response?.data || error
      toast.error(message, { duration: 7000 })
      console.log(error)
    }
    setLoading(false)
    onCancel()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  return (
    <Modal open={true} setOpen={() => {}} transparent={false}>
      <div className="max-w-8xl min-h-screen flex flex-col items-center gap-14 relative">
        <button onClick={onCancel} className="absolute right-0 mt-20">
          <Close />
        </button>

        <h2 className="text-4xl font-semibold mt-16">Basic Info For User</h2>

        <div className="flex gap-8 justify-center">
          <div className="flex flex-col items-center justify-center content-center w-48 h-48 bg-background rounded-2xl relative cursor-pointer group">
            <Avatar
              user={emp.user}
              height={192}
              width={192}
              className="rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              type="text"
              label="Full Name"
              autoComplete="fullName"
              className="w-[350px]"
              defaultValue={emp.user.fullName || ""}
              {...register("fullName")}
              error={errors.fullName}
            />
            <Input
              type="date"
              label="Date of birth"
              autoComplete="dateOfBirth"
              className="w-[350px]"
              defaultValue={
                (emp.user.dateOfBirth &&
                  dayjs(emp.user.dateOfBirth).format("YYYY-MM-DD")) ||
                ""
              }
              {...register("dateOfBirth")}
              error={errors.dateOfBirth}
            />
            <div className=" bg-background rounded-2xl h-12 relative focus-within:ring-2 focus-within:ring-accent flex items-center">
              <ListInput
                options={genders}
                value={gender}
                onChange={setGender}
                placeholder="Select Gender"
              />
              <label className="absolute text-xs opacity-50 left-6 top-1">
                Gender
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 self-center">
          <div className="bg-background rounded-2xl h-12 relative focus-within:ring-1 flex items-center w-60">
            <span className=" text-sm px-6 pb-0 pt-3">{emp.branch.name}</span>

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

        <h2 className="text-4xl font-semibold">
          Select Visa And Payroll Group
        </h2>

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

        <div className="flex flex-col items-center gap-9">
          <RadioInput
            value={visa.type}
            options={visaTypes}
            onChange={(type) => setVisa((state) => ({ ...state, type }))}
          />

          <Input
            type="date"
            label="Visa expiry date"
            className="w-56"
            value={visa.expiryDate}
            onChange={(e) =>
              setVisa((state) => ({ ...state, expiryDate: e.target.value }))
            }
          />
        </div>

        <PayrollGroups payrollGroup={payrollGroup} onChange={setPayrollGroup} />

        <h2 className="text-4xl font-semibold">
          Select Days And Time Work For This Employee
        </h2>

        <div className="flex flex-wrap gap-7 items-center justify-center h-[340px]">
          {days.map((day, i) => (
            <TimeCheckBox
              label={day}
              key={day}
              selected={workSlot[i].length == 0 ? false : true}
              onChange={() => updateWorkingHours(i, "unavailable")}
            >
              {(checked) => (
                <div className="flex gap-3 items-center">
                  <Input
                    type="time"
                    value={workSlot[i][0] || ""}
                    disabled={!checked}
                    onChange={(e) =>
                      updateWorkingHours(i, "start", e.target.value)
                    }
                    className="w-44"
                    label="Start Time"
                  />

                  <Input
                    type="time"
                    value={workSlot[i][1] || ""}
                    disabled={!checked}
                    onChange={(e) =>
                      updateWorkingHours(i, "end", e.target.value)
                    }
                    className="w-44"
                    label="End Time"
                  />
                </div>
              )}
            </TimeCheckBox>
          ))}
        </div>

        <div className="flex items-center justify-between mt-20 mb-10 w-laptop">
          <Button onClick={onCancel} className="bg-primary" gradient={false}>
            <Arrow
              width={20}
              height={20}
              className="mr-6 rotate-180 group-hover:-translate-x-1 duration-300"
            />
            <span> Back</span>
          </Button>

          <Button onClick={handleSubmit(onSubmit)} loading={loading}>
            <span>Update</span>
            <Check
              width={18}
              height={18}
              className="ml-2 -mt-1 group-hover:translate-x-1 duration-300"
            />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditEmpModal
