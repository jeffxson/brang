import React from "react"
import { Box, Flex, Td, Tr } from "@chakra-ui/react"
import { useGetImageSearch } from "services/query/imageSearch"
import { useTranslation } from "react-i18next"
import { ArImageHeader } from "locales/AR/ImageSearch"
import { EnImageHeader } from "locales/EN/ImageSearch"
import TableLayout from "components/data/ImageSearch/TableLayout"
import TopDetails from "components/data/ImageSearch/TopDetails"
import {
  BottomDetails,
  NoData,
} from "components/data/ImageSearch/BottomDetails"

const ImageTakeDown = () => {
  // queries the endpoint to get image data from the website being monitored
  const {
    data: imageData,
    isLoading: isImageFetching,
    mutate,
  } = useGetImageSearch()
  const { i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box>
      <Flex
        align="center"
        justifyContent="space-between"
        flexDir={["column", "column", "row", "row"]}
        cursor="pointer"
        mb={2}
      >
        {toggle ? (
          <ArImageHeader mutate={mutate} isLoading={isImageFetching} />
        ) : (
          <EnImageHeader mutate={mutate} isLoading={isImageFetching} />
        )}
      </Flex>
      <Box>
        <TableLayout data={imageData} isLoading={isImageFetching}>
          {imageData?.length > 0 ? (
            imageData?.map((data, i) => (
              <Tr key={i}>
                <TopDetails
                  originalImg={data?.original_image_url}
                  domainName={data?.domain_name}
                />
                <Td>
                  <BottomDetails data={data?.similar_website} />
                </Td>
              </Tr>
            ))
          ) : (
            <NoData />
          )}
        </TableLayout>
      </Box>
    </Box>
  )
}

export default ImageTakeDown
