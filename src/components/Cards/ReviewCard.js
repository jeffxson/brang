import React from "react"
import {
  Box,
  Flex,
  Image,
  Link,
  useColorModeValue,
  Text,
} from "@chakra-ui/react"
import PropTypes from "prop-types"

const ReviewCard = props => {
  const { src, text1, text2, text4, text5, text6 } = props

  return (
    <Box
      px={5}
      bg={useColorModeValue("#f3f3f3", "darkMode.wBgColor")}
      my={5}
      borderRadius="10px"
    >
      <Flex justifyContent="space-between">
        <Flex py={5} justifyContent="space-between" w="18%">
          <Image h="70px" src={src} />
          <Box>
            <Text pt={5}>{text1}</Text>
            <Box pt={2}>{text6}</Box>
          </Box>
        </Flex>
        <Text float={"right"} py={5}>
          {text5}
        </Text>
      </Flex>
      <Link href={text2}>{text2}</Link>
      <Text py={5}>{text4}</Text>
    </Box>
  )
}

export default ReviewCard

ReviewCard.propTypes = {
  src: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text4: PropTypes.string,
  text5: PropTypes.string,
  text6: PropTypes.any,
}
