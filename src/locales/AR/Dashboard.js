import {
  Box,
  Flex,
  Grid,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineCaretDown } from "react-icons/ai"

export const ArHeader = props => {
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
      <Grid display={{ base: "flex", md: "flex" }} gap={3}>
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
        <Button
          w="140px"
          h="5.3vh"
          onClick={modal}
          variant="teal"
          borderRadius={"10px"}
        >
          {t("description.addKey")}
        </Button>
      </Grid>
      <Box>
        <Text
          fontWeight={700}
          fontSize="3xl"
          color={
            colorMode === "light"
              ? "lightMode.pageTitle"
              : "darkMode.dashBoardHeader"
          }
        >
          {t("description.dashboard")}
        </Text>
      </Box>
    </Flex>
  )
}
