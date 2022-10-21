import React from "react"
import { CheckIcon } from "@chakra-ui/icons"
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Tbody,
} from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { useGetWebmonitoringDashboard } from "services/query/dashboard"

const LatestWebsiteMonitoring = () => {
  // queries the endpoint to display all website being monitored
  const { data: webMonitoringData } = useGetWebmonitoringDashboard()
  const latestKeywordMonitoringTableData =
    webMonitoringData?.website_monitoring_data || []
  const { t } = useTranslation()

  return (
    <>
      <Box
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        h="15.6rem"
        mt={10}
        borderRadius={"10px"}
      >
        <TableContainer
          overflowY="scroll"
          minH={"300px"}
          maxH={"300px"}
          fontWeight={400}
          sx={scrollBarStyle}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign="center">{t("description.webHeader1")}</Th>
                <Th textAlign="center">IP</Th>
                <Th textAlign="center">{t("description.webHeader3")}</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={"14px"}>
              {latestKeywordMonitoringTableData.map((data, index) => {
                return (
                  <Tr
                    cursor={"pointer"}
                    key={index}
                    onClick={() => window.open(`https://${data?.website_name}`)}
                  >
                    <Td textAlign="center">{data?.website_name}</Td>
                    <Td textAlign="center">{data?.ip || "-"}</Td>
                    <Td textAlign="center">
                      {
                        <CheckIcon
                          w="6"
                          h="6"
                          color={"white"}
                          background="green"
                          clipPath={"circle(50%)"}
                          p={1}
                        />
                      }
                    </Td>
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

export default LatestWebsiteMonitoring
