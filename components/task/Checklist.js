import dayjs from "dayjs"
import { Check } from "../icons"

const Checklist = ({ task }) => {
  return (
    <div className="flex flex-col gap-1.5 text-sm font-light">
      {task?.checkList.map((item) => {
        let isExpired
        if (item.dueTime) {
          isExpired = dayjs(
            dayjs().format("YYYY/MM/DD").toString() + ` ${"17:50"}`
          ).isBefore(dayjs())
          console.log(isExpired)
        }
        return (
          <div
            key={item._id}
            className={` ${
              isExpired ? "opacity-50" : ""
            } px-4 py-3 bg-background rounded-xl flex gap-7`}
          >
            {!isExpired ? (
              <div
                role={"radio"}
                aria-checked={item.completed}
                className={`${
                  !item.completed && "border-2 border-accent"
                } w-6 h-6 rounded-full flex items-center justify-between cursor-pointer`}
              >
                {item.completed && (
                  <span className="text-white bg-accent w-full h-full rounded-full flex items-center justify-center">
                    <Check width={12} height={12} />
                  </span>
                )}
              </div>
            ) : (
              <span className="w-6 h-6 rounded-full border-2 border-accent opacity-90"></span>
            )}

            <span className={`${item.completed && "line-through"}`}>
              {item.subTask}
            </span>

            <span className="opacity-50 ml-auto">
              {item.dueTime || "anytime"}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default Checklist
