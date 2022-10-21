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
import { useCreateTeam, useGetTeam } from "services/query/teams"
import useCustomToast from "utils/notifications"
import { useTranslation } from "react-i18next"

const CreateTeamModal = ({
  title = "",
  isCentered = false,
  isOpen,
  onClose,
}) => {
  const { successToast, errorToast } = useCustomToast()

  // queries the endpoint to update the team list
  const { refetch } = useGetTeam()
  const { t } = useTranslation()
  const [teamName, setTeamName] = useState("")

  // queries the endpoint to create a team
  const { mutate: createMutate, isLoading: isCreating } = useCreateTeam({
    onSuccess: () => {
      successToast("Created new team")
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

  // create a team
  const handleCreate = e => {
    e.preventDefault()
    createMutate({
      name: teamName,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleCreate}>
            <Input
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              placeholder={t("description.enterTeam")}
            />
            <Box mx={110} mt={10}>
              <Button
                isLoading={isCreating}
                type="submit"
                colorScheme="teal"
                mr={3}
              >
                {t("description.create")}
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

export default CreateTeamModal
