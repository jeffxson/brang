import React, { useState } from "react"
import {
  Flex,
  HStack,
  Text,
  Avatar,
  Heading,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Box,
  Button,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react"
import Logo from "assets/images/favicon.ico"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoonIcon,
  SettingsIcon,
  ExternalLinkIcon,
  SunIcon,
} from "@chakra-ui/icons"
import { useGetUserProfile } from "services/query/settings"
import { FaUsers, FaUsersCog } from "react-icons/fa"
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import Notification from "components/data/Notification/Notification"
import { queryClient } from "index"
import { logoutAndClear } from "redux/actions/authActions"
import { useTranslation } from "react-i18next"
import { lngs } from "i18n"
import { useGetSuperUser } from "services/query/superuser"

const AuthHeader = props => {
  const { i18n, t } = useTranslation()
  const toggle = i18n?.language === "AR"
  const history = useHistory()
  const { data: userData } = useGetUserProfile()
  const { data: superUser } = useGetSuperUser()
  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useDispatch()
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  const handleMenuClick = () => {
    setIsMenuClicked(!isMenuClicked)
  }

  const handleLogoutClick = () => {
    localStorage.clear()
    queryClient.clear()
    dispatch(logoutAndClear())
    history.push("/login")
  }

  return (
    <Flex
      w="100%"
      as="header"
      align="center"
      justify="space-between"
      px="12px"
      background={useColorModeValue("lightMode.white", "darkMode.wHeaderColor")}
      height={"60px"}
      position={"fixed"}
      top={0}
      left="0"
      boxShadow="md"
      zIndex={999999}
      {...props}
    >
      {toggle ? (
        <Flex w="full" align="center" justify="space-between">
          <HStack justify="center">
            <Menu>
              <MenuButton
                as={Button}
                _hover={{ outline: "none" }}
                _active={{ outline: "none" }}
                _focus={{ outline: "none" }}
                onClick={() => handleMenuClick()}
                background="unset"
                rightIcon={
                  isMenuClicked ? (
                    <ChevronUpIcon
                      color={
                        colorMode === "light"
                          ? "blackAlpha.400"
                          : "darkMode.dashBoardHeader"
                      }
                      w="8"
                      h="8"
                    />
                  ) : (
                    <ChevronDownIcon
                      color={
                        colorMode === "light"
                          ? "blackAlpha.400"
                          : "darkMode.dashBoardHeader"
                      }
                      w="8"
                      h="8"
                    />
                  )
                }
              ></MenuButton>
              <MenuList mr={2}>
                <MenuItem
                  icon={
                    colorMode === "light" ? (
                      <MoonIcon />
                    ) : (
                      <SunIcon color="darkMode.moonIcon" w="5" h="5" />
                    )
                  }
                  onClick={() => {
                    toggleColorMode()
                    setIsMenuClicked(!isMenuClicked)
                  }}
                >
                  {colorMode === "light"
                    ? t("description.darkMode")
                    : t("description.lightMode")}
                </MenuItem>
                {superUser?.is_superuser === true && (
                  <Link to="/admin-dashboard">
                    <MenuItem icon={<FaUsers w="5" h="5" />}>
                      Monitor Users
                    </MenuItem>
                  </Link>
                )}
                {userData?.is_admin === true && (
                  <>
                    <Link to="/settings/account">
                      <MenuItem icon={<SettingsIcon w="5" h="5" />}>
                        {t("description.settings")}
                      </MenuItem>
                    </Link>
                    <Link to="/settings/teams">
                      <MenuItem icon={<FaUsersCog size="21px" />}>
                        {t("description.team")}
                      </MenuItem>
                    </Link>
                  </>
                )}
                <MenuItem
                  icon={<ExternalLinkIcon w="5" h="5" />}
                  onClick={() => handleLogoutClick()}
                >
                  {t("description.logout")}
                </MenuItem>
              </MenuList>
            </Menu>
            <Avatar
              size="sm"
              src={userData?.image || "https://bit.ly/dan-abramov"}
            />
            <Text
              fontWeight={"normal"}
              color={
                colorMode === "light" ? "black" : "darkMode.dashBoardHeader"
              }
              fontSize={["13px", "13px", "16px", "16px"]}
            >
              {userData?.first_name} {userData?.last_name}
            </Text>
            <Notification />
          </HStack>
          <HStack>
            <Box mx={5}>
              {Object.keys(lngs).map(lng => (
                <Button
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                  cursor={"pointer"}
                  bg="transparent"
                  w="7px"
                  size="sm"
                >
                  {lng}
                </Button>
              ))}
            </Box>
            <Link to="/dashboard" fontWeight={"900"} size="2xl">
              <Flex alignItems="center">
                <Heading
                  mx="10px"
                  my="4px"
                  fontSize={["18px", "18px", "25px", "25px"]}
                  display={["none", "block", "block", "block"]}
                >
                  {t("description.brand")}
                </Heading>
                <Image
                  cursor={"pointer"}
                  h={"2.5rem"}
                  maxW={"2.5rem"}
                  src={Logo}
                />
              </Flex>
            </Link>
          </HStack>
        </Flex>
      ) : (
        <Flex w="full" align="center" justify="space-between">
          <Link to="/dashboard" fontWeight={"900"} size="2xl">
            <Flex alignItems="center">
              <Image
                cursor={"pointer"}
                h={"2.5rem"}
                maxW={"2.5rem"}
                src={Logo}
              />
              <Heading
                mx="10px"
                my="4px"
                fontSize={["18px", "18px", "25px", "25px"]}
                display={["none", "block", "block", "block"]}
              >
                {t("description.brand")}
              </Heading>
            </Flex>
          </Link>
          <HStack justify="center">
            {Object.keys(lngs).map(lng => (
              <Button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                cursor={"pointer"}
                bg="transparent"
                w="7px"
                size="sm"
              >
                {lng}
              </Button>
            ))}
            {/* <Notification /> */}
            <Avatar
              size="sm"
              src={userData?.image || "https://bit.ly/dan-abramov"}
            />
            <Text
              fontWeight={"normal"}
              color={
                colorMode === "light" ? "black" : "darkMode.dashBoardHeader"
              }
              fontSize={["13px", "13px", "16px", "16px"]}
            >
              {userData?.first_name} {userData?.last_name}
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                _hover={{ outline: "none" }}
                _active={{ outline: "none" }}
                _focus={{ outline: "none" }}
                onClick={() => handleMenuClick()}
                background="unset"
                rightIcon={
                  isMenuClicked ? (
                    <ChevronUpIcon
                      color={
                        colorMode === "light"
                          ? "blackAlpha.400"
                          : "darkMode.dashBoardHeader"
                      }
                      w="8"
                      h="8"
                    />
                  ) : (
                    <ChevronDownIcon
                      color={
                        colorMode === "light"
                          ? "blackAlpha.400"
                          : "darkMode.dashBoardHeader"
                      }
                      w="8"
                      h="8"
                    />
                  )
                }
              ></MenuButton>
              <MenuList mr={2}>
                <MenuItem
                  icon={
                    colorMode === "light" ? (
                      <MoonIcon />
                    ) : (
                      <SunIcon color="darkMode.moonIcon" w="5" h="5" />
                    )
                  }
                  onClick={() => {
                    toggleColorMode()
                    setIsMenuClicked(!isMenuClicked)
                  }}
                >
                  {colorMode === "light"
                    ? t("description.darkMode")
                    : t("description.lightMode")}
                </MenuItem>
                {userData?.is_admin === true && (
                  <>
                    <Link to="/settings/account">
                      <MenuItem icon={<SettingsIcon w="5" h="5" />}>
                        {t("description.settings")}
                      </MenuItem>
                    </Link>
                    <Link to="/settings/teams">
                      <MenuItem icon={<FaUsersCog size="21px" />}>
                        {t("description.team")}
                      </MenuItem>
                    </Link>
                  </>
                )}
                {superUser?.is_superuser === true && (
                  <Link to="/admin-dashboard">
                    <MenuItem icon={<FaUsers w="5" h="5" />}>
                      Monitor Users
                    </MenuItem>
                  </Link>
                )}
                <MenuItem
                  icon={<ExternalLinkIcon w="5" h="5" />}
                  onClick={() => handleLogoutClick()}
                >
                  {t("description.logout")}
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      )}
    </Flex>
  )
}

export default AuthHeader
