import React, { useState } from "react"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { useDetectLogo, useGetVersion } from "services/query/featured"
import useCustomToast from "utils/notifications"

const ContactInfo = () => {
  const [fileType, setFileType] = useState()
  const { successToast, errorToast } = useCustomToast()
  const { data: version } = useGetVersion()

  const { data, mutate, isLoading } = useDetectLogo({
    onSuccess: () => {
      successToast("Result found")
    },
    onError: () => {
      errorToast("Upload Failed. Please try again")
    },
  })
  const brandname =
    data && data?.results[0]?.entities[0]?.objects[0]?.entities[0]?.classes

  const handleUpload = e => {
    setFileType(URL.createObjectURL(e.target.files[0]))
    const formData = new FormData()
    formData.append("image", e.target.files[0])
    mutate(formData)
  }

  return (
    <Box>
      <Box py={["5", "5", "5", "5"]} px={5}>
        <Flex justifyContent="space-between">
          <Box>
            <InputGroup w="60%" borderRadius="10px">
              <Input
                accept="image/*"
                onChange={handleUpload}
                type="file"
                boxShadow="0px 2px 6px 0px #000"
              />
            </InputGroup>
            <Avatar mt={5} size="lg" src={fileType} />
          </Box>
          <Text>{version}</Text>
        </Flex>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box my={5}>
            {brandname === undefined ? (
              <Text color="red">NOT FOUND!!</Text>
            ) : (
              <Text color="green">LOGO FOUND!!</Text>
            )}

            <Box>
              <Flex gap="3rem">
                <Heading fontSize="15px">Brand</Heading>
                <Heading fontSize="15px">Ownership probability</Heading>
              </Flex>
              <Flex gap="3rem">
                <Text>{data && Object.keys(brandname)}</Text>
                <Text> {data && Object.values(brandname)}</Text>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ContactInfo
