import dayjs from "dayjs"
import { Check } from "../icons"

const Budget = ({ week }) => {
  const updateBudget = (e) => {
    const i = e.currentTarget.name
    const date = dayjs(week).add(i, "days").format("YYYY-MM-DD")
    console.log(i)
    console.log(date)
  }
  return (
    <div className="fixed bottom-0 my-1 flex gap-4 w-full max-w-7xl">
      <div className="w-56 bg-white px-6 pt-4 rounded-md flex flex-col items-center justify-center self-end h-20">
        <div className="flex flex-col text-sm">
          <p>
            <span className="text-x-green">1100$</span> / 1200$
          </p>
          <p>
            <span className="text-x-red">150hr</span> / 160hr
          </p>
        </div>
      </div>

      <div className="flex flex-grow gap-3.5 bg-white pt-1 rounded-md">
        {new Array(7).fill("").map((_, i) => {
          return (
            <div
              key={i}
              className="flex flex-col w-[136px] px-3 gap-4 items-center "
            >
              <div className="flex items-end gap-2 relative">
                <span className="text-xs">allocated</span>
                <input
                  type={"number"}
                  className="w-11 bg-inherit px-0 py-0 pb-0.5 outline-none focus:ring-0  text-sm font-light border-b-2 border-0 border-dashed text-center"
                  placeholder=""
                />
                <span className="absolute right-0 text-sm opacity-50 font-light">
                  $
                </span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col text-sm">
                  <p>
                    <span className="text-x-green">1100$</span> / 1200$
                  </p>
                  <p>
                    <span className="text-x-red">150hr</span> / 160hr
                  </p>
                </div>

                <button
                  onClick={updateBudget}
                  name={i}
                  className=" bg-x-green bottom-3 text-white p-0.5 rounded-full relative group"
                >
                  <Check />
                  <span className="text-sm tracking-wider font-light text-white bg-x-grey px-2 py-1.5 rounded-xl absolute hidden group-hover:block after:content-[''] after:w-2 after:h-2 after:bg-inherit after:absolute after:-bottom-1 after:left-6 after:rotate-45 -top-11 z-40">
                    Update Budget
                  </span>
                </button>
              </div>

              <span className="w-full h-1 rounded-lg bg-x-green " />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Budget
