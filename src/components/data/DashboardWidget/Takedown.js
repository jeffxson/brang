import React from "react"
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"
import { useTranslation } from "react-i18next"
import { useGetTakedownEmail } from "services/query/dashboard"

const Takedown = () => {
  // queries the endpoint to display all takedowns
  const { data: takedownEmail } = useGetTakedownEmail()
  const filteredTakedownEmails = takedownEmail?.filter(
    el => el?.status === "processing"
  )
  const { t } = useTranslation()

  return (
    <>
      <Box
        h={"15.6rem"}
        mt={10}
        bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
        borderRadius={"10px"}
      >
        {filteredTakedownEmails?.length > 0 ? (
          <TableContainer
            minH="300px"
            maxH={"300px"}
            fontWeight={400}
            fontSize="12px"
            overflowY="auto"
            sx={scrollBarStyle}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{t("description.takeHeader1")}</Th>
                  <Th>{t("description.leakHeader2")}</Th>
                  <Th>{t("description.takeHeader2")}</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={"14px"} height="100%" maxH={"180px"}>
                {filteredTakedownEmails?.map((data, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{data?.takedown_brand_name}</Td>
                      <Td>{data?.status}</Td>
                      <Td>{data?.case_study}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Flex
            minH={"300px"}
            maxHeight={"300px"}
            flexDir="column"
            justifyContent={"center"}
            align="center"
          >
            <Box flexDir="column" justifyContent={"center"} align="center">
              <Text className="text-center">{t("description.noTakeDown")}</Text>
            </Box>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default Takedown
