import React from "react"
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import PulseLayout from "./Layout/PulseLayout"

const ShodanData = ({ data, loading }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          background={useColorModeValue(
            "lightMode.dashBoardHeader",
            "darkMode.wHeaderColor"
          )}
          borderRadius={"10px"}
          boxShadow="md"
          my={2}
        >
          <Box flex={"1"} textAlign="left">
            Shodan / Censys Data
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {loading && (
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="lightMode.blue"
            size="md"
          />
        )}

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
                initData={data?.map(dat => dat?.name)}
                secLabel="ASN"
                secData={data?.map(dat => dat?.asn)}
              />
              <PulseLayout
                initLabel="IP Address"
                initData={data?.map(dat => dat?.ip)}
                secLabel="Longitude"
                secData={data?.map(dat => dat?.longitude)}
              />
              <PulseLayout
                initLabel="Latitude"
                initData={data?.map(dat => dat?.latitude)}
                secLabel="OS"
                secData={data?.map(dat => dat?.os)}
              />
              <PulseLayout
                initLabel="Timezone"
                initData={data?.map(dat => dat?.timezone)}
                secLabel="Country"
                secData={data?.map(dat => dat?.registered_country)}
              />
            </Stack>
            <Stack spacing={2} direction="column">
              <PulseLayout
                initLabel="Port Name"
                initData={data?.map(dat => dat?.domain_name)}
                secLabel="Registrar"
                secData={data?.registrar}
              />
              <PulseLayout
                initLabel="Registrar URL"
                initData={data?.registrar_url || "NIL"}
                secLabel="Updated Date"
                secData={
                  new Date(data?.map(dat => dat?.last_updated_at)).toDateString
                }
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
                secLabel="Emails"
                secData={data?.emails}
              />
            </Stack>
          </HStack>
        )}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default ShodanData
