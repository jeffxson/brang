import React, { Fragment, useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import useCustomToast from "utils/notifications"
import { useDispatch } from "react-redux"
import { getRaisedPdf } from "redux/actions/pdfActions"
import useBPFetcher from "utils/fetcher"
import {
  DateFilterForm,
  IncidentFilterForm,
  PriorityFilterForm,
  StatusFilterForm,
} from "components/data/RaisedIncidents/MonitorFilter"
import { ExportButton } from "components/Common/ExportButton"
import { defaultValues } from "utils/helpers"
import { useTranslation } from "react-i18next"

const MonitorTakedownFilter = ({ handleFilterChange }) => {
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"
  const [filters, setFilters] = useState(defaultValues)

  const handleChange = e => {
    const newFilter = { ...filters, [e.target.name]: e.target.value }
    setFilters(newFilter)
  }

  useEffect(() => {
    handleFilterChange(filters)
  }, [filters])

  const { fetcher } = useBPFetcher()
  const dispatch = useDispatch()
  const toast = useCustomToast()

  const handlePDFDownload = () => {
    dispatch(getRaisedPdf(fetcher, toast))
  }

  return (
    <Box w="100%">
      <ExportButton
        text1={t("description.filterBy")}
        text2={handlePDFDownload}
      />
      <Box>
        {toggle ? (
          <Fragment>
            <Box className="filter-card-container">
              <DateFilterForm
                text1="to_date"
                text2={t("description.endDate")}
                text3={handleChange}
                text4="date"
              />
            </Box>

            <Box className="filter-card-container">
              <DateFilterForm
                text1="from_date"
                text2={t("description.startDate")}
                text3={handleChange}
                text4="date"
              />
            </Box>

            <Box className="filter-card-container">
              <PriorityFilterForm
                text1="priority"
                text2={t("description.priority")}
                text3={handleChange}
                text4="priority"
                text5="All"
                text6="High"
                text7="Medium"
                text8="Low"
              />
            </Box>

            <Box className="filter-card-container">
              <StatusFilterForm
                text1="status"
                text2={t("description.leakHeader2")}
                text3={handleChange}
                text4="All"
                text5="Complete"
                text6="Processing"
              />
            </Box>

            <Box className="filter-card-container">
              <IncidentFilterForm
                text1="case_study"
                text2={t("description.incidentType")}
                text3={handleChange}
                text4="All"
                text5="Phishing"
                text6="Brand abuse"
                text7="Counterfeit"
                text8="Suspicious"
              />
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Box className="filter-card-container">
              <IncidentFilterForm
                text1="case_study"
                text2={t("description.incidentType")}
                text3={handleChange}
                text4="All"
                text5="Phishing"
                text6="Brand abuse"
                text7="Counterfeit"
                text8="Suspicious"
              />
            </Box>

            <Box className="filter-card-container">
              <StatusFilterForm
                text1="status"
                text2={t("description.leakHeader2")}
                text3={handleChange}
                text4="All"
                text5="Complete"
                text6="Processing"
              />
            </Box>

            <Box className="filter-card-container">
              <PriorityFilterForm
                text1="priority"
                text2={t("description.priority")}
                text3={handleChange}
                text4="priority"
                text5="All"
                text6="High"
                text7="Medium"
                text8="Low"
              />
            </Box>

            <Box className="filter-card-container">
              <DateFilterForm
                text1="from_date"
                text2={t("description.startDate")}
                text3={handleChange}
                text4="date"
              />
            </Box>

            <Box className="filter-card-container">
              <DateFilterForm
                text1="to_date"
                text2={t("description.endDate")}
                text3={handleChange}
                text4="date"
              />
            </Box>
          </Fragment>
        )}
      </Box>
    </Box>
  )
}

export default MonitorTakedownFilter
