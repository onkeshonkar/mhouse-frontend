import dayjs from "dayjs"
import { useMemo, useState } from "react"

import { Chevron, Copy, Paper, Print, Report } from "../../components/icons"
import DailySchedule from "../../components/schedule/DailySchedule"
import WeeklySchedule from "../../components/schedule/WeeklySchedule"
import Calender from "../../components/ui/Calender"
import TooltipButton from "../../components/ui/ToolTipButton"

const Schedule = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [showCalender, setShowCalender] = useState(false)

  const week = useMemo(() => {
    return dayjs(date).day(0).format("YYYY-MM-DD")
  }, [date])

  const [unPublished, setUnPublished] = useState(true)

  const [showToday, setShowToday] = useState(false)

  return (
    <div className="mt-8 ml-6">
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="relative">
            <div className="flex items-center justify-between bg-white rounded-2xl px-6 py-3 w-72 gap-6 ml-6">
              <button
                onClick={() =>
                  setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"))
                }
              >
                <Chevron className="text-accent rotate-90" />
              </button>

              <div
                role="button"
                onClick={() => setShowCalender(!showCalender)}
                className="text-sm text-primary font-normal opacity-50 flex"
              >
                <span>{dayjs(date).format("ddd, D MMM YYYY")}</span>
              </div>

              <button
                onClick={() =>
                  setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"))
                }
              >
                <Chevron className="text-accent -rotate-90" />
              </button>
            </div>

            {showCalender && (
              <Calender currentDate={date} setCurrenDate={setDate} />
            )}
          </div>

          <div
            className="ml-3 text-sm text-white flex items-center px-4 font-normal bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] rounded-xl transition-all duration-200"
            role="button"
            onClick={() => setShowToday(!showToday)}
          >
            {showToday ? "This Week" : "This day"}
          </div>
        </div>

        <div className="flex gap-4">
          <TooltipButton text="Print">
            <Print className="text-[#92929D]" />
          </TooltipButton>

          <TooltipButton text="Download">
            <Paper className="text-[#92929D]" />
          </TooltipButton>

          <TooltipButton
            text="Report"
            className=" bg-[#3DD598]"
            as="Link"
            href="/schedule/report"
          >
            <Report className="text-white" />
          </TooltipButton>

          <TooltipButton text="Copy" className=" bg-accent">
            <Copy className="text-white" />
          </TooltipButton>

          <button
            onClick={() => {}}
            className={`${
              unPublished
                ? "bg-gradient-to-tr from-[#FF974A] to-[#FFBA42]"
                : "bg-accent opacity-50"
            } text-base text-white py-3 px-6 font-semibold rounded-xl`}
            disabled={!unPublished}
          >
            Publish Schedule
          </button>
        </div>
      </div>

      {showToday ? (
        <DailySchedule date={date} />
      ) : (
        <WeeklySchedule week={week} />
      )}
    </div>
  )
}

export default Schedule
