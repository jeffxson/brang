import React from "react"
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Td,
  Text,
  Th,
  Tr,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { FaTimes } from "react-icons/fa"

export const EnHeader = props => {
  const { label, onChange, onClick, search } = props
  const { t } = useTranslation()

  return (
    <>
      <Box>
        <InputGroup>
          <Input
            dir="rtl"
            value={search}
            onChange={onChange}
            placeholder={t("description.appHeader1")}
          />
          <InputLeftElement>
            {search && (
              <FaTimes onClick={onClick} cursor={"pointer"} opacity={0.8} />
            )}
          </InputLeftElement>
        </InputGroup>
      </Box>
      <Text fontWeight={500} fontSize="1.2rem" px={3}>
        {label}
      </Text>
    </>
  )
}

export const EnTableHeader = props => {
  const { initHeader, secHeader } = props
  return (
    <>
      <Th>{initHeader}</Th>
      <Th>{secHeader}</Th>
      <Th></Th>
    </>
  )
}

export const EnTableBody = props => {
  const { initonClick, secOnClick, data, takedown, remove, link, src, app } =
    props
  return (
    <>
      <Td fontSize="10px">
        <Flex>
          <Image h="70px" src={src} />
          <Text display="flex" alignItems="center" mx={5}>
            {app}
          </Text>
        </Flex>
      </Td>
      <Td fontSize="10px">
        <Link href={link}>{link}</Link>
      </Td>
      {data?.id === undefined ? (
        <></>
      ) : (
        <Td>
          <Flex w="90%" gap="2rem">
            <Button
              w="80px"
              h="30px"
              fontSize="10px"
              colorScheme={"blue"}
              onClick={initonClick}
            >
              {takedown}
            </Button>
            <Button
              w="80px"
              h="30px"
              fontSize="10px"
              colorScheme={"red"}
              onClick={secOnClick}
            >
              {remove}
            </Button>
          </Flex>
        </Td>
      )}
    </>
  )
}

export const NoData = () => {
  const { t } = useTranslation()

  return (
    <Tr>
      <Td colSpan={4} rowSpan={2}>
        <Text my={6} textAlign={"center"}>
          {t("description.noApp")}
        </Text>
      </Td>
    </Tr>
  )
}
