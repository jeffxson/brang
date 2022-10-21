import React from "react"
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"

export const TableLayout = ({ initChildren, children }) => {
  return (
    <TableContainer
      h={"70vh"}
      boxShadow="lg"
      fontWeight={400}
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
      overflowY="auto"
      sx={scrollBarStyle}
    >
      <Table variant="simple">
        <Thead
          bgColor={useColorModeValue("gray.200", "gray.600")}
          position={"sticky"}
          zIndex="2"
          top={0}
        >
          <Tr>{initChildren}</Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  )
}

export const InitHeader = () => {
  return (
    <>
      <Th borderBottom="1px" borderColor="#737373">
        Leaked URL
      </Th>
      <Th borderBottom="1px" borderColor="#737373">
        {/* Credit Card No */}
      </Th>
      <Th borderBottom="1px" borderColor="#737373"></Th>
    </>
  )
}

export const SecHeader = () => {
  return (
    <>
      <Th borderBottom="1px" borderColor="#737373">
        Query
      </Th>
      <Th borderBottom="1px" borderColor="#737373">
        Search Type
      </Th>
      <Th borderBottom="1px" borderColor="#737373">
        Company Name
      </Th>
      <Th borderBottom="1px" borderColor="#737373">
        Actions
      </Th>
    </>
  )
}

export const FinalHeader = () => {
  return (
    <>
      <Th borderBottom="1px" borderColor="#737373">
        Password
      </Th>
      <Th borderBottom="1px" borderColor="#737373">
        Hash
      </Th>
      <Th borderBottom="1px" borderColor="#737373">
        Count
      </Th>
    </>
  )
}
