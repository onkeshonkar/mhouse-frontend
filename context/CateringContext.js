import React, { createContext, useState } from "react"

const CateringOrderContext = createContext(undefined)

function CateringOrderProvider({ children }) {
  const [orderDetails, setOrderDetails] = useState({})
  return (
    <CateringOrderContext.Provider value={{ orderDetails, setOrderDetails }}>
      {children}
    </CateringOrderContext.Provider>
  )
}

export { CateringOrderProvider, CateringOrderContext }
