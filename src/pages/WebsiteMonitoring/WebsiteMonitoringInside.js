import React, { useEffect, useState } from "react"
import {
  Accordion,
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { useHistory } from "react-router-dom"
import {
  useGetSslStatus,
  useGetWebMonitoringDetails,
} from "services/query/webMonitoring"
import WhoIsData from "components/data/webmonitoring/WhoIsData"
import ShodanData from "components/data/webmonitoring/ShodanData"
import Certificates from "components/data/webmonitoring/Certificates"
import PulseData from "components/data/webmonitoring/PulseData"
import { useGetPulseData } from "services/query/pulseData"
import GoBack from "components/Common/GoBack"
import Bbot from "components/data/webmonitoring/Bbot"

const WebsiteMonitoringInside = props => {
  const history = useHistory()
  const [websiteData, setWebsiteData] = useState({})

  // queries the endpoint to get ssl status
  const { isSuccess: isSslTrue } = useGetSslStatus(
    history?.location?.data?.domain_name
  )

  // queries the endpoint to get web monitoring status
  const { data: webMonitoringDetails, isLoading: isWebMonitoringLoading } =
    useGetWebMonitoringDetails(history?.location?.data?.domain_name)

  // queries the endpoint to get web monitoring status
  const { data: pulseData, isLoading: isPulseDataLoading } = useGetPulseData(
    history?.location?.data?.ip
  )

  useEffect(() => {
    if (props?.history?.location?.data) {
      setWebsiteData(history?.location?.data)
    } else {
      history.push("/website-monitoring")
    }
  }, [])

  return (
    <Box w="full">
      <Flex align={"center"} flexDir="row" justify="space-between" my="5">
        <Flex align="center">
          <GoBack />
          <Text
            fontWeight={700}
            fontSize="3xl"
            color={useColorModeValue(
              "lightMode.pageTitle",
              "lightMode.dashBoardHeader"
            )}
          >
            {websiteData?.domain_name}
          </Text>
        </Flex>
      </Flex>
      <Box my={3}>
        <HStack alignItems="flex-start" spacing={5}>
          <Stack spacing={2} direction="column" px={10}>
            <HStack spacing={5}>
              <Text minWidth="110px">Domain Name: </Text>
              <Text fontWeight="bold">{websiteData?.domain_name || "-"}</Text>
            </HStack>
            <HStack spacing={5}>
              <Text minWidth="110px">Ip: </Text>
              <Text fontWeight="bold">{websiteData?.ip || "-"}</Text>
            </HStack>
            <HStack spacing={5}>
              <Text minWidth="110px">Second Ip: </Text>
              <Text fontWeight="bold">{websiteData?.ip_second || "-"}</Text>
            </HStack>

            <HStack spacing={5}>
              <Text minWidth="110px">Mail Server: </Text>
              <Text>{websiteData?.ip_second || "-"}</Text>
            </HStack>

            <HStack spacing={5}>
              <Text minWidth="110px">Web Status: </Text>
              <Text fontWeight="bold">{websiteData?.web_status || "-"}</Text>
            </HStack>
          </Stack>
          <Stack spacing={2} direction="column" px={10}>
            <HStack alignItems="flex-start" spacing={5}>
              <Text minWidth="110px">Monitored: </Text>
              {websiteData?.monitored ? (
                <CheckCircleIcon color="#74AD1A" />
              ) : (
                <SmallCloseIcon color="red" />
              )}
            </HStack>
            <HStack alignItems="flex-start" spacing={5}>
              <Text minWidth="110px">MX Record: </Text>
              <Text maxWidth="300px" fontWeight="bold">
                {websiteData?.MX_records || "-"}
              </Text>
            </HStack>
            <HStack alignItems="flex-start" spacing={5}>
              <Text minWidth="110px">SSL Status: </Text>
              <Text maxWidth="300px" fontWeight="bold">
                {isSslTrue ? "TRUE" : "FALSE"}
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </Box>
      <Box my={10}>
        <VStack>
          <Accordion allowToggle w="full" variant={"base"}>
            <WhoIsData
              data={
                typeof webMonitoringDetails?.whois_data === "string"
                  ? webMonitoringDetails?.whois_data
                  : webMonitoringDetails?.whois_data?.[0]
              }
              loading={isWebMonitoringLoading}
            />

            <ShodanData
              data={webMonitoringDetails?.shodan_data}
              loading={isWebMonitoringLoading}
            />

            <Certificates
              data={
                typeof webMonitoringDetails?.certificate_data === "string"
                  ? webMonitoringDetails?.certificate_data
                  : webMonitoringDetails?.certificate_data?.[0]
              }
              loading={isWebMonitoringLoading}
            />

            <PulseData data={pulseData} loading={isPulseDataLoading} />
            <Bbot />
          </Accordion>
        </VStack>
      </Box>
    </Box>
  )
}

export default WebsiteMonitoringInside
