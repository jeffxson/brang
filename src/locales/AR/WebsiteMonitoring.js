import React from "react"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Spinner, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useGetAllWebMonitoringData } from "services/query/webMonitoring"

export const ArHeader = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <>
      <Box></Box>
      <Button onClick={onClick} variant="teal" borderRadius={"10px"} mt={2}>
        <AddIcon marginRight="15px" />
        {t("description.addDomain")}
      </Button>
    </>
  )
}

export const ArLoader = () => {
  const { t } = useTranslation()
  const { isLoading: isWebMonitoringLoading, isFetching } =
    useGetAllWebMonitoringData()

  return (
    <>
      <Box></Box>
      <Text fontWeight={700}>{t("description.webMonitor")}</Text>
      {(isWebMonitoringLoading || isFetching) && (
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="lightMode.blue"
          size="md"
        />
      )}
    </>
  )
}
