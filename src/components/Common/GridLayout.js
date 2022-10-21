import React from "react"
import { Box, GridItem, Heading } from "@chakra-ui/react"
import { scrollBarStyle } from "utils/helpers"

const GridLayout = ({ title, children, colSpan }) => {
  return (
    <GridItem colSpan={colSpan} flex="1" width="100%">
      <Box
        h="40vh"
        overflowY="scroll"
        sx={scrollBarStyle}
        boxShadow="0px 1px 3px 0px #000"
        borderRadius={"10px"}
      >
        <Heading
          position="sticky"
          top="0"
          zIndex={99}
          bg="#fff"
          fontSize="25px"
          borderTopRadius={"10px"}
          px={5}
          py={2}
        >
          {title}
        </Heading>
        <Box py={["5", "5", "5", "5"]} px={5}>
          {children}
        </Box>
      </Box>
    </GridItem>
  )
}

export default GridLayout
