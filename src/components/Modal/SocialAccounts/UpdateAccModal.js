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
  Select,
} from "@chakra-ui/react"
import {
  useUpdateSocialAcc,
  useGetSocialAcc,
} from "services/query/socialAccounts"
import useCustomToast from "utils/notifications"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

const fields = [
  {
    label: "Twitter",
    value: "Twitter",
  },
]

const UpdateAccModal = ({
  title = "",
  isCentered = false,
  isOpen,
  onClose,
  data,
}) => {
  const { t } = useTranslation()
  const [handle, setHandle] = useState("")
  const [socialMedia, setSocialMedia] = useState("")
  const { successToast, errorToast } = useCustomToast()

  // queries the endpoint to refetch the list after an account has been update
  const { refetch } = useGetSocialAcc()

  // queries the endpoint to update the social media name
  const { mutate: updateMutate, isLoading: isCreating } = useUpdateSocialAcc({
    onSuccess: () => {
      successToast("Account updated")
      setHandle("")
      setSocialMedia("")
      onClose()
      refetch()
    },
    onError: () => {
      errorToast("Something went wrong")
    },
  })

  // updates the name of the account
  const handleUpdate = e => {
    e.preventDefault()
    updateMutate({
      social_media: socialMedia,
      handle: handle,
      id: data?.id,
    })
  }

  useEffect(() => {
    if (data) {
      setHandle(data?.handle)
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
                Update
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

export default UpdateAccModal
