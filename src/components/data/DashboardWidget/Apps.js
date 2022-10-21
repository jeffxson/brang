import React from "react"
import {
  Box,
  Text,
  useColorModeValue,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useGetAppData } from "services/query/appSearch"
import { scrollBarStyle, trimID } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { ArDashboardApps } from "locales/AR/Apps"
import { EnDashboardApps } from "locales/EN/Apps"

const Apps = () => {
  // queries the endpoint to get app search data
  const { data: appData } = useGetAppData()
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <>
      {toggle ? <ArDashboardApps /> : <EnDashboardApps />}

      <Box
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        height={"15.6rem"}
        mt={2}
        borderRadius="10px"
      >
        <TableContainer
          maxHeight="210px"
          overflowY="auto"
          sx={scrollBarStyle}
          fontWeight={400}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{t("description.appHeader1")}</Th>
                <Th>{t("description.appHeader2")}</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={"14px"}>
              {appData?.length > 0 ? (
                appData?.map((data, i) => (
                  <Tr key={i}>
                    <Td>{data?.app_name}</Td>
                    <Td cursor={"pointer"}>
                      <Link to={data?.site_link}>
                        {trimID(data?.site_link)}
                      </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4} rowSpan={2}>
                    <Text my={6} textAlign={"center"}>
                      {t("description.noApp")}
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default Apps
