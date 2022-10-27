import { Tab } from "@headlessui/react"
import CashRegister from "../../components/finance/cashRegister"
import Closing from "../../components/finance/closings"
import FundTransfer from "../../components/finance/fundTransfer"
import SafeDeposit from "../../components/finance/safeDeposit"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const tabs = [
  { name: "Cash Register", panel: CashRegister },
  { name: "Closing Days", panel: Closing },
  { name: "Safe Deposit", panel: SafeDeposit },
  { name: "Transferred", panel: FundTransfer },
]

const Finance = () => {
  return (
    <div className="mt-8 ml-6">
      <div>
        <Tab.Group>
          <Tab.List className="flex justify-center">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    selected ? "bg-x-grey text-white" : "text-x-grey",
                    "text-base font-medium px-6 py-1.5 rounded-md transition-all duration-200 outline-none"
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.name}>
                <tab.panel />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Finance
