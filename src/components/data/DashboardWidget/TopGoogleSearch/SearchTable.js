import { Button, Flex, Link, Td, Tr } from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { trim } from "utils/helpers"

const SearchTable = ({ link, malicious, initOnClick, secOnClick }) => {
  const { t } = useTranslation()

  return (
    <Tr>
      <Td>
        <Link
          cursor="pointer"
          href={link}
          isExternal
          textDecoration={"none"}
          target="_blank"
          fontSize={"16px"}
        >
          {trim(link)}
        </Link>
      </Td>
      <Td>{malicious}</Td>
      <Td>
        <Flex gap="30px">
          <Button size="sm" onClick={initOnClick} colorScheme="blue">
            {t("description.takeBtn")}
          </Button>
          <Button size="sm" onClick={secOnClick} colorScheme="red">
            {t("description.remove")}
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}

export default SearchTable
