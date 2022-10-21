import React from "react"
import { Td, Tr } from "@chakra-ui/react"
const BottomTable = ({ hash, count, searchType, site }) => {
  return (
    <Tr>
      <Td>{site}</Td>
      <Td textAlign="center">{hash}</Td>
      <Td textAlign="center">{count}</Td>
      <Td textAlign={"end"}>{searchType}</Td>
      <Td></Td>
      {/* <Td>
        <Button
          w="4rem"
          h="30px"
          fontSize="10px"
          colorScheme={"blue"}
          onClick={onClick}
        >
          {t("description.takeBtn")}
        </Button>
      </Td> */}
    </Tr>
  )
}

export default BottomTable
