import React from "react"
import Chart from "react-apexcharts"
import { Box, useColorModeValue } from "@chakra-ui/react"

const PieChart = () => {
  const pieSeries = [44, 13, 43, 22]

  const pieOptions = {
    chart: {
      width: "300",
      type: "pie",
    },
    labels: ["phishing", "counterfeit", "brand-abuse", "suspicious"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  }

  return (
    <Box
      sx={{ height: "280px" }}
      p="16px"
      mt={"40px"}
      borderRadius="20px"
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
      color={useColorModeValue("#000", "#FFFFFF")}
    >
      <Chart
        type="pie"
        width="100%"
        height="100%"
        options={pieOptions}
        series={pieSeries}
      />
    </Box>
  )
}

export default PieChart
