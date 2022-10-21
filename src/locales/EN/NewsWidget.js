import React from "react"
import { Button, Flex, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { Link as ReachLink } from "react-router-dom"

export const EnHeader = () => {
  const { t } = useTranslation()
  return (
    <Flex my={2} align={"center"} justify="space-between">
      <Text></Text>
      <ReachLink to="/dashboard/news">
        <Button
          h={"1.7rem"}
          w={"3.6rem"}
          mr={".5rem"}
          fontSize="14px"
          lineHeight="14px"
        >
          {t("description.viewAll")}
        </Button>
      </ReachLink>
    </Flex>
  )
}
