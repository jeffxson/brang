import React from "react"
import { HStack, Stack, Text } from "@chakra-ui/react"
import AccLayout from "./Layout/AccLayout"
import PulseLayout from "./Layout/PulseLayout"

const WhoIsData = ({ data, loading }) => {
  return (
    <AccLayout title="Who Is Data" loading={loading}>
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
              secLabel="Org"
              secData={data?.org}
            />
            <PulseLayout
              initLabel="Address"
              initData={data?.address}
              secLabel="City"
              secData={data?.city}
            />
            <PulseLayout
              initLabel="State"
              initData={data?.state}
              secLabel="Zipcode"
              secData={data?.zipcode}
            />
            <PulseLayout
              initLabel="IP Address"
              initData={data?.server_ip}
              secLabel="Country"
              secData={data?.country}
            />
          </Stack>
          <Stack spacing={2} direction="column">
            <PulseLayout
              initLabel="Domain Name"
              initData={data?.domain_name}
              secLabel="Registrar"
              secData={data?.registrar}
            />
            <PulseLayout
              initLabel="Registrar URL"
              initData={data?.registrar_url || "NIL"}
              secLabel="Updated Date"
              secData={data?.updated_date}
            />
            <PulseLayout
              initLabel="Creation Date"
              initData={data?.creation_date}
              secLabel="Expiration Date"
              secData={data?.expiration_date}
            />
            <PulseLayout
              initLabel="Name Servers"
              initData={data?.name_servers}
              secLabel="Status"
              secData={data?.site_status}
            />
            <PulseLayout
              initLabel="dnssec"
              initData={data?.dnssec}
              secLabel="Email"
              secData={data?.emails}
            />
          </Stack>
        </HStack>
      )}
    </AccLayout>
  )
}

export default WhoIsData
