import React from "react"
import { Text, Input, Flex } from "@chakra-ui/react"
export const UserInfo = ({ text1, text2 }) => {
  return (
    <Flex
      my={25}
      gap={{ base: "10px", md: "50px" }}
      fontSize={{ base: "14px", md: "16px" }}
      alignItems="flex-end"
      marginBottom="15px"
    >
      <Text minWidth="100px">{text1}:</Text>
      <Text>{text2}</Text>
    </Flex>
  )
}

export const EditInfo = ({ text1, text2, text3 }) => {
  return (
    <Flex
      gap={{ base: "10px", md: "50px" }}
      alignItems="flex-end"
      fontSize={{ base: "14px", md: "16px" }}
      marginBottom="15px"
    >
      <Text minWidth="100px">{text1}:</Text>
      <Input
        value={text2}
        onChange={e => text3(e.target.value)}
        placeholder={text1}
        borderTop="none"
        maxWidth="280px"
        w="100%"
        borderLeft="none"
        borderRight="none"
        borderRadius="0"
        outline="none"
        _focus={{
          boxShadow: "none",
        }}
      />
    </Flex>
  )
}
