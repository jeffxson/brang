import React from "react"
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { FaTimes } from "react-icons/fa"

export const ArInput = props => {
  const { location, initOnClick, secOnClick } = props
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <InputGroup>
      <InputRightElement>
        {location && (
          <FaTimes onClick={initOnClick} cursor={"pointer"} opacity="0.5" />
        )}
      </InputRightElement>
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
    </InputGroup>
  )
}
