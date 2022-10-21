import React from "react"
import {
  Th,
  Text,
  Link,
  Flex,
  Td,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Box,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { trim } from "utils/helpers"
import { useGetJobSearches } from "services/query/dashboard"
import { FaSearch, FaTimes } from "react-icons/fa"

export const ArJobSearchHeader = ({ query, onChange, cancel }) => {
  const { t } = useTranslation()

  return (
    <>
      <Box>
        <InputGroup>
          <InputLeftElement>
            <FaSearch opacity={"0.6"} />
          </InputLeftElement>
          <Input
            placeholder={t("description.searchJob")}
            value={query}
            onChange={onChange}
          />
          <InputRightElement>
            <FaTimes onClick={cancel} />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Text fontWeight={500} px={3}>
        {t("description.jobSearch")}
      </Text>
    </>
  )
}

export const ArJobSearchBody = props => {
  const { secOnClick, link, companyLocation, initOnClick, title } = props
  const { t } = useTranslation()
  const { isFetching } = useGetJobSearches()

  return (
    <>
      <Td fontSize="10px">
        <Flex gap="2rem">
          <Button
            w="4rem"
            h="30px"
            fontSize="10px"
            colorScheme="blue"
            onClick={initOnClick}
          >
            {t("description.takeBtn")}
          </Button>
          <Button
            w="4rem"
            h="30px"
            fontSize="10px"
            colorScheme="red"
            disabled={isFetching}
            onClick={secOnClick}
          >
            {t("description.remove")}
          </Button>
        </Flex>
      </Td>
      <Td fontSize="10px">
        <Link href={link}>{trim(link)}</Link>
      </Td>
      <Td fontSize="10px">{title}</Td>
      <Td fontSize="10px">{companyLocation}</Td>
    </>
  )
}

export const ArJobTableHead = () => {
  const { t } = useTranslation()

  return (
    <>
      <Th></Th>
      <Th fontSize="10px">{t("description.companyLink")}</Th>
      <Th fontSize="10px">{t("description.job")}</Th>
      <Th fontSize="10px">{t("description.companyLocation")}</Th>
    </>
  )
}
