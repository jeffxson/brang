import { Button, Flex, Link, Td, Tr } from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { formatNews } from "utils/helpers"

const NewsTable = ({ link, malicious, onClick, date }) => {
  const { t } = useTranslation()

  return (
    <Tr cursor="pointer">
      <Td>Keyword Here</Td>
      <Td>
        <Link
          href={link}
          isExternal
          textDecoration={"none"}
          target="_blank"
          fontSize={"16px"}
        >
          {formatNews(link)}
        </Link>
      </Td>
      <Td>{malicious}</Td>
      <Td>{date}</Td>
      <Td gap={5}>
        <Flex gap={5}>
          <Button
            w="4.5rem"
            h="30px"
            fontSize="10px"
            colorScheme="blue"
            onClick={onClick}
          >
            {t("description.takeBtn")}
          </Button>
          <Button
            w="4.5rem"
            h="30px"
            fontSize="10px"
            colorScheme="red"
            onClick={() => console.log(`${formatNews(link)} will be removed`)}
          >
            {t("description.remove")}
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}

export default NewsTable
