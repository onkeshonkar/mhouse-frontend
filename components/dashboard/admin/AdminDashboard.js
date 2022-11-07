import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

import { ArrowDown } from "../../icons"
import ProfitGraph from "./ProfitGraph"
import TodaysTask from "../TodaysTask"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 3 | 1,
  tension: 0.5,
  scales: {
    y: { display: false },
    x: { display: false },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
}

const labels = [
  "January",
  "February",
  "March",
  "April",
  "January",
  "February",
  "March",
  "April",
  "January",
  "February",
  "March",
  "April",
]

const data = {
  labels,
  datasets: [
    {
      label: "Months",
      data: [9, 7, 8, 7, 6, 9, 10],
      borderColor: "#FFC34A",
      backgroundColor: "#FFC34A",
    },
  ],
}
const AdminDashboard = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[300px] h-52 bg-white rounded-2xl px-7 py-6 flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <span className="font-bold text-2xl">9254</span>
              <h3 className="text-sm font-light">Total Sales</h3>
            </div>
            <div className="self-center flex gap-1.5 items-center text-x-green bg-x-green bg-opacity-20 text-sm px-2 py-1 rounded-3xl">
              <span>4.0%</span>
              <ArrowDown width={10} height={10} className="rotate-180" />
            </div>
          </div>

          <hr />

          <div className="flex justify-between">
            <div>
              <span className="font-bold text-2xl">
                3,754{" "}
                <span className="text-sm font-normal opacity-50">(9,500$)</span>{" "}
              </span>
              <h3 className="text-sm font-light">No of Purchases</h3>
            </div>
            <div className="self-center flex gap-1.5 items-center text-x-red bg-x-red bg-opacity-20 text-sm px-2 py-1 rounded-3xl">
              <span>1.5%</span>
              <ArrowDown width={10} height={10} />
            </div>
          </div>
        </div>

        <div className="w-[300px] h-52 bg-white rounded-2xl px-7 py-6 flex flex-col justify-between">
          <div>
            <Line options={options} data={data} />
          </div>

          <div className="flex justify-between">
            <div>
              <span className="font-bold text-2xl">9,254 $</span>
              <h3 className="text-sm font-light">Employees payroll</h3>
            </div>
            <div className="self-center flex gap-1.5 items-center text-x-red bg-x-red bg-opacity-20 text-sm px-2 py-1 rounded-3xl">
              <span>3.5%</span>
              <ArrowDown width={10} height={10} />
            </div>
          </div>
        </div>

        <div className="w-[300px] h-52 bg-white rounded-2xl px-7 py-6 flex flex-col justify-between">
          <div>
            <Line options={options} data={data} />
          </div>

          <div className="flex justify-between">
            <div>
              <span className="font-bold text-2xl">9,254 $</span>
              <h3 className="text-sm font-light">Total Expenses</h3>
            </div>
            <div className="self-center flex gap-1.5 items-center text-x-red bg-x-red bg-opacity-20 text-sm px-2 py-1 rounded-3xl">
              <span>3.5%</span>
              <ArrowDown width={10} height={10} />
            </div>
          </div>
        </div>

        <div className="w-[300px] h-52 bg-white rounded-2xl px-7 py-6 flex flex-col justify-between">
          <div>
            <Line options={options} data={data} />
          </div>

          <div className="flex justify-between">
            <div>
              <span className="font-bold text-2xl">24,423 $</span>
              <h3 className="text-sm font-light">Total Revenue</h3>
            </div>
            <div className="self-center flex gap-1.5 items-center text-x-green bg-x-green bg-opacity-20 text-sm px-2 py-1 rounded-3xl">
              <span>3.5%</span>
              <ArrowDown width={10} height={10} className="rotate-180" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="bg-white rounded-2xl px-7 py-6 max-h-80 h-80 w-full">
          <TodaysTask />
        </div>
        <div className="bg-white rounded-2xl px-7 py-6 max-h-80 h-80 w-full">
          <ProfitGraph />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
