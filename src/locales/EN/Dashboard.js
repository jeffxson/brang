import {
  Box,
  Flex,
  // Grid,
  Menu,
  MenuButton,
  MenuItem,
  Button,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineCaretDown } from "react-icons/ai"

export const EnHeader = props => {
  const { modal, initOnClick, secOnClick } = props
  const { t } = useTranslation()
  const { colorMode } = useColorMode()

  return (
    <Flex
      align={"center"}
      flexDir="row"
      justify="space-between"
      display={{ base: "block", md: "flex" }}
    >
      <Box>
        <Text
          fontWeight={700}
          fontSize="3xl"
          color={
            colorMode === "true"
              ? "lightMode.pageTitle"
              : "darkMode.dashBoardHeader"
          }
        >
          {t("description.dashboard")}
        </Text>
      </Box>
      <Flex gap={2} flexWrap="wrap">
        <Box marginTop={{ base: "1rem", md: "0" }}>
          <Button
            w="140px"
            h="5.3vh"
            onClick={modal}
            variant="teal"
            borderRadius={"10px"}
          >
            {t("description.addKey")}
          </Button>
        </Box>
        <Box marginTop={{ base: "1rem", md: "0" }}>
          <Menu>
            <MenuButton
              w="140px"
              as={Button}
              h="5.3vh"
              variant="teal"
              borderRadius={"10px"}
            >
              <Flex justifyContent="space-between">
                {t("description.export")}
                <Box mt={0.5}>
                  <AiOutlineCaretDown />
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem pl={"5.3rem"} onClick={initOnClick}>
                {t("description.export")}
              </MenuItem>
              <MenuItem pl={"4rem"} onClick={secOnClick}>
                {t("description.exportMail")}
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  )
}
