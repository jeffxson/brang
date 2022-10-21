import React from "react"
import { HStack, Stack, Text } from "@chakra-ui/react"
import { formatDate } from "../../../utils/helpers"
import AccLayout from "./Layout/AccLayout"
import PulseLayout from "./Layout/PulseLayout"

const Certificates = ({ data, loading }) => {
  return (
    <AccLayout title="Certificates" loading={loading}>
      {typeof data === "string" ? (
        <Text fontWeight="bold">{data}</Text>
      ) : (
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={5}
        >
          <Stack spacing={2} direction="column">
            <PulseLayout
              initLabel="Name"
              initData={data?.name}
              secLabel="Domain Name"
              secData={data?.domain_name}
            />
            <PulseLayout
              initLabel="Issuer Name: cd"
              initData={data?.issuer_name}
              secLabel="Issuer CA ID"
              secData={data?.issuer_ca_id}
            />
            <PulseLayout
              initLabel="Logged at"
              initData={formatDate(data?.logged_at)}
              secLabel="Not before"
              secData={formatDate(data?.not_before)}
            />
            <PulseLayout
              initLabel="Not after"
              initData={formatDate(data?.not_after)}
            />
          </Stack>
        </HStack>
      )}
    </AccLayout>
  )
}

export default Certificates
