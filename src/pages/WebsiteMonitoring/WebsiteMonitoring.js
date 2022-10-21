import { Flex, Box, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import {
  useGetAllWebMonitoringData,
  usedeleteWebsite,
} from "services/query/webMonitoring"
import { useQueryClient } from "react-query"
import { GET_WEBSITE_DATA } from "utils/queryKey"
import useBPFetcher from "utils/fetcher"
import { useDispatch } from "react-redux"
import { getWebsiteMonitoringPdf } from "redux/actions/pdfActions"
import useCustomToast from "utils/notifications"
import { ExportButton } from "components/Common/ExportButton"
import WebsiteMonitoringModalDetails from "components/Modal/ModalDetails/WebsiteMonitoringModalDetails"
import { useTranslation } from "react-i18next"
import { useGetWebmonitoringDashboard } from "services/query/dashboard"
import { ArHeader, ArLoader } from "locales/AR/WebsiteMonitoring"
import { EnHeader, EnLoader } from "locales/EN/WebsiteMonitoring"
import TableData, {
  TableDetails,
} from "components/data/webmonitoring/TableData"
import NoData from "components/data/webmonitoring/NoData"

const WebsiteMonitoring = () => {
  const queryClient = useQueryClient()

  const { successToast } = useCustomToast()
  const history = useHistory()

  // queries the endpoint to get web monitoring data
  const { data: webMonitoring, refetch: refetchWebData } =
    useGetAllWebMonitoringData()

  // queries the endpoint to refetch website data
  const { refetch } = useGetWebmonitoringDashboard()

  const { isOpen, onOpen, onClose } = useDisclosure()

  // drills into an inner page
  const handleRowClicked = row => {
    history.push({
      pathname: "/website-monitoring-inside",
      data: row,
    })
  }

  // queries the endpoint to delete the website
  const { mutate: mutateDeleteWebsite } = usedeleteWebsite({
    onSuccess: () => {
      successToast("Domain deleted successfully")
      refetchWebData()
      refetch()
      queryClient.invalidateQueries(GET_WEBSITE_DATA)
    },
  })

  // deletes a website
  const handleDeleteWebsite = (ip, domain) => {
    mutateDeleteWebsite({ ip, domain })
  }
  const { fetcher } = useBPFetcher()
  const dispatch = useDispatch()
  const toast = useCustomToast()

  // download pdf
  const handlePDFDownload = () => {
    dispatch(getWebsiteMonitoringPdf(fetcher, toast))
  }
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box>
      <Box className="xlm" w="full">
        <ExportButton
          text1={t("description.webMonitor")}
          text2={handlePDFDownload}
        />
        <Flex justifyContent="space-between" mb="4">
          {toggle ? (
            <ArHeader
              onClick={() => {
                onOpen()
              }}
            />
          ) : (
            <EnHeader
              onClick={() => {
                onOpen()
              }}
            />
          )}
        </Flex>
        <Box
          bg={useColorModeValue(
            "lightMode.dashBoardHeader",
            "darkMode.wHeaderColor"
          )}
          borderRadius={"10px"}
          boxShadow="md"
        >
          <Flex align={"center"} justify="space-between" h="10" px={3}>
            {toggle ? <ArLoader /> : <EnLoader />}
          </Flex>
          <Box borderRadius={"10px"}>
            {webMonitoring?.length > 0 ? (
              <TableData>
                {webMonitoring?.map((data, index) => {
                  return (
                    <TableDetails
                      key={index}
                      initOnClick={() => handleRowClicked(data)}
                      secOnClick={() =>
                        handleDeleteWebsite(data?.ip, data?.domain_name)
                      }
                      status={data?.web_status}
                      domainName={data.domain_name}
                      ip={data.ip}
                      ipSecond={data.ip_second}
                    />
                  )
                })}
              </TableData>
            ) : (
              <NoData />
            )}
          </Box>
        </Box>
      </Box>

      <WebsiteMonitoringModalDetails
        isOpen={isOpen}
        onClose={onClose}
        title={t("description.addDomain")}
        handleClose={onClose}
      />
    </Box>
  )
}

export default WebsiteMonitoring
