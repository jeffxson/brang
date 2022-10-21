import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import AuthHeader from "../Header/AuthHeader"
import NonAuthFooter from "../Footer"
import {
  Box,
  Flex,
  useColorModeValue,
  VStack,
  useColorMode,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import SideBar from "components/SideBarComponent/SideBar"
import { useTranslation } from "react-i18next"

const AuthLayout = props => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])
  const [hover, setHover] = useState(false)

  const { i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  const { colorMode } = useColorMode()

  return (
    <Box
      position="relative"
      padding={toggle ? "3rem 5rem 0 1.5rem" : "3rem 1.5rem 0 5rem"}
      backgroundColor={useColorModeValue("#FFFFFF", "#18191D")}
    >
      <Box
        minH="110vh"
        background={useColorModeValue("lightMode.white", "darkMode.black")}
      >
        <AuthHeader />
        {toggle ? (
          <Flex w="full" pt={15}>
            {hover ? (
              <Box
                w="full"
                px="30px"
                mr="150px"
                py="14px"
                background={
                  colorMode === "light" ? "lightMode.white" : "darkMode.black"
                }
              >
                {props.children}
              </Box>
            ) : (
              <Box w="full" px="30px" py="14px" background="transparent">
                {props.children}
              </Box>
            )}
            <VStack
              as={motion.div}
              borderRight="2px solid"
              borderColor={
                colorMode === "light"
                  ? "lightMode.gery3"
                  : "darkMode.wHeaderColor"
              }
              background={
                colorMode === "light"
                  ? "lightMode.white"
                  : "darkMode.wHeaderColor"
              }
              position={"fixed"}
              top={"60px"}
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              zIndex="10"
              right="0"
              h="100vh"
              py={3}
              w="fit-content"
              className="sidebar-right-icon"
              overflowY="auto"
              boxShadow={"md"}
            >
              <SideBar />
            </VStack>
          </Flex>
        ) : (
          <Flex w="full" pt={15}>
            <VStack
              as={motion.div}
              borderRight="2px solid"
              borderColor={
                colorMode === "light"
                  ? "lightMode.gery3"
                  : "darkMode.wHeaderColor"
              }
              background={
                colorMode === "light"
                  ? "lightMode.white"
                  : "darkMode.wHeaderColor"
              }
              position={"fixed"}
              top={"60px"}
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              zIndex="10"
              left="0"
              h="100vh"
              py={3}
              w="fit-content"
              className="sidebar-right-icon"
              overflowY="auto"
              boxShadow={"md"}
            >
              <SideBar />
            </VStack>
            {hover ? (
              <Box
                w="full"
                px="30px"
                ml="150px"
                py="14px"
                background={
                  colorMode === "light" ? "lightMode.white" : "darkMode.black"
                }
              >
                {props.children}
              </Box>
            ) : (
              <Box w="100%" px="0px" py="14px" background="transparent">
                {props.children}
              </Box>
            )}
          </Flex>
        )}
        <NonAuthFooter />
      </Box>
    </Box>
  )
}

export default withRouter(AuthLayout)
