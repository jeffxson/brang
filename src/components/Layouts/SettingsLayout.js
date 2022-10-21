import React, { Fragment, useState } from "react"
import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { CameraIcon } from "utils/createIcon"
import { useGetUserProfile, useUpdateProfile } from "services/query/settings"
import { useTranslation } from "react-i18next"
import useCustomToast from "utils/notifications"

const SettingsLayout = props => {
  const { t } = useTranslation()
  const location = useLocation()
  const { errorToast, successToast } = useCustomToast()
  const { data: userData, refetch } = useGetUserProfile()
  const [fileType, setFileType] = useState()
  const { mutate, isLoading } = useUpdateProfile({
    onSuccess: () => {
      successToast("Update successful")
      refetch()
    },
    onError: () => {
      errorToast("Upload Failed. Please try again")
    },
  })
  const handleUpload = e => {
    setFileType(URL.createObjectURL(e.target.files[0]))
    const formData = new FormData()
    formData.append("image", e.target.files[0])
    mutate(formData)
  }

  const routes = [
    { id: 1, title: t("description.account"), route: "/settings/account" },
    { id: 2, title: t("description.team"), route: "/settings/teams" },
    { id: 3, title: t("description.company"), route: "/settings/company" },
    {
      id: 4,
      title: t("description.notification"),
      route: "/settings/notifications",
    },
    { id: 5, title: t("description.security"), route: "/settings/security" },
  ]

  const borderBottom = useColorModeValue(
    "darkMode.wHeaderColor",
    "lightMode.stepperFont"
  )

  return (
    <Box w="full" paddingTop="2rem" paddingBottom="2rem">
      <style>
        {`.avatar_con:hover .change_con {
                display: flex;
            }
            
            .loading {
              display: flex;
            }

            `}
      </style>
      <Box width="full">
        <Text
          fontWeight={700}
          fontSize="3xl"
          color={useColorModeValue(
            "lightMode.pageTitle",
            "lightMode.dashBoardHeader"
          )}
          marginBottom="25px"
        >
          Settings
        </Text>
        <Flex
          gap="20px"
          display={{ base: "block", md: "flex" }}
          alignItems="flex-start"
        >
          <Box
            padding="20px"
            bg={useColorModeValue(
              "lightMode.dashBoardHeader",
              "darkMode.wBgColor"
            )}
            maxWidth={{ base: "100%", md: "230px" }}
            width="100%"
            borderRadius="10px"
          >
            <Flex justifyContent="center">
              <input
                type="file"
                style={{ display: "none" }}
                id="image-upload"
                onChange={handleUpload}
                accept="image/*"
              />
              <label htmlFor="image-upload">
                <Box
                  className="avatar_con"
                  position="relative"
                  cursor="pointer"
                  borderRadius="50%"
                >
                  <Avatar size="2xl" src={userData?.image || fileType} />
                  <Flex
                    position="absolute"
                    pointerEvents="none"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    borderRadius="50%"
                    justifyContent="center"
                    alignItems="center"
                    background="rgba(255, 255, 255, 0.8)"
                    gap="12px"
                    display="none"
                    className={isLoading ? "loading" : "change_con"}
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <Fragment>
                        <CameraIcon />
                        <Text color="#39393D">Change</Text>
                      </Fragment>
                    )}
                  </Flex>
                </Box>
              </label>
            </Flex>
            <Box>
              <Text
                margin="26px 0"
                textAlign="center"
                fontSize="20px"
                lineHeight="24px"
              >
                {`${userData?.first_name} ${userData?.last_name}`}
              </Text>
            </Box>

            <Box>
              {routes.map(item => (
                <Link key={item.id} to={item.route}>
                  <Text
                    borderBottomWidth="1px"
                    fontWeight="bold"
                    borderBottomColor={
                      location.pathname === item.route
                        ? borderBottom
                        : "transparent"
                    }
                    padding="10px 2px"
                    margin="5px 0"
                    fontSize="18px"
                  >
                    {item.title}
                  </Text>
                </Link>
              ))}
            </Box>
          </Box>
          <Box flex="1">
            <Flex
              borderBottomWidth="1px"
              borderBottomColor={useColorModeValue(
                "darkMode.wHeaderColor",
                "lightMode.stepperFont"
              )}
              flexDir="row"
              justify="space-between"
            >
              <Box>
                <Text
                  fontWeight={700}
                  fontSize="3xl"
                  color={useColorModeValue(
                    "lightMode.pageTitle",
                    "lightMode.dashBoardHeader"
                  )}
                  pb="5px"
                >
                  {props.title}
                </Text>
              </Box>

              <Box marginBottom="5px"></Box>
            </Flex>
            <Box margin="15px 0" padding="15px 0">
              {props.children}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default SettingsLayout
