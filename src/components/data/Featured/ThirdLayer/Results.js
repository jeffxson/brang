import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"

const Results = ({ data }) => {
  return (
    <Flex
      justifyContent="space-between"
      flexDir={["column", "column", "row", "row"]}
    >
      <Box lineHeight="1.5em">
        <Text>Country: {data?.country}</Text>
        <Text>Language: {data?.language}</Text>
        <Text>Link: {data?.link}</Text>
      </Box>
      <Box lineHeight="1.5em" w={["100%", "100%", "40%", "40%"]}>
        <Text>Rank: {data?.rank}</Text>
        <Text>Rate: {data?.rate}</Text>
        <Text>Status: {data?.status}</Text>
        <Text>Text: {data?.text}</Text>
        <Text>Title: {data?.title}</Text>
        <Text>Type: {data?.type}</Text>
      </Box>
    </Flex>
  )
}

export default Results
