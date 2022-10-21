import React from "react"
import useCustomToast from "utils/notifications"
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
} from "@chakra-ui/react"
import {
  useDeleteSocialAcc,
  useGetSocialAcc,
} from "services/query/socialAccounts"
import { useTranslation } from "react-i18next"

const DeleteSocialAccModal = ({
  title = "",
  isCentered = false,
  isOpen,
  onClose,
  data,
}) => {
  const { successToast, errorToast } = useCustomToast()

  // refetches the list after an account is deleted
  const { refetch } = useGetSocialAcc()
  const { t } = useTranslation()

  // queries the endpoint to delete a social media account
  const { mutate: deleteMutate, isLoading: isDeleting } = useDeleteSocialAcc({
    onSuccess: () => {
      successToast("Deleted Successfully")
      setTimeout(() => {
        onClose()
        refetch()
      }, 500)
    },
    onError: () => {
      errorToast("Something went wrong")
    },
  })

  // deletes an account
  const handleDelete = e => {
    e.preventDefault()
    deleteMutate(data?.id)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleDelete}>
            <Text>Are you sure you want to remove this acc?</Text>
            <Box mx={110} mt={10}>
              <Button
                isLoading={isDeleting}
                type="submit"
                colorScheme="teal"
                mr={3}
              >
                {t("description.delete")}
              </Button>
              <Button colorScheme="red" onClick={onClose}>
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

export default DeleteSocialAccModal
