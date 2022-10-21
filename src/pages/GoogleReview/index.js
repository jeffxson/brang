import React, { useState, useEffect } from "react"
import {
  Box,
  FormControl,
  useColorModeValue,
  Text,
  Spinner,
} from "@chakra-ui/react"
import ReviewCard from "components/data/GoogleReview/ReviewCard"
import { useGetGoogleId } from "services/query/settings"
import { useGetReview } from "services/query/googleReview"
import { useTranslation } from "react-i18next"
import Pagination from "components/Common/Pagination"
import { ArInput } from "locales/AR/GoogleReview"
import { EnInput } from "locales/EN/GoogleReview"
import {
  FiveStar,
  FourStar,
  OneStar,
  ThreeStar,
  TwoStar,
} from "components/data/GoogleReview/Ratings"

const index = () => {
  const [location, setLocation] = useState("")

  // queries the endpoint to get location id
  const { data: googleData, isLoading: isFetching } = useGetGoogleId(location)
  const [placeId, setPlaceId] = useState("")

  // queries the endpoint to get reviews in the location
  const { data, isLoading } = useGetReview(placeId)
  const [currentItems, setCurrentItems] = useState(null)
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"
  const [showLocation, setShowLocation] = useState(false)
  const [itemsPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setCurrentItems(data?.reviews?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(data?.reviews?.length / itemsPerPage))
  }, [itemOffset, data])

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % data?.reviews?.length

    setItemOffset(newOffset)
  }

  useEffect(() => {
    if (location) {
      setShowLocation(true)
    }
  }, [location])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentItems])

  return (
    <Box px={50}>
      <Text textAlign={toggle ? "end" : "start"} fontWeight={600} px={3}>
        {t("description.googleReview")}
      </Text>

      <Box>
        <FormControl variant="floating" my={7}>
          {toggle ? (
            <ArInput
              initOnClick={() => setLocation("")}
              secOnClick={e => setLocation(e.target.value)}
              location={location}
            />
          ) : (
            <EnInput
              isLoading={isFetching}
              initOnClick={() => setLocation("")}
              secOnClick={e => setLocation(e.target.value)}
              location={location}
            />
          )}
        </FormControl>
      </Box>
      <Box
        h="auto"
        bg={useColorModeValue("#f3f3f3", "darkMode.wBgColor")}
        w="100%"
        borderRadius="10px"
      >
        {showLocation &&
          googleData?.data?.map((item, i) => (
            <Box key={i}>
              <Text
                px={3}
                cursor="pointer"
                py={1}
                onClick={() => {
                  setPlaceId(item?.location_id)
                  setLocation(item?.location_name)
                  setShowLocation(false)
                }}
              >
                {item?.location_name}
              </Text>
            </Box>
          ))}
      </Box>
      {isLoading && <Spinner />}
      {data &&
        (currentItems?.length > 0 ? (
          currentItems?.map((item, i) => (
            <Box key={i}>
              <ReviewCard
                src={item?.reviewAuthorImage}
                text1={item?.reviewAuthor}
                text2={item?.reviewUrl}
                text4={item?.reviewText}
                text5={item?.reviewDate}
                text6={
                  item?.reviewRating === 1 ? (
                    <OneStar />
                  ) : item?.reviewRating === 2 ? (
                    <TwoStar />
                  ) : item?.reviewRating === 3 ? (
                    <ThreeStar />
                  ) : item?.reviewRating === 4 ? (
                    <FourStar />
                  ) : (
                    item?.reviewRating === 5 && <FiveStar />
                  )
                }
              />
            </Box>
          ))
        ) : (
          <Text textAlign="center">{t("description.noReview")}</Text>
        ))}
      <Pagination
        pageCount={isNaN(pageCount) ? 0 : pageCount}
        handlePageClick={handlePageClick}
      />
    </Box>
  )
}

export default index
