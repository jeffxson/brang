import React from "react"
import { Box, Flex, Grid, Heading, Spinner, Text } from "@chakra-ui/react"
import Pagination from "components/Common/Pagination"
import { scrollBarStyle } from "utils/helpers"

const AllDomain = ({
  isAllDomainLoading,
  allDomains,
  currentItems,
  pageCount,
  handlePageClick,
}) => {
  return (
    <Box>
      <Flex justifyContent="space-around">
        <Heading mb={4} fontSize="1.2em">
          Domains found
        </Heading>
      </Flex>
      <Flex px={10}>
        <Grid
          colSpan={[3, 3, 3, 2]}
          templateColumns="repeat(3, 1fr)"
          flex="1"
          mx={"auto"}
          h="30vh"
          mb={5}
          overflowX="scroll"
          sx={scrollBarStyle}
          borderRadius="10px"
          boxShadow="0px 1px 3px 0px #000"
          overflowY={"auto"}
        >
          {isAllDomainLoading && <Spinner />}
          {allDomains &&
            currentItems?.map((domain, i) => (
              <Text mx={"auto"} marginY={1} key={i} gap={2}>
                {domain}
              </Text>
            ))}
        </Grid>
      </Flex>
      <Flex justifyContent="flex-end">
        <Pagination
          pageCount={isNaN(pageCount) ? 0 : pageCount}
          handlePageClick={handlePageClick}
        />
      </Flex>
    </Box>
  )
}

export default AllDomain
