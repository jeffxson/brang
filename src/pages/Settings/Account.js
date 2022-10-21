import React, { useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import useCustomToast from "utils/notifications"
import { useUpdateProfile, useGetUserProfile } from "services/query/settings"
import SettingsLayout from "components/Layouts/SettingsLayout"
import { EditInfo, UserInfo } from "components/CustomInput/SettingsInput"
import { useTranslation } from "react-i18next"

const Account = () => {
  const { t } = useTranslation()

  // queries the endpoint to get user details
  const { data: userData, refetch } = useGetUserProfile()
  const { errorToast, successToast } = useCustomToast()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  // queries the endpoint to update user details
  const { mutate, isLoading: isSubmitting } = useUpdateProfile({
    onSuccess: () => {
      successToast("Update successful")
      setFirstName("")
      setLastName("")
      setEmail("")
      refetch()
    },
    onError: err => {
      errorToast(err.message)
    },
  })

  // updates the profile
  const updateProfileHandler = async event => {
    event.preventDefault()

    mutate({
      first_name: firstName,
      last_name: lastName,
      email,
    })
  }

  return (
    <SettingsLayout title={t("description.account")}>
      <Box fontWeight={600} fontSize="1.5rem">
        {t("description.userInfo")}
      </Box>
      <UserInfo
        text1={t("description.firstName")}
        text2={userData?.first_name}
      />
      <UserInfo text1={t("description.lastName")} text2={userData?.last_name} />
      <UserInfo text1={t("description.email")} text2={userData?.email} />

      <form onSubmit={updateProfileHandler}>
        <Box fontWeight={600} fontSize="1.5rem" mt={"5rem"} mb={5}>
          {t("description.editInfo")}
        </Box>
        <EditInfo
          text1={t("description.firstName")}
          text2={firstName}
          text3={setFirstName}
        />
        <EditInfo
          text1={t("description.lastName")}
          text2={lastName}
          text3={setLastName}
        />
        <EditInfo
          text1={t("description.email")}
          text2={email}
          text3={setEmail}
        />
        <Box mt="2rem">
          <Button
            type="submit"
            variant="teal"
            boxShadow="lg"
            size="md"
            isLoading={isSubmitting}
            height="40px"
            width={["100%", "150px", "150px", "150px"]}
          >
            {t("description.done")}
          </Button>
        </Box>
      </form>
    </SettingsLayout>
  )
}

export default Account
