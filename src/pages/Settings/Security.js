import React from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import SettingsLayout from "components/Layouts/SettingsLayout"
import useCustomToast from "utils/notifications"
import { useTranslation } from "react-i18next"
import { useChangePassword } from "services/query/auth"

const Security = () => {
  const { successToast, errorToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // queries the endpoints to change password
  const { mutate, isLoading } = useChangePassword({
    onSuccess: () => {
      successToast("Password updated successfully")
      reset()
    },
    onError: err => {
      errorToast(
        Object.values(err?.response?.data)[0][0] || err?.response?.data?.message
      )
    },
  })
  const { t } = useTranslation()

  // execute the command to change password
  const onSubmit = val => {
    let values = {
      ...val,
    }
    mutate(values)
  }

  return (
    <SettingsLayout title="Security">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          gap="20px"
          mt={{ base: 7, md: "0" }}
          display={{ base: "block", md: "flex" }}
          alignItems="flex-end"
          marginBottom="15px"
        >
          <Text minWidth="200px">{t("description.oldPassword")}</Text>
          <FormControl
            id="old_password"
            isInvalid={errors.old_password}
            mt={{ base: "0", md: 4 }}
            width="unset"
          >
            <Input
              {...register("old_password", {
                required: "This field is required",
              })}
              type="password"
              borderTop="none"
              borderLeft="none"
              borderRight="none"
              borderRadius="0"
              outline="none"
              _focus={{
                boxShadow: "none",
              }}
            />

            <FormErrorMessage>
              {errors.old_password && errors.old_password.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex
          gap="20px"
          mt={{ base: 7, md: "0" }}
          display={{ base: "block", md: "flex" }}
          alignItems="flex-end"
          marginBottom="15px"
        >
          <Text minWidth="200px">{t("description.newPassword")}</Text>
          <FormControl
            id="new_password"
            isInvalid={errors.new}
            mt={{ base: "0", md: 4 }}
            width="unset"
          >
            <Input
              {...register("new_password", {
                required: "This field is required",
              })}
              type="password"
              borderTop="none"
              borderLeft="none"
              borderRight="none"
              borderRadius="0"
              outline="none"
              _focus={{
                boxShadow: "none",
              }}
            />

            <FormErrorMessage>
              {errors.new_password && errors.new_password.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex
          gap="20px"
          mt={{ base: 7, md: "0" }}
          display={{ base: "block", md: "flex" }}
          alignItems="flex-end"
          marginBottom="15px"
        >
          <Text minWidth="200px">{t("description.confirmPassword")}</Text>
          <FormControl
            id="new_password_again"
            isInvalid={errors.new_password_again}
            mt={{ base: "0", md: 4 }}
            width="unset"
          >
            <Input
              {...register("new_password_again", {
                required: "This field is required",
              })}
              type="password"
              borderTop="none"
              borderLeft="none"
              borderRight="none"
              borderRadius="0"
              outline="none"
              _focus={{
                boxShadow: "none",
              }}
            />

            <FormErrorMessage>
              {errors.new_password_again && errors.new_password_again.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Box marginTop="25px">
          <Button
            padding="8px 21px"
            type="submit"
            variant="teal"
            mr={3}
            isLoading={isLoading}
          >
            {t("description.save")}
          </Button>
        </Box>
      </form>
    </SettingsLayout>
  )
}

export default Security
