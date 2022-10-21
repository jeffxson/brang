import React from "react"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { FaTimes } from "react-icons/fa"

export const EnInput = props => {
  const { location, initOnClick, isLoading, secOnClick } = props
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <InputGroup>
      <InputLeftElement>
        {location && (
          <FaTimes onClick={initOnClick} cursor={"pointer"} opacity="0.5" />
        )}
      </InputLeftElement>
      <Input
        type="text"
        bg={useColorModeValue(
          "lightMode.dashBoardHeader",
          "darkMode.wHeaderColor"
        )}
        border="1px"
        width={["100%", "100%", "70%", "100%"]}
        borderColor="rgba(0, 0, 0, 0.25)"
        placeholder={t("description.companyName")}
        _placeholder={{
          fontWeight: 600,
          textAlign: toggle ? "end" : "start",
          opacity: 1,
          color: "gray.500",
        }}
        value={location}
        onChange={secOnClick}
      />
      <InputRightElement>{isLoading && <Spinner />}</InputRightElement>
    </InputGroup>
  )
}
