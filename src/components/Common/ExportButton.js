import React from "react"
import { Text, Button, useColorModeValue, Flex } from "@chakra-ui/react"
import { ExportIcon } from "utils/createIcon"
import { useTranslation } from "react-i18next"

export const ExportButton = ({ text1, text2 }) => {
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  const textColor = useColorModeValue(
    "lightMode.pageTitle",
    "lightMode.dashBoardHeader"
  )

  return (
    <Flex
      align={"flex-start"}
      flexDir={["column", "column", "row", "row"]}
      justify="space-between"
      my="4"
    >
      {toggle ? (
        <>
          <Button
            w="130px"
            h="5.3vh"
            px={5}
            onClick={text2}
            py={5}
            fontSize="1.1rem"
            fontWeight={600}
            leftIcon={<ExportIcon w="14" h="14" mt={5} />}
            borderRadius="10px"
            bg="#169aaf"
            variant="teal"
            color="#ffffff"
          >
            {t("description.export")}
          </Button>
          <Text fontWeight={700} fontSize="3xl" color={textColor}>
            {text1}
          </Text>
        </>
      ) : (
        <>
          <Text fontWeight={700} fontSize="3xl" color={textColor}>
            {text1}
          </Text>
          <Button
            w="130px"
            h="5.3vh"
            px={5}
            onClick={text2}
            py={5}
            fontSize="1.1rem"
            fontWeight={600}
            leftIcon={<ExportIcon w="14" h="14" mt={5} />}
            borderRadius="10px"
            bg="#169aaf"
            variant="teal"
            color="#ffffff"
          >
            {t("description.export")}
          </Button>
        </>
      )}
    </Flex>
  )
}
