import { HStack, Text } from "@chakra-ui/react"
import React from "react"

const PulseLayout = ({ initData, initLabel, secData, secLabel }) => {
  return (
    <>
      <HStack alignItems="flex-start" spacing={5}>
        <Text minWidth="110px">{initLabel}:</Text>
        <Text fontWeight="bold">{initData}</Text>
      </HStack>
      <HStack spacing={5}>
        <Text minWidth="110px">{secLabel}:</Text>
        <Text fontWeight="bold">{secData}</Text>
      </HStack>
    </>
  )
}

export default PulseLayout
