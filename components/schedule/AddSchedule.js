import { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"

import { Plus, Clock, Check } from "../icons"
import RadioInput from "../ui/RadioInput"

const leaveTypes = ["Annual Leave", "Unpaid Leave", "Sick Leave"]

const AddSchedule = ({ workSlot, date, employeeId }) => {
  const [breakTime, setBreakTime] = useState("0")
  const [startTime, setStartTime] = useState(workSlot[0])
  const [endTime, setEndTime] = useState(workSlot[1])

  const [mode, setMode] = useState("work")

  const [leaveType, setLeaveType] = useState()

  const [openAddwokModal, setOpenworkmodal] = useState(false)
  const divRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setOpenworkmodal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const addSchedule = async () => {}

  if (!workSlot.length)
    return (
      <div className="flex items-center">
        <span className="w-1 h-1 bg-red-600 mr-1 rounded-full text-xs opacity-90" />
        unavailable
      </div>
    )

  return (
    <>
      {!openAddwokModal && (
        <div
          onClick={() => setOpenworkmodal(true)}
          role="button"
          className="bg-x-green h-9 w-9 rounded-lg flex items-center justify-center hover:bg-accent transition-all duration-150 shadow-lg"
        >
          <Plus width={16} height={16} className="text-white" />
        </div>
      )}

      {openAddwokModal && (
        <div
          className="bg-white z-20 p-6 absolute rounded-xl shadow-xl w-[480px] h-[360px]"
          ref={divRef}
        >
          <span className="text-xs mb-1 flex justify-center">
            Employee is available for {workSlot[0]} to {workSlot[1]}
          </span>
          <div className="flex flex-col items-center gap-4 justify-center">
            <div
              className={`${
                mode === "work" ? "border-2" : ""
              } flex gap-4 p-2 flex-col items-center rounded-2xl border-green-400`}
              role={"mode"}
              aria-checked={mode === "work" ? true : false}
              onClick={() => {
                setMode("work")
                setLeaveType("")
              }}
            >
              <div className="flex gap-4 p-2">
                <div className="bg-background relative rounded-2xl focus-within:ring-2 ring-accent h-12 flex items-center w-44">
                  <input
                    type="time"
                    className="peer block w-full bg-inherit disabled:opacity-30 outline-none focus:ring-0 border-none placeholder-transparent rounded-2xl px-6 pt-3 pb-0 focus:pt-3 placeholder-shown:py-0"
                    value={startTime}
                    min={workSlot[0]}
                    disabled={mode === "leave" ? true : false}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <label className="absolute pointer-events-none text-xs opacity-50 peer-focus:text-xs peer-placeholder-shown:text-sm left-6 peer-focus:top-1 top-1 peer-placeholder-shown:top-3 transition-all ">
                    Start Time
                  </label>
                </div>

                <div className="bg-background relative rounded-2xl focus-within:ring-2 ring-accent h-12 flex items-center w-44">
                  <input
                    type="time"
                    className="peer block w-full bg-inherit disabled:opacity-30 outline-none focus:ring-0 border-none placeholder-transparent rounded-2xl px-6 pt-3 pb-0 focus:pt-3 placeholder-shown:py-0"
                    value={endTime}
                    max={workSlot[1]}
                    disabled={mode === "leave" ? true : false}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <label className="absolute pointer-events-none text-xs opacity-50 peer-focus:text-xs peer-placeholder-shown:text-sm left-6 peer-focus:top-1 top-1 peer-placeholder-shown:top-3 transition-all ">
                    End Time
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm mr-4">Break Time</span>

                <input
                  type="number"
                  className="block h-8 w-16 text-center border-none rounded-2xl bg-background disabled:opacity-30"
                  value={breakTime}
                  disabled={mode === "leave" ? true : false}
                  onChange={(e) => setBreakTime(e.target.value)}
                />

                <span className="ml-2 text-lg">min</span>
              </div>
            </div>

            <p className="text-xs mx-auto">OR select one of this</p>

            <div
              className={`${
                mode === "leave" ? "border-2" : ""
              } text-sm p-2 rounded-2xl border-green-400`}
              role={"mode"}
              aria-checked={mode === "leave" ? true : false}
              onClick={() => setMode("leave")}
            >
              <RadioInput
                options={leaveTypes}
                value={leaveType}
                onChange={setLeaveType}
              />
            </div>

            <div
              onClick={addSchedule}
              role="button"
              className="mx-auto text-accent hover:text-white rounded-2xl flex items-center gap-1 ring-1 ring-accent py-2 px-3 justify-center hover:bg-accent transition-all duration-150"
            >
              Add roster
              <span></span>
              <Check width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddSchedule
