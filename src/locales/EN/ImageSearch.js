import {
  Box,
  Flex,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { useGetAllWebMonitoringData } from "services/query/webMonitoring"

export const EnImageDashboard = ({ mutate, isLoading }) => {
  const { t } = useTranslation()
  const { data: domainData } = useGetAllWebMonitoringData()
  const bg = useColorModeValue("lightMode.white", "darkMode.wBgColor")

  return (
    <Flex align="center" mt={3} mx={2} justifyContent="space-between">
      <Text></Text>
      <Flex>
        {isLoading && <Spinner mx={1} mt={2} size="md" />}
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
              <React.Fragment key={key}>
                <option>{data?.domain_name}</option>
              </React.Fragment>
            ))}
        </Select>
      </Flex>
    </Flex>
  )
}

export const EnImageHeader = props => {
  const { isLoading, mutate } = props
  const { t } = useTranslation()
  const { data: webData } = useGetAllWebMonitoringData()

  return (
    <>
      <Text fontWeight={600} px={3}>
        {t("description.imageSearch")}
      </Text>
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
    </>
  )
}
