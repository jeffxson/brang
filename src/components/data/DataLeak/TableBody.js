import React from "react"
import { Button, Td, Tr } from "@chakra-ui/react"
import { trim } from "utils/helpers"

export const InitTableBody = ({ data, leakedUrl, takedown }) => {
  return (
    <Tr cursor="pointer">
      <Td>{data}</Td>
      <Td>{leakedUrl}</Td>
      <Td>
        <Button variant={"blue"} onClick={takedown}>
          Take Down
        </Button>
      </Td>
    </Tr>
  )
}

export const SecTableBody = ({ count, hash, password }) => {
  return (
    <Tr cursor="pointer">
      <Td>{password}</Td>
      <Td>{hash}</Td>
      <Td>{count}</Td>{" "}
    </Tr>
  )
}

export const FinalTableBody = ({ query, takedown, searchType, site }) => {
  return (
    <Tr cursor="pointer">
      <Td>{query}</Td>
      <Td>{searchType}</Td>
      <Td>{trim(site)}</Td>
      <Td>
        <Button variant={"blue"} onClick={takedown}>
          Take Down
        </Button>
      </Td>
    </Tr>
  )
}
