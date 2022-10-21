import React from "react"
import {
  Box,
  useColorModeValue,
  ListItem,
  Link,
  UnorderedList,
  Spinner,
} from "@chakra-ui/react"
import { scrollBarStyle, trim } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { EnHeader } from "locales/EN/GoogleSearch"
import { ArHeader } from "locales/AR/GoogleSearch"
import { useGetGoogleNews } from "services/query/dashboard"

const GoogleNews = () => {
  // queries the endpoint to get google searched news
  const { data, isLoading } = useGetGoogleNews()
  const { i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  const linkColor = useColorModeValue("black", "lightMode.dashBoardHeader")

  return (
    <>
      {toggle ? <ArHeader /> : <EnHeader />}
      <Box
        height={"15.6rem"}
        overflowY="auto"
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderBottomRadius={"10px"}
        sx={scrollBarStyle}
      >
        {isLoading && <Spinner />}
        {data?.map(({ link }, index) => {
          return (
            <UnorderedList key={index} p={2} color={"lightMode.blue"}>
              <ListItem>
                <Link
                  color={linkColor}
                  href={link}
                  isExternal
                  textDecoration={"none"}
                  target="_blank"
                  fontSize={"14px"}
                  className="one-line-text google-news-link"
                >
                  {trim(link)}
                </Link>
              </ListItem>
            </UnorderedList>
          )
        })}
      </Box>
    </>
  )
}

export default GoogleNews
