import React, { useState } from "react"
import {
  Flex,
  Box,
  Text,
  Button,
  useDisclosure,
  Heading,
  GridItem,
  Grid,
} from "@chakra-ui/react"
import { FaTrash, FaEdit } from "react-icons/fa"
import {
  useGetSocialAcc,
  useGetTwitterTimeline,
} from "services/query/socialAccounts"
import CreateAccModal from "components/Modal/SocialAccounts/CreateAccModal"
import UpdateAccModal from "components/Modal/SocialAccounts/UpdateAccModal"
import DeleteSocialAccModal from "components/Modal/SocialAccounts/DeleteSocialAccModal"
import GoBack from "components/Common/GoBack"
import { TwitterTweetEmbed } from "react-twitter-embed"

const index = () => {
  // queries the endpoint to get the social media list
  const { data: accounts } = useGetSocialAcc()

  // queries the endpoint to get all tweets of members
  const { data } = useGetTwitterTimeline()
  const [createData, setCreateData] = useState(null)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [updateModal, setUpdateModal] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const [deleteData, setDeleteData] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  // opens up the add timeline modal
  const handleCreate = data => {
    setCreateData(data)
    onOpen()
  }

  return (
    <Box px={50}>
      <Flex
        flexDir={["column", "column", "row", "row"]}
        justifyContent="space-between"
      >
        <Flex align="center" cursor="pointer" h="72px">
          <GoBack />
          <Heading>Social Accounts</Heading>
        </Flex>
        <Button p="8px" w="fit-content" my={5} onClick={() => handleCreate()}>
          Add Account
        </Button>
      </Flex>
      <Box px={50} width={["100%", "100%", "100%", "100%"]}>
        <Box fontSize="20px" my={5}>
          {accounts?.results?.map((data, i) => (
            <Flex
              py={5}
              flexDir={["column", "row", "row", "row"]}
              key={i}
              alignItems="center"
              w="100%"
              justifyContent="space-between"
            >
              <Box px={3} w="70%">
                <Text fontWeight={600}>{data?.social_media}:</Text>
                <Text>{data?.handle}</Text>
              </Box>
              <Box
                cursor="pointer"
                onClick={() => {
                  setUpdateModal(true)
                  setUpdateData(data)
                }}
              >
                <FaEdit color="blue" />
              </Box>
              <Box
                cursor="pointer"
                onClick={() => {
                  setDeleteModal(true)
                  setDeleteData(data)
                }}
              >
                <FaTrash color="red" />
              </Box>
            </Flex>
          ))}
        </Box>
        <Grid
          w={"100%"}
          gap={4}
          templateColumns={[
            "repeat(1,1fr)",
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(4,1fr)",
          ]}
          overflowY="scroll"
        >
          {data?.map(dat =>
            dat?.timeline?.map(tweetId => (
              <GridItem colSpan={1} key={tweetId}>
                <TwitterTweetEmbed tweetId={tweetId} />
              </GridItem>
            ))
          )}
        </Grid>
      </Box>
      <CreateAccModal
        title="Add account"
        isOpen={isOpen}
        onClose={onClose}
        data={createData}
      />

      <UpdateAccModal
        data={updateData}
        title="Update Acc"
        isOpen={updateModal}
        onClose={() => {
          setUpdateModal(false)
        }}
      />
      <DeleteSocialAccModal
        data={deleteData}
        title="Delete Team"
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false)
        }}
      />
    </Box>
  )
}

export default index
