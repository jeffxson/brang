import React from "react"
import { SearchIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { fields } from "components/Common/constants"
import { useTranslation } from "react-i18next"

const Form = ({ initOnChange, secOnChange, onSubmit, value, helperText }) => {
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box w="full">
      <form onSubmit={onSubmit}>
        <Flex
          justify={"center"}
          gap={6}
          flexDir={["column", "row", "row", "row"]}
        >
          <Select
            placeholder={t("description.selectField")}
            dir={toggle ? "rtl" : "ltr"}
            bg={useColorModeValue(
              "lightMode.dashBoardHeader",
              "darkMode.wHeaderColor"
            )}
            borderRadius="10px"
            ml={["0", "1rem", "1rem", "1rem"]}
            onChange={initOnChange}
          >
            {fields.map((field, index) => (
              <option key={index} value={field.value}>
                {field.label}
              </option>
            ))}
          </Select>
          <InputGroup>
            <Input
              type="text"
              placeholder={t("description.search")}
              dir={toggle ? "rtl" : "ltr"}
              bg={useColorModeValue(
                "lightMode.dashBoardHeader",
                "darkMode.wHeaderColor"
              )}
              borderRadius="10px"
              value={value}
              onChange={secOnChange}
            />
            {toggle ? (
              <InputLeftElement cursor={"pointer"}>
                <Button type="submit" colorScheme="teal" variant="solid">
                  <SearchIcon />
                </Button>
              </InputLeftElement>
            ) : (
              <InputRightElement cursor={"pointer"}>
                <Button type="submit" colorScheme="teal" variant="solid">
                  <SearchIcon />
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
        </Flex>
        <Box textAlign="right" fontSize="13px">
          {helperText}
        </Box>
      </form>
      <Text fontWeight={700} mt={5} ml={3} fontSize="lg">
        {t("description.searchDark")}
      </Text>
    </Box>
  )
}

export default Form
