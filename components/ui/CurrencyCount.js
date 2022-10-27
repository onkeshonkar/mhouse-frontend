import { forwardRef, useEffect, useState } from "react"
import AmountInput from "./AmountInput"

const CurrencyCount = forwardRef(({ floatingAmt }, ref) => {
  const [currency, setCurrency] = useState(
    ref.current?.currency || {
      "5C": 0,
      "10C": 0,
      "20C": 0,
      "50C": 0,
      "1$": 0,
      "2$": 0,
      "5$": 0,
      "10$": 0,
      "20$": 0,
      "50$": 0,
      "100$": 0,
    }
  )

  const [totalCash, setTotalCash] = useState(ref.current?.totalCash || 0)

  const updateCurrency = (key, val) => {
    const _currency = { ...currency, [key]: val }
    setCurrency(_currency)

    const _totlaAmount =
      0.05 * _currency["5C"] +
      0.1 * _currency["10C"] +
      0.2 * _currency["20C"] +
      0.5 * _currency["50C"] +
      1 * _currency["1$"] +
      2 * _currency["2$"] +
      5 * _currency["5$"] +
      10 * _currency["10$"] +
      20 * _currency["20$"] +
      50 * _currency["50$"] +
      100 * _currency["100$"]

    setTotalCash(_totlaAmount.toFixed(2))
  }

  useEffect(() => {
    ref.current = { currency, totalCash }
  }, [currency, totalCash, ref])

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-y-5 gap-x-44">
        <AmountInput
          value={currency["5C"]}
          onChange={(val) => updateCurrency("5C", val)}
        >
          <span className="w-9">5C</span>
        </AmountInput>

        <AmountInput
          value={currency["1$"]}
          onChange={(val) => updateCurrency("1$", val)}
        >
          <span className="w-9">1$</span>
        </AmountInput>

        <AmountInput
          value={currency["20$"]}
          onChange={(val) => updateCurrency("20$", val)}
        >
          <span className="w-9">20$</span>
        </AmountInput>

        <AmountInput
          value={currency["10C"]}
          onChange={(val) => updateCurrency("10C", val)}
        >
          <span className="w-9">10C</span>
        </AmountInput>

        <AmountInput
          value={currency["2$"]}
          onChange={(val) => updateCurrency("2$", val)}
        >
          <span className="w-9">2$</span>
        </AmountInput>

        <AmountInput
          value={currency["50$"]}
          onChange={(val) => updateCurrency("50$", val)}
        >
          <span className="w-9">50$</span>
        </AmountInput>

        <AmountInput
          value={currency["20C"]}
          onChange={(val) => updateCurrency("20C", val)}
        >
          <span className="w-9">20C</span>
        </AmountInput>

        <AmountInput
          value={currency["5$"]}
          onChange={(val) => updateCurrency("5$", val)}
        >
          <span className="w-9">5$</span>
        </AmountInput>

        <AmountInput
          value={currency["100$"]}
          onChange={(val) => updateCurrency("100$", val)}
        >
          <span className="w-9">100$</span>
        </AmountInput>

        <AmountInput
          value={currency["50C"]}
          onChange={(val) => updateCurrency("50C", val)}
        >
          <span className="w-9">50C</span>
        </AmountInput>

        <AmountInput
          value={currency["10$"]}
          onChange={(val) => updateCurrency("10$", val)}
        >
          <span className="w-9">10$</span>
        </AmountInput>
      </div>

      <div className="self-end -mt-4 flex gap-12">
        {floatingAmt && (
          <div>
            <span className="text-2xl font-bold block">{floatingAmt} $</span>
            <span className="text-sm font-light block">Floating Amount</span>
          </div>
        )}

        <div>
          <span className="text-2xl font-bold block">{totalCash} $</span>
          <span className="text-sm font-light block">Total Cash</span>
        </div>
      </div>
    </div>
  )
})

CurrencyCount.displayName = "CurrencyCount"

export default CurrencyCount
