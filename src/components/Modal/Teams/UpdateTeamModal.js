import React, { useState } from "react"
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react"
import useCustomToast from "utils/notifications"
import { useUpdateTeam, useGetTeam } from "services/query/teams"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

const UpdateTeamModal = ({
  title = "",
  isCentered = false,
  isOpen,
  onClose,
  data,
}) => {
  const { successToast, errorToast } = useCustomToast()

  // queries the endpoint to update the team list
  const { refetch } = useGetTeam()
  const { t } = useTranslation()
  const [teamName, setTeamName] = useState("")

  // queries the endpoint to update a team name
  const { mutate: updateMutate, isLoading: isUpdating } = useUpdateTeam({
    onSuccess: () => {
      successToast("Updated Successfully")
      setTeamName("")
      setTimeout(() => {
        onClose()
        refetch()
      }, 500)
    },
    onError: () => {
      errorToast("Something went wrong")
    },
  })

  // udpate team name
  const handleUpdate = e => {
    e.preventDefault()
    updateMutate({
      name: teamName,
      id: data?.id,
    })
  }
  useEffect(() => {
    if (data) {
      setTeamName(data?.name)
    }
  }, [data])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleUpdate}>
            <Input
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              placeholder="Enter Team Name"
            />
            <Box mx={110} mt={10}>
              <Button
                isLoading={isUpdating}
                type="submit"
                colorScheme="teal"
                mr={3}
              >
                {t("description.update")}
              </Button>
              <Button colorScheme="red" onClick={() => handleClose()}>
                {t("description.cancel")}
              </Button>
            </Box>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateTeamModal
