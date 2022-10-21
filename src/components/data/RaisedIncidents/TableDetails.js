import React from "react"
import {
  Flex,
  FormLabel,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { PrioritySelect } from "./PrioritySelect"
import { priorityOptions, scrollBarStyle, trimID } from "utils/helpers"
import { useTranslation } from "react-i18next"

export const TableHeader = ({ children }) => {
  const { t } = useTranslation()
  return (
    <TableContainer
      h={"45vh"}
      borderRadius="20px"
      fontWeight={400}
      overflowY="scroll"
      boxShadow="lg"
      sx={scrollBarStyle}
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
    >
      <Table variant="simple">
        <Thead
          borderRadius="sm"
          bgColor={useColorModeValue("gray.200", "gray.600")}
          position={"sticky"}
          top={0}
          zIndex={5}
        >
          <Tr>
            <Th textAlign="center">{t("description.takeHeader1")}</Th>
            <Th textAlign="center">{t("description.leakHeader2")}</Th>
            <Th textAlign="center">{t("description.priority")}</Th>
            <Th textAlign="center">{t("description.takeHeader2")}</Th>
            <Th textAlign="center">{t("description.id")}</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  )
}

export const TableBody = props => {
  const { id, initOnChange, secOnChange, brand, priority, caseStudy, status } =
    props
  return (
    <Tr>
      <Td textAlign="center">{brand}</Td>
      <Td textAlign="center">
        <Flex>
          <FormLabel htmlFor="InChecked">
            {status === "processing" ? "Pending" : "Complete"}
          </FormLabel>
          <Switch
            isChecked={status === "processing" ? false : true}
            onChange={initOnChange}
            id="isChecked"
          />
        </Flex>
      </Td>
      <Td>
        <PrioritySelect
          data={priority}
          onChange={secOnChange}
          priority={priorityOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        />
      </Td>
      <Td textAlign="center" textTransform="capitalize">
        {caseStudy}
      </Td>
      <Td textAlign="center" textTransform="capitalize">
        {trimID(id)}
      </Td>
    </Tr>
  )
}
