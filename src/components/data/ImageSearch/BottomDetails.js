import React, { useState } from "react"
import {
  Button,
  Flex,
  Link,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { trim } from "utils/helpers"
import { useTranslation } from "react-i18next"
import ImageSearchModalDetails from "components/Modal/ModalDetails/ImageSearchModalDetails"

export const BottomDetails = ({ data }) => {
  const { t } = useTranslation()
  const [takeDownData, setTakeDownData] = useState(null)
  const [imageLink, setImageLink] = useState(null)

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      {data?.map((data, i) => (
        <Flex
          key={i}
          justifyContent="space-between"
          my="10px"
          alignItems="center"
        >
          <>
            <Link href={data?.url}>{trim(data?.url)}</Link>
          </>
          <>
            <Button
              w="4.5rem"
              h="30px"
              fontSize="10px"
              colorScheme={"blue"}
              onClick={() => {
                onOpen()
                setTakeDownData(data)
                setImageLink(data?.image_url)
              }}
            >
              {t("description.takeBtn")}
            </Button>
          </>
        </Flex>
      ))}
      <ImageSearchModalDetails
        data={takeDownData}
        title="Send Image takedown"
        onClose={onClose}
        imageLink={imageLink}
        isOpen={isOpen}
      />
    </>
  )
}

export const NoData = () => {
  const { t } = useTranslation()
  return (
    <Tr>
      <Td colSpan={4} rowSpan={2}>
        <Text my={6} textAlign={"center"}>
          {t("description.noImage")}
        </Text>
      </Td>
    </Tr>
  )
}
