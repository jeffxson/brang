import React, { useState } from "react"
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Text,
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { useGetBbot } from "services/query/pulseData"
import { scrollBarStyle, types } from "utils/helpers"
import AccLayout from "./Layout/AccLayout"
import PageSize from "components/data/TwistedDns/PageSize"

const Bbot = () => {
  const history = useHistory()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [type, setType] = useState("")

  // queries the endpoint to get bbot data
  const { data: bbot, isLoading } = useGetBbot(
    history?.location?.data?.domain_name,
    type,
    pageSize,
    page + 1
  )

  // gets page size
  const pageCount = Math.ceil(bbot?.count / pageSize)

  // clicks into the next page
  const handlePageClick = ({ selected }) => {
    setPage(selected)
  }

  return (
    <AccLayout title="Bbot Report" loading={isLoading}>
      <Select
        onChange={e => {
          setType(e.target.value)
          setPage(0)
          setPageSize(10)
        }}
        w="25%"
        float="right"
        placeholder="Type"
      >
        {types?.map((data, i) => (
          <option value={data?.value} key={i}>
            {data?.name}
          </option>
        ))}
      </Select>
      {bbot?.results?.length > 0 ? (
        <>
          <TableContainer
            boxShadow="lg"
            h="40vh"
            overflowY="auto"
            sx={scrollBarStyle}
            my={20}
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>Data</Th>
                  <Th>Monitored Site</Th>
                  <Th>Tags</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bbot?.results?.map((el, i) => (
                  <Tr key={i}>
                    <Td>{el?.data}</Td>
                    <Td>{el?.monitoring_site}</Td>
                    <Td>{el?.tags?.map(dat => dat)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Text fontWeight="bold" my={10}>
          No Bbot report found
        </Text>
      )}
      <PageSize
        handlePageClick={handlePageClick}
        onChange={e => setPageSize(e.target.value)}
        pageCount={isNaN(pageCount) ? 0 : pageCount}
      />
    </AccLayout>
  )
}

export default Bbot
