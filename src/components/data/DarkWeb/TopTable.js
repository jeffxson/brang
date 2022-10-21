import React from "react"
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { formatTableDate, scrollBarStyle } from "utils/helpers"

const TopTable = ({ darkWebTable }) => {
  const { t } = useTranslation()

  return (
    <TableContainer
      fontWeight={400}
      overflowY="scroll"
      borderRadius={"10px"}
      boxShadow="lg"
      sx={scrollBarStyle}
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
    >
      <Table variant="simple" size={"lg"}>
        <Thead
          borderRadius="sm"
          zIndex={"1"}
          bgColor={useColorModeValue("gray.200", "gray.600")}
          position={"sticky"}
          top={0}
        >
          <Tr>
            <Th>{t("description.darkHeader1")}</Th>
            <Th>{t("description.id")}</Th>
            <Th>{t("description.darkHeader2")}</Th>
            <Th>{t("description.darkHeader3")}</Th>
            <Th>{t("description.darkHeader4")}</Th>
          </Tr>
        </Thead>
        <Tbody bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}>
          {darkWebTable?.length ? (
            darkWebTable?.map(darkWeb => (
              <Tr key={darkWeb.id}>
                <Td>{darkWeb.keyword}</Td>
                <Td textAlign={"center"}>{darkWeb.id}</Td>
                <Td textAlign={"center"}>
                  {formatTableDate(darkWeb.created_at)}
                </Td>
                <Td textAlign={"center"}>{darkWeb?.result_count}</Td>
                <Td textAlign={"center"}>{darkWeb?.status?.hash}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td>{darkWebTable?.keyword}</Td>
              <Td textAlign={"center"}>{darkWebTable?.id}</Td>
              <Td textAlign={"center"}>
                {formatTableDate(darkWebTable?.created_at)}
              </Td>
              <Td textAlign={"center"}>{darkWebTable?.result_count}</Td>
              <Td textAlign={"center"}>{darkWebTable?.status?.hash}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TopTable
