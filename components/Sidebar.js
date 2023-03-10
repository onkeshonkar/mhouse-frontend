import { useRouter } from "next/router"
import Link from "next/link"

import {
  Dashboard,
  Draft,
  Finance,
  Inventory,
  Lock,
  Operation,
  Orders,
  Schedule,
  Tasks,
  Workforce,
  XCircle,
} from "./icons"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const navMenu = [
  { name: "Dashboard", href: "/dashboard", icon: Dashboard },
  { name: "Tasks", href: "/tasks", icon: Tasks },
  { name: "Inventory", href: "/inventory", icon: Inventory },
  { name: "Finance", href: "/finance", icon: Finance },
  { name: "Schedule", href: "/schedule", icon: Schedule },
  { name: "Workforce", href: "/workforce", icon: Workforce },
  { name: "Catering Orders", href: "/catering-orders", icon: Orders },
  { name: "Operations", href: "/operations", icon: Operation },
  { name: "Menu Enginnering", href: "/menu-engineering", icon: Draft },
]

const SideBar = () => {
  const route = useRouter()

  const path = `/${route.pathname.split("/")[1]}`

  return (
    <div className="bg-white shadow-right fixed top-24 z-10 pt-4 pb-14 rounded-tr-2xl rounded-br-[60px] group w-16 hover:w-[192px] transition-all duration-200">
      <nav className="flex flex-col gap-2.5 px-2.5">
        {navMenu.map((navItem) => (
          <Link key={navItem.name} href={navItem.href} prefetch={false}>
            <a
              className={classNames(
                path === navItem.href ? "text-accent" : "text-x-silver",
                "text-sm px-2.5 flex items-cente"
              )}
            >
              <div className="flex gap-4 py-2.5 items-center">
                {<navItem.icon />}
                <span className="w-28 hidden group-hover:block relative -left-10 group-hover:translate-x-10 transition duration-100 ease-in-out">
                  {navItem.name}
                </span>
                {path === navItem.href && (
                  <span className="absolute right-0 block h-10 w-1 rounded-lg bg-accent" />
                )}
              </div>
            </a>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default SideBar
