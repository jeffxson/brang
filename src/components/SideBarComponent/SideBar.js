import React from "react"
import {
  MdOutlineWorkOutline,
  MdOutlineRateReview,
  MdOutlineMonitor,
} from "react-icons/md"
import { AiOutlineAppstoreAdd } from "react-icons/ai"
import { FaUsersCog } from "react-icons/fa"
import { BiImages } from "react-icons/bi"
import { BsBarChart } from "react-icons/bs"
import { AiOutlineSafetyCertificate } from "react-icons/ai"
import { BiWorld } from "react-icons/bi"
import {
  RiSearchEyeLine,
  RiYoutubeLine,
  RiHealthBookLine,
  RiFileWarningLine,
  RiErrorWarningFill,
} from "react-icons/ri"
import { SidebarIcon } from "../Layouts/SideBar"
import { useTranslation } from "react-i18next"
import { MdOutlineAnalytics } from "react-icons/md"
import { useGetSuperUser } from "services/query/superuser"

const SideBar = () => {
  const { t } = useTranslation()

  // queries the endpoint to get super user details
  const { data: superUser } = useGetSuperUser()

  return (
    <>
      <SidebarIcon
        text1={BsBarChart}
        text2="dashboard"
        text3={t("description.dashboard")}
      />
      <SidebarIcon
        text1={AiOutlineSafetyCertificate}
        text2="takedown"
        text3={t("description.widget1")}
      />
      <SidebarIcon
        text1={RiErrorWarningFill}
        text2="raised-incidents"
        text3={t("description.raisedIncident")}
      />
      <SidebarIcon
        text1={RiFileWarningLine}
        text2="data-leak"
        text3={t("description.dataLeak")}
      />
      <SidebarIcon
        text1={RiSearchEyeLine}
        text2="dark-web-search"
        text3={t("description.darkWeb")}
      />
      <SidebarIcon
        text1={MdOutlineMonitor}
        text2="website-monitoring"
        text3={t("description.webMonitor")}
      />
      <SidebarIcon
        text1={BiWorld}
        text2="twisted-dns"
        text3={t("description.twistedDns")}
      />
      <SidebarIcon
        text1={FaUsersCog}
        text2="social-media"
        text3={t("description.socialMedia")}
      />
      <SidebarIcon
        text1={RiYoutubeLine}
        text2="youtube-search"
        text3={t("description.youtubeSearch")}
      />
      <SidebarIcon
        text1={BiImages}
        text2="image-search"
        text3={t("description.imageSearch")}
      />
      <SidebarIcon
        text1={MdOutlineWorkOutline}
        text2="job-searches"
        text3={t("description.sideJob")}
      />
      <SidebarIcon
        text1={AiOutlineAppstoreAdd}
        text2="app-search"
        text3={t("description.appSearch")}
      />
      <SidebarIcon
        text1={MdOutlineRateReview}
        text2="google-review"
        text3={t("description.googleReview")}
      />
      <SidebarIcon
        text1={MdOutlineRateReview}
        text2="featured"
        text3="Featured"
      />
      {superUser?.is_superuser === true && (
        <>
          <SidebarIcon
            text1={RiHealthBookLine}
            text2="system-health"
            text3="System Health"
          />
          <SidebarIcon
            text1={MdOutlineAnalytics}
            text2="analytics"
            text3="Analytics"
          />
        </>
      )}
    </>
  )
}

export default SideBar
