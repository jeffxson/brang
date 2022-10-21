import React from "react"
import {
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { EnTableHeader } from "locales/EN/Youtube"
import TableLoader from "components/Common/TableLoader"
import { scrollBarStyle } from "utils/helpers"
import { ArTableHeader } from "locales/AR/Youtube"

export const TableLayout = props => {
  const { children, isLoading, data, toggle } = props
  const { colorMode } = useColorMode()

  return (
    <TableContainer
      borderRadius="20px"
      overflowX={"auto"}
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
      width="100%"
      height="70vh"
      boxShadow="lg"
      sx={scrollBarStyle}
      overflowY="scroll"
    >
      {isLoading && <TableLoader />}
      {data && (
        <Table size="sm" variant="simple">
          <Thead
            position={"sticky"}
            zIndex="2"
            top="0"
            bgColor={colorMode === "light" ? "#f3f3f3" : "gray.700"}
          >
            <Tr>{toggle ? <ArTableHeader /> : <EnTableHeader />}</Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      )}
    </TableContainer>
  )
}

export default TableLayout
