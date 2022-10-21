import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Box, HStack, useColorModeValue, useToast } from "@chakra-ui/react"
import { withRouter } from "react-router-dom"
import {
  Takedown,
  AlternateDnsFinder,
  LatestWebsiteMonitoring,
  News,
  GoogleNews,
  Apps,
  DarkWebData,
  DashboardCards,
  MonitoredKeywords,
  CloudResources,
  SuggestedKeywords,
  ImageSearch,
} from "components/data/DashboardWidget"
import useBPFetcher from "utils/fetcher"
import { getPDF, sendPDF } from "../../redux/actions/dashboardActions"
import {
  useGetRecentDataLeaks,
  useGetWebmonitoringDashboard,
} from "services/query/dashboard"
import { useGetDarkWebData } from "services/query/darkWebData"
import {
  DashboardSkeletons,
  ImageSkeleton,
} from "components/data/DashboardWidget/DashboardSkeleton"
import AddKeywordsModalDetails from "components/Modal/ModalDetails/AddKeywordModalDetails"
import { useTranslation } from "react-i18next"
import BarChart from "components/data/Chart/Bar/BarChart"
import LineChart from "components/data/Chart/LineChart"
import { ArHeader } from "locales/AR/Dashboard"
import { EnHeader } from "locales/EN/Dashboard"

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const { i18n, t } = useTranslation()
  const toast = useToast()
  const { fetcher } = useBPFetcher()

  // queries the recent data leaks endpoint GET request

  const { data: recentDataLeaks } = useGetRecentDataLeaks()

  // queries the dark web endpoint GET request
  const { data: darkWeb } = useGetDarkWebData()

  // queries the website monitoring endpoint GET request
  const { data: webMonitoringData } = useGetWebmonitoringDashboard()

  // downloads PDF
  const handlePDFDownload = () => {
    dispatch(getPDF(fetcher, toast))
  }

  // sends PDF to mail
  const handlePDFSend = () => {
    dispatch(sendPDF(fetcher, toast))
  }

  const toggle = i18n?.language === "AR"

  return (
    <Box
      w="full"
      paddingTop="2rem"
      paddingBottom="2rem"
      backgroundColor={useColorModeValue("#FFFFFF", "#18191D")}
    >
      {toggle ? (
        <ArHeader
          initOnClick={handlePDFDownload}
          secOnClick={handlePDFSend}
          modal={() => {
            setShowModal(true)
          }}
        />
      ) : (
        <EnHeader
          initOnClick={handlePDFDownload}
          secOnClick={handlePDFSend}
          modal={() => {
            setShowModal(true)
          }}
        />
      )}
      <HStack gap={1} my={5}></HStack>

      <DashboardCards
        dataLeak={recentDataLeaks}
        dataDarkWeb={darkWeb}
        webData={webMonitoringData}
      />

      <DashboardSkeletons
        initTitle={t("description.raisedIncident")}
        secTitle="Overview"
        text2={<LineChart />}
        text4={<BarChart />}
      />

      <DashboardSkeletons
        initTitle={t("description.widget1")}
        secTitle={t("description.card5")}
        text2={<Takedown />}
        text4={<CloudResources />}
      />

      <DashboardSkeletons
        initTitle={t("description.widget3")}
        secTitle={t("description.widget4")}
        text2={<LatestWebsiteMonitoring />}
        text4={<DarkWebData />}
      />

      <DashboardSkeletons
        initTitle={t("description.widget5")}
        secTitle={t("description.widget6")}
        text2={<AlternateDnsFinder />}
        text4={<News />}
      />

      <DashboardSkeletons
        initTitle={t("description.widget7")}
        secTitle={t("description.widget8")}
        text2={<GoogleNews />}
        text4={<MonitoredKeywords />}
      />

      <DashboardSkeletons
        initTitle={t("description.widget9")}
        text2={<Apps />}
        secTitle={t("description.widget10")}
        text4={<SuggestedKeywords />}
      />

      <ImageSkeleton
        title={t("description.imageSearch")}
        text={<ImageSearch />}
      />

      <AddKeywordsModalDetails
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      />
    </Box>
  )
}

export default withRouter(Dashboard)
