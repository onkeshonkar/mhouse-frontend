import { Tab } from "@headlessui/react"
import { ArrowDown } from "../../icons"

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
    y: {
      display: true,
      min: 0,
      // max: 5000,
      ticks: {
        callback: function (value, index, ticks) {
          return "$ " + value / 1000 + "k"
        },
      },
    },
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        font: {
          size: 10,
        },
      },
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
}

const weeklyLabels = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
  "Week 7",
  "This Week",
]

const dailyLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const monthlyLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const weeklyData = {
  labels: weeklyLabels,
  datasets: [
    {
      label: "Last 8 Week",
      data: [250, 1580, 2200, 1800, 3200, 1955, 3265, 8000],
      borderColor: "#FFC34A",
      backgroundColor: "#FFC34A",
    },
  ],
}

const dailyData = {
  labels: dailyLabels,
  datasets: [
    {
      label: "This Week",
      data: [3050, 2680, 2200, 1800, 3200, 3265, 4000],
      borderColor: "#FFC34A",
      backgroundColor: "#FFC34A",
    },
  ],
}

const monthlyData = {
  labels: monthlyLabels,
  datasets: [
    {
      label: "This Year",
      data: [
        1050, 1680, 1200, 1800, 3200, 3265, 4000, 1200, 1800, 3200, 4800, 4950,
      ],
      borderColor: "#FFC34A",
      backgroundColor: "#FFC34A",
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ProfitGraph = () => {
  const graphTypes = ["Daily", "Weekly", "Monthly"]
  return (
    <Tab.Group>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-between ">
          <div className="flex items-center gap-6">
            <div>
              <h3 className="font-bold text-2xl">5,678 $</h3>
              <span className="font-light text-sm">Total Profit</span>
            </div>
            <div className="self-center flex gap-1.5 items-center text-x-green bg-x-green bg-opacity-20 text-sm px-2 py-1 rounded-3xl">
              <span>3.5%</span>
              <ArrowDown width={10} height={10} className="rotate-180" />
            </div>
          </div>
        </div>

        <Tab.List className="bg-background rounded-md">
          {graphTypes.map((type) => (
            <Tab
              key={type}
              className={({ selected }) =>
                classNames(
                  selected && "bg-primary text-white",
                  "px-4 py-2 rounded-md text-xs"
                )
              }
            >
              {type}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels>
        <Tab.Panel>
          <Line options={options} data={dailyData} />
        </Tab.Panel>
        <Tab.Panel>
          <Line options={options} data={weeklyData} />
        </Tab.Panel>
        <Tab.Panel>
          <Line options={options} data={monthlyData} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ProfitGraph
