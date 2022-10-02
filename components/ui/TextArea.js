import { forwardRef } from "react"

const TextArea = ({ label, autoComplete, error, className, ...rest }, ref) => {
  return (
    <div>
      <div
        className={`bg-background rounded-2xl relative overflow-hidden focus-within:ring-2 ring-accent flex items-center ${
          className || "w-[312px]"
        }`}
      >
        <textarea
          ref={ref}
          type="text"
          placeholder={label}
          rows={1}
          cols={10}
          className="block peer w-full px-6 py-4 text-sm bg-inherit outline-none focus:ring-0 placeholder-transparent pt-6 disabled:opacity-60"
          {...rest}
        />
        <label className="absolute pointer-events-none text-xs opacity-50 left-6 peer-focus:text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 top-1 peer-focus:top-1 transition-all">
          {label}
        </label>
      </div>
      {error && (
        <span className=" text-[11px] text-x-red flex items-start pl-2 mt-1">
          {error.message}
        </span>
      )}
    </div>
  )
}

export default forwardRef(TextArea)
