import React from "react"
import { SearchIcon } from "@chakra-ui/icons"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import { FaTimes } from "react-icons/fa"

const FormSearch = ({ onSubmit, value, onChange, onClick }) => {
  return (
    <form onSubmit={onSubmit}>
      <InputGroup w="100%" borderRadius="10px">
        <InputLeftElement>
          {value && (
            <FaTimes onClick={onClick} cursor={"pointer"} opacity={0.8} />
          )}
        </InputLeftElement>
        <Input
          value={value}
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

export default FormSearch
