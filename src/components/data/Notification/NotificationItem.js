import React from "react"
import { Text, Flex, Box, useColorMode } from "@chakra-ui/react"
import { TakeDownsDarkIcon, TakeDownWhiteIcon } from "utils/createIcon"

const NotificationItem = ({ notifyData }) => {
  const { colorMode } = useColorMode()

  return (
    <Flex alignItems="center">
      {colorMode === "light" ? (
        <TakeDownsDarkIcon
          w={14}
          h={14}
          background={
            colorMode === "light" ? "lightMode.white" : "darkMode.wBgColor"
          }
        />
      ) : (
        <TakeDownWhiteIcon w={14} h={14} />
      )}
      <Box>
        <Text fontSize="xs">{notifyData.verb}</Text>
        <Text fontSize="xs">
          {new Date(notifyData.timestamp).toDateString()}
        </Text>
      </Box>
    </Flex>
  )
}

export default NotificationItem
