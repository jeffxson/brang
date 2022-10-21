import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"

const AccLayout = ({ title, loading, children }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          background={useColorModeValue(
            "lightMode.dashBoardHeader",
            "darkMode.wHeaderColor"
          )}
          borderRadius={"10px"}
          boxShadow="md"
          my={2}
        >
          <Box flex={"1"} textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {loading && (
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="lightMode.blue"
            size="md"
          />
        )}
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default AccLayout
