import React from "react"
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"
import UserLayout from "components/Layouts/UserLayout"
import { useGetAdminList, useUpdateAdminUser } from "services/query/superuser"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import useCustomToast from "utils/notifications"
import { BsSearch } from "react-icons/bs"
import { FaTimes } from "react-icons/fa"
import { useTranslation } from "react-i18next"

const AdminList = () => {
  const [query, setQuery] = useState("")

  // queries the endpoint to get all admin users
  const { data: admin } = useGetAdminList(query)
  const [user, setUser] = useState("")
  const [name, setName] = useState("")
  const history = useHistory()
  const { successToast } = useCustomToast()

  // queries the endpoint to monitor an admin user
  const { mutate } = useUpdateAdminUser({
    onSuccess: () => {
      successToast(`Monitoring ${name}`)
      setTimeout(() => {
        history.push("/dashboard")
      }, 800)
    },
  })
  const { t } = useTranslation()

  // monitor admin user command
  const updateProfileHandler = async event => {
    event.preventDefault()
    mutate({
      monitored_user: user,
    })
  }
  const mainBg = useColorModeValue(
    "lightMode.dashBoardHeader",
    "darkMode.wHeaderColor"
  )
  const secBg = useColorModeValue("lightMode.white", "darkMode.wBgColor")

  return (
    <Box
      bg={mainBg}
      w={["80%", "85%", "90%", "100%"]}
      h="84vh"
      boxShadow="lg"
      borderRadius="20px"
      mx={50}
      pb={10}
    >
      <InputGroup mx={10} my={2}>
        <InputLeftElement>
          <BsSearch />
        </InputLeftElement>
        <Input
          bg={secBg}
          boxShadow="lg"
          w="40%"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <InputRightElement>
          {query && (
            <FaTimes
              onClick={() => setQuery("")}
              cursor="pointer"
              opacity={0.8}
            />
          )}
        </InputRightElement>
      </InputGroup>
      <Heading textAlign="center">{t("description.monitorUser")}</Heading>
      <Grid
        gap={8}
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(4,1fr)",
        ]}
        overflowY="auto"
        sx={scrollBarStyle}
        h="60vh"
        boxShadow="lg"
        borderRadius="20px"
        bg={secBg}
        py={10}
        my={5}
      >
        {admin?.results?.map((data, i) => (
          <GridItem onClick={updateProfileHandler} key={i} colSpan={1}>
            <UserLayout
              onClick={() => {
                setUser(data?.id)
                setName(data?.company_name)
              }}
              name={data?.company_name}
              image={data?.image}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default AdminList
