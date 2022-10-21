import React from "react"
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { DoughnutChart } from "components/data/Chart/Doughnut"

const Doughnut = () => {
  return (
    <Flex
      flexDir={"column"}
      align="center"
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
      mt={["50px", "50px", "50px", 0]}
      w={["80%", "85%", "90%", "30%"]}
      boxShadow="lg"
      borderRadius="20px"
      mx={50}
      h={["auto", "auto", "auto", "78vh"]}
      mb={20}
      py={2}
    >
      <Heading fontSize="20px" mb={10}>
        System Health Overview
      </Heading>
      <Box
        h={["auto", "auto", "auto", "60vh"]}
        w="100%"
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius="20px"
        boxShadow="lg"
        py={5}
      >
        <DoughnutChart />
      </Box>
    </Flex>
  )
}

export default Doughnut
