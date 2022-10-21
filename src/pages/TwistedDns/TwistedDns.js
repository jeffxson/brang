import React, { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import useBPFetcher from "utils/fetcher"
import { useDispatch } from "react-redux"
import { getTwistedDnsPdf } from "redux/actions/pdfActions"
import useCustomToast from "utils/notifications"
import {
  useGetAllWebMonitoringParams,
  useGetTwistedDnsData,
} from "services/query/webMonitoring"
import { useDebounce } from "utils/helpers"
import { ExportButton } from "components/Common/ExportButton"
import TakedownModal from "components/Modal/ModalDetails/TakedownModal"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import PageSize from "components/data/TwistedDns/PageSize"
import FilterLayout from "components/data/TwistedDns/FilterLayout"
import TableLayout, {
  TableDetails,
} from "components/data/TwistedDns/TableLayout"

const WebsiteMonitoring = () => {
  const history = useHistory()

  const [twistedPageNo, setTwistedPageNo] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [fuzzer, setFuzzer] = useState("")
  const [source_dns, setSourceDns] = useState("")
  const delayed_sourcedns = useDebounce(source_dns, 1500)

  // queries the endpoints to get twisted dns data
  const {
    data: twistedDNS,
    refetch,
    isLoading: isTwistedDNSLoading,
  } = useGetTwistedDnsData(
    twistedPageNo + 1,
    pageSize,
    fuzzer,
    delayed_sourcedns
  )

  // gets the amount of data displayed per page
  const twistedDNSCount = Math.ceil(twistedDNS?.count / pageSize)

  const { data: params } = useGetAllWebMonitoringParams()
  const fuzzers = params ? [...new Set(params?.fuzzers)] : []
  const [showModal, setShowModal] = useState("")

  // opens takedown modal
  const handleTakeDown = data => {
    setShowModal(data)
  }

  // click into the next page
  const handlePageClick = ({ selected }) => {
    setTwistedPageNo(selected)
  }
  const { fetcher } = useBPFetcher()
  const dispatch = useDispatch()
  const toast = useCustomToast()

  // download pdf
  const handlePDFDownload = () => {
    dispatch(getTwistedDnsPdf(fetcher, toast))
  }

  // drill into the next page
  const handleRowClicked = row => {
    history.push({
      pathname: "/twisted-dns-inside",
      data: row,
    })
  }
  useEffect(() => {
    refetch()
  }, [])
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box>
      <Box className="xlm" w="full">
        <ExportButton
          text1={t("description.dnsHeader1")}
          text2={handlePDFDownload}
        />
        <FilterLayout
          initOnChange={e => setFuzzer(e.target.value)}
          secOnChange={e => setSourceDns(e.target.value)}
          value={source_dns}
          toggle={toggle}
          fuzzers={fuzzers}
          onClick={() => setSourceDns("")}
        />
        <TableLayout
          isLoading={isTwistedDNSLoading}
          secChildren={
            <PageSize
              handlePageClick={handlePageClick}
              onChange={e => setPageSize(e.target.value)}
              pageCount={isNaN(twistedDNSCount) ? 0 : twistedDNSCount}
            />
          }
        >
          {twistedDNS?.results?.map((data, index) => {
            return (
              <TableDetails
                key={index}
                corporateDns={data?.corporate_dns}
                fuzzer={data?.fuzzer}
                malicious={data?.malicious}
                takedown={() => handleTakeDown(data)}
                rowClicked={() => handleRowClicked(data)}
                twistedDns={data?.twisted_dns}
              />
            )
          })}
        </TableLayout>
      </Box>
      <TakedownModal
        isOpen={showModal ? true : false}
        handleClose={() => {
          setShowModal("")
        }}
        data={showModal}
      />
    </Box>
  )
}

export default WebsiteMonitoring
