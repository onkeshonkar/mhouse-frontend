import Router, { useRouter } from "next/router"
import { useEffect } from "react"
import useUserStore from "../stores/useUserStore"

// const canAccess = (access, resource) => {
//   const allResources = [
//     "TASKS",
//     "SUPPLIER",
//     "STOCKTAKE",
//     "BUILD_CART",
//     "CASH_REGISTER",
//     "CLOSING_DAY",
//     "SAFE_DEPOSIT",
//     "FUND_TRANSFER",
//     "SCHEDULE_SHIFT",
//     "WORKFORCE",
//     "CATERING_ORDERS",
//     "OPERATIONS",
//     "MENU",
//     "NEWS_FEED",
//     "SETTINGS",
//   ]

//   if (allResources.includes(resource) && access[resource].includes("view")) {
//     return true
//   }

//   return false
// }

// const useRedirectDashboard = () => {
//   const user = useUserStore((store) => store.user)

//   useEffect(() => {
//     const resource = Router.pathname.split("/")[1].toUpperCase()

//     if (user && canAccess(user.roles.role, resource)) {
//       Router.replace("/dashboard")
//     }
//   }, [user])
// }

// export default useRedirectDashboard

const useRedirectDashboard = () => {
  const user = useUserStore((store) => store.user)
  const router = useRouter()
  useEffect(() => {
    if (user) router.replace("/dashboard")
  }, [user])
}

export default useRedirectDashboard
