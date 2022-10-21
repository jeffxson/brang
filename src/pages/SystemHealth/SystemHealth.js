import React from "react"
import { Heading, Box } from "@chakra-ui/react"
import { useGetSystemHealth } from "services/query/systemHealth"
import TopCard from "components/data/SystemHealth/TopCard"
import BottomCard from "components/data/SystemHealth/BottomCard"

const SystemHealth = () => {
  // queries the endpoint to get system health data
  const { data, isLoading } = useGetSystemHealth()
  const systemInfo = data?.system_information
  const systemStatus = data?.services

  return (
    <Box>
      <Heading>System Health</Heading>
      <TopCard isLoading={isLoading} data={systemInfo} />
      <BottomCard isLoading={isLoading} data={systemStatus} />
    </Box>
  )
}

export default SystemHealth
