import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Td,
  Text,
  Th,
} from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { FaSearch, FaTimes } from "react-icons/fa"
import { trimID } from "utils/helpers"

export const EnYoutubeHeader = ({ query, cancel, onChange }) => {
  const { t } = useTranslation()

  return (
    <>
      <Text fontWeight={500} px={3}>
        {t("description.youtubeSearch")}
      </Text>
      <Box>
        <InputGroup>
          <InputLeftElement>
            <FaSearch opacity={"0.6"} />
          </InputLeftElement>
          <Input
            placeholder={t("description.search")}
            value={query}
            onChange={onChange}
          />
          <InputRightElement>
            <FaTimes onClick={cancel} />
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  )
}

export const EnTableHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <Th fontSize="10px">{t("description.channel")}</Th>
      <Th textAlign="center" fontSize="10px">
        {t("description.title")}
      </Th>
      <Th textAlign="center" fontSize="10px">
        {t("description.link")}
      </Th>
      <Th></Th>
    </>
  )
}

export const EnTableBody = props => {
  const { link, remove, title, channelName, takedown, thumbnails } = props
  const { t } = useTranslation()

  return (
    <>
      <Td fontSize="10px" pr={1}>
        <Flex flexDir="column">
          <Image h="70px" maxWidth="100px" src={thumbnails} />
          <Text display="flex" alignItems="center" mx={5}>
            {channelName}
          </Text>
        </Flex>
      </Td>
      <Td textAlign="center" fontSize="10px">
        {trimID(title)}
      </Td>
      <Td textAlign="center" fontSize="10px">
        <Link py={4} pl={3} href={link}>
          {trimID(link)}
        </Link>
      </Td>
      <Td>
        <Flex w="103%" pl={10} gap="2rem">
          <Button
            w="4.5rem"
            h="30px"
            fontSize="10px"
            colorScheme={"blue"}
            onClick={takedown}
          >
            {t("description.takeBtn")}
          </Button>
          <Button
            w="4.5rem"
            h="30px"
            fontSize="10px"
            colorScheme={"red"}
            onClick={remove}
          >
            {t("description.remove")}
          </Button>
        </Flex>
      </Td>
    </>
  )
}
