import React, { useEffect } from "react"
import { Box, Button, useToast, Skeleton } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import SettingsLayout from "components/Layouts/SettingsLayout"
import {
  fetchNotificationsSettings,
  updateNotificationsSettings,
} from "redux/actions/settingsActions"
import { useDispatch, useSelector } from "react-redux"
import useBPFetcher from "utils/fetcher"
import { useTranslation } from "react-i18next"
import { NotificationInput } from "components/CustomInput/CustomInput"

const Notifications = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const toast = useToast()
  const { fetcher } = useBPFetcher()
  const {
    notificationsSettings,
    updateNotificationsLoading,
    fetchNotificationsLoading,
  } = useSelector(state => state).settings
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    reset({
      resource_notification:
        notificationsSettings?.resource_notification || false,
      keyword_notification:
        notificationsSettings?.keyword_notification || false,
      takedown_notification:
        notificationsSettings?.takedown_notification || false,
      email_notification: notificationsSettings?.email_notification || false,
    })
  }, [notificationsSettings])

  // updates notification
  const onSubmit = values => {
    dispatch(updateNotificationsSettings(values, fetcher, toast))
  }

  useEffect(() => {
    dispatch(fetchNotificationsSettings(fetcher))
  }, [])

  return (
    <SettingsLayout title="Notifications">
      <Skeleton isLoaded={!fetchNotificationsLoading} borderRadius="10px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <NotificationInput
            label={t("description.keywordDetected")}
            id="keyword_notification"
            register={register("keyword_notification")}
          />
          <NotificationInput
            label={t("description.resourcesFound")}
            id="resource_notification"
            register={register("resource_notification")}
          />
          <NotificationInput
            label={t("description.widget1")}
            id="takedown_notification"
            register={register("takedown_notification")}
          />
          <NotificationInput
            label={t("description.email")}
            id="email_notification"
            register={register("email_notification")}
          />
          <Box marginTop="25px">
            <Button
              padding="8px 21px"
              isLoading={updateNotificationsLoading}
              type="submit"
              variant="teal"
              mr={3}
            >
              {t("description.save")}
            </Button>
          </Box>
        </form>
      </Skeleton>
    </SettingsLayout>
  )
}

export default Notifications
