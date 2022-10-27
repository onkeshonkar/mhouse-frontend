import AmountInput from "../../ui/AmountInput"

const ClosingCount = ({ income, setIncome, cash }) => {
  const updateIncome = (key, val) => {
    const _revenue = { ...income, [key]: +val }
    setIncome(_revenue)
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-y-5 gap-x-44">
        <AmountInput value={cash} onChange={() => {}}>
          <span className="w-9 mr-6">Cash</span>
        </AmountInput>

        <AmountInput
          value={income.menulog}
          onChange={(val) => updateIncome("menulog", val)}
        >
          <span className="w-9 mr-6">Menulog</span>
        </AmountInput>

        <AmountInput
          value={income["eftpos"]}
          onChange={(val) => updateIncome("eftpos", val)}
        >
          <span className="w-9 mr-6">Eftpos</span>
        </AmountInput>

        <AmountInput
          value={income["doorDash"]}
          onChange={(val) => updateIncome("doorDash", val)}
        >
          <span className="w-9 mr-6">DoorDash</span>
        </AmountInput>

        <AmountInput
          value={income["deliveroo"]}
          onChange={(val) => updateIncome("deliveroo", val)}
        >
          <span className="w-9 mr-6">Deliveroo</span>
        </AmountInput>

        <AmountInput
          value={income["orderUp"]}
          onChange={(val) => updateIncome("orderUp", val)}
        >
          <span className="w-9 mr-6">OrderUp</span>
        </AmountInput>

        <AmountInput
          value={income["uber"]}
          onChange={(val) => updateIncome("uber", val)}
        >
          <span className="w-9 mr-6">Uber</span>
        </AmountInput>

        <AmountInput
          value={income["pos"]}
          onChange={(val) => updateIncome("pos", val)}
        >
          <span className="w-9 mr-6">POS</span>
        </AmountInput>
      </div>
    </div>
  )
}

export default ClosingCount
