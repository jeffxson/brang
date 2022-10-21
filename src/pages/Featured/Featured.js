import React from "react"
import { Box, Heading } from "@chakra-ui/react"
import Firstlayer from "components/data/Featured/FirstLayer/Firstlayer"
import SecondLayer from "components/data/Featured/SecondLayer/SecondLayer"
import ThirdLayer from "components/data/Featured/ThirdLayer/ThirdLayer"

const Featured = () => {
  return (
    <Box>
      <Heading fontSize="3xl">Featured Section</Heading>
      <Firstlayer />
      <SecondLayer />
      <ThirdLayer />
    </Box>
  )
}

export default Featured
