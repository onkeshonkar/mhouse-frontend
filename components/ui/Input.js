import React from "react"

const Input = React.forwardRef(
  ({ label, autoComplete, error, className, ...rest }, ref) => {
    return (
      <div>
        <div
          className={`bg-background rounded-2xl relative overflow-hidden focus-within:ring-2 ring-accent flex items-center h-[50px] w-[312px] ${className}`}
        >
          <input
            ref={ref}
            type="text"
            placeholder={label}
            className="block peer w-full px-6 py-4 text-sm bg-inherit outline-none focus:ring-0 placeholder-transparent pt-6"
            {...rest}
          />
          <label className="absolute pointer-events-none text-xs opacity-50 left-6 peer-focus:text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 top-1 peer-focus:top-1 transition-all">
            {label}
          </label>
        </div>
        {error && (
          <span className="text-[10px] text-x-red flex items-start pl-2 mt-0.5">
            {error.message}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
