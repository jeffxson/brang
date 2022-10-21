import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Text,
  ModalFooter,
  ModalBody,
  Button,
  Box,
  ModalCloseButton,
} from "@chakra-ui/react"

const RaisedIncidentModal = ({
  status,
  onClick,
  onClose,
  isOpen,
  isCentered = false,
  title = "",
  domainName,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to update{" "}
          <Text as="span" fontWeight={"semibold"}>
            {domainName}
          </Text>{" "}
          from{" "}
          <Text as="span" fontWeight={"semibold"}>
            {status}
          </Text>{" "}
          to{" "}
          <Text as={"span"} fontWeight="semibold">
            {status === "processing" ? "completed" : "processing"}?
          </Text>
          <Flex justify={"flex-end"} mt={6} mb={"-4"}>
            <Box display={"flex"} gap={2}>
              <Button disabled={isLoading} onClick={onClose}>
                Close
              </Button>
              <Button
                loadingText="Updating"
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={onClick}
                variant={"blue"}
              >
                Update
              </Button>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RaisedIncidentModal
