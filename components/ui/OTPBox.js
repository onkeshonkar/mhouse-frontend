import { useCallback } from "react"

const OTPBox = ({ value, handleValue }) => {
  const handleInputFocus = useCallback((e) => {
    const key = e.key
    const prevSib = e.target?.previousSibling
    const nextSib = e.target?.nextSibling
    if (key === "Delete" || key === "Backspace") {
      if (prevSib && prevSib.tagName === "INPUT") {
        prevSib.focus()
        prevSib.select()
      }
    } else if (key.match(/^[0-9]$/)) {
      if (nextSib && nextSib.tagName === "INPUT") {
        nextSib.focus()
        nextSib.select()
      }
    }
  }, [])

  return (
    <div className="flex justify-center">
      {Object.keys(value).map((key) => {
        return (
          <input
            key={key}
            type="number"
            onChange={(e) => handleValue({ ...value, [key]: e.target.value })}
            className="w-12 h-12 rounded-2xl mx-2 text-center bg-background border-none outline-none focus:ring-2 focus:ring-accent"
            onKeyUp={handleInputFocus}
            autoComplete="none"
            maxLength="1"
            pattern="\d{1}"
          />
        )
      })}
    </div>
  )
}

export default OTPBox
