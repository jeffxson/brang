import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react"
import TableLoader from "components/Common/TableLoader"
import { FaTimes } from "react-icons/fa"
import { useMonitorDomain } from "services/query/featured"
import GridLayout from "components/Common/GridLayout"
import { SearchIcon } from "@chakra-ui/icons"
import Pagination from "components/Common/Pagination"
import { newSearchSocialMedia } from "services/query/socialMedia"

const Firstlayer = () => {
  const [domain, setDomain] = useState("")
  const { data, mutate: monitorMutate, isLoading } = useMonitorDomain(domain)
  const {
    mutate,
    isLoading: isPostLoading,
    data: searchList,
  } = newSearchSocialMedia()
  const [searchInfo, setSearchInfo] = useState()
  const [currentItems, setCurrentItems] = useState(null)
  const [currentItems2, setCurrentItems2] = useState(null)
  const [itemsPerPage] = useState(5)
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset2, setItemOffset2] = useState(0)
  const [pageCount2, setPageCount2] = useState(0)

  const handleSocialSearch = e => {
    e.preventDefault()
    mutate({
      query: searchInfo,
    })
  }
  const handleSearch = e => {
    e.preventDefault()
    monitorMutate(domain)
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    const endOffset2 = itemOffset2 + itemsPerPage

    setCurrentItems(
      searchList && searchList[0]?.emails.slice(itemOffset, endOffset)
    )
    setCurrentItems2(
      searchList && searchList[0]?.phone_numbers.slice(itemOffset2, endOffset2)
    )
    setPageCount(
      searchList && Math.ceil(searchList[0]?.emails.length / itemsPerPage)
    )
    setPageCount2(
      searchList &&
        Math.ceil(searchList[0]?.phone_numbers.length / itemsPerPage)
    )
  }, [itemOffset, searchList])

  const handlePageClick = event => {
    const newOffset =
      (event.selected * itemsPerPage) % searchList[0]?.emails.length

    setItemOffset(newOffset)
  }
  const handlePageClick2 = event => {
    const newOffset2 =
      (event.selected * itemsPerPage) % searchList[0]?.phone_numbers.length

    setItemOffset2(newOffset2)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentItems, setCurrentItems2])

  console.log(currentItems2)

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
      <GridLayout title="Contact Information" colSpan={[3, 3, 3, 2]}>
        <form onSubmit={handleSocialSearch}>
          <InputGroup w="30%" borderRadius="10px">
            <Input
              boxShadow="0px 2px 6px 0px #000"
              onChange={e => setSearchInfo(e.target.value)}
            />
            <InputRightElement cursor={"pointer"}>
              <Button
                isLoading={isPostLoading}
                type="submit"
                colorScheme="teal"
                variant="solid"
              >
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>{" "}
        </form>
        <Text color={"gray.500"} fontSize={"12px"} mt={1}>
          e.g: https://example.com
        </Text>
        <Box>
          <Flex my={5} justifyContent="space-between">
            <Box>
              <Heading fontSize="15px">Email found</Heading>
              {isPostLoading ? (
                <Stack width="230px" mt="30px">
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                </Stack>
              ) : (
                searchList &&
                currentItems?.map(items => (
                  <Text key={items?.value}> {items?.value}</Text>
                ))
              )}
            </Box>
            <Box>
              <Heading fontSize="15px">Phone numbers found</Heading>
              {isPostLoading ? (
                <Stack width="230px" mt="30px">
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                </Stack>
              ) : (
                searchList &&
                currentItems2?.map(items => (
                  <Text key={items?.value}> {items?.value}</Text>
                ))
              )}
            </Box>
          </Flex>
        </Box>
        <Flex justifyContent="space-between">
          <Pagination
            pageCount={isNaN(pageCount) ? 0 : pageCount}
            handlePageClick={handlePageClick}
          />
          <Pagination
            pageCount={isNaN(pageCount2) ? 0 : pageCount2}
            handlePageClick={handlePageClick2}
          />
        </Flex>
        <Text>facebook: {searchList && searchList[0]?.facebook}</Text>
        <Text>instagam: {searchList && searchList[0]?.instagram}</Text>
        <Text>twitter: {searchList && searchList[0]?.twitter} </Text>
        <Text>linkedIn: {searchList && searchList[0]?.linkedin} </Text>
        <Text>github: {searchList && searchList[0]?.github} </Text>
        <Text>youtube: {searchList && searchList[0]?.youtube} </Text>
        <Text>pinterest: {searchList && searchList[0]?.pinterest} </Text>
      </GridLayout>
      <GridLayout colSpan={[3, 3, 3, 1]} title="Phishing Detection">
        <form onSubmit={handleSearch}>
          <InputGroup mb={5} w="100%" borderRadius="10px">
            <InputLeftElement>
              {domain && (
                <FaTimes
                  onClick={() => setDomain("")}
                  cursor={"pointer"}
                  opacity={0.8}
                />
              )}
            </InputLeftElement>
            <Input
              value={domain}
              onChange={e => setDomain(e.target.value)}
              boxShadow="0px 1px 3px 0px #000"
            />
            <InputRightElement cursor={"pointer"}>
              <Button type="submit" colorScheme="teal" variant="solid">
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
        {isLoading ? (
          <TableLoader />
        ) : (
          data && (
            <Box>
              <Heading fontSize="15px">keyword: {data?.keyword}</Heading>
              {data?.domain > 0 ? (
                data?.domains?.map((dat, i) => <Text key={i}>{dat}</Text>)
              ) : (
                <Heading fontSize="15px">No domains found</Heading>
              )}
            </Box>
          )
        )}
      </GridLayout>
    </Grid>
  )
}

export default Firstlayer
