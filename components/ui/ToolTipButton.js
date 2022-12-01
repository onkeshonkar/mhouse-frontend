const TooltipButton = ({
  children,
  onClick,
  text,
  className,
  as,
  href,
  ...rest
}) => {
  return (
    <>
      {as === "Link" ? (
        <a
          href={href}
          className={`${
            className || "bg-white"
          } w-11 h-11 flex items-center justify-center rounded-lg relative group`}
        >
          {children}
          <span className="text-sm tracking-wider font-light text-white bg-x-grey px-2 py-1.5 rounded-xl absolute hidden group-hover:block after:content-[''] after:w-2 after:h-2 after:bg-inherit after:absolute after:-bottom-1 after:left-6 after:rotate-45 -top-11 z-40">
            {text}
          </span>
        </a>
      ) : (
        <button
          onClick={onClick}
          className={`${
            className || "bg-white"
          } w-11 h-11 flex items-center justify-center rounded-lg relative group`}
          {...rest}
        >
          {children}
          <span className="text-sm tracking-wider font-light text-white bg-x-grey px-2 py-1.5 rounded-xl absolute hidden group-hover:block after:content-[''] after:w-2 after:h-2 after:bg-inherit after:absolute after:-bottom-1 after:left-6 after:rotate-45 -top-11 z-40">
            {text}
          </span>
        </button>
      )}
    </>
  )
}

export default TooltipButton
