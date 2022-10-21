import React from "react"
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { useGetDarkWebData } from "services/query/darkWebData"

const DarkWebData = () => {
  // queries the endpoint to display the dark web data history
  const { data, isLoading } = useGetDarkWebData()
  const { t } = useTranslation()

  const bg = useColorModeValue("lightMode.white", "darkMode.wBgColor")

  return (
    <>
      <Box
        h={"15.6rem"}
        mt={10}
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius={"10px"}
      >
        {isLoading && <Spinner />}
        {data?.length > 0 ? (
          <TableContainer
            bg={bg}
            minH={"300px"}
            maxH={"300px"}
            overflowY="auto"
            sx={scrollBarStyle}
            fontWeight={400}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{t("description.darkHeader1")}</Th>
                  <Th textAlign="center">{t("description.darkHeader2")}</Th>
                  <Th textAlign="center">{t("description.darkHeader3")}</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={"14px"}>
                {data?.map((data, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{data?.keyword}</Td>
                      <Td textAlign={"center"}>
                        {new Date(data?.created_at).toLocaleDateString()}
                      </Td>
                      <Td textAlign={"center"}>{data?.result_count}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer maxH="300px" minH="300px">
            <Table>
              <Thead></Thead>
              <Tbody>
                <Tr>
                  <Td colSpan={4} rowSpan={2}>
                    <Text my={6} textAlign={"center"}>
                      {t("description.noDarkWeb")}
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  )
}

export default DarkWebData
