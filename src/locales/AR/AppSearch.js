import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Td,
  Text,
  Th,
} from "@chakra-ui/react"
import React from "react"
import { FaTimes } from "react-icons/fa"
import { useTranslation } from "react-i18next"

export const ArHeader = props => {
  const { label, search, onChange, onClick } = props
  const { t } = useTranslation()

  return (
    <>
      <Text fontWeight={500} fontSize="1.2rem" px={3}>
        {label}
      </Text>
      <Box>
        <InputGroup>
          <Input
            value={search}
            onChange={onChange}
            placeholder={t("description.appHeader1")}
          />
          <InputRightElement>
            {search && (
              <FaTimes onClick={onClick} cursor={"pointer"} opacity={0.8} />
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  )
}

export const ArTableHeader = props => {
  const { initHeader, secHeader } = props
  return (
    <>
      <Th></Th>
      <Th>{initHeader}</Th>
      <Th>{secHeader}</Th>
    </>
  )
}

export const ArTableBody = props => {
  const { initonClick, secOnClick, takedown, remove, link, src, app } = props
  return (
    <>
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
      <Td fontSize="10px">
        <Link href={link}>{link}</Link>
      </Td>
      <Td fontSize="10px">
        <Flex>
          <Image h="70px" src={src} />
          <Text display="flex" alignItems="center" mx={5}>
            {app}
          </Text>
        </Flex>
      </Td>
    </>
  )
}
