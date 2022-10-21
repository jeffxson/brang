import React, { useState } from "react"
import { Flex, Box, Text, FormControl, Input, Button } from "@chakra-ui/react"
import { withRouter, useHistory } from "react-router-dom"
import bgImage from "assets/images/bg.png"
import { useSendOtp } from "services/query/auth"
import useCustomToast from "utils/notifications"

const ForgetPasswordPage = () => {
  const history = useHistory()
  const { successToast, errorToast } = useCustomToast()
  const [email, setEmail] = useState("")

  // queries the endpoint to get OTP from backend
  const { mutate, isLoading } = useSendOtp({
    onSuccess: () => {
      successToast("OTP has been sent to your email")
      localStorage.setItem("email", email)
      setTimeout(() => {
        history.push("/verify-otp")
      }, 1000)
    },
    onError: err => {
      errorToast(err?.response?.data?.details || err?.response?.data?.message)
    },
  })

  // executes the command for the OTP to be sent to the user's email
  const handleSendOtp = e => {
    e.preventDefault()
    mutate({ email })
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
          <Box w={["100%", "90%"]} mx="auto">
            <Text
              as="h1"
              size={"lg"}
              color={"black"}
              letterSpacing={"tighter"}
              textAlign="center"
              mt={2}
              mb={2}
              fontSize="36px"
            >
              Reset Password
            </Text>

            <Box display={"flex"} justifyContent="center">
              <Text
                textAlign={["center", "center", "left"]}
                w={"100%"}
                px={[2, 4, 4, 6]}
                color="#1a202c"
                fontSize="13px"
              >
                Don&apos;t worry, Please enter your email below. We will contact
                you to reset a password and set a new one
              </Text>
            </Box>
            <form onSubmit={handleSendOtp}>
              <FormControl mt={6} px={6}>
                <Input
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                  bgColor={"#fff"}
                  color="#000"
                  placeholder="Email"
                />
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                  my={6}
                  variant={"blue"}
                  w="full"
                >
                  Send
                </Button>
              </FormControl>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default withRouter(ForgetPasswordPage)
