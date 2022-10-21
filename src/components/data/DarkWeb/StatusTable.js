import React from "react"
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react"
import { darkWebHeaderSub } from "components/Common/constants"
import { scrollBarStyle } from "utils/helpers"

const StatusTable = ({ children }) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      bg={
        colorMode === "light"
          ? "lightMode.dashBoardHeader"
          : "darkMode.wHeaderColor"
      }
      borderRadius="10px"
      my={5}
      h="70vh"
      boxShadow="lg"
      overflowY="auto"
      sx={scrollBarStyle}
      w="full"
    >
      <TableContainer
        h={"70vh"}
        fontWeight={400}
        overflowY="scroll"
        borderRadius={"10px"}
        boxShadow="lg"
        sx={scrollBarStyle}
        bg={
          colorMode === "light"
            ? "lightMode.dashBoardHeader"
            : "darkMode.wHeaderColor"
        }
      >
        <Table variant="simple">
          <Thead
            borderRadius="sm"
            zIndex={"5"}
            bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
            position={"sticky"}
            top={0}
          >
            <Tr>
              {darkWebHeaderSub.map((el, i) => (
                <Th key={i}>{el}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody
            bg={colorMode === "light" ? "lightMode.white" : "darkMode.wBgColor"}
          >
            {children}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default StatusTable
