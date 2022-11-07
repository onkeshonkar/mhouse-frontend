import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { Chevron, PartialCloud } from "../../icons"

const Roster = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))

  const [weekStart, weekEnd] = useMemo(() => {
    return [
      dayjs(date).day(0).format("MMM D"),
      dayjs(date).day(6).format("MMM D, YYYY"),
    ]
  }, [date])

  return (
    <div className="flex justify-between ">
      <div className="flex flex-col justify-between items-center bg-white px-3 py-4 rounded-2xl">
        <div className="flex items-center justify-between bg-background rounded-2xl px-5 py-4 gap-6">
          <button
            onClick={() =>
              setDate(dayjs(date).subtract(7, "days").format("YYYY-MM-DD"))
            }
          >
            <Chevron className="text-accent rotate-90" />
          </button>

          <div className="text-sm text-primary font-normal opacity-50 flex flex-col items-center">
            <span>{weekStart}</span>
            <span>{weekEnd}</span>
          </div>

          <button
            onClick={() =>
              setDate(dayjs(date).add(7, "days").format("YYYY-MM-DD"))
            }
          >
            <Chevron className="text-accent -rotate-90" />
          </button>
        </div>

        <button className="text-sm px-4 py-2 rounded-lg bg-accent text-white">
          Show Today
        </button>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-normal">Annual Leave</div>
            <div className="text-base font-bold">
              <span className=" text-x-green">{2}</span>
              <span>/</span>
              <span>{10}</span>
            </div>
          </div>

          <div className="w-44 h-1 rounded-sm bg-[#E2E2EA]">
            <div
              style={{
                width: Math.floor((176 * 2) / 10) + "px",
              }}
              className={`h-1 rounded-sm bg-x-green`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-[#F1F1F5] flex gap-2 items-center py-4">
          {new Array(7).fill("").map((_, i) => (
            <div key={i} className="flex gap-1">
              <div
                className={`w-[136px] flex items-center justify-between px-4`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-light opacity-50">
                    {dayjs(date).day(0).add(i, "day").format("DD")}
                  </span>
                  <span className="text-sm font-light">
                    {dayjs(date).day(0).add(i, "day").format("ddd")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="w-6 h-6 mb-0.5">
                    <PartialCloud />
                  </div>
                  <span className="text-xs font-normal">22 &#8451;</span>
                </div>
              </div>

              {i != 6 && (
                <span className="flex w-0.5 self-center h-14 bg-x-silver opacity-70" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          {new Array(7).fill("").map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg w-[138px] h-44 flex items-center justify-center"
            >
              <div className="flex flex-col items-center text-xs">
                <span>9:90 am</span>
                <span>-</span>
                <span>9:90 pm</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Roster
