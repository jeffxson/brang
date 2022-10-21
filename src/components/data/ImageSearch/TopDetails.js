import React from "react"
import { Image, Td } from "@chakra-ui/react"

const TopDetails = ({ originalImg, domainName }) => {
  return (
    <>
      <Td>
        <Image src={originalImg} h="50px" />
      </Td>
      <Td px={[100, 100, 150, 300]}>{domainName}</Td>
    </>
  )
}

export default TopDetails
