import Link from "next/link"
import { useRouter } from "next/router"
import useUserStore from "../stores/useUserStore"

import { Bell, Logout, News, Settings, Search } from "./icons"
import Avatar from "./ui/Avatar"
import BranchList from "./ui/BranchList"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const navMenu = [
  { href: "/news-feed", icon: News },
  { href: "/settings", icon: Settings },
  { href: "/notifications", icon: Bell },
]

const Header = () => {
  const user = useUserStore((store) => store.user)
  const logOut = useUserStore((store) => store.logOut)
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const setSelectedBranch = useUserStore((store) => store.setSelectedBranch)

  const route = useRouter()

  const handleCheckout = () => {}

  const handleSearch = () => {}

  const handleLogout = () => {
    logOut()
    route.replace("auth/login")
  }

  return (
    <header className="fixed w-full max-w-8xl z-20 top-0">
      <div className="flex items-center justify-between h-20 mx-auto px-5 bg-white rounded-b-2xl shadow-bottom">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center">
            <Avatar user={user} width={200} height={200} />
          </div>

          <div>
            <p className="text-sm">Welcome</p>
            <span className="text-base font-bold">{user.fullName}</span>
          </div>
        </div>

        <div className="text-sm">
          <button
            onClick={handleCheckout}
            className="text-white bg-[#FC5A5A] rounded-xl px-5 py-2.5"
          >
            Check-Out
          </button>
          <span className="ml-3">{"5 hr 57m"}</span>
        </div>

        <div>
          <form onSubmit={handleSearch}>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative bg-background rounded-xl">
              <input
                type="search"
                name="search"
                id="search"
                className="block w-[426px] bg-inherit border-none focus:ring-0 outline-accent rounded-xl pl-5 pr-12 py-3 placeholder:text-sm"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <div
                className="absolute inset-y-0 right-0 mr-5 flex items-center pointer-events-none"
                aria-hidden={true}
              >
                <Search width={20} height={20} />
              </div>
            </div>
          </form>
        </div>

        <div className="flex self-stretch text-[#92929D] gap-2">
          <button onClick={handleLogout} className="px-3 hover:text-accent">
            <Logout />
          </button>

          {navMenu.map((navItem) => (
            <Link key={navItem.href} href={navItem.href}>
              <a
                className={classNames(
                  navItem.href === route.pathname && "text-accent",
                  "cursor-pointer relative flex items-center"
                )}
              >
                <div className="px-3 flex flex-col items-center">
                  <navItem.icon />
                  {navItem.href === route.pathname && (
                    <span className="absolute bottom-0 block w-full h-1 rounded-lg bg-accent" />
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>

        <div className="bg-primary text-white rounded-2xl h-12 relative flex items-center min-w-[176px]">
          {user.type !== "OWNER" ? (
            <div className="w-full text-sm px-6 pt-3">{user.branch.name}</div>
          ) : (
            <BranchList
              value={selectedBranch}
              onChange={(branch) => {
                setSelectedBranch(branch)
              }}
            />
          )}
          <label className="absolute text-xs opacity-50 left-6 top-1">
            Branch
          </label>
        </div>
      </div>
    </header>
  )
}

export default Header
