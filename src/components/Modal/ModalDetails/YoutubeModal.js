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
import { useSendYoutubeTakedownEmail } from "services/query/takedown"
import useCustomToast from "utils/notifications"
import { useGetCompanyDetails } from "services/query/takedown"
import { useForm } from "react-hook-form"
import { CaseStudyInput, CustomInput } from "components/CustomInput/CustomInput"
import { useTranslation } from "react-i18next"

const YoutubeTakedownModalDetails = ({
  title = "",
  isOpen,
  onClose,
  isCentered = false,
  data,
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
    if ((companyDetails?.company_name, data)) {
      let defaultValues = {}
      defaultValues["THEFT_URL"] = data?.link || ""
      defaultValues["BRAND_NAME"] = companyDetails?.company_name
      reset({ ...defaultValues })
    }
  }, [companyDetails?.company_name, data])

  const { successToast } = useCustomToast()
  const { t } = useTranslation()

  // queries the endpoint to send youtube takedown
  const { mutate: sendTakeDown, isLoading: isCreateTakedownLoading } =
    useSendYoutubeTakedownEmail({
      onSuccess: () => {
        successToast("Email sent successfully")
        reset()
      },
    })

  // sends youtube takedown
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
              label={t("description.takeHeader1")}
              placeholder={t("description.takeHeader1")}
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
              label={t("description.takeBrandName")}
              placeholder={t("description.takeBrandName")}
              isInvalid={errors?.THEFT_BRAND_NAME?.message}
              error={{
                ...register("THEFT_BRAND_NAME", {
                  required: "Takedown brand name is required",
                }),
              }}
              disabled={false}
            />
            <CustomInput
              id="RECIPIENT_EMAIL"
              label={t("description.takeEmail")}
              placeholder={t("description.takeEmail")}
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
              label={t("description.takeDomain")}
              placeholder={t("description.takeDomain")}
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
                isLoading={isCreateTakedownLoading}
                colorScheme="blue"
                mr={3}
              >
                {t("description.sendBtn")}
              </Button>

              <Button disabled={isCreateTakedownLoading} onClick={onClose}>
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

export default YoutubeTakedownModalDetails
