import {
  Box,
  Flex,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import React, { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { useGetAllWebMonitoringData } from "services/query/webMonitoring"

export const ArImageDashboard = ({ mutate, isLoading }) => {
  const { t } = useTranslation()
  const { data: domainData } = useGetAllWebMonitoringData()
  const bg = useColorModeValue("lightMode.white", "darkMode.wBgColor")

  return (
    <Flex align="center" mt={3} mx={2} justifyContent="space-between">
      <Flex>
        <Select
          disabled={isLoading}
          fontSize="13px"
          bg={bg}
          onChange={e => {
            if (!e.target.value) return
            mutate(e.target.value)
          }}
          placeholder={t("description.selectDomain")}
        >
          {domainData &&
            domainData?.map((data, key) => (
              <Fragment key={key}>
                <option>{data?.domain_name}</option>
              </Fragment>
            ))}
        </Select>
        {isLoading && <Spinner mx={1} mt={2} size="md" />}
      </Flex>
      <Text></Text>
    </Flex>
  )
}

export const ArImageHeader = ({ mutate, isLoading }) => {
  const { t } = useTranslation()
  const { data: webData } = useGetAllWebMonitoringData()

  return (
    <>
      <Box>
        <Select
          disabled={isLoading}
          onChange={e => {
            if (!e.target.value) return
            mutate(e.target.value)
          }}
          placeholder={t("description.selectDomain")}
        >
          {webData &&
            webData?.map((data, key) => (
              <React.Fragment key={key}>
                <option>{data?.domain_name}</option>
              </React.Fragment>
            ))}
        </Select>
      </Box>
      <Text fontWeight={600} px={3}>
        {t("description.imageSearch")}
      </Text>
    </>
  )
}
