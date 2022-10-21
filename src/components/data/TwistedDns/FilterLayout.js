import React from "react"
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react"
import { FaTimes } from "react-icons/fa"

const FilterLayout = props => {
  const { initOnChange, secOnChange, value, onClick, toggle, fuzzers } = props
  return (
    <Flex justify={"flex-end"}>
      <Flex flexDir={["column", "column", "row", "row"]} gap={4} w="50%">
        <Select onChange={initOnChange}>
          <option value={""}>Filter by Fuzzers</option>
          {fuzzers?.map(fuz => (
            <option key={fuz} value={fuz}>
              {fuz}
            </option>
          ))}
        </Select>
        <InputGroup>
          <Input
            value={value}
            dir={toggle ? "rtl" : "ltr"}
            onChange={secOnChange}
            placeholder="e.g domain.com"
          />
          <InputRightElement>
            {value && (
              <FaTimes onClick={onClick} cursor={"pointer"} opacity={0.8} />
            )}
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  )
}

export default FilterLayout
