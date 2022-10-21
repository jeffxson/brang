import React from "react"
import { Box, Flex, Select, Text } from "@chakra-ui/react"
import Pagination from "components/Common/Pagination"

const PageSize = props => {
  const { onChange, handlePageClick, pageCount } = props
  return (
    <Flex
      align={"center"}
      gap={6}
      my={5}
      justify="flex-end"
      marginBottom="3rem"
    >
      <Box
        d="flex"
        alignItems="center"
        justifyContent={"flex-end"}
        gap={2}
        mx={5}
        my={2}
        w="15%"
      >
        <Text as="span" w="100%">
          Page Size
        </Text>
        <Select onChange={onChange}>
          {[10, 20, 50, 100].map(el => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </Select>
      </Box>
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </Flex>
  )
}

export default PageSize
