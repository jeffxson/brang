import React from "react"
import { HStack, Stack, Text, VStack } from "@chakra-ui/react"
import { formatDate } from "utils/helpers"
import PulseLayout from "./Layout/PulseLayout"
import AccLayout from "./Layout/AccLayout"

const PulseData = props => {
  // queries the endpoint to get pulse data from the parent file
  const { data: pulseData, loading } = props

  return (
    <AccLayout title="Pulse Data" loading={loading}>
      {(pulseData && pulseData?.length) === 0 ? (
        <Text fontWeight="bold">No pulse data found for given address</Text>
      ) : (
        <VStack
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={5}
        >
          {pulseData?.map((data, i) => (
            <Stack key={i} spacing={2} direction="column">
              <PulseLayout
                initLabel="Name"
                initData={data?.name}
                secData={data?.description}
                secLabel="Description"
              />
              <PulseLayout
                initLabel="Author Name"
                initData={data?.author_username}
                secData={data?.locked || "false"}
                secLabel="Locked"
              />
              <PulseLayout
                initLabel="Tags"
                initData={data?.tags}
                secData={data?.malware_families}
                secLabel="Malware"
              />
              <PulseLayout
                initLabel="OTX Groups"
                initData={data?.otx_groups}
                secData={data?.attack_ids}
                secLabel="Attack ID"
              />
              <PulseLayout
                initLabel="IP Address"
                initData={data?.server_ip}
                secData={formatDate(data?.created)}
                secLabel="Created"
              />
              <HStack spacing={5}>
                <Text minWidth="110px">Modified:</Text>
                <Text fontWeight="bold">{formatDate(data?.modified)}</Text>
              </HStack>
            </Stack>
          ))}
        </VStack>
      )}
    </AccLayout>
  )
}

export default PulseData
