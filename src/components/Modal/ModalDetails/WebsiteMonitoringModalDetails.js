import { useForm } from "react-hook-form"
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
import { useGetAllWebMonitoringData } from "services/query/webMonitoring"
import { CustomInput } from "components/CustomInput/CustomInput"
import {
  useAddDomain,
  useGetWebmonitoringDashboard,
} from "services/query/dashboard"
import useCustomToast from "utils/notifications"
import { useTranslation } from "react-i18next"

const WebsiteMonitoringModalDetails = ({
  onClose,
  title = "",
  isCentered = false,
  isOpen,
}) => {
  const { successToast } = useCustomToast()
  const { t } = useTranslation()

  // queries the endpoint to update the web montioring list after a domain is added
  const { refetch: refetchWeb } = useGetWebmonitoringDashboard()
  const { refetch } = useGetAllWebMonitoringData()

  // queries the endpoint to add a domain
  const { mutate: addDomain, isLoading: isDomainLoading } = useAddDomain({
    onSuccess: () => {
      successToast("Domain added successfully")
      reset()
      refetch()
      refetchWeb()
      onClose()
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // adds a domain
  const onSubmit = values => {
    let domains = {}
    domains.domain_name = values.domain_name.split(",")
    const domainsToPost =
      domains.domain_name.length === 1
        ? domains.domain_name[0]
        : domains.domain_name.join(", ")
    addDomain({ domain_name: domainsToPost })
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
              id="domain_name"
              label={t("description.domainName")}
              isInvalid={errors?.domain_name?.message}
              error={{
                ...register("domain_name", {
                  required: "Domain name is required",
                }),
              }}
              disabled={false}
            />

            <Box mt="10px">
              <Button
                type="submit"
                isLoading={isDomainLoading}
                colorScheme="blue"
                mr={3}
              >
                {t("description.done")}
              </Button>
            </Box>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WebsiteMonitoringModalDetails
