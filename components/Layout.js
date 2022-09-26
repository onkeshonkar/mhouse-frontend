import { useRouter } from "next/router"
import { useEffect } from "react"

import toast from "react-hot-toast"

import useUser from "../hooks/useUser"
import useUserStore from "../stores/useUserStore"

import Header from "./Header"
import SideBar from "./Sidebar"

const navItem = [
  "dashboard",
  "tasks",
  "inventory",
  "finance",
  "schedule",
  "workforce",
  "catering",
  "operations",
  "menu",
  "news-feed",
  "notifications",
  "settings",
]

import Spinner from "./ui/Spinner"

const Layout = ({ children }) => {
  const router = useRouter()
  const path = router.pathname.split("/")[1]

  const isLoggedIn = useUserStore((store) => store.isLoggedIn)
  const setUser = useUserStore((store) => store.setUser)
  const authTokenExists = useUserStore((store) => store.authTokenExists)
  const authToken = useUserStore((store) => store.authToken)
  const storeUser = useUserStore((store) => store.user)
  const logOut = useUserStore((store) => store.logOut)
  const setSelectedBranch = useUserStore((store) => store.setSelectedBranch)

  const readAuthToken = useUserStore((store) => store.readAuthToken)

  useEffect(() => {
    if (!authToken) readAuthToken()
  }, [])

  const { user, error } = useUser()

  useEffect(() => {
    if (!storeUser && !authTokenExists && path !== "auth")
      router.replace("/auth/login")
  }, [authTokenExists])

  useEffect(() => {
    if (user) {
      setUser(user)
      setSelectedBranch(user.branch)
    }

    if (error) {
      toast.error("Logged out")
      logOut()
      router.reload()
    }
  }, [user, error])

  if (!navItem.includes(path)) {
    return (
      <div className="bg-background text-primary">
        <div className="min-h-screen antialiased max-w-8xl mx-auto relative">
          {children}
        </div>
      </div>
    )
  }

  if (!isLoggedIn && navItem.includes(path)) {
    return (
      <div className="bg-background text-primary">
        <div className="min-h-screen antialiased max-w-8xl mx-auto relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
            <Spinner />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background text-primary">
      <div className="min-h-screen antialiased max-w-8xl mx-auto relative">
        <Header />
        <SideBar />
        <div className="pt-20 pl-16">{children}</div>
      </div>
    </div>
  )
}

export default Layout
