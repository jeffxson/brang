import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ReactApexChart from "react-apexcharts"
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useGetPriorityGraph } from "services/query/dashboard"

const LineChart = ({ chartData, chartOptions }) => {
  // queries the endpoint to get the data
  const { data } = useGetPriorityGraph()
  const [highCount, setHighCount] = useState([])
  const [lowCount, setLowCount] = useState([])
  const [mediumCount, setMediumCount] = useState([])
  const [monthName, setMonthName] = useState([])

  const { colorMode } = useColorMode()

  const lineChartData = [
    {
      name: "High Count",
      data: highCount,
    },
    {
      name: "Low Count",
      data: lowCount,
    },
    {
      name: "Medium Count",
      data: mediumCount,
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
      categories: monthName,
      labels: {
        style: {
          colors: colorMode === "light" ? "#000" : "#c8cfca",
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
          colors: colorMode === "light" ? "#000" : "#c8cfca",
          fontSize: "16px",
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
      colors: ["#0075FF", "#2CD9FF", "#2cff5a"],
    },
    colors: ["#0075FF", "#2CD9FF", "#2cff5a"],
  }

  useEffect(() => {
    const high_count = data?.map(item => item.high_count)
    const low_count = data?.map(item => item.low_count)
    const medium_count = data?.map(item => item.medium_count)
    const month_name = data?.map(item => item?.month_name?.slice(0, 3))

    setHighCount(high_count)
    setMediumCount(medium_count)
    setLowCount(low_count)
    setMonthName(month_name)
  }, [data])

  return (
    <Box
      sx={{ height: "100%" }}
      p="16px"
      mt={"40px"}
      borderRadius="20px"
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
      color={useColorModeValue("#000", "#FFFFFF")}
    >
      <Box sx={{ height: "250px" }}>
        {monthName?.length > 0 && (
          <ReactApexChart
            options={chartOptions ? chartOptions : lineChartOptions}
            series={chartData ? chartData : lineChartData}
            type="area"
            width="100%"
            height="100%"
          />
        )}
      </Box>
    </Box>
  )
}

export default LineChart

LineChart.propTypes = {
  chartData: PropTypes.any,
  chartOptions: PropTypes.any,
}
