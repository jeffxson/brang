import React from "react"
import { Flex, Image, Text } from "@chakra-ui/react"
import Logo from "assets/images/favicon.ico"

const NonAuthHeader = props => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={6}
      bg="lightMode.headerBgColor"
      height={"60px"}
      {...props}
    >
      <Flex w="full" align="center" justify="space-between">
        <Text fontWeight={"900"} size="2xl" color={"black"}>
          <Image h={"2.5rem"} src={Logo} />
        </Text>
      </Flex>
    </Flex>
  )
}

export default NonAuthHeader
