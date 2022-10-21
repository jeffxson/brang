import React, { useEffect } from "react"
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
import { CaseStudyInput, CustomInput } from "components/CustomInput/CustomInput"
import { useTranslation } from "react-i18next"
import {
  useGetCompanyDetails,
  useSendDarkwebTakedownEmail,
} from "services/query/takedown"
import { useForm } from "react-hook-form"
import useCustomToast from "utils/notifications"

const DarkwebModal = ({
  onClose,
  isCentered = false,
  isOpen,
  title = "",
  data,
  theft_data,
}) => {
  // queries the endpoint to get company name
  const { data: companyDetails } = useGetCompanyDetails()
  const { successToast } = useCustomToast()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // queries the endpoint to send darkweb takedown
  const { mutate: sendTakeDown, isLoading: isCreateTakedownLoading } =
    useSendDarkwebTakedownEmail({
      onSuccess: res => {
        successToast(res.data?.details)
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

  useEffect(() => {
    if (companyDetails?.company_name) {
      let defaultValues = {}
      defaultValues["THEFT_BRAND_NAME"] = data?.site || ""
      defaultValues["THEFT_DATA"] = theft_data || ""
      defaultValues["BRAND_NAME"] = companyDetails?.company_name
      reset({ ...defaultValues })
    }
  }, [companyDetails?.company_name, data])

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
              id="THEFT_DATA"
              label="Keyword"
              placeholder="Keyword"
              isInvalid={errors?.THEFT_DATA?.message}
              error={{
                ...register("THEFT_DATA", {
                  required: "Keyword is required",
                }),
              }}
              disabled={false}
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
                disabled={isCreateTakedownLoading}
                isLoading={isCreateTakedownLoading}
                colorScheme="blue"
                mr={3}
              >
                {t("description.sendBtn")}
              </Button>

              <Button onClick={onClose}>{t("description.cancel")}</Button>
            </Box>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DarkwebModal
