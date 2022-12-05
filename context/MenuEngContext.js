import React, { createContext, useState } from "react"

const menuEngContext = createContext(undefined)

function MenuEngProvider({ children }) {
  const [menuDetails, setMenuDetails] = useState({})

  return (
    <menuEngContext.Provider value={{ menuDetails, setMenuDetails }}>
      {children}
    </menuEngContext.Provider>
  )
}

export { MenuEngProvider, menuEngContext }
