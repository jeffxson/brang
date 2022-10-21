import React from "react"
import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import TableLoader from "components/Common/TableLoader"
import { useTranslation } from "react-i18next"
import { scrollBarStyle } from "utils/helpers"

const TableLayout = props => {
  const { children, secChildren, isLoading } = props
  const { colorMode } = useColorMode()
  const { t } = useTranslation()

  return (
    <Box
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
      borderRadius={"10px"}
      boxShadow="md"
      my={10}
      h={"sm"}
    >
      <Flex align={"center"} justify="space-between" h="10" px={3}>
        <Text fontWeight={700}>{t("description.widget5")}</Text>
      </Flex>
      <Box
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius={"10px"}
      >
        <TableContainer
          h={"50vh"}
          boxShadow="lg"
          fontWeight={400}
          sx={scrollBarStyle}
          overflowY="scroll"
          bg={useColorModeValue(
            "lightMode.dashBoardHeader",
            "darkMode.wHeaderColor"
          )}
        >
          {isLoading ? (
            <TableLoader />
          ) : (
            <Table variant="simple" size={"md"}>
              <Thead
                zIndex={"2"}
                bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                position={"sticky"}
                top={0}
              >
                <Tr>
                  <Th textAlign="center">{t("description.dnsHeader1")}</Th>
                  <Th textAlign="center">{t("description.dnsHeader2")}</Th>
                  <Th textAlign="center">Fuzzer</Th>
                  <Th textAlign="center">{t("description.malicious")}</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>{children}</Tbody>
            </Table>
          )}
        </TableContainer>
        {secChildren}
      </Box>
    </Box>
  )
}

export default TableLayout

export const TableDetails = props => {
  const { t } = useTranslation()
  const { rowClicked, fuzzer, twistedDns, takedown, malicious, corporateDns } =
    props
  return (
    <Tr>
      <Td textAlign="center">{twistedDns}</Td>
      <Td
        textAlign="center"
        cursor="pointer"
        _hover={{ textDecoration: "underline", color: "blue" }}
        onClick={rowClicked}
      >
        {corporateDns}
      </Td>
      <Td textAlign="center">{fuzzer}</Td>
      <Td textAlign="center">{malicious ? "true" : "false"}</Td>
      <Td textAlign="center">
        <Button size="sm" colorScheme="blue" onClick={takedown}>
          {t("description.takeBtn")}
        </Button>
      </Td>
    </Tr>
  )
}
