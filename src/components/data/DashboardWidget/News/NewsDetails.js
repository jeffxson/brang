import React from "react"
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

const NewsDetails = ({ children }) => {
  const { t } = useTranslation()
  return (
    <Box
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
      borderRadius={"10px"}
    >
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th> {t("description.darkHeader1")}</Th>
              <Th> {t("description.link")}</Th>
              <Th> {t("description.malicious")}</Th>
              <Th> {t("description.darkHeader2")}</Th>
              {/* <Th></Th> */}
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default NewsDetails
