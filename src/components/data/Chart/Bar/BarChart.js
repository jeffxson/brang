import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useGetDashboardStats } from "services/query/dashboard"

const BarChart = () => {
  // queries the endpoint to get dashboard data
  const { data } = useGetDashboardStats()
  const [chartData, setChartData] = useState([])
  const [chartOptions, setChartOptions] = useState([])

  const { colorMode } = useColorMode()

  const barChartData = [
    {
      name: "Takedowns",
      data: chartData,
    },
  ]

  const barChartOption = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "16px",
      },
      onDatasetHover: {
        style: {
          fontSize: "16px",
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: chartOptions,
      show: false,
      labels: {
        show: false,
        style: {
          colors: colorMode === "light" ? "#000" : "#c8cfca",
          fontSize: "16px",
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      show: true,
      color: "#fff",
      labels: {
        show: true,
        style: {
          colors: colorMode === "light" ? "#000" : "#c8cfca",
          fontSize: "16px",
        },
      },
      axisBorder: {
        show: true,
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: "#336CFB", //336CFB
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "7px",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
            },
          },
        },
      },
    ],
  }

  useEffect(() => {
    if (data) {
      const objKeys = Object.keys(data)
      const formatKeys = objKeys?.map(data => data.split("_").join(" "))
      const objValues = Object.values(data)

      setChartData(objValues)
      setChartOptions(formatKeys)
    }
  }, [data])

  return (
    <Box
      p="16px"
      mt={"40px"}
      borderRadius="20px"
      color={useColorModeValue("#000", "#FFFFFF")}
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
    >
      <Box height="250px" borderRadius="20px">
        <Chart
          options={barChartOption}
          series={barChartData}
          type="bar"
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  )
}

export default BarChart
