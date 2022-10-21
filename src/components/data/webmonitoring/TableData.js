import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react"
import React from "react"
import { scrollBarStyle } from "utils/helpers"
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons"
import { FaTimes } from "react-icons/fa"
import { useTranslation } from "react-i18next"

export const TableData = ({ children }) => {
  const { colorMode } = useColorMode()
  const { t } = useTranslation()

  return (
    <TableContainer
      h={"60vh"}
      fontWeight={400}
      overflowY="scroll"
      boxShadow="lg"
      borderRadius={"10px"}
      sx={scrollBarStyle}
      bg={
        colorMode === "light"
          ? "lightMode.dashBoardHeader"
          : "darkMode.wHeaderColor"
      }
    >
      <Table variant="simple" size={"lg"}>
        <Thead
          borderRadius="sm"
          zIndex={"5"}
          bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
          position={"sticky"}
          top={0}
        >
          <Tr>
            <Th textAlign="center">{t("description.domainName")}</Th>
            <Th textAlign="center">IP</Th>
            <Th textAlign="center">Second IP</Th>
            <Th textAlign="center">{t("description.webHeader3")}</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  )
}

export const TableDetails = props => {
  const { domainName, status, ip, ipSecond, initOnClick, secOnClick } = props

  return (
    <Tr>
      <Td
        textAlign="center"
        cursor="pointer"
        _hover={{ textDecoration: "underline", color: "blue" }}
        onClick={initOnClick}
      >
        {domainName}
      </Td>
      <Td textAlign="center">{ip}</Td>
      <Td textAlign="center">{ipSecond === null ? "-" : ipSecond}</Td>
      <Td pl={["4rem", "4rem", "4rem", "12rem"]}>
        {Number(status) >= 200 && Number(status) < 400 ? (
          <Flex gap={2} align={"center"}>
            <CheckIcon
              w="8"
              h="8"
              color={"white"}
              background="green"
              clipPath={"circle(50%)"}
              p={1}
            />
          </Flex>
        ) : (
          <Flex gap={2} align={"center"}>
            <FaTimes color="red" size={32} />
          </Flex>
        )}
      </Td>
      <Td>
        <DeleteIcon cursor={"pointer"} color="red" onClick={secOnClick} />
      </Td>
    </Tr>
  )
}

export default TableData
