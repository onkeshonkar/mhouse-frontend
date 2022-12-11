import { useState, useMemo } from "react"
import dayjs from "dayjs"

import { Chevron } from "../icons"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Calender({ currentDate, setCurrenDate }) {
  const [date, setDate] = useState(
    dayjs(currentDate).day(1).format("YYYY-MM-DD")
  )

  const monthDetails = useMemo(() => {
    const currentDate = dayjs(date)
    return {
      daysInMonth: currentDate.daysInMonth(),
      month: currentDate.get("month"),
      year: currentDate.get("year"),
      week: currentDate.date(1).get("day"),
    }
  }, [date])

  return (
    <div className="mt-1.5 absolute bg-white z-20 rounded-xl left-12 shadow-2xl">
      <div className="text-center p-4">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5  text-accent opacity-60 hover:opacity-100"
            onClick={() =>
              setDate(
                dayjs(date).subtract(1, "month").date(1).format("YYYY-MM-DD")
              )
            }
          >
            <span className="sr-only">Previous month</span>
            <Chevron className="h-5 w-5 rotate-90" aria-hidden="true" />
          </button>
          <div className="flex-auto font-semibold text-xs">
            {dayjs(date).format("MMMM YYYY")}
          </div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-accent opacity-60 hover:opacity-100"
            onClick={() =>
              setDate(dayjs(date).add(1, "month").date(1).format("YYYY-MM-DD"))
            }
          >
            <span className="sr-only">Next month</span>
            <Chevron className="h-5 w-5 -rotate-90" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div className="mt-2 grid gap-1.5 grid-cols-7 text-xs leading-6 text-gray-500">
          {Array.apply(null, { length: monthDetails.week }).map((_, idx) => (
            <span key={["skipday", idx].join("_")}></span>
          ))}

          {Array.apply(null, { length: monthDetails.daysInMonth }).map(
            (_, idx) => {
              const todaysDate = dayjs(
                `${monthDetails.year}-${monthDetails.month + 1}-${idx + 1}`
              ).format("YYYY-MM-DD")
              return (
                <button
                  onClick={() => {
                    setCurrenDate(todaysDate)
                  }}
                  key={[idx, "day"].join("_")}
                  className={classNames(
                    todaysDate == currentDate && "ring-1 ring-accent",
                    "flex rounded-full hover:bg-gray-200 focus:z-10"
                  )}
                >
                  <time className="w-6 h-6" dateTime={todaysDate}>
                    {idx + 1}
                  </time>
                </button>
              )
            }
          )}
        </div>
      </div>
    </div>
  )
}
