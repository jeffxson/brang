import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import TableLoader from "components/Common/TableLoader"
import React from "react"

export const Card = ({ label, data }) => {
  return (
    <Flex
      fontSize={["14px", "14px", "14px", "16px"]}
      flexDirection={["column", "column", "row", "row"]}
      justifyContent="space-between"
    >
      <Text fontWeight={600}>{label}</Text>
      <Text>{data}</Text>
    </Flex>
  )
}

const TopCard = ({ data, isLoading }) => {
  return (
    <Box
      my={50}
      mx="auto"
      borderRadius="20px"
      boxShadow="lg"
      w={["100%", "100%", "60%", "60%"]}
      px="30px"
      py="30px"
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
    >
      <Text textAlign="center" fontWeight={600}>
        System Information
      </Text>
      {isLoading && <TableLoader />}
      {data && (
        <Box>
          <Card label="Platform:" data={data?.platform} />
          <Card label="Platform Release:" data={data?.platform_release} />
          <Card label="Host Name:" data={data?.hostname} />
          <Card label="RAM:" data={data?.ram} />
          <Card label="MAC Address:" data={data?.mac_address} />
          <Card label="IP Address:" data={data?.ip_address} />
          <Card label="Disk Usage:" data={data?.disk_usage} />
          <Card label="Memory Usage:" data={data?.memory_usage} />
          <Card label="Architecture:" data={data?.architecture} />
        </Box>
      )}
    </Box>
  )
}

export default TopCard
