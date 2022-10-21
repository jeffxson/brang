import React, { useRef } from "react"
import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react"
import { withRouter } from "react-router-dom"
import bgImage from "assets/images/bg.png"
import useCustomToast from "utils/notifications"
import { useResetPassword } from "services/query/auth"

const ChangeForgotPassword = () => {
  const { successToast, errorToast } = useCustomToast()
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  // queries the endpoint for the POST request in reset password
  const { mutate, isLoading } = useResetPassword({
    onSuccess: () => {
      successToast("Password successfully updated")
    },
    onError: err => {
      errorToast(err?.response?.data?.details || err?.response?.data?.message)
    },
  })

  // executes the command to reset password
  const handleChangeForgotPassword = e => {
    e.preventDefault()
    const new_password = passwordRef?.current?.value
    const new_password_again = confirmPasswordRef?.current?.value

    mutate({ new_password, new_password_again })
  }

  return (
    <>
      <Flex
        flexDirection="column"
        height="calc(100vh - 90px)"
        justifyContent="center"
        alignItems="center"
        backgroundImage={bgImage}
        backgroundSize="cover"
        w={"100vw"}
      >
        <Flex
          direction={"column"}
          gap={3}
          backgroundColor="lightMode.headerBgColor"
          boxShadow="2px 4px 6px rgba(0, 0, 0, 0.25)"
          justifyContent="center"
          alignItems="left"
          borderRadius={"20px"}
          w={["90%", "60%", "60%", "20%"]}
        >
          <Box
            as="form"
            onSubmit={handleChangeForgotPassword}
            w={["100%", "90%"]}
            mx="auto"
          >
            <FormControl mt={6} px={6}>
              <Input
                mt={4}
                ref={passwordRef}
                color="#000"
                type="text"
                bgColor={"#fff"}
                placeholder="Enter new password"
                _placeholder={{ color: "gray" }}
              />
              <Input
                mt={4}
                color="#000"
                ref={confirmPasswordRef}
                _placeholder={{ color: "gray" }}
                type="text"
                bgColor={"#fff"}
                placeholder="Confirm Password"
              />

              <Button
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                my={6}
                variant={"blue"}
                w="full"
              >
                Change Password
              </Button>
            </FormControl>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default withRouter(ChangeForgotPassword)
