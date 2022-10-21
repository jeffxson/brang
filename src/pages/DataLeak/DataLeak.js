import React, { useState } from "react"
import {
  Box,
  Text,
  useColorModeValue,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react"
import { useGetDataLeak } from "services/query/dataLeak"
import { creditCardRegex, emailRegx } from "utils/helpers"
import DataLeakModalDetails from "components/Modal/ModalDetails/DataLeakModalDetails"
import { useTranslation } from "react-i18next"
import useCustomToast from "utils/notifications"
import {
  FinalHeader,
  InitHeader,
  SecHeader,
  TableLayout,
} from "components/data/DataLeak/TableLayout"
import {
  FinalTableBody,
  InitTableBody,
  SecTableBody,
} from "components/data/DataLeak/TableBody"
import Form from "components/data/DataLeak/Form"
import { useGetRecentDataLeaks } from "services/query/dashboard"

const DataLeak = ({ history }) => {
  // refreshes the recent data leaks history in the dashboard after every data leak search
  const { refetch } = useGetRecentDataLeaks()
  const { infoToast } = useCustomToast()

  // queries the endpoint to perform data leak search
  const {
    mutate,
    data: dataLeakTable,
    isLoading: isDataLoading,
  } = useGetDataLeak({
    onSuccess: () => {
      refetch()
    },
  })
  const [userInput, setUserInput] = useState(
    history?.location?.state?.search_term || ""
  )
  const [takeDownData, setTakeDownData] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // executes the search command
  const handleSearch = e => {
    e.preventDefault()
    emailRegx
    creditCardRegex
    if (userInput === "") {
      infoToast("Please enter email or credit card")
    } else {
      if (emailRegx.test(userInput) || creditCardRegex.test(userInput)) {
        if (creditCardRegex.test(userInput)) {
          infoToast("Fetching Credit Cards Can take between 2 - 10 minutes")
        }
        const formData = new FormData()
        const data = { query: userInput }
        const dataKey = Object.keys(data)
        for (let i = 0; i < dataKey.length; i++) {
          formData.append(dataKey[i], data[dataKey[i]])
        }
        mutate(formData)
      } else {
        const formData = new FormData()
        const data = { query: userInput }
        const dataKey = Object.keys(data)
        for (let i = 0; i < dataKey.length; i++) {
          formData.append(dataKey[i], data[dataKey[i]])
        }
        mutate(formData)
      }
    }
  }

  // opens the takedown modal
  const handleTakeDown = data => {
    onOpen()
    setTakeDownData(data)
  }

  // checks if the search query is a password
  const checkIfSearchWasPassword = () => {
    if (dataLeakTable) {
      return Object.keys(dataLeakTable).includes("password" && "hash")
    }
  }
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box width="full">
      <Text
        fontWeight={700}
        my={3}
        float={toggle ? "right" : "left"}
        fontSize="3xl"
        color={useColorModeValue(
          "lightMode.pageTitle",
          "lightMode.dashBoardHeader"
        )}
      >
        {t("description.searchData")}
      </Text>
      <Box w="full">
        <Form
          onSubmit={handleSearch}
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <Text
          textAlign={toggle ? "end" : "start"}
          fontWeight={700}
          mt={5}
          ml={3}
          fontSize="lg"
        >
          {t("description.searchEmail")}
        </Text>
      </Box>
      {isDataLoading && (
        <Box my={5}>
          <Spinner size="md" />
        </Box>
      )}
      <Box borderRadius="10px" my={5}>
        <TableLayout
          initChildren={
            <>
              {dataLeakTable?.search_results?.length > 0 && <InitHeader />}
              {dataLeakTable?.email_data?.length > 0 && <SecHeader />}
              {checkIfSearchWasPassword() && <FinalHeader />}
            </>
          }
        >
          {dataLeakTable?.search_results?.length > 0 ? (
            dataLeakTable?.search_results?.map((data, index) => {
              return (
                <InitTableBody
                  key={index}
                  data={data}
                  leakedUrl={data?.leaked_url}
                  takedown={() => handleTakeDown(data)}
                />
              )
            })
          ) : checkIfSearchWasPassword() ? (
            <SecTableBody
              password={dataLeakTable?.password}
              hash={dataLeakTable?.hash}
              count={dataLeakTable?.count}
            />
          ) : (
            dataLeakTable?.email_data?.map((data, index) => {
              return (
                <FinalTableBody
                  key={index}
                  query={data.query}
                  searchType={data.search_type}
                  site={data.site}
                  takedown={() => handleTakeDown(data)}
                />
              )
            })
          )}
        </TableLayout>
      </Box>

      <DataLeakModalDetails
        data={takeDownData}
        isOpen={isOpen}
        onClose={onClose}
        title="Send takedown email"
      />
    </Box>
  )
}
export default DataLeak
