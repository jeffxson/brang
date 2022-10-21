import React, { useState } from "react"
import SettingsLayout from "components/Layouts/SettingsLayout"
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react"
import { Link as ReachLink } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"
import CreatTeamModal from "components/Modal/Teams/CreateTeamModal"
import { useGetTeam } from "services/query/teams"
import UpdateTeam from "components/Modal/Teams/UpdateTeamModal"
import DeleteTeamModal from "components/Modal/Teams/DeleteTeamModal"
import { useTranslation } from "react-i18next"

const Teams = () => {
  // queries the endpoint to get the team list
  const { data: teamList, isLoading } = useGetTeam()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const [updateData, setUpdateData] = useState(null)
  const { t } = useTranslation()

  // opens up the modal
  const handleCreate = () => {
    onOpen()
  }

  return (
    <SettingsLayout>
      <Box px={5}>
        <Flex justifyContent="space-between">
          <Heading>{t("description.team")}</Heading>
          <Button my={5} onClick={() => handleCreate()}>
            {t("description.createTeam")}
          </Button>
        </Flex>
        <Box width={["100%", "100%", "72%", "100%"]}>
          <Box fontSize="20px" my={5}>
            {isLoading && <Spinner />}
            {teamList &&
              teamList?.results?.map((data, i) => (
                <Flex
                  py={5}
                  alignItems="center"
                  _hover={{ boxShadow: "lg", height: "40px" }}
                  key={i}
                  w="100%"
                  justifyContent="space-between"
                >
                  <Box cursor="pointer" w="70%">
                    <Text
                      bg="lightMode.teal"
                      p={1}
                      px={3}
                      borderRadius="5px"
                      as={ReachLink}
                      to={`/settings/team/${data.id}`}
                    >
                      {data?.name}
                    </Text>
                  </Box>
                  <Box
                    cursor="pointer"
                    onClick={() => {
                      setUpdateModal(true)
                      setUpdateData(data)
                    }}
                  >
                    <FaEdit color="blue" />
                  </Box>
                  <Box
                    cursor="pointer"
                    onClick={() => {
                      setDeleteModal(true)
                      setDeleteData(data)
                    }}
                  >
                    <FaTrash color="red" />
                  </Box>
                </Flex>
              ))}
          </Box>
        </Box>
        <CreatTeamModal
          title={t("description.createTeam")}
          isOpen={isOpen}
          onClose={onClose}
        />
        <UpdateTeam
          data={updateData}
          title="Update Team"
          isOpen={updateModal}
          onClose={() => {
            setUpdateModal(false)
          }}
        />
        <DeleteTeamModal
          data={deleteData}
          title="Delete Team"
          isOpen={deleteModal}
          onClose={() => {
            setDeleteModal(false)
          }}
        />
      </Box>
    </SettingsLayout>
  )
}

export default Teams
