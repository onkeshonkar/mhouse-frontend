import { useRouter } from "next/router"

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

const Layout = ({ children }) => {
  const route = useRouter()
  const path = route.pathname.split("/")[1]

  return (
    <div className="bg-background text-primary">
      <div className="min-h-screen antialiased max-w-8xl mx-auto relative">
        {navItem.includes(path) ? (
          <>
            <Header />
            <SideBar />
            <div className="pt-20 pl-16">{children}</div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default Layout
