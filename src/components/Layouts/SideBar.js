import React from "react"
import { Link } from "react-router-dom"
import { Box, Flex, Icon, Text, useColorMode } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

export const SidebarIcon = ({ text1, text2, text3 }) => {
  const location = useLocation()
  const { colorMode } = useColorMode()
  const isLinkActive = path => location.pathname.startsWith("/" + path)

  return (
    <Box>
      <Box maxH="40px">
        {colorMode === "light" ? (
          <Link to={`/${text2}`}>
            <Flex
              boxShadow={isLinkActive(text2) && "lg"}
              h="40px"
              align="center"
              _hover={{ boxShadow: "lg" }}
              alignItems="center"
            >
              <Icon
                as={text1}
                color={"#336CFB"}
                p={2.5}
                pl={isLinkActive({ text2 }) ? 2 : 2}
                boxShadow={isLinkActive(text2) && "lg"}
                w="14"
                h="10"
                cursor={"pointer"}
              />
              <Text className="content">{text3}</Text>
            </Flex>
          </Link>
        ) : (
          <Link to={`/${text2}`}>
            <Flex
              boxShadow={isLinkActive(text2) && "0px 1px #000"}
              h="40px"
              align="center"
              _hover={{ boxShadow: "0px 1px #000" }}
              alignItems="center"
            >
              <Icon
                as={text1}
                color={"#f3f3f3"}
                p={2.5}
                pl={isLinkActive(text2) ? 2 : 2}
                w="14"
                h="10"
                cursor={"pointer"}
                boxShadow={isLinkActive(text2) && "0px 1px #000"}
              />
              <Text className="content">{text3}</Text>
            </Flex>
          </Link>
        )}
      </Box>
    </Box>
  )
}
