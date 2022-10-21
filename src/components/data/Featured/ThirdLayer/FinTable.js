import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React from "react"
import { scrollBarStyle } from "utils/helpers"

const FinTable = ({ data }) => {
  return (
    <TableContainer
      sx={scrollBarStyle}
      overflowY="scroll"
      overflowX="scroll"
      borderRadius="10px"
      boxShadow="0px 1px 3px 0px #000"
      h="30vh"
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Content</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.metadata?.map((dat, i) => (
            <Tr key={i}>
              <Td>{dat?.name}</Td>
              <Td>{dat?.content}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default FinTable
