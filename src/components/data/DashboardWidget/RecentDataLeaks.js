import React from "react"
import {
  Box,
  Table,
  TableContainer,
  Text,
  Thead,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Tbody,
} from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { useGetRecentDataLeaks } from "services/query/dashboard"

const RecentDataLeaks = () => {
  // queries the endpoint to display all data leaks searched
  const { data: recentDataLeaks } = useGetRecentDataLeaks()
  const filteredRecentDataLeaks = recentDataLeaks?.filter(
    el => el?.status?.toLowerCase() === "leaked"
  )
  const { t } = useTranslation()

  return (
    <>
      <Box
        h={"15.6rem"}
        mt={10}
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius={"10px"}
      >
        <TableContainer
          fontWeight={400}
          height="100%"
          minH={"250px"}
          maxH={"250px"}
          overflowY="scroll"
          sx={scrollBarStyle}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{t("description.leakHeader1")}</Th>
                <Th>{t("description.leakHeader2")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredRecentDataLeaks?.length > 0 ? (
                filteredRecentDataLeaks?.map((data, index) => (
                  <Tr fontSize={"14px"} key={index}>
                    <Td>{data?.search_term}</Td>
                    {data?.status === "Leaked" && <Td>Checked</Td>}
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4} rowSpan={2}>
                    <Text my={6} textAlign={"center"}>
                      {t("description.noDataLeak")}
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default RecentDataLeaks
