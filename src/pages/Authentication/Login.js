import React from "react"
import Logo from "assets/images/favicon.ico"
import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Image,
  FormControl,
  VStack,
  FormLabel,
  HStack,
  Divider,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Link, withRouter } from "react-router-dom"
import bgImage from "assets/images/bg.png"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useLogin } from "services/query/auth"
import useCustomToast from "utils/notifications"
import { saveTokenLocalstorage } from "utils/helpers"
import { setAuthToken } from "services/config"
import { BRAND_PROTECTION_TOKEN_STORAGE_KEY } from "../../config"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { successToast, errorToast } = useCustomToast()

  // queries the endpoint for the POST request in login
  const { mutate, isLoading } = useLogin({
    onSuccess: data => {
      saveTokenLocalstorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY, data?.key)
      setAuthToken(data?.key)
      successToast("Login successful")
      setTimeout(() => {
        data?.user?.is_superuser === true
          ? history.push("/admin-dashboard")
          : history.push("/dashboard")
      }, 1000)
    },
    onError: err => {
      errorToast(
        Object.values(err?.response?.data)[0][0] || err?.response?.data?.message
      )
    },
  })
  const history = useHistory()

  //executes the login command
  const onSubmit = val => {
    let values = {
      ...val,
    }
    mutate(values)
  }

  return (
    <Flex
      flexDirection="column"
      minHeight="calc(100vh - 90px)"
      pt="24px"
      pb="46px"
      justifyContent="center"
      alignItems="center"
      backgroundImage={bgImage}
      backgroundSize="cover"
    >
      <VStack
        spacing={3}
        backgroundColor="lightMode.headerBgColor"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.25)"
        p="10"
        justifyContent="center"
        alignItems="left"
        borderRadius={"20px"}
        minW={{ base: "90%", md: "50%", xl: "25%" }}
      >
        <Box w={{ base: "100%" }} h={{ base: "94px" }} mx="auto">
          <Heading as="h1" size="lg" color={"black"} letterSpacing={"tighter"}>
            <Image mx="auto" src={Logo} />
          </Heading>
        </Box>

        <Heading size="xl" color={"black"}>
          Hi there!
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <FormControl
              variant="floating"
              id="email"
              my={7}
              isInvalid={errors.email}
            >
              <Input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder=" "
                bgColor="lightMode.white"
                borderRadius="10px"
                color={"black"}
              />

              <FormLabel htmlFor="email">Email</FormLabel>
              <FormErrorMessage>
                {" "}
                {errors.email && errors.email.message}{" "}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              variant="floating"
              id="password"
              my={7}
              isInvalid={errors.password}
            >
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder=" "
                bgColor="lightMode.white"
                borderRadius="10px"
                color={"black"}
              />

              <FormLabel htmlFor="password">Password</FormLabel>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box mt="10px">
            <Button
              variant={isLoading ? "solid" : "blue"}
              type="submit"
              w={{ base: "100%" }}
              isLoading={isLoading}
              loadingText={isLoading && "Processing Login..."}
              spinnerPlacement={isLoading && "start"}
            >
              Login
            </Button>
            <HStack my="10px">
              <Box fontSize="12px" color={"black"}>
                Forgot your password?
              </Box>
              <Link to="/forgot-password">
                <Button
                  variant={"unstyled"}
                  color="lightMode.blue"
                  fontSize="12px"
                  fontWeight="700"
                >
                  Reset Password
                </Button>
              </Link>
            </HStack>

            <Divider colorScheme="lightMode.grey3" my={4} />
            <Link to="/register">
              <Button variant="teal" w={{ base: "100%" }}>
                New Customer? Sign Up
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Flex>
  )
}

export default withRouter(Login)
