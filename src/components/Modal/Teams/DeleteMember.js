import React from "react"
import {
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { useDeleteTeamsMembers, useGetTeamDetails } from "services/query/teams"
import useCustomToast from "utils/notifications"
import { useTranslation } from "react-i18next"

const DeleteMember = ({
  title = "",
  isCentered = false,
  isOpen,
  onClose,
  data,
  member,
}) => {
  const { successToast, errorToast } = useCustomToast()
  const { t } = useTranslation()

  // queries the endpoint to update the list
  const { refetch } = useGetTeamDetails(data)

  // queries the endpoint to remove a member
  const { mutate: deleteMutate, isLoading: isRemoving } = useDeleteTeamsMembers(
    {
      onSuccess: () => {
        successToast("Member Removed")
        setTimeout(() => {
          handleClose()
          refetch()
        }, 500)
      },
      onError: () => {
        errorToast("Something went wrong")
      },
    }
  )

  // remove a team member
  const handleRemove = e => {
    e.preventDefault()
    deleteMutate({
      id: data,
      member: member,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleRemove} mx={2} mt={2}>
            <Text textAlign="center">{t("description.deleteMember")}</Text>

            <Box display="flex" justifyContent="center" mt="4">
              <Button
                isLoading={isRemoving}
                type="submit"
                colorScheme="teal"
                w="80px"
                mx="5px"
              >
                {t("description.remove")}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleClose()}
                w="80px"
                mx="5px"
              >
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

export default DeleteMember
