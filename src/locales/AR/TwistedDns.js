import { Button, Text } from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const ArTwistedDashboard = () => {
  const { t } = useTranslation()

  return (
    <>
      <Link to="/twisted-dns">
        <Button
          h={"1.7rem"}
          w={"3.6rem"}
          m={"0.5rem"}
          fontSize="14px"
          lineHeight="14px"
        >
          {t("description.viewAll")}
        </Button>
      </Link>
      <Text></Text>
    </>
  )
}
