import React, { createContext, useState } from "react"

const CateringOrderContext = createContext(undefined)

function CateringOrderProvider({ children }) {
  const [orderDetail, setOrderDetails] = useState({})
  return (
    <CateringOrderContext.Provider value={{ orderDetail, setOrderDetails }}>
      {children}
    </CateringOrderContext.Provider>
  )
}

export { CateringOrderProvider, CateringOrderContext }
