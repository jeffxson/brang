import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React from "react"

const NoData = () => {
  return (
    <TableContainer maxH="300px" minH="300px">
      <Table>
        <Thead></Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4} rowSpan={2}>
              <Text my={6} textAlign={"center"}>
                No Website is currently being monitored
              </Text>
              <Text my={6} textAlign={"center"}>
                Add a Domain
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default NoData
