import React, { useState } from "react"
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import SettingsLayout from "components/Layouts/SettingsLayout"
import GoBack from "components/Common/GoBack"
import { useGetTeamDetails, useGetInvitedTeamList } from "services/query/teams"
import EmptySelection from "components/Common/EmptySelection"
import SendInvite from "components/Modal/Teams/SendInvite"
import CancelInvite from "components/Modal/Teams/CancelInvite"
import DeleteMember from "components/Modal/Teams/DeleteMember"
import { useTranslation } from "react-i18next"
import AddMonitorModal from "components/Modal/Teams/AddMonitorModal"

const TeamInfo = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [deleteModal, setDeleteModal] = useState(false)
  const [inviteId, setInviteId] = useState(false)
  const [sendModal, setSendModal] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const [member, setMember] = useState(null)
  const [monitorModal, setMonitorModal] = useState(false)
  const [monitorData, setMonitorData] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cancelId, setCancelId] = useState("")
  const [refetchId, setrefetchId] = useState("")

  // queries the endpoint to get team members details
  const { data: teamDetails, isLoading } = useGetTeamDetails(id)

  // queries the endpoint to get the invitees list
  const { data: invitedMembersList, isLoading: isTeamLoading } =
    useGetInvitedTeamList(id)
  const dataa = teamDetails?.id
  const [inviteData, setInviteData] = useState(dataa)

  return (
    <SettingsLayout>
      <Box px={5}>
        <Flex justifyContent="space-between">
          <Flex height={"72px"} cursor={"pointer"} alignItems="center">
            <GoBack />
            <Heading fontSize={{ base: "25px", md: "36px" }} my="1em">
              {t("description.teamInfo")}
            </Heading>
          </Flex>
          <Button
            my={[1, 5, 5, 5]}
            onClick={() => {
              setSendModal(true)
              setInviteData(dataa)
              setInviteId(id)
            }}
          >
            {t("description.sendInvite")}
          </Button>
        </Flex>
        <Box px={[1, 10, 10, 10]} my={5}>
          <Box>
            <Flex
              w="100%"
              justifyContent="space-between"
              flexDir={["column", "column", "row", "row"]}
            >
              <Box w={["100%", "100%", "35%", "35%"]} my={5}>
                <Heading my={3} fontSize={{ base: "xl", md: "3xl" }}>
                  {t("description.teamMember")}
                </Heading>
                {isLoading && <Spinner />}
                {teamDetails &&
                  (teamDetails?.members.length > 0 ? (
                    teamDetails?.members?.map((data, i) => (
                      <React.Fragment key={i}>
                        <Flex
                          w="100%"
                          py={2}
                          justifyContent="space-between"
                          flexWrap="wrap"
                          flexDirection={"column"}
                        >
                          <Text mb={3} align="left">
                            {data?.email}
                          </Text>
                          <Flex
                            w="50%"
                            justifyContent="center"
                            flexDir="column"
                          >
                            <Button
                              size="small"
                              fontSize="13px"
                              padding="8px"
                              w="fit-content"
                              onClick={() => {
                                setDeleteModal(true)
                                setDeleteData(id)
                                setMember(data?.id)
                              }}
                            >
                              Remove member
                            </Button>
                            <Button
                              size="small"
                              fontSize="13px"
                              padding="8px"
                              width="fit-content"
                              mt="7px"
                              onClick={() => {
                                setMonitorModal(true)
                                setMonitorData(data?.id)
                              }}
                            >
                              Monitor twitter timeline
                            </Button>
                          </Flex>
                        </Flex>
                      </React.Fragment>
                    ))
                  ) : (
                    <Text>{t("description.noMember")}</Text>
                  ))}
              </Box>
              <Box my={[2, 5, 5, 5]} w={["100%", "35%", "35%", "35%"]}>
                <Heading my={3} fontSize={{ base: "xl", md: "3xl" }}>
                  {t("description.invitees")}
                </Heading>
                {isTeamLoading && <Spinner />}
                {invitedMembersList &&
                  (invitedMembersList?.count > 0 ? (
                    invitedMembersList?.results?.map((data, i) => (
                      <Flex
                        w="100%"
                        py={2}
                        justifyContent="space-between"
                        flexWrap="wrap"
                        flexDirection={"column"}
                        key={i}
                      >
                        <Box>
                          <Text>Email address: {data?.recipient_email}</Text>
                          <Text
                            color={
                              data?.status === "Pending"
                                ? "blue"
                                : data?.status === "Accepted"
                                ? "green"
                                : "red"
                            }
                          >
                            Status: {data?.status}
                          </Text>
                        </Box>
                        <Button
                          size="small"
                          fontSize="13px"
                          padding="8px"
                          width="100px"
                          onClick={() => {
                            onOpen()
                            setCancelId(data?.id)
                            setrefetchId(id)
                          }}
                          disabled={data?.status === "Cancelled"}
                        >
                          Cancel Invite
                        </Button>
                      </Flex>
                    ))
                  ) : (
                    <EmptySelection
                      messageOne={t("description.noInvite")}
                      messageTwo={t("description.sendInvite")}
                    />
                  ))}
              </Box>
            </Flex>
          </Box>
          <SendInvite
            data={inviteData}
            id={inviteId}
            title={t("description.sendInvite")}
            isOpen={sendModal}
            onClose={() => {
              setSendModal(false)
            }}
          />
          <CancelInvite
            id={cancelId}
            data={refetchId}
            title="Cancel Invite"
            isOpen={isOpen}
            onClose={onClose}
          />
          <DeleteMember
            data={deleteData}
            member={member}
            title="Remove Member"
            isOpen={deleteModal}
            onClose={() => setDeleteModal(false)}
          />
          <AddMonitorModal
            data={monitorData}
            title="Add to timeline"
            isOpen={monitorModal}
            onClose={() => {
              setMonitorModal(false)
            }}
          />
        </Box>
      </Box>
    </SettingsLayout>
  )
}

export default TeamInfo
