import React, { useState } from "react"
import { Box, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import TakedownModal from "components/Modal/ModalDetails/TakedownModal"
import { useGetNews } from "services/query/dashboard"
import GoBack from "components/Common/GoBack"
import { useTranslation } from "react-i18next"
import NewsDetails from "components/data/DashboardWidget/News/NewsDetails"
import NewsTable from "components/data/DashboardWidget/News/NewsTable"

const index = () => {
  const [showModal, setShowModal] = useState("")
  const { t } = useTranslation()

  // opens up the modal for takedown
  const handleTakedown = link => {
    setShowModal(link)
  }

  // queries the endpoint to get news
  const { data: newsLink, isLoading: isNewsLoading } = useGetNews()

  return (
    <>
      <Box style={{ padding: "20px 32px 60px 32px" }}>
        <Flex
          align={"flex-start"}
          flexDir="column"
          justify="space-between"
          my="5"
        >
          <Flex alignItems="center">
            <GoBack />
            <Text fontWeight={700} fontSize="3xl">
              {t("description.widget6")}
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
          <Flex align={"center"} justifyContent="space-between" h="10" px={3}>
            <Text fontWeight={700}>{t("description.widget6")}</Text>
            {isNewsLoading && <Spinner size="md" />}
          </Flex>
          <NewsDetails>
            {newsLink?.results?.map((item, index) => {
              return (
                <NewsTable
                  key={index}
                  link={item?.link}
                  malicious={item.malicious ? "true" : "false"}
                  date={new Date(item.created_at).toDateString()}
                  onClick={() => {
                    handleTakedown(item.link)
                    setShowModal(item?.link)
                  }}
                />
              )
            })}
          </NewsDetails>
        </Box>
      </Box>

      <TakedownModal
        isOpen={showModal ? true : false}
        handleClose={() => {
          setShowModal("")
        }}
        theft_url={showModal}
      />
    </>
  )
}

export default index
