import React, { useState, useEffect } from "react"
import { Box, Text, Spinner, useDisclosure } from "@chakra-ui/react"
import { useSearchDarkWeb } from "services/query/darkWeb"
import useBPFetcher from "utils/fetcher"
import { useDispatch } from "react-redux"
import { getDarkWebPdf } from "redux/actions/pdfActions"
import useCustomToast from "utils/notifications"
import { ExportButton } from "components/Common/ExportButton"
import { useTranslation } from "react-i18next"
import DarkwebModal from "components/Modal/ModalDetails/DarkwebModal"
import TopTable from "components/data/DarkWeb/TopTable"
import BottomTable from "components/data/DarkWeb/BottomTable"
import StatusTable from "components/data/DarkWeb/StatusTable"
import Form from "components/data/DarkWeb/Form"
import { useGetDarkWebData } from "services/query/darkWebData"

const DarkWeb = props => {
  // updates the darkweb result in dashboard after a search is concluded
  const { refetch } = useGetDarkWebData()

  const { errorToast, successToast } = useCustomToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [takeDownData, setTakeDownData] = useState(null)
  const [theftData, setTheftData] = useState(null)

  // opens the takedown modal
  const handleTakeDown = data => {
    onOpen()
    setTakeDownData(data)
  }

  // queries the endpoint to perform darkweb
  const {
    mutate,
    data: darkWebTable,
    isLoading: isDarkWebLoading,
  } = useSearchDarkWeb({
    onSuccess: () => {
      successToast("Data found")
      refetch()
    },
  })
  const [{ keyword, field }, setUserInput] = useState({
    keyword: props?.location?.data?.keyword || "",
    field: "",
  })

  const keywordToArr = keyword.replace(", ", ",").split(",")

  // executes the search command
  const handleSearch = e => {
    e.preventDefault()
    if (keyword === "" && field === "") {
      errorToast("Please enter keyword or field")

      return
    } else {
      const data = { keyword: keywordToArr, field }
      const formData = new FormData()
      const dataKey = Object.keys(data)
      for (let i = 0; i < dataKey.length; i++) {
        formData.append(dataKey[i], data[dataKey[i]])
      }
      mutate(data)
    }
  }

  useEffect(() => {
    return () => {
      setUserInput({
        keyword: "",
        field: "",
      })
    }
  }, [])

  const { fetcher } = useBPFetcher()
  const dispatch = useDispatch()
  const toast = useCustomToast()

  // download PDF
  const handlePDFDownload = () => {
    dispatch(getDarkWebPdf(fetcher, toast))
  }
  const { t } = useTranslation()

  return (
    <Box width="full">
      <ExportButton
        text1={t("description.widget4")}
        text2={handlePDFDownload}
      />
      <Form
        value={keyword}
        initOnChange={e => setUserInput({ field: e.target.value, keyword })}
        secOnChange={e => setUserInput({ keyword: e.target.value, field })}
        onSubmit={handleSearch}
        helperText="Seperate emails with comma."
      />
      {isDarkWebLoading && (
        <Box my={5}>
          <Spinner size="md" />
        </Box>
      )}
      <Box borderRadius="10px" my={5} w="full">
        <TopTable darkWebTable={darkWebTable} />
        <br />
        <br />
      </Box>
      {darkWebTable?.length ? (
        darkWebTable.map((darkWebTable, i) =>
          darkWebTable?.status.length > 0 ? (
            <Box key={i}>
              <Text fontWeight={700} mt={5} ml={3} fontSize="lg">
                Related Status Data for {darkWebTable.keyword}
              </Text>
              <StatusTable>
                {darkWebTable?.status.map((stat, idx) => (
                  <BottomTable
                    key={idx}
                    site={stat?.site}
                    hash={stat?.hash}
                    count={stat?.count}
                    searchType={stat?.search_type}
                    onClick={() => {
                      handleTakeDown(stat)
                      setTheftData(darkWebTable?.keyword)
                    }}
                  />
                ))}
              </StatusTable>
            </Box>
          ) : !darkWebTable ? (
            <></>
          ) : (
            <Box
              display={"flex"}
              justifyContent="center"
              alignContent={"center"}
            >
              <h3>No related status data</h3>
            </Box>
          )
        )
      ) : !!darkWebTable && darkWebTable?.status.length > 0 ? (
        <>
          <Text fontWeight={700} mt={5} ml={3} fontSize="lg">
            Related Status Data
          </Text>
          <StatusTable>
            {darkWebTable?.status.map((stat, idx) => (
              <BottomTable
                key={idx}
                site={stat?.site}
                hash={stat?.hash}
                count={stat?.count}
                searchType={stat?.search_type}
                onClick={() => {
                  handleTakeDown(stat)
                  setTheftData(darkWebTable?.keyword)
                }}
              />
            ))}
          </StatusTable>
        </>
      ) : !darkWebTable ? (
        <></>
      ) : (
        <Box display={"flex"} justifyContent="center" alignContent={"center"}>
          <h3>No related status data</h3>
        </Box>
      )}
      <DarkwebModal
        data={takeDownData}
        theft_data={theftData}
        isOpen={isOpen}
        onClose={onClose}
        title="Send takedown email"
        handleClose={onClose}
      />
    </Box>
  )
}
export default DarkWeb
