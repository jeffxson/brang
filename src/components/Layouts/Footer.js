import React from "react"
import { Flex, useColorModeValue } from "@chakra-ui/react"

const Footer = props => {
  return (
    <Flex
      as="footer"
      height={"30px"}
      position="fixed"
      backgroundColor={useColorModeValue("#FFFFFF", "#18191D")}
      bottom={0}
      justify="center"
      w="full"
      zIndex={"5"}
      {...props}
    >
      <Flex
        align="center"
        m={"auto"}
        fontSize={{ base: "12px", md: "14px" }}
        justify="center"
      >
        ©2022 Brand Protection Platform. All Rights Reserved.
      </Flex>
    </Flex>
  )
}

export default Footer
