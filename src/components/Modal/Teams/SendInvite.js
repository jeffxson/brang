import React, { useState } from "react"
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react"
import useCustomToast from "utils/notifications"
import { useSendInvite, useGetInvitedTeamList } from "services/query/teams"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

const SendInvite = ({
  title = "",
  isCentered = false,
  isOpen,
  data,
  onClose,
  id,
}) => {
  const { t } = useTranslation()

  // queries the endpoint to update the invite list
  const { refetch } = useGetInvitedTeamList(id)
  const { successToast, errorToast } = useCustomToast()
  const [teamName, setTeamName] = useState("")
  const [email, setEmail] = useState("")

  // queries the endpoint to send an invite
  const { mutate: inviteMutate, isLoading: isSending } = useSendInvite({
    onSuccess: () => {
      successToast("Invite Sent")
      setEmail("")
      setTeamName("")
      setTimeout(() => {
        onClose()
        refetch()
      }, 500)
    },
    onError: err => {
      errorToast(Object.values(err?.response?.data)[0][0])
    },
  })

  // send an invite
  const handleSend = e => {
    e.preventDefault()
    inviteMutate({
      recipient_email: email,
      team: data,
    })
  }

  useEffect(() => {
    if (data) {
      setTeamName(data)
    }
  }, [data])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSend}>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Recipient Email"
            />
            <Input display="none" my={5} isDisabled value={teamName} />
            <Box mx={119} mt={10}>
              <Button
                isLoading={isSending}
                type="submit"
                colorScheme="teal"
                mr={3}
              >
                {t("description.send")}
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

export default SendInvite
