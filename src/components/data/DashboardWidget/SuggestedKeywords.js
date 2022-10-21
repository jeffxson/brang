import React from "react"
import {
  Badge,
  Box,
  Flex,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  useGetAllSuggestedKeywords,
  useAddNewKeywords,
  useGetAllMonitoredKeywords,
  useDeleteSuggestedKeyword,
} from "services/query/dashboard"
import { SmallCloseIcon, AddIcon } from "@chakra-ui/icons"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"
import useCustomToast from "utils/notifications"

const SuggestedKeywords = () => {
  // queries the endpoint to get all suggested keyword
  const { data: suggestedKeywords, refetch } = useGetAllSuggestedKeywords()

  // refetches monitored keyword after a suggested keyword has been added to it
  const { refetch: refetchKeyword } = useGetAllMonitoredKeywords()
  const { successToast } = useCustomToast()

  // queries the endpoint to delete a suggested keyword
  const { mutate: mutateKeyword, isLoading: isDeleting } =
    useDeleteSuggestedKeyword({
      onSuccess: () => {
        refetch()
        successToast("Keyword deleted successfully")
      },
    })

  // queries the endpoint to add a suggested keyword to the monitored keyword
  const { mutate, isLoading: isAdding } = useAddNewKeywords({
    onSuccess: () => {
      refetchKeyword()
    },
  })

  // executes the add suggested keyword to monitored keyword
  const handleSubmit = key => {
    mutate({
      keyword: key,
    })
  }

  // executes the delete suggested  keyword command
  const handleDelete = id => {
    mutateKeyword(id)
  }
  const { t } = useTranslation()

  const { colorMode } = useColorMode()

  return (
    <>
      <Flex align={"center"} justify="space-between" my={1} id="monitored">
        {isAdding && (
          <Box paddingRight="1rem">
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              size="md"
            />
          </Box>
        )}
        {isDeleting && (
          <Box paddingRight="1rem">
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              size="md"
            />
          </Box>
        )}
      </Flex>
      <Box
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        height="100%"
        overflowY={"scroll"}
        minH={"220px"}
        mt={10}
        maxH={"220px"}
        mb={3}
        borderRadius={"10px"}
        sx={scrollBarStyle}
      >
        <Flex flexWrap={"wrap"} p={2} gap={2}>
          {suggestedKeywords?.length > 0 ? (
            suggestedKeywords?.map((data, i) => (
              <Badge
                borderRadius={"full"}
                bgColor={
                  colorMode === "light" ? "lightMode.teal" : "darkMode.black"
                }
                key={i}
                fontSize={"12px"}
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                color={
                  colorMode === "light" ? "white" : "lightMode.dashBoardHeader"
                }
              >
                <AddIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSubmit(data?.keyword)}
                  mr={1}
                />
                {data?.keyword}{" "}
                <SmallCloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(data?.id)}
                  ml={1}
                />
              </Badge>
            ))
          ) : (
            <Text fontWeight={500} px={3}>
              {t("description.noSuggKey")}
            </Text>
          )}
        </Flex>
      </Box>
    </>
  )
}
export default SuggestedKeywords
