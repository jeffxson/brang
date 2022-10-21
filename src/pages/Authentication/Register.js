import React, { useState } from "react"
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from "@chakra-ui/react"
import bgImage from "assets/images/bg.png"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import Logo from "assets/images/favicon.ico"
import { AddIcon } from "@chakra-ui/icons"
import { useRegisterNewUser } from "services/query/auth"
import {
  CompanyCategory,
  FloatingInput,
} from "components/CustomInput/CustomInput"
import useCustomToast from "utils/notifications"

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    getValues,
    formState: { errors },
  } = useForm()

  const history = useHistory()
  const [domainNames, setDomainNames] = useState([])
  const [domain, setDomain] = useState(false)
  const { successToast, errorToast, infoToast } = useCustomToast()

  // queries the endpoint for the POST request in registering a user
  const { mutate, isLoading } = useRegisterNewUser({
    onSuccess: () => {
      successToast("User created successfully")
      setTimeout(() => {
        history.push("/login")
      }, 1000)
    },
    onError: err => {
      errorToast(
        Object.values(err?.response?.data)[0][0] || err?.response?.data?.message
      )
    },
  })

  // executes the register account command
  const onSubmit = val => {
    let values = {
      ...val,
      domains: domainNames.concat(),
    }
    mutate(values)
  }

  // executes the command to add a domain
  const handleAddDomainName = domain => {
    if (!domainNames.map(dom => dom.toLowerCase()).includes(domain)) {
      if (domainNames.length <= 24) {
        setDomainNames(prev => [...prev, domain])
        setDomain(true)
        resetField("domains")
      } else {
        infoToast("There can be a maximum of 25")
      }
    } else {
      infoToast("Domain Name already exists in the list")
    }
  }

  // removes a domain
  const handleRemoveDomainName = domain => {
    setDomainNames(prev => [...prev.filter(dom => dom !== domain)])
  }

  return (
    <Flex
      flexDirection="column"
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
        w="md"
        marginTop="1.5rem"
        marginBottom="3rem"
      >
        <Box w={{ base: "100%" }} h={{ base: "94px" }} mx="auto">
          <Image mx="auto" src={Logo} />
        </Box>
        <Heading size="xl" color={"black"}>
          Hi there! Sign up.
        </Heading>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FloatingInput
              id="first_name"
              isInvalid={errors.first_name}
              error={{
                ...register("first_name", {
                  required: "First name is required",
                }),
              }}
              label="First Name"
              errorMsg={errors.first_name && errors.first_name.message}
            />

            <FloatingInput
              id="last_name"
              isInvalid={errors.last_name}
              error={{
                ...register("last_name", {
                  required: "Last name is required",
                }),
              }}
              label="Last Name"
              errorMsg={errors.last_name && errors.last_name.message}
            />

            <FloatingInput
              id="email"
              isInvalid={errors.email}
              error={{
                ...register("email", {
                  required: "Email is required",
                }),
              }}
              label="Email"
              errorMsg={errors.email && errors.email.message}
              type="email"
            />

            <FloatingInput
              id="password"
              isInvalid={errors.password}
              error={{
                ...register("password", {
                  required: "Password is required",
                }),
              }}
              label="Password"
              errorMsg={errors.password && errors.password.message}
              type="password"
            />

            <FloatingInput
              id="password2"
              isInvalid={errors.password2}
              error={{
                ...register("password2", {
                  required: "Please confirm your password",
                  validate: value => {
                    const { password } = getValues()
                    return password === value || "Passwords does not match"
                  },
                }),
              }}
              label="Confirm Password"
              errorMsg={errors.password2 && errors.password2.message}
              type="password"
            />

            <FloatingInput
              id="company_name"
              isInvalid={errors.company_name}
              error={{
                ...register("company_name", {
                  required: "Company name is required",
                }),
              }}
              label="Company Name"
              errorMsg={errors.company_name && errors.company_name.message}
            />

            <CompanyCategory
              id="company_category"
              isInvalid={errors.company_category}
              error={{
                ...register("company_category", {
                  required: "Please select a category",
                }),
              }}
            />

            <FloatingInput
              id="business_email"
              isInvalid={errors.business_email}
              error={{
                ...register("business_email", {
                  required: "Business Email is required",
                }),
              }}
              label="Business Email"
              errorMsg={errors.business_email && errors.business_email.message}
              type="email"
            />

            <FloatingInput
              id="job_title"
              isInvalid={errors.job_title}
              error={{
                ...register("job_title", {
                  required: "Job Title is required",
                }),
              }}
              label="Job Title"
              errorMsg={errors.job_title && errors.job_title.message}
            />

            <FloatingInput
              id="country"
              isInvalid={errors.country}
              error={{
                ...register("country", {
                  required: "Country is required",
                }),
              }}
              label="Country"
              errorMsg={errors.country && errors.country.message}
            />

            <FloatingInput
              id="phone"
              isInvalid={errors.phone}
              error={{
                ...register("phone", {
                  required: "Phone Number is required",
                }),
              }}
              label="Phone Number"
              errorMsg={errors.phone && errors.phone.message}
              type="tel"
            />

            <FormControl
              variant="floating"
              id="domains"
              mb={7}
              mt={3}
              isInvalid={errors.domains}
            >
              <InputGroup size="md">
                <Input
                  {...register("domains", {
                    required: !domain && "Domain is required",
                  })}
                  type="text"
                  placeholder=" "
                  bgColor="lightMode.white"
                  borderRadius="10px"
                  color={"black"}
                />
                {watch("domains") && (
                  <InputRightAddon
                    onClick={() => handleAddDomainName(watch("domains"))}
                    onChange={e => setDomainNames(e.target.value)}
                    bgColor="lightMode.white"
                  >
                    <AddIcon />
                  </InputRightAddon>
                )}
              </InputGroup>
              <Box mt={2}>
                <HStack maxWidth={"full"} gap={2} wrap="wrap">
                  {domain &&
                    domainNames.map((domain, idx) => (
                      <Tag
                        size={"sm"}
                        key={idx}
                        variant="solid"
                        colorScheme="teal"
                        borderRadius="full"
                      >
                        <TagLabel>{domain}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleRemoveDomainName(domain)}
                        />
                      </Tag>
                    ))}
                </HStack>
              </Box>
              <FormLabel htmlFor="domains">Domain Name</FormLabel>
              <FormHelperText fontWeight={400} color="lightMode.stepperFont">
                eg: https://brandprotection.org
              </FormHelperText>
              <FormErrorMessage>
                {" "}
                {errors.domains && errors.domains.message}{" "}
              </FormErrorMessage>
            </FormControl>
            <Box mt="10px">
              <Button
                variant={isLoading ? "solid" : "blue"}
                type="submit"
                isLoading={isLoading}
                loadingText={isLoading && "Processing..."}
                spinnerPlacement={isLoading && "start"}
                w={{ base: "100%" }}
              >
                Get me in
              </Button>
              <Divider my="10px" colorScheme="lightMode.grey3" />
              <Link to="/login">
                <Button variant="teal" w={{ base: "100%" }}>
                  Have an account? Log In
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </VStack>
    </Flex>
  )
}

export default Register
