import React, { useEffect } from "react"
import {
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { MenuIcon } from "../../utils/createIcon"
import DummyImg from "../../assets/images/takedown-dummy.png"
import { useForm } from "react-hook-form"
import { useGetCompanyDetails } from "services/query/takedown"
import {
  CustomInput,
  CaseStudyInput,
  DomainOptionsInput,
} from "components/CustomInput/CustomInput"
import { useSendTakedownEmail } from "services/query/takedown"
import { useTranslation } from "react-i18next"

const Takedown = () => {
  // queries the endpoint to get company name
  const { data: companyDetails } = useGetCompanyDetails()
  const { colorMode } = useColorMode()

  // queries the endpoint to send takedown email
  const { mutate: sendTakeDown, isLoading: isTakedownLoading } =
    useSendTakedownEmail({
      onSuccess: res => {
        successToast(res.data?.details)
        reset()
      },
    })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // send takedown
  const onSubmit = values => {
    sendTakeDown(values)
  }

  useEffect(() => {
    if (companyDetails?.company_name) {
      let defaultValues = {}
      defaultValues["BRAND_NAME"] = companyDetails?.company_name
      reset({ ...defaultValues })
    }
  }, [companyDetails?.company_name])

  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box width="100%">
      <Flex
        align={toggle ? "flex-end" : "flex-start"}
        flexDir="column"
        justify="space-between"
        my="5"
      >
        <Box>
          <Text
            fontWeight={700}
            fontSize="3xl"
            color={useColorModeValue(
              "lightMode.pageTitle",
              "lightMode.dashBoardHeader"
            )}
          >
            {t("description.addEmail")}
          </Text>
        </Box>

        <Box width={["100%", "100%", "80%", "80%"]}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box pb={6}>
              <CustomInput
                id="BRAND_NAME"
                label={t("description.takeHeader1")}
                placeholder={t("description.takeHeader1")}
                isInvalid={errors?.BRAND_NAME?.message}
                error={{
                  ...register("BRAND_NAME", {
                    required: "Brand name is required",
                  }),
                }}
                disabled={true}
              />
              <DomainOptionsInput
                id="DOMAIN_NAME"
                placeholder={t("description.selectOption")}
                isInvalid={errors?.DOMAIN_NAME?.message}
                label={t("description.domainName")}
                error={{
                  ...register("DOMAIN_NAME", {
                    required: "Select a domain name",
                  }),
                }}
              />

              <CustomInput
                id="THEFT_BRAND_NAME"
                label={t("description.takeBrandName")}
                placeholder={t("description.takeBrandName")}
                isInvalid={errors?.THEFT_BRAND_NAME?.message}
                error={{
                  ...register("THEFT_BRAND_NAME", {
                    required: "Takedown brand name is required",
                  }),
                }}
                disabled={false}
              />
              <CustomInput
                id="RECIPIENT_EMAIL"
                label={t("description.takeEmail")}
                placeholder={t("description.takeEmail")}
                isInvalid={errors?.RECIPIENT_EMAIL?.message}
                error={{
                  ...register("RECIPIENT_EMAIL", {
                    required: "Takedown domain name is required",
                  }),
                }}
                disabled={false}
              />
              <CustomInput
                id="THEFT_URL"
                label={t("description.takeDomain")}
                placeholder={t("description.takeDomain")}
                isInvalid={errors?.THEFT_URL?.message}
                error={{
                  ...register("THEFT_URL", {
                    required: "Takedown domain name is required",
                  }),
                }}
                disabled={false}
              />
              <CaseStudyInput
                id="CASE_STUDY"
                isInvalid={errors?.CASE_STUDY?.message}
                error={{
                  ...register("CASE_STUDY", {
                    required: "Select a case study",
                  }),
                }}
              />
            </Box>

            <Box>
              <Button
                type="submit"
                isLoading={isTakedownLoading}
                colorScheme="blue"
                mr={3}
              >
                {t("description.sendBtn")}
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>

      {false && (
        <Skeleton width="100%" isLoaded={!false} borderRadius="10px">
          <Box
            height="100%"
            bg={
              colorMode === "light"
                ? "lightMode.dashBoardHeader"
                : "darkMode.wHeaderColor"
            }
            borderRadius={"10px"}
            boxShadow="md"
            marginTop="30px"
          >
            <Flex align={"center"} justify="space-between" py={1}>
              <Text fontWeight={500} px={3}>
                Domain Takedowns
              </Text>
              <MenuIcon mt={3} w="8" h="8" />
            </Flex>
            <Box
              bg={
                colorMode === "light" ? "lightMode.white" : "darkMode.wBgColor"
              }
              borderRadius={"10px"}
            >
              <TableContainer fontWeight={400}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Site Picture</Th>
                      <Th>Link</Th>
                      <Th>Status</Th>
                      <Th>Case Study</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Image maxWidth="140px" src={DummyImg} alt="site pic" />
                      </Td>
                      <Td>twitter.com</Td>
                      <Td>In Progress</Td>
                      <Td>Bad Comment</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Skeleton>
      )}
    </Box>
  )
}

export default Takedown
