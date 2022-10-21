import { useEffect } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  Box,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { useSendImageTakedownEmail } from "services/query/takedown"
import useCustomToast from "utils/notifications"
import { useGetCompanyDetails } from "services/query/takedown"
import { useForm } from "react-hook-form"
import { CaseStudyInput, CustomInput } from "components/CustomInput/CustomInput"

const ImageSearchModalDetails = ({
  data,
  imageLink,
  isCentered = false,
  isOpen,
  onClose,
  title = "",
}) => {
  // queries the endpoint to get company name
  const { data: companyDetails } = useGetCompanyDetails()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if ((companyDetails?.company_name, data, imageLink)) {
      let defaultValues = {}
      defaultValues["THEFT_URL"] = data?.url || ""
      defaultValues["IMAGE_LINK"] = imageLink || ""
      defaultValues["BRAND_NAME"] = companyDetails?.company_name || "loading..."
      reset({ ...defaultValues })
    }
  }, [companyDetails?.company_name, data, imageLink])

  const { successToast } = useCustomToast()

  // queries the endpoint to send image takedown
  const { mutate: sendTakeDown, isLoading } = useSendImageTakedownEmail({
    onSuccess: () => {
      successToast("Email sent successfully")
      reset()
      onClose()
    },
  })

  // sends the takedown
  const onSubmit = values => {
    sendTakeDown(values)
    setTimeout(() => {
      onClose()
    }, 800)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              id="BRAND_NAME"
              label="Brand Name"
              isInvalid={errors?.BRAND_NAME?.message}
              error={{
                ...register("BRAND_NAME", {
                  required: "Brand name is required",
                }),
              }}
              disabled={true}
            />
            <CustomInput
              id="THEFT_BRAND_NAME"
              label="Takedown brand name"
              isInvalid={errors?.THEFT_BRAND_NAME?.message}
              error={{
                ...register("THEFT_BRAND_NAME", {
                  required: "Takedown brand nameis required",
                }),
              }}
              disabled={false}
            />
            <CustomInput
              id="IMAGE_LINK"
              label="Image Link"
              isInvalid={errors?.IMAGE_LINK?.message}
              error={{
                ...register("IMAGE_LINK", {
                  required: "Image Link is required",
                }),
              }}
              disabled={false}
            />
            <CustomInput
              id="RECIPIENT_EMAIL"
              label="Takedown email"
              isInvalid={errors?.RECIPIENT_EMAIL?.message}
              error={{
                ...register("RECIPIENT_EMAIL", {
                  required: "Takedown domain name is required",
                }),
              }}
              disabled={false}
            />
            <CustomInput
              id="THEFT_URL"
              label="Takedown domain name"
              isInvalid={errors?.THEFT_URL?.message}
              error={{
                ...register("THEFT_URL", {
                  required: "Takedown domain name is required",
                }),
              }}
              disabled={false}
            />
            <CaseStudyInput
              id="CASE_STUDY"
              isInvalid={errors?.CASE_STUDY?.message}
              error={{
                ...register("CASE_STUDY", {
                  required: "Select a case study",
                }),
              }}
            />

            <Box mt="10px">
              <Button
                type="submit"
                isLoading={isLoading}
                colorScheme="blue"
                mr={3}
              >
                Send
              </Button>

              <Button disabled={isLoading} onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageSearchModalDetails
