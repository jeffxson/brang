import React, { useEffect, useState } from "react"
import { Box, Flex, Grid, Heading, Spinner, Text } from "@chakra-ui/react"
import GridLayout from "components/Common/GridLayout"
import {
  useGetAllUrl,
  useGetStats,
} from "services/query/featured"
import { useCheckScam } from "services/query/featured"
import useCustomToast from "utils/notifications"
import FormSearch from "./FormSearch"
import AllDomain from "./AllDomain"
import ContactInfo from "./ContactInfo"

const SecondLayer = () => {
  const [itemsPerPage] = useState(12)
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [currentItems, setCurrentItems] = useState(null)
  const [search, setSearch] = useState("")
  const { infoToast } = useCustomToast()

  const {
    data: searchData,
    mutate: scamMutate,
    isLoading: searchLoading,
  } = useCheckScam(search)

  const handleSearch = e => {
    e.preventDefault()
    if (!search.includes("http")) {
      infoToast("Please follow the Example Domain")
    } else {
      scamMutate(search)
    }
  }

  const { data: totalDomains } = useGetStats()
  const { data: allDomains, isLoading: isAllDomainLoading } = useGetAllUrl()

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(allDomains?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(allDomains?.length / itemsPerPage))
  }, [itemOffset, allDomains])

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % allDomains.length
    setItemOffset(newOffset)
  }

  return (
    <Grid
      w={"100%"}
      my={5}
      gap={5}
      templateColumns={[
        "repeat(1,1fr)",
        "repeat(2,1fr)",
        "repeat(3,1fr)",
        "repeat(3,1fr)",
      ]}
      marginBottom="20px"
    >
      <GridLayout title="Security" colSpan={[3, 3, 3, 2]}>
        <Flex
          flexDir={["column", "column", "row", "row"]}
          w={"full"}
          justifyContent="space-between"
        >
          <Box>
            <FormSearch
              onClick={() => setSearch("")}
              value={search}
              onSubmit={handleSearch}
              onChange={e => {
                setSearch(e.target.value)
              }}
            />
            <Text color={"gray.500"} fontSize={"12px"} mt={1}>
              e.g: https://example.com
            </Text>
            <Flex align="center" gap={3} mt={6}>
              <Heading fontSize="15px">Status: </Heading>
              {searchLoading && <Spinner />}
              <Box>
                {searchData?.isScam === true && (
                  <Heading fontSize="15px" color="red">
                    SCAM
                  </Heading>
                )}
                {searchData?.isScam === false && (
                  <Heading fontSize="15px" color="green">
                    NOT A SCAM
                  </Heading>
                )}
              </Box>
            </Flex>
          </Box>
          <Heading my={[2, 2, 0, 0]} fontSize="15px">
            {totalDomains?.links} Domains found
          </Heading>
        </Flex>
        <AllDomain
          isAllDomainLoading={isAllDomainLoading}
          allDomains={allDomains}
          currentItems={currentItems}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </GridLayout>
      <GridLayout title="Logo Detection" colSpan={[3, 3, 3, 1]}>
        <ContactInfo />
      </GridLayout>
    </Grid>
  )
}

export default SecondLayer
