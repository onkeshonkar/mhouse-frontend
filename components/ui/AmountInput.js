import { useRef, useState } from "react"

const AmountInput = ({ value, onChange, children }) => {
  const [width, setWidth] = useState((value + "").length * 6)
  const inputRef = useRef()

  return (
    <div className="flex items-center gap-7">
      {children}

      <div className="group flex gap-4 items-center">
        <div
          role="button"
          className="flex items-center px-3 py-3 bg-white shadow-lg rounded-lg pointer-events-auto"
          onClick={() => onChange(value > 0 ? value - 1.0 : 0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
          >
            <path
              id="Path_267"
              data-name="Path 267"
              d="M4.7,2.884,7.205.375A1.281,1.281,0,0,1,9.016,2.186L6.507,4.7,4.7,6.507,2.186,9.016A1.281,1.281,0,0,1,.375,7.205L2.884,4.7Z"
              transform="translate(6.641) rotate(45)"
              fill="#fc5a5a"
              fillRule="evenodd"
            />
          </svg>
        </div>

        <div className="relative">
          <input
            type="number"
            style={{ width: width + "px" }}
            value={value || 0.0}
            className="px-0 py-0 pb-0.5 outline-none focus:ring-0 text-sm font-semibold border-b-2 border-0 border-dashed min-w-[54px] text-center transition-all duration-200"
            onKeyUp={() => setWidth(inputRef.current.offsetWidth)}
            onChange={(e) => onChange(e.target.value)}
            step="0.05"
            min={0.0}
          />
          <span ref={inputRef} className="bg-green-200 absolute invisible">
            {value}
          </span>
        </div>

        <div
          role="button"
          className="flex items-center px-3 py-3 bg-white shadow-lg rounded-lg pointer-events-auto"
          onClick={() => onChange(+value + 1.0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
          >
            <path
              id="Path_267"
              data-name="Path 267"
              d="M.375.375a1.281,1.281,0,0,1,1.811,0L4.7,2.884,7.205.375A1.281,1.281,0,0,1,9.016,2.186L6.507,4.7l2.509,2.51A1.281,1.281,0,0,1,7.205,9.016L4.7,6.507,2.186,9.016A1.281,1.281,0,0,1,.375,7.205L2.884,4.7.375,2.186A1.281,1.281,0,0,1,.375.375Z"
              transform="translate(6.641) rotate(45)"
              fill="#3dd598"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

const Label = ({ className, children }) => (
  <span className={className}>{children}</span>
)

AmountInput.Label = Label

export default AmountInput
