import { useEffect } from "react"
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
  useAddNewKeywords,
  useGetAllMonitoredKeywords,
} from "services/query/dashboard"
import useCustomToast from "utils/notifications"
import { CustomInput } from "components/CustomInput/CustomInput"
import { useTranslation } from "react-i18next"

const AddKeywordsModalDetails = ({ isOpen, handleClose, data }) => {
  const { t } = useTranslation()
  const { successToast } = useCustomToast()

  // refreshes the widget for monitored keyword after a keyword is added
  const { refetch } = useGetAllMonitoredKeywords()

  // queries the endpoint to add a keyword to monitored keywords
  const { mutate: mutateNewKeywords, isLoading: addKeywordLoading } =
    useAddNewKeywords({
      onSuccess: () => {
        successToast("Keyword added successfully")
        handleClose()
        reset()
        refetch()
      },
    })
  useEffect(() => {
    let defaultValues = {}
    defaultValues["keyword"] = data?.keyword || ""
    reset({ ...defaultValues })
  }, [data])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // executes the command to add keyword
  const onSubmit = values => {
    let val = {}
    val.keyword = values.keyword.split(",")
    const keywordsToPost =
      val.keyword.length === 1 ? val.keyword[0] : val.keyword.join(", ")
    mutateNewKeywords({ keyword: keywordsToPost })
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("description.addKey")}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <CustomInput
              id="keyword"
              label={t("description.darkHeader1")}
              isInvalid={errors?.keyword?.message}
              error={{
                ...register("keyword", {
                  required: "Keyword is required",
                }),
              }}
              disabled={false}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              isLoading={addKeywordLoading}
              colorScheme="blue"
              mr={3}
            >
              {t("description.done")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddKeywordsModalDetails
