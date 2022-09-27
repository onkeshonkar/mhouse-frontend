import { Tab } from "@headlessui/react"

import Account from "../components/settings/Account"
import Notification from "../components/settings/NotificationSettings"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const tabs = [
  { name: "Account", panel: Account },
  { name: "Notifications", panel: Notification },
  // { name: "My Team", panel: "MyTeam" },
  // { name: "My Branches", panel: "MyBranch" },
  // { name: "Payroll", panel: "Payroll" },
  // { name: "Integrations", panel: "Integration" },
  // { name: "Plan Billing", panel: "PlanBilling " },
]

const Setting = () => {
  return (
    <div className="mt-8 ml-6 pb-6">
      <main>
        <Tab.Group>
          <Tab.List className="flex">
            {tabs.map((tabItem) => (
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
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tabItem, i) => (
              <Tab.Panel key={i} className="pt-10">
                {<tabItem.panel />}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  )
}

export default Setting
