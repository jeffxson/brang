import React, { useState } from "react"
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react"
import { useDeleteAppData, useGetAppData } from "services/query/appSearch"
import TableLoader from "components/Common/TableLoader"
import useCustomToast from "utils/notifications"
import { DeleteAlert } from "components/Modal/DeleteAlert"
import AppSearchModalDetails from "components/Modal/ModalDetails/AppSearchModalDetails"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"
import {
  ArHeader,
  ArTableBody,
  ArTableHeader,
} from "../../locales/AR/AppSearch"
import {
  EnHeader,
  EnTableBody,
  EnTableHeader,
  NoData,
} from "../../locales/EN/AppSearch"

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { colorMode } = useColorMode()
  const [search, setSearch] = useState("")
  const [takeDownData, setTakeDownData] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState("")
  const { errorToast, successToast } = useCustomToast()

  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  // queries the endpoint for the GET request
  const {
    data: appData,
    isLoading: appLoading,
    refetch,
  } = useGetAppData(search)

  // queries the endpoint for the DELETE request
  const { mutate, isLoading } = useDeleteAppData({
    onError: err => errorToast(err.message),
    onSuccess: () => {
      refetch()
      successToast("Deleted successfully")
      setTimeout(() => {
        setShowDeleteModal("")
      }, 500)
    },
  })

  // executes the DELETE request
  const handleDelete = () => {
    mutate(showDeleteModal)
  }

  //opens the takedown modal
  const handleTakeDown = data => {
    onOpen()
    setTakeDownData(data)
  }

  return (
    <Box>
      <Flex
        align={"center"}
        justify="space-between"
        cursor={"pointer"}
        flexDir={["column", "column", "row", "row"]}
        mb={2}
      >
        {toggle ? (
          <EnHeader
            search={search}
            onChange={e => setSearch(e.target.value)}
            onClick={() => setSearch("")}
            label={t("description.widget9")}
          />
        ) : (
          <ArHeader
            search={search}
            onChange={e => setSearch(e.target.value)}
            onClick={() => setSearch("")}
            label={t("description.widget9")}
          />
        )}
      </Flex>
      <Box>
        <TableContainer
          borderRadius="20px"
          overflowX={"auto"}
          sx={scrollBarStyle}
          boxShadow="lg"
          w="100%"
          height="70vh"
          overflowY="scroll"
        >
          {appLoading && <TableLoader />}
          {appData && (
            <Table size="sm" variant="simple">
              <Thead
                position={"sticky"}
                zIndex="2"
                top="0"
                bg={colorMode === "light" ? "#f3f3f3" : "gray.700"}
              >
                <Tr>
                  {toggle ? (
                    <ArTableHeader
                      initHeader={t("description.appHeader2")}
                      secHeader={t("description.appHeader1")}
                    />
                  ) : (
                    <EnTableHeader
                      initHeader={t("description.appHeader1")}
                      secHeader={t("description.appHeader2")}
                    />
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {appData?.length > 0 ? (
                  appData?.map((data, i) => (
                    <Tr key={i}>
                      {toggle ? (
                        <ArTableBody
                          initonClick={() => handleTakeDown(data)}
                          secOnClick={() => {
                            setShowDeleteModal(data?.id)
                          }}
                          takedown={t("description.takeBtn")}
                          remove={t("description.remove")}
                          link={data?.site_link}
                          app={data?.app_name}
                          src={data?.icon_link}
                        />
                      ) : (
                        <EnTableBody
                          initonClick={() => handleTakeDown(data)}
                          data={data}
                          secOnClick={() => {
                            setShowDeleteModal(data?.id)
                          }}
                          takedown={t("description.takeBtn")}
                          remove={t("description.remove")}
                          link={data?.site_link}
                          app={data?.app_name}
                          src={data?.icon_link}
                        />
                      )}
                    </Tr>
                  ))
                ) : (
                  <NoData />
                )}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </Box>
      <AppSearchModalDetails
        data={takeDownData}
        isOpen={isOpen}
        onClose={onClose}
        title="Send takedown email"
      />
      <DeleteAlert
        isOpen={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false)
        }}
        loading={isLoading}
        action={handleDelete}
      />
    </Box>
  )
}

export default index
