import React, { useRef } from "react"
import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react"
import { withRouter, useHistory } from "react-router-dom"
import bgImage from "assets/images/bg.png"
import { useVerifyOtp } from "services/query/auth"
import useCustomToast from "utils/notifications"

const VerifyOtp = () => {
  const history = useHistory()
  const { successToast, errorToast } = useCustomToast()
  const inputRef = useRef(null)
  const email = localStorage.getItem("email")

  // queries the endpoint to verify OTP POST request
  const { mutate, isLoading } = useVerifyOtp({
    onSuccess: res => {
      successToast("OTP has been verified")
      localStorage.setItem("otp_response", res)
      setTimeout(() => {
        history.push("/change-forgot-password")
      }, 1000)
    },
    onError: err => {
      errorToast(err?.response?.data?.details || err?.response?.data?.message)
    },
  })

  // verifies OTP
  const handleVerifyOtp = () => {
    const otp = inputRef?.current?.value
    mutate({ email, otp })
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
              Confirm OTP
            </Text>

            <Box display={"flex"} justifyContent="center">
              <Text
                textAlign={["center", "center", "left"]}
                w={"100%"}
                px={[2, 4, 4, 6]}
                color="#1a202c"
                fontSize="13px"
              >
                Please enter the OTP you received.
              </Text>
            </Box>

            <FormControl mt={6} px={6}>
              <Input
                ref={inputRef}
                type="text"
                color="#000"
                bgColor={"#fff"}
                placeholder="123456"
              />
              <Button
                onClick={handleVerifyOtp}
                isLoading={isLoading}
                disabled={isLoading}
                my={6}
                variant={"blue"}
                w="full"
              >
                Confirm OTP
              </Button>
            </FormControl>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default withRouter(VerifyOtp)
