import {
  Box,
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import TableLoader from "components/Common/TableLoader"
import React from "react"
import { useTranslation } from "react-i18next"

export const Card = props => {
  const { title, initData, secData, isChecked } = props

  return (
    <Tr>
      <Td>
        <Flex gap="2rem" alignItems="center" w="40%">
          <Checkbox colorScheme={"whatsapp"} isChecked={isChecked} />
          <Text textAlign="start">{title}</Text>
        </Flex>
      </Td>
      <Td>{initData}</Td>
      <Td textAlign="end">{secData}</Td>
    </Tr>
  )
}

const BottomCard = ({ data, isLoading }) => {
  const { t } = useTranslation()

  return (
    <Box
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
      borderRadius="30px"
      mb="40px"
      boxShadow="lg"
    >
      {isLoading && <TableLoader />}
      {data && (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>{t("description.services")}</Th>
                <Th>{t("description.leakHeader2")}</Th>
                <Th textAlign="end">{t("description.timeTaken")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Card
                title="Celery Health Check"
                isChecked={data?.CeleryHealthCheckCelery?.status === "working"}
                initData={data?.CeleryHealthCheckCelery?.status}
                secData={data?.CeleryHealthCheckCelery?.response_time}
              />
              <Card
                title="Celery Ping Health Check"
                isChecked={data?.CeleryPingHealthCheck?.status === "working"}
                initData={data?.CeleryPingHealthCheck?.status}
                secData={data?.CeleryPingHealthCheck?.response_time}
              />
              <Card
                title="Database Backend"
                initData={data?.DatabaseBackend?.status}
                isChecked={data?.DatabaseBackend?.status === "working"}
                secData={data?.DatabaseBackend?.response_time}
              />
              <Card
                title="Default File Storage Health Check"
                initData={data?.DefaultFileStorageHealthCheck?.status}
                isChecked={
                  data?.DefaultFileStorageHealthCheck?.status === "working"
                }
                secData={data?.DefaultFileStorageHealthCheck?.response_time}
              />
              <Card
                title="Disk Usage"
                initData={data?.DiskUsage?.status}
                isChecked={data?.DiskUsage?.status === "working"}
                secData={data?.DiskUsage?.response_time}
              />
              <Card
                title="Memory Usage"
                initData={data?.MemoryUsage?.status}
                isChecked={data?.MemoryUsage?.status === "working"}
                secData={data?.MemoryUsage?.response_time}
              />
              <Card
                title="Migrations Health Check"
                initData={data?.MigrationsHealthCheck?.status}
                isChecked={data?.MigrationsHealthCheck?.status === "working"}
                secData={data?.MigrationsHealthCheck?.response_time}
              />
              <Card
                title="Redis Health Check"
                initData={data?.RedisHealthCheck?.status}
                isChecked={data?.RedisHealthCheck?.status === "working"}
                secData={data?.RedisHealthCheck?.response_time}
              />
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default BottomCard
