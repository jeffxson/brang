import React, { useState } from "react"
import { Box, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import TakedownModal from "components/Modal/ModalDetails/TakedownModal"
import { useGetGoogleNews, useDeleteNews } from "services/query/dashboard"
import useCustomToast from "utils/notifications"
import { DeleteAlert } from "components/Modal/DeleteAlert"
import GoBack from "components/Common/GoBack"
import { useTranslation } from "react-i18next"
import SearchDetails from "components/data/DashboardWidget/TopGoogleSearch/SearchDetails"
import SearchTable from "components/data/DashboardWidget/TopGoogleSearch/SearchTable"

const Index = () => {
  const { successToast } = useCustomToast()
  const { t } = useTranslation()

  const [showModal, setShowModal] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState("")

  // queries the endpoint to get google search data
  const { data: googleNewsLink, isFetching, refetch } = useGetGoogleNews()

  // queries the endpoint to DELETE news
  const { mutate, isLoading } = useDeleteNews({
    onSuccess: () => {
      refetch()
      setTimeout(() => {
        setShowDeleteModal("")
      }, 500)
      successToast("Deleted successfully")
    },
  })

  // executes the DELETE command
  const handleDelete = () => {
    mutate({ link_id: showDeleteModal.id })
  }

  // opens up the takedown modal
  const handleTakedown = link => {
    setShowModal(link)
  }

  return (
    <>
      <Box style={{ padding: "20px 32px 60px 32px" }}>
        <Box mx={8} width="full">
          <Flex
            align={"flex-start"}
            flexDir="column"
            justify="space-between"
            my="5"
          >
            <Flex alignItems="center">
              <GoBack />
              <Text fontWeight={700} fontSize="3xl">
                {t("description.widget7")}
              </Text>
            </Flex>
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
              <Text fontWeight={700}>{t("description.widget7")}</Text>
              {isFetching && <Spinner size="md" />}
            </Flex>
            <SearchDetails>
              {googleNewsLink?.map(({ link, id, malicious }, index) => {
                return (
                  <SearchTable
                    key={index}
                    link={link}
                    malicious={"" + malicious}
                    initOnClick={() => {
                      handleTakedown(link)
                    }}
                    secOnClick={() => {
                      setShowDeleteModal({ id })
                    }}
                  />
                )
              })}
            </SearchDetails>
          </Box>
        </Box>
      </Box>

      <TakedownModal
        isOpen={showModal ? true : false}
        handleClose={() => {
          setShowModal("")
        }}
        data={showModal}
      />
      <DeleteAlert
        isOpen={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false)
        }}
        loading={isLoading}
        action={handleDelete}
      />
    </>
  )
}

export default Index
