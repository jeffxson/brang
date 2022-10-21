import React from "react"
import { Box, Skeleton, useColorModeValue, Flex, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export const DashboardSkeletons = ({ initTitle, secTitle, text2, text4 }) => {
  const { i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  const bg = useColorModeValue(
    "lightMode.dashBoardHeader",
    "darkMode.wHeaderColor"
  )

  return (
    <Box width="100%">
      <Flex width="100%" gap="3rem" margin="2rem 0" className="no-flex">
        <Box
          bg={useColorModeValue(
            "lightMode.dashBoardHeader",
            "darkMode.wHeaderColor"
          )}
          flex="1"
          borderRadius="10px"
          boxShadow="md"
          width="100%"
        >
          <Box marginBottom="25px" overflow="hidden">
            {toggle ? (
              <Text float="right" fontWeight={500} pt={3} px={3}>
                {initTitle}
              </Text>
            ) : (
              <Text fontWeight={500} px={3} mb={-8}>
                {initTitle}
              </Text>
            )}
            <Skeleton isLoaded="true" borderRadius="10px">
              {text2}
            </Skeleton>
          </Box>
        </Box>
        <Box bg={bg} flex="1" borderRadius="10px" boxShadow="md" width="100%">
          <Box marginBottom="25px" overflow="hidden">
            {toggle ? (
              <Text float="right" fontWeight={500} pt={3} px={3}>
                {secTitle}
              </Text>
            ) : (
              <Text fontWeight={500} px={3} mb={-8}>
                {secTitle}
              </Text>
            )}
            <Skeleton isLoaded={true} borderRadius="10px">
              {text4}
            </Skeleton>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export const ImageSkeleton = ({ title, text }) => {
  const { i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box width="100%">
      <Flex width="100%" gap="3rem" margin="2rem 0" className="no-flex">
        <Box
          bg={useColorModeValue(
            "lightMode.dashBoardHeader",
            "darkMode.wHeaderColor"
          )}
          flex="1"
          borderRadius="10px"
          boxShadow="md"
          width="100%"
        >
          <Box marginBottom="25px" overflow="hidden">
            {toggle ? (
              <Text float="right" fontWeight={500} pt={3} px={3}>
                {title}
              </Text>
            ) : (
              <Text fontWeight={500} px={3} mb={-8}>
                {title}
              </Text>
            )}
            <Skeleton isLoaded="true" borderRadius="10px">
              {text}
            </Skeleton>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
