import React from "react"
import {
  FormControl,
  Spinner,
  Flex,
  Input,
  FormErrorMessage,
  Select,
  FormLabel,
  Box,
  Switch,
  Text,
  InputRightElement,
  InputGroup,
  useColorModeValue,
  InputLeftElement,
} from "@chakra-ui/react"
import { useGetAllWebMonitoringData } from "services/query/webMonitoring"
import { caseStudyOptions, categoryListOptions } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { FaTimes } from "react-icons/fa"

export const CustomInput = ({
  id,
  isInvalid,
  disabled,
  label,
  error,
  placeholder,
}) => {
  const { i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <>
      {toggle ? (
        <FormControl id={id} isInvalid={isInvalid} mt={4}>
          <FormLabel dir="rtl">{label}</FormLabel>
          <Input
            dir="rtl"
            {...error}
            disabled={disabled}
            placeholder={placeholder}
          />
          <FormErrorMessage>{isInvalid}</FormErrorMessage>
        </FormControl>
      ) : (
        <FormControl id={id} isInvalid={isInvalid} mt={4}>
          <FormLabel>{label}</FormLabel>
          <Input {...error} disabled={disabled} placeholder={placeholder} />
          <FormErrorMessage>{isInvalid}</FormErrorMessage>
        </FormControl>
      )}
    </>
  )
}

export const NotificationInput = ({ id, register, label }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-end"
      marginBottom="10px"
    >
      <Text>{label}</Text>
      <FormControl id={id} mt={4} width="unset">
        <Switch {...register} id={id} marginBottom="3px" />
      </FormControl>
    </Flex>
  )
}

export const FloatingInput = ({
  id,
  isInvalid,
  error,
  label,
  errorMsg,
  type,
}) => {
  return (
    <FormControl variant="floating" id={id} my={7} isInvalid={isInvalid}>
      <Input
        {...error}
        type={type || "text"}
        bgColor="lightMode.white"
        borderRadius="10px"
        color={"black"}
      />

      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  )
}

export const SocialMediaInput = ({
  onClick,
  onChange,
  placeholder,
  value,
  toggle,
}) => {
  return (
    <InputGroup>
      <Input
        dir={toggle ? "rtl" : "ltr"}
        type="text"
        placeholder={placeholder}
        bg={useColorModeValue(
          "lightMode.dashBoardHeader",
          "darkMode.wHeaderColor"
        )}
        borderRadius="10px"
        value={value}
        onChange={onChange}
      />
      {toggle ? (
        <InputLeftElement>
          <FaTimes onClick={onClick} cursor={"pointer"} opacity="0.5" />
        </InputLeftElement>
      ) : (
        <InputRightElement>
          <FaTimes onClick={onClick} cursor={"pointer"} opacity="0.5" />
        </InputRightElement>
      )}
    </InputGroup>
  )
}

export const CompanyCategory = ({ id, isInvalid, error, label, errorMsg }) => {
  return (
    <FormControl variant="floating" id={id} my={7} isInvalid={isInvalid}>
      <Select
        {...error}
        textTransform="capitalize"
        backgroundColor="#fff"
        placeholder="Select company category"
      >
        {categoryListOptions.map((item, index) => (
          <option
            style={{ textTransform: "capitalize" }}
            key={index}
            value={item}
          >
            {item}
          </option>
        ))}
      </Select>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  )
}

export const CaseStudyInput = ({ isInvalid, id, error }) => {
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <>
      {toggle ? (
        <FormControl id={id} isInvalid={isInvalid} mt={4}>
          <Flex justifyContent="space-between">
            <Box></Box>
            <FormLabel>{t("description.incidentType")}</FormLabel>
          </Flex>
          <Select
            dir="rtl"
            {...error}
            placeholder={t("description.selectOption")}
          >
            {caseStudyOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{isInvalid}</FormErrorMessage>
        </FormControl>
      ) : (
        <FormControl id={id} isInvalid={isInvalid} mt={4}>
          <FormLabel>{t("description.incidentType")}</FormLabel>
          <Select {...error} placeholder={t("description.selectOption")}>
            {caseStudyOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{isInvalid}</FormErrorMessage>
        </FormControl>
      )}
    </>
  )
}

export const DomainOptionsInput = ({
  label,
  id,
  placeholder,
  isInvalid,
  error,
}) => {
  const { i18n } = useTranslation()
  const { data: allWebMonitoringData, isLoading: isDomainLoading } =
    useGetAllWebMonitoringData()
  const toggle = i18n?.language === "AR"

  return (
    <>
      {toggle ? (
        <FormControl id={id} isInvalid={isInvalid} mt={4}>
          <Flex justifyContent="space-between">
            {isDomainLoading && (
              <Spinner
                thickness="2px"
                h={"1.5rem"}
                w={"1.5rem"}
                speed="0.65s"
                emptyColor="gray.200"
                color="lightMode.blue"
                size="md"
              />
            )}
            <Box></Box>
            <FormLabel>{label}</FormLabel>
          </Flex>
          <Select dir="rtl" {...error} placeholder={placeholder}>
            {allWebMonitoringData?.length > 0 ? (
              allWebMonitoringData?.map((data, index) => {
                return <option key={index}>{data.domain_name}</option>
              })
            ) : (
              <option></option>
            )}
          </Select>
          <FormErrorMessage>{isInvalid}</FormErrorMessage>
        </FormControl>
      ) : (
        <FormControl id={id} isInvalid={isInvalid} mt={4}>
          <Flex justifyContent="space-between">
            <FormLabel>{label}</FormLabel>
            {isDomainLoading && (
              <Spinner
                thickness="2px"
                h={"1.5rem"}
                w={"1.5rem"}
                speed="0.65s"
                emptyColor="gray.200"
                color="lightMode.blue"
                size="md"
              />
            )}
          </Flex>
          <Select {...error} placeholder={placeholder}>
            {allWebMonitoringData?.length > 0 ? (
              allWebMonitoringData?.map((data, index) => {
                return <option key={index}>{data.domain_name}</option>
              })
            ) : (
              <option></option>
            )}
          </Select>
          <FormErrorMessage>{isInvalid}</FormErrorMessage>
        </FormControl>
      )}
    </>
  )
}
