import React, { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Input,
  Select,
} from "@chakra-ui/react"
import {
  useCreateSocialAcc,
  useGetSocialAcc,
} from "services/query/socialAccounts"
import useCustomToast from "utils/notifications"
import { useTranslation } from "react-i18next"

const fields = [
  {
    label: "Twitter",
    value: "Twitter",
  },
]

const CreateAccModal = ({
  isOpen,
  onClose,
  isCentered = false,
  title = "",
}) => {
  const { successToast, errorToast } = useCustomToast()

  // refetches the list when an account is added
  const { refetch } = useGetSocialAcc()
  const { t } = useTranslation()
  const [handle, setHandle] = useState("")
  const [socialMedia, setSocialMedia] = useState("")

  // queries the endpoint to create a social media account to be monitored
  const { mutate: createMutate, isLoading: isCreating } = useCreateSocialAcc({
    onSuccess: () => {
      successToast("Account added")
      setHandle("")
      setSocialMedia("")
      setTimeout(() => {
        onClose()
        refetch()
      }, 500)
    },
    onError: () => {
      errorToast("Something went wrong")
    },
  })

  // creates the account
  const handleCreate = e => {
    e.preventDefault()
    createMutate({
      social_media: socialMedia,
      handle: handle,
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
            <Select
              placeholder={t("description.selectOption")}
              my={5}
              onChange={e => setSocialMedia(e.target.value)}
            >
              {fields.map((field, index) => (
                <option key={index} value={field.value}>
                  {field.label}
                </option>
              ))}
            </Select>
            <Input
              value={handle}
              onChange={e => setHandle(e.target.value)}
              placeholder="Enter username"
            />
            <Box mx={110} mt={10}>
              <Button
                isLoading={isCreating}
                type="submit"
                w="5rem"
                colorScheme="teal"
                mr={3}
              >
                Add
              </Button>
              <Button w="5rem" colorScheme="red" onClick={onClose}>
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

export default CreateAccModal
