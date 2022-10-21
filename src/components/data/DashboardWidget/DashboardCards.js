import React, { useEffect } from "react"
import { Box, Flex, Skeleton, Text, useColorModeValue } from "@chakra-ui/react"
import { colorComboArray } from "utils/helpers"
import { useGetDashboardStats } from "services/query/dashboard"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Card = ({ text1, value, whiteBg, darkBg, text, ...rest }) => {
  const { isLoading } = useGetDashboardStats()

  return (
    <Skeleton isLoaded={!isLoading}>
      <Link to={`${text1}`}>
        <Box
          cursor="pointer"
          {...rest}
          boxShadow={useColorModeValue(
            "0 5px 20px rgba(0, 0, 0, 0.15)",
            "0 5px 20px rgba(255, 255, 255, 0.05)"
          )}
          backgroundColor={useColorModeValue(whiteBg, darkBg)}
          padding="1.5rem 8px"
          borderRadius="4px"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text fontWeight="bold" fontSize="4xl">
              {value}
            </Text>
            <Text fontSize="14px" textTransform="capitalize">
              {text}
            </Text>
          </Flex>
        </Box>
      </Link>
    </Skeleton>
  )
}

const DashboardCards = ({ dataLeak, dataDarkWeb, webData }) => {
  // refetches the dashboard data
  const { data, refetch: refetchStat } = useGetDashboardStats()
  const { t } = useTranslation()

  useEffect(() => {
    refetchStat()
  }, [])

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat( auto-fill, minmax(180px, 1fr) )"
      marginBottom="1.75rem"
      gap="1.75rem"
    >
      <Card
        text1="raised-incidents"
        value={data?.number_of_take_downs_progress || 0}
        text={t("description.card1")}
        whiteBg={colorComboArray[0].whiteBg}
        darkBg={colorComboArray[0].darkBg}
      />
      <Card
        text1="raised-incidents"
        value={data?.number_of_take_downs_completed || 0}
        text={t("description.card2")}
        whiteBg={colorComboArray[1].whiteBg}
        darkBg={colorComboArray[1].darkBg}
      />
      <Card
        text1="website-monitoring"
        value={webData?.website_monitoring_data?.length || 0}
        text={t("description.card3")}
        whiteBg={colorComboArray[2].whiteBg}
        darkBg={colorComboArray[2].darkBg}
      />
      <Card
        text1="app-search"
        value={data?.number_of_company_app || 0}
        text={t("description.card4")}
        whiteBg={colorComboArray[3].whiteBg}
        darkBg={colorComboArray[3].darkBg}
      />
      <Card
        text1="data-leak"
        value={dataLeak?.length || 0}
        text={t("description.card5")}
        whiteBg={colorComboArray[4].whiteBg}
        darkBg={colorComboArray[4].darkBg}
      />
      <Card
        text1="dark-web-search"
        value={dataDarkWeb?.length || 0}
        text={t("description.card6")}
        whiteBg={colorComboArray[1].whiteBg}
        darkBg={colorComboArray[1].darkBg}
      />
    </Box>
  )
}

export default DashboardCards
