import React from "react"
import {
  Box,
  Tr,
  Td,
  Text,
  useColorModeValue,
  ListItem,
  TableContainer,
  Table,
  Thead,
  Link,
  Tbody,
  UnorderedList,
  Badge,
  useColorMode,
} from "@chakra-ui/react"
import { scrollBarStyle, trim } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { ArHeader } from "locales/AR/NewsWidget"
import { EnHeader } from "locales/EN/NewsWidget"
import { useGetNews } from "services/query/dashboard"

const News = () => {
  // queries the endpoint to get news related data
  const { data: news } = useGetNews()
  const newsData = news?.results
  const { t, i18n } = useTranslation()
  const toggle = i18n?.language === "AR"

  const { colorMode } = useColorMode()

  return (
    <>
      {toggle ? <ArHeader /> : <EnHeader />}
      <Box
        overflowY="auto"
        h="15.6rem"
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius={"10px"}
        px={1}
        sx={scrollBarStyle}
      >
        {newsData?.length > 0 ? (
          newsData?.map((data, index) => (
            <UnorderedList
              spacing={1}
              key={index}
              p={1}
              color={"lightMode.blue"}
            >
              <Badge>#{data.keyword}</Badge>
              <ListItem>
                <Link
                  color={
                    colorMode === "light"
                      ? "black"
                      : "lightMode.dashBoardHeader"
                  }
                  href={data?.link}
                  isExternal
                  target="_blank"
                  fontSize={"14px"}
                  className="one-line-text"
                >
                  {trim(data?.link)}
                </Link>
              </ListItem>
            </UnorderedList>
          ))
        ) : (
          <TableContainer>
            <Table>
              <Thead></Thead>
              <Tbody>
                <Tr>
                  <Td colSpan={4} rowSpan={2}>
                    <Text my={6} textAlign={"center"}>
                      {t("description.noNews")}
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  )
}

export default News
