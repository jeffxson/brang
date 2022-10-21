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
import { useForm } from "react-hook-form"
import {
  useGetCompanyDetails,
  useSendDataLeakTakedownEmail,
} from "services/query/takedown"
import useCustomToast from "utils/notifications"
import { CaseStudyInput, CustomInput } from "components/CustomInput/CustomInput"

const DataLeakModalDetails = ({
  onClose,
  isCentered = false,
  isOpen,
  title = "",
  data,
}) => {
  // queries the endpoint to get th eocmpany name
  const { data: companyDetails } = useGetCompanyDetails()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if (companyDetails?.company_name) {
      let defaultValues = {}
      defaultValues["THEFT_BRAND_NAME"] = data?.site || ""
      defaultValues["LEAKED_INFO"] = data?.query || data || ""
      defaultValues["BRAND_NAME"] = companyDetails?.company_name
      reset({ ...defaultValues })
    }
  }, [companyDetails?.company_name, data])

  const { successToast } = useCustomToast()

  // queries the endpoint to send a data leak
  const { mutate: sendTakeDown, isLoading: isCreateTakedownLoading } =
    useSendDataLeakTakedownEmail({
      onSuccess: res => {
        successToast(res.data?.details)
        reset()
        onClose()
      },
    })

  // executes the command to send takedown
  const onSubmit = values => {
    sendTakeDown(values)
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
              id="LEAKED_INFO"
              label="Leaked Info"
              isInvalid={errors?.LEAKED_INFO?.message}
              error={{
                ...register("LEAKED_INFO", {
                  required: "leaked info is required",
                }),
              }}
              disabled={false}
            />

            <CustomInput
              id="TAKEDOWN_BRAND_NAME"
              label="Takedown brand name"
              isInvalid={errors?.THEFT_BRAND_NAME?.message}
              error={{
                ...register("THEFT_BRAND_NAME", {
                  required: "Takedown brand is required",
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
                  required: "Takedown email is required",
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
                colorScheme="blue"
                mr={3}
                isLoading={isCreateTakedownLoading}
              >
                Send
              </Button>

              <Button disabled={isCreateTakedownLoading} onClick={onClose}>
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

export default DataLeakModalDetails
