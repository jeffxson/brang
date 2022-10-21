import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"
import { useGetImageSearch } from "services/query/imageSearch"
import ImageSearchModalDetails from "components/Modal/ModalDetails/ImageSearchModalDetails"
import { DeleteAlert } from "components/Modal/DeleteAlert"
import { useTranslation } from "react-i18next"
import { ArImageDashboard } from "locales/AR/ImageSearch"
import { EnImageDashboard } from "locales/EN/ImageSearch"

const ImageSearch = () => {
  const [takeDownData, setTakeDownData] = useState(null)
  const [imageLink, setImageLink] = useState(null)

  // queries the endpoint to get image search data
  const { data: imageData, isLoading, mutate } = useGetImageSearch()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  const handleDelete = () => {
    console.log("submit")
  }

  return (
    <>
      {toggle ? (
        <ArImageDashboard mutate={mutate} isLoading={isLoading} />
      ) : (
        <EnImageDashboard mutate={mutate} isLoading={isLoading} />
      )}

      <Box
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius="10px"
        height="100%"
        d="flex"
        overflowY="auto"
        alignItems="center"
        mt={2}
        sx={scrollBarStyle}
        fontWeight={400}
      >
        <Flex
          alignItems="center"
          my="20px"
          rounded="16px"
          fontSize={"14px"}
          px="16px"
        >
          {imageData?.length > 0 ? (
            imageData?.map(data =>
              data?.similar_website?.map((dat, key) => (
                <Flex mx={"15px"} flexDirection="column" key={key}>
                  <Box boxShadow="lg" rounded="20px" w="150px">
                    <Image
                      src={dat?.image_url}
                      rounded="16px"
                      maxW="100%"
                      h="100px"
                      maxH="100px"
                      w="100%"
                    />
                  </Box>
                  <Flex alignItems="center" justifyContent="center" py="16px">
                    <Button
                      w="78px"
                      h="30px"
                      mx="20px"
                      px="50px"
                      fontSize="13px"
                      colorScheme={"blue"}
                      onClick={() => {
                        onOpen()
                        setTakeDownData(dat)
                        setImageLink(dat?.image_url)
                      }}
                    >
                      {t("description.takeBtn")}
                    </Button>
                    {/* <Button
                      h="30px"
                      w="78px"
                      mx="20px"
                      fontSize="13px"
                      colorScheme={"red"}
                      onClick={() => setShowDeleteModal(true)}
                    >
                      {t("description.remove")}
                    </Button> */}
                  </Flex>
                </Flex>
              ))
            )
          ) : (
            <Box>{t("description.noImage")}</Box>
          )}
        </Flex>
      </Box>
      <ImageSearchModalDetails
        data={takeDownData}
        imageLink={imageLink}
        isOpen={isOpen}
        onClose={onClose}
      />

      <DeleteAlert
        isOpen={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false)
        }}
        loading={false}
        action={handleDelete}
      />
    </>
  )
}

export default ImageSearch
