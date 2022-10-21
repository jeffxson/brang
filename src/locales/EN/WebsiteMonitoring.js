import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Spinner, Text } from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { useGetAllWebMonitoringData } from "services/query/webMonitoring"

export const EnHeader = props => {
  const { t } = useTranslation()
  const { onClick } = props

  return (
    <>
      <Button onClick={onClick} variant="teal" borderRadius={"10px"} mt={2}>
        <AddIcon marginRight="15px" />
        {t("description.addDomain")}
      </Button>
      <Box></Box>
    </>
  )
}

export const EnLoader = () => {
  const { t } = useTranslation()
  const { isLoading: isWebMonitoringLoading, isFetching } =
    useGetAllWebMonitoringData()

  return (
    <>
      {(isWebMonitoringLoading || isFetching) && (
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="lightMode.blue"
          size="md"
        />
      )}
      <Text fontWeight={700}>{t("description.webMonitor")}</Text>
      <Box></Box>
    </>
  )
}
