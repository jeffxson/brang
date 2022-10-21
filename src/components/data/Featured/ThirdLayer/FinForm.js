import React from "react"
import { SearchIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

const FinForm = ({ onSubmit, check, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <InputGroup w={["100%", "100%", "60%", "60%"]} borderRadius="10px">
        <Input
          value={check}
          onChange={onChange}
          boxShadow="0px 1px 3px 0px #000"
        />
        <InputRightElement cursor={"pointer"}>
          <Button type="submit" colorScheme="teal" variant="solid">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

export default FinForm
