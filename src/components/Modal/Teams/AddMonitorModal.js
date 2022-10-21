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
import { useMonitorUser } from "services/query/teams"
import { useTranslation } from "react-i18next"

const AddMonitorModal = ({
  title = "",
  isCentered = false,
  isOpen,
  onClose,
  data,
}) => {
  const { successToast, errorToast } = useCustomToast()
  const { t } = useTranslation()
  const [position, setPosition] = useState("")
  const [id, setId] = useState(data)

  // queries the endpoint to monitor a user
  const { mutate, isLoading: isUpdating } = useMonitorUser({
    onSuccess: () => {
      successToast("Updated Successfully")
      setPosition("")
      setTimeout(() => {
        onClose()
      }, 500)
    },
    onError: () => {
      errorToast("Something went wrong")
    },
  })

  // monitors a user
  const handleMonitor = e => {
    e.preventDefault()
    mutate({
      label: position,
      monitored_user: id,
    })
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleMonitor}>
            <Input
              value={position}
              onChange={e => setPosition(e.target.value)}
              placeholder="Enter Member's position"
            />
            <Input
              value={id || data}
              my={5}
              display="none"
              onChange={e => setId(e.target.value)}
              isDisabled
            />
            <Box mx={110} mt={10}>
              <Button
                isLoading={isUpdating}
                type="submit"
                colorScheme="teal"
                mr={3}
              >
                {t("description.create")}
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

export default AddMonitorModal
