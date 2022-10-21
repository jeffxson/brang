import React from "react"
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
  Text,
} from "@chakra-ui/react"
import useCustomToast from "utils/notifications"
import {
  useCancelInvitation,
  useGetInvitedTeamList,
} from "services/query/teams"
import { CANCEL_INVITATION } from "utils/queryKey"

const CancelInvite = ({
  title = "",
  isCentered = false,
  isOpen,
  onClose,
  id,
  data,
}) => {
  const { successToast, errorToast } = useCustomToast()

  // queries the endpoint to update the invite list
  const { refetch } = useGetInvitedTeamList(data)

  // queries the endpoint to cancel an invite
  const { mutate: cancelMutate, isLoading: isCancelling } = useCancelInvitation(
    {
      onSuccess: () => {
        successToast("Invite Cancelled")
        setTimeout(() => {
          onClose()
          refetch()
          CANCEL_INVITATION
        }, 500)
      },
      onError: () => {
        errorToast("Sorry something went wrong")
      },
    }
  )

  // cancels an invite
  const handleCancel = () => {
    cancelMutate({
      id,
      status: { status: 2 },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mx={2} mt={2}>
            <Text textAlign="center">
              Are you sure you want to cancel this invitation?
            </Text>

            <Box display="flex" justifyContent="center" mt="4">
              <Button
                isLoading={isCancelling}
                type="submit"
                colorScheme="teal"
                onClick={() => handleCancel()}
                w="80px"
                mx="5px"
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} w="80px" mx="5px">
                Close
              </Button>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CancelInvite
