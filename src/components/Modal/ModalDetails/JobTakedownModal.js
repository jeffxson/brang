import React, { useEffect } from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import {
  useGetCompanyDetails,
  useSendJobTakedown,
} from "services/query/takedown"
import useCustomToast from "utils/notifications"
import { CustomInput, CaseStudyInput } from "components/CustomInput/CustomInput"
import { useTranslation } from "react-i18next"

const JobTakedownModal = ({ isOpen, handleClose, theft_url }) => {
  // queries the endpoint to get the company name
  const { data: companyDetails } = useGetCompanyDetails()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()
  const { successToast } = useCustomToast()

  // queries the endpoint to send job takedown
  const { mutate: sentTakeDownJobEmail, isLoading: isJobTakedownLoading } =
    useSendJobTakedown({
      onSuccess: res => {
        successToast(res.details)
        setTimeout(() => {
          handleClose()
          reset()
        }, 500)
      },
    })

  // sends the takedown
  const onSubmit = values => {
    sentTakeDownJobEmail(values)
  }
  const { t } = useTranslation()

  useEffect(() => {
    setValue("THEFT_URL", theft_url || "")
  }, [theft_url])

  useEffect(() => {
    if (companyDetails?.company_name) {
      let defaultValues = {}
      defaultValues["BRAND_NAME"] = companyDetails?.company_name
      reset({ ...defaultValues })
    }
  }, [companyDetails?.company_name])
  return (
    <Modal
      isOpen={isOpen}
      onClose={sentTakeDownJobEmail ? () => {} : handleClose}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Takedown Job</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
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
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              isLoading={isJobTakedownLoading}
              colorScheme="blue"
              mr={3}
            >
              {t("description.sendBtn")}
            </Button>

            <Button disabled={isJobTakedownLoading} onClick={handleClose}>
              {t("description.cancel")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default JobTakedownModal
