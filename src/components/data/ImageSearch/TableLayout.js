import React from "react"
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import TableLoader from "components/Common/TableLoader"
import { useTranslation } from "react-i18next"
import { scrollBarStyle } from "utils/helpers"

const TableLayout = ({ isLoading, data, children }) => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()

  return (
    <TableContainer
      overflowX="auto"
      sx={scrollBarStyle}
      boxShadow="lg"
      borderRadius="20px"
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
      width="100%"
      fontWeight={400}
      height="70vh"
      overflowY="scroll"
    >
      {isLoading && <TableLoader />}
      {data && (
        <Table variant="simple" size="sm">
          <Thead
            position="sticky"
            top="0"
            bgColor={colorMode === "light" ? "#f3f3f3" : "gray.700"}
          >
            <Tr>
              <Th fontSize="10px">{t("description.image")}</Th>
              <Th textAlign="center" fontSize="10px">
                {t("description.domainName")}
              </Th>
              <Th textAlign="center">{t("description.similarWebsite")}</Th>
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      )}
    </TableContainer>
  )
}

export default TableLayout
