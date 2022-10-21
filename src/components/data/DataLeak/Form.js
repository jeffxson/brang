import { SearchIcon } from "@chakra-ui/icons"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"

const Form = ({ onSubmit, onChange, value }) => {
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <form onSubmit={onSubmit}>
      <InputGroup>
        {toggle ? (
          <InputLeftElement
            cursor={"pointer"}
            dir="rtl"
            // eslint-disable-next-line react/no-children-prop
            children={
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                dir="rtl"
              >
                <SearchIcon color={"lightMode.white"} />
              </Button>
            }
          />
        ) : (
          <InputRightElement
            cursor={"pointer"}
            // eslint-disable-next-line react/no-children-prop
            children={
              <Button type="submit" colorScheme="teal" variant="solid">
                <SearchIcon color={"lightMode.white"} />
              </Button>
            }
          />
        )}

        <Input
          type="text"
          placeholder={t("description.search")}
          _placeholder={{ float: toggle ? "right" : "else" }}
          bg={useColorModeValue(
            "lightMode.dashBoardHeader",
            "darkMode.wHeaderColor"
          )}
          borderRadius="10px"
          value={value}
          onChange={onChange}
        />
      </InputGroup>
    </form>
  )
}

export default Form
