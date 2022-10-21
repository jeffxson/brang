import React from "react"
import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { FaUserCircle } from "react-icons/fa"

const UserLayout = ({ name, image, onClick }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <style>
        {`.avatar_con:hover .change_con {
                  display: flex;
              }
              
              .loading {
                display: flex;
              }
  
              `}
      </style>
      <>
        <Box
          className="avatar_con"
          position="relative"
          cursor="pointer"
          borderRadius="50%"
          _hover={{ boxShadow: "lg" }}
        >
          <Avatar
            cursor="pointer"
            onMouseOver={onClick}
            boxShadow="lg"
            h="100px"
            w="100px"
            src={image || FaUserCircle}
          />
          <Flex
            position="absolute"
            pointerEvents="none"
            top="0"
            left="0"
            flexDirection="row"
            width="100%"
            height="100%"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
            background="rgba(0, 0, 0, 0.5)"
            gap="12px"
            display="none"
            className={"change_con"}
          >
            <Text fontSize="13px" textAlign="center" color="#fff">
              {name}
            </Text>
          </Flex>
        </Box>
        <Text fontSize="13px">{name}</Text>
      </>
    </Flex>
  )
}

export default UserLayout
