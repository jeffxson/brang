import React from "react"
import {
  Button,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { NotificationIcon } from "utils/createIcon"
import NotificationItem from "./NotificationItem"
import { deleteAllNotifications } from "services/api/notification"
import { useGetUnreadNotifications } from "services/query/notification"
import useCustomToast from "utils/notifications"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"

const Notification = () => {
  // queries the endpoints to get unread notifications
  const { data: unreadNotifications, refetch } = useGetUnreadNotifications()
  const { successToast, errorToast } = useCustomToast()
  const { t } = useTranslation()

  // delete notifications
  const handleDeleteNotifications = () => {
    deleteAllNotifications()
      .then(() => {
        successToast("Deleted All Notifications")
        refetch()
      })
      .catch(err => errorToast(err?.message))
  }

  const { colorMode } = useColorMode()
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          bg="transparent"
          _hover={{ outline: "none" }}
          _active={{ outline: "none" }}
          _focus={{ outline: "none" }}
        >
          <NotificationIcon w="14" h="14" mt={6} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        background={useColorModeValue("lightMode.white", "darkMode.bgColor")}
        _hover={{ outline: "none" }}
        _active={{ outline: "none" }}
        _focus={{ outline: "none" }}
      >
        <PopoverHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Text size="sm">{t("description.notification")}</Text>
            {unreadNotifications?.length > 0 && (
              <DeleteIcon
                cursor={"pointer"}
                onClick={handleDeleteNotifications}
                color={colorMode === "light" ? "red.500" : "darkMode"}
              />
            )}
          </Flex>
        </PopoverHeader>
        {Array.isArray(unreadNotifications) &&
        unreadNotifications.length > 0 ? (
          <>
            <PopoverBody
              sx={scrollBarStyle}
              overflowY={"scroll"}
              height={"250px"}
            >
              {unreadNotifications.map((noti, idx) => (
                <NotificationItem notifyData={noti} key={idx} />
              ))}
            </PopoverBody>
            <PopoverFooter p={0}></PopoverFooter>
          </>
        ) : (
          <h3 style={{ padding: "20px" }}>{t("description.noNotification")}</h3>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default Notification
