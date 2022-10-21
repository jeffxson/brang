import { Button, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const EnDashboardApps = () => {
  const { t } = useTranslation()

  return (
    <Flex align="center" mt={2} mx={2} justifyContent="space-between">
      <Text></Text>
      <Link to="/app-search">
        <Button
          h={"1.7rem"}
          w={"3.6rem"}
          ml={"0.5rem"}
          fontSize="14px"
          lineHeight="14px"
        >
          {t("description.viewAll")}
        </Button>
      </Link>
    </Flex>
  )
}
