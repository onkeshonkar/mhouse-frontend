import { Tab } from "@headlessui/react"

import Account from "../components/settings/Account"
import Integration from "../components/settings/Integration"
import MyBranch from "../components/settings/MyBranch"
import MyTeam from "../components/settings/MyTeam"
import Notification from "../components/settings/NotificationSettings"
import PayrollGroup from "../components/settings/PayrollGroup"
import PlanBilling from "../components/settings/PlanBillings"
import useUserStore from "../stores/useUserStore"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const tabs = [
  { name: "Account", panel: Account },
  { name: "Notifications", panel: Notification, adminAcces: true },
  { name: "My Team", panel: MyTeam, adminAcces: true },
  { name: "My Branches", panel: MyBranch, adminAcces: true },
  { name: "Payroll", panel: PayrollGroup, adminAcces: true },
  { name: "Integrations", panel: Integration, adminAcces: true },
  { name: "Plan Billing", panel: PlanBilling, adminAcces: true },
]

const Setting = () => {
  const user = useUserStore((store) => store.user)

  return (
    <div className="mt-8 ml-6 pb-6">
      <main>
        <Tab.Group>
          <Tab.List className="flex">
            {tabs.map((tabItem) => {
              if (user.type === "OWNER") {
                return (
                  <Tab
                    key={tabItem.name}
                    className={({ selected }) =>
                      classNames(
                        selected ? "bg-x-grey text-white" : "text-x-grey",
                        "text-base font-medium px-9 py-1.5 rounded-md transition-all duration-200 outline-none"
                      )
                    }
                  >
                    {tabItem.name}
                  </Tab>
                )
              } else if (!tabItem.adminAcces) {
                return (
                  <Tab
                    key={tabItem.name}
                    className={({ selected }) =>
                      classNames(
                        selected ? "bg-x-grey text-white" : "text-x-grey",
                        "text-base font-medium px-9 py-1.5 rounded-md transition-all duration-200 outline-none"
                      )
                    }
                  >
                    {tabItem.name}
                  </Tab>
                )
              }
            })}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tabItem, i) => {
              if (user.type === "OWNER") {
                return (
                  <Tab.Panel key={i} className="pt-10">
                    {<tabItem.panel />}
                  </Tab.Panel>
                )
              } else if (!tabItem.adminAcces) {
                return (
                  <Tab.Panel key={i} className="pt-10">
                    {<tabItem.panel />}
                  </Tab.Panel>
                )
              }
            })}
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  )
}

export default Setting
