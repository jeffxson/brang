import React, { useEffect } from "react"
import {
  Badge,
  Box,
  Flex,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { useQueryClient } from "react-query"
import { SmallCloseIcon } from "@chakra-ui/icons"
import { scrollBarStyle } from "utils/helpers"
import { usedeleteKeywords } from "services/query/deleteKeywords"
import { useTranslation } from "react-i18next"
import useCustomToast from "utils/notifications"
import { GET_MONITORED_KEYWORDS } from "utils/queryKey"
import { useGetAllMonitoredKeywords } from "services/query/dashboard"

const MonitoredKeywords = () => {
  // queries the endpoint to get all monitored keywords
  const { data: monitoredKeywordsData, refetch } = useGetAllMonitoredKeywords()

  // queries the endpoint to DELETE monitored keywords
  const { mutate: mutateDeleteKeywords, isLoading: deleteKeywordsLoading } =
    usedeleteKeywords({
      onSuccess: () => {
        refetch()
        successToast("Keyword delete successfully")
      },
    })
  const { successToast } = useCustomToast()
  const queryClient = useQueryClient()

  // executes the delete keyword command
  const handleDeleteOfKeyWords = keywordToPost => {
    mutateDeleteKeywords({ keyword: keywordToPost })
  }
  const { t } = useTranslation()

  useEffect(() => {
    queryClient.invalidateQueries(GET_MONITORED_KEYWORDS)
  }, [])

  const { colorMode } = useColorMode()

  return (
    <>
      {deleteKeywordsLoading && (
        <Box paddingRight="1rem">
          <Spinner
            float="right"
            mt={-8}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            size="md"
          />
        </Box>
      )}

      <Box
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        height="100%"
        mt={10}
        overflowY={"scroll"}
        minH={"220px"}
        maxH={"220px"}
        mb={3}
        borderRadius={"10px"}
        sx={scrollBarStyle}
      >
        <Flex flexWrap={"wrap"} p={2} gap={2}>
          {monitoredKeywordsData?.length > 0 ? (
            monitoredKeywordsData?.map((keyword, index) => (
              <Badge
                borderRadius={"full"}
                bgColor={
                  colorMode === "light" ? "lightMode.teal" : "darkMode.black"
                }
                key={index}
                fontSize={"12px"}
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                color={
                  colorMode === "light" ? "white" : "lightMode.dashBoardHeader"
                }
              >
                &#35;{keyword}{" "}
                <SmallCloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteOfKeyWords(keyword)}
                />
              </Badge>
            ))
          ) : (
            <Text fontWeight={500} px={3}>
              {t("description.noMonKey")}
            </Text>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default MonitoredKeywords
