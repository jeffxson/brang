import React from "react"
import { Heading, Box } from "@chakra-ui/react"
// import PropTypes from "prop-types"
import { DashboardSkeletons } from "components/data/DashboardWidget/DashboardSkeleton"
import LineChart from "components/data/Chart/LineChart"
import PieChart from "components/data/Chart/Pie"
import BarChart from "components/data/Chart/Bar/BarChart"

const lineChartData = [
  {
    name: "Login",
    data: [500, 250, 300, 220, 500, 250, 300, 230, 300, 350, 250, 400],
  },
]

const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
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
    ],
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#0075FF"],
  },
  colors: ["#0075FF"],
}

const Analytics = () => {
  return (
    <Box px={50}>
      <Heading>Analytics</Heading>
      <Box>
        <DashboardSkeletons
          initTitle="Case Study"
          secTitle="Login Frequency"
          text2={<PieChart />}
          text4={
            <LineChart
              chartData={lineChartData}
              chartOption={lineChartOptions}
            />
          }
        />
        <DashboardSkeletons
          initTitle="Raised Incidents"
          secTitle="Takedown Overview"
          text2={<LineChart />}
          text4={<BarChart />}
        />
      </Box>
    </Box>
  )
}

export default Analytics
