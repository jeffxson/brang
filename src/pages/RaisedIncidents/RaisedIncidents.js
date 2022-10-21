import React, { useEffect, useState } from "react"
import { Box, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import { useQueryClient } from "react-query"
import {
  useGetPriorityGraph,
  useGetTakedownEmail,
} from "services/query/dashboard"
import {
  useUpdateTakedownEmail,
  useUpdateTakedownPriority,
} from "services/query/takedown"
import MonitorTakedownFilter from "components/data/RaisedIncidents/MonitorTakedownFilter"
import { GET_TAKEDOWN_MAIL } from "utils/queryKey"
import useCustomToast from "utils/notifications"
import { defaultValues } from "utils/helpers"
import { useTranslation } from "react-i18next"
import {
  TableBody,
  TableHeader,
} from "components/data/RaisedIncidents/TableDetails"
import RaisedIncidentModal from "components/Modal/ModalDetails/RaisedIncidentModal"

const RaisedIncidents = () => {
  const queryClient = useQueryClient()
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"
  const { successToast } = useCustomToast()
  const [takedownData, setTakedownData] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filter, setFilter] = useState(defaultValues)

  // queries the endpoint to get list of takedowns and their filter option
  const {
    data: takedown,
    isFetching,
    refetch,
  } = useGetTakedownEmail(
    filter.case_study,
    filter.status,
    filter.priority,
    filter.from_date,
    filter.to_date
  )

  // refetches the graph data
  const { refetch: refetchGraph } = useGetPriorityGraph()

  // queries the endpoint to update the status of the takedown
  const { mutate, isLoading: isUpdateLoading } = useUpdateTakedownEmail({
    onSuccess: () => {
      queryClient.invalidateQueries(GET_TAKEDOWN_MAIL)
      refetch()
    },
  })
  const onConfirmModalClose = () => setIsModalVisible(false)

  // opens up the status modal
  const changeTakedownStatus = data => {
    setTakedownData(data)
    setIsModalVisible(true)
  }

  // updates takedown
  const handleUpdateTakedownStatus = () => {
    const { id, status, case_study } = takedownData
    const formData = new FormData()
    formData.append("id", id)
    formData.append(
      "status",
      status === "processing" ? "complete" : "processing"
    )
    formData.append("case_study", case_study)
    mutate(formData)
    setTimeout(() => {
      onConfirmModalClose()
    }, 500)
  }

  // queries the endpoint to update priority
  const { mutate: updatePriority, isLoading: isPriorityLoading } =
    useUpdateTakedownPriority({
      onSuccess: () => {
        refetch()
        refetchGraph()
        successToast("Priority update successful")
        queryClient.invalidateQueries(GET_TAKEDOWN_MAIL)
      },
    })

  // update priority
  const handlePriorityUpdate = (id, priority) => {
    if (priority) updatePriority({ id, priority })
  }

  useEffect(() => {
    queryClient.invalidateQueries(GET_TAKEDOWN_MAIL)
  }, [])

  return (
    <Box>
      <Box>
        <Box className="xlm" w="full">
          <Flex
            align={toggle ? "flex-end" : "flex-start"}
            flexDir="column"
            justify="space-between"
          >
            <Text fontWeight={700} fontSize="3xl">
              {t("description.raisedP1")}
            </Text>
          </Flex>
          <MonitorTakedownFilter
            handleFilterChange={filterData => {
              setFilter(filterData)
            }}
          />
          <Box
            bg={useColorModeValue(
              "lightMode.dashBoardHeader",
              "darkMode.wHeaderColor"
            )}
            h="45vh"
            borderRadius={"10px"}
            my={5}
          >
            <Flex align={"center"} justify="space-between" px={3} py={1}>
              <Text py={2} fontWeight={700}>
                {t("description.widget1")}
              </Text>
              {isFetching || (isPriorityLoading && <Spinner />)}
            </Flex>
            <Box>
              <TableHeader>
                {takedown?.map((data, i) => {
                  return (
                    <TableBody
                      key={i}
                      brand={data?.takedown_brand_name}
                      status={data?.status}
                      initOnChange={() => changeTakedownStatus(data)}
                      secOnChange={e =>
                        handlePriorityUpdate(
                          data.id,
                          e.target.value.toLowerCase()
                        )
                      }
                      priority={data.priority}
                      caseStudy={data?.case_study}
                      id={data?.id}
                    />
                  )
                })}
              </TableHeader>
            </Box>
          </Box>
        </Box>
      </Box>
      <RaisedIncidentModal
        domainName={takedownData?.domain_name}
        title="Update Takedown Status"
        isOpen={isModalVisible}
        status={takedownData?.status}
        onClick={handleUpdateTakedownStatus}
        onClose={onConfirmModalClose}
        isLoading={isUpdateLoading}
      />
    </Box>
  )
}

export default RaisedIncidents
