import React from "react"
import { Select, useColorModeValue } from "@chakra-ui/react"

export const PrioritySelect = ({ data, onChange, priority }) => {
  return (
    <Select
      required
      fontSize="12px"
      textAlign="center"
      w="145px"
      _focus={{
        borderColor:
          data === "high"
            ? "red"
            : data === "medium"
            ? "orange"
            : data === "low" && "green",
        color: "black",
      }}
      _hover={{
        cursor: "pointer",
        borderColor:
          data === "high"
            ? "red"
            : data === "medium"
            ? "orange"
            : data === "low" && "green",
        color:
          data === "high"
            ? "red"
            : data === "medium"
            ? "orange"
            : data === "low" && "green",
      }}
      value={data}
      border="2px"
      color={
        data === "high"
          ? "red"
          : data === "medium"
          ? "orange"
          : data === "low" && "green"
      }
      borderColor={
        data === "high"
          ? "red"
          : data === "medium"
          ? "orange"
          : data === "low" && "green"
      }
      onChange={onChange}
      bg={useColorModeValue(
        "lightMode.dashBoardHeader",
        "darkMode.wHeaderColor"
      )}
    >
      {priority}
    </Select>
  )
}
