import { Box } from "@chakra-ui/react"

const EmptySelection = ({ messageOne, messageTwo }) => {
  return (
    <Box
      w="100%"
      h="100px"
      bg="#F8D7DA"
      borderRadius="5px"
      p="15px"
      overflowY="scroll"
    >
      <Box as="h1" fontWeight="bold" color="#721C24">
        {messageOne}
      </Box>
      <Box as="p" color="#721C24">
        {messageTwo}
      </Box>
    </Box>
  )
}

export default EmptySelection
