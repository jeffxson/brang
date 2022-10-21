import React, { useState } from "react"
import {
  Box,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react"
import { withRouter } from "react-router-dom"
import { useGetJobSearches } from "services/query/dashboard"
import TableLoader from "components/Common/TableLoader"
import { scrollBarStyle } from "utils/helpers"
import JobTakedownModal from "components/Modal/ModalDetails/JobTakedownModal"
import { useRemoveJobSearch } from "services/query/jobSearch"
import useCustomToast from "utils/notifications"
import { DeleteAlert } from "components/Modal/DeleteAlert"
import { useTranslation } from "react-i18next"
import {
  ArJobSearchBody,
  ArJobSearchHeader,
  ArJobTableHead,
} from "locales/AR/JobSearch"
import {
  EnJobTableHeader,
  EnJobSearchHeader,
  EnJobSearchBody,
} from "locales/EN/JobSearch"

const JobSearches = () => {
  const { errorToast, successToast } = useCustomToast()
  const { colorMode } = useColorMode()
  const [query, setQuery] = useState("")

  // queries the endpoint to get job search data
  const {
    data: jobSearches,
    isLoading: isJobSearchLoading,
    refetch,
    isFetching,
  } = useGetJobSearches()

  // queries the endpoint to remove a job from the list
  const { mutate, isLoading } = useRemoveJobSearch({
    onSuccess: () => {
      refetch()
      successToast("Deleted successfully")
      closeDeleteModal()
    },
    onError: err => {
      errorToast(err?.response?.data?.message)
    },
  })
  const [isOpen, setIsOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    id: "",
  })
  const [theft_url, setTheftUrl] = useState("")

  // opens up the takedown modal
  const takeDownJobPost = (e, job) => {
    e.stopPropagation()
    setIsOpen(true)
    setTheftUrl(job.link)
  }

  // delete a job
  const handleDelete = () => {
    mutate({ job_id: showDeleteModal.id })
  }

  const closeDeleteModal = () => {
    setShowDeleteModal({ show: false, id: "" })
  }
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <>
      <Box>
        {isJobSearchLoading ? (
          <TableLoader />
        ) : (
          <>
            <JobTakedownModal
              theft_url={theft_url}
              isOpen={isOpen}
              handleClose={() => setIsOpen(false)}
            />
            <Flex
              align={"center"}
              justify="space-between"
              cursor={"pointer"}
              flexDir={["column", "column", "row", "row"]}
              mb={2}
            >
              {toggle ? (
                <ArJobSearchHeader
                  query={query}
                  onChange={e => setQuery(e.target.value)}
                  cancel={() => setQuery("")}
                  opacity={0.6}
                />
              ) : (
                <EnJobSearchHeader
                  query={query}
                  onChange={e => setQuery(e.target.value)}
                  cancel={() => setQuery("")}
                />
              )}
            </Flex>
            {isFetching && (
              <Box>
                <Spinner size="sm" />
              </Box>
            )}
            <Text
              textAlign={toggle ? "end" : "start"}
              fontWeight={500}
              mb={5}
              px={3}
            >
              {jobSearches?.map(data => data?.company_name)[0]}
            </Text>
            <Box>
              <TableContainer
                bg={
                  colorMode === "light"
                    ? "lightMode.white"
                    : "darkMode.wBgColor"
                }
                sx={scrollBarStyle}
                borderRadius={"20px"}
                boxShadow="lg"
                overflowX={"auto"}
                width="100%"
                fontWeight={400}
                height="70vh"
                overflowY="scroll"
              >
                <Table variant="simple" size={"sm"}>
                  <Thead
                    position={"sticky"}
                    zIndex="2"
                    top="0"
                    bgColor={colorMode === "light" ? "#f3f3f3" : "gray.700"}
                  >
                    <Tr>
                      {toggle ? <ArJobTableHead /> : <EnJobTableHeader />}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {jobSearches?.length > 0 ? (
                      jobSearches?.map(data => {
                        return (
                          <Tr fontSize={"14px"} key={data?.id}>
                            {toggle ? (
                              <ArJobSearchBody
                                initOnClick={e => takeDownJobPost(e, data)}
                                secOnClick={e => {
                                  e.stopPropagation()
                                  setShowDeleteModal({
                                    show: true,
                                    id: data?.id,
                                  })
                                }}
                                title={data?.title}
                                companyLocation={data?.company_location}
                                link={data?.link}
                              />
                            ) : (
                              <EnJobSearchBody
                                initOnClick={e => takeDownJobPost(e, data)}
                                secOnClick={e => {
                                  e.stopPropagation()
                                  setShowDeleteModal({
                                    show: true,
                                    id: data?.id,
                                  })
                                }}
                                title={data?.title}
                                companyLocation={data?.company_location}
                                link={data?.link}
                              />
                            )}
                          </Tr>
                        )
                      })
                    ) : (
                      <Tr>
                        <Td colSpan={4} rowSpan={2}>
                          <Text my={6} textAlign={"center"}>
                            {t("description.noJob")}
                          </Text>
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>

      <DeleteAlert
        isOpen={showDeleteModal.show}
        handleClose={() => {
          setShowDeleteModal(false)
        }}
        loading={isLoading}
        action={handleDelete}
      />
    </>
  )
}

export default withRouter(JobSearches)
