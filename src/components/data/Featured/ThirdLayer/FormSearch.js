import React from "react"
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

const FormSearch = ({
  username,
  onSubmit,
  target_count,
  initOnChange,
  secOnChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Flex
        mb={5}
        gap={["1rem", "1rem", "3rem", "3rem"]}
        flexDir={["column", "column", "row", "row"]}
      >
        <InputGroup w={["100%", "100%", "50%", "50%"]} borderRadius="10px">
          <Input
            value={username}
            onChange={initOnChange}
            placeholder="username"
            boxShadow="0px 1px 3px 0px #000"
          />
        </InputGroup>
        <InputGroup
          value={target_count}
          w={["100%", "100%", "50%", "50%"]}
          borderRadius="10px"
        >
          <Input
            onChange={secOnChange}
            placeholder="scanners"
            boxShadow="0px 1px 3px 0px #000"
          />
          <InputRightElement cursor={"pointer"}>
            <Button type="submit" colorScheme="teal" variant="solid">
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </form>
  )
}

export default FormSearch
