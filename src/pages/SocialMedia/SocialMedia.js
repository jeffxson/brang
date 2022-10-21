import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
  useColorMode,
} from "@chakra-ui/react"
import { TwitterTweetEmbed } from "react-twitter-embed"
import { useSearchSocialMedia } from "services/query/socialMedia"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { SocialMediaInput } from "components/CustomInput/CustomInput"
import useCustomToast from "utils/notifications"

const SocialMedia = props => {
  // queries the endpoint to search social media
  const { mutate, isLoading: isPostLoading, data } = useSearchSocialMedia()
  const { infoToast } = useCustomToast()
  const { colorMode } = useColorMode()

  const [userInput, setUserInput] = useState({
    keyword: props?.location?.data?.keyword || "",
    username: "",
  })
  const { username, keyword } = userInput

  // executes the search
  const handleSearch = e => {
    e.preventDefault()
    if (keyword === "" && username === "") {
      infoToast("Please enter keyword or username")
    } else {
      mutate({
        twitter_handle: username,
        query: keyword,
      })
    }
  }
  useEffect(() => {
    return () => {
      setUserInput({
        username: "",
        keyword: "",
      })
    }
  }, [])
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  return (
    <Box width="full">
      <Flex
        flexDir={["column", "column", "row", "row"]}
        justifyContent="space-between"
        align="center"
      >
        <Text
          my={5}
          textAlign={toggle ? "end" : "start"}
          fontWeight={700}
          fontSize="3xl"
        >
          {t("description.socialMedia")}
        </Text>
        <Link to="/twitter-timeline">
          <Button my={"2rem"}>Twitter Timeline</Button>
        </Link>
      </Flex>
      <form onSubmit={handleSearch}>
        <Flex
          justifyContent={toggle ? "flex-end" : "flex-start"}
          display={{ base: "block", lg: "flex" }}
          gap={4}
          w="100%"
        >
          <Box>
            <SocialMediaInput
              toggle={toggle}
              value={keyword}
              placeholder={t("description.searchKeyword")}
              onChange={e =>
                setUserInput({ ...userInput, keyword: e.target.value })
              }
              onClick={() => setUserInput({ ...userInput, keyword: "" })}
            />
          </Box>
          <Box marginTop={["30px", "30px", "30px", "0px"]}>
            <SocialMediaInput
              value={username}
              toggle={toggle}
              placeholder={t("description.searchUser")}
              onChange={e =>
                setUserInput({ ...userInput, username: e.target.value })
              }
              onClick={() => setUserInput({ ...userInput, username: "" })}
            />
          </Box>
        </Flex>
        <Button
          variant={isPostLoading ? "solid" : "blue"}
          type="submit"
          float={toggle ? "right" : "left"}
          my={5}
          w={"3xs"}
          isLoading={isPostLoading}
          loadingText={"Fetching Results..."}
          spinnerPlacement={isPostLoading && "start"}
          borderRadius="lg"
        >
          {t("description.search")}
        </Button>
      </form>

      <Text
        fontWeight={700}
        fontSize="3xl"
        color={useColorModeValue(
          "lightMode.pageTitle",
          "lightMode.dashBoardHeader"
        )}
        my={100}
        textAlign={toggle ? "end" : "start"}
      >
        {t("description.result")}
      </Text>

      {data?.results && (
        <Box
          p={8}
          bg={
            colorMode === "light"
              ? "lightMode.headerBgColor"
              : "darkMode.wBgColor"
          }
          borderRadius={"10px"}
          width={"full"}
          overflowX="auto"
        >
          <Text
            position={"sticky"}
            top="0"
            fontWeight={700}
            fontSize="xl"
            my={2}
          >
            Twitter Data
          </Text>
          <Grid
            w={"100%"}
            gap={4}
            templateColumns={[
              "repeat(1,1fr)",
              "repeat(2,1fr)",
              "repeat(3,1fr)",
              "repeat(4,1fr)",
            ]}
            overflowY="scroll"
          >
            {data?.results?.map(tweetId => (
              <GridItem colSpan={1} key={tweetId}>
                <TwitterTweetEmbed
                  tweetId={tweetId}
                  placeholder={"loading..."}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default SocialMedia
