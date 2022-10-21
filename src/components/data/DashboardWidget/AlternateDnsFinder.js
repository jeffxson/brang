import React from "react"
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Tbody,
} from "@chakra-ui/react"
import { useGetTwistedDnsData } from "services/query/webMonitoring"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { ArTwistedDashboard } from "locales/AR/TwistedDns"
import { EnTwistedDashboard } from "locales/EN/TwistedDns"

const AlternateDnsFinder = () => {
  // queries the endpoint to get the twisted dns data summary
  const { data: twistedDNS } = useGetTwistedDnsData(1, 10)
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"
  return (
    <>
      <Flex mt={1} align={"center"} justify="space-between">
        {toggle ? <ArTwistedDashboard /> : <EnTwistedDashboard />}
      </Flex>
      <Box
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius={"10px"}
        h={"15.6rem"}
      >
        <TableContainer
          maxHeight="300px"
          minHeight="300px"
          overflowY="auto"
          sx={scrollBarStyle}
          fontWeight={400}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{t("description.dnsHeader1")}</Th>
                <Th pl="2rem">{t("description.dnsHeader2")}</Th>
                <Th textAlign="center">FUZZER</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={"14px"}>
              {twistedDNS?.results?.map((data, index) => {
                return (
                  <Tr key={index}>
                    <Td>{data?.twisted_dns}</Td>
                    <Td pl={"2rem"}>{data?.corporate_dns}</Td>
                    <Td textAlign="center">{data?.fuzzer}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
export default AlternateDnsFinder
