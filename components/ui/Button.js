import React from "react"
import Spinner from "./Spinner"

const Button = React.forwardRef(({ loading, className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      disabled={loading}
      className={`text-white text-base px-6 py-3 font-semibold focus:outline-none focus:ring-2 outline-none focus:ring-orange-400 rounded-xl bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] disabled:opacity-70 relative overflow-hidden flex items-center justify-center group ${
        className || ""
      }`}
      {...rest}
    >
      {rest.children}

      {loading && (
        <div className="absolute inset-0 bg-[#FFBA42] flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button
