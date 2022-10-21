import { useState } from "react"
import { Box, Flex, Tr, Spinner, useDisclosure } from "@chakra-ui/react"
import {
  useDeleteYoutubeData,
  useGetYoutubeSearch,
} from "services/query/youtube"
import useCustomToast from "utils/notifications"
import { DeleteAlert } from "components/Modal/DeleteAlert"
import YoutubeTakedownModalDetails from "components/Modal/ModalDetails/YoutubeModal"
import { useTranslation } from "react-i18next"
import TableLayout from "components/data/Youtube/TableLayout"
import { ArTableBody, ArYoutubeHeader } from "locales/AR/Youtube"
import { EnTableBody, EnYoutubeHeader } from "locales/EN/Youtube"

const YoutubeSearch = () => {
  const { errorToast, successToast } = useCustomToast()

  // queries the endpoint to get youtube search data
  const {
    data: youtubeData,
    isLoading: youtubeLoading,
    refetch,
    isFetching,
  } = useGetYoutubeSearch()

  // queries the endpoint to delete youtube data from the lost
  const { mutate, isLoading } = useDeleteYoutubeData({
    onError: err => errorToast(err.message),
    onSuccess: () => {
      refetch()
      setTimeout(() => {
        setShowDeleteModal("")
      }, 500)
      successToast("Deleted successfully")
    },
  })
  const [takeDownData, setTakeDownData] = useState(null)
  const [query, setQuery] = useState("")
  const { i18n } = useTranslation()
  const toggle = i18n?.language === "AR"
  const [showDeleteModal, setShowDeleteModal] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  // delete a youtube
  const handleDelete = () => {
    mutate(showDeleteModal)
  }

  // opens takedown modal
  const handleTakeDown = data => {
    setTakeDownData(data)
    onOpen()
  }

  return (
    <Box>
      <Flex align={"center"} justify="space-between" cursor={"pointer"} mb={2}>
        {toggle ? (
          <ArYoutubeHeader
            query={query}
            onChange={e => setQuery(e.target.value)}
            cancel={() => setQuery("")}
          />
        ) : (
          <EnYoutubeHeader
            query={query}
            onChange={e => setQuery(e.target.value)}
            cancel={() => setQuery("")}
          />
        )}
      </Flex>
      <Box pr="1rem">{isFetching && <Spinner size="md" />}</Box>
      <Box>
        <TableLayout
          toggle={toggle}
          isLoading={youtubeLoading}
          data={youtubeData}
        >
          {youtubeData?.map((data, i) => (
            <Tr key={i} cursor="pointer">
              {toggle ? (
                <ArTableBody
                  remove={() => setShowDeleteModal(data?.id)}
                  takedown={() => handleTakeDown(data)}
                  link={data?.link}
                  title={data?.title}
                  thumbnails={data?.thumbnails}
                  channelName={data?.channel_name}
                />
              ) : (
                <EnTableBody
                  thumbnails={data?.thumbnails}
                  channelName={data?.channel_name}
                  title={data?.title}
                  link={data?.link}
                  takedown={() => handleTakeDown(data)}
                  remove={() => setShowDeleteModal(data?.id)}
                />
              )}
            </Tr>
          ))}
        </TableLayout>
      </Box>
      <YoutubeTakedownModalDetails
        data={takeDownData}
        onClose={onClose}
        isOpen={isOpen}
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

export default YoutubeSearch
